Ext.define('GSmartApp.view.porders.POrder_Grant_SKU_Plan.POrder_Grant_SKU_Plan_Material_View_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Grant_SKU_Plan_Material_View_Controller',
    init: function () {
        
    },
    control: {
        '#btnCanDoi': {
            click: 'onCanDoi',
        },
        '#btnThoat': {
            click: 'onThoat',
        },
    },
    listen: {
        store: {
            'SKUBalanceStore': {
                'loadStore_SKUBalanceStore_Done': 'onloadStore_SKUBalanceStore_Done'
            }
        }
    },

    onThoat: function(){
        this.getView().up('window').close();
    },
    onCanDoi: function(){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        var sourceView = viewModel.get('sourceView');
        var eventRecord = viewModel.get('eventRecord');
        var porder_grantid_link = viewModel.get('porder_grantid_link');
        // var porderid_link = eventRecord.get('porderid_link');
        var porderid_link;

        if(sourceView == 'SchedulePlan'){
            porderid_link = eventRecord.get('porderid_link');
        }else if(sourceView == 'Dashboard_KhoTP_POLine_Main'){
            porderid_link = eventRecord.porderid_link;
        }

        // console.log("sourceView: " + sourceView);
        // console.log(eventRecord);
        // console.log("porder_grantid_link: " + porder_grantid_link);
        // console.log("porderid_link: " + porderid_link);

        // return;

        if(porderid_link != null){
            me.setLoading(true);
            var SKUBalanceStore = viewModel.get('SKUBalanceStore');
            SKUBalanceStore.loadBalancePOrderGrant(porder_grantid_link);
        }

        // var porderid_link = viewmodel.get('porderid_link');
        // SKUBalanceStore_Mat.loadBalancePOrder(porderid_link);
    },
    onloadStore_SKUBalanceStore_Done: function(){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        me.setLoading(false);
    },
})