Ext.define('GSmartApp.store.pcontract.PContractConfigAmountStore', {
    extend: 'Ext.data.Store',
    alias: 'store.PContractConfigAmountStore',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'amount_from', type: 'int'},
        {name: 'amount_to', type: 'int'},
        {name: 'amount_plus', type: 'number'},
        {name: 'type', type: 'int'}
	],
	sorters: {
        direction: 'ASC',
        property: 'amount_from'
    },
	// data:[
	// 	{id:1,	name:'CMP'},
	// 	{id:2,	name:'FOB'},
	// 	{id:3,	name:'Gia công nội địa'},
	// 	{id:4,	name:'Thuê gia công'}
	// ]
	loadStore:function(){
		var me=this;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/configamount/getall',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				}
			}
		});
	}
});
