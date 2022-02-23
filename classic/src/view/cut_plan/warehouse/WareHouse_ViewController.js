Ext.define('GSmartApp.view.cut_plan.warehouse.WareHouse_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.WareHouse_ViewController',
    init: function () {
        
    },
    control: {
        '#btnHideWarehouse' :{
            click: 'onHideWarehouse'
        }
    },
    onHideWarehouse: function(){
        var viewmodel = this.getViewModel();
        viewmodel.set('width_npl', '100%');
    }
})