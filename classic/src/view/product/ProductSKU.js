Ext.define('GSmartApp.view.product.ProductSKU', {
    extend: 'Ext.grid.Panel',
    xtype: 'ProductSKU',
    id:'ProductSKU',
    controller: 'ProductSKUViewCotroller',
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1
        }
    },
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },    
    bind:{
        store:'{SKUStore}'
    },
    columns:[{
        text: 'STT',
        width: 45,
        xtype: 'rownumberer',
        align: 'center'
    },{
        text:'SKU',
        dataIndex:'code',
        width: 90,
        getEditor: function (record) {
            return Ext.create('Ext.grid.CellEditor', {
                field: {
                    xtype: 'textfield',
                    allowBlank: false,
                    blankText: 'Không được để trống',
                    itemId:'txtsku'
                }
            })
        },
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text:'Mã vendor',
        dataIndex:'partnercode',
        width: 90,
        getEditor: function (record) {
            return Ext.create('Ext.grid.CellEditor', {
                field: {
                    xtype: 'textfield',
                    allowBlank: false,
                    blankText: 'Không được để trống',
                    itemId:'txtpartnercode'
                }
            })
        },
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text:'Mã vạch',
        dataIndex:'barcode',
        flex: 1,
        getEditor: function (record) {
            return Ext.create('Ext.grid.CellEditor', {
                field: {
                    xtype: 'textfield',
                    allowBlank: false,
                    blankText: 'Không được để trống',
                    itemId:'txtbarcode'
                }
            })
        },
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text:'Màu',
        dataIndex:'color_name',
        width: 100,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text:'Cỡ',
        dataIndex:'size_name',
        width: 80
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
            value: 'Phân loại sản phẩm theo mầu, cỡ'
        }
		]
    }]	
});

