Ext.define('GSmartApp.view.RFID.demoRFID.inv.inv_create_ViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.inv_create_ViewCotroller',
    init: function () {
        var viewmodel = this.getViewModel();
        var store_type = viewmodel.getStore('StoreType');
        store_type.loadStore();
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
        this.fireEvent('Thoat');
    },
    onLuu: function () {
        var me = this.getView();
        me.setLoading('Đang lưu dữ liệu');

        var viewmodel = this.getViewModel();
        var inv = viewmodel.get('inv');

        var params = new Object();
        params.name = viewmodel.get('inv.storename');
        params.code = viewmodel.get('inv.codename');
        params.type = viewmodel.get('inv.storetype_id');

        var url = 'demorfid/createinv';

        GSmartApp.Ajax.post_demo(url, Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.fireEvent('Create');
                    }
                }
            })
    }
})