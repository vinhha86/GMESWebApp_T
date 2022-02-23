Ext.define('GSmartApp.view.stockin.stockin_submaterial.stockin_subm_edit.Stockin_SubM_Edit', {
    extend: 'Ext.container.Container',
    xtype: 'Stockin_SubM_Edit',
    id: 'Stockin_SubM_Edit',
    controller: 'Stockin_SubM_Edit_Controller',
    viewModel: 'Stockin_SubM_Edit_ViewModel',
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'Stockin_SubM_Edit_M',
            id: 'StockIn_M_Edit_M',
            margin: '2 0 0 0',
            height: 140
        },
        {
            xtype: 'Stockin_SubM_Edit_D_Main',
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
                xtype:'button',
                text:  "Quay lại",
                iconCls: 'x-fa fa-backward',
                itemId: 'btnBack',
                bind: {
                    hidden: '{isAdd_Pcontract_Stockin}'
                }
            },
            {
                margin: '0 5 5 5',
                xtype:'button',
                text:  "Đóng",
                iconCls: 'x-fa fa-window-close',
                itemId: 'btnClose',
                bind: {
                    hidden: '{!isAdd_Pcontract_Stockin}'
                }
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
                // hidden: true
            },
            {
                flex:1
            },
            {
                margin: '0 5 5 0',
                xtype:'button',
                text:  'In phiếu',
                iconCls: 'x-fa fa-print',
                itemId: 'btnStockin_Print'
            },
            {
                margin: '0 5 5 0',
                xtype:'button',
                text:  'Đồng bộ kế toán',
                iconCls: 'x-fa fa-refresh',
                itemId: 'btnStockin_Sync'
            },
            {
                margin: '0 5 5 0',
                xtype:'button',
                text:  'Lưu',
                iconCls: 'x-fa fa-floppy-o',
                itemId: 'btnLuu',
                bind: {
                    // disabled: '{isStart}',
                    hidden: '{isBtnLuuHidden}'
                }
            }
        ]
        }        
    ] 
});
