Ext.define('GSmartApp.view.dashboard_khotp.Dashboard_KhoTP_BieuDo_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Dashboard_KhoTP_BieuDo_Main_Controller',
    init: function () {
        
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
    },
    onThoat: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        m.fireEvent('Thoat');
    },
});
