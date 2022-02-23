Ext.define('GSmartApp.view.stock.stock_material_list.StockProductListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockProductListController',
    init: function () {
        // this.onloadPage();
    },
    control: {
        // '#StockMenu': {
        //     itemclick: 'onloadDetail'
        // },
    },
    onloadPage: function(){
        var viewModel = this.getViewModel();
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        WarehouseStore.getSorters().add({
            property: 'skucode',
            direction: 'ASC'
        },{
            property: 'contractcode',
            direction: 'ASC'
        },{
            property: 'lotnumber',
            direction: 'ASC'
        },{
            property: 'packageid',
            direction: 'ASC'
        });
    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
})