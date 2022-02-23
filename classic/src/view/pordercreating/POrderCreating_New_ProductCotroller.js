Ext.define('GSmartApp.view.pordercreating.POrderCreating_New_ProductCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderCreating_New_ProductCotroller',
    isActivate: false,
    init: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();

        
    },
    control:{
        '#cmbSanPham':{
            select: 'onSelectSanPham'
        }
        // '#btnTaolenh':{
        //     click: 'onTaoLenh'
        // }
    },
    onSelectSanPham: function(combo, record, eOpts){
        var productid_link = record.data.productid_link;
        var viewmodel = this.getViewModel();
        viewmodel.set('IdProduct',productid_link);
        
        var storeSku = viewmodel.getStore('PContractSKUPorderStore');
        var pcontractid_link = viewmodel.get('PContract.id');
        var storePOrders = viewmodel.getStore('porders');

        storeSku.loadStore(pcontractid_link, productid_link);
        storePOrders.loadByContract(pcontractid_link, productid_link);
    }
})