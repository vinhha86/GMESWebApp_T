Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_DetailWindowView', {
    extend: 'Ext.window.Window',
    xtype: 'POrder_List_DetailWindowView',
    id: 'POrder_List_DetailWindowView',
    height: '90%',
    width: '90%',
    closable: false,
    resizable: false,
    modal: true,
    border: false,
    closeAction: 'destroy',
    bodyStyle: 'background-color: transparent',
    layout: 'border',
    viewModel: {
        type: 'POrder_List_DetailWindowViewModel'
    },
    controller: 'POrder_List_DetailWindowViewController',
    bind: {
        title: '{grantSKUViewTabInfoTitle}'
    },
    items: [
        {
            region: 'north',
            height: 40,
            border: false,
            xtype: 'POrder_Grant_InfoView'
        }, {
            region: 'center',
            layout: 'border',
            // border: false,
            items: [
                {
                    region: 'center',
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '0 0 0 2',
                    items: [
                        {
                            // region: 'west',
                            xtype: 'POrder_ProductSKUView',
                            id: 'POrder_ProductSKUView_window',
                            flex: 1,
                            height: '100%',
                            border: true,
                            bind: {
                                hidden: '{is_poline_sku_hidden}'
                            }
                        },
                        {
                            xtype: 'container',
                            width: 40,
                            height: '100%',
                            layout: 'center',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'button',
                                            itemId: 'btnAddToGrantSku',
                                            tooltip: 'Thêm vào tổ chuyền',
                                            iconCls: 'x-fa fa-arrow-right',
                                            weight: 30,
                                            // handler: 'onPorder_AddSKU'
                                        },
                                        { height: 10 },
                                        {
                                            xtype: 'button',
                                            itemId: 'btnRemoveFromGrantSku',
                                            tooltip: 'Xoá khỏi tổ chuyền',
                                            iconCls: 'x-fa fa-arrow-left',
                                            weight: 30,
                                            // handler: 'onPorder_AddSKU'
                                        }
                                    ]
                                }
                            ],
                            bind: {
                                hidden: '{is_addremovesku_hidden}'
                            }
                        },
                        {
                            xtype: 'POrder_List_GrantSKUView',
                            id: 'POrder_List_GrantSKUView_window',
                            reference: 'POrder_List_GrantSKUView_window',
                            bind: {
                                // store: '{POrder_ListGrantSKUStoreForWindow}',
                                // title: '{grantSKUViewTabInfoTitle}',
                                hidden: '{is_poline_skugranted_hidden}'
                            },
                            width: '40%',
                            height: '100%',
                            border: true
                        },
                    ]
                }
            ]
        }
        // {
        //     region: 'center',
        //     border: false,
        //     margin: 1,
        //     xtype: 'tabpanel',
        //     itemId:'tabmain',
        //     items: [{
        //         title: 'Thông tin lệnh',
        //         xtype: 'POrder_Tab_Info'
        //     }, {
        //         title: 'Phân chuyền',
        //         xtype: 'POrder_Tab_Grant'
        //     }]
        // }
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            xtype: 'button',
            margin: 3,
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }]
    }]
})