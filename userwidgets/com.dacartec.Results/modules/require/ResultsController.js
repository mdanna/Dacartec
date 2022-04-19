define(function() {

  return {
    records: [],

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

          eventManager.subscribe(globals.EVENT_SORT, ({datasetName, column, isAscending}) => {
            if(datasetName === this.datasetName){
              this.sortData(column, isAscending);
              this.paginateData(1);
            }
          });

          this.view.doLayout = () => {
            const resultsHeight = this.view.frame.height;
            if(resultsHeight > 0){
              this.view.flxList.height = (resultsHeight - 50) + 'dp';
              this.view.flxContent.height = (resultsHeight - 100) + 'dp';
            }
          };

          this.initDone = true;
        }

        //reset the flxHeader content
        this.view.flxHeader.removeAll();

        const headerNames = this.getHeaderNames();
        const headerKeys = this.getHeaderKeys();

        //have a look at the property columns to build the header
        headerNames.forEach((header, index) => {
          //create an instance of SimpleListHeaderElement and add it to the flex
          const cellHeaderResults = new com.dacartec.CellHeaderResults({
            id: 'cellHeaderResults' + index
          }, {}, {});
          cellHeaderResults.displayValue = header;
          cellHeaderResults.codeValue = headerKeys[index];
          cellHeaderResults.datasetName = this.datasetName;
          if(headerKeys[index] === this.defaultSortColumn){
            cellHeaderResults.setSortStatus(globals.SORT_ASC);
          }
          this.view.flxHeader.add(cellHeaderResults);
        });

        this.loadData(this.defaultArgs || {});
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
      defineGetter(this, 'defaultArgs', () => {
        return this._defaultArgs;
      });
      defineSetter(this, 'defaultArgs', value => {
        this._defaultArgs = value;
      });
      defineGetter(this, 'primaryKey', () => {
        return this._primaryKey;
      });
      defineSetter(this, 'primaryKey', value => {
        this._primaryKey = value;
      });
      defineGetter(this, 'defaultSortColumn', () => {
        return this._defaultSortColumn;
      });
      defineSetter(this, 'defaultSortColumn', value => {
        this._defaultSortColumn = value;
      });
    },

    loadData(args){
      voltmx.application.showLoadingScreen(null, '', constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});

      mbaas.invokeOperation(globals.SERVICE, this.apiName, {}, args).then((results) => {
        //this has to fill the component

        this.records = results.records;
        this.sortData(this.defaultSortColumn, true);
        this.paginateData(1);

        voltmx.application.dismissLoadingScreen();

      }).catch((error) => {
        //this corresponds to the reject;
        voltmx.application.dismissLoadingScreen();
        alert(JSON.stringify(error));
      });
    },

    sortData(column, isAscending){
      this.records.sort((a, b) => {
        return(a[column] > b[column] ? (isAscending ? 1 : -1) : (a[column] < b[column] ? (isAscending ? -1 : 1) : 0));
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
          cmpRow.addCell(cmpCell);
        });

        const pkColumns = this.primaryKey.split();
        const pkValues = {};
        pkColumns.forEach((pkColumn) => {
          pkValues[pkColumn] = this.records[index][pkColumn];
        });

        cmpRow.onDeleteClick = () => {
          eventManager.publish(globals.EVENT_DELETE, {
            datasetName: this.datasetName,
            pkValues
          });
        };

        cmpRow.onRowClick = () => {
          eventManager.publish(globals.EVENT_EDIT, {
            datasetName: this.datasetName,
            pkValues
          });
        };

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