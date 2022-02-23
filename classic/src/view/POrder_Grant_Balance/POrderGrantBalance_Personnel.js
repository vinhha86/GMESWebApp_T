Ext.define('GSmartApp.view.POrder_Grant_Balance.POrderGrantBalance_Personnel', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrderGrantBalance_Personnel',
    id: 'POrderGrantBalance_Personnel',
    reference: 'POrderGrantBalance_Personnel',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true,
        plugins: {
            ptype: 'gridviewdragdrop',
            enableDrag: true,
            //dragText: '{0} Mã sản xuất được tính lương',
            dragGroup: 'PersonnelGroup',
            dropGroup: 'WorkingProcessGroup'
        },
        listeners: {
            // drop: 'onDropOrg',
            beforedrop: 'onBeforeWorkingProcessGroupDrop'
        }
    },
    bind: {
        store: '{Personnel_Store}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Họ và tên',
        dataIndex: 'fullname',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Bậc thợ',
        dataIndex: 'laborlevel_name',
        renderer: function(value, metaData, record, rowIdx, colIdx, store){
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        flex: 1,
        align: 'end'
    }],
});

