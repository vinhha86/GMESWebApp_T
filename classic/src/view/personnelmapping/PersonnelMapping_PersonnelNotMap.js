Ext.define('GSmartApp.view.personnelmapping.PersonnelMapping_PersonnelNotMap', {
    extend: 'Ext.grid.Panel',
    xtype: 'PersonnelMapping_PersonnelNotMap',
    id:'PersonnelMapping_PersonnelNotMap',
    reference: 'PersonnelMapping_PersonnelNotMap',
    viewConfig: {
        stripeRows: false,
        // enableTextSelection: true,
        columnLines: true,
        rowLines: true,
        plugins:{
            ptype: 'gridviewdragdrop',
            enableDrag: true,
            //dragText: '{0} Mã sản xuất được tính lương',
            dragGroup: 'PersonnelNotmapGroup',
            // dropGroup: 'PersonnelGroup'
        },
        listeners: {
            // drop: 'onDropOrg',
            // beforedrop: 'onBeforePersonnelGroupDrop'
        }
    },
    bind:{
        store:'{Personnel_Notmap_Store}'
    },
    columns:[{
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    },{
        text:'Mã đăng ký',
        dataIndex:'register_code',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text:'Tên đăng ký',
        dataIndex:'register_name',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }],
});

