Ext.define('GSmartApp.store.UserTreeStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.usertreestore',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'text_vi',   type: 'string'},
		{name: 'text_en',   type: 'string'},
		{
			name: 'text',   
			type: 'string',
			calculate: function(data) {
				if('en'==GSmartApp.Locales.currentLocale){
					 return data.text_en;
				}else{
					return data.text_vi
				}
               
			}
		},
		{name: 'rowCls',   type: 'string'},
		{
			name: 'iconCls',   
			type: 'string',
			convert: function (value) {
				return 'x-fa fa-'+value;
			}
		},
		{name: 'routeId',   type: 'string'},
		{name: 'viewType',   type: 'string'},
		{name: 'leaf'},
		{name: 'title_vi',   type: 'string'},
		{name: 'title_en',   type: 'string'},
        {
			name: 'title',   
			type: 'string',
			calculate: function(data) {
				if('en'==GSmartApp.Locales.currentLocale){
					 return data.title_en;
				}else{
					return data.title_vi
				}
               
			}
		},
		{name: 'title_new_vi',   type: 'string'},
		{name: 'title_new_en',   type: 'string'},
        {
			name: 'title_new',   
			type: 'string',
			calculate: function(data) {
				if('en'==GSmartApp.Locales.currentLocale){
					 return data.title_new_en;
				}else{
					return data.title_new_vi
				}
               
			}
		},
		{name: 'title_edit_vi',   type: 'string'},
		{name: 'title_edit_en',   type: 'string'},
        {
			name: 'title_edit',   
			type: 'string',
			calculate: function(data) {
				if('en'==GSmartApp.Locales.currentLocale){
					 return data.title_edit_en;
				}else{
					return data.title_edit_vi
				}
               
			}
		},
		{name: 'xtype_edit',  type: 'string'},
		{name: 'xtype_new',  type: 'string'},
		{name: 'urlc',   type: 'string'},
		{name:'type', type:'number'},
		{name:'index', type:'number'}
	],
	sorters: [{
        property: 'index',
        direction: 'DESC'
    }],
	loadUser:function(me,access_token,userid,callback){
		
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/menu/usertree_getbyid',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "GSmartApplication/json", 
				'Content-Type':"GSmartApplication/json",
				'authorization': 'Bearer ' + access_token
			 },
			extraParams: {
				userid: userid
			},
			reader: {
				type: 'json',
				rootProperty: 'children'
			}
		});
		this.load();
	}
});
