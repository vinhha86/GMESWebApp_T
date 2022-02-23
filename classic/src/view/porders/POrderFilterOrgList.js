Ext.define('GSmartApp.view.porders.POrderFilterOrgList', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrderFilterOrgList',
    reference: 'POrderFilterOrgList',
    title: 'Tổ sản xuất',    
    bind: {
        store: '{OrgStore}'
    },
    columnLines: true,
    //multiSelect: true,
    selModel: 'rowmodel',
    viewConfig: {
        //enableTextSelection: true,
        stripeRows: false,
        plugins: {
            ptype: 'gridviewdragdrop',
            dropGroup: 'firstGridDDGroup'
        },
        listeners: {
            drop: 'onDrop',
            //beforedrop: 'onBeforeDrop'
        }        
     },
    columns: [
        { header: 'Tổ SX', dataIndex: 'name', width: 100},
        { header: 'Tổ trưởng', dataIndex: 'contactperson', flex: 1},
    ],
});
