Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_EditController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockout_P_EditController',
	init: function () {
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var devicestore = viewModel.getStore('DeviceInvStore');
		if(devicestore) devicestore.loadStore(3);

		var isWindow = viewModel.get('isWindow');
		// console.log(isWindow);
		if(isWindow){
			var stockouttypeid_link = viewModel.get('stockouttypeid_link');
			m.onNewData(null, stockouttypeid_link);
		}
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
		'#loaitien': {
			select: 'onSelectCurency'
		},
		'#cmbGroupStockout': {
			select: 'onSelectGroupStockout'
		},
        '#btnLuu':{
            click: 'onSave'
        },
		'#btnConfirm':{
            click: 'onBtnConfirm'
        },
		// window
		'#btnThoatWindow': {
			click: 'onBtnThoatWindow'
		},
		'#btnLuuWindow': {
			click: 'onBtnLuuWindow'
		},
		/////////
	},
	
	channel: { cmd: null, dta: null },
	renderCell: function (value, record) {
		if (null == value) value = 0;
		return '<div style="font-size: 11px;">' + Ext.util.Format.number(value, '0,000') + '</div>';
	},
	renderSum: function (value, summaryData, dataIndex) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
	},
	onSelectCurency: function (combo, record, eOpts) {
		var viewModel = this.getViewModel();
		viewModel.set('stockout.vat_exchangerate', record.data.exrate);
	},
	onDeviceChange: function (combo, newValue, oldValue, eOpts) {
		var m = this;
		var txtDevice = m.lookupReference('device');
		var deviceId = txtDevice.getValue();
		var device = txtDevice.getStore().getById(deviceId);
		if (device) {
			GSmartApp.util.State.set('device_inv', device.data);
		}

	},
	onUrlBack: function (type) {
		this.redirectTo("stockout_p_main");
	},
	onLoadData: function (id, type) {
		this.getInfo(id);
	},
	getInfo: function (id, isConfirm) {
		var m = this;
		var viewModel = this.getViewModel();
		var store = viewModel.getStore('StockoutD_Store');
		// var listepc = viewModel.get('listepc');

		var params = new Object();
		params.id = id;

		var mainView = Ext.getCmp('stockout_p_edit');
        if(mainView) mainView.setLoading(true);

		GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_getbyid', Ext.JSON.encode(params),
			function (success, response, options) {
				if(mainView) mainView.setLoading(false);
				if (success) {
					var response = Ext.decode(response.responseText);
					if (response.respcode == 200) {
						viewModel.set('stockout', response.data);
						
						// viewModel.set('listepc', new Map());
						var listepc = new Map();
						for (var i = 0; i < response.listepc.length; i++) {
							var epc = response.listepc[i].epc.trim();
							listepc.set(epc, epc);
						}

						viewModel.set('listepc', listepc);

						store.setData(response.data.stockout_d);
						store.commitChanges();

						if(response.data.stockouttypeid_link == 21) { // xuat theo don cho Vendor
							var OrgToStore = viewModel.getStore('OrgToStore');
							OrgToStore.loadStore(11, false);
						}
						if(response.data.stockouttypeid_link == 22) { // xuat dieu chuyen den px khac
							var OrgToStore = viewModel.getStore('OrgToStore');
							OrgToStore.loadStoreByOrgTypeString('8');
						}

						if(isConfirm == true){
							m.onConfirm();
						}
					}
				}
			})
	},
	onNewData: function (type, id) {
		var m = this;
		var viewModel = this.getViewModel();
		var session = GSmartApp.util.State.get('session');

		// lấy id stockout_order truyền vào -> xoá trong State
		var stockoutorderidObj = GSmartApp.util.State.get('stockoutorderidObj'); // console.log(stockoutorderidObj);
		if(stockoutorderidObj != null){
			viewModel.set('stockoutorderid_link', stockoutorderidObj.id);
			viewModel.set('stockouttypeid_link', stockoutorderidObj.stockouttypeid_link)
			GSmartApp.util.State.set('stockoutorderidObj', null);
		}

		viewModel.set('stockout.stockoutdate', new Date());
		viewModel.set('stockout.usercreateid_link', session.id);
		viewModel.set('stockout.status',-1);
		viewModel.set('listepc', new Map());

		var isWindow = viewModel.get('isWindow');
		if(!isWindow){
			viewModel.set('stockout.stockouttypeid_link', id);
			//
			var stockoutorderid_link = viewModel.get('stockoutorderid_link');
			if(stockoutorderid_link != null){
				m.loadStockoutOrderData();
			}
		}else{
			var stockouttypeid_link = viewModel.get('stockouttypeid_link');
			var po = viewModel.get('po');
			viewModel.set('stockout.stockouttypeid_link', stockouttypeid_link);
			viewModel.set('stockout.pcontract_poid_link', po.get('id'));
			viewModel.set('stockout.contract_number', po.get('po_buyer'));
		}

		var mainView = Ext.getCmp('stockout_p_edit');
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
					console.log(records);
					if (null!=records[0].data.org_grant_id_link){
                        viewModel.set('stockout.orgid_from_link', records[0].data.org_grant_id_link)
                    }
					else{
                        viewModel.set('stockout.orgid_from_link', records[0].data.orgid_link)
                    }
                    if(id == 21) { // xuat theo don cho Vendor
						var OrgToStore = viewModel.getStore('OrgToStore');
						OrgToStore.loadStore(11, false);
					}
					if(id == 22) { // xuat dieu chuyen den kho khac
						var OrgToStore = viewModel.getStore('OrgToStore');
						OrgToStore.loadStoreByOrgTypeString('8');
					}
				}
			}
		});

		
	},

	loadStockoutOrderData: function(){
		var me = this.getView();
		var m = this;
		var viewModel = this.getViewModel();

		var stockoutorderid_link = viewModel.get('stockoutorderid_link');

		var params=new Object();
		params.id = stockoutorderid_link;

		me.setLoading("Đang tải dữ liệu");
		GSmartApp.Ajax.postJitin('/api/v1/stockoutorder/getById', Ext.JSON.encode(params),
		// GSmartApp.Ajax.postJitin('/api/v1/stockoutorder/stockoutorder_getbyid',Ext.JSON.encode(params),
		function(success,response,options ) {
			me.setLoading(false);
				if (success) {
					var response = Ext.decode(response.responseText);
					if (response.respcode == 200) {
						// console.log(response);
						var stockout_order = response.data;
						m.setStockoutOrderData(stockout_order);
					}
				} else {
					var response = Ext.decode(response.responseText);
					Ext.MessageBox.show({
						title: "Thông báo",
						msg: 'Lấy thông tin Stockout_Order thất bại: ' + response.message,
						buttons: Ext.MessageBox.YES,
						buttonText: {
							yes: 'Đóng',
						}
					});
				}
		})	
	},
	setStockoutOrderData: function(stockout_order){
		console.log(stockout_order);
		var me = this.getView();
		var m = this;
		var viewModel = this.getViewModel();

		// return;

		var stockout_order_ds = stockout_order.stockout_order_d == null ? new Array() : stockout_order.stockout_order_d;
		viewModel.set('stockout.stockout_order_code', stockout_order.stockout_order_code);
		viewModel.set('stockout.porderid_link', stockout_order.porderid_link);
		viewModel.set('stockout.pcontractid_link', stockout_order.pcontractid_link);
		viewModel.set('stockout.pcontract_productid_link', stockout_order.pcontract_productid_link);
		viewModel.set('stockout.productid_link', stockout_order.porder_Product_id);
		viewModel.set('stockout.product_buyercode', stockout_order.porder_product_buyercode);
		viewModel.set('stockout.pcontractid_link', stockout_order.pcontractid_link);
		viewModel.set('stockout.pcontract_poid_link', stockout_order.pcontract_poid_link);
		viewModel.set('stockout.stockoutorderid_link', stockout_order.id);
		viewModel.set('stockout.stockout_d', null);
		// viewModel.set('stockout.orgid_from_link', stockout_order.orgid_from_link);
		// viewModel.set('stockout.orgid_to_link', stockout_order.orgid_to_link);

		var stockout = viewModel.get('stockout');
		var stockout_d = viewModel.get('stockout.stockout_d');
		if (stockout_d == null) {
			stockout_d = new Array();
		}

		for (var i = 0; i < stockout_order_ds.length; i++) {
			var stockout_order_d = stockout_order_ds[i];
			var stockout_order_pkl = stockout_order_d.stockout_order_pkl;
			
			var found = false;
			if (!found) {
				// skucode, sku_product_code, skuname, color_name, size_name, 
				// loaiThanhPham, totalSLTon, totalpackage, totalpackagecheck
				var stockout_dObj = new Object();
				stockout_dObj.stockout_packinglist = [];
				stockout_dObj.skuid_link = stockout_order_d.material_skuid_link;
				stockout_dObj.p_skuid_link = stockout_order_d.p_skuid_link;
				stockout_dObj.porderid_link = stockout_order.porderid_link;
				stockout_dObj.skucode = stockout_order_d.skucode_product;
				stockout_dObj.sku_product_code = stockout_order_d.sku_product_code;
				stockout_dObj.skuname = stockout_order_d.skuname_product;
				stockout_dObj.color_name = stockout_order_d.color_name_product;
				stockout_dObj.colorid_link = stockout_order_d.colorid_link;
				stockout_dObj.size_name = stockout_order_d.size_name_product;
				stockout_dObj.loaiThanhPham = stockout_order_d.loaiThanhPham;
				stockout_dObj.totalSLTon = stockout_order_d.totalSLTon;
				stockout_dObj.totalpackage = stockout_order_d.totalpackage == null ? 0 : stockout_order_d.totalpackage;
				stockout_dObj.totalpackagecheck = stockout_order_d.totalpackage == null ? 0 : stockout_order_d.totalpackage;

				stockout_d.push(stockout_dObj);
			}
		}

		viewModel.set('stockout.stockout_d', stockout_d);
		var store = viewModel.getStore('StockoutD_Store');
		store.insert(0, stockout_d);
		store.commitChanges();
		// console.log(stockout_order);
		// console.log(stockout);
	},

	CheckValidate: function () {
		var mes = "";
		var stockout = this.getViewModel().get('stockout');
		console.log(stockout.orgid_from_link);
		console.log(stockout.orgid_to_link);
		if (stockout.stockouttypeid_link == null || stockout.stockouttypeid_link == 0) {
			mes = "Bạn chưa chọn loại phiếu";
		}
		else if (stockout.orgid_from_link == null || stockout.orgid_from_link == 0) {
			mes = "Bạn chưa chọn nơi xuất";
		}
		else if (stockout.orgid_to_link == null || stockout.orgid_to_link == 0) {
			mes = "Bạn chưa chọn nơi nhập";
		}
		else if (stockout.stockout_d.length == 0) {
			mes = "Phiếu chưa có danh sách sản phẩm";
		}
		return mes;
	},
	onSave: function (isConfirm) {
		var mes = this.CheckValidate();
		var me=this;
		if (mes == "") {
			var viewModel = this.getViewModel();
			var stockout = viewModel.get('stockout');
			// console.log(stockout);

			var stockout_d = stockout.stockout_d;
			if(stockout_d != null){
				for(var i = 0; i < stockout_d.length; i++){
					if(stockout_d[i].id == 0 || typeof stockout_d[i].id === 'string'){
						stockout_d[i].id = null;
					}

					var stockout_packinglist = stockout_d[i].stockout_packinglist;
					if(stockout_packinglist != null){
						for(var j = 0; j < stockout_packinglist.length; j++){
							if(stockout_packinglist[j].id == 0 || typeof stockout_packinglist[j].id === 'string'){
								stockout_packinglist[j].id = null;
							}
							if(stockout_packinglist[j].stockoutdid_link == 0 || typeof stockout_packinglist[j].stockoutdid_link === 'string'){
								stockout_packinglist[j].stockoutdid_link = null;
							}
						}
					}
				}
			}

			var params = new Object();
			params.data = [];
			params.data.push(stockout);

			var mainView = Ext.getCmp('stockout_p_edit');
        	if(mainView) mainView.setLoading(true);

			GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_create', Ext.JSON.encode(params),
				function (success, response, options) {
					if(mainView) mainView.setLoading(false);
					if (success) {
						var response = Ext.decode(response.responseText);
						if (response.respcode == 200) {
							if(isConfirm == false){
                                Ext.MessageBox.show({
                                    title: "Thông báo",
                                    msg: 'Lập phiếu thành công',
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }

							var StockoutD_Store = viewModel.get('StockoutD_Store');
                            StockoutD_Store.commitChanges();

							var isWindow = viewModel.get('isWindow');
							if(!isWindow){
								var str = Ext.getWin().dom.location.href;
								var hash = str.split('#')[1];
								if(hash == "stockout_p_main/" + response.id + "/edit"){
									me.getInfo(response.id);
								}else{
									me.redirectTo("stockout_p_main/" + response.id + "/edit");
								}
							}else{
								me.fireEvent('loaddata', response.id);
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
	
	onSelectGroupStockout: function (combo, record, eOpts) {
		var viewModel = this.getViewModel();
		if (record.get('id') == 1) {
			viewModel.set('isRFIDHidden', true);
			viewModel.set('isBarcodeHidden', true);
			viewModel.set('isManualHidden', false);
		}
		if (record.get('id') == 2) {
			viewModel.set('isRFIDHidden', true);
			viewModel.set('isBarcodeHidden', false);
			viewModel.set('isManualHidden', true);
		}
		if (record.get('id') == 3) {
			viewModel.set('isRFIDHidden', false);
			viewModel.set('isBarcodeHidden', true);
			viewModel.set('isManualHidden', true);
		}
	},

	onBtnConfirm: function(){
        // this.onSave(true);
		this.onConfirm();
    },
	onConfirm: function(){
		var m = this;
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');
        var stockoutId = stockout.id;
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
			params.stockout = stockout;
			params.stockoutId = stockoutId;
			params.approver_userid_link = approver_userid_link;
			params.isAutoChecked = true; 
			// isAutoChecked = true -> stockin pklist sinh ra để status là ok
			// dha mạc định là ok (checked)

			var mainView = Ext.getCmp('stockout_p_edit');
			if(mainView) mainView.setLoading(true);
	
			GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_approve', Ext.JSON.encode(params),
				function (success, response, options) {
					if(mainView) mainView.setLoading(false);
					if (success) {
						var response = Ext.decode(response.responseText);
						// console.log(response);
						if (response.respcode == 200) {
							if(response.message == 'EPC không có trong kho'){
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
								viewModel.set('stockout', data);
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
							msg: "Liên hệ IT để được hỗ trợ",
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
		var stockout = viewModel.get('stockout');
		var stockout_d = viewModel.get('stockout.stockout_d'); // data giao dien
		var new_stockout_d = data.stockout_d; // data tra ve

		// console.log(stockout_d);
		// console.log(new_stockout_d);

		for(var i = 0; i < stockout_d.length; i++){
			for(var j = 0; j < new_stockout_d.length; j++){
				var stockout_d_obj = stockout_d[i];
				var new_stockout_d_obj = new_stockout_d[j];
				if(stockout_d_obj.id == new_stockout_d_obj.id){
					stockout_d_obj.isPklistNotInStore = new_stockout_d_obj.isPklistNotInStore;
					var stockout_packinglist = stockout_d_obj.stockout_packinglist;
					var new_stockout_packinglist = new_stockout_d_obj.stockout_packinglist;
					for(var k = 0; k < stockout_packinglist.length; k++){
						for(var l = 0; l < new_stockout_packinglist.length; l++){
							if(stockout_packinglist[k].id == new_stockout_packinglist[l].id){
								stockout_packinglist[k].status = new_stockout_packinglist[l].status;
							}
						}
					}
				}
			}
		}
		viewModel.set('stockout', stockout);

		var StockoutD_Store = viewModel.getStore('StockoutD_Store');
		StockoutD_Store.removeAll();
		StockoutD_Store.insert(0, stockout_d);
		StockoutD_Store.commitChanges();
		// console.log(stockout);
		// console.log(stockout_d);
	},

	onBtnThoatWindow: function (){
		var m = this;
		m.fireEvent('Thoat');
	},
	onBtnLuuWindow: function (){
		var m = this;
		var mes = this.CheckValidate();
		if (mes == "") {
			var viewModel = this.getViewModel();
			var stockout = viewModel.get('stockout');
			// console.log(stockout);
			var params = new Object();
			params.data = [];
			params.data.push(stockout);

			var mainView = Ext.getCmp('stockout_p_edit');
        	if(mainView) mainView.setLoading(true);

			GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_create', Ext.JSON.encode(params),
				function (success, response, options) {
					if(mainView) mainView.setLoading(false);
					if (success) {
						var response = Ext.decode(response.responseText);
						if (response.respcode == 200) {
							m.getInfo(response.id);
							m.fireEvent('Luu');
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
		// m.fireEvent('Luu');
	},

	getApproverName: function(userid){
        var m = this;
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');

        var params = new Object();
        params.id = userid;

        var mainView = Ext.getCmp('stockout_p_edit');
        if (mainView) mainView.setLoading(true);

        GSmartApp.Ajax.post('/api/v1/users/user_getinfo', Ext.JSON.encode(params),
            function (success, response, options) {
                if (mainView) mainView.setLoading(false);
                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.respcode == 200) {
                        // console.log(response);
						// console.log(stockout);
                        stockout.userApprove_name = response.data.fullName;
                        viewModel.set('stockout', stockout);
                    }
                }
            })
    }
});
