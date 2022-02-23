Ext.define('GSmartApp.view.stockout.stockout_material.stockout_m_list.stockout_m_edit.stockout_m_edit_pkl_rip.Stockout_M_Edit_Pkl_Rip_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockout_M_Edit_Pkl_Rip_Main',
    itemId: 'Stockout_M_Edit_Pkl_Rip_Main',
    reference: 'Stockout_M_Edit_Pkl_Rip_Main',
    controller: 'Stockout_M_Edit_Pkl_Rip_MainController',
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
                    itemId: 'cbbox_pklRip_stockoutdId',
                    // reference: 'cboorgto',
                    editable: false,
                    readOnly: true,
                    // cls: 'notEditable',
                    bind:{
                        store:'{Stockout_d}',
                        value:'{pklRip_stockoutdId}'
                    },
                    displayField: 'skucode',
                    valueField: 'id',
                    // label: 'Nơi giao:',
                    // disabled: true,
                    labelWidth: 85,
                    flex: 1,
                    padding: 2,
                },
                {
                    xtype: 'textfield',
                    itemId: 'maPklRipFilter',
                    // label: 'Mã hàng:',
                    // labelWidth: 85,
                    margin: '5 5 1 5',
                    // padding: 6,
                    flex: 1,
                    // width: '100%',
                    // minWidth: 80,
                    // maxWidth: 200,
                    textAlign: 'left',
                    placeholder: 'Tìm kiếm nhanh ... (theo lot)',
                    // editable: false,
                    // readOnly: true,
                    clearable: false,
                    cls: 'searchField',
                    bind: {
                        value: '{maPklRipFilter}'
                    },
                    listeners: {
                        keyup: 'onmaPklRipFilterKeyup',
                        buffer: 500
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
                    iconCls: 'x-fa fa-plus',
                    itemId:'btnThemMoiPklRip',
                    ui: 'action',
                    focusable: false,
                },
            ]
        },
        
        {
            margin: 1,
            flex: 1,
            xtype: 'Stockout_M_Edit_Pkl_Rip',
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
                                value: '{objRip.lotnumber}'
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
                                value: '{objRip.packageid}'
                            },
                            listeners: {
                                focusleave: 'onlotnumberTxtAndpackageidTxtRipleave',
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
                            itemId:'btnCheckRip',
                            ui: 'action',
                            bind: {
                                disabled: '{!isobjRipSelected}'
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