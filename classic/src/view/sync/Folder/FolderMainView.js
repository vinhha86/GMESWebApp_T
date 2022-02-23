Ext.define('GSmartApp.view.sync.Folder.FolderMainView', {
    extend: 'Ext.form.Panel',
    xtype: 'FolderMainView',
    id: 'FolderMainView',
    controller: 'FolderMainViewController',
    layout: 'border',
    items: [{
        region: 'west',
        border: true,
        margin: 1,
        width: '50%',
        xtype: 'FolderLocalView'
    }, {
        region: 'center',
        border: true,
        margin: 1,
        xtype: 'DriverView'
    }]
});

