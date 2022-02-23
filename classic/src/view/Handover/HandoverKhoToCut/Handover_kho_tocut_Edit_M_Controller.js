Ext.define('GSmartApp.view.handover.Handover_kho_tocut_Edit_M_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Handover_kho_tocut_Edit_M_Controller',
	init: function() {
        var orgstore = this.getViewModel().getStore('OrgStore');
		orgstore.loadStore(5);
		var userStore = this.getViewModel().getStore('UserStore');
		userStore.loadStore();

		// var listidtype = "4,8,9,11,12";
        // var listidtype = "3";
		// var orgfromstore = this.getViewModel().getStore('OrgFromStore');
		// orgfromstore.loadStore_allchildren_byorg(listidtype);
		// var orgtostore = this.getViewModel().getStore('OrgToStore');
		// orgtostore.loadStore_byRoot(listidtype);

		var currencyStore = this.getViewModel().getStore('CurrencyStore');
		currencyStore.loadStore();
		var vattypeStore = this.getViewModel().getStore('VatTypeStore');
		vattypeStore.loadStore();
		var StockoutType = this.getViewModel().getStore('StockoutTypeStore');
		StockoutType.loadStore();
	},
	control:{
		'#loaitien':{
            select: 'onSelectCurency'
        },
		'#btnStockoutOrder_Search':{
            click: 'onStockoutOrder_Search'
        }
    },
    onSelectCurency: function(combo, record, eOpts ){
       var viewModel = this.getViewModel();
	   viewModel.set('stockout.vat_exchangerate', record.data.exrate);
    },

	onStockoutOrder_Search:function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var stockout_order_code = viewModel.get('stockout.stockout_order_code') == null ? '' : viewModel.get('stockout.stockout_order_code');
        var orgid_from_link = viewModel.get('stockout.orgid_from_link');
        var orgid_to_link = viewModel.get('stockout.orgid_to_link');

        // console.log(stockout_order_code);
        // console.log(orgid_from_link);
        // console.log(orgid_to_link);

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

        form.down('#StockoutOrderPickup_Main').getController().on('StockoutOrderPickupSelect', function (stockout_order, stockout_order_ds) {
            console.log(stockout_order);
            console.log(stockout_order_ds);

            viewModel.set('stockout.stockout_order_code', stockout_order.stockout_order_code);
            viewModel.set('stockout.porderid_link', stockout_order.porderid_link);
            // viewModel.set('stockout.invoice_date', stockout_order.timecreate);
            viewModel.set('stockout.stockoutorderid_link', stockout_order.id);
            viewModel.set('stockout.stockout_d', null);
            viewModel.set('stockout.orgid_from_link', stockout_order.orgid_from_link);
            viewModel.set('stockout.orgid_to_link', stockout_order.orgid_to_link);

            var stockout = viewModel.get('stockout');
            var stockout_d = viewModel.get('stockout.stockout_d');
            if(stockout_d == null){
                stockout_d = new Array();
            }

            for(var i = 0; i < stockout_order_ds.length; i++){
                var stockout_order_d = stockout_order_ds[i];
                // var found = stockout_d.some(item => item.skuid_link === npl.get('id'));
                var found = false;
                if(!found){
                    var stockout_dObj = new Object();
                    stockout_dObj.skuid_link = stockout_order_d.get('material_skuid_link');
                    stockout_dObj.p_skuid_link = stockout_order_d.get('material_skuid_link');
                    stockout_dObj.porderid_link = stockout_order.porderid_link;
                    stockout_dObj.skucode = stockout_order_d.get('skucode');
                    stockout_dObj.skuname = stockout_order_d.get('skuname');
                    stockout_dObj.color_name = stockout_order_d.get('color_name');
                    stockout_dObj.colorid_link = stockout_order_d.get('colorid_link');
                    stockout_dObj.size_name = stockout_order_d.get('size_name');
                    stockout_dObj.unitprice = stockout_order_d.get('unitprice');
                    
                    stockout_dObj.totalpackage = stockout_order_d.get('totalpackage') == null ? 0 : stockout_order_d.get('totalpackage');
                    stockout_dObj.totalpackagecheck = 0;
                    stockout_dObj.totalmet_origin = stockout_order_d.get('totalyds') == null ? 0 : stockout_order_d.get('totalyds') * 0.9144;
                    stockout_dObj.totalmet_check = 0;
                    stockout_dObj.totalydsorigin = stockout_order_d.get('totalyds') == null ? 0 : stockout_order_d.get('totalyds');
                    stockout_dObj.totalydscheck = 0;
                    stockout_dObj.unitid_link = stockout_order_d.get('unitid_link');
                    stockout_dObj.unit_name = stockout_order_d.get('unitname');

                    stockout_d.push(stockout_dObj);
                }
            }

            viewModel.set('stockout.stockout_d', stockout_d);

            // console.log(invoice_ds);
            // console.log(stockout);

            form.close();
        });
	},

    onPressEnterBtnStockoutOrder_Search: function(textfield, e, eOpts){
        var m = this;
        if(e.getKey() == e.ENTER) {
            // Ext.Msg.alert('Keys','You pressed the Enter key');
            m.onStockoutOrder_Search();
        }
    },
})