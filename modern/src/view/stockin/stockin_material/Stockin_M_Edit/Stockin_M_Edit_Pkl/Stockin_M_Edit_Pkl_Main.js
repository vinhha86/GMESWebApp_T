Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit_Pkl_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_M_Edit_Pkl_Main',
    id: 'Stockin_M_Edit_Pkl_Main',
    reference: 'Stockin_M_Edit_Pkl_Main',
    controller: 'Stockin_M_Edit_Pkl_MainController',
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
            layout: 'hbox',
            items:[
                {
                    xtype: 'combobox',
                    itemId: 'cbbox_pkl_stockindId',
                    // reference: 'cboorgto',
                    forceSelection: true,
                    editable: false,
                    readOnly: true,
                    // cls: 'notEditable',
                    bind:{
                        store:'{Stockin_d_Store}',
                        value:'{pkl_stockindId}'
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
                    itemId: 'cbbox_lotnumber',
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
                //     itemId: 'maPklFilter',
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
                //         value: '{maPklFilter}'
                //     },
                //     listeners: {
                //         keyup: 'onmaPklFilterKeyup',
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
                    itemId:'btnThemMoiPkl',
                    ui: 'action',
                    focusable: false
                },
            ]
        },
        {
            margin: 1,
            flex: 1,
            xtype: 'Stockin_M_Edit_Pkl',
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
                        // {
                        //     xtype: 'textfield',
                        //     margin: 1,
                        //     border: true,
                        //     cls: 'my-textfield',
                        //     itemId: 'lotnumberTxt',
                        //     // label: 'Màu:',
                        //     // labelWidth: 85,
                        //     flex: 1,
                        //     minWidth: 80,
                        //     // maxWidth: 130,
                        //     textAlign: 'left',
                        //     placeholder: 'Số LOT',
                        //     // editable: false,
                        //     // readOnly: true,
                        //     // clearable: false,
                        //     // cls: 'notEditable',
                        //     bind: {
                        //         value: '{objPkl.lotnumberTxt}'
                        //     },
                        //     listeners: {
                        //         change: 'onlotnumberTxtType',
                        //         focus: 'onFocus',
                        //         focusleave: 'onFocusLeave'
                        //     }
                        // },
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
                            bind: {
                                value: '{objPkl.packageidTxt}'
                            },
                            // listeners: {
                            //     keyup: 'onpackageidTxtKeyup',
                            //     buffer: 1000
                            // },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
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
                            itemId:'btnCheck',
                            ui: 'action',
                            focusable: false
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
                            itemId: 'mTxt',
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
                                value: '{objPkl.mTxt}',
                                // cls: '{yTxtCls}',
                                hidden: '{isPklMetFieldHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                // focusleave: 'onmTxtFocusleave',
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'mOriginTxt',
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
                                value: '{objPkl.mOriginTxt}',
                                hidden: '{isPklMetFieldHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave',
                            }
                        },
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'yTxt',
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
                                value: '{objPkl.yTxt}',
                                // cls: '{yTxtCls}',
                                hidden: '{isPklYdsFieldHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                // focusleave: 'onyTxtFocusleave',
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'yOriginTxt',
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
                                value: '{objPkl.yOriginTxt}',
                                hidden: '{isPklYdsFieldHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave',
                            }
                        },
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'canCheckTxt',
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
                                value: '{objPkl.grossweightCheckTxt}',
                                hidden: '{isPklKgFieldHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                // focusleave: 'oncanCheckTxtFocusleave',
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave',
                            }
                        },
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'canTxt',
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
                                value: '{objPkl.grossweightTxt}',
                                hidden: '{isPklKgFieldHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave',
                            }
                        },
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'lbsCheckTxt',
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
                                value: '{objPkl.grossweightLbsCheckTxt}',
                                hidden: '{isPklLbsFieldHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave',
                            }
                        },
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'lbsTxt',
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
                                value: '{objPkl.grossweightLbsTxt}',
                                hidden: '{isPklLbsFieldHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave',
                            }
                        },
                        {
                            xtype:'button',
                            iconCls: 'x-fa fa-print',
                            itemId:'btnPrintPkl',
                            ui: 'action',
                            margin: 1,
                            focusable: false,
                            bind: {
                                disabled: '{!isPklSelected}',
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
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'widthMetCheckTxt',
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
                                value: '{objPkl.widthMetCheckTxt}',
                                // hidden: '{isMetColumnHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                // focusleave: 'onwidthMetCheckTxtFocusleave',
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'widthMetTxt',
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
                                value: '{objPkl.widthMetTxt}',
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
                            iconCls: 'x-fa fa-trash',
                            itemId:'btnDeletePkl',
                            ui: 'action',
                            margin: 1,
                            focusable: false,
                            bind: {
                                disabled: '{!isPklSelected}',
                            },
                            // style: 'visibility: hidden;'
                        },
                    ]
                },
                {
                    layout: 'hbox',
                    border: false,
                    width: '100%',
                    items:[
                        {
                            xtype: 'textfield',
                            itemId: 'pklRowTxt',
                            // label: 'Mã hàng:',
                            // labelWidth: 85,
                            margin: 1,
                            // padding: 6,
                            flex: 1,
                            // width: '100%',
                            // minWidth: 80,
                            // maxWidth: 200,
                            textAlign: 'left',
                            placeholder: 'Dãy',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value:'{objPkl.pklRowTxt}'
                            },
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            itemId: 'pklSpaceTxt',
                            // label: 'Mã hàng:',
                            // labelWidth: 85,
                            margin: 1,
                            // padding: 6,
                            flex: 1,
                            // width: '100%',
                            // minWidth: 80,
                            // maxWidth: 200,
                            textAlign: 'left',
                            placeholder: 'Tầng',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value:'{objPkl.pklSpaceTxt}'
                            },
                            // stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            itemId: 'pklFloorTxt',
                            // label: 'Mã hàng:',
                            // labelWidth: 85,
                            margin: 1,
                            // padding: 6,
                            flex: 1,
                            // width: '100%',
                            // minWidth: 80,
                            // maxWidth: 200,
                            textAlign: 'left',
                            placeholder: 'Khoang',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value:'{objPkl.pklFloorTxt}'
                            },
                            // stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype:'button',
                            iconCls: 'x-fa fa-plus',
                            // itemId:'btnTestDeselect',
                            ui: 'action',
                            margin: 1,
                            style: 'visibility: hidden;'
                        },
                    ]
                },
            ]
        },

        // {
        //     xtype: 'container',
        //     layout: 'vbox',
        //     // hidden: true,
        //     items:[
        //         {
        //             layout: 'hbox',
        //             border: false,
        //             width: '100%',
        //             items:[
        //                 {
        //                     // xtype: 'textfield',
        //                     margin: 1,
        //                     border: true,
        //                     cls: 'my-textfield',
        //                     itemId: 'testfield',
        //                     // label: 'Màu:',
        //                     // labelWidth: 85,
        //                     flex: 1,
        //                     minWidth: 80,
        //                     // maxWidth: 130,
        //                     textAlign: 'left',
        //                     placeholder: 'testfield',
        //                     // editable: false,
        //                     // readOnly: true,
        //                     // clearable: false,
        //                     // cls: 'notEditable',
        //                     inputMask: /[0-9.]/,
        //                     bind: {
        //                         value: '{testfieldValue}',
        //                         // xtype: '{testfieldXtype}', // xtype ko bind dc
        //                     },
        //                 },
        //                 {
        //                     xtype:'button',
        //                     // text: 'Xác nhận',
        //                     // flex: 1,
        //                     // minWidth: 80,
        //                     // maxWidth: 130,
        //                     // width: 45,
        //                     margin: 1,
        //                     iconCls: 'x-fa fa-check',
        //                     itemId:'btnTestfield',
        //                     ui: 'action',
        //                     focusable: false
        //                 },
        //             ]
        //         },
        //     ]
        // }
    ]
});