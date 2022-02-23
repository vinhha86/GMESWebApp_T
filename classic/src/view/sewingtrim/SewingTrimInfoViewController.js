Ext.define('GSmartApp.view.sewingtrim.SewingTrimInfoViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SewingTrimInfoViewController',
    init: function () {
        var me = this.getView();

        if (this.getView().IdProduct == 0) {
            this.getView().getForm().reset();
        }
        var unitStore = this.getViewModel().getStore('UnitStore');
        unitStore.loadStore();
        me.down('#code').focus();
    },
    loadInfo: function (id) {
        if (id == 0) {
            this.getView().getForm().reset();
            return;
        }

        var me = this.getView();
        var viewModel = this.getViewModel();
        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/product/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        viewModel.set('product', response.data);
                        viewModel.set('img', response.img);
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lấy thông tin thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    }
})