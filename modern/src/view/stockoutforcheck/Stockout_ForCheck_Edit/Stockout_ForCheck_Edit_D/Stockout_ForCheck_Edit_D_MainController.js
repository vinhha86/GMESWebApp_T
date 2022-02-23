Ext.define('GSmartApp.view.stockoutforcheck.Stockout_ForCheck_Edit_D_MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockout_ForCheck_Edit_D_MainController',
	init: function () {
		
	},
	control: {
        '#Stockout_ForCheck_Edit_D': {
			// itemtap: 'onItemTap',
            itemsingletap: 'onStockout_ForCheck_Edit_DItemTap'
		},
        '#btnAddPhieuXuat': {
            tap: 'onBtnAddPhieuXuat'
        }
	},
	onStockout_ForCheck_Edit_DItemTap: function(dataView, index, target, record, e, eOpts){
        var me = this.getView();
        var m = this;
		var viewModel = this.getViewModel();
		viewModel.set('selectedDRecord', record);

        this.setComboPkl();
    },
    setComboPkl: function(){
        var viewModel = this.getViewModel();
        var selectedDRecord = viewModel.get('selectedDRecord');
        viewModel.set('pkl_stockout_order_dId', selectedDRecord.get('id'));
    },
    reloadStore: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockoutorderid_link = viewModel.get('stockout_order.id');

        var Stockout_order_d_store = viewModel.getStore('Stockin_d_Store');
        Stockout_order_d_store.loadStore_byStockout_orderId_async(stockoutorderid_link);
        Stockout_order_d_store.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    // this.fireEvent('logout');
                } else {
                    var storeItems = Stockout_order_d_store.getData().items;
                    for(var i=0; i<storeItems.length; i++){
                        var item = storeItems[i];
                        var grid = m.getView().down('#Stockout_ForCheck_Edit_D');
                        grid.getSelectable().deselectAll();
                        grid.getSelectable().select(item);
                        viewModel.set('selectedDRecord', item);
                        viewModel.set('pkl_stockout_order_dId', item.get('id'));
                    }
                }
            }
        });
    },
    onBtnAddPhieuXuat: function(){
        var m = this;
        var viewModel = this.getViewModel();

        var msgWindow = Ext.Msg.show({
            title: 'Thông báo',
            message: 'Tạo phiếu xuất kho?',
            width: 300,
            closable: false,
            buttons: [{
                text: 'Thoát',
                itemId: 'no'
            }, {
                text: 'Tạo',
                itemId: 'yes'
            }],
            multiline: false,
            fn: function (buttonValue, inputText, showConfig) {
                if(buttonValue == 'no'){
                    if(msgWindow){
                        msgWindow.hide();
                    }
                }
                if(buttonValue == 'yes'){
                    var session = GSmartApp.util.State.get('session');
                    var userId = session.user;
                    m.loadUserInfo(userId);
                }
            },
            icon: Ext.Msg.QUESTION
        });
    },
    loadUserInfo: function(userid_link){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        var params = new Object();
        params.id = userid_link;

        me.setMasked({
            xtype: 'loadmask',
            message: 'Đang lưu'
        })
        GSmartApp.Ajax.post('/api/v1/users/user_getinfo', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setMasked(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    data = response.data;
                    viewModel.set('userData', data);
                    m.taoPhieuNhap();
                }else{
                    Ext.toast('Lưu thông tin thất bại', 3000);
                }
            })
    },
    taoPhieuNhap: function(){
        var m = this;
        var viewModel = this.getViewModel();

        var userData = viewModel.get('userData'); // thông tin người đang đăng nhập
        var stockout_order = viewModel.get('stockout_order'); // thông tin yêu cầu xuất

        // Tạo obj stockout
        var stockout = new Object();
        stockout.stockoutdate = new Date(); // ngày xuất
        stockout.usercreateid_link = userData.id; // người tạo
        // stockout.orgid_from_link = userData.org_grant_id_link; // user của kho
        stockout.stockouttypeid_link = 1; // Xuất NPL tổ cắt
        stockout.unitid_link = stockout_order.unitid_link;
        stockout.status = 0;
        stockout.id = null;
        viewModel.set('stockout', stockout); // chuẩn bị obj stockout để tạo

        this.setStockoutOrderData(stockout_order); // thêm thông tin từ yêu cầu xuất vào phiếu xuất
    },
    setStockoutOrderData: function(stockout_order){
		var me = this.getView();
		var m = this;
		var viewModel = this.getViewModel();

		var stockout_order_ds = stockout_order.stockout_order_d == null ? new Array() : stockout_order.stockout_order_d;
		//
		viewModel.set('stockout.stockout_order_code', stockout_order.stockout_order_code);
		viewModel.set('stockout.porderid_link', stockout_order.porderid_link);
		viewModel.set('stockout.pcontractid_link', stockout_order.pcontractid_link);
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

				stockout_d.push(stockout_dObj);
			}
		}

		viewModel.set('stockout.stockout_d', stockout_d);
        this.onSave();
		// console.log(stockout);
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

        me.setMasked({
            xtype: 'loadmask',
            message: 'Đang lưu'
        })

		GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_create',Ext.JSON.encode(params),
		function(success,response,options ) {
            var response = Ext.decode(response.responseText);
            me.setMasked(false);
            if (success) {
                if (response.respcode == 200) {
                    Ext.toast('Lưu thông tin thành công', 3000);
                    // this.redirectTo("stockout_m/" + response.id + "/edit");
                    this.redirectTo("stockout_m");
                    // m.getInfo(response.id);
                }else{
                    Ext.toast('Lưu thông tin thất bại', 3000);
                }
            } else {
                Ext.toast('Lỗi lập phiếu: ' + response.message, 3000);
            }
		})	
    },
})