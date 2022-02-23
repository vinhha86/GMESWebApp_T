Ext.define('GSmartApp.view.pcontract.PContract_PO_Shipping_D', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_PO_Shipping_D',
    id:'PContract_PO_Shipping_D',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            // listeners: {
            //     edit: 'onEdit'
            // } 
        }
    },
    features: [{
        ftype:'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind:{
        store:'{Shipping_DStore}'
    },
    columns:[
        { header: 'SKU', dataIndex: 'skucode', flex: 1},
        { header: 'Màu', dataIndex: 'mauSanPham', width: 90},
        { header: 'Cỡ', dataIndex: 'coSanPham', width: 70},  
        { header: 'Số lượng', dataIndex: 'amount', width: 80,
            align: 'end',
            summaryType: 'sum', 
            summaryRenderer: 'renderSum',
            editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, maxValue: 100000, selectOnFocus: false},
        },
        {
            xtype: 'actioncolumn',
            width: 20,
            menuDisabled: true,
            sortable: false,
            items: [{
                iconCls: 'x-fa fas fa-trash',
                tooltip: 'Xóa',
                handler: 'onXoaSKU'
            }]
        }
    ],
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
        padding: '0 0 10 5',
        height: 35,
        items:[{
            xtype:'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black",
            labelWidth : 0,
            bind:{
                value: 'Danh sách hàng giao'
            }
        },
		'->'
		,
	    {
            xtype:'button',
            itemId:'btnThemSKU',
            ui: 'header',
			tooltip: 'Thêm SKU',
            iconCls: 'x-fa fa-plus',
            handler: 'onAddSKUTap',
        },
        ]
    }]
});

