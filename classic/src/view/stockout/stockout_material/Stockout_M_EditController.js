Ext.define('GSmartApp.view.stockout.Stockout_M_EditController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.Stockout_M_EditController',
	init: function(){
		
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
		'#Stockout_M_Edit': {
			afterrender: 'onAfterrender'
		},
		'#btnThuGon':{
			click: 'onhiddenMaster'
		},
		'#btnMoRong':{
			click: 'onhiddenMaster'
		},
		'#loaitien':{
			select: 'onSelectCurency'
		},
		'#btnLuu': {
            click: 'onSave'
        },
        '#btnConfirm':{
            click: 'onConfirm'
        },
        '#btnUnConfirm':{
            click: 'onUnConfirm'
        },
		'#cmbStockoutGroup': {
			select: 'onSelectGroupStockout'
		},
		'#Stockout_M_Edit_D': {
			itemclick: 'onStockout_M_Edit_D_Itemclick'
		},
		'#btnThemSP': {
			click: 'onBtnThemSP'
		},
		'#btnTimNPL': {
			click: 'onBtnTimNPL'
		},
		'#btnPackinglistPrint': {
			click: 'onBtnPackinglistPrint'
		},
		// '#btnTestRedirect': {
		// 	click: 'onBtnTestRedirect'
		// }
	},
	channel: { cmd: null, dta: null },

	onAfterrender: function(){
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
        common.Check_Object_Permission();

		var devicestore = viewModel.getStore('DeviceInvStore');
		if(devicestore) devicestore.loadStore(3);

		var StockoutD_Store = viewModel.getStore('StockoutD_Store');
        StockoutD_Store.getSorters().add({
            property: 'skucode',
            direction: 'ASC'
        },{
            property: 'skuname',
            direction: 'ASC'
        });

		//
		var sourceView = viewModel.get('sourceView');
		if(sourceView == 'StockoutOrderMaterialView'){
			m.onNewData(null, 1, null);
		}
	},

    renderCell: function(value, record) {
        if (null == value) value = 0;
        return '<div style="font-size: 11px;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';    
	},
	renderUnit: function(val, meta, record, rindex, cindex, store) {
        if (null != val){
            var viewModel = this.getViewModel();
            var UnitStore = viewModel.getStore('UnitStore');
            if (null!=UnitStore){
                var objUnit = UnitStore.data.find('id', val);
                // console.log(objUnit.data);
                return objUnit.data.code;
            }
        }
    },
	onhiddenMaster: function(){
		var view =this.getView();
		var viewModel = this.getViewModel();
		var formMaster = Ext.getCmp('stockout_m_edit_m');
		var isHidden = formMaster.getHeight() > 0 ? false : true;
		viewModel.set('IsformMaster',!isHidden);
		
		formMaster.setHidden(!isHidden);
	},
	onSelectCurency: function(combo, record, eOpts ){
		var viewModel = this.getViewModel();
		viewModel.set('stockout.vat_exchangerate', record.data.exrate);
	 },
	onSelectGroupStockout: function(combo, record, eOpts){
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
	onDeviceChange:function( combo, newValue, oldValue, eOpts){
		var me=this;
		var txtDevice = me.lookupReference('device');
		var deviceId =txtDevice.getValue();
		var device = txtDevice.getStore().getById(deviceId);
		if(device){
			GSmartApp.util.State.set('device_inv', device.data);
		}
		
	},
    onUrlBack:function(type){ 
		var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
		var sourceView = viewModel.get('sourceView');

		if(sourceView == 'StockoutOrderMaterialView'){
			m.fireEvent('Thoat')
		}
		if(sourceView == null){
			m.redirectTo("stockout_m");
		}
    },
    onLoadData:function(id,type){
		// console.log('loaddata da vao');
        this.getInfo(id);
	},
	getInfo: function(id){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('StockoutD_Store');
        var listepc = viewModel.get('listepc');

        var params = new Object();
        params.id = id ;

		me.setLoading(true);

        GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_getbyid',Ext.JSON.encode(params),
		function(success,response,options ) {
			me.setLoading(false);
			if (success) {
				var response = Ext.decode(response.responseText);
				if(response.respcode == 200) {
					var stockout = response.data;
					if(stockout.unitid_link == null) stockout.unitid_link = 1;
					viewModel.set('stockout', stockout);
					for(var i=0; i<response.listepc.length; i++){
						listepc.set(response.listepc[i].epc, response.listepc[i].epc);
					}
					store.setData(response.data.stockout_d);
					store.commitChanges();

					if(response.data.stockouttypeid_link == 1) { // xuat den cat
						var OrgToStore = viewModel.getStore('OrgToStore');
						// OrgToStore.loadStore(17, false);
						OrgToStore.getOrgToForStockoutMaterial_Cut();
					}
					if(response.data.stockouttypeid_link == 2) { // xuat den dieu chuyen noi bo
						var OrgToStore = viewModel.getStore('OrgToStore');
						OrgToStore.loadStoreByOrgTypeString('3');
					}

					// console.log(stockout);
				}
			}
		})
    },
    onNewData:function(node, id, type){
		var m = this;
		var viewModel = this.getViewModel();

		// lấy id stockout_order truyền vào -> xoá trong State
		var stockoutorderidObj = GSmartApp.util.State.get('stockoutorderidObj'); // console.log(stockoutorderidObj);
		if(stockoutorderidObj != null){
			viewModel.set('stockoutorderid_link', stockoutorderidObj.id)
			GSmartApp.util.State.set('stockoutorderidObj', null);
		}

		var session = GSmartApp.util.State.get('session');
        viewModel.set('stockout.stockoutdate',new Date());
		viewModel.set('stockout.usercreateid_link', session.id);
		viewModel.set('stockout.orgid_from_link', session.org_grant_id_link);
		viewModel.set('listepc', new Map());
        viewModel.set('stockout.stockouttypeid_link', id);
        viewModel.set('stockout.unitid_link', 1);
        viewModel.set('stockout.status', 0);
		viewModel.set('stockout.id', null);

		// console.log(session);
		// set store org from
        if(id == 1) { // xuat den cat
            var OrgToStore = viewModel.getStore('OrgToStore');
            // OrgToStore.loadStore(17, false);
			OrgToStore.getOrgToForStockoutMaterial_Cut();
        }
		if(id == 2) { // xuat den dieu chuyen noi bo
			var OrgToStore = viewModel.getStore('OrgToStore');
			OrgToStore.loadStoreByOrgTypeString('3');
		}

		var stockoutorderid_link = viewModel.get('stockoutorderid_link');
		// console.log(stockoutorderid_link);
		if(stockoutorderid_link != null){
			// console.log('here yet');
			m.loadStockoutOrderData();
		}
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
		// console.log(stockout_order);
		var me = this.getView();
		var m = this;
		var viewModel = this.getViewModel();

		var stockout_order_ds = stockout_order.stockout_order_d == null ? new Array() : stockout_order.stockout_order_d;
		// console.log(stockout_order_ds);
		viewModel.set('stockout.stockout_order_code', stockout_order.stockout_order_code);
		viewModel.set('stockout.porderid_link', stockout_order.porderid_link);
		viewModel.set('stockout.pcontractid_link', stockout_order.pcontractid_link);
		viewModel.set('stockout.pcontract_productid_link', stockout_order.pcontract_productid_link);
		viewModel.set('stockout.productid_link', stockout_order.porder_Product_id);
		viewModel.set('stockout.product_buyercode', stockout_order.porder_product_buyercode);
		// viewModel.set('stockout.invoice_date', stockout_order.timecreate);
		viewModel.set('stockout.stockoutorderid_link', stockout_order.id);
		viewModel.set('stockout.stockout_d', null);
		viewModel.set('stockout.orgid_from_link', stockout_order.orgid_from_link);
		viewModel.set('stockout.orgid_to_link', stockout_order.orgid_to_link);

		var stockout = viewModel.get('stockout');
		var stockout_d = viewModel.get('stockout.stockout_d');
		if (stockout_d == null) {
			stockout_d = new Array();
		}

		for (var i = 0; i < stockout_order_ds.length; i++) {
			var stockout_order_d = stockout_order_ds[i];
			var stockout_order_pkl = stockout_order_d.stockout_order_pkl;
			// console.log(stockout_order_d);
			// console.log(stockout_order_pkl);
			// var found = stockout_d.some(item => item.skuid_link === npl.get('id'));
			var found = false;
			if (!found) {
				var stockout_dObj = new Object();
				stockout_dObj.skuid_link = stockout_order_d.material_skuid_link;
				stockout_dObj.p_skuid_link = stockout_order_d.material_skuid_link;
				stockout_dObj.porderid_link = stockout_order.porderid_link;
				stockout_dObj.skucode = stockout_order_d.skucode;
				stockout_dObj.skuname = stockout_order_d.skuname;
				stockout_dObj.color_name = stockout_order_d.tenMauNPL;
				stockout_dObj.colorid_link = stockout_order_d.colorid_link;
				stockout_dObj.size_name = stockout_order_d.coKho;
				stockout_dObj.unitprice = stockout_order_d.unitprice;
				stockout_dObj.stockout_packinglist = [];

				stockout_dObj.sku_product_color = stockout_order_d.sku_product_color;
				stockout_dObj.sku_product_desc = stockout_order_d.sku_product_desc;

				stockout_dObj.totalpackage = stockout_order_d.totalpackage == null ? 0 : stockout_order_d.totalpackage;
				stockout_dObj.totalpackagecheck = 0;

				stockout_dObj.unitid_link = stockout.unitid_link;
				stockout_dObj.unit_name = stockout_order_d.unitname;
				if (stockout_dObj.unitid_link == 3) { //YDS
					stockout_dObj.totalmet_origin = stockout_order_d.totalyds == null ? 0 : stockout_order_d.totalyds * 0.9144;
					stockout_dObj.totalmet_check = 0;
					stockout_dObj.totalydsorigin = stockout_order_d.totalyds == null ? 0 : stockout_order_d.totalyds;
					stockout_dObj.totalydscheck = 0;
				} else {
					if (stockout_dObj.unitid_link == 1) { //Mét
						stockout_dObj.totalmet_origin = stockout_order_d.totalmet == null ? 0 : stockout_order_d.totalmet;
						stockout_dObj.totalmet_check = 0;
						stockout_dObj.totalydsorigin = stockout_order_d.totalmet == null ? 0 : stockout_order_d.totalmet * 1.09361;
						stockout_dObj.totalydscheck = 0;
					}
				}

				if(stockout_order_pkl != null){
					var totalydscheck = 0;
					var totalmet_check = 0;
					var totalpackagecheck = 0;

					for(var j = 0; j < stockout_order_pkl.length; j++){
						var stockout_order_pklObj = stockout_order_pkl[j];

						// chỉ thêm cây vải đã tở và nằm trong kho
						if(stockout_order_pklObj.warehouseStatus < 1 || !stockout_order_pklObj.isInStock){
							continue;
						}

						var stockout_packinglistObj = new Object();
						stockout_packinglistObj.skuid_link = stockout_order_pklObj.skuid_link;
						stockout_packinglistObj.lotnumber = stockout_order_pklObj.lotnumber;
						stockout_packinglistObj.packageid = stockout_order_pklObj.packageid;
						stockout_packinglistObj.ydsorigin = stockout_order_pklObj.ydsorigin;
						stockout_packinglistObj.ydscheck = stockout_order_pklObj.ydsorigin;
						stockout_packinglistObj.met_origin = stockout_order_pklObj.metorigin;
						stockout_packinglistObj.met_check = stockout_order_pklObj.metorigin;
						stockout_packinglistObj.colorid_link = stockout_order_pklObj.colorid_link;
						stockout_packinglistObj.warehousestatus = stockout_order_pklObj.warehousestatus;
						stockout_packinglistObj.spaceString = stockout_order_pklObj.spaceString;
						stockout_packinglistObj.stockinProductString = stockout_order.porder_product_buyercode;
						stockout_packinglistObj.unitid_link = 1;
						stockout_packinglistObj.widthorigin = stockout_order_pklObj.width_met;
						stockout_packinglistObj.widthcheck = stockout_order_pklObj.width_met;
						stockout_packinglistObj.grossweight = stockout_order_pklObj.grossweight;
						stockout_packinglistObj.netweight = stockout_order_pklObj.netweight;
						stockout_packinglistObj.epc = stockout_order_pklObj.epc;
						stockout_packinglistObj.warehousestatus = stockout_order_pklObj.warehouseStatus;
						stockout_packinglistObj.warehousestatusString = stockout_order_pklObj.warehouseStatusString;
						stockout_packinglistObj.status = 0;
						stockout_packinglistObj.rssi = 1;
						stockout_packinglistObj.date_check = stockout_order_pklObj.date_check;

						totalpackagecheck++;
						totalmet_check+=stockout_packinglistObj.met_check==null?0:stockout_packinglistObj.met_check;
						totalydscheck+=stockout_packinglistObj.ydscheck==null?0:stockout_packinglistObj.ydscheck;

						stockout_dObj.stockout_packinglist.push(stockout_packinglistObj);
					}
					stockout_dObj.totalpackagecheck = totalpackagecheck;
					stockout_dObj.totalmet_check = totalmet_check;
					stockout_dObj.totalydscheck = totalydscheck;
				}

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
	CheckValidate: function(){
		var mes = "";
		var stockout = this.getViewModel().get('stockout');
		if(stockout.stockouttypeid_link == null || stockout.stockouttypeid_link == 0){
			mes = "Bạn chưa chọn loại phiếu";
		}
		else if (stockout.orgid_from_link == null || stockout.orgid_from_link == 0){
			mes = "Bạn chưa chọn nơi xuất";
		}
		else if (stockout.orgid_to_link == null || stockout.orgid_to_link == 0){
			mes = "Bạn chưa chọn nơi nhập";
		} 
		else if (stockout.stockoutd.length == 0){
			mes = "Phiếu chưa có danh sách sản phẩm";
		}
		return mes;
	},
    onSave: function(){
		var me = this.getView();
        var m = this;
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

		var params=new Object();
		params.data = [];
		params.data.push(stockout);

		me.setLoading("Đang lưu dữ liệu");
		GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_create',Ext.JSON.encode(params),
		function(success,response,options ) {
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
						// m.redirectTo("stockout_m/" + response.id + "/edit");
						// m.getInfo(response.id);
						var sourceView = viewModel.get('sourceView');
						if(sourceView == null){
							var str = Ext.getWin().dom.location.href;
							var hash = str.split('#')[1];
							if(hash == "stockout_m/" + response.id + "/edit"){
								m.getInfo(response.id);
							}else{
								m.redirectTo("stockout_m/" + response.id + "/edit");
							}
						}
						if(sourceView == 'StockoutOrderMaterialView'){
							m.fireEvent('Thoat');
						}
						
					}
				} else {
					var response = Ext.decode(response.responseText);
					// if (null!=response.epc_err){
					// 	response.epc_err.forEach(function(record, recordIdx){
					// 		console.log(record.epc);
					// 	}, this);
					// }
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
    },
	onStart:function(){
		var me = this;
		var viewModel = this.getViewModel();
		var store = viewModel.getStore('StockoutD_Store');
		var stockout = viewModel.get('stockout');
		var session = GSmartApp.util.State.get('session');
		listepc = viewModel.get('listepc');

		var listcode =[];

		var host = config.getMqtthost();
		var port = config.getMqttport();
		var clientid = config.getClientid();
		var txtDevice = me.lookupReference('device');
		var deviceId = txtDevice.getValue();
		var device = viewModel.getStore('DeviceInvStore').getById(deviceId);

		if (device == null || device.length == 0) {
			Ext.Msg.show({
				title: GSmartApp.Locales.title_chonthietbi[GSmartApp.Locales.currentLocale],
				msg: null,
				buttons: [{
					itemId: 'ok',
					text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
					ui: 'action'
				}]
			});
		}
		else{
			var termid 		= config.getTermid();
		//var orgid_link = GSmartApp.util.State.get('orgid_link');
		//console.log('orgid_link:' + orgid_link);
		/* Generate token */
		me.stoken = Ext.Number.randomInt(100000, 999999);

		me.channel.cmd = 'gsm5/term/'+termid+'/cmd';
		GSmartApp.Mqtt.connect(host, port, clientid, me.channel, deviceId, function(topic, message) {
			if(topic.includes("cmd")) {
				console.log('cmd data:' + message);
				var jsonObj = Ext.JSON.decode(message);	

				if(jsonObj.ct==1 && jsonObj.cid == 'CMD_START_INV') {
					if(jsonObj.respcode ==0) {
						me.channel.dta = 'gsm5/transaction/inv/'+jsonObj.respdata.token;
						GSmartApp.Mqtt.client.subscribe(me.channel.dta);
						console.log('register dta ch:'+me.channel.dta);
						viewModel.set('clsbtn',"blue-button");
						viewModel.set('clsbtnStart',"");
						viewModel.set('clsbtnStop',"red-button");
						viewModel.set('isStart',true);
						
						GSmartApp.util.State.set('CMD','CMD_STOP_INV');
						GSmartApp.util.State.set('sendChannel',me.sendChannel);

					} else {
						Ext.Msg.alert('Device:' + device , 'There are some problem when you start. Please press STOP before START!');
					}
				}

				//Khi het time out tu dong goi nut Stop
				if (jsonObj.ct==2 && jsonObj.cid == 'NTF_ON_STOP') {
					me.onStop();
				}
			} else if(topic.includes("transaction")) {
				// console.log(message);
				var jsonObj = Ext.JSON.decode(message);
				for(var x in jsonObj){
					// console.log('mqtt return object');
					// console.log(jsonObj[x]);
					//Nếu epc chưa có trong phiếu thì xử lý
					if(!listepc.has(jsonObj[x].epc)){
						listepc.set(jsonObj[x].epc, jsonObj[x].epc);
						
						var sku = store.findRecord('skucode',jsonObj[x].skucode);
						// console.log(sku);

						if(sku== null){
							//THêm sku vào để lấy thông tin từ server
							listcode.push(jsonObj[x].skucode);
							//Tạo Object để lưu thông tin stockoutd và gắn stockout_packinglist và stockoutd
							var stockoutd = new Object({
								stockoutpklist: [],
								id: null,
								totalpackage: 1,
								orgrootid_link: session.rootorgid_link,
								skucode: jsonObj[x].skucode,
								lastuserupdateid_link: session.id,
								timecreate: new Date()
							});

							//Tại Object để lưu thông tin stockout_packinglist
							var epc_item = new Object({id:null});
							epc_item.epc = jsonObj[x].epc;
							if (jsonObj[x].epcstate == 0){
								epc_item.extrainfo = 'Chíp không có trong kho!!! Không thể xuất';
								epc_item.status = -1;
								stockoutd.status = -1;
							} else {
								epc_item.status = 0;
								stockoutd.status = 0;
							}
							epc_item.orgrootid_link = session.rootorgid_link;
							epc_item.lastuserupdateid_link = session.id;
							epc_item.timecreate = new Date();

							stockoutd.stockoutpklist.push(epc_item);

							//Cập nhật lại stockout trong viewModel
							stockout.stockoutd.push(stockoutd);
							console.log(stockoutd);
							viewModel.set('stockout', stockout);
							//Thêm stockoutd vào grid
							store.insert(0, stockoutd);
							store.commitChanges();
						}
						else {
							var stockoutpklist = sku.get('stockoutpklist');

								sku.set('totalpackage', sku.get('totalpackage') + 1);

								var epc_item = new Object({id:null});
								epc_item.epc = jsonObj[x].epc;
								epc_item.status = jsonObj[x].epcstate;
								if (jsonObj[x].epcstate == 0){
									epc_item.extrainfo = 'Chíp không có trong kho!!! Không thể xuất';
									epc_item.status = -1;
									sku.set('status',-1);
								} else {
									epc_item.status = 0;
								}
								stockoutpklist.push(epc_item);
						}
					}
				}
				//Lấy thông tin từ server
				console.log(store);
				me.UpdateInfoSKU(listcode, store);
			}
		}, function() {
			me.sendChannel = 'gsm5/device/'+device.data.code+'/cmd';
			me.funcid = '2'; /* FuncId: 2 -  StockIn; 3-StockOut*/
	   		var cmd = {ct:0,cid:"CMD_START_INV", srcid:termid, reqdata:{timeout:120000,token:me.stoken,funcid:me.funcid}};
	   		console.log("Device channel:"+me.sendChannel);
	   		var message = new Paho.Message(Ext.JSON.encode(cmd));
			message.destinationName = me.sendChannel;
			message.qos = 0;
	   		GSmartApp.Mqtt.client.send(message);
			
		},function(){
			console.log('Loi connect');
			var viewModel = me.getViewModel();
			viewModel.set('clsbtn',"red-button");
			viewModel.set('clsbtnStart',"blue-button");
			viewModel.set('clsbtnStop',"");
			viewModel.set('isStart',false);
		});
		}
	},
	onStop:function(){
		var me = this;
		var viewModel = me.getViewModel();
		viewModel.set('clsbtn',"red-button");
		viewModel.set('clsbtnStart',"blue-button");
		viewModel.set('clsbtnStop',"");
		viewModel.set('isStart',false);
		var termid 		= GSmartApp.Ajax.getTermid();
		if (GSmartApp.Mqtt.client) {
	   		var cmd = {ct:0,cid:"CMD_STOP_INV", srcid:termid, reqdata:{token:me.stoken,funcid:me.funcid}};
	   		console.log("Device channel:"+me.sendChannel);
	   		var message = new Paho.Message(Ext.JSON.encode(cmd));
			message.destinationName = me.sendChannel;
			message.qos = 0;
	   		GSmartApp.Mqtt.client.send(message);
   		}
   		me.channel.dta = null;
		   GSmartApp.Mqtt.onDisconnect();
		   GSmartApp.Mqtt.deviceid_link = 0;
	}    ,
	UpdateInfoSKU: function (listcode, store) {
		var params = new Object();
		params.listcode = listcode;
		GSmartApp.Ajax.post('/api/v1/sku/getinfolist_bycode', Ext.JSON.encode(params),
			function (success, resp, options) {
				if (success) {
					var resp = Ext.decode(resp.responseText);
					if (resp.respcode == 200) {
						//Lấy bản ghi chứa skucode trong grid
						listcode = [];
						for (var i = 0; i < resp.data.length; i++) {
							var sku = resp.data[i];
							var record = store.findRecord('skucode', sku.code);

							if(record != null){
								record.set('skuname', sku.name);
								record.set('skuid_link', sku.id);
								record.set('product_code', sku.product_code);
								record.set('sizeid_link', sku.sizeid_link);
								record.set('unit_name', sku.unit_name);
								record.set('size_name', sku.size_name);
								record.set('color_name', sku.color_name);
								record.set('colorid_link', sku.colorid_link);
								record.set('p_skuid_link', sku.productid_link);
								record.set('skutypeid_link', sku.skutypeid_link);
								record.set('unitprice', sku.unitprice);
							}
						}
					}
				}
		})
	},
    onEPCDetail: function(grid, rowIndex, colIndex){
        var record = grid.store.getAt(rowIndex);
        var form =Ext.create({
            xtype: 'stockout_epc_indow',
            reference:'stockout_epc_indow'
        });
		var viewModel = form.getViewModel();
        viewModel.set('stockout_d',record);

        form.show();
	},
	
	onViewPackingList: function(grid, rowIndex, colIndex){
		var m = this;
		var me = this.getView();
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');
		// console.log(stockout);
        var data = grid.getStore().getAt(rowIndex);
        var stockoutdid_link = data.get('id');

        // if(isNaN(invoicedid_link)){
        if(false){
            // not existed in db
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Cần lưu invoice trước khi thêm packing list cho ' + data.get('skucode'),
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }else{
            var form = Ext.create('Ext.window.Window', {
                height: '90%',
                width: 1200,
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Chi tiết Packing List - SKU : ' + data.get('skucode'),
                closeAction: 'destroy',
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'Stockout_Pklist_Main',
					viewModel: {
						data: {
							skuid_link: data.get('skuid_link'),
							stockout: stockout,
							stockoutDRec: data
						}
					}					
                }],
            });
            form.show();

			form.down('#Stockout_Pklist_Main').getController().on('Thoat', function () {
				form.close();
			})

			form.down('#Stockout_Pklist_Main').getController().on('ThemCayVai', function (listCayVaiThem, totalcay, totaldai, totaldaiyard, totalkg, totallbs) {
				var stockout_d = stockout.stockout_d;
				for(var i=0; i < stockout_d.length; i++){
					if(stockout_d[i].skuid_link == data.get('skuid_link')){
						if(stockout_d[i].stockout_packinglist == null) stockout_d[i].stockout_packinglist = [];
						var stockout_packinglist = stockout_d[i].stockout_packinglist;
						for(var j=0;j< listCayVaiThem.length; j++){
							var isNotContain = true;
							for(var k=0;k< stockout_packinglist.length; k++){
								if(listCayVaiThem[j].epc == stockout_packinglist[k].epc){
									isNotContain = false;
									break;
								}
							}
							if(isNotContain){
								var cayVaiThem = listCayVaiThem[j];
								var cayVaiMoi = new Object();
								cayVaiMoi.spaceString = cayVaiThem.spaceString;
								cayVaiMoi.skuid_link = cayVaiThem.skuid_link;
								cayVaiMoi.lotnumber = cayVaiThem.lotnumber;
								cayVaiMoi.packageid = cayVaiThem.packageid;
								cayVaiMoi.ydsorigin = cayVaiThem.yds;
								cayVaiMoi.ydscheck = cayVaiThem.yds;
								cayVaiMoi.widthorigin = cayVaiThem.width_met;
								cayVaiMoi.widthcheck = cayVaiThem.width_met;
								cayVaiMoi.grossweight = cayVaiThem.grossweight;
								cayVaiMoi.grossweight_check = cayVaiThem.grossweight;
								cayVaiMoi.grossweight_lbs = cayVaiThem.grossweight_lbs;
								cayVaiMoi.grossweight_lbs_check = cayVaiThem.grossweight_lbs;
								cayVaiMoi.netweight = cayVaiThem.netweight;
								cayVaiMoi.epc = cayVaiThem.epc;
								cayVaiMoi.status = 0;
								cayVaiMoi.rssi = 1;
								cayVaiMoi.met_origin = cayVaiThem.met;
								cayVaiMoi.met_check = cayVaiThem.met;
								cayVaiMoi.colorid_link = cayVaiThem.colorid_link;
								cayVaiMoi.unitid_link = cayVaiThem.unitid_link;
								cayVaiMoi.warehousestatus = cayVaiThem.status;
								cayVaiMoi.stockinProductString = cayVaiThem.stockinProductString;
								cayVaiMoi.date_check = cayVaiThem.date_check;
								stockout_d[i].stockout_packinglist.push(cayVaiMoi);
							}
						}
					}
				}

				stockout = m.recalculate(stockout);
				stockout_d = stockout.stockout_d;

				
				viewModel.set('stockout', stockout);
				var StockoutD_Store = viewModel.getStore('StockoutD_Store');
				StockoutD_Store.removeAll();
				StockoutD_Store.insert(0, stockout_d);
				StockoutD_Store.commitChanges();

				// console.log(stockout);
				form.close();
			})
        }

		form.down('#Stockout_Pklist_Main').getController().on('themMatTem', function () {
			m.getInfo(stockout.id);
			// form.close();
		})
    },
	recalculate: function(stockout){
        var stockout_d = stockout.stockout_d;
        for(var i=0; i<stockout_d.length; i++){
            var totalpackage = 0;
            var totalpackagecheck = 0;
            var totalydsorigin = 0;
            var totalydscheck = 0;
            var totalmet_origin = 0;
            var totalmet_check = 0;
			var grossweight = 0;
            var grossweight_check = 0;
			var grossweight_lbs = 0;
            var grossweight_lbs_check = 0;

            var stockout_packinglist = stockout_d[i].stockout_packinglist;
            for(var k=0; k<stockout_packinglist.length; k++){
                totalpackage++;
                totalpackagecheck++;
                totalydsorigin+=stockout_packinglist[k].ydsorigin == null ? 0 : stockout_packinglist[k].ydsorigin;
                totalydscheck+=stockout_packinglist[k].ydscheck == null ? 0 : stockout_packinglist[k].ydscheck;
                totalmet_origin+=stockout_packinglist[k].met_origin == null ? 0 : stockout_packinglist[k].met_origin;
                totalmet_check+=stockout_packinglist[k].met_check == null ? 0 : stockout_packinglist[k].met_check;
				grossweight+=stockout_packinglist[k].grossweight == null ? 0 : stockout_packinglist[k].grossweight;
				grossweight_check+=stockout_packinglist[k].grossweight_check == null ? 0 : stockout_packinglist[k].grossweight_check;
				grossweight_lbs+=stockout_packinglist[k].grossweight_lbs == null ? 0 : stockout_packinglist[k].grossweight_lbs;
				grossweight_lbs_check+=stockout_packinglist[k].grossweight_lbs_check == null ? 0 : stockout_packinglist[k].grossweight_lbs_check;
            }
            // stockout_d[i].totalpackage = totalpackage;
            stockout_d[i].totalpackagecheck = totalpackagecheck;
            // stockout_d[i].totalydsorigin = totalydsorigin;
            stockout_d[i].totalydscheck = totalydscheck;
            // stockout_d[i].totalmet_origin = totalmet_origin;
            stockout_d[i].totalmet_check = totalmet_check;
			stockout_d[i].grossweight_check = grossweight_check;
			stockout_d[i].grossweight_lbs_check = grossweight_lbs_check;
        }
        return stockout;
    },

	onConfirm: function(){
		var me = this;
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
                xtype: 'Stockout_M_Edit_Confirm',
                viewModel: {
                    type: 'Stockout_M_Edit_ConfirmViewModel',
                    data: {
                        stockout: stockout,
                        stockoutId: stockoutId
                    }
                }
            }]
        });
        form.show();

		form.down('#Stockout_M_Edit_Confirm').getController().on('Confirmed', function (approver_userid_link) {

			viewModel.set('stockout.approver_userid_link', approver_userid_link);
			// viewModel.set('stockout.approve_date', new Date());
			// viewModel.set('stockout.status', 1);
			// viewModel.set('stockout.statusString', 'Đã duyệt');

			me.onApprove();
			
            form.close();
        })
    },
    onApprove: function(){
		var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var params=new Object();
		params.stockoutId = stockout.id;
		params.approver_userid_link = stockout.approver_userid_link;

		if(stockout.stockouttypeid_link == 1){
			me.setLoading("Đang duyệt phiếu");
			GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_approve',Ext.JSON.encode(params),
			function(success,response,options ) {
				me.setLoading(false);
					if (success) {
						var response = Ext.decode(response.responseText);
						if (response.respcode == 200) {
							Ext.MessageBox.show({
								title: "Thông báo",
								msg: 'Duyệt phiếu thành công',
								buttons: Ext.MessageBox.YES,
								buttonText: {
									yes: 'Đóng',
								}
							});		
							// Ext.getCmp('Stockout_M_Edit').down('#btnConfirm').setHidden(true);
							// Ext.getCmp('Stockout_M_Edit').down('#statusString').setValue('Đã duyệt');
							
							// m.redirectTo("stockout_m/" + response.id + "/edit");
							// m.getInfo(response.id);
							var str = Ext.getWin().dom.location.href;
							var hash = str.split('#')[1];
							if(hash == "stockout_m/" + response.id + "/edit"){
								m.getInfo(response.id);
							}else{
								m.redirectTo("stockout_m/" + response.id + "/edit");
							}
						}else{
							Ext.MessageBox.show({
								title: "Thông báo",
								msg: 'Lỗi duyệt phiếu: ' + response.message,
								buttons: Ext.MessageBox.YES,
								buttonText: {
									yes: 'Đóng',
								}
							});		
						}
					} else {
						var response = Ext.decode(response.responseText);
						// if (null!=response.epc_err){
						// 	response.epc_err.forEach(function(record, recordIdx){
						// 		console.log(record.epc);
						// 	}, this);
						// }
						Ext.MessageBox.show({
							title: "Thông báo",
							msg: 'Lỗi duyệt phiếu: ' + response.message,
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
					}
			})	
		}
		if(stockout.stockouttypeid_link == 2){
			me.setLoading("Đang duyệt phiếu");
			GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_approve_xuatDieuChuyenVai',Ext.JSON.encode(params),
			function(success,response,options ) {
				me.setLoading(false);
					if (success) {
						var response = Ext.decode(response.responseText);
						if (response.respcode == 200) {
							Ext.MessageBox.show({
								title: "Thông báo",
								msg: 'Duyệt phiếu thành công',
								buttons: Ext.MessageBox.YES,
								buttonText: {
									yes: 'Đóng',
								}
							});		
							// Ext.getCmp('Stockout_M_Edit').down('#btnConfirm').setHidden(true);
							// Ext.getCmp('Stockout_M_Edit').down('#statusString').setValue('Đã duyệt');
							
							// m.redirectTo("stockout_m/" + response.id + "/edit");
							// m.getInfo(response.id);
							var str = Ext.getWin().dom.location.href;
							var hash = str.split('#')[1];
							if(hash == "stockout_m/" + response.id + "/edit"){
								m.getInfo(response.id);
							}else{
								m.redirectTo("stockout_m/" + response.id + "/edit");
							}
						}else{
							Ext.MessageBox.show({
								title: "Thông báo",
								msg: 'Lỗi duyệt phiếu: ' + response.message,
								buttons: Ext.MessageBox.YES,
								buttonText: {
									yes: 'Đóng',
								}
							});		
						}
					} else {
						var response = Ext.decode(response.responseText);
						// if (null!=response.epc_err){
						// 	response.epc_err.forEach(function(record, recordIdx){
						// 		console.log(record.epc);
						// 	}, this);
						// }
						Ext.MessageBox.show({
							title: "Thông báo",
							msg: 'Lỗi duyệt phiếu: ' + response.message,
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
					}
			})	
		}
    },
	onUnConfirm: function(){
		var me = this;
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
            title: 'Hủy duyệt',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Stockout_M_Edit_Confirm',
                viewModel: {
                    type: 'Stockout_M_Edit_ConfirmViewModel',
                    data: {
                        stockout: stockout,
                        stockoutId: stockoutId
                    }
                }
            }]
        });
        form.show();

		form.down('#Stockout_M_Edit_Confirm').getController().on('Confirmed', function (unapprover_userid_link) {

			viewModel.set('stockout.unapprover_userid_link', unapprover_userid_link);
			// viewModel.set('stockout.approve_date', new Date());
			// viewModel.set('stockout.status', 1);
			// viewModel.set('stockout.statusString', 'Đã duyệt');

			me.onUnApprove();
			
            form.close();
        })
    },
	onUnApprove: function(){
		var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		// console.log(stockout);
		// console.log(stockout.stockouttypeid_link);
		// return;
		if(stockout.stockouttypeid_link == 1){ // xuat cat
			var params=new Object();
			params.stockoutId = stockout.id;
			params.unapprover_userid_link = stockout.unapprover_userid_link;
	
			me.setLoading("Đang hủy duyệt phiếu");
			GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_unapprove',Ext.JSON.encode(params),
			function(success,response,options ) {
				me.setLoading(false);
					if (success) {
						var response = Ext.decode(response.responseText);
						if (response.respcode == 200) {
							Ext.MessageBox.show({
								title: "Thông báo",
								msg: 'Hủy duyệt phiếu thành công',
								buttons: Ext.MessageBox.YES,
								buttonText: {
									yes: 'Đóng',
								}
							});		
							// Ext.getCmp('Stockout_M_Edit').down('#btnConfirm').setHidden(true);
							// Ext.getCmp('Stockout_M_Edit').down('#statusString').setValue('Đã duyệt');
							
							// m.redirectTo("stockout_m/" + response.id + "/edit");
							// m.getInfo(response.id);
							var str = Ext.getWin().dom.location.href;
							var hash = str.split('#')[1];
							if(hash == "stockout_m/" + response.id + "/edit"){
								m.getInfo(response.id);
							}else{
								m.redirectTo("stockout_m/" + response.id + "/edit");
							}
						}else{
							Ext.MessageBox.show({
								title: "Thông báo",
								msg: 'Lỗi hủy duyệt phiếu: ' + response.message,
								buttons: Ext.MessageBox.YES,
								buttonText: {
									yes: 'Đóng',
								}
							});		
						}
					} else {
						var response = Ext.decode(response.responseText);
						// if (null!=response.epc_err){
						// 	response.epc_err.forEach(function(record, recordIdx){
						// 		console.log(record.epc);
						// 	}, this);
						// }
						Ext.MessageBox.show({
							title: "Thông báo",
							msg: 'Lỗi hủy duyệt phiếu: ' + response.message,
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
					}
			})	
		}
		if(stockout.stockouttypeid_link == 2){ // xuat dieu chuyen
			var params=new Object();
			params.stockoutId = stockout.id;
			params.unapprover_userid_link = stockout.unapprover_userid_link;
	
			me.setLoading("Đang hủy duyệt phiếu");
			GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_unapprove_xuatDieuChuyenVai',Ext.JSON.encode(params),
			function(success,response,options ) {
				me.setLoading(false);
					if (success) {
						var response = Ext.decode(response.responseText);
						if (response.respcode == 200) {
							Ext.MessageBox.show({
								title: "Thông báo",
								msg: 'Hủy duyệt phiếu thành công',
								buttons: Ext.MessageBox.YES,
								buttonText: {
									yes: 'Đóng',
								}
							});		
							// Ext.getCmp('Stockout_M_Edit').down('#btnConfirm').setHidden(true);
							// Ext.getCmp('Stockout_M_Edit').down('#statusString').setValue('Đã duyệt');
							
							// m.redirectTo("stockout_m/" + response.id + "/edit");
							// m.getInfo(response.id);
							var str = Ext.getWin().dom.location.href;
							var hash = str.split('#')[1];
							if(hash == "stockout_m/" + response.id + "/edit"){
								m.getInfo(response.id);
							}else{
								m.redirectTo("stockout_m/" + response.id + "/edit");
							}
						}else{
							Ext.MessageBox.show({
								title: "Thông báo",
								msg: 'Lỗi hủy duyệt phiếu: ' + response.message,
								buttons: Ext.MessageBox.YES,
								buttonText: {
									yes: 'Đóng',
								}
							});		
						}
					} else {
						var response = Ext.decode(response.responseText);
						// if (null!=response.epc_err){
						// 	response.epc_err.forEach(function(record, recordIdx){
						// 		console.log(record.epc);
						// 	}, this);
						// }
						Ext.MessageBox.show({
							title: "Thông báo",
							msg: 'Lỗi hủy duyệt phiếu: ' + response.message,
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
					}
			})	
		}
    },

	onMenu_Stockout_M_Edit_D_List: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
                {
                    text: 'Chi tiết hàng',
                    itemId: 'btnMenu_Stockout_M_Edit_D_List_Pkl',
                    separator: true,
                    margin: '10 0 0',
                    // iconCls: 'x-fa fas fa-edit brownIcon',
					iconCls: 'x-fa fas fa-edit',
                    handler: function () {
                        // console.log(record);
						me.onViewPackingList(grid, rowIndex);
                    },
                },
                {
                    text: 'Xoá dòng hàng',
                    itemId: 'btnMenu_Stockout_M_Edit_D_List_Delete',
                    separator: true,
                    margin: '10 0 0',
                    // iconCls: 'x-fa fas fa-trash redIcon',
					iconCls: 'x-fa fas fa-trash',
                    handler: function () {
                        // console.log(record);
						me.onDeleteStockoutD(grid, rowIndex);
                    }
                },
            ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX() - 10, e.getY() - 10];
        e.stopEvent();
        menu_grid.record = record;
        menu_grid.showAt(position);
    },
	onDeleteStockoutD: function(grid, rowIndex){
		var me = this;
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
        var data = grid.getStore().getAt(rowIndex);

		if(stockout.status != null && stockout.status >= 1){
			Ext.MessageBox.show({
				title: "Thông báo",
				msg: "Phiếu xuất đã được duyệt xuất",
				buttons: Ext.MessageBox.YES,
				buttonText: {
					yes: 'Đóng',
				}
			});
			return;
		}

		Ext.Msg.show({
			title: 'Thông báo',
			msg: 'Bạn có chắc chắn xóa nguyên phụ liệu ' + data.get('skucode') + '?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			buttonText: {
				yes: 'Có',
				no: 'Không'
			},
			fn: function (btn) {
				if (btn === 'yes') {
					// Xoá, check id
					var id = data.get('id');
					if(isNaN(id) || id == null || id == 0){ // chưa có trong db
						me.deleteRow_Stockout_D(data);
					}else{ // đã có trong db
						me.deleteRowDb_Stockout_D(data);
					}
				}
			}
		});
	},
	deleteRow_Stockout_D: function(data){
		var me = this;
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var stockout_d = viewModel.get('stockout.stockout_d');
		var id = data.get('id');

		for(var i = 0; i < stockout_d.length; i++) {
			if(stockout_d[i].id == id){
				stockout_d.splice(i,1);
				break;
			}
		}
		var stockout_dStore = viewModel.getStore('StockoutD_Store');
		if(stockout_dStore){
			stockout_dStore.removeAll();
			stockout_dStore.insert(0, stockout_d);
			stockout_dStore.commitChanges();
		}
		viewModel.set('stockout.stockout_d', stockout_d);
		// console.log(stockout);
	},
	deleteRowDb_Stockout_D: function(data){
		var me = this;
		var m = this.getView();
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var stockout_d = viewModel.get('stockout.stockout_d');
		var id = data.get('id');

		m.setLoading(true);

		var params = new Object();
        params.id = id ;
        GSmartApp.Ajax.postJitin('/api/v1/stockout_d/stockoutd_delete',Ext.JSON.encode(params),
		function(success,response,options ) {
            var response = Ext.decode(response.responseText);
			m.setLoading(false);
			if(success){
				if(response.respcode == 200) {
					for(var i = 0; i < stockout_d.length; i++) {
						if(stockout_d[i].id == id){
							stockout_d.splice(i,1);
							break;
						}
					}
					var stockout_dStore = viewModel.getStore('StockoutD_Store');
					if(stockout_dStore){
						stockout_dStore.removeAll();
						stockout_dStore.insert(0, stockout_d);
						stockout_dStore.commitChanges();
					}
					viewModel.set('stockout.stockout_d', stockout_d);
					// console.log(stockout);
				}else{
					Ext.Msg.show({
                        title: 'Thông báo',
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
				}
			}else{
				Ext.Msg.show({
					title: 'Thông báo',
					msg: response.message,
					buttons: Ext.MessageBox.YES,
					buttonText: {
						yes: 'Đóng',
					}
				});
			}
		})
	},
	onStockout_M_Edit_D_Itemclick: function(grid, record, item, index, e, eOpts){
		// console.log(record.data);
	},
	checkSkuInDList: function(selectedRecord){
		var me = this;
		var m = this.getView();
		var viewModel = this.getViewModel();
		var stockout_d = viewModel.get('stockout.stockout_d');
		if (null!=stockout_d){
			var skuid_link = selectedRecord.get('id');
			for(var i = 0; i < stockout_d.length; i++){
				if(stockout_d[i].skuid_link == skuid_link){
					return true;
				}
			}
		} else {
			viewModel.set('stockout.stockout_d',[]);
		}
		// console.log(stockout_d);
		return false;
	},
	onBtnThemSP: function(){
		var me = this;
		var m = this.getView();
		var viewModel = this.getViewModel();
		var skucodeCbbox = m.down('#skucode');

		if(skucodeCbbox){
			var selectedRecord = skucodeCbbox.getSelectedRecord();
			if(selectedRecord){
				// check danh sách d đã có vải này chưa, có thông báo, chưa có thêm
				var isExist = me.checkSkuInDList(selectedRecord);
				if(isExist){ // thông báo
					Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Đã có loại vải này trong danh sách',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
				}else{ // thêm
					me.addSkuToDList(selectedRecord.data);
					skucodeCbbox.setValue(null);
					skucodeCbbox.focus();
				}
			}else{
				console.log('no or null selectedRecord');
			}
		}
	},
	onBtnTimNPL: function(){
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var productid_link = viewModel.get('stockout.productid_link');
		var stockouttypeid_link = stockout.stockouttypeid_link;
		// console.log(stockout);
		// return;

		if(productid_link == null || productid_link == ''){
			Ext.Msg.show({
                title: "Thông báo",
                msg: "Bạn cần phải chọn sản phẩm",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
		}

		if(stockouttypeid_link == 1 || stockouttypeid_link == 2){
			m.loadDsPcontract();
		}
		// if(stockouttypeid_link == 2){ // xuat dieu chuyen
		// 	m.loadDsPcontract_XuatDieuChuyen();
		// }
	},
	loadDsPcontract: function(){
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var productid_link = viewModel.get('stockout.productid_link');
		var stockouttypeid_link = stockout.stockouttypeid_link;

		var form = Ext.create('Ext.window.Window', {
            height: '90%',
            width: '90%',
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Danh sách nguyên liệu',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Stockout_Pcontract_Main_View',
                viewModel: {
                    data: {
						stockout: stockout,
                        productid_link: productid_link
                    }
                }
            }]
        });
        form.show();
        form.down('#Stockout_Pcontract_View').getController().on('Thoat', function () {
            form.close();
        });
        form.down('#Stockout_Pcontract_MaterialList_View').getController().on('ThemNPL', function (select, pcontractid_link, productid_link) {

            viewModel.set('stockout.pcontractid_link', pcontractid_link);
            viewModel.set('stockout.productid_link', productid_link);

            for(var i=0; i<select.length; i++){
                var isExist = m.checkSkuInDListFromStockout_Pcontract(select[i]);
				if(isExist){ // thông báo
					// đã có loại vải này
				}else{ // thêm
					m.addSkuToDListFromStockout_Pcontract(select[i]);
				}
            }
            m.getPcontractProductId(pcontractid_link, productid_link);
            form.close();
        });
	},
	loadDsPcontract_XuatDieuChuyen: function(){
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var productid_link = viewModel.get('stockout.productid_link');
		var stockouttypeid_link = stockout.stockouttypeid_link;

		var form = Ext.create('Ext.window.Window', {
            height: '90%',
            width: '45%',
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Danh sách đơn hàng',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Stockout_Pcontract_SearchByProduct_View',
                viewModel: {
                    data: {
						stockout: stockout,
                        productid_link: productid_link
                    }
                }
            }]
        });
        form.show();
        form.down('#Stockout_Pcontract_SearchByProduct_View').getController().on('Thoat', function () {
            form.close();
        });
        // form.down('#Stockout_Pcontract_MaterialList_View').getController().on('ThemNPL', function (select, pcontractid_link, productid_link) {

        //     viewModel.set('stockout.pcontractid_link', pcontractid_link);
        //     viewModel.set('stockout.productid_link', productid_link);

        //     for(var i=0; i<select.length; i++){
        //         var isExist = m.checkSkuInDListFromStockout_Pcontract(select[i]);
		// 		if(isExist){ // thông báo
		// 			// đã có loại vải này
		// 		}else{ // thêm
		// 			m.addSkuToDListFromStockout_Pcontract(select[i]);
		// 		}
        //     }
        //     m.getPcontractProductId(pcontractid_link, productid_link);
        //     form.close();
        // });
	},
	getPcontractProductId: function(pcontractid_link, productid_link){
        var m = this;
        var me = this.getView();
        var viewModel= this.getViewModel();

        var params = new Object();
        params.pcontractid_link = pcontractid_link ;
        params.productid_link = productid_link ;
        GSmartApp.Ajax.post('/api/v1/pcontractproduct/getby_pcontract_product',Ext.JSON.encode(params),
		function(success,response,options ) {
            var response = Ext.decode(response.responseText);
            if(response.respcode == 200) {
				// console.log(response);
                var data = response.data;
                // console.log(data);
                if(data.length > 0){
                    viewModel.set('stockout.pcontract_productid_link', data[0].id);
                }
            }
		})
    },
	checkSkuInDListFromStockout_Pcontract: function(selectedRecord){
        // console.log(selectedRecord);
        // return;

		var m = this;
		var me = this.getView();
		var viewmodel = this.getViewModel();
		var stockout_d = viewmodel.get('stockout.stockout_d');
		if (null!=stockout_d){
			var skuid_link = parseInt(selectedRecord.get('materialid_link'));
			for(var i = 0; i < stockout_d.length; i++){
				if(stockout_d[i].skuid_link == skuid_link){
					return true;
				}
			}
		} else {
			viewmodel.set('stockout.stockout_d',[]);
		}
		return false;
	},
	addSkuToDListFromStockout_Pcontract: function(selectedRecord){
        // console.log(data); 
        // return;

		var m = this;
		var me = this.getView();
        var Stockout_M_Edit = Ext.getCmp("Stockout_M_Edit");
		var viewmodel = this.getViewModel();
		var stockout = viewmodel.get('stockout');
		var stockout_d = viewmodel.get('stockout.stockout_d');
		var Stockout_M_Edit_D = Stockout_M_Edit.down('#Stockout_M_Edit_D');
		var store = Stockout_M_Edit_D.getStore();

		var newObj = new Object();
		newObj.color_name = selectedRecord.data.color_name;
		newObj.colorid_link = parseInt(selectedRecord.data.colorid_link);
		newObj.id = null;
		newObj.p_skuid_link = parseInt(selectedRecord.data.materialid_link);
		newObj.product_code = selectedRecord.data.materialCode;
		newObj.size_name = selectedRecord.data.coKho;
		// newObj.sizeid_link = selectedRecord.data.size_id;
		newObj.sku_product_code = selectedRecord.data.materialCode;
		newObj.sku_product_color = selectedRecord.data.color_name;
		newObj.sku_product_desc = selectedRecord.data.description;
		newObj.skucode = selectedRecord.data.materialCode;
		newObj.skuid_link = parseInt(selectedRecord.data.materialid_link);
		newObj.skuname = selectedRecord.data.materialName;
		newObj.status = -1;
		newObj.stockout_packinglist = [];
		newObj.stockoutid_link = stockout.id;
		newObj.unitid_link = stockout.unitid_link;
		newObj.totaldif = 0;
		newObj.totalerror = 0;
		newObj.totalmet_check = 0;
		newObj.totalmet_origin = 0;
		newObj.totalmet_processed = 0;
		newObj.totalmet_stockout = 0;
		newObj.totalorder_design = 0;
		newObj.totalorder_tech = 0;
		newObj.totalpackage = 0;
		newObj.totalpackage_req = 0;
		newObj.totalpackagecheck = 0;
		newObj.totalpackageprocessed = 0;
		newObj.totalpackagestockout = 0;
		newObj.totalydscheck = 0;
		newObj.totalydsorigin = 0;
		newObj.totalydsprocessed = 0;
		newObj.totalydsstockout = 0;

		stockout_d.push(newObj);
		store.setData([]);
		store.insert(0, stockout_d);
		store.commitChanges();

		// console.log(data);
	},
	
	addSkuToDList: function(data){
		var me = this;
		var m = this.getView();
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var stockout_d = viewModel.get('stockout.stockout_d');
		var Stockout_M_Edit_D = m.down('#Stockout_M_Edit_D');
		var store = Stockout_M_Edit_D.getStore();

		var newObj = new Object();
		newObj.color_name = data.color_name;
		newObj.colorid_link = data.color_id;
		newObj.id = null;
		newObj.p_skuid_link = data.id;
		newObj.product_code = data.product_code;
		newObj.size_name = data.size_name;
		newObj.sizeid_link = data.size_id;
		newObj.sku_product_code = data.product_code;
		newObj.sku_product_color = data.product_color;
		newObj.sku_product_desc = data.product_desc;
		newObj.skucode = data.code;
		newObj.skuid_link = data.id;
		newObj.skuname = data.name;
		newObj.status = -1;
		newObj.stockout_packinglist = [];
		newObj.stockoutid_link = stockout.id;
		newObj.unitid_link = stockout.unitid_link;
		newObj.totaldif = 0;
		newObj.totalerror = 0;
		newObj.totalmet_check = 0;
		newObj.totalmet_origin = 0;
		newObj.totalmet_processed = 0;
		newObj.totalmet_stockout = 0;
		newObj.totalorder_design = 0;
		newObj.totalorder_tech = 0;
		newObj.totalpackage = 0;
		newObj.totalpackage_req = 0;
		newObj.totalpackagecheck = 0;
		newObj.totalpackageprocessed = 0;
		newObj.totalpackagestockout = 0;
		newObj.totalydscheck = 0;
		newObj.totalydsorigin = 0;
		newObj.totalydsprocessed = 0;
		newObj.totalydsstockout = 0;

		stockout_d.push(newObj);
		store.setData([]);
		store.insert(0, stockout_d);
		store.commitChanges();

		// console.log(data);
	},
	onDItemEdit: function (editor, context, eOpts){
        // console.log('onInvoiceDItemEdit');
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');
        var store = me.down('#Stockout_M_Edit_D').getStore();
        var stockoutD_data = context.record.data;

        if(context.value == "" || context.value == context.originalValue || isNaN(context.value)){
            store.rejectChanges();
            return;
        }

        if(context.field == 'totalpackage'){
            stockoutD_data.totalpackage = parseFloat(stockoutD_data.totalpackage);
        }
        if(context.field == 'netweight'){
            stockoutD_data.netweight = parseFloat(stockoutD_data.netweight);
        }
        if(context.field == 'grossweight'){
            stockoutD_data.grossweight = parseFloat(stockoutD_data.grossweight);
        }
        if(context.field == 'm3'){
            stockoutD_data.m3 = parseFloat(stockoutD_data.m3);
        }
        if(context.field == 'met'){
            stockoutD_data.met = parseFloat(stockoutD_data.met);
        }
        if(context.field == 'yds'){
            stockoutD_data.yds = parseFloat(stockoutD_data.yds);
        }
		if(context.field == 'totalmet_origin'){
            stockoutD_data.totalmet_origin = parseFloat(stockoutD_data.totalmet_origin);
        }
		if(context.field == 'totalmet_check'){
            stockoutD_data.totalmet_check = parseFloat(stockoutD_data.totalmet_check);
        }
		if(context.field == 'totalydsorigin'){
            stockoutD_data.totalydsorigin = parseFloat(stockoutD_data.totalydsorigin);
        }
		if(context.field == 'totalydscheck'){
            stockoutD_data.totalydscheck = parseFloat(stockoutD_data.totalydscheck);
        }
		if (context.field == 'netweight') {
			stockoutD_data.netweight = parseFloat(stockoutD_data.netweight);
		}
		if (context.field == 'grossweight') {
			stockoutD_data.grossweight = parseFloat(stockoutD_data.grossweight);
		}
		if (context.field == 'netweight_lbs') {
			stockoutD_data.netweight = parseFloat(stockoutD_data.netweight);
		}
		if (context.field == 'grossweight_lbs') {
			stockoutD_data.grossweight = parseFloat(stockoutD_data.grossweight);
		}

        if(stockout.unitid_link == 1){
            if(context.field == 'met' && (stockoutD_data.unitprice != null || stockoutD_data.unitprice != "")){
                // console.log('yds');
                stockoutD_data.yds = Ext.Number.roundToPrecision(stockoutD_data.met / 0.9144,2);
                stockoutD_data.totalamount = Ext.Number.roundToPrecision(stockoutD_data.met*stockoutD_data.unitprice,2);
            }
            if(context.field == 'unitprice' && (stockoutD_data.met != null || stockoutD_data.met != "")){
                // console.log('unitprice');
                stockoutD_data.totalamount = Ext.Number.roundToPrecision(stockoutD_data.met*stockoutD_data.unitprice,2);
            }

			if(context.field == 'totalmet_origin'){
				stockoutD_data.totalydsorigin = Ext.Number.roundToPrecision(stockoutD_data.totalmet_origin / 0.9144,2);
			}
        }else if(stockout.unitid_link == 3){
            if(context.field == 'yds' && (stockoutD_data.unitprice != null || stockoutD_data.unitprice != "")){
                // console.log('yds');
                stockoutD_data.met = Ext.Number.roundToPrecision(stockoutD_data.yds * 0.9144,2);
                stockoutD_data.totalamount = Ext.Number.roundToPrecision(stockoutD_data.yds*stockoutD_data.unitprice,2);
            }
            if(context.field == 'unitprice' && (stockoutD_data.yds != null || stockoutD_data.yds != "")){
                // console.log('unitprice');
                stockoutD_data.totalamount = Ext.Number.roundToPrecision(stockoutD_data.yds*stockoutD_data.unitprice,2);
            }

			if(context.field == 'totalydsorigin'){
				stockoutD_data.totalmet_origin = Ext.Number.roundToPrecision(stockoutD_data.totalydsorigin * 0.9144,2);
			}
        } else if (stockout.unitid_link == 4) { // kg
			if (context.field == 'grossweight') {
				stockoutD_data.grossweight_lbs = Ext.Number.roundToPrecision(stockoutD_data.grossweight * 2.20462, 2);
			}
		} else if (stockout.unitid_link == 5) { // pound
			if (context.field == 'grossweight_lbs') {
				stockoutD_data.grossweight = Ext.Number.roundToPrecision(stockoutD_data.grossweight_lbs / 2.20462, 2);
			}
		} 

        store.commitChanges();
    },
	onPressEnterSkucode: function (textfield, e, eOpts) {
        var m = this;
        if (e.getKey() == e.ENTER) {
            // Ext.Msg.alert('Keys','You pressed the Enter key');
            m.onBtnThemSP();
        }
    },
	onBtnPackinglistPrint: function(){
		var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');

		var form = Ext.create('Ext.window.Window', {
			height: '90%',
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Danh sách cây vải xuất',
			closeAction: 'destroy',
			width: 1200,
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'Stockout_Pklist_Print_View',
				viewModel: {
					data: {
						stockout: stockout,
					}
				}					
			}],
		});
		form.show();

		form.down('#Stockout_Pklist_Print_View').getController().on('Thoat', function () {
			form.close();
		})

		form.down('#Stockout_Pklist_Print_View').getController().on('DeletePkl', function (stockoutObj) {
			viewModel.set('stockout', stockoutObj);
			var StockoutD_Store = viewModel.getStore('StockoutD_Store');
			StockoutD_Store.removeAll();
			StockoutD_Store.insert(0, stockoutObj.stockout_d);
			StockoutD_Store.commitChanges();
			// form.close();
		})
	},
});
