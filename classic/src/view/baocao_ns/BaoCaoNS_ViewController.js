Ext.define('GSmartApp.view.baocao_ns.BaoCaoNS_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BaoCaoNS_ViewController',
    init: function () {
    },
    control: {
        '#baocao_ns': {
            afterrender: 'onAfterrender'
        },
        '#date': {
            change: 'onDateChange'
        },
        '#btnRefresh': {
            click: 'onRefresh'
        },
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var date = viewModel.get('date');
        var TimeSheetAbsenceStore = viewModel.getStore('TimeSheetAbsenceStore');
        TimeSheetAbsenceStore.getForBaoCaoNS(date);
    },
    onRefresh: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var TimeSheetAbsenceStore = viewModel.getStore('TimeSheetAbsenceStore');
        TimeSheetAbsenceStore.load();
    },
    onDateChange: function( datefield, newValue, oldValue, eOpts){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        // var date = viewModel.get('date');
        var TimeSheetAbsenceStore = viewModel.getStore('TimeSheetAbsenceStore');
        TimeSheetAbsenceStore.getForBaoCaoNS(newValue);
    },
})