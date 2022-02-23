Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_StockoutOrder_Edit_Pkl_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Grant_Plan_StockoutOrder_Edit_Pkl_Controller',
    init: function () {
        
    },
    control: {
        '#POrder_Grant_Plan_StockoutOrder_Edit_Pkl': {
            afterrender: 'onAfterrender',
        },
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        var Stockout_order_pkl_Store = viewModel.getStore('Stockout_order_pkl_Store');
        Stockout_order_pkl_Store.setGroupField('spaceString');
        Stockout_order_pkl_Store.getSorters().add({
            property: 'spaceString',
            direction: 'ASC'
        },{
            property: 'lotnumber',
            direction: 'ASC'
        },{
            property: 'packageid',
            direction: 'ASC'
        });
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';    
    },
})