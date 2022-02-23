Ext.define('GSmartApp.view.pprocess.Productivity_Personnel', {
    extend: 'Ext.grid.Panel',
    xtype: 'Productivity_Personnel',
    id: 'Productivity_Personnel',
    // controller: 'Personnel_ListView_Controller',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{Personnel_Store}'
    },
    columns: [{
        text: 'STT',
        width: 40,
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
    }]
});

