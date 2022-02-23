Ext.define('GSmartApp.view.product.ProductSewingCost.Product_Balance.ProductBalance', {
    extend: 'Ext.form.Panel',
    xtype: 'ProductBalance',
    id: 'ProductBalance',
    controller: 'ProductBalanceController',
    // viewModel: {
    //     type: 'ProductBalanceViewModel'
    // },
    layout: 'border',
    // height: 500,
    items: [{
        region: 'west',
        border: true,
        width: '50%',
        // title: 'Danh sách công đoạn',
        xtype: 'ProductBalance_WorkingProcess'
    },{
        region: 'center',
        border: true,
        width: '50%',
        // title: 'Chi tiết chuyền',
        xtype: 'ProductBalance_Detail',
    }],
    // dockedItems: [{
    //     layout: 'hbox',
    //     reference: 'dockBottomBar',
    //     border: false,
    //     dock: 'bottom',
    //     items: [{
    //         xtype: 'button',
    //         text: 'Quay lại',
    //         margin: 1,
    //         itemId: 'btnQuayLai',
    //         iconCls: 'x-fa fa-backward'
    //     }, {
    //         flex: 1,
    //         border: false
    //     }, {
    //         xtype: 'button',
    //         text: 'Thông tin sản phẩm',
    //         margin: 1,
    //         itemId: 'btnTTSanPham',
    //         iconCls: 'x-fa fa-search'
    //     }, {
    //         xtype: 'button',
    //         text: 'Thông tin đơn hàng',
    //         margin: 1,
    //         itemId: 'btnTTDonHang',
    //         iconCls: 'x-fa fa-search'
    //     // },
    //     // {
    //     //     xtype: 'button',
    //     //     text: 'Lưu',
    //     //     margin: 1,
    //     //     itemId: 'btnLuu',
    //     //     iconCls: 'x-fa fa-save',
    //     //     formBind: true
    //     }]
    // }]
})