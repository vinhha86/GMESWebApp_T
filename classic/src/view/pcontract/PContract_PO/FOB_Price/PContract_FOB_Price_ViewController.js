Ext.define('GSmartApp.view.pcontract.PContract_FOB_Price_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_FOB_Price_ViewController',
    init: function(){
        var viewmodel = this.getViewModel();
        var store  =  viewmodel.getStore('PriceStore');
        store.loadStore();
    },
    control: {
        '#btnThoat' : {
            click : 'onThoat'
        },
        '#btnChon': {
            click: 'onChon'
        }
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onChon: function(){
        var me = this.getView();
        var m = this;
        var select = me.getSelectionModel().getSelection();
        m.fireEvent("SelectPrice", select);
    }
})