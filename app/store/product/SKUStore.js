Ext.define('GSmartApp.store.product.SKUStore', {
    extend: 'Ext.data.Store',
	alias: 'store.SKUStore',
	storeId: 'SKUStore',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'skuid_link',  type: 'string'},
        {name: 'name',   type: 'string'},
		{name: 'code',   type: 'string'},
		{name: 'mauSanPham',   type: 'string'},
        {name: 'coSanPham', type: 'string'}
	],
	sorters: [{
        direction: 'ASC',
        property: 'mauSanPham'
    },{
        direction: 'ASC',
        property: 'coSanPham'
    }],
	loadStore:function(id, stockid_link){
        var me=this;
        var params = new Object();
        params.productid_link = id;
        params.stockid_link = stockid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/sku/getall_byproduct',
			paramsAsJson:true,
            noCache: false,
            extraParams : params,
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
				this.fireEvent('SKUStore_load_Done');
				if(!success){
					 // this.fireEvent('logout');
				}
			}
		});
	},
	sorters: [{
        property: 'code',
        direction: 'ASC'
    }]
});
