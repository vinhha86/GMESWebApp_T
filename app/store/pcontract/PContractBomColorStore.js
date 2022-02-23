Ext.define('GSmartApp.store.pcontract.PContractBomColorStore', {
    extend: 'Ext.data.Store',
	alias: 'store.PContractBomColorStore',
	storeId: 'PContractBomColorStore',
	model: 'GSmartApp.model.pcontract.PContractBOMColorModel',
	groupField: 'product_typename',
	sorters: [{
        direction: 'ASC',
        property: 'product_type'
    },{
        direction: 'ASC',
        property: 'materialName'
    }],
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
