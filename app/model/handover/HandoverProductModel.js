Ext.define('GSmartApp.model.handover.HandoverProductModel', {
	extend: 'Ext.data.Model',
    idProperty: 'idx',
	fields: [
		{name: 'idx'},
        {name: 'id', type: 'int'},
	],
});