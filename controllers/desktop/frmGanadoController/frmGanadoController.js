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
      this.resizeResultadosGanado();
    };
    
    eventManager.subscribe(globals.EVENT_DELETE, ({datasetName, pkValues}) => {
      if(datasetName === 'Ganado'){
        alert(`delete ${JSON.stringify({pkValues})}`);
      }
    });
    
    eventManager.subscribe(globals.EVENT_EDIT, ({datasetName, pkValues}) => {
      if(datasetName === 'Ganado'){
        new voltmx.mvc.Navigation('frmEditGanado').navigate({pkValues});
      }
    });
    
    this.view.cmpSimpleHeader.onClickLeft = () => new voltmx.mvc.Navigation('frmHome').navigate();
    this.view.cmpSimpleHeader.onClickRight = () => new voltmx.mvc.Navigation('frmEditGanado').navigate({pkValues: null});

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

  },

  resizeResultadosGanado(){
    const frmHeight = this.view.frame.height;
    let top;
    const currentBreakpoint = voltmx.application.getCurrentBreakpoint();
    if(currentBreakpoint === 600){
      top = 360;
    } else if(currentBreakpoint === 1200){
      top = 290;
    } else {
      top = 220;
    }
    
    if(frmHeight > 0){
      this.view.cmpResultsGanado.height = (frmHeight - top) + 'dp';
    }
  }
});