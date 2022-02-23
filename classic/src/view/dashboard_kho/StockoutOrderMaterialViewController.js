Ext.define('GSmartApp.view.dashboard_kho.StockoutOrderMaterialViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockoutOrderMaterialViewController',
    init: function () {
        
    },
    control: {
        '#StockoutOrderMaterialView': {
            afterrender: 'onAfterrender',
            itemdblclick: 'onItemdblclick',
        },
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
    },
    onItemdblclick: function(grid, record, item, index, e, eOpts){
        // return;
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        // var eventRecord = viewModel.get('eventRecord');
        // var porder_grantid_link = viewModel.get('porder_grantid_link');

        // console.log(record);
        var id = record.get('id');
        var porder_grantid_link = record.get('porder_grantid_link');
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
			title: 'Yêu cầu xuất',
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
                        // eventRecord: eventRecord
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
        // return;
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var eventRecord = viewModel.get('eventRecord');
        var porder_grantid_link = viewModel.get('porder_grantid_link');

        var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
        var rec = Stockout_order_Store.getAt(rowIndex);
        var id = rec.get('id');
        var porder_grantid_link = rec.get('porder_grantid_link');
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
			title: 'Yêu cầu xuất',
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
                        // eventRecord: eventRecord
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
    onTaoPhieuXuatVai: function(grid, rowIndex, colIndex){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
        var rec = Stockout_order_Store.getAt(rowIndex);
        var id = rec.get('id');
        var porder_grantid_link = rec.get('porder_grantid_link');
        // console.log(rec);
        // return;

        // xuat to cat
        var stockoutorderidObj = new Object();
        stockoutorderidObj.id = id;
        GSmartApp.util.State.set('stockoutorderidObj', stockoutorderidObj);
        // m.redirectTo('stockout_m/1/create');

        var form = Ext.create('Ext.window.Window', {
			height: '90%',
            width: '95%',
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Tạo phiếu xuất vải',
			closeAction: 'destroy',
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'Stockout_M_Edit',
                viewModel:{
                    data: {
                        sourceView: 'StockoutOrderMaterialView',
                    }
                }
			}]
		});
		form.show();

		form.down('#Stockout_M_Edit').getController().on('Thoat', function () {
			form.close();
		})
    },

    onMenu_StockoutOrderList: function (grid, rowIndex, colIndex, item, e, record) {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
                {
                    text: 'Chi tiết lệnh xuất vải',
                    itemId: 'btnChiTietLenhXuatVai',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-edit',
                    // iconCls: 'x-fa fas fa-edit brownIcon',
                    handler: function () {
                        // var record = this.parentMenu.record;
                        m.onChiTietLenhCapVai(grid, rowIndex, colIndex);
                    },
                },
                {
                    text: 'Tạo phiếu xuất vải',
                    itemId: 'btnTaoPhieuXuatVai',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-plus',
                    // iconCls: 'x-fa fas fa-trash redIcon',
                    handler: function () {
                        // var record = this.parentMenu.record;
                        m.onTaoPhieuXuatVai(grid, rowIndex, colIndex);
                    }
                },
            ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX() - 10, e.getY() - 10];
        e.stopEvent();
        menu_grid.record = record;
        menu_grid.showAt(position);
        // common.Check_Menu_Permission(menu_grid);
    },
})