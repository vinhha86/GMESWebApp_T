Ext.define('GSmartApp.view.pcontract.PContract_Porder.Form_SelectOrg_PorderReq', {
    extend: 'Ext.form.Panel',
    xtype: 'Form_SelectOrg_PorderReq',
    id: 'Form_SelectOrg_PorderReq',
    controller: 'Form_SelectOrg_PorderReq_Controller',
    viewModel: {
        type: 'Form_SelectOrg_PorderReq_ViewModel'
    },
    layout: 'hbox',
    items: [
        {
            xtype: 'combo',
            queryMode: 'local',
            anyMatch: true,
            valueField: 'id',
            displayField: 'name',
            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
            fieldStyle: 'font-size:11px;',
            margin: 1,
            fieldLabel: "Đơn vị:",
            bind: {
                value: '{orgid_link}',
                store: '{OrgStore}'
            },
            labelWidth: 90,
            flex: 1,
            allowBlank: false,
            blankText: 'Bạn chưa chọn đơn vị',
            itemId: 'cmbDonVi'
        },
        {
            xtype: 'textfield',
            textAlign: 'right',
            allowDecimals: false,
            decimalSeparator: ',',
            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
            fieldStyle: 'font-size:11px;text-align:right',
            fieldLabel: 'Số lượng:',
            maskRe: /[0-9]/,
            labelAlign: 'left',
            labelWidth: 78,
            width: 150,
            margin: 1,
            vtype: 'dollar',
            enforceMaxLength: true,
            maxLength: 9,
            bind: {
                value: '{amount}'
            }    
        }
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            flex: 1
        },{
            xtype:'button',
            formBind: true,
            text: 'Lưu',
            margin: 5,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save'
        },{
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        }]
    }]
})