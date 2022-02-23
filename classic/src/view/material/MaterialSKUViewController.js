Ext.define('GSmartApp.view.product.MaterialSKUViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MaterialSKUViewController',
    OldValue: "",
    init: function () {
        var me = this.getView();
    },
    control: {
        '#txtcode': {
            focus: 'onfocus',
            focusleave: 'onfocusleave'
        }
    },
    onfocus: function (m) {
        this.oldValue = m.getValue();
    },
    onfocusleave: function (m, event, eOpts) {
        var me = this.getView();
        if (m.getValue() == this.oldValue) return;

        var check = this.checkValidate(m.getValue());
        if (!check) {
            m.setValue(this.oldValue);
            return;
        }

        var select = this.getView().getSelectionModel().getSelection();
        select[0].data.code = m.getValue();

        var params = new Object();
        params.msgtype = "SKU_CREATE";
        params.message = "Tạo mã vạch";
        params.data = select[0].data;

        this.getView().setLoading("Đang lưu dữ liệu");

        var me = this.getView();
        GSmartApp.Ajax.post('/api/v1/sku/createcode', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var store = me.getStore();
                    store.load();
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
    },
    checkValidate: function (code) {
        var store = this.getViewModel().getStore('SKUStore');
        for (var i = 0; i < store.data.length; i++) {
            var data = store.data.items[i].data;
            if (data.code == code) {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Mã vạch đã tồn tại ở dòng " + (i + 1),
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });

                return false;
            }
        }
        return true;
    }
})