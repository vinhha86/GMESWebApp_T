Ext.define('GSmartApp.store.porder.POrder_ListStatusStore', {
    extend: 'Ext.data.Store',
    storeId: 'POrder_ListStatusStore',
    alias: 'store.POrder_ListStatusStore',
    fields: [
        // {name: 'statusNum', type: 'int'},
        // {name: 'statusString', type: 'string'},
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'}
	],
	// data:[
	// 	{statusNum:-1,	statusString:'Chưa chốt PO'},
	// 	{statusNum:0,	statusString:'Chưa phân chuyền'},
    //     {statusNum:1,	statusString:'Đã phân chuyền'},
    //     {statusNum:2,	statusString:'Chuẩn bị SX'},
	// 	{statusNum:3,	statusString:'Công đoạn phụ'},
    //     {statusNum:4,	statusString:'Đang sản xuất'},
    //     {statusNum:5,	statusString:'Sản xuất xong'},
	// 	{statusNum:6,	statusString:'Nhập kho xong'}
	// ],
    loadStore: function(){
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
			url: config.getAppBaseUrl()+'/api/v1/porderstatus/findall',
			paramsAsJson:true,
			noCache: false,
			extraParams : params,
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
