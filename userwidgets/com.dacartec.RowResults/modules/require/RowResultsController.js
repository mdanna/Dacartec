define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
            defineGetter(this, 'rowId', () => {
                return this._rowId;
            });
            defineSetter(this, 'rowId', value => {
                this._rowId = value;
            });
        }
	};
});