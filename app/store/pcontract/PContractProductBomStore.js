Ext.define('GSmartApp.store.pcontract.PContractProductBomStore', {
    extend: 'Ext.data.Store',
	alias: 'store.PContractProductBomStore',
	storeId: 'PContractProductBomStore',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'productid_link',  type: 'int'},
        {name: 'materialid_link',   type: 'int'},
		{name: 'materialName',   type: 'string'},
		'materialCode',
        {name: 'unitName', type: 'string'},
        {name: 'amount'},
        {name: 'lost_ratio',},
        {name: 'description',   type: 'string'},
        {name: 'createduserid_link',   type: 'int'},
		{name: 'createduserName',   type: 'string'},
		{name: 'createddate',   type: 'string'},
		{name: 'tenMauNPL',   type: 'string'},
		{name: 'coKho',   type: 'string'},
		{name: 'thanhPhanVai',   type: 'string'},
		{name: 'product_typeName',   type: 'string'},
        {name: 'product_type',   type: 'int'},
        {name: 'pcontractid_link',   type: 'int'}
	],
	groupField: 'product_typename',
	sorters: [{
        direction: 'ASC',
        property: 'product_typename'
    },{
        direction: 'ASC',
        property: 'product_type'
    },{
        direction: 'ASC',
        property: 'materialName'
    }],
	
	loadStore: function(pcontractid_link, productid_link){
        var me=this;
		var params = new Object();
		params.productid_link = productid_link;
		params.pcontractid_link = pcontractid_link;
        
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontractproductbom/getlist_pcontract_productbom',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data',
				totalProperty: 'totalCount'
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
	},
	
	loadStoreColor: function(pcontractid_link, productid_link, colorid_link){
        var me=this;
		var params = new Object();
		params.productid_link = productid_link;
		params.pcontractid_link = pcontractid_link;
		params.colorid_link = colorid_link;
        
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontractproductbom/getlist_pcontract_productbomcolor',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data',
				totalProperty: 'totalCount'
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
