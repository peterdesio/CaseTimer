global with sharing class CaseTimeCount {
       
    @AuraEnabled
    global static Session_Time__c[] newSession(Id caseId, String timeVal) {
        Map<String,Schema.SObjectField> objMap = Schema.SObjectType.Session_Time__c.fields.getMap();
        String[] fieldsToCheck = new String[] {'sf_caseTimer__Case__c', 'sf_caseTimer__Date__c','sf_caseTimer__Duration__c','sf_caseTimer__Agent__c'};
            for(String field : fieldsToCheck) {
                if(!objMap.get(field).getDescribe().isAccessible() && !objMap.get(field).getDescribe().isCreateable() ) {
                    throw new System.NoAccessException();
                }
            } 
        if (!Schema.sObjectType.Case.fields.Id.isAccessible()){
            throw new System.NoAccessException();
        }
        if (!Schema.sObjectType.User.fields.Name.isAccessible()){
            throw new System.NoAccessException();
        }
<<<<<<< HEAD
        // Time Calculations 
        String[] t = timeVal.split(':');
        Integer h = Integer.valueof(t[0]);
        Integer m = Integer.valueof(t[1]);
        Integer s = Integer.valueof(t[2]);
        Integer fullTime = s + (m * 60) + (h * 3600);
        
        // Create a list of session time records from a SOQL query
		List<Session_Time__c> sessionTimes = [SELECT Agent__r.Name, Date__c, Duration__c FROM Session_Time__c WHERE Case__r.Id = :caseId ORDER BY Date__c DESC Limit 1]; 
		List<Session_Time__c> sessionTimes1 = [SELECT Agent__r.Name, Date__c, CreatedById, Duration__c FROM Session_Time__c WHERE Case__r.Id = :caseId ORDER BY LastModifiedDate DESC Limit 1]; 
        //Session_Time__c latestSessionTime = sessionTimes1[0];
        
        Session_Time__c latestSessionTime = new Session_Time__c();
		latestSessionTime.Case__c = caseId;
        latestSessionTime.Date__c = System.Date.today();
        latestSessionTime.Duration__c = 0;
        latestSessionTime.Agent__c = UserINFO.getUserId();
        if (sessionTimes1.size() > 0) {
            latestSessionTime = sessionTimes1[0];
        }
		System.debug(latestSessionTime);
        System.debug(fullTime - latestSessionTime.Duration__c);
        
        if(latestSessionTime.Date__c == System.Date.today() && latestSessionTime.Duration__c == fullTime && latestSessionTime.CreatedbyId == UserINFO.getUserId() || (math.abs(fullTime - latestSessionTime.Duration__c) <= 30)) {
            system.debug('If Failed due to Edge Case');        
        }
        else{
                
=======
        
        // Create a list of session time records from a SOQL query
		List<Session_Time__c> sessionTimes = [SELECT Agent__r.Name, Date__c, Duration__c FROM Session_Time__c WHERE Case__r.Id = :caseId ORDER BY Date__c DESC Limit 1]; 
		session_Time__c sessionTimes1 = new session_Time__c();
        sessionTimes1 = [SELECT Agent__r.Name, Date__c, CreatedById, Duration__c FROM Session_Time__c WHERE Case__r.Id = :caseId ORDER BY LastModifiedDate DESC Limit 1]; 

            String[] t = timeVal.split(':');
            Integer h = Integer.valueof(t[0]);
            Integer m = Integer.valueof(t[1]);
            Integer s = Integer.valueof(t[2]);
            Integer fullTime = s + (m * 60) + (h * 3600);
        
        if(sessionTimes1.Date__c == System.Date.today() && sessionTimes1.Duration__c == fullTime && sessionTimes1.CreatedbyId == UserINFO.getUserId()) {
            system.debug('If Failed');        
        }
        else{
            
>>>>>>> a37b140998d9759a5043cebe76fe0b3f91e019ed
            Session_Time__c session = new Session_Time__c();
            session.Case__c = caseId;
            session.Date__c = System.Date.today();
            session.Duration__c = fullTime;
<<<<<<< HEAD
            session.Session_Time__c = Time.newInstance(h, m, s, 0);
=======
            // session.Time__c = fullTime;
>>>>>>> a37b140998d9759a5043cebe76fe0b3f91e019ed
            session.Agent__c = UserINFO.getUserId();
            
            insert session;
        }
<<<<<<< HEAD
                
        return [SELECT Agent__r.Name, Date__c, Duration__c, Session_Time__c FROM Session_Time__c WHERE Case__r.Id = :caseId ORDER BY CreatedDate DESC];

    }
        
=======
        
        return [SELECT Agent__r.Name, Date__c, Duration__c FROM Session_Time__c WHERE Case__r.Id = :caseId ORDER BY CreatedDate DESC];

    }
    
>>>>>>> a37b140998d9759a5043cebe76fe0b3f91e019ed
    @AuraEnabled
    global static Session_Time__c[] newSessionManual(Id caseId, String timeVal, String theDate) {
        Map<String,Schema.SObjectField> objMap = Schema.SObjectType.Session_Time__c.fields.getMap();
        String[] fieldsToCheck = new String[] {'sf_caseTimer__Case__c', 'sf_caseTimer__Date__c','sf_caseTimer__Duration__c','sf_caseTimer__Agent__c','sf_caseTimer__Manual_Entry__c'};
            for(String field : fieldsToCheck) {
                if( !objMap.get(field).getDescribe().isAccessible() && !objMap.get(field).getDescribe().isCreateable() ) {
                    throw new System.NoAccessException();
                }
            } 
        if (!Schema.sObjectType.Case.fields.Id.isAccessible()){
            throw new System.NoAccessException();
        }
        if (!Schema.sObjectType.User.fields.Name.isAccessible()){
            throw new System.NoAccessException();
        }
        
        String[] t = timeVal.split(':');
        Integer h = Integer.valueof(t[0]);
        Integer m = Integer.valueof(t[1]);
        Integer s = Integer.valueof(t[2]);
        Integer fullTime = s + (m * 60) + (h * 3600);
                
        Session_Time__c session = new Session_Time__c();
        session.Case__c = caseId;
        session.Date__c = Date.valueOf(theDate);
        session.Duration__c = fullTime;
<<<<<<< HEAD
        session.Session_Time__c = Time.newInstance(h, m, s, 0);
=======
>>>>>>> a37b140998d9759a5043cebe76fe0b3f91e019ed
        session.Agent__c = UserINFO.getUserId();
        session.Manual_Entry__c  = true;
        
        insert session;
        
<<<<<<< HEAD
        return [SELECT Agent__r.Name, Date__c, Duration__c, Session_Time__c FROM Session_Time__c WHERE Case__r.Id = :caseId ORDER BY CreatedDate DESC];
=======
        return [SELECT Agent__r.Name, Date__c, Duration__c FROM Session_Time__c WHERE Case__r.Id = :caseId ORDER BY CreatedDate DESC];
>>>>>>> a37b140998d9759a5043cebe76fe0b3f91e019ed
    }
    
    @AuraEnabled
    global static Session_Time__c[] grabSessions(Id recordId) {
        Map<String,Schema.SObjectField> objMap = Schema.SObjectType.Session_Time__c.fields.getMap();
        String[] fieldsToCheck = new String[] {'sf_caseTimer__Case__c', 'sf_caseTimer__Date__c','sf_caseTimer__Duration__c','sf_caseTimer__Agent__c'};
            for(String field : fieldsToCheck) {
                if( !objMap.get(field).getDescribe().isAccessible() && !objMap.get(field).getDescribe().isCreateable() ) {
                    throw new System.NoAccessException();
                }
            } 
        if (!Schema.sObjectType.Case.fields.Id.isAccessible()){
            throw new System.NoAccessException();
        }
        if (!Schema.sObjectType.User.fields.Name.isAccessible()){
            throw new System.NoAccessException();
        }
<<<<<<< HEAD
        return [SELECT Agent__r.Name, Date__c, Duration__c, Session_Time__c FROM Session_Time__c WHERE Case__r.Id = :recordId ORDER BY CreatedDate DESC];
=======
        return [SELECT Agent__r.Name, Date__c, Duration__c FROM Session_Time__c WHERE Case__r.Id = :recordId ORDER BY CreatedDate DESC];
>>>>>>> a37b140998d9759a5043cebe76fe0b3f91e019ed
    }
    
}