Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_DetailView', {
    extend: 'Ext.form.Panel',
    xtype: 'POrder_List_DetailView',
    id: 'POrder_List_DetailView',
    controller: 'POrder_List_DetailViewController',
    viewModel: {
        type: 'POrder_List_DetailViewModel'
    },
    IdPOrder: 0,
    layout: 'border',
    // height: 500,
    items: [
        {
            region: 'center',
            border: false,
            margin: 1,
            xtype: 'tabpanel',
            itemId: 'tabmain',
            items: [{
                title: 'Thông tin lệnh',
                xtype: 'POrder_Tab_Info'
            }, {
                title: 'Phân chuyền',
                xtype: 'POrder_Tab_Grant'
            }, {
                title: 'Định mức',
                xtype: 'PorderBom_TabColor',
                hidden: true
            }, {
                title: 'Định mức',
                xtype: 'POrderBom2View'
            }, {
                title: 'Quy trình công nghệ',
                xtype: 'PorderSewingCost_View'
            }, {
                title: 'Tiến độ sản xuất',
                xtype: 'PorderProcessingDetail'
            }, {
                title: 'Yêu cầu xuất NPL',
                xtype: 'Stockout_order_MainView'
            }]
        }],
    dockedItems: [{
        layout: 'hbox',
        reference: 'dockBottomBar',
        border: false,
        dock: 'bottom',
        items: [{
            xtype: 'button',
            text: 'Quay lại',
            margin: 1,
            itemId: 'btnQuayLai',
            iconCls: 'x-fa fa-backward'
        }, {
            flex: 1,
            border: false
        }, {
            xtype: 'button',
            text: 'In lệnh sản xuất',
            margin: 1,
            itemId: 'btnPrintPorder',
            iconCls: 'x-fa fa-print'
        }, {
            xtype: 'button',
            text: 'Kế hoạch cắt',
            margin: 1,
            itemId: 'btnCutPlan',
            iconCls: 'x-fa fa-cut'
        }, {
            xtype: 'button',
            text: 'Thông tin sản phẩm',
            margin: 1,
            itemId: 'btnTTSanPham',
            iconCls: 'x-fa fa-search'
        }, {
            xtype: 'button',
            text: 'Thông tin đơn hàng',
            margin: 1,
            itemId: 'btnTTDonHang',
            iconCls: 'x-fa fa-search'
            // },
            // {
            //     xtype: 'button',
            //     text: 'Lưu',
            //     margin: 1,
            //     itemId: 'btnLuu',
            //     iconCls: 'x-fa fa-save',
            //     formBind: true
        }]
    }]
})