Ext.define('GSmartApp.view.handover.HandoverLineFromCut_Detail', {
    extend: 'Ext.form.Panel',
    xtype: 'HandoverLineFromCut_Detail',
    id:'handover_line_fromcut_detail',
    controller: 'HandoverLineFromCut_Detail_Controller',
    viewModel:{
        type:'HandoverLineFromCut_Detail_ViewModel'
    },
    layout: 'border',
    title: '',
    items: [
        {
            region: 'north',
            margin: '0 1 1 0',
            height: 120,
            border: true,
            xtype: 'HandoverLineFromCut_Detail_Info'
        },
        {
            region: 'center',
            layout: 'border',
            items: [{
                region: 'center',
                margin: '0 1 1 0',
                border: true,
                xtype: 'HandoverLineFromCut_Detail_ProductGrid',
                flex: 1,
            },{
                region: 'east',
                margin: '0 1 1 0',
                border: true,
                xtype: 'HandoverLineFromCut_Detail_SkuGrid',
                itemId: 'handOverSkuList',
                hidden: true,
                flex: 1,
            }]
            
        }
    ],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Quay lại',
            margin: 3,
            itemId:'btnQuayLai',
            iconCls: 'x-fa fa-backward'
        },
        {
            xtype:'button',
            text: 'Nơi nhận xác thực',
            margin: 3,
            itemId:'btnConfirm',
            iconCls: 'x-fa fa-check',
            bind: {
                hidden: '{isBtnConfirmInHidden}'
            }
        },
        {
            xtype:'button',
            text: 'Huỷ xác thực nhận',
            margin: 3,
            itemId:'btnCancelConfirm',
            iconCls: 'x-fa fa-times-circle',
            bind: {
                hidden: '{isBtnCancelConfirmHidden}'
            }
        },
        // {
        //     xtype:'button',
        //     text: 'Xóa',
        //     margin: 3,
        //     itemId:'btnDelete',
        //     iconCls: 'x-fa fa-trash',
        //     bind: {
        //         hidden: '{isBtnDeleteHidden}'
        //     }
        // },
        // {
        //     xtype:'button',
        //     text: 'Lưu',
        //     margin: 3,
        //     itemId:'btnLuu',
        //     iconCls: 'x-fa fa-save',
        //     formBind: true
        // },
        {
            flex:1,
            border: false
        },]
    }]
})