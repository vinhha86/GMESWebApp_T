Ext.define('GSmartApp.view.pcontract.ListOrg_ReqController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ListOrg_ReqController',
    init: function () {
        var viewmodel = this.getViewModel();
        var pcontractpo_id_link = viewmodel.get('id');
        var store = viewmodel.getStore('OrgStore');
        store.loadOrg_NotRequest(pcontractpo_id_link);
    },
    onHideOrg: function(){
       var grid =this.getView();
       grid.setWidth(0); 
    }
})