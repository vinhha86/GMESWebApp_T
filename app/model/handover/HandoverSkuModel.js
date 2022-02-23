Ext.define('GSmartApp.model.handover.HandoverSkuModel', {
	extend: 'Ext.data.Model',
    idProperty: 'idx',
	fields: [
		{name: 'idx'},
		{name: 'id', type: 'int'},
		{name: 'totalpackage', type: 'int'},
	],
});