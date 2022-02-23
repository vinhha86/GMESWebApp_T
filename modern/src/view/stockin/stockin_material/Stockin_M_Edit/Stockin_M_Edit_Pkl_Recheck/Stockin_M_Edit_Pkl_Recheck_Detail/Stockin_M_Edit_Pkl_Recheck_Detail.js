Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.stockin_m_edit_pkl_recheck_detail.Stockin_M_Edit_Pkl_Recheck_Detail', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_M_Edit_Pkl_Recheck_Detail',
    itemId: 'Stockin_M_Edit_Pkl_Recheck_Detail',
    cls: 'Stockin_M_Edit_Pkl_Recheck_Detail',
    reference: 'Stockin_M_Edit_Pkl_Recheck_Detail',
    controller: 'Stockin_M_Edit_Pkl_Recheck_Detail_Controller',
    viewModel: {
        type: 'Stockin_M_Edit_Pkl_Recheck_Detail_ViewModel'
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
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'packageidTxtRecheck',
                            // label: 'Số cây:',
                            // labelWidth: 130,
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
                                value: '{objRecheck.packageid}',
                                editable: '{isPackageIdEditable}',
                                readOnly: '{!isPackageIdEditable}',
                            },
                            listeners: {
                                focusleave: 'onlotnumberTxtAndpackageidTxtRecheckleave',
                                focus: 'onFocus'
                            },
                            stepValue: 0.1,
                        },
                        {
                            xtype: 'textfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'lotnumberTxtRecheck',
                            // label: 'Số LOT:',
                            // labelWidth: 130,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Số LOT',
                            editable: false,
                            readOnly: true,
                            clearable: false,
                            cls: 'notEditable',
                            bind: {
                                value: '{objRecheck.lotnumber}'
                            },
                        },
                    ]
                },

                // ios
                {
                    layout: 'hbox',
                    border: false,
                    width: '100%',
                    bind: {
                        hidden: '{!isIos}'
                    },
                    items:[
                        {
                            xtype: 'textfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'mTxtRecheck',
                            // label: 'Dài kiểm (M):',
                            // labelWidth: 130,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Dài kiểm (M)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRecheck.met_check}',
                                hidden: '{isMetColumnHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'textfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'yTxtRecheck',
                            // label: 'Dài kiểm (Y):',
                            // labelWidth: 130,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Dài kiểm (Y)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRecheck.ydscheck}',
                                hidden: '{isYdsColumnHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        //////////////////////////////////
                        {
                            xtype: 'textfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'mOriginTxtRecheck',
                            // label: 'Dài phiếu (M):',
                            // labelWidth: 130,
                            flex: 1,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Dài phiếu (M)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRecheck.met_origin}',
                                hidden: '{isMetColumnHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'textfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'yOriginTxtRecheck',
                            // label: 'Dài phiếu (Y):',
                            // labelWidth: 130,
                            flex: 1,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Dài phiếu (Y)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRecheck.ydsorigin}',
                                hidden: '{isYdsColumnHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                    ]
                },
                {
                    layout: 'hbox',
                    border: false,
                    width: '100%',
                    bind: {
                        hidden: '{!isIos}'
                    },
                    items:[
                        {
                            xtype: 'textfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'canCheckTxtRecheck',
                            // label: 'Cân kiểm:',
                            // labelWidth: 130,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Cân kiểm',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRecheck.grossweight_check}',
                                hidden: '{isKgColumnHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'textfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'lbsCheckTxtRecheck',
                            // label: 'Lbs kiểm:',
                            // labelWidth: 130,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Lbs kiểm',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRecheck.grossweight_lbs_check}',
                                hidden: '{isLbsColumnHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        //////////////////////////////////
                        {
                            xtype: 'textfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'canTxtRecheck',
                            // label: 'Cân phiếu:',
                            // labelWidth: 130,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Cân phiếu',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRecheck.grossweight}',
                                hidden: '{isKgColumnHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'textfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'lbsTxtRecheck',
                            // label: 'Lbs phiếu:',
                            // labelWidth: 130,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Lbs phiếu',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRecheck.grossweight_lbs}',
                                hidden: '{isLbsColumnHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                    ]
                },
                {
                    layout: 'hbox',
                    border: false,
                    width: '100%',
                    bind: {
                        hidden: '{!isIos}'
                    },
                    items:[
                        {
                            xtype: 'textfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'widthMetCheckTxtRecheck',
                            // label: 'Khổ kiểm (cm):',
                            // labelWidth: 130,
                            flex: 1,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Khổ kiểm (cm)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRecheck.width_met_check}',
                                hidden: '{isPklCmFieldHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'textfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'widthMetTxtRecheck',
                            // label: 'Khổ phiếu (cm):',
                            // labelWidth: 130,
                            flex: 1,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Khổ phiếu (cm)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRecheck.width_met}',
                                hidden: '{isPklCmFieldHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'textfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'widthYdsCheckTxtRecheck',
                            // label: 'Khổ kiểm (cm):',
                            // labelWidth: 130,
                            flex: 1,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Khổ kiểm (inch)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRecheck.width_yds_check}',
                                hidden: '{isPklInchFieldHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'textfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'widthYdsTxtRecheck',
                            // label: 'Khổ phiếu (cm):',
                            // labelWidth: 130,
                            flex: 1,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Khổ phiếu (inch)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRecheck.width_yds}',
                                hidden: '{isPklInchFieldHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                    ]
                },

                // not ios
                {
                    layout: 'hbox',
                    border: false,
                    width: '100%',
                    bind: {
                        hidden: '{isIos}'
                    },
                    items:[
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'mTxtRecheck',
                            // label: 'Dài kiểm (M):',
                            // labelWidth: 130,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Dài kiểm (M)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRecheck.met_check}',
                                hidden: '{isMetColumnHidden}',
                            },
                            stepValue: 0.1,
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
                            itemId: 'yTxtRecheck',
                            // label: 'Dài kiểm (Y):',
                            // labelWidth: 130,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Dài kiểm (Y)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRecheck.ydscheck}',
                                hidden: '{isYdsColumnHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        //////////////////////////////////
                        {
                            xtype: 'numberfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'mOriginTxtRecheck',
                            // label: 'Dài phiếu (M):',
                            // labelWidth: 130,
                            flex: 1,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Dài phiếu (M)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRecheck.met_origin}',
                                hidden: '{isMetColumnHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'yOriginTxtRecheck',
                            // label: 'Dài phiếu (Y):',
                            // labelWidth: 130,
                            flex: 1,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Dài phiếu (Y)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRecheck.ydsorigin}',
                                hidden: '{isYdsColumnHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                    ]
                },
                {
                    layout: 'hbox',
                    border: false,
                    width: '100%',
                    bind: {
                        hidden: '{isIos}'
                    },
                    items:[
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'canCheckTxtRecheck',
                            // label: 'Cân kiểm:',
                            // labelWidth: 130,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Cân kiểm',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRecheck.grossweight_check}',
                                hidden: '{isKgColumnHidden}',
                            },
                            stepValue: 0.1,
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
                            itemId: 'lbsCheckTxtRecheck',
                            // label: 'Lbs kiểm:',
                            // labelWidth: 130,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Lbs kiểm',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRecheck.grossweight_lbs_check}',
                                hidden: '{isLbsColumnHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        //////////////////////////////////
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'canTxtRecheck',
                            // label: 'Cân phiếu:',
                            // labelWidth: 130,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Cân phiếu',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRecheck.grossweight}',
                                hidden: '{isKgColumnHidden}',
                            },
                            stepValue: 0.1,
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
                            itemId: 'lbsTxtRecheck',
                            // label: 'Lbs phiếu:',
                            // labelWidth: 130,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Lbs phiếu',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRecheck.grossweight_lbs}',
                                hidden: '{isLbsColumnHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                    ]
                },
                {
                    layout: 'hbox',
                    border: false,
                    width: '100%',
                    bind: {
                        hidden: '{isIos}'
                    },
                    items:[
                        {
                            xtype: 'numberfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'widthMetCheckTxtRecheck',
                            // label: 'Khổ kiểm (cm):',
                            // labelWidth: 130,
                            flex: 1,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Khổ kiểm (cm)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRecheck.width_met_check}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'widthMetTxtRecheck',
                            // label: 'Khổ phiếu (cm):',
                            // labelWidth: 130,
                            flex: 1,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Khổ phiếu (cm)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objRecheck.width_met}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                    ]
                },
                {
                    layout: 'hbox',
                    border: false,
                    width: '100%',
                    items:[
                        {
                            xtype:'button',
                            text: 'Lưu',
                            margin: 5,
                            // padding: 5,
                            width: 100,
                            iconCls: 'x-fa fa-check',
                            itemId:'btnCheckRecheck',
                            ui: 'action',
                            focusable: false,
                            bind: {
                                disabled: '{!isobjRecheckSelected}'
                            },
                        },
                        {
                            flex: 1,
                        },
                        {
                            xtype:'button',
                            text: 'Xoá',
                            margin: 5,
                            // padding: 5,
                            width: 100,
                            iconCls: 'x-fa fa-trash',
                            itemId:'btnDeletePkl',
                            ui: 'action',
                            focusable: false,
                            bind: {
                                disabled: '{isBtnDeletePklHidden}',
                            },
                        },
                    ]
                },
            ]
        }
    ]
});