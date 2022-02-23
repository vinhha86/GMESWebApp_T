Ext.define('GSmartApp.view.salary.Salary_DefProductivity_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Salary_DefProductivity_Main',
    id: 'Salary_DefProductivity_Main',
    itemId: 'Salary_DefProductivity_Main',
    controller: 'Salary_DefProductivity_Controller',
    layout: 'border',
    // height: 500,
    items: [
        {
            region: 'north',
            height: 40,
            xtype: 'Salary_DefProductivity_SalBasic'
        },
        {
            region: 'center',
            xtype: 'panel',
            layout: 'border',
            items:[
                {
                    region: 'center',
                    border: true,
                    xtype: 'Salary_DefProductivity_SalTypeLevel'
                },
                {
                    region: 'east',
                    border: true,
                    margin: '0 0 0 5',
                    width: 210,
                    xtype: 'Salary_DefProductivity_SalTypeLabor',
                }
            ]
        }
    ],
    // dockedItems: [{
    //     layout: 'hbox',
    //     reference: 'dockBottomBar',
    //     border: false,
    //     dock: 'bottom',
    //     items: [{
    //         flex: 1,
    //         border: false
    //     }, 
    //     {
    //         xtype: 'button',
    //         text: 'Lưu',
    //         margin: 1,
    //         itemId: 'btnLuu_SalDefHour',
    //         iconCls: 'x-fa fa-save',
    //         formBind: true,
    //         bind: {
    //             hidden: '{isHidden_btnLuu}'
    //         },
    //     }]
    // }]
})