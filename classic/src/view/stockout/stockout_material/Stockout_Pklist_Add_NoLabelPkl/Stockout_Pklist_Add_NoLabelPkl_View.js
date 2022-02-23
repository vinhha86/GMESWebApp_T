Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pklist_Add_NoLabelPkl.Stockout_Pklist_Add_NoLabelPkl_View', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockout_Pklist_Add_NoLabelPkl_View',
    itemId:'Stockout_Pklist_Add_NoLabelPkl_View',
    controller: 'Stockout_Pklist_Add_NoLabelPkl_Controller',
    viewModel: {
        type: 'Stockout_Pklist_Add_NoLabelPkl_ViewModel'
    },
    layout: 'vbox',
    width: '100%',
    items: [
        // {
        //     xtype:'textfield',
        //     margin: 5,
        //     fieldLabel: 'Dãy',
        //     allowBlank: true,
        //     // blankText : 'Không được để trống',
        //     maxLength: 100,
        //     maxLengthText: 'Tối đa 100 ký tự',
        //     bind:{
        //         value :'{obj.row}'
        //     },
        //     width: 300,
        //     itemId: 'day',
        //     labelWidth: 105,
        //     enableKeyEvents : true,
        //     listeners: {
        //         // keypress: 'onEnterConfirm'
        //     }
        // },
        // {
        //     xtype:'textfield',
        //     margin: 5,
        //     fieldLabel: 'Tầng',
        //     allowBlank: true,
        //     // blankText : 'Không được để trống',
        //     maxLength: 100,
        //     maxLengthText: 'Tối đa 100 ký tự',
        //     bind:{
        //         value :'{obj.space}'
        //     },
        //     width: 300,
        //     itemId: 'tang',
        //     labelWidth: 105,
        //     enableKeyEvents : true,
        //     listeners: {
        //         // keypress: 'onEnterConfirm'
        //     }
        // },
        // {
        //     xtype:'textfield',
        //     margin: 5,
        //     fieldLabel: 'Khoang',
        //     allowBlank: true,
        //     // blankText : 'Không được để trống',
        //     maxLength: 100,
        //     maxLengthText: 'Tối đa 100 ký tự',
        //     bind:{
        //         value :'{obj.floor}'
        //     },
        //     maskRe: /[0-9]/,
        //     width: 300,
        //     itemId: 'khoang',
        //     labelWidth: 105,
        //     enableKeyEvents : true,
        //     listeners: {
        //         // keypress: 'onEnterConfirm'
        //     }
        // },
        {
            xtype:'textfield',
            margin: 5,
            fieldLabel: 'Số Lot',
            allowBlank: true,
            // blankText : 'Không được để trống',
            maxLength: 100,
            maxLengthText: 'Tối đa 100 ký tự',
            bind:{
                value :'{obj.lotnumber}'
            },
            width: 300,
            itemId: 'solot',
            labelWidth: 105,
            enableKeyEvents : true,
            listeners: {
                // keypress: 'onEnterConfirm'
            }
        },
        {
            xtype:'textfield',
            margin: 5,
            fieldLabel: 'Số cây',
            allowBlank: true,
            // blankText : 'Không được để trống',
            maxLength: 100,
            maxLengthText: 'Tối đa 100 ký tự',
            bind:{
                value :'{obj.packageid}'
            },
            maskRe: /[0-9]/,
            width: 300,
            itemId: 'socay',
            labelWidth: 105,
            enableKeyEvents : true,
            listeners: {
                // keypress: 'onEnterConfirm'
            }
        },
        {
            xtype:'textfield',
            margin: 5,
            fieldLabel: 'Dài (m) ('+ '<span style="color:red">*</span>' + ')',
            allowBlank: true,
            blankText : 'Không được để trống',
            maxLength: 100,
            maxLengthText: 'Tối đa 100 ký tự',
            bind:{
                value :'{obj.met}'
            },
            maskRe: /[0-9.]/,
            width: 300,
            itemId: 'met',
            labelWidth: 105,
            enableKeyEvents : true,
            listeners: {
                // keypress: 'onEnterConfirm'
            }
        },
        {
            xtype:'textfield',
            margin: 5,
            fieldLabel: 'Khổ (cm) ('+ '<span style="color:red">*</span>' + ')',
            allowBlank: true,
            blankText : 'Không được để trống',
            maxLength: 100,
            maxLengthText: 'Tối đa 100 ký tự',
            bind:{
                value :'{obj.width_met}'
            },
            maskRe: /[0-9.]/,
            width: 300,
            itemId: 'khocm',
            labelWidth: 105,
            enableKeyEvents : true,
            listeners: {
                // keypress: 'onEnterConfirm'
            }
        },
    ],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close',
            formBind: false
        },{
            xtype:'button',
            text: 'Thêm',
            margin: 3,
            itemId:'btnSelect',
            iconCls: 'x-fa fa-save',
            formBind: true
        },{
            flex:1,
            border: false
        }]
    }]
})