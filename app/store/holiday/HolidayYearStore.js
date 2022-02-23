Ext.define('GSmartApp.store.holiday.HolidayYearStore', {
    extend: 'Ext.data.Store',
	alias: 'store.HolidayYearStore',
	storeId: 'HolidayYearStore',
	fields: [
        // {name: 'year', type: 'string'},
        {
			name: 'year', type: 'int',
			convert: function (value) {
                if(value == null)
                    return 'Tất cả';
                return value;
			}
		}
    ],
	loadStore:function(){
		var me=this;
		var params = new Object();
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/holiday/getallyears',
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
	}
});
