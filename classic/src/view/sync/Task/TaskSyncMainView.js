Ext.define('GSmartApp.view.sync.Task.TaskSyncMainView', {
    extend: 'Ext.form.Panel',
    xtype: 'TaskSyncMainView',
    id: 'TaskSyncMainView',
    controller: 'TaskSyncMainViewController',
    layout: 'border',
    items: [{
        region: 'west',
        border: true,
        margin: 1,
        width: '60%',
        xtype: 'TaskView'
    }, {
        region: 'center',
        border: true,
        margin: 1,
        xtype: 'FilieTransferView'
    }]
});

