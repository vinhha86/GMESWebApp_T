Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_StockoutOrder_View_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Grant_Plan_StockoutOrder_View_Controller',
    init: function () {
        
    },
    control: {
        '#POrder_Grant_Plan_StockoutOrder_View': {
            afterrender: 'onAfterrender',
            itemdblclick: 'onItemdblclick',
        },
        '#btnTaoLenhCapVai': {
            click: 'onBtnTaoLenhCapVai',
        },
        '#btnThoat': {
            click: 'onThoat',
        },
    },

    onThoat: function(){
        this.getView().up('window').close();
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
        Stockout_order_Store.getSorters().add({
            property: 'porder_product_buyercode',
            direction: 'ASC'
        },{
            property: 'skuCode',
            direction: 'ASC'
        },{
            property: 'stockout_order_code',
            direction: 'ASC'
        });

        // load store
        m.loadStore();
    },
    loadStore: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var sourceView = viewModel.get('sourceView');
        var eventRecord = viewModel.get('eventRecord');
        var porder_grantid_link = viewModel.get('porder_grantid_link');

        // var porder_grantid_link = record.get('id');
        var stockouttypeid_link = 1;
        var page = 1;
        var limit = 500;
        var stockoutorderdate_from = new Date(2010, 0, 1, 0, 0, 0, 0);
        var stockoutorderdate_to = new Date(2040, 0, 1, 0, 0, 0, 0);

        var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
        Stockout_order_Store.loadStore_byPage_KeHoachSanXuat(
            stockoutorderdate_from, stockoutorderdate_to, 
            page, limit, null, 
            stockouttypeid_link, porder_grantid_link);
    },
    onItemdblclick: function(grid, record, item, index, e, eOpts){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var eventRecord = viewModel.get('eventRecord');
        var porder_grantid_link = viewModel.get('porder_grantid_link');

        // console.log(record);
        var id = record.get('id');
        // console.log(rec);
        // return;

        // popup
        var form = Ext.create('Ext.window.Window', {
			height: '90%',
            width: '95%',
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Chi tiết lệnh xuất vải',
			closeAction: 'destroy',
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'POrder_Grant_Plan_StockoutOrder_Edit_View',
                viewModel:{
                    data: {
                        id: id, // stockout_order id
                        // date_list: date_list,
                        pordergrantid_link: porder_grantid_link,
                        eventRecord: eventRecord
                    }
                }
			}]
		});
		form.show();

		form.down('#POrder_Grant_Plan_StockoutOrder_Edit_View').getController().on('Thoat', function () {
			form.close();
		})
        form.down('#POrder_Grant_Plan_StockoutOrder_Edit_View').getController().on('saveStockoutOrder', function () {
			// code here: reload store ...
            var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
            Stockout_order_Store.load();
            // form.close();
		})
        return;
    },
    onChiTietLenhCapVai: function (grid, rowIndex, colIndex) {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var eventRecord = viewModel.get('eventRecord');
        var porder_grantid_link = viewModel.get('porder_grantid_link');

        var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
        var rec = Stockout_order_Store.getAt(rowIndex);
        var id = rec.get('id');
        // console.log(rec);
        // return;

        // popup
        var form = Ext.create('Ext.window.Window', {
			height: '90%',
            width: '95%',
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Chi tiết lệnh xuất vải',
			closeAction: 'destroy',
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'POrder_Grant_Plan_StockoutOrder_Edit_View',
                viewModel:{
                    data: {
                        id: id, // stockout_order id
                        // date_list: date_list,
                        pordergrantid_link: porder_grantid_link,
                        eventRecord: eventRecord
                    }
                }
			}]
		});
		form.show();

		form.down('#POrder_Grant_Plan_StockoutOrder_Edit_View').getController().on('Thoat', function () {
			form.close();
		})
        form.down('#POrder_Grant_Plan_StockoutOrder_Edit_View').getController().on('saveStockoutOrder', function () {
			// code here: reload store ...
            var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
            Stockout_order_Store.load();
            // form.close();
		})
    },
    onBtnTaoLenhCapVai: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var eventRecord = viewModel.get('eventRecord');
        var porder_grantid_link = viewModel.get('porder_grantid_link');

        var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
        // var rec = Stockout_order_Store.getAt(rowIndex);
        // var id = rec.get('id');
        // console.log(rec);
        // return;

        // popup
        var form = Ext.create('Ext.window.Window', {
			height: '90%',
            width: '95%',
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Chi tiết lệnh xuất vải',
			closeAction: 'destroy',
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'POrder_Grant_Plan_StockoutOrder_Edit_View',
                viewModel:{
                    data: {
                        // id: id, // stockout_order id
                        // date_list: date_list,
                        pordergrantid_link: porder_grantid_link,
                        eventRecord: eventRecord
                    }
                }
			}]
		});
		form.show();

		form.down('#POrder_Grant_Plan_StockoutOrder_Edit_View').getController().on('Thoat', function () {
			form.close();
		})
        form.down('#POrder_Grant_Plan_StockoutOrder_Edit_View').getController().on('createStockoutOrder', function () {
			// code here: reload store ...
            var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
            Stockout_order_Store.load();
            form.close();
		})
    },
})