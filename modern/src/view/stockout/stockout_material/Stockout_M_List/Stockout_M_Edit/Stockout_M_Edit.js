Ext.define('GSmartApp.view.stockout.stockout_material.stockout_m_list.stockout_m_edit.Stockout_M_Edit', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockout_M_Edit',
    id: 'Stockout_M_Edit',
    reference: 'Stockout_M_Edit',
    viewModel: {
        type: 'Stockout_M_EditViewModel'
    },
    controller: 'Stockout_M_EditController',
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
                                    //     xtype: 'combobox',
                                    //     // reference: 'cboorgto',
                                    //     editable: false,
                                    //     readOnly: true,
                                    //     cls: 'notEditable',
                                    //     bind:{
                                    //         store:'{OrgFromStore}',
                                    //         value:'{stockin.orgid_from_link}'
                                    //     },
                                    //     displayField: 'name',
                                    //     valueField: 'id',
                                    //     label: 'Nơi giao:',
                                    //     // disabled: true,
                                    //     labelWidth: 85,
                                    //     flex: 1,
                                    // },
                                    {
                                        xtype: 'textfield',
                                        label: 'Nơi nhận:',
                                        labelWidth: 85,
                                        flex: 1,
                                        textAlign: 'left',
                                        editable: false,
                                        readOnly: true,
                                        clearable: false,
                                        cls: 'notEditable',
                                        bind: {
                                            value: '{stockout.org_to_name}'
                                        }
                                    }
                                ]
                            },
                            {
                                layout: 'hbox',
                                flex: 1,
                                defaults: {
                                    margin: 1
                                },
                                items: [{
                                    xtype: 'textfield',
                                    label: 'Số phiếu:',
                                    labelWidth: 85,
                                    flex: 1,
                                    textAlign: 'left',
                                    editable: false,
                                    readOnly: true,
                                    clearable: false,
                                    cls: 'notEditable',
                                    bind: {
                                        value: '{stockout.stockoutcode}'
                                    }
                                },{
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
                                        value: '{stockout.unit_name}'
                                    }
                                }]
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
                        xtype: 'Stockout_M_Edit_D_Main',
                        flex: 1,
                    }],
                },
                {
                    title: 'DS cây',
                    layout: 'hbox',
                    flex: 1,
                    items:[{
                        xtype: 'Stockout_M_Edit_Pkl_Main',
                        flex: 1,
                    }]
                },
                {
                    title: 'Xé vải',
                    layout: 'hbox',
                    flex: 1,
                    items:[{
                        xtype: 'Stockout_M_Edit_Pkl_Rip_Main',
                        flex: 1,
                    }]
                },
            ],
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