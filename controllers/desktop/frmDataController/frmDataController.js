define({ 

  onViewCreated(){


    this.view.init = () => {
      this.onInit();  
    };

    this.view.preShow = () => {
      //this is executed every time that the view is displayed
      this.onPreShow();
    };

    this.view.postShow = () => {
      //this is executed every time that the view is displayed
      this.onPostShow();
    };


  },


  onInit(){
    //this code is executed once at view initialization time
    //you put here the definition of the event handlers
    
    this.view.doLayout = () => {
      const frmHeight = this.view.frame.height;
      
      this.view.cmpResultadosCultivos.height = (frmHeight - parseInt(this.view.cmpResultadosCultivos.top.replace('dp', ''))) + 'dp';
    };

  },

  onPreShow(){
    //this code is executed every time the view is displayed
    //before showwing the widgets

    //use this.navigationContext to access the arg passed by the Navigation object

  },

  onPostShow(){
    //this code is executed every time the view is displayed
    //after showwing the widgets

    //use this.navigationContext to access the arg passed by the Navigation object

  }
});