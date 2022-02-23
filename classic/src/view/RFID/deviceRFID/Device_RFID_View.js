Ext.define('GSmartApp.view.RFID.deviceRFID.Device_RFID_View', {
    extend: 'Ext.Panel',
    xtype: 'Device_RFID_View',
    controller: 'Device_RFID_ViewController',
    viewModel: {
        type: 'Device_RFID_ViewModel'
    },
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [{
        layout: {
            type: 'vbox',
            pack: 'start',
            align: 'stretch'
        },
        width: 400,
        border: true,
        items: [{
            margin: 5,
            xtype: 'form',
            reference: 'formDeviceSearch',
            items: [{
                width: 385,
                xtype: 'combobox',
                fieldLabel: GSmartApp.Locales.cuahang_kho[GSmartApp.Locales.currentLocale],
                store: 'OrgStore',
                displayField: 'name',
                valueField: 'id',
                queryMode: 'local',
				anyMatch: true,
                name: 'org_governid_link'
            }, {
                width: 385,
                xtype: 'textfield',
                name: 'search',
                reference: 'search',
                fieldLabel: GSmartApp.Locales.ma_thietbi[GSmartApp.Locales.currentLocale]
            }, {
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [{
                    flex: 1
                }, {
                    width: 100,
                    xtype: 'button',
                    text: GSmartApp.Locales.btn_loc[GSmartApp.Locales.currentLocale],
                    iconCls: 'x-fa fa-filter',
                    handler: 'onSearch'
                }]
            }]
        }, {
            flex: 1,
            layout: 'fit',
            xtype: 'form',
            items: [{
                title: GSmartApp.Locales.thongtin_thietbi[GSmartApp.Locales.currentLocale],
                xtype: 'gridpanel',
                store: 'DeviceTreeStore',
                //collapsible: true,
                useArrows: true,
                rootVisible: false,
                hideHeaders: true,
                features: [{
                    ftype: 'grouping',
                    groupHeaderTpl: '{name}'
                }],
                columns: [{
                    flex: 1,
                    sortable: true,
                    dataIndex: 'name'
                }, {
                    width: 40,
                    xtype: 'templatecolumn',
                    dataIndex: 'status',
                    tpl: '<tpl if="status == 1"><i class="fa fa-circle" style="color: blue;"></i><tpl elseif ="status == 0"><i class="fa fa-circle" style="color: red;"></i><tpl else><i class="fa fa-lock"></i></tpl>'
                }, {
                    xtype: 'actioncolumn',
                    width: 40,
                    menuDisabled: true,
                    sortable: false,
                    items: [{
                        iconCls: 'x-fa fa fa-bars',
                        handler: 'onMenu'
                    }]
                }],
                listeners: {
                    itemclick: 'onDeviceClick'
                }
            }]
        }]
    }, {
        flex: 1,
        layout: {
            type: 'vbox',
            pack: 'start',
            align: 'stretch'
        },
        items: [{
            margin: 5,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [{
                width: 120,
                xtype: 'button',
                text: GSmartApp.Locales.btn_themmoi[GSmartApp.Locales.currentLocale],
                iconCls: 'x-fa fa-plus',
                handler: 'onCreate'
            }, {
                flex: 1
            }, {
                width: 100,
                xtype: 'button',
                text: GSmartApp.Locales.btn_luu[GSmartApp.Locales.currentLocale],
                iconCls: 'x-fa fa-save',
                handler: 'onSave'
            }]
        }, {
            html: '<hr>'
        }, {
            margin: '0 5 0 5',
            xtype: 'form',
            reference: 'formDevice',
            items: [{
                xtype: 'hiddenfield',
                name: 'id'
            }, {
                xtype: 'hiddenfield',
                name: 'parent_id'
            }, {
                width: 500,
                xtype: 'combobox',
                fieldLabel: GSmartApp.Locales.nhom_thietbi[GSmartApp.Locales.currentLocale],
                store: 'DeviceGroupStore',
                displayField: 'name',
                valueField: 'id',
                name: 'group_id'
            }, {
                width: 500,
                xtype: 'textfield',
                name: 'code',
                reference: 'code',
                allowBlank: false,
                required: true,
                fieldLabel: GSmartApp.Locales.ma_thietbi[GSmartApp.Locales.currentLocale]
            }, {
                width: 500,
                xtype: 'textfield',
                name: 'name',
                reference: 'name',
                allowBlank: false,
                required: true,
                fieldLabel: GSmartApp.Locales.ma_thietbi[GSmartApp.Locales.currentLocale]
            }, {
                width: 500,
                xtype: 'combobox',
                fieldLabel: GSmartApp.Locales.loai_thietbi[GSmartApp.Locales.currentLocale],
                store: 'DeviceTypeStore',
                displayField: 'name',
                valueField: 'id',
                name: 'type'
            }, {
                width: 500,
                xtype: 'combobox',
                fieldLabel: GSmartApp.Locales.cuahang_kho[GSmartApp.Locales.currentLocale],
                store: 'OrgStore',
                displayField: 'name',
                valueField: 'id',
                queryMode: 'local',
				anyMatch: true,
                name: 'org_governid_link'
            }, {
                width: 500,
                xtype: 'textareafield',
                name: 'extrainfo',
                reference: 'extrainfo',
                fieldLabel: GSmartApp.Locales.mota_thietbi[GSmartApp.Locales.currentLocale]
            }]
        }]
    }]
});

