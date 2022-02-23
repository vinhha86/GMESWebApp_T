Ext.define('GSmartApp.view.stockout.Stockout_M_Edit_M_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_M_Edit_M_Controller',
    init: function () {
        
    },
    control: {
        '#Stockout_M_Edit_M': {
			afterrender: 'onAfterrender'
		},
        '#loaitien': {
            select: 'onSelectCurency'
        },
        '#btnStockoutOrder_Search': {
            click: 'onStockoutOrder_Search'
        },
        '#Product_AutoComplete': {
            beforeQuery: 'Product_AutoComplete_beforeQuery',
            select: 'onProduct_AutoCompleteSelect'
        },
        '#UnitStoreCombo':{
            select: 'onUnitStoreComboSelect'
        },
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var orgstore = viewModel.getStore('OrgStore');
        if(orgstore) orgstore.loadStore(5);
        var userStore = viewModel.getStore('UserStore');
        if(userStore) userStore.loadStore();

        // var listidtype = "4,8,9,11,12";
        var listidtype = "3";
        var orgfromstore = viewModel.getStore('OrgFromStore');
        // orgfromstore.loadStore_allchildren_byorg(listidtype);
        // orgfromstore.loadStore(3, false);
        if(orgfromstore) orgfromstore.getOrgFromForStockoutMaterial();
        // var orgtostore = viewModel.getStore('OrgToStore');
        // orgtostore.loadStore_byRoot(listidtype);

        var currencyStore = viewModel.getStore('CurrencyStore');
        if(currencyStore) currencyStore.loadStore();
        var vattypeStore = viewModel.getStore('VatTypeStore');
        if(vattypeStore) vattypeStore.loadStore();
        var StockoutType = viewModel.getStore('StockoutTypeStore');
        if(StockoutType) StockoutType.loadStore();

        var UnitStore = viewModel.getStore('UnitStore');
		if(UnitStore) {
            UnitStore.loadStore();
            m.filterUnitStore();
            m.sortUnitStore();
        }
    },
    filterUnitStore: function(){
        var viewModel = this.getViewModel();
        var UnitStore = viewModel.getStore('UnitStore');
        UnitStore.clearFilter();
        UnitStore.filterBy(function(rec) {
            var isOk = false;
            if(
                rec.get('unittype') == 0 || rec.get('unittype') == 1
            ){
                isOk = true;
            }
            return isOk;
        });
    },
    sortUnitStore: function(){
        var viewModel = this.getViewModel();
        var UnitStore = viewModel.getStore('UnitStore');
        UnitStore.getSorters().removeAll();
        UnitStore.getSorters().add({
            property: 'unittype',
            direction: 'ASC'
        });
    },
    Product_AutoComplete_beforeQuery: function(){
        var viewModel = this.getViewModel();
        var Product_AutoComplete = viewModel.getStore('Product_AutoComplete');
        var producttypeid_link = 10;
        Product_AutoComplete.proxy.extraParams = {
            producttypeid_link: producttypeid_link
        }
    },
    onProduct_AutoCompleteSelect: function( combo, record, eOpts){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var Product_AutoComplete = viewModel.getStore('Product_AutoComplete');

        var productid_link = record.get('id');
        viewModel.set('stockout.productid_link', productid_link);

        return;

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
                var isExist = m.checkSkuInDList(select[i]);
				if(isExist){ // thông báo
					// Ext.Msg.show({
                    //     title: 'Thông báo',
                    //     msg: 'Đã có loại vải này trong danh sách',
                    //     buttons: Ext.MessageBox.YES,
                    //     buttonText: {
                    //         yes: 'Đóng',
                    //     }
                    // });
				}else{ // thêm
					m.addSkuToDList(select[i]);
				}
            }
            m.getPcontractProductId(pcontractid_link, productid_link);
            form.close();
        });
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
    checkSkuInDList: function(selectedRecord){
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
    addSkuToDList: function(selectedRecord){
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

    onSelectCurency: function (combo, record, eOpts) {
        var viewModel = this.getViewModel();
        viewModel.set('stockout.vat_exchangerate', record.data.exrate);
    },

    onStockoutOrder_Search: function () {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var stockout_order_code = viewModel.get('stockout.stockout_order_code') == null ? '' : viewModel.get('stockout.stockout_order_code');
        var orgid_from_link = viewModel.get('stockout.orgid_from_link');
        var orgid_to_link = viewModel.get('stockout.orgid_to_link');

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Chọn yêu cầu xuất kho',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .95,
            width: Ext.getBody().getViewSize().width * .95,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'StockoutOrderPickup_Main'
            }],
            viewModel: {
                // type: 'StockoutOrderPickup_ViewModel',
                data: {
                    stockout_order_code: stockout_order_code,
                    orgid_from_link: orgid_from_link,
                    orgid_to_link: orgid_to_link
                }
            }
        });
        form.show();

        form.down('#StockoutOrderPickup_Main').getController().on('Thoat', function () {
            form.close();
        });

        form.down('#StockoutOrderPickup_Main').getController().on('select_Stockout_order', function (stockout_order, stockout_order_ds) {
            // console.log(stockout_order);
            // console.log(stockout_order_ds);
            // return;

            viewModel.set('stockout.stockout_order_code', stockout_order.stockout_order_code);
            viewModel.set('stockout.porderid_link', stockout_order.porderid_link);
            viewModel.set('stockout.pcontractid_link', stockout_order.pcontractid_link);
            viewModel.set('stockout.pcontract_productid_link', stockout_order.pcontract_productid_link);
            viewModel.set('stockout.productid_link', stockout_order.porder_Product_id);
            viewModel.set('stockout.product_buyercode', stockout_order.porder_product_buyercode);

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
                var stockout_order_pkl = stockout_order_d.get('stockout_order_pkl');
                // var found = stockout_d.some(item => item.skuid_link === npl.get('id'));
                var found = false;
                if (!found) {
                    var stockout_dObj = new Object();
                    stockout_dObj.skuid_link = stockout_order_d.get('material_skuid_link');
                    stockout_dObj.p_skuid_link = stockout_order_d.get('material_skuid_link');
                    stockout_dObj.porderid_link = stockout_order.porderid_link;
                    stockout_dObj.skucode = stockout_order_d.get('skucode');
                    stockout_dObj.skuname = stockout_order_d.get('skuname');
                    stockout_dObj.color_name = stockout_order_d.get('tenMauNPL');
                    stockout_dObj.colorid_link = stockout_order_d.get('colorid_link');
                    stockout_dObj.size_name = stockout_order_d.get('coKho');
                    stockout_dObj.unitprice = stockout_order_d.get('unitprice');
                    stockout_dObj.stockout_packinglist = [];

                    stockout_dObj.sku_product_color = stockout_order_d.get('sku_product_color');
                    stockout_dObj.sku_product_desc = stockout_order_d.get('sku_product_desc');

                    stockout_dObj.totalpackage = stockout_order_d.get('totalpackage') == null ? 0 : stockout_order_d.get('totalpackage');
                    stockout_dObj.totalpackagecheck = 0;

                    stockout_dObj.unitid_link = stockout.unitid_link;
                    stockout_dObj.unit_name = stockout_order_d.get('unitname');
                    if (stockout_dObj.unitid_link == 3) { //YDS
                        stockout_dObj.totalmet_origin = stockout_order_d.get('totalyds') == null ? 0 : stockout_order_d.get('totalyds') * 0.9144;
                        stockout_dObj.totalmet_check = 0;
                        stockout_dObj.totalydsorigin = stockout_order_d.get('totalyds') == null ? 0 : stockout_order_d.get('totalyds');
                        stockout_dObj.totalydscheck = 0;
                    } else {
                        if (stockout_dObj.unitid_link == 1) { //Mét
                            stockout_dObj.totalmet_origin = stockout_order_d.get('totalmet') == null ? 0 : stockout_order_d.get('totalmet');
                            stockout_dObj.totalmet_check = 0;
                            stockout_dObj.totalydsorigin = stockout_order_d.get('totalmet') == null ? 0 : stockout_order_d.get('totalmet') * 1.09361;
                            stockout_dObj.totalydscheck = 0;
                        }
                    }

                    if(stockout_order_pkl != null){
                        var totalydscheck = 0;
                        var totalmet_check = 0;
                        var totalpackagecheck = 0;
    
                        for(var j = 0; j < stockout_order_pkl.length; j++){
                            var stockout_order_pklObj = stockout_order_pkl[j];
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
            store.removeAll();
            store.insert(0, stockout_d);
            store.commitChanges();

            form.close();
        });

        // form.down('#StockoutOrderPickup_Main').getController().on('StockoutOrderPickupSelect', function (stockout_order, stockout_order_ds) {
        //     // console.log(stockout_order);
        //     // console.log(stockout_order_ds);

        //     viewModel.set('stockout.stockout_order_code', stockout_order.stockout_order_code);
        //     viewModel.set('stockout.porderid_link', stockout_order.porderid_link);
        //     viewModel.set('stockout.pcontractid_link', stockout_order.pcontractid_link);
        //     // viewModel.set('stockout.invoice_date', stockout_order.timecreate);
        //     viewModel.set('stockout.stockoutorderid_link', stockout_order.id);
        //     viewModel.set('stockout.stockout_d', null);
        //     viewModel.set('stockout.orgid_from_link', stockout_order.orgid_from_link);
        //     viewModel.set('stockout.orgid_to_link', stockout_order.orgid_to_link);

        //     var stockout = viewModel.get('stockout');
        //     var stockout_d = viewModel.get('stockout.stockout_d');
        //     if (stockout_d == null) {
        //         stockout_d = new Array();
        //     }

        //     for (var i = 0; i < stockout_order_ds.length; i++) {
        //         var stockout_order_d = stockout_order_ds[i];
        //         // var found = stockout_d.some(item => item.skuid_link === npl.get('id'));
        //         var found = false;
        //         if (!found) {
        //             var stockout_dObj = new Object();
        //             stockout_dObj.skuid_link = stockout_order_d.get('material_skuid_link');
        //             stockout_dObj.p_skuid_link = stockout_order_d.get('material_skuid_link');
        //             stockout_dObj.porderid_link = stockout_order.porderid_link;
        //             stockout_dObj.skucode = stockout_order_d.get('skucode');
        //             stockout_dObj.skuname = stockout_order_d.get('skuname');
        //             stockout_dObj.color_name = stockout_order_d.get('tenMauNPL');
        //             stockout_dObj.colorid_link = stockout_order_d.get('colorid_link');
        //             stockout_dObj.size_name = stockout_order_d.get('coKho');
        //             stockout_dObj.unitprice = stockout_order_d.get('unitprice');

        //             stockout_dObj.sku_product_color = stockout_order_d.get('sku_product_color');
        //             stockout_dObj.sku_product_desc = stockout_order_d.get('sku_product_desc');

        //             stockout_dObj.totalpackage = stockout_order_d.get('totalpackage') == null ? 0 : stockout_order_d.get('totalpackage');
        //             stockout_dObj.totalpackagecheck = 0;

        //             stockout_dObj.unitid_link = stockout.unitid_link;
        //             stockout_dObj.unit_name = stockout_order_d.get('unitname');
        //             if (stockout_dObj.unitid_link == 3) { //YDS
        //                 stockout_dObj.totalmet_origin = stockout_order_d.get('totalyds') == null ? 0 : stockout_order_d.get('totalyds') * 0.9144;
        //                 stockout_dObj.totalmet_check = 0;
        //                 stockout_dObj.totalydsorigin = stockout_order_d.get('totalyds') == null ? 0 : stockout_order_d.get('totalyds');
        //                 stockout_dObj.totalydscheck = 0;
        //             } else {
        //                 if (stockout_dObj.unitid_link == 1) { //Mét
        //                     stockout_dObj.totalmet_origin = stockout_order_d.get('totalmet') == null ? 0 : stockout_order_d.get('totalmet');
        //                     stockout_dObj.totalmet_check = 0;
        //                     stockout_dObj.totalydsorigin = stockout_order_d.get('totalmet') == null ? 0 : stockout_order_d.get('totalmet') * 1.09361;
        //                     stockout_dObj.totalydscheck = 0;
        //                 }
        //             }

        //             stockout_d.push(stockout_dObj);
        //         }
        //     }

        //     viewModel.set('stockout.stockout_d', stockout_d);

        //     // console.log(invoice_ds);
        //     // console.log(stockout);

        //     form.close();
        // });
    },

    onPressEnterBtnStockoutOrder_Search: function (textfield, e, eOpts) {
        var m = this;
        if (e.getKey() == e.ENTER) {
            // Ext.Msg.alert('Keys','You pressed the Enter key');
            m.onStockoutOrder_Search();
        }
    },

    onUnitStoreComboSelect: function (combo, record, eOpts) {
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout'); // stockout_d // stockout_packinglist
        var stockout_d = viewModel.get('stockout.stockout_d');
        var unitid_link = record.get('id');

        if(stockout_d != null){
            for(var i = 0; i < stockout_d.length; i++){
                stockout_d[i].unitid_link = stockout.unitid_link;
            }
            var StockoutD_Store = viewModel.getStore('StockoutD_Store');
		    if (StockoutD_Store) {
                StockoutD_Store.removeAll();
                StockoutD_Store.insert(0, stockout_d);
                StockoutD_Store.commitChanges();
            }
        }

        // if (stockout_d != null) {
        //     for (var i = 0; i < stockout_d.length; i++) {
        //         var stockoutD_data = stockout_d[i];
        //         stockout_d[i].unitid_link = unitid_link;

        //         if (stockout.unitid_link == 1) {
        //             stockoutD_data.totalamount = Ext.Number.roundToPrecision(stockoutD_data.met * stockoutD_data.unitprice, 2);
        //         } else if (stockout.unitid_link == 3) {
        //             stockoutD_data.totalamount = Ext.Number.roundToPrecision(stockoutD_data.yds * stockoutD_data.unitprice, 2);
        //         }

        //     }
        // }
        // viewmodel.set('stockout', stockout);
    }
})