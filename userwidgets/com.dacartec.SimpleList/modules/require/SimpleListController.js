define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			this.view.preShow = () => {
              
              if(!this.initDone){
                this.view.segData.widgetDataMap = {
                  lblCode: 'Code',
                  lblCultivo: 'ProduktName',
                  lblCropCategory: 'CodeKulturKategorie',
                  lblCategoriaCultivo: 'Bezeichnung',
                  lblComentario: 'Anmerkung'
                };
                
                eventManager.subscribe('event_search_cultivos', (searchArgs) => this.loadData(searchArgs));
                
                this.initDone = true;
              }
              
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
              
              this.loadData({
                Code: '0',
                ProductName: null,
                FK_Kulturkategorie: null,
                Deleted: false
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
        },
      
      loadData(args){
        mbaas.invokeOperation(mbaas.SERVICE, 'ConsultaCultivos', {}, args).then((results) => {
          //this corresponds to the resolve branch
          this.view.segData.setData(results.records);
          //kony.print(JSON.stringify(results));
        }).catch((error) => {
          //this corresponds to the reject;
          alert(JSON.stringify(error));
        });
      }
	};
});