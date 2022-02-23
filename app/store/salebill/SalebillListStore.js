Ext.define('GSmartApp.store.salebill.SalebillListStore', {
    extend: 'Ext.data.Store',
    alias: 'store.salebillliststore',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'billcode',  type: 'string'},
		{
			name: 'billdate', 
			convert: function (value) {
				 var date =  new Date(value)
				 return date.toLocaleDateString(GSmartApp.util.State.get('dataFormatList'));
			 }
		},
		{name: 'customername',  type: 'string'},
		{name: 'orgname',  type: 'string'},
		{name: 'totalamount',   type: 'number'},
		{name: 'discount',   type: 'number'},
		{name: 'totalvat',   type: 'number'},
		{name: 'totalsum',   type: 'number'}
		
	]
});
