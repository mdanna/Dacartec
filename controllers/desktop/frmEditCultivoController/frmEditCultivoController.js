define({ 

  onViewCreated(){

    this.view.init = () => {
      this.onInit();
    };
    
    this.view.preShow = () => {
      this.onPreShow();
    };
    
  },

  onInit(){
	this.view.cmpPageHeader.onClickLeft = () => new voltmx.mvc.Navigation('frmCultivo').navigate();
  },
  
  onPreShow(){
    alert(JSON.stringify(this.navigationContext));
    //reset the fields
    
    //load the date from database
    
    //fill the fields
  }

});