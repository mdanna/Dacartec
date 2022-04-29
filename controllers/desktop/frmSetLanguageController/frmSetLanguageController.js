define({ 

	onViewCreated(){
      this.view.init = () => {
        
        this.view.cmpPageHeader.onClickLeft = () => new voltmx.mvc.Navigation('frmHome').navigate();
        
        this.view.rbgLocale.onSelection = () => {
          voltmx.store.setItem(globals.KEY_LOCALE, this.view.rbgLocale.selectedKey);
          
          //manage language change on the page
        };
        
      };
      
      this.view.preShow = () => {
        const locale = voltmx.store.getItem(globals.KEY_LOCALE) || globals.DEFAULT_LOCALE;
        this.view.rbgLocale.selectedKey = locale;
      };
    }

});