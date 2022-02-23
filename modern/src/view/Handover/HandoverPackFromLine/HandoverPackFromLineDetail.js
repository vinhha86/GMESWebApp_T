Ext.define('GSmartApp.view.handover.HandoverPackFromLineDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_pack_fromline_edit',
    id: 'handover_pack_fromline_edit',
    reference: 'handover_pack_fromline_edit',
    viewModel: {
        type: 'HandoverDetailViewModel'
    },
    controller: 'HandoverPackFromLineDetailController',
    // title: 'Xuất BTP lên chuyền',
    layout: 'vbox',
    // layout: 'fit',

    requires: [
        'Ext.Toast'
    ],

    items: [
        {
            layout: 'hbox',
            // docked : 'top',
            defaults: {
                margin:'2 2 0 2'
            },
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
                                    {
                                        xtype: 'textfield',
                                        label: 'Số phiếu:',
                                        labelWidth: 70,
                                        flex: 1,
                                        textAlign: 'left',
                                        editable: false,
                                        readOnly: true,
                                        cls: 'notEditable',
                                        clearable: false,
                                        bind: {
                                            value: '{currentRec.handover_code}'
                                        },
                                    },
                                    {
                                        xtype: 'datefield',
                                        label: 'Ngày:',
                                        labelWidth: 60,
                                        flex: 1,
                                        textAlign: 'left',
                                        dateFormat : 'd/m/y',
                                        editable: false,
                                        readOnly: true,
                                        cls: 'notEditable',
                                        disabled: true,
                                        bind: {
                                            value: '{currentRec.handover_date}'
                                        }
                                    }                                    
                                ]
                            },{
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
                                        store:'{ListOrgStore_From}',
                                        value:'{currentRec.orgid_from_link}',
                                        disabled: '{!isCreateNew}',
                                    },
                                    displayField: 'nameParent',
                                    valueField: 'id',
                                    label: 'Nơi giao:',
                                    disabled: true,
                                    labelWidth: 70,
                                    flex: 1,
                                // },{
                                //     xtype: 'combobox',
                                //     // reference: 'cboorgto',
                                //     editable: false,
                                //     hideTrigger: true,
                                //     readOnly: true,
                                //     cls: 'notEditable',
                                //     bind:{
                                //         store:'{UserListStore}',
                                //         value: '{currentRec.handover_userid_link}'
                                //     },
                                //     displayField: 'fullname',
                                //     valueField: 'id',
                                //     label: 'Ng/giao:',
                                //     labelWidth: 85,
                                //     flex: 1,
                                }]
                            },
                            // {
                            //     layout: 'hbox',
                            //     flex: 1,
                            //     defaults: {
                            //         margin: 1
                            //     },
                            //     items: [{
                            //         xtype: 'combobox',
                            //         itemId:'orgid_to_link',
                            //         // reference: 'cboorgto',
                            //         editable: false,
                            //         readOnly: true,
                            //         cls: 'notEditable',
                            //         bind:{
                            //             store:'{ListOrgStore_To}',
                            //             value:'{currentRec.orgid_to_link}'
                            //         },
                            //         displayField: 'nameParent',
                            //         valueField: 'id',
                            //         label: 'Nơi nhận:',
                            //         disabled: true,
                            //         labelWidth: 70,
                            //         flex: 1,
                            //     // },{
                            //     //     xtype: 'combobox',
                            //     //     // reference: 'cboorgto',
                            //     //     editable: false,
                            //     //     hideTrigger: true,
                            //     //     readOnly: true,
                            //     //     cls: 'notEditable',
                            //     //     bind:{
                            //     //         store:'{UserListStore}',
                            //     //         value: '{currentRec.receiver_userid_link}'
                            //     //     },
                            //     //     displayField: 'fullname',
                            //     //     valueField: 'id',
                            //     //     label: 'Ng/nhận:',
                            //     //     labelWidth: 85,
                            //     //     flex: 1,
                            //     }]
                            // },
                            {
                                layout: 'hbox',
                                flex: 1,
                                defaults: {
                                    margin: 1
                                },
                                items: [{
                                    xtype: 'textfield',
                                    label: 'Mã lệnh:',
                                    labelWidth: 70,
                                    flex: 1,
                                    textAlign: 'left',
                                    editable: false,
                                    readOnly: true,
                                    cls: 'notEditable',
                                    clearable: false,
                                    bind: {
                                        value: '{pordercode}'
                                    }
                                // },{
                                //     xtype:'button',
                                //     // text: 'Xác nhận xuất',
                                //     margin: 2,
                                //     itemId:'btnPlus',
                                //     ui: 'action',
                                //     iconCls: 'x-fa fa-plus',
                                // },{
                                //     xtype:'button',
                                //     // text: 'Xác nhận xuất',
                                //     margin: 2,
                                //     itemId:'btnSearch',
                                //     ui: 'action',
                                //     iconCls: 'x-fa fa-search',
                                }]
                            // },{
                            //     layout: 'hbox',
                            //     flex: 1,
                            //     defaults: {
                            //         margin: 1
                            //     },
                            //     items: [{
                            //         xtype: 'textfield',
                            //         label: 'Lý do:',
                            //         labelWidth: 85,
                            //         flex: 1,
                            //         textAlign: 'left',
                            //         // editable: false,
                            //         // readOnly: true,
                            //         bind: {
                            //             // value: '{currentRec.handoverProductBuyercode}'
                            //         }
                            //     }]
                            },{
                                layout: 'hbox',
                                flex: 1,
                                defaults: {
                                    margin: 1
                                },
                                items: [{
                                    xtype: 'textfield',
                                    label: 'Ghi chú:',
                                    labelWidth: 70,
                                    flex: 1,
                                    textAlign: 'left',
                                    // editable: false,
                                    // readOnly: true,
                                    clearable: false,
                                    bind: {
                                        value: '{currentRec.extrainfo}'
                                    }
                                }]
                            },{
                                layout: 'hbox',
                                flex: 1,
                                defaults: {
                                    margin: 1
                                },
                                items: [{
                                    xtype: 'numberfield',
                                    // reference: 'cboorgto',
                                    editable: false,
                                    readOnly: true,
                                    cls: 'notEditable',
                                    bind:{
                                        value:'{handoverProduct.totalpackage}'
                                    },
                                    label: 'SL giao:',
                                    textAlign: 'right',
                                    hideTrigger:true,
                                    clearable: false,
                                    labelWidth: 70,
                                    flex: 1,
                                },{
                                    xtype: 'numberfield',
                                    // reference: 'cboorgto',
                                    // editable: false,
                                    // readOnly: true,
                                    bind:{
                                        value:'{handoverProduct.totalpackagecheck}'
                                    },
                                    label: 'SL nhận:',
                                    textAlign: 'right',
                                    hideTrigger:true,
                                    clearable: false,
                                    labelWidth: 70,
                                    flex: 1,
                                }
                            ]
                        },
                    ]
                }
            ]
        },
        {
            margin: 3,
            flex: 1,
            xtype: 'HandoverDetail',
            id: 'handover_pack_fromline_detail',
        },
    ],
    tbar: [{
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
    '->'
    ,
    {
        xtype:'button',
        iconCls: 'x-fa fa-check',
        itemId:'btnHandover',
        ui: 'action',
        bind: {
            hidden: '{isBtnConfirmInHidden}'
        }
    },
    {
        xtype:'button',
        iconCls: 'x-fa fa-times-circle',
        itemId:'btnCancelConfirm',
        ui: 'action',
        bind: {
            hidden: '{isBtnCancelConfirmHidden}'
        }
    },
    {
        xtype:'button',
        iconCls: 'x-fa fa-save',
        itemId:'btnLuu',
        ui: 'action',
    }]
});