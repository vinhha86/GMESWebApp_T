Ext.define('GSmartApp.view.handover.HandoverPackToStock_Edit', {
    extend: 'Ext.container.Container',
    id: 'HandoverPackToStock_Edit',
    xtype: 'handover_pack_tostock_edit',
    controller: 'HandoverPackToStock_Edit_Controller',
    viewModel: 'HandoverPackToStock_Edit_ViewModel',
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'HandoverPackToStock_Edit_M',
            id: 'HandoverPackToStock_Edit_M',
            margin: '5 0 0 0',
            height: 130
        },
        {
            xtype: 'HandoverPackToStock_Edit_D',
            margin: '0 5 5 0',
            flex: 1
        },
        {
            xtype: 'container',
            height: 35,
            layout:'hbox',
            items:[
            {
                xtype:'button',
                text:  "Quay lại",
                iconCls: 'x-fa fa-backward',
                itemId: 'btnBack'
            },
            {
                margin: '0 5 5 5',
                xtype:'button',
                text:  "Duyệt",
                iconCls: 'x-fa fa-check',
                itemId: 'btnConfirm',
                bind: {
                    // hidden: '{isBtnConfirmHidden}'
                },
                hidden: true
            },            
            {
                flex:1
            },
            {
                margin: '0 5 5 0',
                xtype:'button',
                text:  'Lưu',
                iconCls: 'x-fa fa-floppy-o',
                itemId: 'btnLuu',
                bind: {
                    disabled: '{isStart}',
                    hidden: '{isBtnLuuHidden}'
                }
            }
        ]
        }        
    ] 
});
