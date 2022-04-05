define(function() {
  
  const SKIN_FLEX_SELECTED = 'sknFlxWhiteBorderDarkBlue';
  const SKIN_FLEX_UNSELECTED = 'sknFlxDarkBlueBorderWhite';
  const SKIN_LBL_SELECTED = 'sknLblDarkBlue20';
  const SKIN_LBL_UNSELECTED = 'sknLblWhite20';

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        if(!this.initDone){
          this.view.onClick = () => {
            this.onClick();
          };
          this.view.onHover = (flex, context) => {
            if(context.eventType === constants.ONHOVER_MOUSE_LEAVE){
              this.view.skin = SKIN_FLEX_UNSELECTED;
              this.view.lblLogin.skin = SKIN_LBL_UNSELECTED;
            } else if(context.eventType === constants.ONHOVER_MOUSE_ENTER){
              this.view.skin = SKIN_FLEX_SELECTED;
              this.view.lblLogin.skin = SKIN_LBL_SELECTED;
            }
          };
          
          this.initDone = true;
        }
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    onClick(){}
  };
});