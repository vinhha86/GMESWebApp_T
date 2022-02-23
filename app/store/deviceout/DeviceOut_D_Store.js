Ext.define('GSmartApp.store.deviceout.DeviceOut_D_Store', {
    extend: 'Ext.data.Store',
	alias: 'store.DeviceOut_D_Store',
    fields: [
        {name: 'id'},
        {name: 'deviceGroupName', type: 'string'},
        {name: 'deviceName', type: 'string'},
        {name: 'deviceCode', type: 'string'},
    ],
    // loadStore: function(id){
	// 	var me=this;
    //     var params = new Object();
    //     params.id = id;

	// 	this.setProxy({
	// 		type: 'ajax',
	// 		actionMethods: {
	// 			create : 'POST',
	// 			read   : 'POST',
	// 			update : 'POST',
	// 			destroy: 'POST'
	// 		},
	// 		url: config.getAppBaseUrl()+'/api/v1/deviceout_d/getByDeviceOut',
	// 		paramsAsJson:true,
	// 		extraParams : params,
	// 		noCache: false,
	// 		headers :{
	// 			'Accept': "application/json", 
	// 			'Content-Type':"application/json"
	// 		 },
	// 		reader: {
	// 			type: 'json',
	// 			rootProperty: 'data',
	// 		}
	// 	});
	// 	this.loadPage(1,{
	// 		scope: this,
	// 		callback: function(records, operation, success) {
	// 			if(!success){
	// 				 this.fireEvent('logout');
	// 			}
	// 		}
	// 	});
	// }
});
