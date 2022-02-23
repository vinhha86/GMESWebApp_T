Ext.define('GSmartApp.view.TimeSheetLunch.Shift_List.HuyXacNhanViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HuyXacNhanViewController',
    isActivate: false,
    init: function () {
        var viewModel = this.getViewModel();
        var TimesheetShiftTypeOrgStore = viewModel.getStore('TimesheetShiftTypeOrgStore');
        var orgid_link = viewModel.get('orgid_link');
        var date = viewModel.get('date');

        TimesheetShiftTypeOrgStore.getbyorgid_link_caAn_forConfirm_async(orgid_link, date);
        TimesheetShiftTypeOrgStore.load();

        filters = TimesheetShiftTypeOrgStore.getFilters();
        filters.add({
            id: 'isConfirm',
            property: 'isConfirm',
            value: true
        });
    },
    listen: {
        controller: {

        }
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnSelect': {
            click: 'onSelect'
        },
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onSelect: function () {
        var viewmodel = this.getViewModel();
        this.fireEvent('HuyXacNhan', viewmodel.get('record'));
    }
})