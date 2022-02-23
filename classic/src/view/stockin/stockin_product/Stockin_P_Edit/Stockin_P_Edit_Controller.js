Ext.define('GSmartApp.view.stockin.Stockin_P_Edit_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_P_Edit_Controller',
    init: function () {

    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData',
                newdata: 'onNewData',
            }
        }
    },
    control: {
        '#btnBack': {
            click: 'onBackPage'
        },
        '#btnLuu': {
            click: 'onSave'
        },
        '#btnTest': {
            click: 'onTest'
        },
        '#btnConfirm': {
            click: 'onBtnConfirm'
        }
    },
    onTest: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        console.log(stockin);
    },
    onNewData: function (type, id) {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var session = GSmartApp.util.State.get('session');

        viewModel.set('stockin.id', null);
        viewModel.set('stockin.stockindate', new Date());
        viewModel.set('stockin.usercreateid_link', session.id);
        if(id != 0){
            viewModel.set('stockin.stockintypeid_link', id);
        }else{
            viewModel.set('stockin.stockintypeid_link', null);
            viewModel.set('stockin.status', 0);
        }
        // viewModel.set('stockin.status',-1);

        viewModel.set('listepc', new Map());

        var mainView = Ext.getCmp('Stockin_P_Edit');
        if (mainView) mainView.setLoading(true);

        var GpayUser = viewModel.getStore('GpayUser');
        GpayUser.loadUserInfo_Async();
        GpayUser.load({
            scope: this,
            callback: function (records, operation, success) {
                if (mainView) mainView.setLoading(false);
                if (!success) {
                    // this.fireEvent('logout');
                } else {
                    if (null != records[0].data.org_grant_id_link) {
                        viewModel.set('stockin.orgid_to_link', records[0].data.org_grant_id_link)
                    }
                    else {
                        viewModel.set('stockin.orgid_to_link', records[0].data.orgid_link)
                    }

                    if(id == 0){
                        //// 
                        var comboTypeStockin = me.down('#comboTypeStockin');
                        if(comboTypeStockin){
                            comboTypeStockin.setEditable(true);
                            comboTypeStockin.setReadOnly(false);
                            // comboTypeStockin.setCls(null);
                        }
                        ////
                        var OrgFromStore = viewModel.getStore('OrgFromStore');
                        // OrgFromStore.loadStore(8, false);
                        var listidtypefrom = "4,8,9";
                        OrgFromStore.loadStoreByOrgTypeString(listidtypefrom);
                        var OrgToStore = viewModel.getStore('OrgToStore');
                        // OrgToStore.loadStore(8, false);
						var listidtypeto = "8,4";
						OrgToStore.loadStore_allchildren_byorg(listidtypeto);
						// OrgToStore.loadStoreByOrgTypeString(listidtypeto);
                        console.log('here');
                    }
                    if (id == 21) { // Nhap tu san xuat
                        var OrgFromStore = viewModel.getStore('OrgFromStore');
                        OrgFromStore.loadStore(9, false);

                        var OrgToStore = viewModel.getStore('OrgToStore');
                        // OrgToStore.loadStore(8, false);
                        OrgToStore.loadOrgByTypeAndUser([8]);
                        // var listidtype_to = "8";
                        // var OrgToStore = viewModel.getStore('OrgToStore');
                        // OrgToStore.loadStore_byRoot(listidtype_to);
                    }
                    if (id == 22) { // Nhap dieu chuyen
                        var OrgFromStore = viewModel.getStore('OrgFromStore');
                        OrgFromStore.loadStore(8, false);
						// var listidtypefrom = "8,4";
						// // OrgToStore.loadStore_allchildren_byorg(listidtypefrom);
						// OrgFromStore.loadStoreByOrgTypeString(listidtypefrom);

                        var OrgToStore = viewModel.getStore('OrgToStore');
                        OrgToStore.loadOrgByTypeAndUser([8]);
						// var listidtypeto = "8,4";
						// OrgToStore.loadStore_allchildren_byorg(listidtypeto);
						// OrgToStore.loadStoreByOrgTypeString(listidtypeto);
                    }
                }
            }
        });
    },
    onLoadData: function (id, type) {
        this.getInfo(id);
    },
    onBackPage: function () {
        this.redirectTo('stockin_p_main');
    },
    getInfo: function (id, isConfirm) {
        var m = this;
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('StockinD_Store');

        var params = new Object();
        params.id = id;

        var mainView = Ext.getCmp('Stockin_P_Edit');
        if (mainView) mainView.setLoading(true);

        GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_getbyid', Ext.JSON.encode(params),
            function (success, response, options) {
                if (mainView) mainView.setLoading(false);
                if(success){
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        // console.log(response.data);
                        // if(viewModel == null) viewModel = m.getViewModel();

                        //gan gia tri vao list epc
                        // viewModel.set('listepc', response.listepc);
                        // viewModel.set('listepc', new Map());
                        var listepc = new Map();
                        for (var i = 0; i < response.listepc.length; i++) {
                            var epc = response.listepc[i].epc.trim();
                            listepc.set(epc, epc);
                        }
                        viewModel.set('listepc', listepc);
                        
                        viewModel.set('stockin', response.data);
                        store.setData(response.data.stockin_d);
                        store.commitChanges();

                        if (response.data.stockintypeid_link == 21) { // Nhap tu san xuat
                            // var OrgFromStore = viewModel.getStore('OrgFromStore');
                            // OrgFromStore.loadStore(9, false);
                            // var OrgToStore = viewModel.getStore('OrgToStore');
                            // var listidtype = "8,4";
                            // OrgToStore.loadStore_allchildren_byorg(listidtype);
                            // // OrgToStore.loadStoreByOrgTypeString(listidtype);

                            var OrgFromStore = viewModel.getStore('OrgFromStore');
                            OrgFromStore.loadStore(9, false);

                            var OrgToStore = viewModel.getStore('OrgToStore');
                            // OrgToStore.loadStore(8, false);
                            OrgToStore.loadOrgByTypeAndUser([8]);

                            var POrder_ListStore = viewModel.getStore('POrder_ListStore');
                            POrder_ListStore.POrderPOLine_loadby_po(response.data.pcontract_poid_link);
                            var POrder_ListGrantStore = viewModel.getStore('POrder_ListGrantStore');
                            POrder_ListGrantStore.loadStore(response.data.porderid_link);
                        }
                        if (response.data.stockintypeid_link == 22) { // Nhap dieu chuyen
                            var OrgFromStore = viewModel.getStore('OrgFromStore');
                            OrgFromStore.loadStore(8, false);
                            // var listidtypefrom = "8,4";
                            // // OrgFromStore.loadStore_allchildren_byorg(listidtypefrom);
                            // OrgFromStore.loadStoreByOrgTypeString(listidtypefrom);
                            var OrgToStore = viewModel.getStore('OrgToStore');
                            OrgToStore.loadOrgByTypeAndUser([8]);
                            // var listidtypeto = "8,4";
                            // OrgToStore.loadStore_allchildren_byorg(listidtypeto);
                            // OrgToStore.loadStoreByOrgTypeString(listidtypeto);
                        }

                        // set gia tri sl nhap mac dinh = sl yeu cau
                        // m.setSlNhap();

                        // nếu là Duyệt
                        if (isConfirm == true) {
                            m.onConfirm();
                        }
                    }
                }
            })
    },
    setSlNhap: function () {
        // set gia tri sl nhap mac dinh = sl yeu cau
        var m = this;
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('StockinD_Store');
        var stockin = viewModel.get('stockin');

        if (stockin.status == -1) { // 
            var stockin_d = viewModel.get('stockin.stockin_d');
            if (stockin_d == null) stockin_d = [];
            for (var i = 0; i < stockin_d.length; i++) {
                stockin_d[i].totalpackagecheck = stockin_d[i].totalpackage;
            }
            viewModel.set('stockin.stockin_d', stockin_d);
            // viewModel.set('stockin', response.data);
            store.setData(stockin_d);
            store.commitChanges();
        }
        // console.log(stockin);
    },
    CheckValidate: function () {
        var mes = "";
        var stockin = this.getViewModel().get('stockin');
        // console.log(stockin);
        if (stockin.stockintypeid_link == null) {
            mes = "Không được bỏ trống loại phiếu";
        }
        else if (stockin.orgid_from_link == null) {
            mes = "Không được bỏ trống nơi giao";
        }
        else if (stockin.orgid_to_link == null) {
            mes = "Không được bỏ trống nơi nhập";
        }
        else if (stockin.stockin_d.length == 0) {
            mes = "Phiếu chưa có danh sách sản phẩm";
        }
        return mes;
    },
    onSave: function (isConfirm) {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var mes = this.CheckValidate();
        if (mes == "") {

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

            // nếu không có npl, ko cho Lưu
            if(stockin_d == null || stockin_d.length == 0){
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: 'Danh sách không có sản phẩm',
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                return;
            }
            if (stockin.orgid_from_link == null || stockin.orgid_from_link == '' || isNaN(stockin.orgid_from_link)) {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: 'Không được bỏ trống nơi giao',
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                return;
            }
            if (stockin.orgid_to_link == null || stockin.orgid_to_link == '' || isNaN(stockin.orgid_to_link)) {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: 'Không được bỏ trống nơi nhận',
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                return;
            }

            var params = new Object();
            params.data = [];
            params.data.push(stockin);

            var mainView = Ext.getCmp('Stockin_P_Edit');
            if (mainView) mainView.setLoading(true);

            GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_create', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (mainView) mainView.setLoading(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            if (isConfirm == false) {
                                Ext.MessageBox.show({
                                    title: "Thông báo",
                                    msg: 'Lập phiếu thành công',
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }

                            var StockinD_Store = viewModel.get('StockinD_Store');
                            StockinD_Store.commitChanges();

                            // me.redirectTo("stockin_p_main/" + response.id + "/edit");
                            // me.fireEvent('loaddata', response.id);
                            
                            var str = Ext.getWin().dom.location.href;
                            var hash = str.split('#')[1];
                            if(hash == "stockin_p_main/" + response.id + "/edit"){
                                m.getInfo(response.id);
                            }else{
                                m.redirectTo("stockin_p_main/" + response.id + "/edit");
                            }
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
        else {
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
    onBtnConfirm: function () {
        this.onConfirm();
    },
    onConfirm: function () {
        var m = this;
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
            params.stockin = stockin;
            params.stockinId = stockinId;
            params.approver_userid_link = approver_userid_link;

            var mainView = Ext.getCmp('Stockin_P_Edit');
            if (mainView) mainView.setLoading(true);

            GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_approve', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (mainView) mainView.setLoading(false);
                    var response = Ext.decode(response.responseText);
                    if (success) {
                        // console.log(response);
                        if (response.respcode == 200) {
                            if(response.message == 'EPC đã có trong kho'){
                                Ext.Msg.show({
									title: 'Thông báo',
									msg: response.message,
									buttons: Ext.MessageBox.YES,
									buttonText: {
										yes: 'Đóng',
									},
								});

								var data = response.data;
								m.setConfirmReturnData(data); // set thong tin tra ve cho grid
                            }else{
                                Ext.Msg.show({
                                    title: 'Thông báo',
                                    msg: 'Duyệt thành công',
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                                var data = response.data;
                                viewModel.set('stockin', data);
                                m.getApproverName(data.approverid_link);
                            }
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
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                })
        })
    },
    setConfirmReturnData: function(data){
		var viewModel = this.getViewModel();
		var stockin = viewModel.get('stockin');
		var stockin_d = viewModel.get('stockin.stockin_d'); // data giao dien
		var new_stockin_d = data.stockin_d; // data tra ve

		// console.log(stockin_d);f

		for(var i = 0; i < stockin_d.length; i++){
			for(var j = 0; j < new_stockin_d.length; j++){
				var stockin_d_obj = stockin_d[i];
				var new_stockin_d_obj = new_stockin_d[j];
				if(stockin_d_obj.id == new_stockin_d_obj.id){
					stockin_d_obj.isPklistInStore = new_stockin_d_obj.isPklistInStore;
					var stockin_packinglist = stockin_d_obj.stockin_packinglist;
					var new_stockin_packinglist = new_stockin_d_obj.stockin_packinglist;
					for(var k = 0; k < stockin_packinglist.length; k++){
						for(var l = 0; l < new_stockin_packinglist.length; l++){
							if(stockin_packinglist[k].id == new_stockin_packinglist[l].id){
								stockin_packinglist[k].status = new_stockin_packinglist[l].status;
							}
						}
					}
				}
			}
		}
		viewModel.set('stockin', stockin);

		var StockinD_Store = viewModel.getStore('StockinD_Store');
		StockinD_Store.removeAll();
		StockinD_Store.insert(0, stockin_d);
		StockinD_Store.commitChanges();
		// console.log(stockout);
		// console.log(stockout_d);
	},
    getApproverName: function(userid){
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');

        var params = new Object();
        params.id = userid;

        var mainView = Ext.getCmp('Stockin_P_Edit');
        if (mainView) mainView.setLoading(true);

        GSmartApp.Ajax.post('/api/v1/users/user_getinfo', Ext.JSON.encode(params),
            function (success, response, options) {
                if (mainView) mainView.setLoading(false);
                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.respcode == 200) {
                        // console.log(response);
                        // console.log(stockin);
                        stockin.userApprove_name = response.data.fullName;
                        viewModel.set('stockin', stockin);
                    }
                }
            })
    }
})