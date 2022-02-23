Ext.define('GSmartApp.view.salary.TimeSheet_Sum_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'TimeSheet_Sum_Main',
    id:'TimeSheet_Sum_Main',
    viewModel:{
        type:'TimeSheet_Sum_Model'
    },
    layout: 'border',
    items: [{
        region: 'west',
        width: 250,
        title: 'Danh sách đơn vị',
        xtype: 'TimeSheet_Sum_ListOrg',
        border: true,
        margin: 1
    
    }, {
        region: 'center',
        xtype: 'TimeSheet_Sum_D',
        border: true,
        margin: 1
    }]
})