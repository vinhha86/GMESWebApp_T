Ext.define('GSmartApp.view.pcontract.PContractProductColorViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractProductColorViewCotroller',
    init: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractProductColorStore');
        store.loadStore(me.IdPContract, me.IdProduct)
    },
    control:{
        '#btnThoat':{
            click: 'onThoat'
        }
    },
    onThoat: function(){
        var me = this.getView();
        me.up('window').close();
    },
    onEdit: function(editor, context, e){
        var viewmodel  = this.getViewModel();
        var data = context.record.data;
        var params = new Object();
        params.data = data;

        GSmartApp.Ajax.post('/api/v1/pcontract_product_color/getcolor_update', Ext.JSON.encode(params),
           function (success, response, options) {
               if (success) {
                   var response = Ext.decode(response.responseText);
                   var store = viewmodel.getStore('PContractProductColorStore');
                   if (response.respcode != 200) {
                       Ext.Msg.show({
                           title: "Thông báo",
                           msg: 'Lưu thất bại',
                           buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                       });
                       store.rejectChanges();
                   }
                   else {
                    store.commitChanges();
                   }
               }
           })
    }
})