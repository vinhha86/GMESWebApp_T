Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_M_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockout_M_Main',
    id: 'Stockout_M_Main',
    reference: 'Stockout_M_Main',
    viewModel: {
        type: 'Stockout_M_MainViewModel'
    },
    controller: 'Stockout_M_MainController',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    requires: [
        'Ext.Toast',
        'Ext.Responsive',
        'Ext.dataview.listswiper.ListSwiper'
    ],

    items: 
    [
        {
            xtype: 'tabpanel',
            itemId: 'TabView',
            // height: '100%',
            // width: '100%',
            flex: 1,
            items: 
            [
                {
                    title: 'Phiếu xuất',
                    layout: 'hbox',
                    flex: 1,
                    items: [{
                        xtype: 'Stockout_M_List_Main',
                        flex: 1,
                    }],
                },
                {
                    title: 'Yêu cầu xuất',
                    layout: 'hbox',
                    flex: 1,
                    items:[{
                        // xtype: 'Stockout_Order_Main',
                        xtype: 'stockoutforcheckmain',
                        viewModel: {
                            data: {
                                is_stockout_m_view: true
                            }
                        },
                        flex: 1,
                    }]
                },
            ],
            // tabBar: {
            //     items: [{
            //         flex: 1,
            //     },{
            //         xtype: 'button',
            //         iconCls: 'x-fa fa-angle-double-up',
            //         ui: 'action',
            //         // setActive: function (active) {
            //         //     this.setPressed(active);
            //         // },
            //         handler: function () {
            //             console.log('clicked');
            //         }
            //     }]
            // },
        },
        
    ],
    tbar: [
        {
            xtype:'button',
            iconCls: 'x-fa fa-arrow-left',
            itemId:'btnBack',
            ui: 'action',
        },
        '->'
        ,
    ]         
});
