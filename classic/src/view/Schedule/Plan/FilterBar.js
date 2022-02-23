Ext.define('GSmartApp.view.Schedule.Plan.FilterBar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'FilterBar',
    id: 'FilterBar',
    controller: 'FilterBar_Controller',
    layout: 'hbox',
    items: [
        // {
        //     xtype: 'button',
        //     iconCls: 'x-fa fa-ship',
        //     itemId: 'hideView',
        //     tooltip: 'Tiến độ giao hàng'
        // },
        {
            xtype: 'button',
            iconCls: 'x-fa fa-bars',
            menu: [
                {
                    itemId: 'btnExportPDF_FilterBar',
                    iconCls: 'fa fa-file-pdf-o greenIcon',
                    text: 'Xuất file PDF',
                    handler: 'onExport'
                },
                {
                    text: 'Đơn hàng',
                    iconCls: 'x-fa fa-shopping-basket',
                    weight: 30,
                    bind: {
                        hidden: '{isHidden_KHGH}'
                    },
                    handler: 'onShowKHGH'
                },
                {
                    text: 'Tổng hợp CMP',
                    iconCls: 'x-fa fa-dollar',
                    weight: 30,
                    bind: {
                        hidden: '{isHidden_CMP}'
                    },
                    handler: 'onShowCMP'
                },
                {
                    text: 'Tổng hợp Salary Fund',
                    iconCls: 'x-fa fa-money',
                    weight: 30,
                    bind: {
                        hidden: '{isHidden_Salary}'
                    },
                    handler: 'onShowSalaryFund'
                },
                {
                    itemId: 'btnLenhChuaPhanChuyen',
                    text: 'Lệnh chưa phân chuyền',
                    iconCls: 'x-fa fa-sliders violetIcon',
                    weight: 30,
                    handler: 'onLenhChuaPhanChuyen',
                    bind: {
                        hidden: '{isHidden_Phanlenh}'
                    }
                },
                {
                    itemId: 'btnYeuCauXepKeHoach',
                    text: 'Yêu cầu xếp kế hoạch',
                    iconCls: 'x-fa fa-bullhorn redIcon',
                    weight: 30,
                    handler: 'onYeuCauXepKeHoach_ChaoGia',
                    bind: {
                        hidden: '{isHidden_Phanlenh}'
                    }
                },
                {
                    itemId: 'btnDaXepKeHoach',
                    text: 'Lệnh thực tế',
                    iconCls: 'x-fa fa-bell-slash-o blueIcon',
                    weight: 30,
                    handler: 'onLenhThucTe',
                    bind: {
                        hidden: '{isHidden_Phanlenh}'
                    }
                },
                {
                    itemId: 'btnLenhThayDoi',
                    text: 'Lệnh bị thay đổi',
                    iconCls: 'x-fa fa-exclamation-triangle brownIcon',
                    weight: 30,
                    handler: 'onLenhThayDoi',
                    bind: {
                        hidden: '{isHidden_Phanlenh}'
                    }
                },
                {
                    itemId: 'btnGuessView_FilterBar',
                    text: 'Khung nhìn khách',
                    iconCls: 'x-fa fa-user greenIcon',
                    weight: 30,
                    handler: 'onGuessView',
                    bind: {
                        hidden: '{isHidden_GuestView}'
                    }
                },
            ]
        },
        {
            xtype: 'datefield',
            weight: 30,
            // fieldLabel: 'Bắt đầu',
            format: 'd/m/y',
            altFormats: "Y-m-d\\TH:i:s.uO",
            labelWidth: 60,
            width: 125,
            bind: {
                value: '{schedule.startDate}'
            }
        },
        {
            xtype: 'datefield',
            weight: 30,
            // fieldLabel: 'Kết thúc',
            format: 'd/m/y',
            altFormats: "Y-m-d\\TH:i:s.uO",
            labelWidth: 60,
            width: 125,
            bind: {
                value: '{schedule.endDate}'
            }
        },
        // {
        //     xtype: 'textfield',
        //     emptyText: 'Mã hàng',
        //     width: 125,
        //     bind: {
        //         value: '{schedule.product_buyercode}'
        //     }
        // },
        {
            xtype: 'textfield',
            clearable: true,
            emptyText: 'PO Line',
            width: 130,
            bind: {
                value: '{schedule.PO}'
            }
        },
        {
            xtype: 'button',
            tooltip: 'Tìm kiếm',
            // text: 'Zoom in',
            iconCls: 'x-fa fa-search',
            weight: 30,
            handler: 'onSearch'
        }, {
            xtype: 'checkbox',
            hidden: true,
            fieldLabel: 'Y/C SX',
            width: 70,
            labelWidth: 50,
            itemId: 'checkYCSX',
            labelAlign: 'right',
            bind: {
                value: '{schedule.isReqPorder}'
            }
        }, {
            xtype: 'checkbox',
            fieldLabel: 'Tất cả tổ SX',
            width: 100,
            labelWidth: 80,
            labelAlign: 'right',
            hidden: true,
            itemId: 'checkAllGrant',
            bind: {
                value: '{schedule.isAllgrant}'
            }
        },
        '->'
        , {
            xtype: 'button',
            tooltip: 'Phóng to',
            // text: 'Zoom in',
            iconCls: 'x-fa fa-search-plus',
            weight: 30,
            handler: 'onZoomIn'
        },
        {
            xtype: 'button',
            tooltip: 'Thu nhỏ',
            // text: 'Zoom out',
            iconCls: 'x-fa fa-search-minus',
            weight: 30,
            handler: 'onZoomOut'
        },
        {
            xtype: 'FilterFieldPorder',
            id: 'FilterFieldPorder',
            emptyText: 'Mã sản phẩm',
            // fieldLabel: 'PO:',
            labelWidth: 30,
            width: 140,
            property: 'productbuyercode'
        }
    ]
})