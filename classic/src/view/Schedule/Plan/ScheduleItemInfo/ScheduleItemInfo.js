Ext.define('GSmartApp.view.Schedule.Plan.ScheduleItemInfo.ScheduleItemInfo', {
    extend: 'Ext.form.Panel',
    xtype: 'ScheduleItemInfo',
    id: 'ScheduleItemInfo',
    controller: 'ScheduleItemInfoController',
    layout: 'vbox',
    items: [
        {
            layout: 'hbox',
            width: '100%',
            items: [{
                xtype: 'textfield',
                margin: '2 5 2 5',
                fieldLabel: 'Mã hàng',
                editable: false,
                readOnly: true,
                bind: {
                    value: '{record.mahang}'
                },
                flex: 1,
                labelWidth: 90
            }]
        },
        {
            layout: 'hbox',
            width: '100%',
            items: [{
                xtype: 'textfield',
                margin: '2 5 2 5',
                fieldLabel: 'Lệnh SX',
                editable: false,
                readOnly: true,
                bind: {
                    value: '{record.pordercode}'
                },
                flex: 1,
                labelWidth: 90
            }]
        },
        {
            layout: 'hbox',
            width: '100%',
            items: [{
                xtype: 'textfield',
                margin: '2 5 2 5',
                fieldLabel: 'Mã SP Buyer',
                editable: false,
                readOnly: true,
                bind: {
                    value: '{record.productbuyercode}'
                },
                flex: 1,
                labelWidth: 90
            }]
        },
        {
            layout: 'hbox',
            width: '100%',
            items: [{
                xtype: 'textfield',
                margin: '2 5 2 5',
                fieldLabel: 'Buyer',
                editable: false,
                readOnly: true,
                bind: {
                    value: '{record.buyername}'
                },
                flex: 1,
                labelWidth: 90
            }, {
                xtype: 'textfield',
                margin: '2 5 2 5',
                fieldLabel: 'Vendor',
                editable: false,
                readOnly: true,
                bind: {
                    value: '{record.vendorname}'
                },
                flex: 1,
                labelWidth: 90
            }]
        },
        {
            layout: 'hbox',
            width: '100%',
            items: [{
                xtype: 'textfield',
                margin: '2 5 2 5',
                fieldLabel: 'NS Xưởng',
                editable: false,
                readOnly: true,
                bind: {
                    value: '{record.productivity}'
                },
                flex: 1,
                labelWidth: 90,
                fieldStyle: 'font-size:11px;text-align:right',
                textAlign: 'right',
                vtype: 'dollar',
                // renderer: function(value){
                //     if(value == null) 
                //         return 0;
                //     return Ext.util.Format.number(value, '0,000');
                // }
            }, {
                xtype: 'datefield',
                margin: '2 5 2 5',
                fieldLabel: 'Vào chuyền',
                editable: false,
                readOnly: true,
                format: 'd/m/y',
                bind: {
                    value: '{record.StartDate}'
                },
                flex: 1,
                labelWidth: 90
            },]
        },
        {
            layout: 'hbox',
            width: '100%',
            items: [{
                xtype: 'textfield',
                margin: '2 5 2 5',
                fieldLabel: 'NS Target',
                editable: false,
                readOnly: true,
                bind: {
                    value: '{record.productivity_po}'
                },
                flex: 1,
                labelWidth: 90,
                fieldStyle: 'font-size:11px;text-align:right',
                textAlign: 'right',
                vtype: 'dollar',
                // renderer: function(value){
                //     if(value == null) 
                //         return 0;
                //     return Ext.util.Format.number(value, '0,000');
                // }
            }, {
                xtype: 'datefield',
                margin: '2 5 2 5',
                fieldLabel: 'Kết thúc',
                editable: false,
                readOnly: true,
                format: 'd/m/y',
                bind: {
                    value: '{record.EndDate}'
                },
                flex: 1,
                labelWidth: 90
            },]
        },
        {
            layout: 'hbox',
            width: '100%',
            items: [{
                xtype: 'textfield',
                margin: '2 5 2 5',
                fieldLabel: 'NS Tổ',
                editable: false,
                readOnly: true,
                bind: {
                    value: '{record.productivity_line}'
                },
                flex: 1,
                labelWidth: 90,
                fieldStyle: 'font-size:11px;text-align:right',
                textAlign: 'right',
                vtype: 'dollar',
                // renderer: function(value){
                //     if(value == null) 
                //         return 0;
                //     return Ext.util.Format.number(value, '0,000');
                // }
            }, {
                xtype: 'datefield',
                margin: '2 5 2 5',
                fieldLabel: 'Giao hàng',
                editable: false,
                readOnly: true,
                format: 'd/m/y',
                bind: {
                    value: '{shipdate}'
                },
                flex: 1,
                labelWidth: 90
            }]
        },
        {
            layout: 'hbox',
            width: '100%',
            items: [{
                xtype: 'textfield',
                margin: '2 5 2 5',
                fieldLabel: 'Số ngày SX',
                editable: false,
                readOnly: true,
                bind: {
                    value: '{record.duration}'
                },
                flex: 1,
                labelWidth: 90,
                fieldStyle: 'font-size:11px;text-align:right',
                textAlign: 'right',
            }, {
                xtype: 'textfield',
                margin: '2 5 2 5',
                fieldLabel: 'Số lượng',
                editable: false,
                readOnly: true,
                bind: {
                    value: '{record.totalpackage}'
                },
                flex: 1,
                labelWidth: 90,
                fieldStyle: 'font-size:11px;text-align:right',
                textAlign: 'right',
            }]
        },
    ],
})