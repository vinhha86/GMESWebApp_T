Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detai.Stockout_order_coloramount_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_order_coloramount_ViewController',
    init: function () {

    },
    control: {

    },
    onEdit: function (editor, context, e) {
        if (context.value == context.originalValue) {
            return;
        }
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.data = context.record.data;

        GSmartApp.Ajax.post('/api/v1/stockoutorder/update_color_amount', Ext.JSON.encode(params),
            function (success, response, options) {
                var store = viewmodel.getStore('Stockout_order_color_amount_Store');
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
                        store.rejectChanges();
                    }
                    else {
                        store.commitChanges();
                    }
                }
                else {
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
            })
    }
})