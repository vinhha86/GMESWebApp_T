Ext.define('GSmartApp.view.pprocess.POrderListWindow', {
    extend: 'Ext.window.Window',
    xtype: 'porderlistwindow',
    viewModel: 'porderlistwindow',
    requires: [
        'GSmartApp.view.main.POrderList'
    ],
    //controller: 'porderlist',
    title: 'Thêm lệnh sản xuất',
    width: 800,
    height: 500,
    margin:10,
    layout: 'fit',
    resizable: true,
    modal: true,
    items:[{
        title:'', 
        xtype: 'porderlist'
    }]
    // listeners: {
    //     select: 'onOrgItemSelected'
    // }
});
