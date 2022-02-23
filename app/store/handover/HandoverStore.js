Ext.define('GSmartApp.store.handover.HandoverStore', {
    extend: 'Ext.data.Store',
	alias: 'store.HandoverStore',
	storeId: 'HandoverStore',
    idProperty: 'idx',
	fields: [
		{name: 'idx'},
        {name: 'id', type: 'int'},
		{name: 'handover_date', type: 'date' , dateFormat: 'c', format: 'd/m/y'},
        {name: 'orgFromName', type: 'string'},
        {name: 'orgFromParentcode', type: 'string'},
        {name: 'orgToName', type: 'string'},
        {name: 'orgToParentcode', type: 'string'},
		{
            name    : 'orgFromNameParent', 
            convert : function (value, rec) {
				if(rec.get('orgFromParentcode') == null || rec.get('orgFromParentcode') == ''){
					return rec.get('orgFromName');
				}
               	return rec.get('orgFromParentcode') + ' - ' + rec.get('orgFromName');
            }
        },
		{
            name    : 'orgToNameParent', 
            convert : function (value, rec) {
				if(rec.get('orgToParentcode') == null || rec.get('orgToParentcode') == ''){
					return rec.get('orgToName');
				}
               	return rec.get('orgToParentcode') + ' - ' + rec.get('orgToName');
            }
        },
		{
            name    : 'statusAndTimeToReceive', 
            convert : function (value, rec) {
				var result = rec.get('status')
				switch(result){
					case 0: result = 'Chưa duyệt'; break;
					case 1: result = 'Đã duyệt'; break;
					case 2: result = 'Đã nhận'; break;
					default: result = ''; break;
				}
				if(rec.get('amountTimeToReceiveString') != ''){
					result=result + ' (' + rec.get('amountTimeToReceiveString') + ')';
				}
               	return result;
            }
        }
	],
	loadStore:function(){
		var params = new Object();
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/handover/getall',
			paramsAsJson:true,
			extraParams : params,
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
	},
	loadStoreByType:function(handovertypeid_link, in_out){
		var params = new Object();
		params.handovertypeid_link = handovertypeid_link;
		params.in_out = in_out;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/handover/getbytype',
			paramsAsJson:true,
			extraParams : params,
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
	},
	loadStoreBySearch: function(handovertypeid_link, ordercode, handover_datefrom, 
		handover_dateto, orgid_from_link, orgid_to_link, status, limit, page, viewId){
		var me=this;
		var params = new Object();
		params.handovertypeid_link = handovertypeid_link;
		params.ordercode = ordercode;
		params.handover_datefrom = handover_datefrom;
		params.handover_dateto = handover_dateto;
		params.orgid_from_link = orgid_from_link;
		params.orgid_to_link = orgid_to_link;
		params.status = status;
		// params.limit = limit;
		// params.page = page;
		me.pageSize = limit;
		params.viewId = viewId;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/handover/getbysearch',
			timeout: 60000,
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
