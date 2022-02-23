Ext.define('GSmartApp.view.salary.Salary_MainView', {
    extend: 'Ext.form.Panel',
    xtype: 'Salary_MainView',
    id:'Salary_MainView',
    viewModel:{
        type:'Salary_MainView_Model'
    },
    layout: 'border',
    items: [{
        region: 'west',
        width: 200,
        title: 'Danh sách đơn vị',
        xtype: 'Salary_ListOrg_View',
        border: true,
        margin: 1
    
    }, {
        region: 'center',
        xtype: 'Salary_Def_Main',
        border: true,
        margin: 1
    }]
})