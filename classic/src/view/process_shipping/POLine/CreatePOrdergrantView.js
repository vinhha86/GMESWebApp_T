Ext.define('GSmartApp.view.process_shipping.POLine.CreatePOrdergrantView', {
    extend: 'Ext.form.Panel',
    xtype: 'CreatePOrdergrantView',
    id: 'CreatePOrdergrantView',
    controller: 'CreatePOrdergrantViewController',
    layout: 'vbox',
    items: [
        {
            layout: 'hbox',
            items: [{
                xtype: 'datefield',
                allowBlank: false,
                labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:11px;',
                fieldLabel: "Ngày bắt đầu",
                labelAlign: 'left',
                labelWidth: 78,
                // flex:1,
                margin: 1,
                format: 'd/m/y',
                altFormats: "Y-m-d\\TH:i:s.uO",
                bind: {
                    value: '{startDate}'
                }
            },{
                xtype: 'datefield',
                allowBlank: false,
                labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:11px;',
                fieldLabel: "Ngày kết thúc",
                labelAlign: 'left',
                labelWidth: 78,
                // flex:1,
                margin: 1,
                format: 'd/m/y',
                altFormats: "Y-m-d\\TH:i:s.uO",
                bind: {
                    value: '{endDate}'
                }
            }]
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
            formBind: true,
            text: 'Lưu',
            margin: 5,
            itemId: 'btnSave_pcontractPO',
            iconCls: 'x-fa fa-save'
        }, {
            xtype: 'button',
            formBind: true,
            text: 'Lưu',
            margin: 5,
            bind: {
                hidden: '{hiddenBtnLuuAdd}'
            },
            iconCls: 'x-fa fa-save',
            itemId: 'btnLuuTroLy'
        }, {
            flex: 1
        },
        {
            xtype: 'button',
            margin: 5,
            iconCls: 'x-fa fa-bars',
            hidden: true,
            menu: [
                {
                    text: 'Chào giá',
                    iconCls: 'x-fa fa-shopping-basket',
                    weight: 30,
                    handler: 'onShowKHGH'
                },
                {
                    text: 'Tổng hợp CMP',
                    iconCls: 'x-fa fa-dollar',
                    weight: 30,
                    handler: 'onShowCMP'
                },
                {
                    text: 'Tổng hợp Salary Fund',
                    iconCls: 'x-fa fa-money',
                    weight: 30,
                    handler: 'onShowSalaryFund'
                },
                {
                    text: 'Bảng kế hoạch',
                    iconCls: 'x-fa fa-sliders',
                    weight: 30,
                    handler: 'onShowSchedule'
                },
            ]
        },
        ]
    }]
})