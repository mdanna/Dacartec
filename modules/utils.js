const utils = {
  getUniqueId() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
  },

  getTimeStamp(){
    var hoy = new Date();
    var fechaInicioPeriodo = hoy.getFullYear().toString() + "-01-01";
    var fechaFinPeriodo = hoy.getFullYear().toString() + "-12-31";
    var date = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
    var time = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    var fechaActual = date + ' ' + time;
    return({fechaInicioPeriodo, fechaFinPeriodo, fechaActual});
  }
};