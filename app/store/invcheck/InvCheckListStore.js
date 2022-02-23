Ext.define('GSmartApp.store.invcheck.InvCheckListStore', {
    extend: 'Ext.data.Store',
    alias: 'store.InvCheckListStore',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'invcheckcode',  type: 'string'},
		{
			name: 'invcheckdatetime',
			convert: function (value) {
				 var date =  new Date(value)
				 return date.toLocaleDateString(GSmartApp.util.State.get('dataFormatList'));
			 }
		},
		{name: 'orgcheck_code',  type: 'string'},
		{name: 'orgcheck_name',  type: 'string'},
		{name: 'user_name',  type: 'string'},
		{
			name: 'status',
			convert: function (value) {
				 if(value==1){
					return GSmartApp.Locales.ketthuc_kiemke[GSmartApp.Locales.currentLocale];
				 }else{
					return GSmartApp.Locales.dang_kiemke[GSmartApp.Locales.currentLocale];
				}
			 }
		},
	],
    loadStore: function(invdateto_from, invdateto_to, orgfrom_code, status){
            var me=this;
            var params = new Object();
            params.invdateto_from = invdateto_from;
            params.invdateto_to = invdateto_to;
            params.orgfrom_code = orgfrom_code;
            params.status = status;

            this.setProxy({
                type: 'ajax',
                actionMethods: {
                    create : 'POST',
                    read   : 'POST',
                    update : 'POST',
                    destroy: 'POST'
                },
                url: config.getAppBaseUrl_Jitin()+'/api/v1/invcheck/invcheck_list',
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
            this.load({
                scope: this,
                callback: function(records, operation, success) {
                    if(!success){
                         // this.fireEvent('logout');
                    }
                }
            });
    },	
});
