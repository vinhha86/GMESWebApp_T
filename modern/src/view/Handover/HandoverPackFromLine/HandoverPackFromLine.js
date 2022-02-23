Ext.define('GSmartApp.view.handover.HandoverPackFromLine', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_pack_fromline',
    id: 'handover_pack_fromline',
    reference: 'handover_pack_fromline',
    viewModel: {
        type: 'HandoverListViewModel'
    },
    controller: 'HandoverPackFromLineController',
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
            flex: 1,
            xtype: 'HandoverList',
            id: 'handover_pack_fromlinelist',
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
    // },
    // '->'
    // ,{
    //     xtype:'button',
    //     iconCls: 'x-fa fa-plus',
    //     itemId:'btnThem',
    //     ui: 'action',
    }]
});
