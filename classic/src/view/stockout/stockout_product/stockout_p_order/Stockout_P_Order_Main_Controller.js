Ext.define('GSmartApp.view.stockout_product.stockout_p_order.Stockout_P_Order_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_P_Order_Main_Controller',
	init: function() {
        var me = this.getView();

        var today = new Date();
		var fromDate_Default = new Date().setDate(today.getDate()-10);
		me.down('#stockoutorderdate_from').setValue(new Date(fromDate_Default));
        var toDate_Default = new Date().setDate(today.getDate()+10);
		me.down('#stockoutorderdate_to').setValue(new Date(toDate_Default));

        this.onSearch();
	},
    control: {
        '#Stockout_P_Order_List': {
            itemclick: 'onStockoutOrderClick'
        },
        '#btnTimKiem': {
            click: 'onSearch'
        }
	},
    onSearch: function () {
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var Stockout_P_Order_Store = viewModel.getStore('Stockout_P_Order_Store');

        var stockoutorderdate_from = me.down('#stockoutorderdate_from').getValue();
		var stockoutorderdate_to = me.down('#stockoutorderdate_to').getValue();

        // Stockout_P_Order_Store.loadStore_byPage_async(
        //     stockoutorderdate_from, stockoutorderdate_to, 1, 1000, 21);

        //     Stockout_P_Order_Store.load({
        //     scope: this,
        //     callback: function (records, operation, success) {
        //         if (!success) {
        //             // this.fireEvent('logout');
        //         } 
        //         else {
        //             console.log(records);
        //         }
        //     }
        // });

        Stockout_P_Order_Store.loadStore_byPage_types_async(
            stockoutorderdate_from, stockoutorderdate_to, 1, 1000, 21, 29);

            Stockout_P_Order_Store.load({
            scope: this,
            callback: function (records, operation, success) {
                if (!success) {
                    // this.fireEvent('logout');
                } 
                else {
                    console.log(records);
                }
            }
        });
    },

    onMenu_StockoutPOrderList: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
                {
                    text: 'Tạo phiếu xuất kho',
                    itemId: 'btnMenu_StockoutOrderList_Cat',
                    separator: true,
                    margin: '10 0 0',
                    // iconCls: 'x-fa fas fa-edit brownIcon',
                    handler: function () {
                        // console.log(record);
                        var stockoutorderidObj = new Object();
                        stockoutorderidObj.id = record.get('id');
                        stockoutorderidObj.stockouttypeid_link = record.get('stockouttypeid_link');
                        GSmartApp.util.State.set('stockoutorderidObj', stockoutorderidObj);
                        me.redirectTo('stockout_p_main/' + record.get('stockouttypeid_link') + '/create');
                    },
                },
            ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX() - 10, e.getY() - 10];
        e.stopEvent();
        menu_grid.record = record;
        menu_grid.showAt(position);
    },

    renderSum: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    renderSumInteger: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onStockoutOrderClick: function(view, record, item, index, e, eOpts){
        // console.log(record);
        var viewModel = this.getViewModel();
        var stockout_order = record.data;

        viewModel.set('stockout_order', stockout_order);
    }
})