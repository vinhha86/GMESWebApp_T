Ext.define('GSmartApp.view.salary.Salary_Def_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Salary_Def_Main',
    id: 'Salary_Def_Main',
    itemId: 'Salary_Def_Main',
    controller: 'Salary_Def_Main_Controller',
    IdPContract: 0,
    layout: 'border',
    // height: 500,
    items: [
    {
        region: 'center',
        margin: 1,
        xtype: 'tabpanel',
        itemId:'tabmain',
        items: [
            {
                title: 'Lương giờ',
                xtype: 'Salary_DefHour_Main'
            },
            {
                title: 'Lương sản phẩm',
                xtype: 'Salary_DefProductivity_Main'
            },
            {
                title: 'Phụ cấp chức vụ',
                xtype: 'Salary_DefCom_Position_Main'
            },
            {
                title: 'Phụ cấp khác',
                xtype: 'Salary_DefCom_Labor_Main'
            },
            {
                title: 'Ca làm việc',
                xtype: 'TimesheetShiftTypeMainView'
            }
            
        ]            
    }]
})