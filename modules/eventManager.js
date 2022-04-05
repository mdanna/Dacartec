const eventManager = {
  subscriptions: {}, 
  
  uniqueId: 0,
  
  getNextUniqueId(){
    return "id" + eventManager.uniqueId++;
  },

  subscribe(eventType, callback) {
    const id = eventManager.getNextUniqueId();
    
    eventManager.subscriptions[eventType] = eventManager.subscriptions[eventType] || {};
    eventManager.subscriptions[eventType][id] = callback;

    return { 
      unsubscribe() {
        delete eventManager.subscriptions[eventType][id];
        if(Object.keys(eventManager.subscriptions[eventType]).length === 0) {
          delete eventManager.subscriptions[eventType];
        }
      }
    };
  },

  publish(eventType, arg){
    if(eventManager.subscriptions[eventType]){
      Object.keys(eventManager.subscriptions[eventType]).forEach(key => eventManager.subscriptions[eventType][key](arg));      
    }
  },
  
  reset(){
    eventManager.subscriptions = {};
  }
};


