Ext.define('GSmartApp.view.product.ProductAttributeView', {
    extend: 'Ext.grid.Panel',
    xtype: 'ProductAttributeView',
    id:'ProductAttributeView',
    controller: 'ProductAttributeViewCotroller',
    IdProduct: 0,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind:{
        store:'{ProductAttributeValueStore}'
    },
    columns:[{
        xtype: 'actioncolumn',
        width: 50,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            iconCls: 'x-fa fas fa-plus',
            tooltip: 'Thêm giá trị',
            handler: 'onAddValue'
        },{
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    },{
        text: 'STT',
        width: 45,
        xtype: 'rownumberer',
        align: 'center'
    },{
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
    },{
        xtype: 'checkcolumn',
        dataIndex : 'is_select',
        text: 'Xem',
        width: 50,
        listeners: {
            checkchange: 'onCheckAttribute'
        }
    }],
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
		//bodypadding: 5,
        border: true,
        height: 45,
        style:"background-color : white",
        items:[{
            xtype:'displayfield',
			flex: 1,
            fieldStyle: "font-weight: bold; font-size: 14px; color: black",
            labelWidth : 0,
            value: 'Thuộc tính sản phẩm'
        },
		'->'
		,
		{
            xtype:'button',
            itemId:'btnThemMoi',
			ui: 'header',
            margin: '10 5 0 0',
			tooltip: 'Thêm thuộc tính',
            iconCls: 'x-fa fa-plus'
        }]
    }]
});

