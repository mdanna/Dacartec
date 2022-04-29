define({ 

  onViewCreated(){
    //this is called one time, at the time of creation of the form
    this.view.init = () => {
      //will be called once at the initialization of the view;
      this.onInit();
    };
    
    this.view.preShow = () => {
      this.onPreShow();
    };
    
  },

  onInit(){
    
    this.view.loginButton.onClick = () => {
      const userid = this.view.txtUser.text;
      const password = this.view.txtPassword.text;
      mbaas.login(userid, password).then((result) => {
        voltmx.store.setItem('userid', userid);
        voltmx.store.setItem('password', password);
        new voltmx.mvc.Navigation('frmHome').navigate();
      }). catch((error) => {
        alert(JSON.stringify(error));
      });
    };
    
  },
  
  onPreShow(){
    this.view.txtUser.text = this.view.txtUser.text || voltmx.store.getItem('userid') || '';
    this.view.txtPassword.text = this.view.txtPassword.text || voltmx.store.getItem('password') || '';
    
    voltmx.application.showLoadingScreen(null, '', constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {}); 
    voltmx.i18n.setCurrentLocaleAsync(voltmx.store.getItem(globals.KEY_LOCALE) || globals.DEFAULT_LOCALE, () => {
      voltmx.application.dismissLoadingScreen();
    }, () => {
      voltmx.application.dismissLoadingScreen();
      alert('Unable to set locale');
    });
  }
  
  
});