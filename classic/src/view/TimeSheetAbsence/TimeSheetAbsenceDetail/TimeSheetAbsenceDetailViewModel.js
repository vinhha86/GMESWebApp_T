Ext.define('GSmartApp.view.TimeSheetAbsence.TimeSheetAbsenceDetailViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TimeSheetAbsenceDetailViewModel',
    requires: [
        'GSmartApp.store.org.ListOrgStore',
        'GSmartApp.store.personnel.Personnel_Store',
        'GSmartApp.store.TimeSheetAbsence.TimeSheetAbsenceTypeStore'
    ],
    stores: {
        ListOrgStore: {
            type: 'ListOrgStore'
        },
        ListProductionLineStore: {
            type: 'ListOrgStore'
        },
        Personnel_Store: {
            type: 'Personnel_Store'
        },
        TimeSheetAbsenceTypeStore: {
            type: 'TimeSheetAbsenceTypeStore'
        },
    },
    data: {
        id: null,
        personnelid_link: null,
        absencedate_from: null,
        absencedate_to: null,
        absence_reason: null,
        absencetypeid_link: null,
     //   personnelfullname:null,
        orgFactoryId: null, // hiển thị đơn vị
        orgProductionLineId: null, // hiẻn thị tổ

        isConfirm: true,
        isEdit:false,
        isBtnConfirmHidden: true
    },
})