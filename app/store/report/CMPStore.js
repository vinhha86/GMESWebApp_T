Ext.define('GSmartApp.store.CMPStore', {
	extend: 'Ext.data.Store',
	storeId: 'CMPStore',
    alias: 'store.CMPStore',
    fields: [
		{name: 'id', type: 'int'},
		{name: 'orgid_link',   type: 'int'},
		{name: 'parentorgid_link',   type: 'int'},
		{name: 'parentorgname',   type: 'string'},
		{name: 'orgname',   type: 'string'},
		{name: 'monthdes',
			calculate: function(data) {
				return data.month + '/' + data.year;
			}
		},
		{name: 'month',   type: 'int'},
		{name: 'year',   type: 'int'},
		{name: 'cmpamount',   type: 'number'},
	],
	sorters: [{
        property: 'orgid_link',
        direction: 'ASC'
    }],
	loadStore:function(reportdate,reportmonths){
		var params = new Object();
		params.reportdate = reportdate;
		params.reportmonths = reportmonths;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/report_cmp/orgcmp',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			},
			timeout: 120000,
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		// this.load();
		// this.load({
		// 	scope: this,
		// 	callback: function(records, operation, success) {
		// 		if(!success){
		// 			 this.fireEvent('logout');
		// 		} else {
		// 			console.log(records);
		// 		}
		// 	}
		// });
	},	
	loadStore_ToSX:function(reportdate,reportmonths){
		var params = new Object();
		params.reportdate = reportdate;
		params.reportmonths = reportmonths;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/report_cmp/orgcmp_tosx',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			},
			timeout: 120000,
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		// this.load();
		// this.load({
		// 	scope: this,
		// 	callback: function(records, operation, success) {
		// 		if(!success){
		// 			 this.fireEvent('logout');
		// 		} else {
		// 			console.log(records);
		// 		}
		// 	}
		// });
	},		
	loadStore_ToSX_ByParentCode:function(reportdate,reportmonths,org_code){
		var params = new Object();
		params.reportdate = reportdate;
		params.reportmonths = reportmonths;
		params.org_code = org_code;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/report_cmp/orgcmp_tosx_byparentcode',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			},
			timeout: 120000,
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		// this.load();
		// this.load({
		// 	scope: this,
		// 	callback: function(records, operation, success) {
		// 		if(!success){
		// 			 this.fireEvent('logout');
		// 		} else {
		// 			console.log(records);
		// 		}
		// 	}
		// });
	},			
	// data:[
	// 	{id:1,	parentorgname: 'DHA', orgname: 'Tổ 1', month: 12, year: 2019, cmpamount: 10000},
	// 	{id:2,	parentorgname: 'DHA', orgname: 'Tổ 2', month: 12, year: 2019, cmpamount: 10000},
	// 	{id:3,	parentorgname: 'DHA', orgname: 'Tổ 3', month: 12, year: 2019, cmpamount: 10000},
	// 	{id:4,	parentorgname: 'DHA', orgname: 'Tổ 1', month: 1, year: 2020, cmpamount: 10000},
	// 	{id:5,	parentorgname: 'DHA', orgname: 'Tổ 2', month: 1, year: 2020, cmpamount: 10000},
	// 	{id:6,	parentorgname: 'DHA', orgname: 'Tổ 3', month: 1, year: 2020, cmpamount: 10000},
	// 	{id:7,	parentorgname: 'DHA', orgname: 'Tổ 1', month: 2, year: 2020, cmpamount: 10000},
	// 	{id:8,	parentorgname: 'DHA', orgname: 'Tổ 2', month: 2, year: 2020, cmpamount: 10000},
	// 	{id:9,	parentorgname: 'DHA', orgname: 'Tổ 3', month: 2, year: 2020, cmpamount: 10000},
	// 	{id:10,	parentorgname: 'DHA', orgname: 'Tổ 1', month: 3, year: 2020, cmpamount: 10000},
	// 	{id:11,	parentorgname: 'DHA', orgname: 'Tổ 2', month: 3, year: 2020, cmpamount: 10000},
	// 	{id:12, parentorgname: 'DHA', orgname: 'Tổ 3', month: 3, year: 2020, cmpamount: 10000},
	// 	{id:13,	parentorgname: 'BN1', orgname: 'Tổ 1', month: 1, year: 2020, cmpamount: 10000},
	// 	{id:14,	parentorgname: 'BN1', orgname: 'Tổ 2', month: 1, year: 2020, cmpamount: 10000},
	// 	{id:15, parentorgname: 'BN1', orgname: 'Tổ 3', month: 1, year: 2020, cmpamount: 10000}		
	// ]
});
