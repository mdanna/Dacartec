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
    
    this.view.flxLogin.onHover = (flex, context) => {
      if(context.eventType === constants.ONHOVER_MOUSE_LEAVE){
        this.view.flxLogin.skin = 'sknFlxDarkBlueBorderWhite';
        this.view.lblLogin.skin = 'sknLblWhite20';
      } else if(context.eventType === constants.ONHOVER_MOUSE_ENTER){
        this.view.flxLogin.skin = 'sknFlxWhiteBorderDarkBlue';
        this.view.lblLogin.skin = 'sknLblDarkBlue20';
      }
    };
    
    this.view.flxLogin.onClick = () => {
      const userid = this.view.txtUser.text;
      const password = this.view.txtPassword.text;
      mbaas.login(userid, password).then((result) => {
        voltmx.store.setItem('userid', userid);
        voltmx.store.setItem('password', password);
        new voltmx.mvc.Navigation('frmData').navigate();
      }). catch((error) => {
        alert(JSON.stringify(error));
      });
    };
    
  },
  
  onPreShow(){
    this.view.txtUser.text = voltmx.store.getItem('userid') || '';
    this.view.txtPassword.text = voltmx.store.getItem('password') || '';
  }
  
  
});