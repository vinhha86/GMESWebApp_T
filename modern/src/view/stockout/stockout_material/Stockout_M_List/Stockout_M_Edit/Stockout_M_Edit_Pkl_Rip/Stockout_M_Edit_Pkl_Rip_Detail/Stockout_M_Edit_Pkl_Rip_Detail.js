Ext.define('GSmartApp.view.stockout.stockout_material.stockout_m_list.stockout_m_edit.stockout_m_edit_pkl.Stockout_M_Edit_Pkl_Rip_Detail', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockout_M_Edit_Pkl_Rip_Detail',
    itemId: 'Stockout_M_Edit_Pkl_Rip_Detail',
    cls: 'Stockout_M_Edit_Pkl_Rip_Detail',
    reference: 'Stockout_M_Edit_Pkl_Rip_Detail',
    controller: 'Stockout_M_Edit_Pkl_Rip_Detail_Controller',
    viewModel: {
        type: 'Stockout_M_Edit_Pkl_Rip_Detail_ViewModel'
    },
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
            xtype: 'container',
            layout: 'vbox',
            items:[
                {
                    layout: 'hbox',
                    border: false,
                    width: '100%',
                    items:[
                        {
                            xtype: 'textfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'lotnumberTxtRip',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Số LOT',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRip.lotnumber}',
                                editable: '{isEditable}',
                                readOnly: '{isReadOnly}',
                                cls: '{fieldClass}',
                            },
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'packageidTxtRip',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Số cây',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRip.packageid}',
                                editable: '{isEditable}',
                                readOnly: '{isReadOnly}',
                                cls: '{fieldClass}',
                            },
                            listeners: {
                                focusleave: 'onlotnumberTxtAndpackageidTxtRipleave',
                                focus: 'onFocus'
                            },
                            stepValue: 0.1,
                        },
                        // {
                        //     xtype:'button',
                        //     // text: 'Xác nhận',
                        //     // flex: 1,
                        //     // minWidth: 80,
                        //     // maxWidth: 130,
                        //     // width: 45,
                        //     margin: 1,
                        //     iconCls: 'x-fa fa-check',
                        //     itemId:'btnCheckRip',
                        //     ui: 'action',
                        //     bind: {
                        //         disabled: '{!isobjRipSelected}'
                        //     }
                        // },   
                    ]
                },
                {
                    layout: 'hbox',
                    border: false,
                    width: '100%',
                    items:[
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'metCheck',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Số xé (M)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRip.met_check}',
                                hidden: '{isMetColumnHidden}',
                            },
                            listeners: {
                                focusleave: 'onPklRipTextfieldFocusLeave',
                                focus: 'onPklRipTextfieldFocus',
                            },
                            stepValue: 0.1,
                        },
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'ydsCheck',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Số xé (Y)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRip.ydscheck}',
                                hidden: '{isYdsColumnHidden}',
                            },
                            listeners: {
                                focusleave: 'onPklRipTextfieldFocusLeave',
                                focus: 'onPklRipTextfieldFocus',
                            },
                            stepValue: 0.1,
                        },
                        {
                            xtype: 'numberfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'metRemain',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Số còn (M)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRip.met_remain}',
                                hidden: '{isMetColumnHidden}',
                            },
                            listeners: {
                                focusleave: 'onPklRipTextfieldFocusLeave',
                                focus: 'onPklRipTextfieldFocus',
                            },
                            stepValue: 0.1,
                        },
                        {
                            xtype: 'numberfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'ydsRemain',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Số còn (Y)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRip.yds_remain}',
                                hidden: '{isYdsColumnHidden}',
                            },
                            listeners: {
                                focusleave: 'onPklRipTextfieldFocusLeave',
                                focus: 'onPklRipTextfieldFocus',
                            },
                            stepValue: 0.1,
                        },
                        // {
                        //     xtype:'button',
                        //     iconCls: 'x-fa fa-plus',
                        //     // itemId:'',
                        //     ui: 'action',
                        //     margin: 1,
                        //     style: 'visibility: hidden;'
                        // },
                    ]
                },

                {
                    layout: 'hbox',
                    border: false,
                    width: '100%',
                    items:[
                        {
                            xtype:'button',
                            text: 'Xoá',
                            margin: 5,
                            width: 100,
                            iconCls: 'x-fa fa-trash',
                            itemId:'btnDeletePklRip',
                            ui: 'action',
                            focusable: false,
                            bind: {
                                disabled: '{isBtnDeletePklHidden}',
                            },
                            // style: 'visibility: hidden;'
                        },
                        {
                            flex: 1,
                        },
                        {
                            xtype:'button',
                            text: 'Lưu',
                            margin: 5,
                            width: 100,
                            iconCls: 'x-fa fa-check',
                            itemId:'btnCheckRip',
                            ui: 'action',
                            // bind: {
                            //     disabled: '{isbtnCheckDisabled}'
                            // }
                        },   
                    ]
                },
            ],
        }
    ]
});