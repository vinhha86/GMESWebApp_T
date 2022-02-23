Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_M_Edit',
    id: 'Stockin_M_Edit',
    reference: 'Stockin_M_Edit',
    viewModel: {
        type: 'Stockin_M_Edit_ViewModel'
    },
    controller: 'Stockin_M_Edit_Controller',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    requires: [
        'Ext.Toast',
        'Ext.Responsive',
        'Ext.dataview.listswiper.ListSwiper',
        'Ext.field.InputMask'
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
                                items: [{
                                    xtype: 'combobox',
                                    // reference: 'cboorgto',
                                    editable: false,
                                    readOnly: true,
                                    cls: 'notEditable',
                                    bind:{
                                        store:'{OrgFromStore}',
                                        value:'{stockin.orgid_from_link}'
                                    },
                                    displayField: 'name',
                                    valueField: 'id',
                                    label: 'Nơi giao:',
                                    // disabled: true,
                                    labelWidth: 85,
                                    flex: 1,
                                }]
                            },
                            {
                                layout: 'hbox',
                                flex: 1,
                                defaults: {
                                    margin: 1
                                },
                                items: [{
                                    xtype: 'textfield',
                                    label: 'Invoice:',
                                    labelWidth: 85,
                                    flex: 1,
                                    textAlign: 'left',
                                    editable: false,
                                    readOnly: true,
                                    clearable: false,
                                    cls: 'notEditable',
                                    bind: {
                                        value: '{stockin.invoice_number}'
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
                                        value: '{stockin.unitName}'
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
                        xtype: 'Stockin_M_Edit_D_Main',
                        flex: 1,
                    }],
                },
                {
                    title: 'Kiểm lot',
                    layout: 'hbox',
                    flex: 1,
                    items:[{
                        xtype: 'Stockin_M_Edit_Lot_Main',
                        flex: 1,
                    }]
                },
                {
                    title: 'Kiểm cây',
                    layout: 'hbox',
                    flex: 1,
                    items:[{
                        xtype: 'Stockin_M_Edit_Pkl_Main',
                        flex: 1,
                    }]
                },
                {
                    title: 'Kiểm 10%',
                    layout: 'hbox',
                    flex: 1,
                    items:[{
                        xtype: 'Stockin_M_Edit_Pkl_Recheck_Main',
                        flex: 1,
                    }]
                },
                {
                    title: 'DS SP',
                    layout: 'hbox',
                    flex: 1,
                    items:[{
                        xtype: 'Stockin_M_Edit_Product',
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
            //     },{
            //         xtype: 'button',
            //         iconCls: 'x-fa fa-angle-double-down',
            //         ui: 'action',
            //         // setActive: function (active) {
            //         //     this.setPressed(active);
            //         // },
            //         handler: function () {
            //             console.log('clicked');
            //         },
            //         hidden: true,
            //         style: 'border: 0px'
            //     }]
            // },
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
        {
            xtype:'button',
            iconCls: 'x-fa fa-print',
            itemId:'btnPrint',
            ui: 'action',
        },
        // {
        //     xtype:'button',
        //     iconCls: 'x-fa fa-save',
        //     itemId:'btnShowToken',
        //     ui: 'action',
        // },
        // {
        //     xtype:'button',
        //     iconCls: 'x-fa fa-save',
        //     itemId:'btnDeleteToken',
        //     ui: 'action',
        // }
    ],
});