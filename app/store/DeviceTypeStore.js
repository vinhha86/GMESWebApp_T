Ext.define('GSmartApp.store.DeviceTypeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.devicetypestore',
	fields: [
		{name: 'id', type: 'number'},
		{name: 'name',   type: 'string'}
	],
	data:[{ 
		id:1,
		name:'Inventory( nhập/xuất kho)'
	},{
		id:2,
		name:'Read ở cửa'
	},{
		id:3,
		name:'Encoder(Máy mã hóa chip)'
	},{
		id:4,
		name:'Pay(Máy bán hàng)'
	}]
	
});
