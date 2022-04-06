define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {

        if(!this.initDone){
          this.view.searchButton.onClick = () => {
            eventManager.publish(globals.EVENT_SEARCH, {
              datasetName: 'Cultivo',
              searchArgs: {
                Code: this.view.tfCodigo.text || '0',
                ProduktName: this.view.tfCultivo.text || null,
                FK_Kulturkategorie: this.view.catCultivo.selection || '0',
                Deleted: this.view.sdDeletedData.selectedKey === 'true'
              }
            });
          };

          this.view.resetButton.onClick = () => {
            this.view.tfCodigo.text = '';
            this.view.tfCultivo.text = '';
            this.view.sdDeletedData.selectedKey = 'false';
            this.view.catCultivo.reset();

            eventManager.publish(globals.EVENT_SEARCH, {
              datasetName: 'Cultivo',
              searchArgs: {
                Code: '0',
                ProduktName: null,
                FK_Kulturkategorie: null,
                Deleted: false
              }   
            });
          };

          this.initDone = true;
        }

      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    }
  };
});