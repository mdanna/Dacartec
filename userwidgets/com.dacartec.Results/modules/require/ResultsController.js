define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {

        if(!this.initDone){
          eventManager.subscribe(globals.EVENT_SEARCH, ({datasetName, searchArgs}) => {
            if(datasetName === this.datasetName){
              this.loadData(searchArgs);
            }
          });

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

        const headerNames = this.getHeaderNames();

        //have a look at the property columns to build the header
        headerNames.forEach((header, index) => {
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
    
    getHeaderNames(){
      const headers = [];
      this.columns.data.forEach((column) => {
        if(!column.hidden){
          headers.push(column.name);
        }
      });
      return headers;
    },
    
    getHeaderKeys(){
      const headers = [];
      this.columns.data.forEach((column) => {
        if(!column.hidden){
          headers.push(column.key);
        }
      });
      return headers;
    },

    
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
            defineGetter(this, 'datasetName', () => {
                return this._datasetName;
            });
            defineSetter(this, 'datasetName', value => {
                this._datasetName = value;
            });
            defineGetter(this, 'apiName', () => {
                return this._apiName;
            });
            defineSetter(this, 'apiName', value => {
                this._apiName = value;
            });
            defineGetter(this, 'columns', () => {
                return this._columns;
            });
            defineSetter(this, 'columns', value => {
                this._columns = value;
            });
        },

    loadData(args){
      voltmx.application.showLoadingScreen(null, '', constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});

      mbaas.invokeOperation(mbaas.SERVICE, this.apiName, {}, args).then((results) => {
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
      const headerKeys = this.getHeaderKeys();

      for(let i = (pageNumber - 1) * globals.PAGE_SIZE + 1; i <= Math.min(this.records.length, pageNumber * globals.PAGE_SIZE); i++){
        const index = i - 1;

        const cmpRow = new com.dacartec.RowResults({
          id: `rowResults${index}`,
          skin: index % 2 === 0 ? 'sknFlxLightGrey': 'sknFlxVeryLightBlue'
        }, {}, {});


        headerKeys.forEach((header, headerIndex) => {
          const cmpCell = new com.dacartec.CellResults({
            id: `cellResults${index}_${headerIndex}`,
            width: `${100 / headerKeys.length}%`
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