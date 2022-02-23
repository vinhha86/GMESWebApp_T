Ext.define('GSmartApp.view.stockoutforcheck.Stockout_ForCheck_Edit_ToVai_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockout_ForCheck_Edit_ToVai_Main',
    itemId: 'Stockout_ForCheck_Edit_ToVai_Main',
    // reference: 'Stockout_ForCheck_Edit_ToVai_Main',
    controller: 'Stockout_ForCheck_Edit_ToVai_MainController',
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
                    itemId: 'cbbox_pkl_stockout_order_dId',
                    // reference: 'cboorgto',
                    editable: false,
                    readOnly: true,
                    // cls: 'notEditable',
                    bind:{
                        store:'{Stockout_order_d_store}',
                        value:'{pkl_stockout_order_dId}'
                    },
                    displayField: 'skucode',
                    valueField: 'id',
                    // label: 'Nơi giao:',
                    // disabled: true,
                    labelWidth: 85,
                    flex: 1,
                    padding: 2,
                    // hidden: true
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
                    displayField: 'lotnumber',
                    valueField: 'lotnumber',
                    // label: 'Nơi giao:',
                    // disabled: true,
                    labelWidth: 85,
                    flex: 1,
                    padding: 2,
                },
                {
                    xtype:'button',
                    // text: 'Xác nhận',
                    // flex: 1,
                    // minWidth: 80,
                    // maxWidth: 130,
                    // width: 45,
                    margin: 1,
                    iconCls: 'x-fa fa-plus',
                    itemId:'btnThemMoiPklToVai',
                    ui: 'action',
                    focusable: false,
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
                //     itemId:'btnTestReload',
                //     ui: 'action',
                //     focusable: false,
                // },
                
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
            ]
        },
        
        {
            margin: 1,
            flex: 1,
            xtype: 'Stockout_ForCheck_Edit_ToVai',
        },

        {
            xtype: 'container',
            // flex:1,
            // height: 100,
            // docked: 'bottom',
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
                            itemId: 'lotnumberTxt',
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
                                value: '{objPkl.lotnumber}'
                            },
                            listeners: {
                                change: 'onlotnumberTxtType',
                                focusenter: 'onlotnumberTxtAndpackageidTxtenter',
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
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
                                value: '{objPkl.packageid}'
                            },
                            listeners: {
                                focusleave: 'onlotnumberTxtAndpackageidTxtleave',
                                focusenter: 'onlotnumberTxtAndpackageidTxtenter',
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
                            itemId:'btnCheck',
                            ui: 'action',
                            bind: {
                                disabled: '{isbtnCheckDisabled}'
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
                            bind: {
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
                            bind: {
                                value: '{objPkl.yds_origin}',
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
                            xtype:'button',
                            iconCls: 'x-fa fa-plus',
                            itemId:'btnTest',
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
                        {
                            xtype:'button',
                            iconCls: 'x-fa fa-plus',
                            itemId:'btnTest',
                            ui: 'action',
                            margin: 1,
                            style: 'visibility: hidden;'
                        },
                    ]
                },
            ],
            
            // bind: { // ẩn nhập liệu nếu là vào từ view xuất kho
            //     hidden: '{isTabToVaiHidden}'
            // }
        }
    ]
});