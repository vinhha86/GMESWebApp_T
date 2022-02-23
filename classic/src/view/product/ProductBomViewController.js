Ext.define('GSmartApp.view.product.ProductBomViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProductBomViewController',
    init: function () {
        
    },
    control:{
        '#actXoa':{
            click: 'onXoa'
        }
    },
    onXoa: function(grid, rowIndex, colIndex){
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var rec = grid.getStore().getAt(rowIndex);

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa nguyên phụ liệu "' + rec.data.materialName + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'no') {
                    return;
                }
                else{
                    var params = new Object();
                    params.id = rec.data.id;
            
                    GSmartApp.Ajax.post('/api/v1/product/deleteproductbom', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                if (response.respcode != 200) {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: 'Xóa thất bại',
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng',
                                        }
                                    });
                                }
                                else {
                                    grid.getStore().removeAt(rowIndex);
                                    var nplStore = viewmodel.getStore('productStore');
                                    nplStore.load();
                                }
                            }
                        })
                }
            }
        });
    },
    onEdit: function(editor, context, e){
         var viewmodel  = this.getViewModel();
         var data = context.record.data;
         var params = new Object();
         params.data = data;

         GSmartApp.Ajax.post('/api/v1/product/updateproductbom', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                    else {
                        var storebom = viewmodel.getStore('ProductBom');
                        storebom.commitChanges();
                    }
                }
            })
    }
})