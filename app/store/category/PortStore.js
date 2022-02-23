Ext.define('GSmartApp.store.PortStore', {
    extend: 'Ext.data.Store',
    alias: 'store.portstore',
    storeId: 'PortStore',
    fields: [
		{name: 'id', type: 'string'},
		{name: 'code',  type: 'string'},
		{name: 'name',   type: 'string'},
		{name: 'name_en',   type: 'string'}
	],
	proxy: {
        type: 'ajax',
		actionMethods: {
			create : 'POST',
			read   : 'POST',
			update : 'POST',
			destroy: 'POST'
		},
		cors: true,
		headers :{
			'Content-Type':"application/json",
			'authorization': config.getToken()
		},
		useDefaultXhrHeader: false,
        url: config.getAppBaseUrl()+'/api/v1/categoty/getPortAll',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
	loadStore:function(type, isAll){
		var me=this;
		// if(isAll == null)
		// isAll = false;
		// var params = new Object();
		// params.orgtypeid_link = type;
		// params.isAll = isAll;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/categoty/getPortAll',
			paramsAsJson:true,
			// extraParams : params,
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
