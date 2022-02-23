Ext.define('GSmartApp.store.cutplan_processing.CutplanProcessingStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CutplanProcessingStore',
	model: 'GSmartApp.model.cutplan_processing.CutplanProcessing',
	groupField: 'maSP',
	loadStore: function(processingdate_from, processingdate_to, limit, page, porderid_link, skuid_link){
		var me=this;
		var params = new Object();
		params.processingdate_from = processingdate_from;
		params.processingdate_to = processingdate_to;
		params.limit = limit;
		params.page = page;
		params.porderid_link = porderid_link;
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
			url: config.getAppBaseUrl()+'/api/v1/cutplan_processing/cutplan_processing_list',
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
					 // this.fireEvent('logout');
				}
			}
		});
	},
});
