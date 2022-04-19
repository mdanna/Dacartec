define(function() {

  return {
    constructor(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        if(!this.initDone){
          this.init();
          this.initDone = true;
        }
      };
    },

    initGettersSetters() {},

    init(){}
  };
});