Ext.define('GSmartApp.store.org.OrgTreeStore', {
    extend: 'Ext.data.TreeStore',
	alias: 'store.OrgTreeStore',
	storeId: 'OrgTreeStore',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'code',  type: 'string'},
        {name: 'name',   type: 'string'},
		{name: 'orgtypeid_link',   type: 'int'},
		{name: 'countryid_link',   type: 'int'},
        {name: 'city', type: 'string'},
        {name: 'address',   type: 'string'},
        {name: 'gpslat',   type: 'number'},
        {name: 'gpslong',   type: 'number'},
        {name: 'mainbizid_link',   type: 'int'},
		{name: 'timezone',   type: 'int'},
		{name: 'contactperson',   type: 'string'},
		{name: 'email',   type: 'string'},
        {name: 'langid_link',   type: 'int'},
        {name: 'status',   type: 'int'},
		{name: 'parentid_link',   type: 'int'},
		{name: 'phone',   type: 'string'},
        {name: 'rootid_link',   type: 'int'},
        {name: 'leaf'},
	],
	sorters: {
        direction: 'ASC',
        property: 'name'
    },
	loadStore:function(type){
		var me=this;
		var params = new Object();
		params.orgtypeid_link = type;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/org/getOrgByTypeId',
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
});
