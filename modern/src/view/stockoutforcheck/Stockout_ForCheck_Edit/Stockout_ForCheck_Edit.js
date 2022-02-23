Ext.define('GSmartApp.view.stockoutforcheck.Stockout_ForCheck_Edit', {
    extend: 'Ext.form.Panel',
    xtype: 'stockoutforcheckmain_edit',
    id: 'stockoutforcheckmain_edit',
    reference: 'stockoutforcheckmain_edit',
    viewModel: {
        type: 'Stockout_ForCheck_Edit_ViewModel'
    },
    controller: 'Stockout_ForCheck_Edit_Controller',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    requires: [
        'Ext.Toast',
        'Ext.Responsive',
        'Ext.dataview.listswiper.ListSwiper'
    ],

    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            itemId: 'infoFields',
            items: [
                {
                    layout: 'vbox',
                    flex: 1,
                    items: [
                        {
                            layout: 'hbox',
                            flex: 1,
                            defaults: {
                                margin: 1
                            },
                            items: [
                                // {
                                //     xtype: 'textfield',
                                //     label: 'Nơi nhận:',
                                //     labelWidth: 85,
                                //     flex: 1,
                                //     textAlign: 'left',
                                //     editable: false,
                                //     readOnly: true,
                                //     clearable: false,
                                //     cls: 'notEditable',
                                //     bind: {
                                //         value: '{stockout_order.org_to_name}'
                                //     }
                                // },
                                {
                                    xtype: 'textfield',
                                    label: 'Đ/vị dài:',
                                    labelWidth: 85,
                                    flex: 1,
                                    textAlign: 'left',
                                    editable: false,
                                    readOnly: true,
                                    clearable: false,
                                    cls: 'notEditable',
                                    bind: {
                                        value: '{stockout_order.unitName}'
                                    }
                                },
                                {flex: 1},
                            ]
                        },
                    ]
                }
            ]
        },
        {
            xtype: 'tabpanel',
            itemId: 'TabView',
            // height: '100%',
            // width: '100%',
            flex: 1,
            items: 
            [
                {
                    title: 'DS vải',
                    layout: 'hbox',
                    flex: 1,
                    items: [{
                        xtype: 'Stockout_ForCheck_Edit_D_Main',
                        flex: 1,
                    }],
                },
                {
                    title: 'Tở vải',
                    // xtype: 'Stockout_ForCheck_Edit_ToVai_Main'
                    layout: 'hbox',
                    flex: 1,
                    items: [{
                        xtype: 'Stockout_ForCheck_Edit_ToVai_Main',
                        flex: 1,
                    }],
                }
            ],
            bind: {
                hidden: '{isTabToVaiHidden}'
            }
        },
        {
            xtype: 'tabpanel',
            itemId: 'TabView2',
            // height: '100%',
            // width: '100%',
            flex: 1,
            hidden: true,
            items: 
            [
                {
                    title: 'DS vải',
                    layout: 'hbox',
                    flex: 1,
                    items: [{
                        xtype: 'Stockout_ForCheck_Edit_D_Main',
                        flex: 1,
                    }],
                },
            ],
            hidden: true,
            bind: {
                hidden: '{!isTabToVaiHidden}'
            }
        }
    ],
    tbar: [
        {
            xtype:'button',
            iconCls: 'x-fa fa-arrow-left',
            itemId:'btnBack',
            ui: 'action',
        },
        {
            xtype:'button',
            iconCls: 'x-fa fa-home',
            itemId:'btnHome',
            ui: 'action',
        },    
        '->',
        {
            xtype:'button',
            iconCls: 'x-fa fa-angle-double-up',
            itemId:'btnThuGon',
            ui: 'action',
            bind: {
                hidden: '{!IsformMaster}'
            }
        },    
        {
            xtype:'button',
            iconCls: 'x-fa fa-angle-double-down',
            itemId:'btnMoRong',
            ui: 'action',
            bind: {
                hidden: '{IsformMaster}'
            }
        },    
    ],
});