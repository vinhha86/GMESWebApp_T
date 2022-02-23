Ext.define('GSmartApp.view.pcontract.PContractMainView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractMainView',
    id: 'PContractMainView',
    requires: [
        'Ext.ProgressBarWidget'
    ],
    controller: 'PContractMainViewController',
    reference: 'PContractMainView',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{PContractStore}'
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [
            {
                iconCls: 'x-fa fas fa-bars violetIcon',
                handler: 'onMenu_ContractList'
            },
        ]
    }, {
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã đơn hàng',
        dataIndex: 'contractcode',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'contractcodeFilterField',
            width: '99%',
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onContractCodeFilterKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Buyer',
        dataIndex: 'buyername',
        width: 150,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Vendor',
        dataIndex: 'vendorname',
        width: 150,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Số hợp đồng',
        dataIndex: 'contractBuyerCode',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Năm HĐ',
        dataIndex: 'contractBuyerYear',
        width: 75,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Loại hình',
        dataIndex: 'contractTypeName',
        width: 80,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Thị trường',
        dataIndex: 'marketTypeName',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    // {
    //     text: 'PO Buyer',
    //     dataIndex: 'polist',
    //     flex: 1,
    //     renderer: function(value, metaData, record, rowIdx, colIdx, store) {
    //         metaData.tdAttr = 'data-qtip="' + value + '"';
    //         return value;
    //     }
    // },    
    {
        text: 'Ngày lập',
        dataIndex: 'datecreated',
        width: 75,
        renderer: Ext.util.Format.dateRenderer('d/m/y')
    },
    {
        text: 'Người lập',
        dataIndex: 'usercreatedName',
        width: 120,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
        // {
        //     text: 'Trạng thái',
        //     dataIndex: 'status',
        //     width: 90
        // },   
        // {
        //     text: 'Tỷ lệ hoàn thành',
        //     xtype: 'widgetcolumn',
        //     flex: 1,
        //     widget: {
        //         bind: '{record.complete_rate}',
        //         xtype: 'progressbarwidget',
        //         textTpl: [
        //             '{percent:number("0")}%'
        //         ]
        //     }
        // }, 
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        border: false,
        items: [{
            xtype: 'button',
            margin: '5 1 5 1',
            text: 'Thêm đơn hàng',
            width: 135,
            iconCls: 'x-fa fa-plus',
            itemId: 'btnThemMoi_PContractMainView'
        }, {
            xtype: 'textfield',
            labelWidth: 0,
            margin: '5 1 5 0',
            emptyText: "Mã SP(Buyer)",
            itemId: 'productbuyer_code',
            width: 120,
            bind: {
                value: '{value.productbuyer_code}'
            },
			enableKeyEvents : true,
        }, {
            xtype: 'textfield',
            labelWidth: 0,
            margin: '5 1 5 0',
            emptyText: "PO Buyer",
            itemId: 'po_code',
            width: 120,
            width: 120,
            bind: {
                value: '{value.po_code}'
            },
			enableKeyEvents : true,
        }, 
        {
            xtype: 'combo',
            labelWidth: 0,
            emptyText: 'Buyer',
            bind: {
                store: '{EndBuyer}',
                value: '{value.orgbuyerid_link}'
            },
            valueField: 'id',
            displayField: 'code',
            queryMode: 'local',
            anyMatch: true,
            itemId: 'orgbuyerid_link',
            margin: '5 1 5 0',
			enableKeyEvents : true,
        },
        {
            xtype: 'combo',
            labelWidth: 0,
            emptyText: 'Vendor',
            bind: {
                store: '{Vendor}',
                value: '{value.orgvendorid_link}'
            },
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            anyMatch: true,
            itemId: 'orgvendorid_link',
            margin: '5 1 5 0',
			enableKeyEvents : true,
        }, {
            xtype: 'textfield',
            labelWidth: 0,
            margin: '5 1 5 0',
            emptyText: "Số HĐ",
            itemId: 'contractbuyer_code',
            width: 120,
            bind: {
                value: '{value.contractbuyer_code}'
            },
			enableKeyEvents : true,
        }, {
            xtype: 'textfield',
            labelWidth: 0,
            margin: '5 1 5 0',
            emptyText: "Từ năm",
            maskRe: /[0-9]/,
            maxLength: 4,
            itemId: 'contractbuyer_yearfrom',
            width: 65,
            bind: {
                value: '{value.contractbuyer_yearfrom}'
            },
			enableKeyEvents : true,
        }, {
            xtype: 'textfield',
            labelWidth: 0,
            margin: '5 1 5 0',
            emptyText: "Đến năm",
            maskRe: /[0-9]/,
            maxLength: 4,
            itemId: 'contractbuyer_yearto',
            width: 65,
            bind: {
                value: '{value.contractbuyer_yearto}'
            },
			enableKeyEvents : true,
        },
        {
            xtype: 'button',
            margin: '5 1 5 1',
            // text: 'Tìm kiếm',
            iconCls: 'x-fa fa-search',
            itemId: 'btnTimKiem'
        }]
    },
    ]
});

