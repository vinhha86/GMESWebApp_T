Ext.define('GSmartApp.store.stockout.StockoutGroupStore', {
    extend: 'Ext.data.Store',
    alias: 'store.StockoutGroupStore',
	fields: [
		'id', 'name'
	],
    data: [{
        id: 1, name: 'Thủ công'
    },{
        id: 2, name: 'Mã vạch'
    },{
        id: 3, name: 'Ống đọc RFID'
    }]
});
