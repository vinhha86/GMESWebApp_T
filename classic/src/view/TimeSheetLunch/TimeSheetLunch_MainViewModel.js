Ext.define('GSmartApp.view.personel.TimeSheetLunch_MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TimeSheetLunch_MainViewModel',
    requires: [
        'GSmartApp.store.org.ListOrgMenuTreeStore',
        'GSmartApp.store.TimeSheetLunch.TimeSheetLunchStore',
        'GSmartApp.store.TimeSheetLunch.TimeSheetLunchKhachStore'
    ],
    stores: {
        OrgStore: {
            type: 'ListOrgMenuTreeStore'
        },
        TimeSheetLunchStore: {
            type: 'TimeSheetLunchStore'
        },
        TimeSheetLunchKhachStore: {
            type: 'TimeSheetLunchKhachStore'
        },
        TimesheetShiftTypeOrgStore:{
            type: 'TimesheetShiftTypeOrgStore'
        },
    },
    data: {
        orgtypeid_link: null,
        orgid_link: null,
        isConfirm: null, // old, ko dung
        isToday: true,
        isEditable: null,
        isHidden_khach: true,
        current: new Date(),
        // confirm hidden, disabled,
        isBtnConfirmHidden: true,
        isBtnConfirmHiddenDisabled: true,
        isBtnUnconfirmHidden: true,
        isBtnUnconfirmHiddenDisabled: true,

        //
        numberShift: null,
        sumCa1: 0,
        sumCa2: 0,
        sumCa3: 0,
        sumCa4: 0,
        sumCa5: 0,
        //

        // cho phep danh dau check o cac cot hay khong
        isCa1Confirm: false,
        isCa2Confirm: false,
        isCa3Confirm: false,
        isCa4Confirm: false,
        isCa5Confirm: false,

        // filter
        personnelCodeFilterValue: null,
        personnelRegCodeFilterValue: null,
        personnelFullnameFilterValue: null,

        //
        selectedRecord_Donvi: null,
    },
    formulas: {
        // fieldStyle1: function (get) {
        //     var isCa1Confirm = get('isCa1Confirm');
        //     if(isCa1Confirm){
        //         return 'background-color: lightblue;';
        //     }else{
        //         return 'background-color: white;';
        //     }
        // }
    }
})