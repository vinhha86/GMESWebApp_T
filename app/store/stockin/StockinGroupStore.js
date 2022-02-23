Ext.define('GSmartApp.store.stockin.StockinGroupStore', {
    extend: 'Ext.data.Store',
    alias: 'store.StockinGroupStore',
	fields: [
		'id', 'name'
	],
    data: [{
        id: 1, name: 'Thủ công'
    },{
        id: 2, name: 'Mã NPL'
    },{
        id: 3, name: 'Ống đọc RFID'
    }]
});
