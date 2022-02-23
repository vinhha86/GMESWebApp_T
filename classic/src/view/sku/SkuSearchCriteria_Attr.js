Ext.define('GSmartApp.view.sku.SkuSearchCriteria_Attr', {
    extend: 'Ext.grid.Panel',
    xtype: 'SkuSearchCriteria_Attr',
    id:'SkuSearchCriteria_Attr',
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
        store:'{SkuAtributesStore}'
    },
    columns:[{
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    },{
        text:'Tên thuộc tính',
        dataIndex:'name',
        width: 120,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text:'Giá trị',
        dataIndex:'description',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        xtype: 'actioncolumn',
        width: 50,
        menuDisabled: true,
        sortable: false,
        bind:{
            hidden: '{isHiddenSkuSearchCriteria_Attr_actioncolumn}'
        },
        items: [{
            iconCls: 'x-fa fas fa-plus',
            tooltip: 'Thêm giá trị',
            handler: 'onAddValue'
        },{
            iconCls: 'x-fa fas fa-trash',
            tooltip: 'Xóa thuộc tính',
            handler: 'onXoa'
        }]
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
			width: '80%',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black",
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
            iconCls: 'x-fa fa-plus',
            bind:{
                hidden: '{isHiddenSkuSearchCriteria_Attr_btnThemMoi}'
            }
        }]
    }]
});

