Ext.define('GSmartApp.view.salary.Salary_Sum_D', {
    extend: 'Ext.form.Panel',
    xtype: 'Salary_Sum_D',
    id: 'Salary_Sum_D',
    itemId: 'Salary_Sum_D',
    controller: 'Salary_Sum_D_Controller',
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
                title: 'Bảng lương',
                xtype: 'Salary_Sum_D_SalTable_Grid'
            },
            {
                title: 'Bảng thưởng',
                xtype: 'panel'
            },
        ]            
    }]
})