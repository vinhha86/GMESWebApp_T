Ext.define('GSmartApp.view.pcontract.PContract_PO.Price.PriceDSKU.PContract_PO_Edit_Price_D_SKU', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_PO_Edit_Price_D_SKU',
    id: 'PContract_PO_Edit_Price_D_SKU',
    controller: 'PContract_PO_Edit_Price_D_SKUController',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onPriceDSKUItemEdit',
                beforeedit: 'onPriceDSKUItemBeforeEdit'
            }             
        }
    },
    bind:{
        store:'{Price_D_SKUStore}'
    },
    columns:[{
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        bind:{
            hidden: '{ishiddenActionColumn}'
        },
        items: [
            {
                iconCls: 'x-fa fas fa-trash',
                tooltip: 'Xoá chi tiết giá SKU',
                handler: 'onPriceDSKU_Delete'
            },
        ],
        // items: [
        //     {
        //         iconCls: 'x-fa fas fa-bars violetIcon',
        //         handler: 'onMenu_PriceDSKUList'
        //     },            
        // ]
    },{
        text:'Mã NPL',
        dataIndex:'materialCode',
        // width: 100,
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text:'Màu',
        dataIndex:'color_name',
        // width: 100,
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text:'Size',
        dataIndex:'size_name',
        // width: 100,
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text:'SL',
        align: 'end',
        dataIndex:'amount',
        width: 80,
        editor:{
            xtype:'textfield',
            maskRe: /[0-9]/,
            selectOnFocus: true
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            if(value ==0) return "";
            metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000') + '"';
            return Ext.util.Format.number(value, '0,000')
        }
    },{
        text:'Đơn giá',
        align: 'end',
        dataIndex:'unitprice',
        width: 80,
        editor:{
            xtype:'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            if(value ==0) return "";
            metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.000') + '"';
            return Ext.util.Format.number(value, '0,000.000')
        }
    },{
        text:'Thành tiền',
        align: 'end',
        dataIndex:'totalprice',
        width: 80,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            if(value ==0) return "";
            metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.000') + '"';
            return Ext.util.Format.number(value, '0,000.000')
        }
    }],
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
        padding: '0 0 10 5',
        height: 40,
        items:[{
            xtype:'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
            labelWidth : 0,
            value: 'Chi tiết giá theo màu, cỡ khổ nguyên phụ liệu'
        },
		'->'
        ,
		{
            xtype:'button',
            width: 20,
            itemId:'btnThemMoiGiaSKU',
            ui: 'header',
            margin: '5 5 0 0',
			tooltip: 'Thêm chi tiết giá SKU',
            iconCls: 'x-fa fa-plus'
        },  
        ]
    }]
});

