Ext.define('GSmartApp.store.unit.UnitStore', {
    extend: 'Ext.data.Store',
	alias: 'store.UnitStore',
	storeId: 'UnitStore',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'code',  type: 'string'},
        {name: 'name',   type: 'string'},
		{name: 'name_en',   type: 'string'},
		{
            name: 'name_width',
            type: 'string',
            convert: function (value, rec) {
                var id = rec.get('id');
                if(id == 1){
                    return 'CM';
                }
                if(id == 3){
                    return 'INCH';
                }
                return rec.get('name');;
            }
		},
	],
	sorters: [{
        direction: 'ASC',
        property: 'name'
	}],
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
			url: config.getAppBaseUrl()+'/api/v1/unit/getall',
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
				// else {
				// 	console.log(records);
				// }
			}
		});
	},
	loadStore_async:function(){
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
			url: config.getAppBaseUrl()+'/api/v1/unit/getall',
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
