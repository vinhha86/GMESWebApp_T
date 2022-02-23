Ext.define('GSmartApp.view.tagencode.Encode_EditController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.Encode_EditController',
	init: function(){
		var viewModel = this.getViewModel();
		
	},
	listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData',
                newdata: 'onNewData'
            }
        }
	},
	control:{
		'#btnBack': {
			click: 'onBack'
        },
        '#btnLuu':{
            click: 'onLuu'
        }
	},
	onBack: function(){
		this.redirectTo('lstagencode');
	},
    onNewData:function(type){
        var viewModel = this.getViewModel();
        var session = GSmartApp.util.State.get('session');

        viewModel.set('warehouse_encode.timecreate',new Date());
		viewModel.set('warehouse_encode.usercreateid_link', session.id);
		viewModel.set('warehouse_encode.usercreate_name', session.fullName);
        viewModel.set('warehouse_encode.orgencodeid_link', session.orgid_link);
    },
    onLoadData:function(id,type){
        this.getInfo(id);
    },
    getInfo: function(id){
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('Encode_store');
        store.loadByID(id);
		store.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				} 
				else {
                    if (records.length > 0){
                        viewModel.set('warehouse_encode', records[0].data);
                    }
				}
			}
		});        

        // var encode_controller = Ext.getCmp('Encode_Edit_D').getController();
        // if(GSmartApp.Mqtt.client){
        //     if(GSmartApp.Mqtt.deviceid_link != viewModel.get('warehouse_encode.deviceid_link')){
        //         encode_controller.onStop();
        //     }
        //     else
        //     {
        //         encode_controller.onStop();
        //         encode_controller.onStart();
        //     }
        // }        
    },
    onLuu: function(){
        var me = this.getView();
        var mes = this.CheckValidate();
        var viewModel = this.getViewModel();
        var id = viewModel.get('warehouse_encode.id');
        
        if(mes.length == 0)
        {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn có chắc chắn phê duyệt phiên mã hóa? Sau khi duyệt dữ liệu sẽ được lưu vào tồn kho chíp và không thể thay đổi',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                buttonText: {
                    yes: 'Có',
                    no: 'Không'
                },
                fn: function (btn) {
                    if (btn === 'yes') {
                        me.setLoading("Đang lưu dữ liệu");
                        var params = new Object();
                        params.id = id;
                        params.status = 1;

                        GSmartApp.Ajax.post('/api/v1/encode/encode_approve', Ext.JSON.encode(params),
                        function (success, response, options) {
                            me.setLoading(false);
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                if (response.respcode == 200) {
                                    Ext.MessageBox.show({
                                        title: "Thông báo",
                                        msg: "Phê duyệt thành công",
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng',
                                        }
                                    });
                                    viewModel.set('warehouse_encode.status', 1);
                                }
                            }
                    })
                    }
                }
            });
        }
        else
        {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: mes,
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
    },
    CheckValidate: function(){
        var mes = "";
        var viewModel = this.getViewModel();
        console.log(viewModel.get('warehouse_encode'));
        if(viewModel.get('warehouse_encode.orgencodeid_link') == null){
            mes = "Bạn chưa chọn đơn vị mã hóa";
            return mes;
        }

        if(viewModel.get('warehouse_encode.warehouse_encode_d').length == 0){
            mes = "Bạn chưa mã hóa sản phẩm";
            return mes;
        }

        if(viewModel.get('warehouse_encode.deviceid_link') == null){
            mes = "Bạn chưa chọn thiết bị";
            return mes;
        }
        return mes;
    }
});
