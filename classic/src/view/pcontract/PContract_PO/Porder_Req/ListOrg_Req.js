Ext.define('GSmartApp.view.pcontract.ListOrg_Req', {
    extend: 'Ext.grid.Panel',
    xtype: 'ListOrg_Req',
    id:'ListOrg_Req',
    controller: 'ListOrg_ReqController',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: false,
        columnLines: true,
        rowLines: true,
        plugins: {
            ptype: 'gridviewdragdrop',
            enableDrag: true,
            dragText: '{0} phân xưởng',
            dragGroup: 'porderGanttDropGroup',
            dropGroup: 'porderGanttDropGroup'
        }         
    },
    bind:{
        store:'{OrgStore}'
    },
    columns:[{
        header:'Đơn vị',
        dataIndex:'code',
        flex: 1
    }],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        padding: '0 0 10 5',
        height: 30,
        items: ['->',{
            xtype:'button',
            itemId: 'btnHideOrg',
            ui: 'header',
			tooltip: 'Ẩn',
            iconCls: 'x-fa fa-forward',
            handler: 'onHideOrg'
        }]
    }]
});

