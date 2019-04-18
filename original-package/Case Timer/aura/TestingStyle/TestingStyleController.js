({
	doInit: function(component, event, helper) {
        console.log('doInit');

        var eventParams = event.getParams();
        if(eventParams.changeType === "LOADED") {
           	component.get("v.recordInfo");
            // record is loaded (render other component which needs record data value)
            console.log("Record is loaded successfully.");
        } else if(eventParams.changeType === "CHANGED") {
            // record is changed
        } else if(eventParams.changeType === "REMOVED") {
            // record is deleted
        } else if(eventParams.changeType === "ERROR") {
            // there’s an error while loading, saving, or deleting the record
        }
        
        var clsStopwatch = function() {
            var startAt = startAt || 0; 
            var lapTime = lapTime || 0;
            
            var now = function() {
                return (new Date()).getTime();
            };
            
            this.start = function() {
                startAt = startAt ? startAt : now();
            };
            
            this.stop = function() {
                lapTime = startAt ? lapTime + now() - startAt : lapTime;
                startAt = 0;
            };
            
            this.reset = function() {
                lapTime = 0;
                startAt = 0;
            };
            
            this.time = function() {
                return lapTime + (startAt ? now() - startAt : 0);
            };
        };
        
        var x =  new clsStopwatch();
        component.set("v.stopwatch", x);   
        var clocktimer = setInterval(function() {
            helper.updateStatus(component, event);
        }, 1);
        var theCase = component.get('v.simpleCase');
        if(theCase.Status === 'Closed') {
            component.set('v.disabled',true);
            $A.util.addClass(component.find("timerDiv"), "slds-hide");
            component.set('v.playing',false);
        } else {
            component.set('v.disabled',false);
            $A.util.removeClass(component.find("timerDiv"), "slds-hide");
            if(component.get('v.autoStart') === 'True') {
                x.start();            
                component.set('v.playing',true);
                component.set('v.recording',true);
            } else { 
                component.set('v.playing',false);
                x.stop();   
            }
        }    
        helper.loadSessions(component, event);

    },
    
     onClick : function(component, event, helper) {
        var clocktimer;
        var id = event.target.id;       
        var x = component.get("v.stopwatch");
        
        switch(id){
            case "start":
                component.set('v.playing',true);
                component.set('v.recording',true);
                clocktimer = setInterval(function() {
                    helper.updateStatus(component, event);
                }, 1);
                x.start();
                break;
            case "stop":
                component.set('v.playing',false);
                x.stop();
                clearInterval(clocktimer);
                helper.updateStatus(component, event);
                break;
            default:
                stop();
                break;
        }
    },
    
    update : function (component, event, helper) {
        // Get the new hash from the event
        var loc = event.getParam("token");
        console.log("Creating Session: update");
        console.log(loc);
        helper.createSession(component, event);
        // Do something else
    },
    
    handleSaveSession: function(component, event, helper) {
        console.log('start save session');
        if(helper.validateSessionForm(component)) { 
            console.log('after conditional helper');

            // Prepare the action to create the new session
            var saveSessionAction = component.get("c.newSessionManual");
            saveSessionAction.setParams({
                "caseId" : component.get("v.recordId"), 
                "timeVal" : component.get("v.manualDuration"), 
                "theDate" : new Date(component.get("v.manualDate")).toJSON()
            });

            // Configure the response handler for the action
            saveSessionAction.setCallback(this, function(response) {
                var state = response.getState();
                if(state === "SUCCESS") {

                    // Prepare a toast UI message
                    var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title": "Session Saved",
                        "message": "The new session was created."
                    });
                    
                    // Update the UI: close panel, show toast, refresh case page
                    $A.get("e.force:closeQuickAction").fire();
                    resultsToast.fire();
                    $A.get("e.force:refreshView").fire();
                }
                else if (state === "ERROR") {
                    console.log('Problem saving session, response state: ' + state);
                }
                else {
                    console.log('Unknown problem, response state: ' + state);
                }
            });

            // Send the request to create the new session
            $A.enqueueAction(saveSessionAction);
            helper.hideModal(component, event);
        }
        helper.loadSessions(component, event);        
        
    },    
    
    newTime : function(component, event, helper) {
        $A.util.toggleClass(component.find("myModal"), "slds-hide");
    }, 
    
    cancelSession : function(component, event, helper) {
        helper.hideModal(component, event);

    }
    
})