define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      
      this.view.preShow = () => {
        if(!this.initDone){
          //initialization
          
          this.view.txtFilter.onTextChange = () => {
            const filterValue = this.view.txtFilter.text;
            const element = this.values.data.find((row) => row.id === filterValue);
            const key = element ? element.code : '0';
            this.view.lbxValue.selectedKey = key;
          };
          
          this.initDone = true;
        }
      };

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'values', () => {
        return this._values;
      });
      defineSetter(this, 'values', values => {
        this._values = values;
        //initialise the list with the right key/value pairs taken from 'values
		this.initListBox();
      });
    },

    initListBox(){
      this.view.lbxValue.masterData = [];
      const masterDataValues = [];
      this.values.data.forEach((row) => {
        masterDataValues.push([row.code, row.name]);
      });
      this.view.lbxValue.masterData = masterDataValues;
    }
  };
});