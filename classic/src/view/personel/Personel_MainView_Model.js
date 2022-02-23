Ext.define('GSmartApp.view.personel.Personel_MainView_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Personel_MainView_Model',
    requires: ['GSmartApp.store.org.ListOrgMenuTreeStore', 'GSmartApp.store.personnel.Personnel_Store',
        'GSmartApp.store.timesheetshifttype.TimesheetShiftTypeStore',
        'GSmartApp.store.org.ListOrgStore', 'GSmartApp.store.personnel.Personnel_Position_Store', 'GSmartApp.store.personnel.PersonnelType_Store',
        'GSmartApp.store.personnel.PersonnelStatus_Store'],
    stores: {
        OrgStore: {
            type: 'ListOrgMenuTreeStore'
        },
        Personnel_Store: {
            type: 'Personnel_Store'
        },
        TimesheetShiftTypeStore: {
            type: 'TimesheetShiftTypeStore'
        },
        ListOrgStore: {
            type: 'ListOrgStore'
        },
        Personnel_Position_Store: {
            type: 'Personnel_Position_Store'
        },
        PersonnelTypeStore: {
            type: 'PersonnelType_Store'
        },
        PersonnelStatus_Store:{
            type:'PersonnelStatus_Store'
        }
    },
    data: {
        // isviewall: false, // bind checkbox xem tat ca
        // isdisabled: false,
        isviewallThoiVu: false,
        orgtypeid_link: null,
        donvi: {
            id: null
        },
        orgnameComboValue: null

    }
})