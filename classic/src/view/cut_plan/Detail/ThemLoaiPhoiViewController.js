Ext.define('GSmartApp.view.cut_plan.Detail.ThemLoaiPhoiViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ThemLoaiPhoiViewController',
    init: function () {
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onChon'
        }
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onChon: function () {
        var loaiphoi = this.getViewModel().get('loaiphoi');
        this.fireEvent('ThemLoaiPhoi', loaiphoi);
    }
})