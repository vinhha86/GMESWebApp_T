Ext.define('GSmartApp.view.salary.Salary_Sum_ListOrg_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Salary_Sum_ListOrg_Controller',
    init: function () {
        this.onload();
    },
    control: {
        '#Salary_Sum_ListOrg': {
            itemclick: 'onloadDetail'
        }
    },
    onloadDetail: function( grid, record, item, index, e, eOpts){
        var viewmodel = this.getViewModel();
        viewmodel.set('selected_orgid',record.get('id'));
    },
    onload: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var OrgStore = viewModel.getStore('OrgStore');
        OrgStore.loadStore();

        OrgStore.getSorters().add('orgtypeid_link');
        OrgStore.getSorters().add('is_manufacturer');
        OrgStore.getSorters().add('id');
    }
})