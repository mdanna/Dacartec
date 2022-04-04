define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			this.view.preShow = () => {
              //reset the flxHeader content
              this.view.flxHeader.removeAll();
              
              //have a look at the property columns to build the header
              this.columns.data.forEach((element, index) => {
                //create an instance of SimpleListHeaderElement and add it to the flex
                const simpleListHeaderElement = new com.dacartec.SimpleListHeaderElement({
                  id: 'simpleListHeaderElement' + index
                }, {}, {});
                simpleListHeaderElement.displayValue = element.displayValue;
                this.view.flxHeader.add(simpleListHeaderElement);
              });
            };
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
            defineGetter(this, 'columns', () => {
                return this._columns;
            });
            defineSetter(this, 'columns', value => {
                this._columns = value;
            });
            defineGetter(this, 'rows', () => {
                return this._rows;
            });
            defineSetter(this, 'rows', value => {
                this._rows = value;
            });
        }
	};
});