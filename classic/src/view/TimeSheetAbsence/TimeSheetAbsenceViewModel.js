Ext.define('GSmartApp.view.TimeSheetAbsence.TimeSheetAbsenceViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TimeSheetAbsenceViewModel',
    requires: [
        'GSmartApp.store.TimeSheetAbsence.TimeSheetAbsenceStore',
        'GSmartApp.store.org.ListOrgStore',
        'GSmartApp.store.TimeSheetAbsence.TimeSheetAbsenceTypeStore'
    ],
    stores: {
        TimeSheetAbsenceStore: {
            type: 'TimeSheetAbsenceStore'
        },
        ListOrgStore: {
            type: 'ListOrgStore'
        },
        TimeSheetAbsenceTypeStore: {
            type: 'TimeSheetAbsenceTypeStore'
        },
    },
    data: {
        
    },
})