define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      
      eventManager.subscribe('loadData', ({datasetName, count, pageNumber}) => {
        if(datasetName === this.datasetName){
          this.view.lblPageInfo.text = `${(this.pageSize * (pageNumber - 1)) + 1} - ${pageNumber * this.pageSize} of ${count}`; 
        }
      });

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'pageSize', () => {
        return this._pageSize;
      });
      defineSetter(this, 'pageSize', value => {
        this._pageSize = value;
      });
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