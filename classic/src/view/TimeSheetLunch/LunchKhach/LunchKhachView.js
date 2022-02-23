Ext.define('GSmartApp.view.TimeSheetLunch.LunchKhachView', {
    extend: 'Ext.grid.Panel',
    xtype: 'LunchKhachView',
    id: 'LunchKhachView',
    controller: 'LunchKhachViewController',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    features: [{
        ftype: 'summary',
        dock: 'top'
    }],
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            }
        }
    },
    bind: {
        store: '{TimeSheetLunchKhachStore}'
    },
    enableColumnMove: false,
    reserveScrollbar: true,
    columns: [{
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Ca ăn',
        dataIndex: 'shifttype_name',
        flex: 1,
        summaryRenderer: function (value, summaryData, dataIndex) {
            return '<div style="color:black; font-weight: bold; align: right">' + 'Tổng: </div>';
        }
    }, {
        text: 'Số lượng',
        dataIndex: 'amount',
        width: 100,
        align: 'right',
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                maskRe: /[0-9]/
            }
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            return Ext.util.Format.number(value, '0,000');
        },
        summaryType: 'sum',
        summaryRenderer: function (value, summaryData, dataIndex) {
            return '<div style="color:black; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000'); + '</div>';
        }
    }
    ]
});

