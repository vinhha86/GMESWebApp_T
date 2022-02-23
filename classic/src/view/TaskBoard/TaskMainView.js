Ext.define('GSmartApp.view.TaskBoard.TaskMainView', {
    extend: 'Ext.panel.Panel',
    xtype: 'TaskMainView',
    id: 'TaskMainView',
    layout: 'border',
    viewModel: {
        // type: 'TaskBoardViewModel'
    },
    items: [{
        region: 'west',
        width: '100%',
        border: false,
        xtype: 'TaskBoardView',
        id: 'TaskBoardView',
        bind: {
            hidden: '{isTaskBoardHidden}'
        },
        margin: 1
    },{
        region: 'center',
        width: '100%',
        border: false,
        xtype: 'TaskGrid',
        id: 'TaskGrid',
        bind: {
            hidden: '{isTaskGridHidden}'
        },
        margin: 1
    }]
})