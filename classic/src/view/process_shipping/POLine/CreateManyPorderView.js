Ext.define('GSmartApp.view.process_shipping.POLine.CreateManyPorderView', {
    extend: 'Ext.form.Panel',
    xtype: 'CreateManyPorderView',
    id: 'CreateManyPorderView',
    controller: 'CreateManyPorderViewCotroller',
    viewModel: {
        type: 'CreateManyPorderViewModel'
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        layout: 'hbox',
        items: [{
            xtype: 'checkbox',
            boxLabel: 'Gộp nhiều Line thành 1 thanh',
            margin: 2,
            bind: {
                value: '{isMerger}'
            }
        }]
    },
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
            },
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
                editable: false,
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