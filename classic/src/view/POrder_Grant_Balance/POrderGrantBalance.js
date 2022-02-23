Ext.define('GSmartApp.view.POrder_Grant_Balance.POrderGrantBalance', {
    extend: 'Ext.form.Panel',
    xtype: 'POrderGrantBalance',
    id: 'POrderGrantBalance',
    controller: 'POrderGrantBalanceController',
    // viewModel: {
    //     type: 'POrderGrantBalanceViewModel'
    // },
    layout: 'border',
    // height: 500,
    items: [{
        region: 'west',
        border: true,
        width: '65%',
        // title: 'Danh sách công đoạn',
        xtype: 'POrderGrantBalance_Detail',
        // html: 'Cân bằng chuyền'
    },{
        region: 'center',
        border: true,
        width: '35%',
        // title: 'Chi tiết chuyền',
        xtype: 'POrderGrantBalance_Personnel',
        // html: 'Nhân sự tổ chuyền'
    }],
})