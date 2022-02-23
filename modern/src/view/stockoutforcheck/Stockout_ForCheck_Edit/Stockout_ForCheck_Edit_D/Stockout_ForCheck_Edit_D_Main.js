Ext.define('GSmartApp.view.stockoutforcheck.Stockout_ForCheck_Edit_D_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockout_ForCheck_Edit_D_Main',
    itemId: 'Stockout_ForCheck_Edit_D_Main',
    // reference: 'Stockout_ForCheck_Edit_D_Main',
    controller: 'Stockout_ForCheck_Edit_D_MainController',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    requires: [
        'Ext.Toast',
        'Ext.Responsive',
        'Ext.dataview.listswiper.ListSwiper'
    ],

    items:[
        {
            layout: 'vbox',
            flex: 1,
            items:[
                {
                    margin: 1,
                    flex: 1,
                    xtype: 'Stockout_ForCheck_Edit_D',
                },
                {
                    layout: 'hbox',
                    // flex: 1,
                    items:[
                        {
                            flex: 1
                        },
                        {
                            xtype:'button',
                            text: 'Tạo phiếu xuất',
                            iconCls: 'x-fa fa-plus',
                            itemId:'btnAddPhieuXuat',
                            ui: 'action',
                            margin: 1,
                        },    
                    ],
                    bind: {
                        hidden: '{!isTabToVaiHidden}'
                    }
                },
            ]
        },
    ]
});