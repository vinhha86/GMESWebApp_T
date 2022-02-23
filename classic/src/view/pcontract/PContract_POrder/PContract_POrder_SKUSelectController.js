Ext.define('GSmartApp.view.pcontract.PContract_POrder_SKUSelectController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_POrder_SKUSelectController',
    init: function(){
        var viewmodel = this.getViewModel();
        var storeSku = viewmodel.getStore('PContractSKUStore');
        var pcontract_poid_link =  this.getView().pcontract_poid_link;
        var pcontractid_link =  this.getView().pcontractid_link;
        console.log(pcontractid_link);
        storeSku.loadStoreByPO(pcontractid_link, pcontract_poid_link);
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onLuu'
        }
    },    
    onThoat: function () {
        this.getView().up('window').destroy();
    },
    onLuu: function () {
        var me = this.getView();
        var porderid_link = me.porderid_link;
        var viewmodel = this.getViewModel();

        var select = me.getSelectionModel().getSelection();   

        if(select.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn chưa chọn sản phẩm',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });

            return;
        } else {
            me.fireEvent("SKUSave",select);
        }
    
    }
})