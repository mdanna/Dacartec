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

    //Logic for getters/setters of custom properties
    initGettersSetters() {
      defineGetter(this, 'targetForm', () => {
        return this._targetForm;
      });
      defineSetter(this, 'targetForm', value => {
        this._targetForm = value;
      });
    },

    init(){
      this.view.flxLeft.onClick = () => {
        if(this.targetForm){
          new voltmx.mvc.Navigation(this.targetForm).navigate();
        }
      };
    }
  };
});