Ext.define('GSmartApp.view.handover.HandoverPackToStock_Edit_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverPackToStock_Edit_Controller',
	init: function() {
        
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData',
                newdata: 'onNewData',
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
        },
        '#btnConfirm':{
            click: 'onConfirm'
        }
    },
    onUrlBack: function(type){
        
    },
    onNewData:function(type, id){
        var viewModel = this.getViewModel();
        var session = GSmartApp.util.State.get('session');

        viewModel.set('stockin.stockindate',new Date());
        viewModel.set('stockin.usercreateid_link', session.id);
        viewModel.set('listepc', new Map());
        // viewModel.set('stockin.orgid_to_link', session.orgid_link)
        viewModel.set('stockin.stockintypeid_link', id);

        var mainView = Ext.getCmp('HandoverPackToStock_Edit');
        if(mainView) mainView.setLoading(true);

        var GpayUser = viewModel.getStore('GpayUser');
		GpayUser.loadUserInfo_Async();
		GpayUser.load({
			scope: this,
			callback: function(records, operation, success) {
                if(mainView) mainView.setLoading(false);
				if(!success){
					 // this.fireEvent('logout');
				} else {
					if (null!=records[0].data.org_grant_id_link){
                        viewModel.set('stockin.orgid_from_link', records[0].data.org_grant_id_link);
                    }
					else{
                        viewModel.set('stockin.orgid_from_link', records[0].data.orgid_link);
                    }

                    if(id == 21) { // Nhap tu san xuat
                        var OrgFromStore = viewModel.getStore('OrgFromStore');
                        OrgFromStore.loadStore(9, false);
                        var OrgToStore = viewModel.getStore('OrgToStore');
                        OrgToStore.loadStore(8, false);
                    }
				}
			}
		});
    },
    onLoadData:function(id,type){
        this.getInfo(id);
    },
    onBackPage: function(){
        this.redirectTo('handover_pack_tostock');
    },
    getInfo: function(id){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('StockinD_Store');

        var params = new Object();
        params.id = id ;

        var mainView = Ext.getCmp('HandoverPackToStock_Edit');
        if(mainView) mainView.setLoading(true);

        GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_getbyid',Ext.JSON.encode(params),
		function(success,response,options ) {
            if(mainView) mainView.setLoading(false);
            var response = Ext.decode(response.responseText);
            if(response.respcode == 200) {
                viewModel = m.getViewModel();
                if(viewModel){
                    viewModel.set('stockin', response.data);
                    store.setData(response.data.stockin_d);
                    store.commitChanges();
    
                    if(response.data.stockintypeid_link == 21) { // Nhap tu san xuat
                        var OrgFromStore = viewModel.getStore('OrgFromStore');
                        OrgFromStore.loadStore(9, false);
                        var OrgToStore = viewModel.getStore('OrgToStore');
                        OrgToStore.loadStore(8, false);
                        var POrder_ListStore = viewModel.getStore('POrder_ListStore');
                        POrder_ListStore.POrderPOLine_loadby_po(response.data.pcontract_poid_link);
                        var POrder_ListGrantStore = viewModel.getStore('POrder_ListGrantStore');
                        POrder_ListGrantStore.loadStore(response.data.porderid_link);
                    }
                }
            }
		})
    },
    CheckValidate: function(){
		var mes = "";
		var stockin = this.getViewModel().get('stockin');
        // console.log(stockin);
		if(stockin.stockintypeid_link == null){
			mes = "Bạn chưa chọn loại phiếu";
		}
		else if (stockin.orgid_from_link == null){
			mes = "Bạn chưa chọn nơi giao";
		}
		else if (stockin.orgid_to_link == null){
			mes = "Bạn chưa chọn nơi nhập";
		} 
		else if (stockin.stockin_d.length == 0){
			mes = "Phiếu chưa có danh sách sản phẩm";
		}
		return mes;
	},
    onSave: function(){
        var m=this;
        var me = this.getView();
        var myview = this.getView();

        var mes = this.CheckValidate();
        if(mes == ""){
            var viewModel = this.getViewModel();
            var params = new Object();
            params.data = [];
            var stockin = viewModel.get('stockin');

            var stockin_d = stockin.stockin_d;
            if(stockin_d != null){
                for(var i = 0; i < stockin_d.length; i++){
                    if(stockin_d[i].id == 0 || typeof stockin_d[i].id === 'string'){
                        stockin_d[i].id = null;
                    }

                    var stockin_packinglist = stockin_d[i].stockin_packinglist;
                    if(stockin_packinglist != null){
                        for(var j = 0; j < stockin_packinglist.length; j++){
                            if(stockin_packinglist[j].id == 0 || typeof stockin_packinglist[j].id === 'string'){
                                stockin_packinglist[j].id = null;
                            }
                            if(stockin_packinglist[j].stockindid_link == 0 || typeof stockin_packinglist[j].stockindid_link === 'string'){
                                stockin_packinglist[j].stockindid_link = null;
                            }
                        }
                    }
                }
            }
            var stockin_product = stockin.stockin_product;
            if(stockin_product != null){
                for(var i = 0; i < stockin_product.length; i++){
                    if(stockin_product[i].id == 0 || typeof stockin_product[i].id === 'string'){
                        stockin_product[i].id = null;
                    }
                }
            }

            params.data.push(stockin);
            myview.setLoading("Đang lưu dữ liệu");
            GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_create', Ext.JSON.encode(params),
                function (success, response, options) {
                    myview.setLoading(false);
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
                            m.redirectTo("handover_pack_tostock/" + response.id + "/edit");
                            m.fireEvent('loaddata', response.id);

                            // m.getInfo(response.id);
                            // this.redirectTo("stockin_p_main/" + response.id + "/edit");
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
    },
	onConfirm: function(){
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinId = stockin.id;
        var form = Ext.create('Ext.window.Window', {
            // height: 200,
            width: 315,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Duyệt',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Authen_Confirm',
            }]
        });
        form.show();

		form.down('#Authen_Confirm').getController().on('AuthenOK', function (approver_userid_link) {
            form.close();

			// console.log(approver_userid_link);

			var params = new Object();
			params.stockinId = stockinId;
			params.approver_userid_link = approver_userid_link;
	
			GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_approve', Ext.JSON.encode(params),
				function (success, response, options) {
					if (success) {
						var response = Ext.decode(response.responseText);
						// console.log(response);
						if (response.respcode == 200) {
							Ext.Msg.show({
								title: 'Thông báo',
								msg: 'Duyệt thành công',
								buttons: Ext.MessageBox.YES,
								buttonText: {
									yes: 'Đóng',
								}
							});
							
							// m.onThoat();
						}
						else {
							Ext.Msg.show({
								title: 'Duyệt thất bại',
								msg: response.message,
								buttons: Ext.MessageBox.YES,
								buttonText: {
									yes: 'Đóng',
								}
							});
						}
	
					} else {
						Ext.Msg.show({
							title: 'Duyệt thất bại',
							msg: "Liên hệ IT để được hỗ trợ",
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
					}
				})
        })
    }    
})