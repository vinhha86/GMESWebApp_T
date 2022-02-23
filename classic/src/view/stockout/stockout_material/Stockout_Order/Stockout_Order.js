Ext.define('GSmartApp.view.stockout.Stockout_Order', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_Order',
    id: 'Stockout_Order',
    reference: 'Stockout_Order',
    requires: [
        'GSmartApp.store.Stockout',
        'Ext.Number',
        'Ext.Date'
    ],
    layout: 'fit',
    //frame: true,
    scrollable: true,
    bind: {
        store: '{Stockout_order_Store}'
    },
    features: [
        {
            ftype: 'summary',
            dock: 'bottom'
        }
    ],
    columnLines: true,
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false
    },
    columns: [
        {
            xtype: 'actioncolumn',
            width: 28,
            menuDisabled: true,
            sortable: false,
            align: 'center',
            items: [
                {
                    iconCls: 'x-fa fas fa-bars violetIcon',
                    handler: 'onMenu_StockoutOrderList'
                },            
            ]
        },
        {
            text: 'STT',
            width: 40,
            xtype: 'rownumberer',
            align: 'center'
        },
        { 
            header: 'Mã SP', dataIndex: 'porder_product_buyercode', flex: 1, 
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                // fieldStyle: "",
                // reference: 'invoice_numberFilter',
                width: '98%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onPorder_product_buyercodeFilterKeyup',
                    buffer: 500
                },
                bind:{
                    value: '{porder_product_buyercodeFilterValue}',
                },
            },
            summaryType: 'count',
            summaryRenderer: 'renderSum'
        },
        { 
            header: 'Lệnh SX', dataIndex: 'porder_code', flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                // fieldStyle: "",
                // reference: 'porder_codeFilter',
                width: '98%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onPorder_codeFilterKeyup',
                    buffer: 500
                },
                bind:{
                    value: '{porder_codeFilterValue}',
                },
            },
        },
        { 
            header: 'Số phiếu', dataIndex: 'stockout_order_code', flex: 1, 
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                // fieldStyle: "",
                // reference: 'stockout_order_codeFilter',
                width: '98%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onStockout_order_codeFilterKeyup',
                    buffer: 500
                },
                bind:{
                    value: '{stockout_order_codeFilterValue}',
                },
            },
        },
        { 
            header: 'Loại phiếu', dataIndex: 'typename', width: 140, 
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
        },
        { 
            header: 'Ngày xuất', dataIndex: 'date_xuat_yc', renderer: Ext.util.Format.dateRenderer('d/m/Y'), width: 90,
        },
        { 
            header: 'Nơi xuất', dataIndex: 'org_from_name', width: 150, 
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                // fieldStyle: "",
                // reference: 'stockout_order_codeFilter',
                width: '98%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onOrg_from_nameFilterKeyup',
                    buffer: 500
                },
                bind:{
                    value: '{org_from_nameFilterValue}',
                },
            },
        },
        { 
            header: 'Nơi nhận', dataIndex: 'org_to_name', width: 150, 
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                // fieldStyle: "",
                // reference: 'stockout_order_codeFilter',
                width: '98%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onOrg_to_nameFilterKeyup',
                    buffer: 500
                },
                bind:{
                    value: '{org_to_nameFilterValue}',
                },
            },
        },
        // {
        //     text: 'Trạng thái',
        //     dataIndex: 'statusName',
        //     width: 120,
        //     renderer: function(value, metaData, record, rowIdx, colIdx, store) {
        //         metaData.tdAttr = 'data-qtip="' + value + '"';
        //         return value;
        //     }
        // }
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            // {
            //     tooltip: 'Lập phiếu xuất kho mới',
            //     text: 'Lập phiếu mới',
            //     iconCls: 'x-fa fa-plus',
            //     margin: 3,
            //     itemId: 'btnThemMoi'
            // },
            // {
            //     xtype: 'button',
            //     margin: 3,
            //     text: 'Lập phiếu mới',
            //     iconCls: 'x-fa fa-bars',
            //     menu: [
            //         // {
            //         //     itemId: 'btnXuatTo', // id:11
            //         //     // iconCls: 'fa fa-file-pdf-o greenIcon',
            //         //     text: 'Xuất tổ sản xuất',
            //         //     handler: 'onXuatTo'
            //         // },
            //         {
            //             itemId: 'btnXuatCat', // id:1
            //             // iconCls: 'fa fa-file-pdf-o greenIcon',
            //             text: 'Xuất NPL cho nhà cắt',
            //             handler: 'onXuatCat'
            //         },
            //         {
            //             // itemId: 'btnNhapGiaCong', // id:3
            //             // iconCls: 'fa fa-file-pdf-o greenIcon',
            //             text: 'Xuất gia công',
            //             // handler: 'onNhapMuaMoi'
            //         },
            //         {
            //             // itemId: 'btnNhapToCat', // id:5
            //             // iconCls: 'fa fa-file-pdf-o greenIcon',
            //             text: 'Xuất mẫu',
            //             // handler: 'onNhapMuaMoi'
            //         },
            //         {
            //             // itemId: 'btnNhapMau', // id:4
            //             // iconCls: 'fa fa-file-pdf-o greenIcon',
            //             text: 'Xuất trả nhà cung cấp',
            //             // handler: 'onNhapMuaMoi'
            //         },
            //         {
            //             // itemId: 'btnNhapCungCap', // id:7
            //             // iconCls: 'fa fa-file-pdf-o greenIcon',
            //             text: 'Xuất tiêu huỷ',
            //             // handler: 'onNhapMuaMoi'
            //         },
            //         {
            //             // itemId: 'btnNhapCungCap', // id:2
            //             // iconCls: 'fa fa-file-pdf-o greenIcon',
            //             text: 'Xuất điều chuyển nội bộ (đơn khác)',
            //             // handler: 'onNhapMuaMoi'
            //         },
            //     ],
            //     // bind: {
            //     //     hidden: '{isNhapmoi}'
            //     // }
            // },
            {
                xtype: 'datefield',
                margin: 3,
                fieldLabel: 'Xuất từ ngày:',
                labelWidth: 86,
                width: 215,
                format:'d/m/Y',
                itemId: 'stockoutorderdate_from',
                value: new Date(),  // defaults to today
                // value: Ext.Date.add (new Date(),Ext.Date.DAY,-5),  // defaults to today
            },
            {
                xtype: 'datefield',
                margin: 3,
                fieldLabel: 'đến ngày:',
                labelWidth: 65,
                width: 195,
                format:'d/m/Y',
                itemId: 'stockoutorderdate_to',
                value: new Date(),  // defaults to today
            },
            // {
            //     itemId: 'OrgToStore',
            //     xtype: 'combobox',
            //     emptyText: 'Nơi nhận',
            //     bind: {
            //         store: '{OrgToStore}'
            //     },
            //     queryMode: 'local',
            //     margin: 3,
            //     displayField: 'name',
            //     valueField: 'id'
            // },
            // {
            //     itemId: 'OrgFromStore',
            //     xtype: 'combobox',
            //     emptyText: 'Nơi xuất',
            //     bind: {
            //         store: '{OrgFromStore}'
            //     },
            //     queryMode: 'local',
            //     margin: 1,
            //     width: 180,
            //     displayField: 'name',
            //     valueField: 'id'
            // },
            // {
            //     xtype: 'combobox',
            //     margin: 3,
            //     itemId: 'stockouttypeid',
            //     emptyText: 'Loại xuất kho',
            //     displayField: 'name',
            //     valueField: 'id',
            //     bind: {
            //         store: '{StockoutTypeStore}'
            //     }
            // },
            {
                tooltip: 'Tìm phiếu xuất',
                // text: 'Đồng bộ từ MITI',
                iconCls: 'x-fa fa-search',
                margin: 1,
                handler: 'onOrderSearch'
            }
        ]
    }
    ]
});
