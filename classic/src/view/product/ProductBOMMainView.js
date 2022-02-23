Ext.define('GSmartApp.view.product.ProductBOMMainView', {
    extend: 'Ext.form.Panel',
    xtype: 'ProductBOMMainView',
    id:'ProductBOMMainView',
    IdProduct: 0,
    controller: 'ProductBOMMainViewController',
    viewModel:{
        type:'ProductBOMMainViewModel'
    },
    layout: 'border',
    height: 700,
    items: [{
        region: 'center',
        xtype: 'ProductMaterialView',
        border : true,
        margin: 1
    },{
        region: 'north',
        xtype:'ProductBOMFilter',
        border : true,
        margin: 1,
        height: 0
    }, {
        region: 'east',
        width: '100%',
        xtype: 'ProductBOMView',
        border: true,
        margin: 1
    }],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Thêm NPL',
            margin: 3,
            itemId:'btnNPL',
            iconCls: 'x-fa fa-plus'
        },{
            flex:1,
            border: false
        },{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-backward'
        }]
    }]
})