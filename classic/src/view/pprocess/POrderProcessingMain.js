Ext.define('GSmartApp.view.porders.POrderProcessingMain', {
    extend: 'Ext.container.Container',
    xtype: 'porderprocessingmain',
    requires: [
        'Ext.layout.container.Border'
    ],    
    layout: {
        type: 'border'
    },
    
    items: [
        {
            xtype: 'porderprocessingbysalarymonth',
            margin: 1,
            region: 'center'
            //scrollable: 'y'
            //userCls: 'big-60 small-100'
        },
        // {
        //     xtype: 'panel',
        //     width: 5
        // },
        {
            xtype: 'pordersalaryungranted',
            reference: 'pordersalaryungranted',
            id: 'panel_salaryungranted',
            width: 400,
            region: 'east',
            hidden: true,
            //collapsible: true        
        }
    ]
    // listeners: {
    //     activate: 'onActivate'
    // }      
});
