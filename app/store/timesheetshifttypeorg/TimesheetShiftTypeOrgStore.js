Ext.define('GSmartApp.store.timesheetshifttypeorg.TimesheetShiftTypeOrgStore', {
    extend: 'Ext.data.Store',
	alias: 'store.TimesheetShiftTypeOrgStore',
	storeId: 'TimesheetShiftTypeStore',
    groupField: 'tenLoaiCa',
	fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'from_hour', type: 'int'},
        {name: 'from_minute', type: 'int'},
        {name: 'to_hour', type: 'int'},
        {name: 'to_minute', type: 'int'},
		{
            name    : 'from', 
            convert : function (value, rec) {
                var result = '';
                var hour = 0;
                var minute = rec.get('from_minute');
                if(rec.get('from_hour') >= 24){
                    hour = rec.get('from_hour') - 24;
                }else{
                    hour = rec.get('from_hour');
                }
                if(hour < 10){
                    hour = '0' + hour;
                }
                if(minute < 10){
                    minute = '0' + minute;
                }
                result = hour + ':' + minute;
                return result;
            }
        },
		{
            name    : 'to', 
            convert : function (value, rec) {
                var result = '';
                var hour = 0;
                var minute = rec.get('to_minute');
                if(rec.get('to_hour') >= 24){
                    hour = rec.get('to_hour') - 24;
                }else{
                    hour = rec.get('to_hour');
                }
                if(hour < 10){
                    hour = '0' + hour;
                }
                if(minute < 10){
                    minute = '0' + minute;
                }
                result = hour + ':' + minute;
                return result;
            }
        },
        {
            name    : 'checkboxfrom', 
            convert : function (value, rec) {
                var from_hour = rec.get('from_hour');
                if(from_hour >= 24){
                    return true;
                }
                return false;
            }
        },
        {
            name    : 'checkboxto', 
            convert : function (value, rec) {
                var to_hour = rec.get('to_hour');
                if(to_hour >= 24){
                    return true;
                }
                return false;
            }
        },
        {
            name    : 'datefrom', 
            convert : function (value, rec) {
                var from_hour = rec.get('from_hour');
                var from_minute = rec.get('from_minute');
                if(from_hour >= 24){
                    from_hour -= 24;
                }
                var time = new Date(2010, 1, 1, from_hour, from_minute, 0);
                var setTime = Ext.Date.format(time, 'H:i');
                return setTime;
            }
        },
        {
            name    : 'dateto', 
            convert : function (value, rec) {
                var to_hour = rec.get('to_hour');
                var to_minute = rec.get('to_minute');
                if(to_hour >= 24){
                    to_hour -= 24;
                }
                var time = new Date(2010, 1, 1, to_hour, to_minute, 0);
                var setTime = Ext.Date.format(time, 'H:i');
                return setTime;
            }
        },
        {name: 'tenLoaiCa', type: 'string'},
	],
	// loadStore:function(){
	// 	var me=this;
	// 	var params = new Object();
	// 	this.setProxy({
	// 		type: 'ajax',
	// 		actionMethods: {
	// 			create : 'POST',
	// 			read   : 'POST',
	// 			update : 'POST',
	// 			destroy: 'POST'
	// 		},
	// 		url: config.getAppBaseUrl()+'/api/v1/timesheetshifttype/getall',
	// 		paramsAsJson:true,
	// 		extraParams : params,
	// 		noCache: false,
	// 		headers :{
	// 			'Accept': "application/json", 
	// 			'Content-Type':"application/json"
	// 		 },
	// 		reader: {
	// 			type: 'json',
	// 			rootProperty: 'data'
	// 		}
	// 	});
	// 	this.loadPage(1,{
	// 		scope: this,
	// 		callback: function(records, operation, success) {
	// 			if(!success){
	// 				 // this.fireEvent('logout');
	// 			}
	// 		}
	// 	});
	// },
    
    loadStorebyOrgid_link:function(orgid_link, is_ca_an){
		var me=this;
        var params = new Object();
        params.orgid_link = orgid_link;
        params.is_ca_an = is_ca_an;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/timesheetshifttypeorg/getbyorgid_link',
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

    getbyorgid_link_caAn:function(orgid_link, isHavingNullValue){
		var me=this;
        var params = new Object();
        params.orgid_link = orgid_link;
        params.isHavingNullValue = isHavingNullValue;
        // params.is_ca_an = is_ca_an;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/timesheetshifttypeorg/getbyorgid_link_caAn',
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

	getbyorgid_link_caAn_async:function(orgid_link, isHavingNullValue){
		var me=this;
        var params = new Object();
        params.orgid_link = orgid_link;
        params.isHavingNullValue = isHavingNullValue;
        // params.is_ca_an = is_ca_an;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/timesheetshifttypeorg/getbyorgid_link_caAn',
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
	},

    getbyorgid_link_caAn_forConfirm:function(orgid_link, date){
		var m=this;
        var params = new Object();
        params.orgid_link = orgid_link;
        params.date = date;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/timesheetshifttypeorg/getbyorgid_link_caAn_forConfirm',
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
    getbyorgid_link_caAn_forConfirm_async:function(orgid_link, date){
		var m=this;
        var params = new Object();
        params.orgid_link = orgid_link;
        params.date = date;
        
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/timesheetshifttypeorg/getbyorgid_link_caAn_forConfirm',
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
	}
});
