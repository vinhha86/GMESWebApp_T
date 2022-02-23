Ext.define('GSmartApp.view.product.ProductMaterialView', {
    extend: 'Ext.grid.Panel',
    xtype: 'ProductMaterialView',
    id: 'ProductMaterialView',
    controller: 'ProductMaterialViewController',
    IdProduct: 0,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    features: [{
        ftype:'grouping',
        groupHeaderTpl: '{name}'
    }],
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        checkOnly: true
    },
    bind: {
        store: '{productStore}',
        title: '{title}'
    },
    columns: [{
        text: "Ảnh",
        dataIndex: 'urlimage',
        width: 50,
        textAlign: 'center',
        renderer: function(value, meta, record){
            return '<img style="width:25px; height:25px" src="data:image/gif;base64,'+ value +'">';
        }
    },{
        text: 'Tên NPL',
        dataIndex: 'name',
        width: 150
    }, {
        text: 'IDCode',
        dataIndex: 'code',
        width: 70
    }, {
        text: 'Màu NPL',
        dataIndex: 'tenMauNPL',
        width: 100
    }, {
        text: 'Cỡ khổ',
        dataIndex: 'coKho',
        width: 100
    }],
    dockedItems:[{
        dock:'right',
        border:false,
        layout:'vbox',
        items:[{
            flex:1,
            border: false
        },{
            xtype:'button',
            text:'->',
            margin: 3,
            itemId:'btnChon',
            tooltip:'Chọn NPL để thêm vào định mức sản phẩm'
        },{
            flex:1,
            border: false
        }]
    }]
});

