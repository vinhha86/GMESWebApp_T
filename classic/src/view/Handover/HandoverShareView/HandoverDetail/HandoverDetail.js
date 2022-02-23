Ext.define('GSmartApp.view.handover.HandoverDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'HandoverDetail',
    id:'HandoverDetail',
    controller: 'HandoverDetailController',
    viewModel:{
        type:'HandoverDetailViewModel'
    },
    layout: 'border',
    title: '',
    items: [
        {
            region: 'north',
            margin: '0 1 1 0',
            height: 120,
            border: true,
            xtype: 'HandoverDetail_Info'
        },
        {
            region: 'center',
            layout: 'border',
            items: [{
                region: 'center',
                margin: '0 1 1 0',
                border: true,
                xtype: 'HandoverDetail_ProductGrid',
                flex: 1,
            },{
                region: 'east',
                margin: '0 1 1 0',
                border: true,
                xtype: 'HandoverDetail_SkuGrid',
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
        },{
            xtype:'button',
            text: 'Nơi nhận xác thực',
            margin: 3,
            itemId:'btnConfirm',
            iconCls: 'x-fa fa-check',
            bind: {
                hidden: '{isBtnConfirmInHidden}'
            }
        },{
            xtype:'button',
            text: 'Huỷ xác thực nhận',
            margin: 3,
            itemId:'btnCancelConfirm',
            iconCls: 'x-fa fa-times-circle',
            bind: {
                hidden: '{isBtnCancelConfirmHidden}'
            }
        },{
            xtype:'button',
            text: 'Người xuất xác nhận',
            margin: 3,
            itemId:'btnHandover',
            iconCls: 'x-fa fa-check',
            bind: {
                hidden: '{isBtnConfirmOutHidden}'
            }
        },{
            xtype:'button',
            text: 'Xóa',
            margin: 3,
            itemId:'btnDelete',
            iconCls: 'x-fa fa-trash',
            bind: {
                hidden: '{isBtnDeleteHidden}'
            }
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        },{
            flex:1,
            border: false
        },]
    }]
})