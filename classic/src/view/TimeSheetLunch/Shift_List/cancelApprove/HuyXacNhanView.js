Ext.define('GSmartApp.view.TimeSheetLunch.Shift_List.cancelApprove.HuyXacNhanView', {
    extend: 'Ext.form.Panel',
    xtype: 'HuyXacNhanView',
    id: 'HuyXacNhanView',
    controller: 'HuyXacNhanViewController',
    viewModel: {
        type: 'HuyXacNhanViewModel'
    },
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    items: [{
        xtype: 'combo',
        fieldLabel: 'Ca ăn',
        valueField: 'timesheet_shift_type_id_link',
        displayField: 'name',
        bind: {
            value: '{record.shifttypeid_link}',
            store: '{TimesheetShiftTypeOrgStore}'
        },
        margin: 5,
        allowBlank: false,
        blankText: 'Không được để trống'
    }, {
        xtype: 'textfield',
        margin: 5,
        fieldLabel: 'Lý do hủy',
        bind: {
            value: '{record.comment}'
        },
        allowBlank: false,
        blankText: 'Không được để trống'
    }],
    dockedItems: [
        {
            dock: 'bottom',
            layout: 'hbox',
            border: false,
            items: [
                {
                    margin: 3,
                    xtype: 'button',
                    text: 'Thoát',
                    iconCls: 'x-fa fa-window-close',
                    itemId: 'btnThoat'
                },
                {
                    xtype: 'button',
                    text: 'Hủy xác nhận',
                    margin: 3,
                    itemId: 'btnSelect',
                    formBind: true,
                    iconCls: 'x-fa fa-check',
                },
            ]
        }
    ],

});

