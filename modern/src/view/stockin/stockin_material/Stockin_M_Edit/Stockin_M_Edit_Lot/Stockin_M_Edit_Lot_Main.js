Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit_Lot_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_M_Edit_Lot_Main',
    id: 'Stockin_M_Edit_Lot_Main',
    reference: 'Stockin_M_Edit_Lot_Main',
    controller: 'Stockin_M_Edit_Lot_MainController',
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
                    itemId: 'cbbox_lot_stockindId',
                    // reference: 'cboorgto',
                    editable: false,
                    readOnly: true,
                    // cls: 'notEditable',
                    forceSelection: true,
                    bind:{
                        store:'{Stockin_d_Store}',
                        value:'{lot_stockindId}'
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
                    xtype: 'textfield',
                    itemId: 'maLotFilter',
                    // label: 'Mã hàng:',
                    // labelWidth: 85,
                    margin: '5 5 1 5',
                    // padding: 6,
                    // flex: 1,
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
                        value: '{maLotFilter}'
                    },
                    listeners: {
                        keyup: 'onmaLotFilterKeyup',
                        buffer: 500
                    }
                },
            ]
        },
        {
            margin: 1,
            flex: 2,
            xtype: 'Stockin_M_Edit_Lot',
        },
        {
            margin: 1,
            flex: 1,
            xtype: 'Stockin_M_Edit_Space',
            hidden: true
        },
        {
            layout: 'hbox',
            // flex: 1,
            items:[
                {
                    xtype: 'textfield',
                    // itemId: 'maNPLFilter',
                    // label: 'Mã hàng:',
                    // labelWidth: 85,
                    margin: 1,
                    // padding: 6,
                    flex: 1,
                    // width: '100%',
                    // minWidth: 80,
                    // maxWidth: 200,
                    textAlign: 'left',
                    placeholder: 'Danh sách khoang',
                    editable: false,
                    readOnly: true,
                    clearable: false,
                    cls: 'notEditable',
                    bind: {
                        // value:'{spacesString}'
                        value: '{selectedLotRecord.stockinLotSpace}'
                    },
                },
                {
                    xtype:'button',
                    iconCls: 'x-fa fa-edit',
                    itemId:'btnLotEditSpace',
                    ui: 'action',
                    margin: 1,
                },    
            ]
        },
        {
            layout: 'hbox',
            // flex: 1,
            items:[
                {
                    xtype: 'textfield',
                    // itemId: 'maNPLFilter',
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
                        value:'{lotRow}'
                    },
                    listeners: {
                        focus: 'onFocus',
                        focusleave: 'onFocusLeave'
                    }
                },
                {
                    xtype: 'numberfield',
                    // itemId: 'maNPLFilter',
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
                        value:'{lotSpace}'
                    },
                    // stepValue: 0.1,
                    listeners: {
                        focus: 'onFocus',
                        focusleave: 'onFocusLeave'
                    }
                },
                {
                    xtype: 'numberfield',
                    // itemId: 'maNPLFilter',
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
                        value:'{lotFloor}'
                    },
                    // stepValue: 0.1,
                    listeners: {
                        focus: 'onFocus',
                        focusleave: 'onFocusLeave'
                    }
                },
                {
                    xtype: 'numberfield',
                    // itemId: 'maNPLFilter',
                    // label: 'Mã hàng:',
                    // labelWidth: 85,
                    margin: 1,
                    // padding: 6,
                    flex: 1,
                    // width: '100%',
                    // minWidth: 80,
                    // maxWidth: 200,
                    textAlign: 'left',
                    placeholder: 'SL Cây',
                    // editable: false,
                    // readOnly: true,
                    // clearable: false,
                    // cls: 'notEditable',
                    bind: {
                        value:'{lotAmount}'
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
                    itemId:'btnLotAddSpace',
                    ui: 'action',
                    margin: 1,
                },    
            ]
        },
    ]
});