Ext.define('GSmartApp.store.stockin.StockinListStore', {
    extend: 'Ext.data.Store',
    alias: 'store.stockinliststore',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'stockincode',  type: 'string'},
		{
			name: 'stockindate', 
			convert: function (value) {
				 var date =  new Date(value)
				return date.toLocaleDateString(GSmartApp.util.State.get('dataFormatList'));
			 }
		},
		{name: 'orgfrom_code',   type: 'string'},
		{name: 'orgfrom_name',   type: 'string'},
		{name: 'orgto_code',   type: 'string'},
		{name: 'orgto_name',   type: 'string'},
		{name: 'stockcode',   type: 'string'},
		{name: 'shipperson',   type: 'string'},
		{name: 'productcode',   type: 'string'},
		{name: 'productname',   type: 'string'},
		{name: 'totalpackage',   type: 'number'},
		{name: 'status',   type: 'number'},
		{
			name: 'statusname', 
			calculate: function(data) {
				if(data.status=0){
					return "0"
				}else{
					return "1"
				}
                
			}
		}
	]
});
