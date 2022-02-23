Ext.define('GSmartApp.view.devicein.StockInDeviceEditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockInDeviceEditController',
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
        this.redirectTo('stockin_device');
    },
    getInfo: function(id){
        var me = this;
        var viewmodel = this.getViewModel();
        var Devicein_D_Store = viewmodel.getStore('Devicein_D_Store');
        // var listepc = viewmodel.get('listepc');

        var params = new Object();
        params.id = id ;
        GSmartApp.Ajax.post('/api/v1/devicein/getbyid',Ext.JSON.encode(params),
		function(success,response,options ) {
            var response = Ext.decode(response.responseText);
            if(response.respcode == 200) {
                console.log(response.data);
                viewmodel.set('devicein', response.data);
                // for(var i=0; i<response.listepc.length; i++){
                //     listepc.set(response.listepc[i].epc, response.listepc[i].epc);
                // }
                Devicein_D_Store.setData(response.data.devicein_d);
            }
		})
    },
    CheckValidate: function(){
		var mes = "";
		var devicein = this.getViewModel().get('devicein');
		if(devicein.deviceintypeid_link == null){
			mes = "Bạn chưa chọn loại phiếu";
		}
		// else if (devicein.orgid_from_link == null){
		// 	mes = "Bạn chưa chọn nơi giao";
		// }
		else if (devicein.orgid_to_link == null){
			mes = "Bạn chưa chọn nơi nhập";
		} 
		else if (devicein.devicein_d.length == 0){
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
            var devicein = viewmodel.get('devicein');
            
            console.log(devicein);
            // params.data.push(devicein);
            params.data = devicein;
            params.data_d = devicein.devicein_d;
            me.setLoading("Đang lưu dữ liệu");
            GSmartApp.Ajax.post('/api/v1/devicein/create', Ext.JSON.encode(params),
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
                            this.redirectTo("stockin_device/" + response.id + "/edit");
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