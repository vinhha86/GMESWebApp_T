Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit_Pkl_Recheck_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_M_Edit_Pkl_Recheck_Main',
    id: 'Stockin_M_Edit_Pkl_Recheck_Main',
    reference: 'Stockin_M_Edit_Pkl_Recheck_Main',
    controller: 'Stockin_M_Edit_Pkl_Recheck_MainController',
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
            // flex:1,
            // height: 100,
            // docked: 'bottom',
            layout: 'hbox',
            items:[
                {
                    xtype: 'combobox',
                    itemId: 'cbbox_pklRecheck_stockindId',
                    // reference: 'cboorgto',
                    forceSelection: true,
                    editable: false,
                    readOnly: true,
                    // cls: 'notEditable',
                    bind:{
                        store:'{Stockin_d_Store}',
                        value:'{pklRecheck_stockindId}'
                    },
                    displayField: 'skuCode',
                    valueField: 'id',
                    // label: 'Nơi giao:',
                    // disabled: true,
                    labelWidth: 85,
                    flex: 1,
                    padding: 2,
                },
                {
                    xtype: 'combobox',
                    itemId: 'cbbox_lotnumber_recheck',
                    anyMatch: true,
                    minChars: 1,
                    queryMode: 'local',
                    forceSelection: true,
                    // editable: false,
                    // readOnly: true,
                    // cls: 'notEditable',
                    bind:{
                        store:'{StockinLotStore}',
                        // value:'{cbbox_lotnumber_value}'
                    },
                    displayField: 'lot_number',
                    valueField: 'lot_number',
                    // label: 'Nơi giao:',
                    // disabled: true,
                    labelWidth: 85,
                    flex: 1,
                    padding: 2,
                },
                // {
                //     xtype: 'textfield',
                //     itemId: 'maPklRecheckFilter',
                //     // label: 'Mã hàng:',
                //     // labelWidth: 85,
                //     margin: '5 5 1 5',
                //     // padding: 6,
                //     flex: 1,
                //     // width: '100%',
                //     // minWidth: 80,
                //     // maxWidth: 200,
                //     textAlign: 'left',
                //     placeholder: 'Tìm kiếm nhanh ... (theo lot)',
                //     // editable: false,
                //     // readOnly: true,
                //     clearable: false,
                //     cls: 'searchField',
                //     bind: {
                //         value: '{maPklRecheckFilter}'
                //     },
                //     listeners: {
                //         keyup: 'onmaPklRecheckFilterKeyup',
                //         buffer: 500
                //     }
                // },
                {
                    xtype:'button',
                    // text: 'Xác nhận',
                    // flex: 1,
                    // minWidth: 80,
                    // maxWidth: 130,
                    // width: 45,
                    margin: 1,
                    iconCls: 'x-fa fa-plus',
                    itemId:'btnThemMoiPklRecheck',
                    ui: 'action',
                    focusable: false
                },
            ]
        },
        
        {
            margin: 1,
            flex: 1,
            xtype: 'Stockin_M_Edit_Pkl_Recheck',
        },
        {
            xtype: 'container',
            layout: 'vbox',
            hidden: true,
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
                            itemId: 'lotnumberTxtRecheck',
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
                                // value: '{lotnumberTxtRecheck}',
                                value: '{objRecheck.lotnumber}'
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
                            itemId: 'packageidTxtRecheck',
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
                                // value: '{packageidTxtRecheck}'
                                value: '{objRecheck.packageid}'
                            },
                            listeners: {
                                focusleave: 'onlotnumberTxtAndpackageidTxtRecheckleave',
                                focus: 'onFocus'
                            },
                            stepValue: 0.1,
                        },
                        {
                            xtype:'button',
                            // text: 'Xác nhận',
                            // flex: 1,
                            // minWidth: 80,
                            // maxWidth: 130,
                            // width: 45,
                            margin: 1,
                            iconCls: 'x-fa fa-check',
                            itemId:'btnCheckRecheck',
                            ui: 'action',
                            bind: {
                                disabled: '{!isobjRecheckSelected}'
                            },
                        },   
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
                            itemId: 'mTxtRecheck',
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
                            bind: {
                                // value: '{mTxtRecheck}',
                                value: '{objRecheck.met_check}',
                                // cls: '{yTxtCls}',
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
                            bind: {
                                // value: '{yTxtRecheck}',
                                value: '{objRecheck.ydscheck}',
                                // cls: '{yTxtCls}',
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
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'mOriginTxtRecheck',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Dài phiếu (M)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                // value: '{mOriginTxtRecheck}',
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
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Dài phiếu (Y)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                // value: '{yOriginTxtRecheck}',
                                value: '{objRecheck.ydsorigin}',
                                hidden: '{isYdsColumnHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype:'button',
                            iconCls: 'x-fa fa-plus',
                            // itemId:'',
                            ui: 'action',
                            margin: 1,
                            style: 'visibility: hidden;'
                        },
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
                            itemId: 'canCheckTxtRecheck',
                            // label: 'Màu:',
                            // labelWidth: 85,
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
                                // value: '{grossweightCheckTxtRecheck}',
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
                            itemId: 'canTxtRecheck',
                            // label: 'Màu:',
                            // labelWidth: 85,
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
                                // value: '{grossweightTxtRecheck}',
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
                            itemId: 'lbsCheckTxtRecheck',
                            // label: 'Màu:',
                            // labelWidth: 85,
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
                                // value: '{grossweightCheckTxtRecheck}',
                                value: '{objRecheck.grossweight_lbs_check}',
                                hidden: '{isLbsColumnHidden}',
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
                            // label: 'Màu:',
                            // labelWidth: 85,
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
                                // value: '{grossweightTxtRecheck}',
                                value: '{objRecheck.grossweight_lbs}',
                                hidden: '{isLbsColumnHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype:'button',
                            iconCls: 'x-fa fa-plus',
                            // itemId:'',
                            ui: 'action',
                            margin: 1,
                            style: 'visibility: hidden;'
                        },
                    ]
                },
                {
                    layout: 'hbox',
                    border: false,
                    width: '100%',
                    items:[
                        // {
                        //     xtype: 'numberfield',
                        //     border: true,
                        //     cls: 'my-textfield',
                        //     margin: 1,
                        //     itemId: 'widthYdsCheckTxtRecheck',
                        //     // label: 'Màu:',
                        //     // labelWidth: 85,
                        //     flex: 1,
                        //     // maxWidth: 130,
                        //     textAlign: 'left',
                        //     placeholder: 'Khổ kiểm (Y)',
                        //     // editable: false,
                        //     // readOnly: true,
                        //     // clearable: false,
                        //     // cls: 'notEditable',
                        //     bind: {
                        //         // value: '{widthYdsCheckTxtRecheck}',
                        //         value: '{objRecheck.width_yds_check}',
                        //         hidden: '{isYdsColumnHidden}',
                        //     },
                        //     stepValue: 0.1,
                        // },
                        // {
                        //     xtype: 'numberfield',
                        //     border: true,
                        //     cls: 'my-textfield',
                        //     margin: 1,
                        //     itemId: 'widthYdsTxtRecheck',
                        //     // label: 'Màu:',
                        //     // labelWidth: 85,
                        //     flex: 1,
                        //     // maxWidth: 130,
                        //     textAlign: 'left',
                        //     placeholder: 'Khổ phiếu (Y)',
                        //     // editable: false,
                        //     // readOnly: true,
                        //     // clearable: false,
                        //     // cls: 'notEditable',
                        //     bind: {
                        //         // value: '{widthYdsTxtRecheck}',
                        //         value: '{objRecheck.width_yds}',
                        //         hidden: '{isYdsColumnHidden}',
                        //     },
                        //     stepValue: 0.1,
                        // },
                        {
                            xtype: 'numberfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'widthMetCheckTxtRecheck',
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
                            bind: {
                                // value: '{widthMetCheckTxtRecheck}',
                                value: '{objRecheck.width_met_check}',
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
                            itemId: 'widthMetTxtRecheck',
                            // label: 'Màu:',
                            // labelWidth: 85,
                            flex: 1,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Khổ phiếu (cm)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                // value: '{widthMetTxtRecheck}',
                                value: '{objRecheck.width_met}',
                                // hidden: '{isMetColumnHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype:'button',
                            iconCls: 'x-fa fa-plus',
                            // itemId:'',
                            ui: 'action',
                            margin: 1,
                            style: 'visibility: hidden;'
                        },
                    ]
                },
            ]
        }
    ]
});