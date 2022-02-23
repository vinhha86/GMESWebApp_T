Ext.define('GSmartApp.view.TimeSheetLunch.Shift_List.Shift_List_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'Shift_List_View',
    id: 'Shift_List_View',
    reference: 'Shift_List_View',
    controller: 'Shift_List_ViewController',
    viewModel: {
        type: 'Shift_List_ViewModel'
    },
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind:{
        store: '{TimesheetShiftTypeOrgStore}'
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    columns: [
        {
            text: 'Ca', 
            dataIndex: 'name', 
            flex: 1,
        },
    ],
    dockedItems: [
        {
            dock: 'bottom',
            layout: 'hbox',
            border: false,
            items: [
                {
                    margin: 3,
                    xtype:'button',
                    text:  'Thoát',
                    iconCls: 'x-fa fa-window-close',
                    itemId: 'btnThoat'
                },
                {
                    xtype:'button',
                    text: 'Chọn',
                    margin: 3,
                    itemId:'btnSelect',
                    iconCls: 'x-fa fa-check',
                },
            ]
        }
    ],
 
});

