define(function() {

	return {
		constructor(baseConfig, layoutConfig, pspConfig) {
          
          this.view.preShow = () => {
            
            if(!this.initDone){
              
              this.view.flxCheckBox.onClick = () => this.view.lblCheck.isVisible = !this.view.lblCheck.isVisible;
              
              this.initDone = true;
            }
          };

		},
		
		initGettersSetters() {}
	};
});