Ext.define('GSmartApp.view.deviceout.StockOutDeviceEdit_MController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockOutDeviceEdit_MController',
	init: function() {
        // var orgstore = this.getViewModel().getStore('OrgStore');
		// orgstore.loadStore(5);

		var userStore = this.getViewModel().getStore('UserStore');
		userStore.loadStore();

        // var listidtype = "4,8,9,11,12";
        var listidtype = "17";
		var orgfromstore = this.getViewModel().getStore('OrgFromStore');
		orgfromstore.loadStore_byRoot(listidtype);

		var listidtype = "14";
        var orgtostore = this.getViewModel().getStore('OrgToStore');
        orgtostore.loadStore_byRoot(listidtype);
		// orgtostore.loadStore_allchildren_byorg(listidtype);

		// var currencyStore = this.getViewModel().getStore('CurrencyStore');
		// currencyStore.loadStore();

		// var vattypeStore = this.getViewModel().getStore('VatTypeStore');
		// vattypeStore.loadStore();
		
		var DeviceInTypeStore = this.getViewModel().getStore('DeviceOutTypeStore');
		DeviceInTypeStore.loadStore();
	}
})