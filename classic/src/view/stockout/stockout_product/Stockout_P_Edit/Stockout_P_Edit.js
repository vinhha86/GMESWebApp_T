Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_Edit', {
    extend: 'Ext.container.Container',
    xtype: 'stockout_p_edit',
    id: 'stockout_p_edit',
    controller: 'Stockout_P_EditController',
    viewModel: {
        type: 'Stockout_P_EditModel'
    },
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'stockout_p_edit_m',
            id: 'stockout_p_edit_m',
            margin: '5 0 0 0',
            height: 130
        },
        {
            xtype: 'stockout_p_edit_d',
            reference: 'grd_stockoutd',
            margin: '0 5 5 0',
            flex: 1
        },
        {
            xtype: 'container',
            height: 35,
            layout:'hbox',
            bind: {
                hidden: '{isWindow}'
            },
            items:[
                {
                    width:100,
                    xtype:'button',
                    text:  "Quay lại",
                    iconCls: 'x-fa fa-backward',
                    handler: 'onUrlBack',
                },
                {
                    margin: '0 5 5 5',
                    xtype:'button',
                    text:  "Duyệt",
                    iconCls: 'x-fa fa-check',
                    itemId: 'btnConfirm',
                    bind: {
                        hidden: '{isBtnConfirmHidden}',
                    },
                },
                {
                    flex:1
                },
                {
                    width:80,
                    margin: '0 5 5 0',
                    xtype:'button',
                    text:  'Lưu',
                    iconCls: 'x-fa fa-floppy-o',
                    itemId: 'btnLuu',
                    bind:{
                        disabled: '{isStart}',
                        hidden: '{isBtnLuuHidden}'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            height: 35,
            layout:'hbox',
            bind: {
                hidden: '{!isWindow}'
            },
            items:[
                {
                    width:100,
                    margin: '0 0 5 5',
                    xtype:'button',
                    text:  "Thoát",
                    iconCls: 'x-fa fa-window-close',
                    itemId: 'btnThoatWindow',
                },
                {
                    flex:1
                },
                {
                    width:80,
                    margin: '0 5 5 0',
                    xtype:'button',
                    text:  'Lưu',
                    iconCls: 'x-fa fa-floppy-o',
                    itemId: 'btnLuuWindow',
                    bind:{
                        hidden: '{isBtnLuuHidden}'
                    }
                }
            ]
        }
    ] 
});
