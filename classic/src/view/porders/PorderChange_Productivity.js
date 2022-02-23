Ext.define('GSmartApp.view.porders.PorderChange_Productivity', {
    extend: 'Ext.grid.Panel',
    xtype: 'PorderChange_Productivity',
    id: 'PorderChange_Productivity',
    requires: [
        'Ext.Number',
        'Ext.Date'
    ],
    bind:{
        store:'{POrder_Change_Store}'
    },
    columnLines: true,
    //multiSelect: true,
    selModel: 'rowmodel',
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '<b>{name}</b>',
        hideGroupedHeader: false,
        enableGroupingMenu: false
    },{
        ftype: 'summary',
        dock: 'bottom'
    }], 
    viewConfig: {
        stripeRows: false      
     },
    columns: [
        // {
        //     xtype: 'actioncolumn',
        //     width: 28,
        //     menuDisabled: true,
        //     sortable: false,
        //     align: 'center',
        //     items: [
        //         {
        //             iconCls: 'x-fa fas fa-bars violetIcon',
        //             handler: 'onMenuPorderReqList'
        //         },            
        //     ]
        // },
        { header: 'Số PO', dataIndex: 'po_buyer', flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            // reference: 'poBuyerFilterField',
            width: '99%',
            margin: 1,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPoBuyerFilterKeyup',
                buffer: 500
            }
        },
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }},
        { header: 'Mã SP (Buyer)', dataIndex: 'productcode', width: 100,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                // reference: 'codeFilterField',
                width: '99%',
                margin: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onCodeFilterKeyup',
                    buffer: 500
                }
            },
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            summaryType: 'count',
            summaryRenderer: function (value, summaryData, dataIndex) {
                return '<div style="color:black; font-weight: bold; align: right">'+'Tổng: ' + value+'</div>';
            }
        },

        { header: 'Buyer', dataIndex: 'buyername', width: 75,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                // reference: 'unGrantedReqBuyernameFilterField',
                width: '99%',
                margin: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onUnGrantedReqBuyernameFilterKeyup',
                    buffer: 500
                }
            },
        },
        { header: 'Vendor', dataIndex: 'vendorname', width: 75,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                // reference: 'unGrantedReqVendornameFilterField',
                width: '99%',
                margin: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onUnGrantedReqVendornameFilterKeyup',
                    buffer: 500
                }
            },
        },

        { header: 'Vào chuyền', headerWrap: true, dataIndex: 'start_date_plan', 
            // renderer: Ext.util.Format.dateRenderer('d/m/y'),
            renderer: function(value){
                var date = Ext.Date.parse(value, 'c');
                return Ext.Date.format(date, 'd/m/y');
            },
            width: 70
        },
        { header: 'Giao hàng', headerWrap: true, dataIndex: 'finish_date_plan', 
            // renderer: Ext.util.Format.dateRenderer('d/m/y'),
            renderer: function(value){
                var date = Ext.Date.parse(value, 'c');
                return Ext.Date.format(date, 'd/m/y');
            },
            width: 67
        },
        { header: 'Lý do', headerWrap: true, dataIndex: 'reason_change', 
           flex: 1,
           renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
        },
        { header: 'SL', dataIndex: 'grantamount', width: 60,  xtype: 'numbercolumn', format: '0,000', align: 'right',
            summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return '<div style="color:black; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000')+'</div>';
            }
        },
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                tooltip: 'Làm mới danh sách',
                iconCls: 'x-fa fa-refresh',
                weight: 30,
                handler: 'onSearchGrantChange'
            },
            {
                tooltip: 'Ẩn danh sách',
                iconCls: 'x-fa fa-eye',
                weight: 30,
                handler: 'onHiddenListReq'
            }
    ]
    }]
});
