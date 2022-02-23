Ext.define('GSmartApp.view.handover.Handover_kho_tocut_Edit', {
    extend: 'Ext.container.Container',
    xtype: 'handover_kho_tocut_edit',
    id: 'Handover_kho_tocut_Edit',
    controller: 'Handover_kho_tocut_EditController',
    viewModel: 'Handover_kho_tocut_EditModel',
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'Handover_kho_tocut_Edit_M',
            id: 'Handover_kho_tocut_Edit_M',
            margin: '5 0 0 0',
            height: 140
        },
        {
            xtype: 'Handover_kho_tocut_Edit_D',
            reference: 'grd_stockoutd',
            margin: '0 5 5 0',
            flex: 1
        },
        {
            xtype: 'container',
            height: 35,
            layout:'hbox',
            items:[
            {
                margin: '0 5 5 0',
                width:100,
                xtype:'button',
                text:  "Quay lại",
                iconCls: 'x-fa fa-backward',
                handler: 'onUrlBack'
            },
            {
                margin: '0 5 5 0',
                xtype:'button',
                text:  "Duyệt",
                iconCls: 'x-fa fa-check',
                itemId: 'btnConfirm',
                bind: {
                    hidden: '{isBtnConfirmHidden}'
                },
                hidden: true
            },
            {
                flex:1
            },
            {
                margin: '0 5 5 0',
                xtype:'button',
                text:  'In phiếu',
                iconCls: 'x-fa fa-print',
                itemId: 'btnStockout_Print'
            },
            {
                margin: '0 5 5 0',
                xtype:'button',
                text:  'Đồng bộ kế toán',
                iconCls: 'x-fa fa-refresh',
                itemId: 'btnStockout_Sync'
            },
            {
                width:80,
                margin: '0 5 5 0',
                xtype:'button',
                text:  'Lưu',
                iconCls: 'x-fa fa-floppy-o',
                handler: 'onSave',
                bind:{
                    disabled: '{isStart}'
                }
            }
        ]
        }        
    ] 
});
