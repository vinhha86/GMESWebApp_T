Ext.define('GSmartApp.view.Schedule.Plan.FormQuestion_MoveGrant', {
    extend: 'Ext.form.Panel',
    xtype: 'FormQuestion_MoveGrant',
    layout: 'vbox',
    controller: 'FormQuestion_MoveGrant_Controller',
    viewModel: {
        type: 'FormQuestion_MoveGrant_ViewModel'
    },
    items:[{
        layout: 'vbox',
        items:[{
            xtype: 'radio',
            boxLabel  : 'Tách chuyền',
            name      : 'grant',
            margin: 5,
            labelWidth: 120,
            width: 250,
            bind: {
                value: '{isBreak}'
            }
        }, {
            xtype: 'radio',
            boxLabel  : 'Chuyển chuyền',
            name      : 'grant',
            margin: 5,
            labelWidth: 120,
            width: 250,
            bind: {
                value: '{!isBreak}'
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
            iconCls: 'x-fa fa-save'
        },{
            xtype: 'button',
            text: 'Hủy',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        }]
    }]
})