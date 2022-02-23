Ext.define('GSmartApp.store.DeviceGroupStore', {
    extend: 'Ext.data.Store',
    alias: 'store.devicegroupstore',
	fields: [
		{name: 'id', type: 'number'},
		{name: 'name',   type: 'string'}
	],
	data:[{ 
		id:1,
		name:'Nhóm thiết bị số 1'
	},{
		id:2,
		name:'Nhóm thiết bị số 2'
	}],
	loadStore:function(){
		var me=this;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/device/getalldevicegroup',
			paramsAsJson:true,
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
					//  this.fireEvent('logout');
				}
			}
		});
	}
	
});
