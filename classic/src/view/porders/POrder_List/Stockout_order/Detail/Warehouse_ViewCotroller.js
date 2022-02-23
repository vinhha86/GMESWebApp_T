Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detai.Warehouse_ViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Warehouse_ViewCotroller',
    init: function () {
        var viewmodel = this.getViewModel();
        var POrderBomColorStore = viewmodel.getStore('POrderBomColorStore');
        var porderid_link = viewmodel.get('porderid_link');
        var type_from = viewmodel.get('type_from');
        var type_to = viewmodel.get('type_to');

        POrderBomColorStore.loadbytype(porderid_link,type_from,type_to);
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnChon': {
            click: 'onChon'
        }
    },
    onThoat: function(){
        this.fireEvent("Thoat");
    },
    onChon: function(){
        var grid = this.getView();
        var select = grid.getSelectionModel().getSelection();
        this.fireEvent("Chon", select);
    }
})