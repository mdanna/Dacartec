define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

      eventManager.subscribe(globals.EVENT_SORT, ({datasetName, column}) => {
        if(datasetName === this.datasetName && column !== this.codeValue){
          this.setSortStatus(null);
        }
      });

      this.view.preShow = () => {

        if(!this.initDone){
          this.view.onClick = () => {
            if(this.view.lblSortAscending.isVisible){
              this.setSortStatus(globals.SORT_DESC);
            } else {
              this.setSortStatus(globals.SORT_ASC);
            }

            const isAscending = this.view.lblSortAscending.isVisible;

            eventManager.publish(globals.EVENT_SORT, {
              datasetName: this.datasetName,
              column: this.codeValue,
              isAscending
            });
          };

          this.initDone = true;
        }
      };

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'datasetName', () => {
        return this._datasetName;
      });
      defineSetter(this, 'datasetName', value => {
        this._datasetName = value;
      });
      defineGetter(this, 'codeValue', () => {
        return this._codeValue;
      });
      defineSetter(this, 'codeValue', value => {
        this._codeValue = value;
      });
    },

    setSortStatus(sortStatus){
      switch(sortStatus){
        case globals.SORT_ASC:
          this.view.lblSortAscending.isVisible = true;
          this.view.lblSortDescending.isVisible = false;
          break;
        case globals.SORT_DESC:
          this.view.lblSortAscending.isVisible = false;
          this.view.lblSortDescending.isVisible = true;
          break;
        default:
          this.view.lblSortAscending.isVisible = false;
          this.view.lblSortDescending.isVisible = false;
          break;
      }
    }
  };
});