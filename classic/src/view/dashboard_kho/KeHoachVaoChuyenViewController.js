Ext.define('GSmartApp.view.dashboard_kho.KeHoachVaoChuyenViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.KeHoachVaoChuyenViewController',
    init: function () {
        var me = this;
        me.CreateColumns();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('KeHoachVaoChuyenStore');
        store.setGroupField('donvi');
        store.loadKeHoachVaoChuyen();
    },
    control: {
        '#KeHoachVaoChuyenView': {
            itemclick: 'onItemClick'
        },
    },
    onItemClick: function(grid, record, item, index, e, eOpts){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        // console.log(record);
        // return;

        var porder_grantid_link = record.get('id');
        var stockouttypeid_link = 1;
        var page = 1;
        var limit = 500;
        // var stockoutorderdate_from = new Date(2021, 10, 30, 0, 0, 0, 0);
        // var stockoutorderdate_to = new Date(2040, 0, 1, 0, 0, 0, 0);

        var date = new Date();
        var stockoutorderdate_from = new Date(
            date.getFullYear(), date.getMonth(), date.getDate() -5, 0, 0, 0, 0
            );
        var stockoutorderdate_to = new Date(
            date.getFullYear(), date.getMonth(), date.getDate() +5, 0, 0, 0, 0
            );
        // console.log(stockoutorderdate_from);
        // console.log(stockoutorderdate_to);
        
        var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
        Stockout_order_Store.loadStore_byPage_KeHoachSanXuat(
            stockoutorderdate_from, stockoutorderdate_to, 
            page, limit, null, 
            stockouttypeid_link, porder_grantid_link);
    },
    onReload: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('KeHoachVaoChuyenStore');
        store.load();
        var Stockout_order_Store = viewmodel.getStore('Stockout_order_Store');
        Stockout_order_Store.removeAll();
    },
    onbuyernameFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('KeHoachVaoChuyenStore');
        var filterField = this.lookupReference('buyernameFilter'),
            filters = store.getFilters();

        if (filterField.value) {
            this.buyernameFilter = filters.add({
                id: 'buyernameFilter',
                property: 'buyername',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.buyernameFilter) {
            filters.remove(this.buyernameFilter);
            this.buyernameFilter = null;
        }
    },
    onproductcodeKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('KeHoachVaoChuyenStore');
        var filterField = this.lookupReference('productcodeFilter'),
            filters = store.getFilters();

        if (filterField.value) {
            this.productcodeFilter = filters.add({
                id: 'productcodeFilter',
                property: 'productcode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.productcodeFilter) {
            filters.remove(this.productcodeFilter);
            this.productcodeFilter = null;
        }
    },
    CreateColumns: function () {
        var date = new Date();
        var length = 5;
        var grid = this.getView();
        //sinh 7 ngay tu ngay hom nay
        for (var i = 0; i < 7; i++) {
            var day = Ext.Date.add(date, Ext.Date.DAY, i);
            var title = Ext.Date.dateFormat(day, "d/m");
            var dataIndex = "day" + i;

            var column = Ext.create('Ext.grid.column.Number', {
                text: title,
                xtype: 'column',
                dataIndex: dataIndex,
                width: 70,
                menuDisabled: true,
                align: 'right',
                renderer: function (value, metaData, record) {
                    if (value == 0) return "";
                    return Ext.util.Format.number(value, '0,000')
                }
            });
            grid.headerCt.insert(length, column);
            length++;
        }
    }
})