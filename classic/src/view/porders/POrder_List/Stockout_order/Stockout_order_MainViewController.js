Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Stockout_order_MainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_order_MainViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        if (viewmodel.get('isload')) {
            var POrderGrantStore = viewmodel.getStore('Stockout_order_Store');
            var porderid_link = viewmodel.get('porderid_link');
            var material_skuid_link = viewmodel.get('material_skuid_link');
            POrderGrantStore.GetByPorderAndNPL(porderid_link, material_skuid_link);
        }
    }
})