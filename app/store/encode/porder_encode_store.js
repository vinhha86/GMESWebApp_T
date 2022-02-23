Ext.define('GSmartApp.store.encode.porder_encode_store', {
    extend: 'Ext.data.Store',
	alias: 'store.porder_encode_store',
	model: 'GSmartApp.model.encode.porder_encode_model',
   loadStore: function(pordercode, usercreateid_link, encodedatefrom, encodedateto, limit, page){
	var me=this;
		var params = new Object();
		params.pordercode = pordercode;
		params.usercreateid_link = usercreateid_link;
		params.encodedatefrom = encodedatefrom;
		params.encodedateto = encodedateto;

		me.pageSize = limit;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/encodeporder/encode_porder_getlist_bypage',
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
   }
});
