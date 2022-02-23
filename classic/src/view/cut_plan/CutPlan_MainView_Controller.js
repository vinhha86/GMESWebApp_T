Ext.define('GSmartApp.view.cut_plan.CutPlan_MainView_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutPlan_MainView_Controller',
    init: function () {



    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        }
    },
    onThoat: function () {
        this.fireEvent('Thoat');
    }
})