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

  },

  onPreShow(){
    //this code is executed every time the view is displayed
    //before showwing the widgets

    //use this.navigationContext to access the arg passed by the Navigation object

    voltmx.application.showLoadingScreen(null, "Loading...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, false, true, {});

    mbaas.invokeOperation(mbaas.SERVICE, 'ConsultaCultivos', {}, {
      PK_Kulturstamm:"B9C054A2-9E72-4B9E-89AC-DCC05BD7A1E2",
      Sprache:"ES-ES"
    }).then((results) => {
      //this corresponds to the resolve branch
      voltmx.application.dismissLoadingScreen();
      alert(JSON.stringify(results));
    }).catch((error) => {
      //this corresponds to the reject;
      alert(JSON.stringify(error));
      voltmx.application.dismissLoadingScreen();
    });

  },

  onPostShow(){
    //this code is executed every time the view is displayed
    //after showwing the widgets

    //use this.navigationContext to access the arg passed by the Navigation object

  }
});