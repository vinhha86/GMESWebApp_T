Ext.define('GSmartApp.store.SizeColorPickupStore', {
    extend: 'Ext.data.Store',
    alias: 'store.SizeColorPickupStore',
    fields: [
		{name: 'id', type: 'int'},
		{name: 'name',   type: 'string'},
	],
    sorters: [{
        property: 'id',
        direction: 'ASC'
    }],	
});
