define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {

        if(!this.initDone){
          this.view.searchButton.onClick = () => {
            eventManager.publish(globals.EVENT_SEARCH, {
              datasetName: 'Ganado',
              searchArgs: {
                Code: this.view.tfCodigo.text || '',
                Bezeichnung: this.view.tfGanado.text || '',
                FK_Tiergattung: this.view.catGanado.selection || '0'
              }
            });
          };

          this.view.resetButton.onClick = () => {
            this.resetSearchFields();

            eventManager.publish(globals.EVENT_SEARCH, {
              datasetName: 'Ganado',
              searchArgs: {
                "Code": "", 
                "Bezeichnung": "", 
                "FK_Tiergattung": "0"
              }
            });
          };

          this.initDone = true;
        }

        this.resetSearchFields();

      };
    },

    resetSearchFields(){
      this.view.tfCodigo.text = '';
      this.view.tfGanado.text = '';
      this.view.catGanado.reset();
    },

    initGettersSetters() {}
  };
});