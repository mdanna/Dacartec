define({ 
  pkValue: null,
  ganado: null,

  onViewCreated(){

    this.view.init = () => {
      this.onInit();
    };

    //     this.view.preShow = () => {
    //       this.onPreShow();
    //     };

  },

  onInit(){
    this.view.cmpPageHeader.onClickLeft = () => new voltmx.mvc.Navigation('frmGanado').navigate();

    this.view.cmpPageHeader.onClickRight = () => {
      //       if(this.navigationContext.pkValues){
      //         this.editGanado();
      //       } else {
      //         this.createGanado();
      //       }
    };

    //     this.view.doLayout = () => {
    //       const frmHeight = this.view.frame.height;
    //       if(frmHeight > 0){
    //         this.view.flxContentContainer.height = (frmHeight - 70) + 'dp';
    //       }
    //     };
  },

  onPreShow(){
    //recognize if it is edit or create mode
    if(this.navigationContext.pkValues){
      this.pkValue = this.navigationContext.pkValues['PK_KulturStamm'];
      this.view.cmpPageHeader.title = 'Edit Cultivo';

      mbaas.invokeOperation(globals.SERVICE, 'Obtenercultivo', {}, {
        Sprache: 'ES-ES',
        PK_Kulturstamm: this.pkValue
      }).then((results) => {
        this.cultivo = results.records && results.records.length > 0 ? results.records[0] : null;
        if(this.cultivo){
          this.initCultivo();
        } else {
          this.pkValue = null;
          alert('Cultivo not found!');
        }


      }).catch((error) => alert(JSON.stringify(error)));

    } else {
      this.view.cmpPageHeader.title = 'Create Cultivo';
      this.cultivo = null;
      //reset the fields
      this.view.lblTimestamp.text = '';
      this.view.tfCodigo.text = '';
      this.view.tfNombre.text = '';
      this.view.cmpCategoriaCultivo.selection = '0';
      this.view.cbCultivoPrincipal.value = false;
      this.view.cbOtrosUsos.value = false;
      this.view.cbOtraUnidad.value = false;
      this.view.taComentario.text = '';
    }

  },

  initCultivo(){
    this.view.lblTimestamp.text = this.cultivo.TimeStamp;
    this.view.tfCodigo.text = this.cultivo.Code;
    this.view.tfNombre.text = this.cultivo.Bezeichnung;
    this.view.cmpCategoriaCultivo.selection = this.cultivo.FK_Kulturkategorie;
    this.view.cbCultivoPrincipal.value = this.cultivo.HauptKultur === 'true';
    this.view.cbOtrosUsos.value = this.cultivo.SonstigeNutzung === 'true';
    this.view.cbOtraUnidad.value = this.cultivo.SonstigeEinheit === 'true';
    this.view.taComentario.text = this.cultivo.Anmerkung || '';
  },

  editCultivo(){
    const {fechaInicioPeriodo, fechaFinPeriodo, fechaActual} = utils.getTimeStamp();

    mbaas.invokeOperation(globals.SERVICE, 'ActualizarCultivo', {}, {
      TimeStamp: this.view.lblTimestamp.text,
      Code: this.view.tfCodigo.text,
      Bezeichnung: this.view.tfNombre.text,
      FK_Kulturkategorie: voltmx.visualizer.toNumber(this.view.cmpCategoriaCultivo.selection),
      HauptKultur: this.view.cbCultivoPrincipal.value,
      SonstigeNutzung: this.view.cbOtrosUsos.value,
      SonstigeEinheit: this.view.cbOtraUnidad.value,
      Anmerkung: this.view.taComentario.text,

      WJahrBegin: fechaInicioPeriodo,
      WJahrEnde: fechaFinPeriodo,
      ErfasstAm: fechaActual,
      PK_KulturStamm: this.pkValue,
      FK_ErfasstVon: globals.ID_USUARIO,
      FK_User: globals.ID_USUARIO,
      FK_EinheitErtrag: globals.UNIT_INCOME,
      Del: false
    }).then((results) => {
      if(results.TimeStamp && results.TimeStamp !== this.view.lblTimestamp.text){
        this.view.lblTimestamp.text = results.TimeStamp;
        mbaas.invokeOperation(globals.SERVICE, 'ActualizarTraduccionElemento', {}, {
          FK: this.pkValue,
          FK_Art: 3,
          Bezeichnung: this.view.tfNombre.text,
          FK_User: globals.ID_USUARIO
        }).then(() => alert('Record updated successfully')).catch((error) => alert(JSON.stringify(error)));
      } else {
        alert('The current record was not updated');
        this.initCultivo();
      }
    }).catch((error) => {
      alert(JSON.stringify(error));
    });
  },

  createCultivo(){

  }

});