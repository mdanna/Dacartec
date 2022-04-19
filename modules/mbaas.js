const mbaas = {
  login(userid, password){
	const promise = new Promise((resolve, reject) => {
        const serviceClient = VMXFoundry.getIdentityService(globals.IDENTITY_SERVICE);
        serviceClient.login({
          userid,
          password
        }, (results) => {
          resolve(results);
        }, (error) => {
          reject(error);
        });
    });
    return promise;    
  },

  invokeOperation(serviceName, operationName, headers, inputParams){
    const promise = new Promise((resolve, reject) => {
        const serviceClient = VMXFoundry.getIntegrationService(serviceName);
        serviceClient.invokeOperation(operationName, headers, inputParams, (results) => {
          resolve(results);
        }, (error) => {
          reject(error);
        });
    });
    return promise;
  },

};