Ext.define('GSmartApp.view.main.POrderList', {
    extend: 'Ext.grid.Panel',
    xtype: 'porderlist',
    reference: 'porderlist',
    requires: [
        'Ext.grid.column.Widget',
        'Ext.ProgressBarWidget',
        'GSmartApp.store.POrder'
    ],
    controller: 'porderlist',
    title: 'Lệnh sản xuất',

    store: {
        type: 'porderungranted'
    },
    // selModel: {
    //     type: 'rowmodel',
    //     checkboxSelect: true,
    //     pruneRemoved: true,
    //     extensible: 'y'
    // },

    // Enable CTRL+C/X/V hot-keys to copy/cut/paste to the system clipboard.
    // plugins: {
    //     clipboard: true,
    //     selectionreplicator: true
    // },    
    // tools: [{
    //     type: 'refresh',
    //     handler: 'onOrderListRefresh',
    //     tooltip: 'Reload Data'
    // }],
    columns: [
        {xtype: 'checkcolumn', header: 'Chọn', dataIndex: 'isselected', width: 50,
        editor: {xtype: 'checkbox',cls: 'x-grid-checkheader-editor'}
        },            
        { text: 'Mã SX', dataIndex: 'ordercode', width: 70,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'porderFilterField',
            width: 65,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPOrderFilterKeyup',
                buffer: 500
            }
        }    
    },
        { text: 'Lịch lên hàng', dataIndex: 'golivedate', width: 80, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
        { text: 'Ngày giao sx', dataIndex: 'orderdate', width: 80, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
        { text: 'Mùa', dataIndex: 'season', width: 100 },
        { text: 'Bộ sưu tập', dataIndex: 'collection', width: 180 },
        { text: 'Năm SX', dataIndex: 'productionyear', width: 60 },
        {
            text: 'Cân đối nguyên phụ liệu',
            xtype: 'widgetcolumn',
            flex: 1,
            widget: {
                bind: '{record.balance_rate}',
                xtype: 'progressbarwidget',
                textTpl: [
                    '{percent:number("0")}% xong'
                ]
            }
        }
    ],
    fbar: [{
        minWidth: 80,
        text: 'Chọn',
        handler: 'onSelectButton'
    }, {
        minWidth: 80,
        text: 'Đóng',
        handler: 'onCloseButton'
    }]
/*     listeners: {
        select: 'onItemSelected'
    } */
});
