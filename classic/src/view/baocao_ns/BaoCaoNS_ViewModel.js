Ext.define('GSmartApp.view.baocao_ns.BaoCaoNS_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.BaoCaoNS_ViewModel',
    requires: [
        'GSmartApp.store.TimeSheetAbsence.TimeSheetAbsenceStore'
    ],
    stores: {
        TimeSheetAbsenceStore: {
            type: 'TimeSheetAbsenceStore'
        },
    },
    data: {
        date: new Date(),
    },
    formulas: {

    }
})