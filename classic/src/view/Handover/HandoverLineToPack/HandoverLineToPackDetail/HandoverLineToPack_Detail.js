Ext.define('GSmartApp.view.handover.HandoverLineToPack_Detail', {
    extend: 'Ext.form.Panel',
    xtype: 'HandoverLineToPack_Detail',
    id:'handover_line_topack_detail',
    controller: 'HandoverLineToPack_Detail_Controller',
    viewModel:{
        type:'HandoverLineToPack_Detail_ViewModel'
    },
    layout: 'border',
    title: '',
    items: [
        {
            region: 'north',
            margin: '0 1 1 0',
            height: 120,
            border: true,
            xtype: 'HandoverLineToPack_Detail_Info'
        },
        {
            region: 'center',
            layout: 'border',
            items: [{
                region: 'center',
                margin: '0 1 1 0',
                border: true,
                xtype: 'HandoverLineToPack_Detail_ProductGrid',
                flex: 1,
            },{
                region: 'east',
                margin: '0 1 1 0',
                border: true,
                xtype: 'HandoverLineToPack_Detail_SkuGrid',
                itemId: 'handOverSkuList',
                // hidden: true,
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