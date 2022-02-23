Ext.define('GSmartApp.view.cutting.CutOrderWaiting', {
    extend: 'Ext.grid.Panel',
    xtype: 'cutorderwaiting',
    reference: 'cutorderwaiting',
    requires: [
        'Ext.Number',
        'Ext.Date'
    ],
    title: 'Lệnh chờ vào chuyền',    
    store: {
        type: 'porderwaiting'
    },
    columnLines: true,
    //multiSelect: true,
    selModel: 'rowmodel',
    viewConfig: {
        //enableTextSelection: true,
        stripeRows: false,
        plugins: {
            ptype: 'gridviewdragdrop',
            dragText: '{0} Xuất cắt',
            dragGroup: 'secondGridDDGroup',
            dropGroup: 'firstGridDDGroup'
        },
        listeners: {
            //drop: 'onDrop',
            //beforedrop: 'onBeforeDrop'
        }        
     },
    columns: [
        { header: 'Mã SX', locked: false, dataIndex: 'ordercode', width: 70,
            // editor: {xtype: 'textfield', readOnly: true},
            // items: {
            //     xtype: 'textfield',
            //     fieldStyle: "",
            //     reference: 'porderFilterField_Salary',
            //     width: 65,
            //     margin: 2,
            //     enableKeyEvents: true,
            //     listeners: {
            //         keyup: 'onPOrderFilterKeyup',
            //         buffer: 500
            //     }
            // },
            renderer: function (value, metaData, record, rowIndex) {
                var c = record.get('status');
                if (c == 1) {
                    metaData.tdCls = 'process-granted';
                } else if (c == 2) {
                    metaData.tdCls =  'process-ready';
                } else if (c == 3) {
                    metaData.tdCls =  'process-running';
                } else if (c == 4) {
                    metaData.tdCls =  'process-done';
                } else if (c == 5) {
                    metaData.tdCls =  'process-finish';
                } else if (c == 6) {
                    metaData.tdCls =  'process-subprocess';
                } else if (c == 0) {
                    metaData.tdCls =  'process-free';
                }              
                //metaData.tdCls = record.get('change') > 0 ? 'color-other' : 'color-gio';
                // if (null != record.get('productiondate')){
                //     metaData.tdAttr = 'data-qtip="' + Ext.util.Format.date(record.get('productiondate'),'d/m/Y') + '"';
                // }
                return value;
            }                  
        },
        { header: 'Tổ SX', dataIndex: 'granttoorgid_link', width: 70},
        { header: 'Ngày vào chuyền', dataIndex: 'productiondate_str', flex: 1},
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                xtype: 'textfield',
                margin: '0 0 0 5',
                name: 'txtorderwaiting_ordercode',
                reference:'txtorderwaiting_ordercode',
                fieldLabel: 'Mã SX:',
                width: 150,
                labelWidth: 45,
                hideLabel: false,
                //emptyText: 'Mã SX'
            },
            {
                tooltip: 'Tìm Lệnh SX',
                margin: '0 0 0 5',
                //text: 'Thêm thẻ vải',
                iconCls: 'x-fa fa-search',
                weight: 30,
                handler: 'onSearchOrderTap'
            },               
            {
                tooltip: 'Tìm kiếm lệnh',
                margin: '0 0 0 5',
                iconCls: 'x-fa fa-refresh',
                weight: 30,
                handler: 'onOrderWaitingRefreshTap'
            }
    ]
    }]
});
