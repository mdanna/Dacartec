define({ 

  onViewCreated(){
    this.view.init = () => {
      this.onInit();
    };
  },

  onInit(){
    this.view.homePageHeader.onClickLeft = () => this.view.cmpHamburgerMenu.toggle(true);
    
	this.view.flxCultivo.onClick = () => new voltmx.mvc.Navigation('frmCultivo').navigate();
	this.view.flxGanado.onClick = () => new voltmx.mvc.Navigation('frmGanado').navigate();
    
    this.view.cmpHamburgerMenu.onItemSelected = (key) => {
      switch(key){
        case 'locale':
          new voltmx.mvc.Navigation('frmSetLanguage').navigate();
          break;
        default:
          alert(key);
          break;
      }
    };
  }

});