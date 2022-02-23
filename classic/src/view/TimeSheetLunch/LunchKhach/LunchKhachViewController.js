Ext.define('GSmartApp.view.TimeSheetLunch.LunchKhachViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LunchKhachViewController',
    init: function () {

    },
    onEdit: function (editor, context, e) {
        var viewmodel = this.getViewModel();

        if (context.value == context.originalValue) return;
        var params = new Object();
        params.id = context.record.data.id;
        params.amount = context.value;

        GSmartApp.Ajax.post('/api/v1/timesheetlunch_khach/update', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var store = viewmodel.getStore('TimeSheetLunchKhachStore');
                    if (response.respcode == 200) {
                        store.commitChanges();
                    }
                    else {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: 'Cập nhật thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },
                            fn: function () {
                                store.rejectChanges();
                            }
                        });
                    }
                } else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: 'Cập nhật thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        },
                        fn: function () {
                            store.rejectChanges();
                        }
                    });
                }
            })
    }
})