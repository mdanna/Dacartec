define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			this.view.preShow = () => {
              
              if(!this.initDone){
                eventManager.subscribe('event_search_cultivos', (searchArgs) => this.loadData(searchArgs));
                
                this.initDone = true;
              }
              
              //reset the flxHeader content
              this.view.flxHeader.removeAll();
              
              const headers = ['Codigo', 'Cultivo', 'Code crop category', 'Categoria de cultivo', 'Comentario'];
              
              //have a look at the property columns to build the header
              headers.forEach((header, index) => {
                //create an instance of SimpleListHeaderElement and add it to the flex
                const simpleListHeaderElement = new com.dacartec.SimpleListHeaderElement({
                  id: 'simpleListHeaderElement' + index
                }, {}, {});
                simpleListHeaderElement.displayValue = header;
                this.view.flxHeader.add(simpleListHeaderElement);
              });
              
              this.loadData({
                Code: '0',
                ProduktName: null,
                FK_Kulturkategorie: null,
                Deleted: false
              });
            };
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
      
        loadData(args){
          mbaas.invokeOperation(mbaas.SERVICE, 'ConsultaCultivos', {}, args).then((results) => {
            //this has to fill the component
            this.view.flxContent.removeAll();
            results.records.forEach((row, index) => {
              const cmpRow = new com.dacartec.RowResultadosCultivos({
                id: `rowResultadosCultivos${index}`
              }, {}, {});
              
              const rowHeaders = ['Code', 'ProduktName', 'CodeKulturKategorie', 'Bezeichnung', 'Anmerkung'];
              
              rowHeaders.forEach((header, headerIndex) => {
                const cmpCell = new com.dacartec.CellResultadosCultivos({
                  id: `cellResultadosCultivos${index}_${headerIndex}`
                }, {}, {});
                cmpCell.displayValue = row[header] || '';
                cmpRow.add(cmpCell);
              });
              
              this.view.flxContent.add(cmpRow);
              //cmpRow.skinRow = index % 2 === 0 ? 'sknFlxLightGrey': 'sknFlxVeryLightBlue';

            });

          }).catch((error) => {
            //this corresponds to the reject;
            alert(JSON.stringify(error));
          });
        }
	};
});