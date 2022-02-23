Ext.define('GSmartApp.view.stockout.Stockout_M_Edit', {
    extend: 'Ext.container.Container',
    xtype: 'Stockout_M_Edit',
    id: 'Stockout_M_Edit',
    controller: 'Stockout_M_EditController',
    viewModel: {
        type: 'Stockout_M_EditModel'
    },
    reference: 'Stockout_M_Edit',
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'Stockout_M_Edit_M',
            id: 'Stockout_M_Edit_M',
            margin: '5 0 0 0',
            height: 140
        },
        {
            xtype: 'Stockout_M_Edit_D',
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
                hidden: true,
                bind: {
                    hidden: '{isBtnConfirmHidden}'
                },
            },
            {
                margin: '0 5 5 0',
                xtype:'button',
                text:  "Hủy duyệt",
                iconCls: 'x-fa fa-close',
                itemId: 'btnUnConfirm',
                hidden: true,
                bind: {
                    hidden: '{isBtnUnConfirmHidden}'
                },
            },
            {
                flex:1
            },
            {
                margin: '0 5 5 0',
                xtype:'button',
                text:  "Danh sách cây vải xuất",
                iconCls: 'x-fa fa-print',
                itemId: 'btnPackinglistPrint',
                // bind: {
                //     hidden: '{isBtnConfirmHidden}'
                // },
                // hidden: true
            },
            // {
            //     margin: '0 5 5 0',
            //     xtype:'button',
            //     text:  "Test redirect",
            //     iconCls: 'x-fa fa-print',
            //     itemId: 'btnTestRedirect',
            //     // bind: {
            //     //     hidden: '{isBtnConfirmHidden}'
            //     // },
            //     // hidden: true
            // },
            // {
            //     margin: '0 5 5 0',
            //     xtype:'button',
            //     text:  'In phiếu',
            //     iconCls: 'x-fa fa-print',
            //     itemId: 'btnStockout_Print'
            // },
            // {
            //     margin: '0 5 5 0',
            //     xtype:'button',
            //     text:  'Đồng bộ kế toán',
            //     iconCls: 'x-fa fa-refresh',
            //     itemId: 'btnStockout_Sync'
            // },
            {
                width:80,
                margin: '0 5 5 0',
                xtype:'button',
                itemId: 'btnLuu',
                text:  'Lưu',
                iconCls: 'x-fa fa-floppy-o',
                // handler: 'onSave',
                hidden: true,
                bind:{
                    hidden: '{isBtnSaveHidden}'
                }
            }
        ]
        }        
    ] 
});
