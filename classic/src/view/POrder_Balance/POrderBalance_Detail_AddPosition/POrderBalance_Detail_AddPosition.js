Ext.define('GSmartApp.view.POrder_Balance.POrderBalance_Detail_AddPosition', {
    extend: 'Ext.form.Panel',
    xtype: 'POrderBalance_Detail_AddPosition',
    id:'POrderBalance_Detail_AddPosition',
    controller: 'POrderBalance_Detail_AddPositionController',
    layout: 'vbox',
    items: [
        {
            xtype:'textfield',
            margin: 5,
            fieldLabel: 'Tên cụm công đoạn ('+ '<span style="color:red">*</span>' + ')',
            allowBlank: false,
            // maskRe: /[0-9]/,
            // maxLength: 2,
            // maxLengthText: 'Tối đa 2 ký tự',
            bind:{
                value :'{name}'
            },
            width: '100%',
            // flex: 1,
            itemId: 'name',
            labelWidth: 145,
            align: 'end'
        },
        // {
        //     xtype:'textfield',
        //     margin: 5,
        //     fieldLabel: 'Số lượng ('+ '<span style="color:red">*</span>' + ')',
        //     allowBlank: false,
        //     maskRe: /[0-9]/,
        //     maxLength: 2,
        //     maxLengthText: 'Tối đa 2 ký tự',
        //     bind:{
        //         value :'{amount}'
        //     },
        //     width: '100%',
        //     // flex: 1,
        //     itemId: 'amount',
        //     labelWidth: 100,
        //     align: 'end'
        // }
    ],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            flex:1,
            border: false
        },{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-backward',
            formBind: false
        },{
            xtype:'button',
            text: 'Thêm',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        },{
            flex:1,
            border: false
        }]
    }]
})