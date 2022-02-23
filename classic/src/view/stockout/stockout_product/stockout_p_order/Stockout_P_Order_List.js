Ext.define('GSmartApp.view.stockout_product.stockout_p_order.Stockout_P_Order_List', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_P_Order_List',
    id: 'Stockout_P_Order_List',
    reference: 'Stockout_P_Order_List',
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind:{
        store: '{Stockout_P_Order_Store}'
    },
    features: [
        {
            ftype: 'summary',
            dock: 'top'
        }
    ],
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
                    handler: 'onMenu_StockoutPOrderList'
                },            
            ]
        },
        // {
        //     text: 'Buyer', dataIndex: 'buyername', width: 90
        // },
        // {
        //     text: 'Vendor', dataIndex: 'vendorname', width: 120,
        // },
        {
            text: 'PO Buyer', dataIndex: 'po_buyer', width: 120
        },
        {
            text: 'Mã SP (Buyer)', dataIndex: 'productbuyercode', width: 120,
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
                    keyup: 'onProductStringFilterKeyup',
                    buffer: 500
                },
                bind:{
                    value: '{productStringFilterValue_order}',
                },
            },
        },  
        {
            text: 'SL theo PO',
            align: 'right',
            dataIndex: 'po_quantity',
            width: 80,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
            },
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
        }, 
        {
            text: 'ĐVT',
            dataIndex: 'totalpair',
            width: 100,
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                return value == 1 ? "Chiếc" : "Bộ (" + value + ")";
            }
        }, 
        {
            text: 'SL Y/C xuất',
            align: 'right',
            dataIndex: 'po_quantity_sp',
            width: 80,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
            },
            summaryType: 'sum',
			summaryRenderer: 'renderSum',
        }, 
        {
            text: 'Ngày lập lệnh',
            dataIndex: 'orderdate',
            renderer: Ext.util.Format.dateRenderer('d/m/y'),
            width: 80
        },
        {
            text: 'Ngày Y/C xuất',
            dataIndex: 'stockoutdate',
            renderer: Ext.util.Format.dateRenderer('d/m/y'),
            width: 80
        },
        {
            text: 'Nơi giao', dataIndex: 'org_from_name', flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            // items: {
            //     xtype: 'textfield',
            //     // fieldStyle: "",
            //     // reference: 'invoice_numberFilter',
            //     width: '98%',
            //     flex: 1,
            //     margin: 2,
            //     enableKeyEvents: true,
            //     listeners: {
            //         keyup: 'onOrgFromFilterKeyup',
            //         buffer: 500
            //     },
            //     bind:{
            //         value: '{orgFromFilterValue_order}',
            //     },
            // },
        },    
        {
            text: 'Nơi nhận', dataIndex: 'org_to_name', flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            // items: {
            //     xtype: 'textfield',
            //     // fieldStyle: "",
            //     // reference: 'invoice_numberFilter',
            //     width: '98%',
            //     flex: 1,
            //     margin: 2,
            //     enableKeyEvents: true,
            //     listeners: {
            //         keyup: 'onOrgToFilterKeyup',
            //         buffer: 500
            //     },
            //     bind:{
            //         value: '{orgToFilterValue_order}',
            //     },
            // },
        }
    ],
	dockedItems: [{
		dock: 'top',
		layout: 'hbox',
		items: [{
			xtype:'datefield',
			labelWidth: 0,
			emptyText: 'Từ ngày',
			itemId: 'stockoutorderdate_from',
			editable: false,
			margin: '5 5 5 5',
			value: new Date(),
			width: 110,
            format:'d/m/y'
		},{
			xtype:'datefield',
			labelWidth: 0,
			emptyText: 'Đến ngày',
			itemId: 'stockoutorderdate_to',
			editable: false,
			margin: '5 5 5 0',
			width: 110,
			value: new Date(),
            format:'d/m/y'
		},
		{
            xtype: 'button',
            margin: 5,
            iconCls: 'x-fa fa-search',
            itemId: 'btnTimKiem'
        }]
	}]
 
});

