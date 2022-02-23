Ext.define('GSmartApp.view.salary.Salary_DefCom_Position_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Salary_DefCom_Position_Main',
    id: 'Salary_DefCom_Position_Main',
    itemId: 'Salary_DefCom_Position_Main',
    controller: 'Salary_DefCom_Controller',
    layout: 'border',
    // height: 500,
    items: [
        {
            region: 'center',
            border: true,
            xtype: 'Salary_DefCom_Grid'
        },
        {
            region: 'east',
            border: true,
            margin: '0 0 0 5',
            width: 210,
            xtype: 'Salary_DefCom_Position',
        }
    ],
})