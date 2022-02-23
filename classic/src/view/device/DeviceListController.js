Ext.define('GSmartApp.view.device.InvoiceListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.devicelist',
	mqttclient:null,
	init: function() {
        this.callParent(arguments);
		
    },
	listen: {
        controller: {
            '*': {
				urlBack:'onUrlBack',
            }
        }
    },
	onUrlBack:function(type){
		var call =false;
		if(type.getId()=='lsdevice'){
			call =false;
			var me=this;
			var view =this.getView();
			var viewModel = view.getViewModel();
			viewModel.set('urlback',type);
			var store = Ext.getStore('DeviceTreeStore');
			var orgStore = Ext.getStore('OrgStore');
			orgStore.GetAllOrgByRoot();
			var formDevice = this.lookupReference('formDeviceSearch');
			formDevice.getForm().reset(); 
			this.onSearch();
			call = setInterval(function(){
				me.onSearch();
				if(call){
					clearInterval(call);
				}
			}, 30*1000)
		}else{
			call =true;
			
		}
	},
	onSearch:function(){
		var me= this;
		var store = Ext.getStore('DeviceTreeStore');
		var formDevice = this.lookupReference('formDeviceSearch'); 
		var params  = formDevice.getValues();
		me.getView().setLoading(true);
		store.loadStore(params,function(){
			me.getView().setLoading(false);
		});
	},
	onMenu: function (grid, rowIndex, colIndex, item, e, record) {
		var me= this;
		var menu_grid ;
		if(3==record.get('status')){
			menu_grid = new Ext.menu.Menu({
			   items: [{ 
					text: GSmartApp.Locales.btn_mokhoa_thietbi[GSmartApp.Locales.currentLocale],
					iconCls: 'x-fa fa-unlock',
					handler: function() {
						me.onDeviceUnLock(record);
					} 
			   },{
					text: GSmartApp.Locales.btn_download[GSmartApp.Locales.currentLocale],
					iconCls: 'x-fa fa-cloud-download',
					handler:function(){
						
					}
				}]
			});
		}else{
			menu_grid = new Ext.menu.Menu({
			   items: [{ 
					text: GSmartApp.Locales.btn_khoa_thietbi[GSmartApp.Locales.currentLocale],
					iconCls: 'x-fa fa-lock',
					handler: function() {
						me.onDeviceLock(record);
					} 
			   },{
					text: GSmartApp.Locales.btn_download[GSmartApp.Locales.currentLocale],
					iconCls: 'x-fa fa-cloud-download',
					handler:function(){
						
					}
				}]
			});
		}
		
		var position = e.getXY();
        e.stopEvent();
        menu_grid.showAt(position);
    },
	onCreate:function(){
		var me=this;
		var formDevice = me.lookupReference('formDevice');
		formDevice.getForm().reset(); 
	},
	onDelete:function(tree, info){
		Ext.Msg.show({ 
		  title: GSmartApp.Locales.title_xoa[GSmartApp.Locales.currentLocale],
		  msg: null, 
		  buttons: [{ 
			itemId: 'ok',  
			text: GSmartApp.Locales.btn_co[GSmartApp.Locales.currentLocale],   
			ui: 'action' 
		  }, {
			itemId: 'cancel',   
			text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale], 
		  }], 
		  fn: function(text,btn) {
			  if('ok'==text){
					//Ext.Viewport.setMasked({ xtype: 'loadmask' });
					//GSmartApp.Ajax.post('/gsmartinv/api/v1/invoice/invoice_deletebyid','{"invoiceid": '+info.record.id+'}',
					//function(success,response,options ) {
					//	Ext.Viewport.setMasked(false);
					//})
							
			  }
		  }  
		});
	},
	onDeviceClick:function( grid, record, item, index, e, eOpts){
		var formDevice = this.lookupReference('formDevice');
		formDevice.getForm().setValues(record.data);
	},
	onDeviceLock:function(params){
		var me =this;
		var formDevice = this.lookupReference('formDevice');
		GSmartApp.Ajax.post('/api/v1/device/device_look','{"id": '+params.getId()+'}',
			function(success,response,options ) {
				if(success){
					var response = Ext.decode(response.responseText);
					var store = Ext.getStore('DeviceTreeStore');
					store.loadStore();
					formDevice.getForm().reset(); 
				}else{
					Ext.Msg.alert(GSmartApp.Locales.title_thongbao[GSmartApp.Locales.currentLocale], GSmartApp.Locales.error_khoathietbi[GSmartApp.Locales.currentLocale]);
				}
			})
	},
	onDeviceUnLock:function(params){
		var me =this;
		var formDevice = this.lookupReference('formDevice');
		GSmartApp.Ajax.post('/api/v1/device/device_unlook','{"id": '+params.getId()+'}',
			function(success,response,options ) {
				if(success){
					var response = Ext.decode(response.responseText);
					var store = Ext.getStore('DeviceTreeStore');
					store.loadStore();
					formDevice.getForm().reset(); 
				}else{
					Ext.Msg.alert(GSmartApp.Locales.title_thongbao[GSmartApp.Locales.currentLocale], GSmartApp.Locales.error_khoathietbi[GSmartApp.Locales.currentLocale]);
				}
			})
	},
	onSave:function(){
		var me =this;
		var formDevice = this.lookupReference('formDevice');
		if(!formDevice.getForm().isValid()){
			Ext.Msg.alert(GSmartApp.Locales.title_thongbao[GSmartApp.Locales.currentLocale], GSmartApp.Locales.error_dauvaosai[GSmartApp.Locales.currentLocale]);
		}else{
			var data =new Array();
			data.push(formDevice.getValues());
			var params=new Object();
			params.msgtype ="DEVICE_CREATE";
			params.message = "Tạo device";
			params.data = data;
			me.getView().setLoading(true);
			GSmartApp.Ajax.post('/api/v1/device/device_create',Ext.JSON.encode(params),
			function(success,response,options ) {
				if(success){
					var response = Ext.decode(response.responseText);
					var store = Ext.getStore('DeviceTreeStore');
					store.loadStore();
					formDevice.getForm().reset(); 
				}else{
					Ext.Msg.show({ 
					  title: 'Thông báo',
					  msg: 'Thêm mới/sửa thất bại', 
					  buttons: Ext.MessageBox.YES,
					  buttonText: {
						yes: 'Đóng',
					  }
					});
				}
				me.getView().setLoading(true);
			})
		}
		
	}
})