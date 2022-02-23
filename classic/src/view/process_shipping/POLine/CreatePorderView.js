Ext.define('GSmartApp.view.process_shipping.POLine.CreatePorderView', {
    extend: 'Ext.form.Panel',
    xtype: 'CreatePorderView',
    id: 'CreatePorderView',
    controller: 'CreatePorderViewCotroller',
    viewModel: {
        type: 'CreatePorderViewModel'
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            layout: 'hbox',
            items: [
                {
                    xtype: 'textfield',
                    margin: 2,
                    fieldLabel: 'Sản phẩm',
                    readOnly: true,
                    bind: {
                        value: '{productname}'
                    },
                    labelWidth: 120,
                    flex: 1
                }, {
                    xtype: 'textfield',
                    margin: 2,
                    fieldLabel: 'Số lượng',
                    maskRe: /[0-9.]/,
                    bind: {
                        value: '{quantity}'
                    },
                    readOnly: true,
                    labelWidth: 120,
                    flex: 1
                }
            ]
        },
        {
            layout: 'hbox',
            items: [
                {
                    xtype: 'datefield',
                    margin: 2,
                    fieldLabel: "Ngày bắt đầu",
                    bind: {
                        value: '{startdate}'
                    },
                    format: 'd/m/Y',
                    altFormats: "Y-m-d\\TH:i:s.uO",
                    editable: false,
                    itemId: 'date_startdate',
                    labelWidth: 120,
                    flex: 1,
                    allowBlank: false,
                    blankText: 'Không được để trống',
                    msgTarget: 'under'
                },
                {
                    xtype: 'datefield',
                    margin: 2,
                    fieldLabel: "Ngày kết thúc",
                    bind: {
                        value: '{enddate}'
                    },
                    format: 'd/m/Y',
                    altFormats: "Y-m-d\\TH:i:s.uO",
                    editable: false,
                    itemId: 'date_enddate',
                    labelWidth: 120,
                    flex: 1,
                    allowBlank: false,
                    blankText: 'Không được để trống',
                    msgTarget: 'under'
                }
            ]
        },
        {
            layout: 'hbox',
            items: [
                {
                    xtype: 'textfield',
                    margin: 2,
                    fieldLabel: 'NS Xưởng',
                    itemId: 'productivity',
                    enableKeyEvents: true,
                    maskRe: /[0-9.]/,
                    bind: {
                        value: '{productivity}'
                    },
                    labelWidth: 120,
                    flex: 1,
                    allowBlank: false,
                    blankText: 'Không được để trống',
                    msgTarget: 'under'
                }, {
                    xtype: 'textfield',
                    margin: 2,
                    fieldLabel: 'Số ngày',
                    itemId: 'duration',
                    maskRe: /[0-9.]/,
                    enableKeyEvents: true,
                    bind: {
                        value: '{duration}'
                    },
                    labelWidth: 120,
                    flex: 1,
                    allowBlank: false,
                    blankText: 'Không được để trống',
                    msgTarget: 'under'
                }
            ]
        },
        {
            layout: 'hbox',
            items: [
                {
                    xtype: 'combo',
                    bind: {
                        store: '{OrgStore}',
                        value: '{orgid_link}'
                    },
                    displayField: 'code',
                    valueField: 'id',
                    margin: 2,
                    labelWidth: 120,
                    fieldLabel: 'Đơn vị',
                    itemId: 'cmbOrg',
                    allowBlank: false,
                    blankText: 'Không được để trống',
                    msgTarget: 'under'
                }, {
                    xtype: 'combo',
                    bind: {
                        store: '{OrgGrantStore}',
                        value: '{orggrantid_link}'
                    },
                    displayField: 'code',
                    valueField: 'id',
                    margin: 2,
                    labelWidth: 120,
                    flex: 1,
                    fieldLabel: 'Tổ SX'
                }
            ]
        }
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        }, {
            xtype: 'button',
            text: 'Tạo lệnh',
            margin: 5,
            itemId: 'btnChon',
            iconCls: 'x-fa fa-check',
            text: 'Chọn',
            formBind: true
        }]
    }]
})