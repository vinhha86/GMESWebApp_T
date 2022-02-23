Ext.define('GSmartApp.view.org.ListOrgMain', {
    extend: 'Ext.form.Panel',
    xtype: 'lsorg',
    id:'ListOrgMain',
    viewModel:{
        type:'ListOrgViewModel'
    },
    layout: 'border',
    height: 500,
    items: [{
        region: 'west',
        width: '50%',
        title: 'Danh sách đơn vị',
        xtype: 'lsorgmenu',
        border: true,
        margin: 1
    
    }, {
        region: 'east',
        width: '50%',
        title: 'Thông tin chi tiết',
        xtype: 'ListOrgDetail',
        reference:'formOrgDetail',
        border: true,
        margin: 1
    }]

})