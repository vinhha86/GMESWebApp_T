Ext.define('GSmartApp.view.pcontract.PContractListProductView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractListProductView',
    id:'PContractListProductView',
    controller: 'PContractListProductViewCotroller',
    IdPContract: 0,
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            } 
        },
        gridexporter: true
    },
    bind:{
        store:'{PContractProductStore}'
    },
    reference: 'PContractListProductView',
    columns:[{
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        bind: {
            hidden: '{isWindow}',
        },
        items: [
            // {
            // iconCls: 'x-fa fas fa-edit',
            // tooltip: "Số lượng",
            // handler: 'onEditSoLuong'
            // },
            {
                iconCls: 'x-fa fas fa-trash redIcon',
                itemId: 'btn_XoaSP',
                isActionDisabled: 'checkActionColumnPermission',
                tooltip: 'Hủy',
                handler: 'onXoa',
            }
        ]
    },{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    },
    {
        xtype: 'actioncolumn',
        // text: 'Ảnh',
        width: 30,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [
            {
                iconCls: 'x-fa fas fa-photo greenIcon',
                tooltip: "Ảnh sản phẩm",
                handler: 'viewImg'
            },
        ]
    },    
    // {
    //     text:'Ảnh',
    //     dataIndex:'imgproduct',
    //     width: 45,
    //     textAlign: 'center',
    //     renderer: function(value, meta, record){
    //         return '<img style="width:16px; height:14px" src="data:image/gif;base64,'+ value +'">';
    //     },
    //     listeners:{
    //         click: 'viewImg'
    //     }
    // },
    {
        text:'Mã SP (Buyer)',
        dataIndex:'productBuyerCode',
        width: 120,
        listeners:{
            dblclick: 'viewProductDetail'
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            margin: 1,
            reference: 'ValueFilterFieldMaSP',
            width: '99%',
            enableKeyEvents: true,
            listeners: {
                keyup: 'onFilterValueMaSPKeyup',
                buffer: 500
            }
        }
    },{
        text:'Tên SP (Buyer)',
        dataIndex:'productName',
        width: 200,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            margin: 1,
            reference: 'ValueFilterFieldTenSP',
            width: '99%',
            enableKeyEvents: true,
            listeners: {
                keyup: 'onFilterValueTenSPKeyup',
                buffer: 500
            }
        }
    },{
        text:'Mô tả',
        dataIndex:'productinfo',
        flex: 1
    },
    // {
    //     text:'Ngày SX',
    //     xtype:'datecolumn',
    //     format: 'd/m/Y',
    //     align: 'center',
    //     dataIndex:'production_date',
    //     width: 100,
    //     editor:{
    //         xtype:'datefield'
    //     }
    // },{
    //     text:'Ngày GH',
    //     xtype:'datecolumn',
    //     format: 'd/m/Y',
    //     align: 'center',
    //     dataIndex:'delivery_date',
    //     width: 100,
    //     editor:{
    //         xtype:'datefield'
    //     }
    // },
    // {
    //     text:'EMT',
    //     dataIndex:'emt',
    //     width: 60,
    //     editor:{
    //         xtype:'textfield',
    //         maskRe: /[0-9.]/,
    //         selectOnFocus: true
    //     }
    // },
    // {
    //     text:'SL',
    //     dataIndex:'pquantity',
    //     width: 60,
    //     editor:{
    //         xtype:'textfield',
    //         maskRe: /[0-9.]/,
    //         selectOnFocus: true
    //     }
    // },
    ],
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
        padding: '0 0 10 5',
        height: 35,
        items:[{
            xtype:'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
            labelWidth : 0,
            value: 'Danh sách sản phẩm (Style)'
        },
		'->'
		,
		{
            xtype:'button',
            itemId:'btnAddProduct_PContractListProductView',
            ui: 'header',
            margin: '10 5 0 0',
			tooltip: 'Thêm sản phẩm',
            iconCls: 'x-fa fa-plus',
            bind: {
                hidden: '{ishidden_addproduct}'
            }
        },
        // {
        //     xtype:'button',
        //     itemId:'btnExcel',
        //     ui: 'header',
        //     margin: '10 5 0 0',
		// 	tooltip: 'Export Excel',
        //     iconCls: 'x-fa fa-file-excel'
        // }
        ]
    }]
});

