({
    doInit : function(cmp, event, helper) {
        var dur = cmp.get('v.session').Duration__c;
<<<<<<< HEAD
        // var d = new Date(dur * 1000).toISOString().substr(11, 8);
        cmp.set('v.duration',dur);
        
        var sessionTime = cmp.get('v.session').Session_Time__c;
        console.log(sessionTime);
        
    }
    /*
=======
        var d = new Date(dur * 1000).toISOString().substr(11, 8);
        cmp.set('v.duration',d);
    },
    
>>>>>>> a37b140998d9759a5043cebe76fe0b3f91e019ed
    doInit2 : function(cmp, event, helper) {
        var dur = cmp.get('v.session').Duration__c;
        var d = new Date(dur * 1000).toISOString().substr(11, 8);
        cmp.set('v.duration',d);
        
        var action = component.get("c.getUser");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.user", response.getReturnValue());
            } else {
                console.log('There was an error');
            }
        });
        $A.enqueueAction(action);
  
    }
<<<<<<< HEAD
    */
=======
>>>>>>> a37b140998d9759a5043cebe76fe0b3f91e019ed
})