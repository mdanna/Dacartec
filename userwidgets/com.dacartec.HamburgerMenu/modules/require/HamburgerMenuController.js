define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

      this.view.preShow = () => {

        if(!this.initDone){
          this.view.flxBackground.onClick = () => this.toggle(false);

          this.view.menuHeader.onClickLeft = () => {
            this.toggle(false);
          };

          this.initDone = true;
        }
      };

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    toggle(open){
      const self = this;
      open && (self.view.isVisible = true);
      this.view.flxMenu.animate(voltmx.ui.createAnimation({
        "0": {
          left: open ? -200 : 0
        },
        "100": {
          left: open ? 0 : -200
        }
      }), {
        "duration": 0.5,
        "iterationCount": 1,
        "delay": 0,
        "fillMode": kony.anim.FILL_MODE_FORWARDS
      }, {
        animationStart: function() {
        },
        animationEnd: function() {
          open || (self.view.isVisible = false);
        }
      });
    }
  };
});