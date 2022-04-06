define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {

        if(!this.initDone){
          eventManager.subscribe('event_search_cultivos', (searchArgs) => this.loadData(searchArgs));

          eventManager.subscribe(globals.EVENT_PAGINATE, ({datasetName, pageNumber}) => {
            if(datasetName === this.datasetName){
              voltmx.application.showLoadingScreen(null, '', constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});   
              this.paginateData(pageNumber);
              voltmx.application.dismissLoadingScreen();
            }
          });

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
            defineGetter(this, 'datasetName', () => {
                return this._datasetName;
            });
            defineSetter(this, 'datasetName', value => {
                this._datasetName = value;
            });
        },

    loadData(args){
      voltmx.application.showLoadingScreen(null, '', constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});

      mbaas.invokeOperation(mbaas.SERVICE, 'ConsultaCultivos', {}, args).then((results) => {
        //this has to fill the component
        this.records = results.records;
        this.paginateData(1);

        voltmx.application.dismissLoadingScreen();

      }).catch((error) => {
        //this corresponds to the reject;
        voltmx.application.dismissLoadingScreen();
        alert(JSON.stringify(error));
      });
    },

    paginateData(pageNumber){
      this.view.flxContent.removeAll();
      const rowHeaders = ['Code', 'ProduktName', 'CodeKulturKategorie', 'Bezeichnung', 'Anmerkung'];

      for(let i = (pageNumber - 1) * globals.PAGE_SIZE + 1; i <= Math.min(this.records.length, pageNumber * globals.PAGE_SIZE); i++){
        const index = i - 1;

        const cmpRow = new com.dacartec.RowResultadosCultivos({
          id: `rowResultadosCultivos${index}`,
          skin: index % 2 === 0 ? 'sknFlxLightGrey': 'sknFlxVeryLightBlue'
        }, {}, {});


        rowHeaders.forEach((header, headerIndex) => {
          const cmpCell = new com.dacartec.CellResultadosCultivos({
            id: `cellResultadosCultivos${index}_${headerIndex}`
          }, {}, {});
          cmpCell.displayValue = this.records[index][header] || '';
          cmpRow.add(cmpCell);
        });
        
        this.view.flxContent.add(cmpRow);

      }
      
      eventManager.publish(globals.EVENT_UPDATE_PAGINATION, {
        datasetName: this.datasetName,
        count: this.records.length,
        pageNumber
      });        

    }

  };
});