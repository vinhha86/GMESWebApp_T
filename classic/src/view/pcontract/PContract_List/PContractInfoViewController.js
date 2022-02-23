Ext.define('GSmartApp.view.pcontract.PContractInfoViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractInfoViewController',
    control: {
        '#btnThoat': {
            click: 'onThoat'
        }
    },
    init: function () {
        var viewmodel = this.getViewModel();
        var storeproduct = viewmodel.getStore('PContractProductTreeStore');
        storeproduct.loadStore(viewmodel.get('pcontractid_link'), 0);
    },
    onThoat: function () {
        this.getView().up('window').close();
    }
})