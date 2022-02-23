Ext.define('GSmartApp.view.handover.HandoverLineToPack', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_line_topack',
    id: 'handover_line_topack',
    reference: 'handover_line_topack',
    viewModel: {
        type: 'HandoverListViewModel'
    },
    controller: 'HandoverLineToPackController',
    // title: 'Xuất BTP lên chuyền',
    layout: 'vbox',
    items: [
        {
            layout: 'hbox',
            defaults: {
                margin:'5 5 0 5'
            },
            items: [
                {
                    xtype: 'datefield',
                    reference: 'fromDate',
                    // placeholder: 'Mã SX',
                    label: 'Từ:',
                    labelWidth: 'auto',
                    // value: new Date(),
                    value: new Date(2020, 1, 1),
                    dateFormat : 'd/m/y',
                    flex: 1,
                    enableKeyEvents: true,
                    listeners: {
                        change : 'loadData'
                    }
                },
                {
                    xtype: 'datefield',
                    reference: 'toDate',
                    // placeholder: 'Mã SX',
                    label: 'Đến:',
                    labelWidth: 'auto',
                    value: new Date(),
                    dateFormat : 'd/m/y',
                    flex: 1,
                    enableKeyEvents: true,
                    listeners: {
                        change : 'loadData'
                    }
                // },{
                //     xtype:'button',
                //     text: 'Thêm phiếu',
                //     margin: 3,
                //     itemId:'btnThem',
                //     // iconCls: 'x-fa fa-plus',
                //     formBind: false
                }
            ]
        },
        {
            // region: 'center',
            margin: 1,
            flex: 1,
            xtype: 'HandoverList',
            id: 'handover_line_topacklist',
        },
        // {
        //     layout: 'hbox',
        //     docked : 'bottom',
        //     height: 100,
        //     items: [{
        //         flex: 1
        //     },{
        //         xtype:'button',
        //         text: 'Thêm phiếu',
        //         margin: 2,
        //         height: 50,
        //         itemId:'btnThem',
        //         ui: 'action',
        //         iconCls: 'x-fa fa-plus',
        //         formBind: false,
        //         // flex: 1,
        //     }]
        // }
    ],
    tbar: [{
        xtype:'button',
        iconCls: 'x-fa fa-arrow-left',
        itemId:'btnBack',
        ui: 'action',
    },
    '->'
    ,{
        xtype:'button',
        iconCls: 'x-fa fa-plus',
        itemId:'btnThem',
        ui: 'action',
    }]
});
