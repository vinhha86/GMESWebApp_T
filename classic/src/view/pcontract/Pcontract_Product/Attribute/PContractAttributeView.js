Ext.define('GSmartApp.view.pcontract.PContractAttributeView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractAttributeView',
    id:'PContractAttributeView',
    controller: 'PContractAttributeViewCotroller',
    IdPcontract: 0,
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
    bind:{
        store:'{PContractAttValueStore}'
    },
    columns:[{
        text:'Tên thuộc tính',
        dataIndex:'attributeName',
        width: 150,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text:'Giá trị',
        dataIndex:'attributeValueName',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    // {
    //     xtype: 'actioncolumn',
    //     width: 50,
    //     menuDisabled: true,
    //     sortable: false,
    //     items: [{
    //         iconCls: 'x-fa fas fa-plus',
    //         tooltip: "Thêm mới giá trị",
    //         handler: 'onAddValue'
    //     },{
    //         iconCls: 'x-fa fas fa-trash',
    //         tooltip: "Xóa thuộc tính",
    //         handler: 'onXoaAtt'
    //     }]
    // }
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
            value: 'Thuộc tính sản phẩm'
        },
		'->'
		,
		// {
        //     xtype:'button',
        //     itemId:'btnAttr_PContractAttributeView',
        //     ui: 'header',
        //     margin: '10 5 0 0',
		// 	tooltip: 'Thêm sản phẩm',
        //     iconCls: 'x-fa fa-plus'
        // }
    ]
    }]
});

