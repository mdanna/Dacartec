define({ 

  onViewCreated(){
    this.view.init = () => {
      this.onInit();
    };
  },

  onInit(){
    this.view.homePageHeader.onClickLeft = () => this.view.cmpHamburgerMenu.toggle(true);
    
	this.view.flxCultivo.onClick = () => new voltmx.mvc.Navigation('frmCultivo').navigate();
    
    this.view.cmpHamburgerMenu.onItemSelected = (key) => {
      alert(key);
    };
  }

});