Ext.define('GSmartApp.view.dm_loainghieviec.TimeSheetAbsenceTypeViewModel',{
    extend:'Ext.app.ViewModel',
    alias:'viewmodel.TimeSheetAbsenceTypeViewModel',
    requires: [ 'GSmartApp.store.TimeSheetAbsence.TimeSheetAbsenceTypeStore'],

    stores:{
        TimeSheetAbsenceTypeStore: {
            type: 'TimeSheetAbsenceTypeStore'
        },
    },
})