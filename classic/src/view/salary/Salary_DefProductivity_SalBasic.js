Ext.define('GSmartApp.view.salary.Salary_DefProductivity_SalBasic', {
    extend: 'Ext.form.Panel',
    xtype: 'Salary_DefProductivity_SalBasic',
    id: 'Salary_DefProductivity_SalBasic',
    itemId: 'Salary_DefProductivity_SalBasic',
    IdPContract: 0,
    layout: 'border',
    // height: 100,
    items: [
    {
        region: 'center',
        xtype: 'panel',
        layout:'hbox',
        items: [
            {
                xtype: 'numberfield',
                allowDecimals: false,
                hideTrigger: true,
                // minValue: 100,
                // maxValue: 1000,
                itemId: 'costpersecond',
                labelWidth: 125,
                fieldLabel: 'Đơn giá SX (VNĐ/giây)',
                labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:11px;',
                width: 175,
                margin: 5,
                bind: {
                    value: '{org_sal_basic.costpersecond}'
                },
                listeners:{
                    focusleave: 'onUpdateSalBasic'
                }

            },
            {
                xtype: 'numberfield',
                allowDecimals: false,
                hideTrigger: true,
                minValue: 100,
                maxValue: 1000,
                itemId: 'overtime_normal',
                labelWidth: 130,
                fieldLabel: '% Tăng ca - Ngày thường',
                labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:11px;',
                width: 180,
                margin: 5,
                bind: {
                    value: '{org_sal_basic.overtime_normal}'
                },
                listeners:{
                    focusleave: 'onUpdateSalBasic'
                }
            },            
            {
                xtype: 'numberfield',
                allowDecimals: false,
                hideTrigger: true,
                minValue: 100,
                maxValue: 1000,
                itemId: 'overtime_weekend',
                labelWidth: 60,
                fieldLabel: 'Ngày nghỉ',
                labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:11px;',
                width: 120,
                margin: 5,
                bind: {
                    value: '{org_sal_basic.overtime_weekend}'
                },
                listeners:{
                    focusleave: 'onUpdateSalBasic'
                }
            },
            {
                xtype: 'numberfield',
                allowDecimals: false,
                hideTrigger: true,
                minValue: 100,
                maxValue: 1000,
                itemId: 'overtime_holiday',
                labelWidth: 60,
                fieldLabel: 'Ngày lễ',
                labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:11px;',
                width: 120,
                margin: 5,
                bind: {
                    value: '{org_sal_basic.overtime_holiday}'
                },
                listeners:{
                    focusleave: 'onUpdateSalBasic'
                }
            },
            {
                xtype: 'numberfield',
                allowDecimals: false,
                hideTrigger: true,
                minValue: 100,
                maxValue: 1000,
                itemId: 'overtime_night',
                labelWidth: 60,
                fieldLabel: 'Ca đêm',
                labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:11px;',
                width: 120,
                margin: 5,
                bind: {
                    value: '{org_sal_basic.overtime_night}'
                },
                listeners:{
                    focusleave: 'onUpdateSalBasic'
                }
            }

        ]            
    }]

})