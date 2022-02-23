Ext.define('GSmartApp.view.personnelmapping.PersonnelMapping_Personnel', {
    extend: 'Ext.grid.Panel',
    xtype: 'PersonnelMapping_Personnel',
    id: 'PersonnelMapping_Personnel',
    reference: 'PersonnelMapping_Personnel',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true,
        plugins: {
            ptype: 'gridviewdragdrop',
            enableDrag: false,
            //dragText: '{0} Mã sản xuất được tính lương',
            // dragGroup: 'PersonnelGroup',
            dropGroup: 'PersonnelNotmapGroup'
        },
        listeners: {
            // drop: 'onDropOrg',
            beforedrop: 'onBeforePersonnelNotmapGroupDrop'
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
    },{
        text: 'Mã nhân viên',
        dataIndex: 'code',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text: 'Họ và tên',
        dataIndex: 'fullname',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }],
});

