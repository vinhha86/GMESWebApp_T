Ext.define('GSmartApp.view.pcontract.Pcontract_Product.Set.PContract_Pair_insert_main', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_Pair_insert_main',
    id: 'PContract_Pair_insert_main',
    layout: {
        type: 'border'
    },
    controller: 'PContractProductPairInsertViewCotroller',
    viewModel: {
        type: 'PContract_Pair_insert_main_ViewModel'
    },
    items:[
        {
            xtype: 'PContractProductPairInsertView',
            title: 'Sản phẩm trong bộ',
            margin: 1,
            border: true,
            region: 'center'
        },
        {
            title: 'Sản phẩm không trong bộ',
            xtype: 'PContractPair_ProductNotInSet',
            width: 350,
            region: 'east',
            margin: 1,
            border: true
        }    
    ],
    dockedItems:[{
        dock:'bottom',
        border: false,
        layout:'hbox',
        items:[{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnChon',
            iconCls: 'x-fa fa-save'
        },{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close'
        },{
            flex: 1,
            border: false
        },]
    }]  
})