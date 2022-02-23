Ext.define('GSmartApp.view.deviceout.StockOutDeviceEditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockOutDeviceEditController',
	init: function() {
        
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData',
                // newdata: 'onNewData',
				urlBack:'onUrlBack'
            }
        }
	},
    control:{
        '#btnBack':{
            click: 'onBackPage'
        },
        '#btnLuu':{
            click: 'onSave'
        }
    },
    onUrlBack: function(type){
        
    },
    // onNewData:function(type){
    //     var viewModel = this.getViewModel();
    //     var session = GSmartApp.util.State.get('session');
    //     console.log(session);

    //     // viewModel.set('stockin.stockindate',new Date());
    //     // viewModel.set('stockin.usercreateid_link', session.id);
    //     // viewModel.set('listepc', new Map());
    //     // viewModel.set('stockin.orgid_to_link', session.orgid_link)
    // },
    onLoadData:function(id,type){
        this.getInfo(id);
    },
    onBackPage: function(){
        this.redirectTo('stockout_device');
    },
    getInfo: function(id){
        var me = this;
        var viewmodel = this.getViewModel();
        var DeviceOut_D_Store = viewmodel.getStore('DeviceOut_D_Store');
        // var listepc = viewmodel.get('listepc');

        var params = new Object();
        params.id = id ;
        GSmartApp.Ajax.post('/api/v1/deviceout/getbyid',Ext.JSON.encode(params),
		function(success,response,options ) {
            var response = Ext.decode(response.responseText);
            if(response.respcode == 200) {
                console.log(response.data);
                viewmodel.set('deviceout', response.data);
                // for(var i=0; i<response.listepc.length; i++){
                //     listepc.set(response.listepc[i].epc, response.listepc[i].epc);
                // }
                DeviceOut_D_Store.setData(response.data.deviceout_d);
            }
		})
    },
    CheckValidate: function(){
		var mes = "";
		var deviceout = this.getViewModel().get('deviceout');
		if(deviceout.deviceouttypeid_link == null){
			mes = "Bạn chưa chọn loại phiếu";
		}
		else if (deviceout.orgid_from_link == null){
			mes = "Bạn chưa chọn nơi xuất";
		} 
		else if (deviceout.deviceout_d.length == 0){
			mes = "Phiếu chưa có danh sách sản phẩm";
		}
		return mes;
	},
    onSave: function(){
        var me = this.getView();

        var mes = this.CheckValidate();
        if(mes == ""){
            var viewmodel = this.getViewModel();
            var params = new Object();
            // params.data = [];
            var deviceout = viewmodel.get('deviceout');
            
            console.log(deviceout);
            // params.data.push(devicein);
            params.data = deviceout;
            params.data_d = deviceout.deviceout_d;
            me.setLoading("Đang lưu dữ liệu");
            GSmartApp.Ajax.post('/api/v1/deviceout/create', Ext.JSON.encode(params),
                function (success, response, options) {
                    me.setLoading(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            Ext.MessageBox.show({
								title: "Thông báo",
								msg: 'Lập phiếu thành công',
								buttons: Ext.MessageBox.YES,
								buttonText: {
									yes: 'Đóng',
								}
							});				
                            this.redirectTo("stockout_device/" + response.id + "/edit");
                        }
                    } else {
                        var response = Ext.decode(response.responseText);
                        Ext.MessageBox.show({
							title: "Thông báo",
							msg: 'Lỗi lập phiếu: ' + response.message,
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
                    }
            })
        }
        else{
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: mes,
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
    }
})