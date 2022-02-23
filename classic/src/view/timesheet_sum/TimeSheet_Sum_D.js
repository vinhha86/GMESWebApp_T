Ext.define('GSmartApp.view.salary.TimeSheet_Sum_D', {
    extend: 'Ext.form.Panel',
    xtype: 'TimeSheet_Sum_D',
    id: 'TimeSheet_Sum_D',
    itemId: 'TimeSheet_Sum_D',
    controller: 'TimeSheet_Sum_D_Controller',
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
                title: 'Bảng chấm công',
                xtype: 'TimeSheet_Sum_D_WorkTable'
            }
        ]            
    }]
})