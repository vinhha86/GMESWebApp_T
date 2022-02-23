Ext.define('GSmartApp.store.PackinglistStore', {
    extend: 'Ext.data.Store',
    alias: 'store.packinglistStore',
	fields: [
         {name: 'lotnumber', type: 'string'},
         {name: 'ydsorigin',  type: 'number'},
		 {name: 'width',  type: 'number'},
		 {name: 'packageid',  type: 'number'},
		 {name: 'netweight',  type: 'number'},
		 {name: 'grossweight',  type: 'number'}
     ]
    
});
