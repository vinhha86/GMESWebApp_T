Ext.define('GSmartApp.view.process_shipping.Balance.Balance_D_Product_Skus_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Balance_D_Product_Skus_Controller',
    init: function (view) {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Balance_D_Product_Sku');
        store.setData(viewmodel.get('productlist'));
        store.setGroupField('po_buyer');
    }
})