Ext.define('GSmartApp.store.groupuser.GroupUser_Function_Store', {
    extend: 'Ext.data.Store',
	alias: 'store.GroupUser_Function_Store',
	model: 'GSmartApp.model.groupuser.GroupUserModel',
	sorters: {
        direction: 'ASC',
        property: 'id'
    },
	loadStore_byrole: function(roleid_link, menuid_link){
        var me=this;
        var params = new Object();
		params.roleid_link = roleid_link;
		params.menuid_link = menuid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/appfunction/getby_roleid',
            paramsAsJson:true,
            extraParams: params,
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
	loadStore_inrole: function(roleid_link, menuid_link){
        var me=this;
        var params = new Object();
		params.roleid_link = roleid_link;
		params.menuid_link = menuid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/appfunction/getin_roleid',
            paramsAsJson:true,
            extraParams: params,
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
