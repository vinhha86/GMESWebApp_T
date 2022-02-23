Ext.define('GSmartApp.view.salary.Salary_Sum_Porders_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Salary_Sum_Porders_Main',
    id:'Salary_Sum_Porders_Main',
    viewModel:{
        type:'Salary_Sum_Porders_Model'
    },
    layout: 'border',
    items: [{
        region: 'west',
        width: 250,
        title: 'Danh sách đơn vị',
        xtype: 'Salary_Sum_Porders_ListOrg',
        border: true,
        margin: 1
    
    }, {
        region: 'center',
        xtype: 'Salary_Sum_Porders_D',
        border: true,
        margin: 1
    }]
})