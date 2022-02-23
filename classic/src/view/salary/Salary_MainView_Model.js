Ext.define('GSmartApp.view.salary.Salary_MainView_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Salary_MainView_Model',
    requires: ['GSmartApp.store.org.ListOrgMenuTreeStore','GSmartApp.store.timesheetshifttypeorg.TimesheetShiftTypeOrgStore','GSmartApp.store.timesheetshifttype.TimesheetShiftTypeStore'],
    stores: {
        OrgStore: {
            type: 'ListOrgMenuTreeStore'
        },
        SalTypeLevel_DefHourStore: {
            type: 'SalTypeLevelStore'
        },
        SalTypeLevel_DefProductivityStore: {
            type: 'SalTypeLevelStore'
        },
        SalTypeLaborLevelStore: {
            type: 'SalTypeLaborLevelStore'
        },
        SalTypePositionStore: {
            type: 'SalTypePositionStore'
        },
        SalBasicStore: {
            type: 'SalBasicStore'
        },
        SalComStore: {
            type: 'SalComStore'
        },
        SalComLaborLevelStore: {
            type: 'SalComLaborLevelStore'
        } ,
        SalComPositionStore: {
            type: 'SalComPositionStore'
        },
        TimesheetShiftTypeOrgStore:{
            type:'TimesheetShiftTypeOrgStore'
        },
        TimesheetShiftTypeStore:{
              type:'TimesheetShiftTypeStore'
          }
    },
    data: {
        selected_tab: null,
        isMenuHide_SalType: false,
        selected_orgid: null,
        selected_saltypeid: null,
        selected_salcomid: null,
        org_sal_basic: {
            id: null,
            sal_basic: null,
            sal_min: null,
            workingdays: null,
            costpersecond: null,
            overtime_normal: null,
            overtime_weekend: null,
            overtime_holiday: null,
            overtime_night: null,
        },
        TimeShift:null,
        orgid_link:null
    }
})