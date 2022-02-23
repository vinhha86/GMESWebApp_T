Ext.define('GSmartApp.view.dashboard_khotp.Dashboard_KhoTP_BieuDo_Main', {
    extend: 'Ext.container.Container',
    xtype: 'Dashboard_KhoTP_BieuDo_Main',
    itemId:'Dashboard_KhoTP_BieuDo_Main',
    layout: 'border',
    controller: 'Dashboard_KhoTP_BieuDo_Main_Controller',
    viewModel: {
        type: 'Dashboard_KhoTP_BieuDo_Main_ViewModel'
    },
    items: [
        {
            region: 'center',
            // height: '100%',
            border: true,
            margin: 1,
            xtype: 'CutplanProcessing_Chart_TienDoLenhSX'
        },
        {
            region: 'south',
            height: '50%',
            border: true,
            margin: 1,
            // xtype: 'CutplanProcessing_Chart_TienDoLenhSX'
        },
    ],

    // dockedItems: [{
    //     dock: 'bottom',
    //     layout: 'hbox',
    //     items:[{
    //         xtype: 'button',
    //         margin: 5,
    //         text: 'Thoát',
    //         iconCls: 'x-fa fa-window-close',
    //         itemId: 'btnThoat'
    //     }]
    // }]
})