Ext.define('GSmartApp.view.porders.POrder_List.POrder_Grant_InfoView', {
    extend: 'Ext.form.Panel',
    xtype: 'POrder_Grant_InfoView',
    id: 'POrder_Grant_InfoView',
    controller: 'POrder_Grant_InfoViewController',
    reference: 'POrder_Grant_InfoView',
    bodyPadding: 2,
    border: false,
    IdPOrder: 0,
    items: [{
        layout: 'vbox',
        border: false,
        width: '100%',
        items: [{
            layout: 'hbox',
            border: false,
            width: '100%',
            items: [{
                xtype: 'textfield',
                labelStyle: "font-size:13px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:12px;text-align:right',
                margin: 2,
                fieldLabel: "Mã lệnh",
                allowBlank: false,
                // itemId: 'contractcode',
                blankText: 'Không được để trống',
                bind: {
                    value: '{POrder_grant.ordercode}'
                },
                labelWidth: 70,
                flex: 1,
                // width: 250
            },{
                xtype: 'textfield',
                labelStyle: "font-size:13px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:12px;text-align:right',
                margin: 2,
                fieldLabel: "Mã SP (Buyer)",
                allowBlank: false,
                // itemId: 'contractcode',
                blankText: 'Không được để trống',
                bind: {
                    value: '{POrder_grant.productcode}'
                },
                labelWidth: 110,
                flex: 1,
                // width: 250
            },{
                xtype: 'textfield',
                labelStyle: "font-size:13px;padding: 5px 0px 0px 2px;",
                margin: 2,
                fieldLabel: "Số lượng (kế hoạch)",
                allowBlank: false,
                // itemId: 'contractcode',
                blankText: 'Không được để trống',
                maskRe: /[0-9]/,
                vtype: 'dollar',
                bind: {
                    value: '{POrder_grant.totalamount_tt}',
                    fieldStyle: '{fieldstyle_sl}',
                },
                labelWidth: 130,
                flex: 1,
                // width: 250
            },
            {
                xtype: 'datefield',
                labelStyle: "font-size:13px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:12px;text-align:right',
                margin: 2,
                reference: 'golivedate',
                readOnly: true,
                hideTrigger:true,
                fieldLabel: "Ngày giao (kế hoạch)",
                allowBlank: false,
                itemId: 'golivedate',
                bind: {
                    value: '{golivedate}',
                    fieldStyle: '{fieldstyle_date}',
                },
                format: 'd/m/y',
                labelWidth: 130,
                flex: 1,
                // width: 250
            },
            {
                xtype: 'datefield',
                labelStyle: "font-size:13px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:12px;text-align:right',
                margin: 2,
                reference: 'finish_date_plan',
                readOnly: true,
                hideTrigger:true,                
                fieldLabel: "Ngày kết thúc sx",
                allowBlank: false,
                itemId: 'finish_date_plan',
                bind: {
                    value: '{finish_date_plan}'
                },
                format: 'd/m/y',
                labelWidth: 110,
                flex: 1,
                // width: 250
            }
        ]
        }]
    }]
})