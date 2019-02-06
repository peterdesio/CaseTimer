({
    doInit : function(cmp, event, helper) {
        var dur = cmp.get('v.session').Duration__c;
        var d = new Date(dur * 1000).toISOString().substr(11, 8);
        cmp.set('v.duration',d);
    },
    
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
})