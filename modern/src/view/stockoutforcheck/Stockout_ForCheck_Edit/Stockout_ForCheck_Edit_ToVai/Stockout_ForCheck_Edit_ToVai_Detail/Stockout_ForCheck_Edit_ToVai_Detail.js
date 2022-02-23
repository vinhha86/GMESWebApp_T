Ext.define('GSmartApp.view.stockoutforcheck.stockout_forcheck_edit_tovai_detail.Stockout_ForCheck_Edit_ToVai_Detail', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockout_ForCheck_Edit_ToVai_Detail',
    itemId: 'Stockout_ForCheck_Edit_ToVai_Detail',
    cls: 'Stockout_ForCheck_Edit_ToVai_Detail',
    reference: 'Stockout_ForCheck_Edit_ToVai_Detail',
    controller: 'Stockout_ForCheck_Edit_ToVai_Detail_Controller',
    viewModel: {
        type: 'Stockout_ForCheck_Edit_ToVai_Detail_ViewModel'
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
                            itemId: 'packageidTxt',
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
                            tabIndex: 1,
                            bind: {
                                value: '{objPkl.packageid}',
                                editable: '{isEditable}',
                                readOnly: '{isReadOnly}',
                                cls: '{fieldClass}',
                            },
                            listeners: {
                                focusleave: 'onlotnumberTxtAndpackageidTxtleave',
                                focusenter: 'onlotnumberTxtAndpackageidTxtenter',
                                focus: 'onFocus'
                            },
                            stepValue: 0.1,
                        },
                        {
                            xtype: 'textfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'lotnumberTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Số LOT',
                            editable: false,
                            readOnly: true,
                            // clearable: false,
                            cls: 'notEditable',
                            tabIndex: null,
                            bind: {
                                value: '{objPkl.lotnumber}',
                                // editable: '{isEditable}',
                                // readOnly: '{isReadOnly}',
                                // cls: '{fieldClass}',
                            },
                            listeners: {
                                change: 'onlotnumberTxtType',
                                focusenter: 'onlotnumberTxtAndpackageidTxtenter',
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
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
                            // itemId: 'mTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Dài kiểm (M)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            tabIndex: 1,
                            bind: {
                                value: '{objPkl.met_check}',
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
                            // itemId: 'yTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Dài kiểm (Y)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            tabIndex: 1,
                            bind: {
                                value: '{objPkl.yds_check}',
                                hidden: '{isYdsColumnHidden}',
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
                            // itemId: 'mTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Dài phiếu (M)',
                            editable: false,
                            readOnly: true,
                            // clearable: false,
                            cls: 'notEditable',
                            tabIndex: null,
                            bind: {
                                // value: '{objPkl.met_origin}',
                                value: '{objPkl.met_origin}',
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
                            // itemId: 'yTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Dài phiếu (Y)',
                            editable: false,
                            readOnly: true,
                            // clearable: false,
                            cls: 'notEditable',
                            tabIndex: null,
                            bind: {
                                // value: '{objPkl.yds_origin}',
                                value: '{objPkl.yds_origin}',
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
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            // itemId: 'widthMetCheckTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Khổ kiểm (cm)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            tabIndex: 1,
                            bind: {
                                value: '{objPkl.width_check}',
                                // hidden: '{isMetColumnHidden}',
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
                            // itemId: 'widthMetCheckTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Khổ phiếu (cm)',
                            editable: false,
                            readOnly: true,
                            // clearable: false,
                            cls: 'notEditable',
                            tabIndex: null,
                            bind: {
                                // value: '{objPkl.width_origin}',
                                value: '{objPkl.width_origin}',
                                // hidden: '{isMetColumnHidden}',
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
                            // itemId: 'yTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Vải lỗi (M)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            tabIndex: 1,
                            bind: {
                                value: '{objPkl.met_err}',
                                // hidden: '{isYdsColumnHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            margin: 1,
                            flex: 1,
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
                            // itemId: 'mTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Dài kiểm (M)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            tabIndex: 1,
                            bind: {
                                value: '{objPkl.met_check}',
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
                            // itemId: 'yTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Dài kiểm (Y)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            tabIndex: 1,
                            bind: {
                                value: '{objPkl.yds_check}',
                                hidden: '{isYdsColumnHidden}',
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
                            // itemId: 'mTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Dài phiếu (M)',
                            editable: false,
                            readOnly: true,
                            // clearable: false,
                            cls: 'notEditable',
                            tabIndex: null,
                            bind: {
                                // value: '{objPkl.met_origin}',
                                value: '{objPkl.met_origin}',
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
                            // itemId: 'yTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Dài phiếu (Y)',
                            editable: false,
                            readOnly: true,
                            // clearable: false,
                            cls: 'notEditable',
                            tabIndex: null,
                            bind: {
                                // value: '{objPkl.yds_origin}',
                                value: '{objPkl.yds_origin}',
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
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            // itemId: 'widthMetCheckTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Khổ kiểm (cm)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            tabIndex: 1,
                            bind: {
                                value: '{objPkl.width_check}',
                                // hidden: '{isMetColumnHidden}',
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
                            // itemId: 'widthMetCheckTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Khổ phiếu (cm)',
                            editable: false,
                            readOnly: true,
                            // clearable: false,
                            cls: 'notEditable',
                            tabIndex: null,
                            bind: {
                                value: '{objPkl.width_origin}',
                                // hidden: '{isMetColumnHidden}',
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
                            // itemId: 'yTxt',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Vải lỗi (M)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            tabIndex: 1,
                            bind: {
                                value: '{objPkl.met_err}',
                                // hidden: '{isYdsColumnHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            margin: 1,
                            flex: 1,
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
                            width: 100,
                            iconCls: 'x-fa fa-check',
                            itemId:'btnCheck',
                            ui: 'action',
                            // bind: {
                            //     disabled: '{isbtnCheckDisabled}'
                            // }
                        },   
                        {
                            flex: 1,
                        },
                        // {
                        //     xtype:'button',
                        //     text: 'Xoá',
                        //     margin: 5,
                        //     width: 100,
                        //     iconCls: 'x-fa fa-trash',
                        //     itemId:'btnDeletePklToVai',
                        //     ui: 'action',
                        //     focusable: false,
                        //     bind: {
                        //         disabled: '{isBtnDeletePklHidden}',
                        //     },
                        //     // style: 'visibility: hidden;'
                        // },
                    ]
                },
            ],
        }
    ]
});