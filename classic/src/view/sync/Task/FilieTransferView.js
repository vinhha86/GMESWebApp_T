Ext.define('GSmartApp.view.sync.Task.FilieTransferView', {
    extend: 'Ext.grid.Panel',
    xtype: 'FilieTransferView',
    id: 'FilieTransferView',
    controller: 'FilieTransferViewController',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{FileTransferStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Tên file',
        dataIndex: 'name',
        flex: 1
    },
    {
        text: 'Bắt đầu',
        dataIndex: 'started_at',
        width: 120,
        renderer: Ext.util.Format.dateRenderer('d/m/y H:i:s')
    },
    {
        text: 'Kết thúc',
        dataIndex: 'completed_at',
        width: 120,
        renderer: Ext.util.Format.dateRenderer('d/m/y H:i:s')
    },
    {
        text: 'Hoàn thành',
        width: 100,
        xtype: 'widgetcolumn',
        widget: {
            xtype: 'progressbarwidget',
            bind: '{record.percent}',
            textTpl: [
                '{percent:number("0")} %'
            ]
        }
    }
    ]
});

