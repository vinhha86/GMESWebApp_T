Ext.define('GSmartApp.view.TimeSheetAbsence.TimeSheetAbsence_MainView', {
    extend: 'Ext.form.Panel',
    xtype: 'TimeSheetAbsence_MainView',
    id:'TimeSheetAbsence_MainView',
    layout: 'border',
    items: [{
        region: 'center',
        // width: '70%',
        // title: 'Danh sách nhân viên',
        xtype: 'TimeSheetAbsence',
        border: false,
        // margin: 1
    }],
})