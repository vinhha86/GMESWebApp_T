Ext.define('GSmartApp.view.dashboard_khotp.Dashboard_KhoTP_POLine_Orgs', {
    extend: 'Ext.grid.Panel',
    xtype: 'Dashboard_KhoTP_POLine_Orgs',
    id: 'Dashboard_KhoTP_POLine_Orgs',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    features: [{
        ftype: 'summary',
        dock: 'top'
    }],
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind: {
        store: '{POLine_Orgs_Store}'
    },
    columns: [
        {
            text: 'Phân xưởng', dataIndex: 'stockout_order_code', flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
        },  
        {
            text: 'Ghi chú', dataIndex: 'extrainfo', flex: 1,
        },   
        {
            text: 'SL SX',
            align: 'right',
            dataIndex: 'po_quantity_sp',
            width: 90,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
            },
            summaryType: 'sum',
			summaryRenderer: 'renderSum',
        },   
    ],
});

