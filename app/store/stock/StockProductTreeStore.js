Ext.define('GSmartApp.store.stock.StockProductTreeStore', {
	extend: 'Ext.data.TreeStore',
	alias: 'store.StockProductTreeStore',
	idProperty: 'idString',
	// parentIdProperty: 'parentIdString',
	fields: [
		'id',
		'idString',
		'name',
	],
	expanded: true,
	loadStore: function (maHangId, donHang) {
		var me = this;
		var params = new Object();
		params.maHangId = maHangId;
		params.donHang = donHang;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin() + '/api/v1/stock/stockproductmenu_tree',
			paramsAsJson: true,
			extraParams: params,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'children'
			}
		});
		this.loadPage(1, {
			scope: this,
			callback: function (records, operation, success) {
				this.fireEvent('loadStore_Done');
				if (!success) {
					this.fireEvent('logout');
				}
			}
		});
	},
});
