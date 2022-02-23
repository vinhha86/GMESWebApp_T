Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_StockList_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutplanProcessing_StockList_Controller',
    init: function () {
        this.loadData();
    },
    listen: {

    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    loadData: function(){
        var viewModel = this.getViewModel();
        var skuid_link = viewModel.get('skuid_link');
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        WarehouseStore.loadBySkuAndStock(skuid_link);
        WarehouseStore.getSorters().add({
            property: 'lotnumber',
            direction: 'ASC'
        },{
            property: 'packageid',
            direction: 'ASC'
        });
    },
    renderSum: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
	},
})