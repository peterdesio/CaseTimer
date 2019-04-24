({ 
    hideModal : function(component, event) {
        component.set('v.manualDate',null);
        component.set('v.manualDuration',null);
        $A.util.toggleClass(component.find("myModal"), "slds-hide");
    },
    
    loadSessions : function(component, event) {
		var loadSessionAction = component.get("c.grabSessions");
        loadSessionAction.setParams({
            "recordId" : component.get("v.recordId"), 
        });
        
        // Configure the response handler for the action
        loadSessionAction.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                var completeTime = 0.00;
  			    component.set('v.sessions',response.getReturnValue());  
                console.log(response.getReturnValue())
 
                /*
                var result = response.getReturnValue();
                for (var i = 0; i < result.length; i++) {
                    completeTime = completeTime + result[i].Duration__c;
                }
			    // var d = new Date(completeTime * 1000).toISOString().substr(11, 8);
                component.set('v.totalSesh', completeTime);
                */
                
            	/*
                // Prepare a toast UI message
                var resultsToast = $A.get("e.force:showToast");
                resultsToast.setParams({
                    "title": "Sessions Loaded",
                    "message": "The new session were loaded"
                });
                
                // Update the UI: close panel, show toast, refresh case page
                $A.get("e.force:closeQuickAction").fire();
                resultsToast.fire();
                $A.get("e.force:refreshView").fire();
                */
                console.log('Sessions Loaded');

            }
            else if (state === "ERROR") {
                console.log('Problem saving session, response state: ' + state);
                console.log('Error: ' + component.get("v.error"));
            }
            else {
                console.log('Unknown problem, response state: ' + state);
                console.log('Error: ' + component.get("v.error"));
            }
        });
        
        // Send the request to create the new session
        $A.enqueueAction(loadSessionAction); 
    },
    
    validateSessionForm: function(component) {
        console.log('start validate');

        var validSession = true;

         // Show error messages if required fields are blank
        var allValid = component.find('sessionField').reduce(function (validFields, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validFields && inputCmp.get('v.validity').valid;
        }, true);
                
        if (allValid) {
            // Verify we have an case to attach it to
            var checkCase = component.get("v.recordInfo");
            
            if($A.util.isEmpty(checkCase)) {
                validSession = false;
                console.log("Quick action context doesn't have a valid case.");
            }
            console.log(validSession);
        	return(validSession);    
        } 
	}, 
    
    updateStatus : function(component,e) {
        var x = component.get("v.stopwatch");
        if(x != null) {
            component.set('v.stime',this.formatTime(x.time()));
        } 
    },
    
    formatTime : function(time) {
        var h, m, s = 0;
        var newTime = '';
        
        h = Math.floor( time / (60 * 60 * 1000) );
        time = time % (60 * 60 * 1000);
        m = Math.floor( time / (60 * 1000) );
        time = time % (60 * 1000);
        s = Math.floor( time / 1000 );
        
        newTime = this.pad(h, 2) + ':' + this.pad(m, 2) + ':' + this.pad(s, 2);
        return newTime;
    },
    
    pad : function(num, size) {
        var s = "0000" + num;
        return s.substr(s.length - size);
    },
    
    createSession : function(component, event) {
        if(component.get('v.stime') != '00:00:00') {
            var action = component.get('c.newSession');
            action.setParams({
                "caseId" : component.get("v.recordId"), 
                "timeVal" : component.get("v.stime"), 
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if(component.isValid() && state === 'SUCCESS') {
					
                    var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title": "Session Saved",
                        "message": "The new session was created."
                    });
                }    
                else if (state === "ERROR") {
                    console.log('Problem saving session, response state: ' + state);
                }
                else {
                    console.log('Unknown problem, response state: ' + state);
                }
            });
            $A.enqueueAction(action);
        }
        this.loadSessions(component, event);                   
    },
    
})