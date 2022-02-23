Ext.define('GSmartApp.view.stockout.Stockin_P_Edit', {
    extend: 'Ext.container.Container',
    xtype: 'Stockin_P_Edit',
    id: 'Stockin_P_Edit',
    controller: 'Stockin_P_Edit_Controller',
    viewModel: {
        type: 'Stockin_P_Edit_ViewModel'
    },
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'StockIn_P_Edit_M',
            id: 'StockIn_P_Edit_M',
            margin: '5 0 0 0',
            height: 130
        },
        {
            xtype: 'Stockin_P_Edit_D',
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
                    hidden: '{isBtnConfirmHidden}'
                },
                // hidden: true
            },       
            {
                margin: '0 5 5 5',
                xtype:'button',
                text:  "test",
                iconCls: 'x-fa fa-check',
                itemId: 'btnTest',
                // bind: {
                //     hidden: '{isBtnTestHidden}'
                // },
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
                },
                // hidden: true
            }
        ]
        }        
    ] 
});
