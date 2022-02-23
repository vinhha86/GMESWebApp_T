Ext.define('GSmartApp.view.Schedule.Plan.Schedule_plan_Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'Schedule_plan_Main',
    id: 'Schedule_plan_Main',
    layout: 'border',
    controller: 'Schedule_plan_Main_Controller',
    viewModel : {
        type: 'Schedule_plan_ViewModel'
    },
    items: [
        {
            xtype: 'FilterBar',
            region: 'north',
            height: 45,
            margin: 1
        },
        {
            xtype: 'Schedule_plan_View',
            region: 'center'
        },
        {
            xtype: 'TabPorder_notGrant_and_PorderReq',
            id:'Schedule_plan_POrderUnGranted',
            width: '55%',
            region: 'east',
            hidden: true  
        },
        {
            xtype: 'Schedule_plan_GuestView',
            id:'Schedule_plan_Schedule_plan_GuestView',
            width: '50%',
            region: 'east',
            hidden: true  
        }
    ]
})