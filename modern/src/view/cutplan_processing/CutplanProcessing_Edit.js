Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Edit', {
    extend: 'Ext.form.Panel',
    xtype: 'cutplan_processing_edit',
    id: 'cutplan_processing_edit',
    reference: 'cutplan_processing_edit',
    viewModel: {
        type: 'CutplanProcessing_Edit_ViewModel'
    },
    controller: 'CutplanProcessing_Edit_Controller',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    requires: [
        'Ext.Toast'
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
    '->',
    {
        xtype:'button',
        iconCls: 'x-fa fa-save',
        itemId:'btnLuu',
        ui: 'action',
    }],

    items:[
        {
            xtype: 'tabpanel',
            // height: '100%',
            // width: '100%',
            flex: 1,
            items: [
                {
                    title: 'Thông tin chung',
                    xtype: 'container',
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
                                        // flex: 1,
                                        defaults: {
                                            margin: 1
                                        },
                                        items: [{
                                            xtype: 'datefield',
                                            label: 'Ngày:',
                                            labelWidth: 70,
                                            flex: 1,
                                            textAlign: 'left',
                                            dateFormat : 'd/m/y',
                                            editable: false,
                                            readOnly: true,
                                            // cls: 'notEditable',
                                            bind: {
                                                value: '{cutplanProcessing.processingdate}'
                                            }
                                        },{
                                            xtype: 'combobox',
                                            // reference: 'cboorgto',
                                            editable: false,
                                            readOnly: true,
                                            // cls: 'notEditable',
                                            bind:{
                                                store:'{OrgStore}',
                                                value:'{cutplanProcessing.cutorgid_link}'
                                            },
                                            displayField: 'name',
                                            valueField: 'id',
                                            label: 'Bàn cắt:',
                                            // disabled: true,
                                            labelWidth: 60,
                                            flex: 1,
                                        }]
                                    },
                                    {
                                        layout: 'hbox',
                                        // flex: 1,
                                        defaults: {
                                            margin: 1
                                        },
                                        items: [{
                                            xtype: 'textfield',
                                            label: 'Lệnh SX:',
                                            labelWidth: 70,
                                            flex: 1,
                                            textAlign: 'left',
                                            // editable: false,
                                            // readOnly: true,
                                            clearable: false,
                                            // cls: 'notEditable',
                                            bind: {
                                                value: '{cutplanProcessing.pordercode}'
                                            }
                                        },{
                                            xtype:'button',
                                            // text: 'Xác nhận xuất',
                                            margin: 2,
                                            itemId:'btnPlusPorder',
                                            ui: 'action',
                                            iconCls: 'x-fa fa-plus',
                                        },{
                                            xtype:'button',
                                            // text: 'Xác nhận xuất',
                                            margin: 2,
                                            itemId:'btnSearchPorder',
                                            ui: 'action',
                                            iconCls: 'x-fa fa-search',
                                        }]
                                    },
                                    {
                                        layout: 'hbox',
                                        // flex: 1,
                                        defaults: {
                                            margin: 1
                                        },
                                        items: [{
                                            xtype: 'combobox',
                                            itemId: 'comboboxSku',
                                            // reference: 'cboorgto',
                                            editable: false,
                                            readOnly: true,
                                            // cls: 'notEditable',
                                            bind:{
                                                store:'{Sku}',
                                                value: '{cutplanProcessing.material_skuid_link}'
                                            },
                                            displayField: 'code',
                                            valueField: 'id',
                                            label: 'Mã vải:',
                                            // disabled: true,
                                            labelWidth: 70,
                                            flex: 2,
                                        }]
                                    },
                                    {
                                        layout: 'hbox',
                                        // flex: 1,
                                        defaults: {
                                            margin: 1
                                        },
                                        items: [{
                                            xtype: 'combobox',
                                            itemId: 'comboboxColor',
                                            editable: false,
                                            readOnly: true,
                                            // cls: 'notEditable',
                                            bind:{
                                                store:'{listcolorData}',
                                                value: '{cutplanProcessing.colorid_link}'
                                            },
                                            displayField: 'name',
                                            valueField: 'id',
                                            label: 'Màu SP:',
                                            // disabled: true,
                                            labelWidth: 70,
                                            flex: 2,
                                        }]
                                    },
                                    {
                                        layout: 'hbox',
                                        // flex: 1,
                                        defaults: {
                                            margin: 1
                                        },
                                        items: [{
                                            xtype: 'combobox',
                                            itemId: 'comboboxCutPlanRow',
                                            editable: false,
                                            readOnly: true,
                                            // cls: 'notEditable',
                                            bind:{
                                                store:'{CutPlanRowStore}',
                                                value:'{cutplanProcessing.cutplanrowid_link}'
                                            },
                                            displayField: 'name',
                                            valueField: 'id',
                                            label: 'Sơ đồ cắt:',
                                            // disabled: true,
                                            labelWidth: 70,
                                            flex: 2,
                                        },{
                                            xtype: 'textfield',
                                            label: 'Dài bàn:',
                                            labelWidth: 60,
                                            flex: 1,
                                            textAlign: 'right',
                                            editable: false,
                                            readOnly: true,
                                            cls: 'notEditable',
                                            clearable: false,
                                            bind: {
                                                value: '{cutPlanRow.dai_so_do}'
                                            }
                                        }]
                                    },

                                    // {
                                    //     layout: 'hbox',
                                    //     // flex: 1,
                                    //     defaults: {
                                    //         margin: 1
                                    //     },
                                    //     items: [{
                                    //         xtype: 'textfield',
                                    //         itemId: 'testFilter',
                                    //         label: 'filter:',
                                    //         labelWidth: 70,
                                    //         flex: 1,
                                    //         textAlign: 'left',
                                    //         // editable: false,
                                    //         // readOnly: true,
                                    //         clearable: false,
                                    //         listeners: {
                                    //             keyup: 'onTestFilterKeyup',
                                    //             buffer: 500
                                    //         }
                                    //     }]
                                    // },
                                ]
                            }
                        ]
                },
                {
                    title: 'Chi tiết bàn cắt',
                    margin: 1,
                    flex: 1,
                    layout: 'vbox',
                    items: [{
                        layout: 'vbox',
                        // flex: 1,
                        items: [
                            {
                                layout: 'hbox',
                                // flex: 1,
                                defaults: {
                                    margin: 1
                                },
                                items: [{
                                    xtype: 'textfield',
                                    itemId: 'lotnumber',
                                    label: 'Số Lot:',
                                    labelWidth: 55,
                                    flex: 1,
                                    textAlign: 'left',
                                    // editable: false,
                                    // readOnly: true,
                                    clearable: false,
                                    // cls: 'notEditable',
                                    bind: {
                                        value: '{cutplanProcessingDObj.lotnumber}'
                                    },
                                },{
                                    xtype: 'numberfield',
                                    itemId: 'packageid',
                                    label: 'Số cây:',
                                    labelWidth: 55,
                                    flex: 1,
                                    textAlign: 'left',
                                    // editable: false,
                                    // readOnly: true,
                                    clearable: false,
                                    // cls: 'notEditable',
                                    bind: {
                                        value: '{cutplanProcessingDObj.packageid}'
                                    },
                                },{
                                    xtype: 'numberfield',
                                    itemId: 'met',
                                    label: 'Dài cây:',
                                    labelWidth: 60,
                                    flex: 1,
                                    textAlign: 'left',
                                    editable: false,
                                    readOnly: true,
                                    clearable: false,
                                    cls: 'notEditable',
                                    bind: {
                                        value: '{cutplanProcessingDObj.met}'
                                    }
                                },]
                            },
                            {
                                layout: 'hbox',
                                // flex: 1,
                                // defaults: {
                                //     margin: 1
                                // },
                                items: [{
                                    layout: 'vbox',
                                    flex: 1,
                                    defaults: {
                                        // margin: '1 1 0 1'
                                        margin: '1 1 0 1',
                                    },
                                    items: [{
                                        xtype: 'numberfield',
                                        itemId: 'la_vai',
                                        label: 'Số lá:',
                                        labelWidth: 55,
                                        flex: 1,
                                        textAlign: 'left',
                                        // editable: false,
                                        // readOnly: true,
                                        clearable: false,
                                        // cls: 'notEditable',
                                        bind: {
                                            value: '{cutplanProcessingDObj.la_vai}'
                                        },
                                    },
                                    {
                                        xtype: 'numberfield',
                                        itemId: 'tieu_hao',
                                        label: 'T/Hao:',
                                        labelWidth: 55,
                                        flex: 1,
                                        textAlign: 'left',
                                        editable: false,
                                        readOnly: true,
                                        clearable: false,
                                        cls: 'notEditable',
                                        bind: {
                                            value: '{cutplanProcessingDObj.tieu_hao}'
                                        }
                                    },                                    

                                ]
                                },{
                                    layout: 'vbox',
                                    flex: 1,
                                    defaults: {
                                        margin: '1 1 0 1',
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            itemId: 'con_lai',
                                            label: 'Đ/tấm:',
                                            labelWidth: 55,
                                            flex: 1,
                                            textAlign: 'left',
                                            // editable: false,
                                            // readOnly: true,
                                            clearable: false,
                                            // cls: 'notEditable',
                                            bind: {
                                                value: '{cutplanProcessingDObj.con_lai}'
                                            },                                 
                                        },
                                        {
                                            xtype: 'numberfield',
                                            itemId: 'ps',
                                            label: 'P/S:',
                                            labelWidth: 55,
                                            flex: 1,
                                            textAlign: 'left',
                                            editable: false,
                                            readOnly: true,
                                            clearable: false,
                                            cls: 'notEditable',
                                            bind: {
                                                value: '{cutplanProcessingDObj.ps}'
                                            }
                                        }
                                    ]
                                },{
                                    layout: 'vbox',
                                    flex     : 1,
                                    defaults : {
                                        flex : 1
                                    },
                                    items: [{
                                        xtype:'button',
                                        text: 'Thêm',
                                        margin: 2,
                                        itemId:'btnAddCutplanProcessingD',
                                        ui: 'action',
                                        iconCls: 'x-fa fa-check',
                                        bind: {
                                            disabled: '{isBtnAddCutplanProcessingDDisabled}'
                                        }
                                    }]
                                }]
                            },
                        ]
                    },{
                        margin: 1,
                        flex: 1,
                        xtype: 'CutplanProcessing_Edit_D',
                    }]
                }
            ]
        }
    ]
});