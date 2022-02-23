Ext.define('GSmartApp.view.Schedule.Plan.Plan_break', {
    extend: 'Ext.form.Panel',
    xtype: 'Plan_break',
    id: 'Plan_break',
    layout: 'vbox',
    controller: 'Plan_break_Controller',
    viewModel: {
        type: 'Plan_break_ViewModel'
    },
    items:[{
        layout: 'hbox',
        items:[{
            xtype: 'textfield',
            margin: 5,
            fieldLabel: 'Số lượng',
            itemId: 'quantity',
            maskRe: /[0-9.]/,
            bind: {
                value: '{plan.quantity}'
            }
        }]
    }],
    dockedItems:[{
        dock:'bottom',
        layout: 'hbox',
        items:[{
            flex:1
        },{
            xtype:'button',
            text: 'Xác nhận',
            margin: 5,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-check'
        },{
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        }]
    }]
})