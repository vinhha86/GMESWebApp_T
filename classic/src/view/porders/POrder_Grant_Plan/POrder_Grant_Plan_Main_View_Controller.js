Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_Main_View_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Grant_Plan_Main_View_Controller',
    init: function () {
        
    },
    control: {
        '#btnThoat': {
            click: 'onThoat',
        },
        '#btnCanDoi': {
            click: 'onCanDoi',
        },
        '#btnTest': {
            click: 'onTest',
        },
    },
    onTest: function(){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        var POrderGrant_SKU_PlanStore = viewModel.getStore('POrderGrant_SKU_PlanStore');
        console.log(POrderGrant_SKU_PlanStore.getData().items);
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    onCanDoi: function(){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        var sourceView = viewModel.get('sourceView');
        var eventRecord = viewModel.get('eventRecord');
        var porder_grantid_link = viewModel.get('porder_grantid_link');
        var porderid_link = eventRecord.get('porderid_link');

        // console.log("sourceView: " + sourceView);
        // console.log(eventRecord);
        // console.log("porder_grantid_link: " + porder_grantid_link);
        // console.log("porderid_link: " + porderid_link);

        // return;

        if(porderid_link != null){
            var SKUBalanceStore = viewModel.get('SKUBalanceStore');
            SKUBalanceStore.loadBalancePOrderGrant(porder_grantid_link);
        }

        // var porderid_link = viewmodel.get('porderid_link');
        // SKUBalanceStore_Mat.loadBalancePOrder(porderid_link);
    }
})