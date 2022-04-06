define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

      eventManager.subscribe(globals.EVENT_UPDATE_PAGINATION, ({datasetName, count, pageNumber}) => {
        if(datasetName === this.datasetName){
          this.count = count;
          this.pageNumber = pageNumber;
          this.view.isVisible = count > 0;
          this.view.lblPageInfo.text = `${(globals.PAGE_SIZE * (pageNumber - 1)) + 1} - ${Math.min(count, pageNumber * globals.PAGE_SIZE)} of ${count}`; 
        }
      });

      this.view.preShow = () => {

        if(!this.initDone){

          this.view.flxGoTop.onClick = () => {
            eventManager.publish(globals.EVENT_PAGINATE, {
              datasetName: this.datasetName,
              pageNumber: 1
            });
          };

          this.view.flxGoUp.onClick = () => {
            eventManager.publish(globals.EVENT_PAGINATE, {
              datasetName: this.datasetName,
              pageNumber: Math.max(1, this.pageNumber - 1)
            });
          };

          this.view.flxGoDown.onClick = () => {
            eventManager.publish(globals.EVENT_PAGINATE, {
              datasetName: this.datasetName,
              pageNumber: Math.min(Math.ceil(this.count/globals.PAGE_SIZE), this.pageNumber + 1)
            });
          };

          this.view.flxGoBottom.onClick = () => {
            eventManager.publish(globals.EVENT_PAGINATE, {
              datasetName: this.datasetName,
              pageNumber: Math.ceil(this.count/globals.PAGE_SIZE)
            });
          };

          this.initDone = true;
        }

      };

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'pageNumber', () => {
        return this._pageNumber;
      });
      defineSetter(this, 'pageNumber', value => {
        this._pageNumber = value;
      });
      defineGetter(this, 'count', () => {
        return this._count;
      });
      defineSetter(this, 'count', value => {
        this._count = value;
      });
      defineGetter(this, 'datasetName', () => {
        return this._datasetName;
      });
      defineSetter(this, 'datasetName', value => {
        this._datasetName = value;
      });
    }
  };
});