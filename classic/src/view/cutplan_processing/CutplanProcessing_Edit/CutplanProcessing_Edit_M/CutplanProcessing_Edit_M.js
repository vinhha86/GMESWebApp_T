Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Edit.CutplanProcessing_Edit_M', {
	extend: 'Ext.container.Container',
	xtype: 'CutplanProcessing_Edit_M',
    itemId: 'CutplanProcessing_Edit_M',
    cls: 'CutplanProcessing_Edit_M',
	controller: 'CutplanProcessing_Edit_M_Controller',
	requires: ['Ext.form.field.Hidden', 'Ext.form.field.Date'],
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [
        {
            layout: 'hbox',
            width: '100%',
            items: [
                {
                    layout: 'hbox',
                    margin: 2,
                    flex : 1,
                    // width: '100%',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: "Lệnh SX",
                            // allowBlank: false,
                            itemId: 'pordercode',
                            blankText: 'Không được để trống',
                            bind: {
                                value: '{cutplanProcessing.pordercode}'
                            },
                            labelWidth: 80,
                            flex: 1,
                            enableKeyEvents : true,
                            listeners: {
                                keypress: 'onEnterPOrderSearch'
                            }
                        },
                        {
                            xtype:'button',
                            margin: '0 0 0 2',
                            itemId:'btnPlusPorder',
                            iconCls: 'x-fa fa-plus',
                        },
                        {
                            xtype:'button',
                            margin: '0 0 0 2',
                            itemId:'btnSearchPorder',
                            iconCls: 'x-fa fa-search',
                        }
                    ],
                },
                {
                    xtype:'combobox',
                    itemId: 'comboboxSku',
                    bind:{
                        store:'{Sku}',
                        value: '{cutplanProcessing.material_skuid_link}'
                    },
                    fieldLabel: 'Mã vải',
                    displayField: 'code',
                    valueField: 'id',
                    queryMode: 'local',
                    anyMatch: true,
                    // editable: false,
                    // readOnly: true,
                    // allowBlank: false,
                    margin: 2,
                    // cls: 'notEditable',
                    labelWidth: 80,
                    flex: 1,
                    // width: 250,
                },
                {
                    xtype: 'datefield',
                    margin: 2,
                    // cls: 'notEditable',
                    // reference: 'golivedate',
                    fieldLabel: "Ngày",
                    // allowBlank: false,
                    // itemId: 'golivedate',
                    bind: {
                        value: '{cutplanProcessing.processingdate}'
                    },
                    format: 'd/m/Y',
                    labelWidth: 80,
                    flex: 1,
                    // width: 250
                },
                {
                    xtype:'combobox',
                    // itemId:'orgid_from_link',
                    bind:{
                        store:'{OrgStore}',
                        value:'{cutplanProcessing.cutorgid_link}'
                    },
                    fieldLabel: 'Bàn cắt',
                    displayField: 'nameParent',
                    valueField: 'id',
                    queryMode: 'local',
                    anyMatch: true,
                    // editable: false,
                    // readOnly: true,
                    // allowBlank: false,
                    margin: 2,
                    // cls: 'notEditable',
                    labelWidth: 80,
                    flex: 1,
                    // width: 250
                },
            ]
        },
        {
            layout: 'hbox',
            width: '100%',
            items: [
                {
                    xtype:'combobox',
                    itemId:'comboboxColor',
                    bind:{
                        store:'{ColorStore}',
                        value: '{cutplanProcessing.colorid_link}'
                    },
                    fieldLabel: 'Màu SP',
                    displayField: 'name',
                    valueField: 'id',
                    queryMode: 'local',
                    anyMatch: true,
                    // editable: false,
                    // readOnly: true,
                    // allowBlank: false,
                    margin: 2,
                    // cls: 'notEditable',
                    labelWidth: 80,
                    flex: 1,
                    // width: 250,
                },
                {
                    xtype:'combobox',
                    itemId:'comboboxCutPlanRow',
                    bind:{
                        store:'{CutPlanRowStore}',
                        value:'{cutplanProcessing.cutplanrowid_link}'
                    },
                    fieldLabel: 'Sơ đồ cắt',
                    displayField: 'name',
                    valueField: 'id',
                    queryMode: 'local',
                    anyMatch: true,
                    // editable: false,
                    // readOnly: true,
                    // allowBlank: false,
                    margin: 2,
                    // cls: 'notEditable',
                    labelWidth: 80,
                    flex: 1,
                    // width: 250,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: "Dài bàn",
                    // allowBlank: false,
                    itemId: 'pordercode',
                    editable: false,
                    readOnly: true,
                    cls: 'notEditable',
                    fieldStyle: "text-align:right;",
                    // blankText: 'Không được để trống',
                    bind: {
                        value: '{cutPlanRow.dai_so_do}'
                    },
                    margin: 2,
                    labelWidth: 80,
                    flex: 1,
                    enableKeyEvents : true,
                },
                {
                    margin: 2,
                    flex: 1,
                },
            ]
        },
    ]
});