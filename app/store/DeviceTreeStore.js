Ext.define('GSmartApp.store.DeviceTreeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.devicetreestore',
	fields: ['id', 'code','name','deviceGroupName','status'],
	groupField: 'deviceGroupName',
	loadStore:function(params,callback){
		var me=this;
		var access_token = GSmartApp.Ajax.access_token();
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/device/device_listtree',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json",
				'authorization': access_token
			 },
			extraParams: params,
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				callback.call(records, operation, success);
			}
		});
	},
	/*loadStore:function(params){
		var me =this;
		GSmartApp.Ajax.post('/gsmartinv/api/v1/device/device_listtree',params,
		function(success,response,options ) {
			if(success){
				var response = Ext.decode(response.responseText);
				me.insert(0,response.data);
			}
		})
	}
	/*loadStore:function(type){
		var params = new Object();
		params.type =type;
		var access_token = GSmartApp.Ajax.access_token();
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			cors: true,
			headers :{
				'Accept': "GSmartApplication/json", 
				'Content-Type':"GSmartApplication/json",
				'authorization': 'Bearer ' + access_token
			},
			useDefaultXhrHeader: false,
			url: config.getAppBaseUrl()+'/gsmartinv/api/v1/device/device_listtree',
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.loadPage (1);
	}*/
	/*
	root: 
	{
		"id": null,
		"orgid_link": null,
		"code": null,
		"name": null,
		"type": null,
		"extrainfo": null,
		"parent_id": null,
		"status": null,
		"usercreateid_link": null,
		"timecreate": null,
		"lastuserupdateid_link": null,
		"lasttimeupdate": null,
		"children": [
			{
				"id": 1,
				"orgid_link": 1,
				"code": null,
				"name": "Nhóm thiết bị số 1",
				"type": 1,
				"extrainfo": null,
				"parent_id": null,
				"status": 1,
				"usercreateid_link": 1,
				"timecreate": null,
				"lastuserupdateid_link": 1,
				"lasttimeupdate": null,
				"children": [
					{
						"id": 2,
						"orgid_link": 1,
						"code": "A00001",
						"name": "Thiết bị số 1",
						"type": 1,
						"extrainfo": null,
						"parent_id": 1,
						"status": 1,
						"usercreateid_link": null,
						"timecreate": null,
						"lastuserupdateid_link": null,
						"lasttimeupdate": null,
						"children": [],
						"text": "Thiết bị số 1",
						"leaf": true,
						"expanded": false
					},
					{
						"id": 3,
						"orgid_link": 1,
						"code": "A00002",
						"name": "Thiết bị số 2",
						"type": 1,
						"extrainfo": null,
						"parent_id": 1,
						"status": 0,
						"usercreateid_link": null,
						"timecreate": null,
						"lastuserupdateid_link": null,
						"lasttimeupdate": null,
						"children": [],
						"text": "Thiết bị số 2",
						"leaf": true,
						"expanded": false
					},
					{
						"id": 4,
						"orgid_link": 1,
						"code": "A00003",
						"name": "Thiết bị số 3",
						"type": 1,
						"extrainfo": null,
						"parent_id": 1,
						"status": 1,
						"usercreateid_link": null,
						"timecreate": null,
						"lastuserupdateid_link": null,
						"lasttimeupdate": null,
						"children": [],
						"text": "Thiết bị số 3",
						"leaf": true,
						"expanded": false
					}
				],
				"text": "Nhóm thiết bị số 1",
				"leaf": false,
				"expanded": true
			},
			{
				"id": 5,
				"orgid_link": 1,
				"code": null,
				"name": "Nhóm thiết bị số 2",
				"type": 2,
				"extrainfo": null,
				"parent_id": null,
				"status": 1,
				"usercreateid_link": null,
				"timecreate": null,
				"lastuserupdateid_link": null,
				"lasttimeupdate": null,
				"children": [
					{
						"id": 6,
						"orgid_link": 1,
						"code": "B00001",
						"name": "Thiết bị số 1",
						"type": 2,
						"extrainfo": null,
						"parent_id": 5,
						"status": 0,
						"usercreateid_link": null,
						"timecreate": null,
						"lastuserupdateid_link": null,
						"lasttimeupdate": null,
						"children": [],
						"text": "Thiết bị số 1",
						"leaf": true,
						"expanded": false
					},
					{
						"id": 7,
						"orgid_link": 1,
						"code": "B00002",
						"name": "Thiết bị số 2",
						"type": 2,
						"extrainfo": null,
						"parent_id": 5,
						"status": 1,
						"usercreateid_link": null,
						"timecreate": null,
						"lastuserupdateid_link": null,
						"lasttimeupdate": null,
						"children": [],
						"text": "Thiết bị số 2",
						"leaf": true,
						"expanded": false
					},
					{
						"id": 8,
						"orgid_link": 1,
						"code": "B00003",
						"name": "Thiết bị số 3",
						"type": 2,
						"extrainfo": null,
						"parent_id": 5,
						"status": 1,
						"usercreateid_link": null,
						"timecreate": null,
						"lastuserupdateid_link": null,
						"lasttimeupdate": null,
						"children": [],
						"text": "Thiết bị số 3",
						"leaf": true,
						"expanded": false
					}
				],
				"text": "Nhóm thiết bị số 2",
				"leaf": false,
				"expanded": true
			}
		],
		"text": null,
		"leaf": false,
		"expanded": true
	}*/

	

});
