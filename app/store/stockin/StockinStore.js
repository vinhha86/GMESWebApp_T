Ext.define('GSmartApp.store.stockin.StockinStore', {
    extend: 'Ext.data.Store',
    alias: 'store.StockinStore',
	model: 'GSmartApp.model.stockin.Stockin',
	groupField: 'stockinProductType', // nguyen lieu, phu lieu ...
	loadStore: function(orgid_from_link, stockindate_from, stockindate_to, stockintypeid_link, status, limit, page,){
		var me=this;
		var params = new Object();
		params.orgid_from_link = orgid_from_link;
		params.stockindate_from = stockindate_from;
		params.stockindate_to = stockindate_to;
		params.stockintypeid_link = stockintypeid_link;
		params.status = status;

		me.pageSize = limit;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockin/stockin_list',
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
		this.loadPage(page,{
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					this.fireEvent('logout');
				}
			}
		});
	},
	loadStore_Product: function(orgid_from_link, stockindate_from, stockindate_to, 
		stockintypeid_link, stockintypeid_link_from, stockintypeid_link_to, 
		status, limit, page){
		var me=this;
		var params = new Object();
		params.orgid_from_link = orgid_from_link;
		params.stockindate_from = stockindate_from;
		params.stockindate_to = stockindate_to;
		params.stockintypeid_link = stockintypeid_link;
		params.stockintypeid_link_from = stockintypeid_link_from;
		params.stockintypeid_link_to = stockintypeid_link_to;
		params.status = status;

		me.pageSize = limit;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockin/stockin_product_list',
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
		this.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					this.fireEvent('logout');
				}
			}
		});
	},
	loadStore_Material: function(orgid_from_link, 
		stockindate_from, 
		stockindate_to, 
		stockintypeid_link, 
		stockintypeid_link_from, 
		stockintypeid_link_to, 
		status, 
		pcontractid_link,
		limit, 
		page,
		skuid_link,
		pcontract,
		product
		){
		var me=this;
		var params = new Object();
		params.orgid_from_link = orgid_from_link;
		params.stockindate_from = stockindate_from;
		params.stockindate_to = stockindate_to;
		params.stockintypeid_link = stockintypeid_link;
		params.stockintypeid_link_from = stockintypeid_link_from;
		params.stockintypeid_link_to = stockintypeid_link_to;
		params.status = status;
		params.pcontractid_link = pcontractid_link;
		params.skuid_link = skuid_link;
		params.pcontract = pcontract;
		params.product = product;

		me.pageSize = limit;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockin/stockin_material_list',
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
		this.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					this.fireEvent('logout');
				}
			}
		});
	},
	loadStore_Material_pcontract: function(orgid_from_link, 
		stockindate_from, 
		stockindate_to, 
		stockintypeid_link, 
		stockintypeid_link_from, 
		stockintypeid_link_to, 
		status, 
		pcontractid_link,
		limit, 
		page,
		skuid_link){
		var me=this;
		var params = new Object();
		params.orgid_from_link = orgid_from_link;
		params.stockindate_from = stockindate_from;
		params.stockindate_to = stockindate_to;
		params.stockintypeid_link = stockintypeid_link;
		params.stockintypeid_link_from = stockintypeid_link_from;
		params.stockintypeid_link_to = stockintypeid_link_to;
		params.status = status;
		params.pcontractid_link = pcontractid_link;
		params.skuid_link = skuid_link;

		me.pageSize = limit;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockin/stockin_material_list_pcontract',
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
		this.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					this.fireEvent('logout');
				}
			}
		});
	}
});
