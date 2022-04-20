define(function() {
  const MENU_LEFT = -300;

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

      this.view.preShow = () => {
        
        if(!this.initDone){
          this.onInit();
          this.initDone = true;
        }
        
        this.onPreShow();
      };

    },

    onInit(){
      this.view.flxBackground.onClick = () => this.toggle(false);

      this.view.menuHeader.onClickLeft = () => {
        this.toggle(false);
      };

      this.view.segMenuItems.onRowClick = () => {
        this.toggle(false);
        this.onItemSelected(this.view.segMenuItems.selectedRowItems[0].key);
      };

    },
    
    onPreShow(){},

    initGettersSetters() {},

    toggle(open){
      const self = this;
      open && (self.view.isVisible = true);
      this.view.flxMenu.animate(voltmx.ui.createAnimation({
        "0": {
          left: open ? MENU_LEFT : 0
        },
        "100": {
          left: open ? 0 : MENU_LEFT
        }
      }), {
        "duration": 0.5,
        "iterationCount": 1,
        "delay": 0,
        "fillMode": kony.anim.FILL_MODE_FORWARDS
      }, {
        animationStart: function() {},
        animationEnd: function() {
          open || (self.view.isVisible = false);
        }
      });
    },

    onItemSelected(key){
      voltmx.print(`Selected menu item ${key}`);
    }

  };
});