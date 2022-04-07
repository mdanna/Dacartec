define(function() {

  return {
    constructor(baseConfig, layoutConfig, pspConfig) {

      this.view.preShow = () => {

        if(!this.initDone){
          this.init();
          this.initDone = true;
        }
        
        //this.view.lblTitle.isVisible = !!this.view.lblTitle.text;

      };
    },

    //Logic for getters/setters of custom properties
    initGettersSetters() {},

    init(){}
  };
});