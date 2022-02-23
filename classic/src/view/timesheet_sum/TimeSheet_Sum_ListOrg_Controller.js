Ext.define('GSmartApp.view.salary.TimeSheet_Sum_ListOrg_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimeSheet_Sum_ListOrg_Controller',
    init: function () {
        this.onload();
    },
    control: {
        '#TimeSheet_Sum_ListOrg': {
            itemclick: 'onloadDetail'
        }
    },
    onloadDetail: function (grid, record, item, index, e, eOpts) {
        var viewmodel = this.getViewModel();
        viewmodel.set('selected_orgid', record.get('id'));
    },
    onload: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var OrgStore = viewModel.getStore('OrgStore');
        OrgStore.loadStore();

        this.activeOnlyFilter = Ext.create('Ext.util.Filter', {
            id: 'activeOnlyFilter',
            property: 'status',
            value: 1
        });
        OrgStore.getFilters().add(this.activeOnlyFilter);

        OrgStore.getSorters().add('orgtypeid_link');
        OrgStore.getSorters().add('is_manufacturer');
        OrgStore.getSorters().add('id');
    }
})