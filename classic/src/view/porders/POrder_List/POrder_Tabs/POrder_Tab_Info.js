Ext.define('GSmartApp.view.porders.POrder_List.POrder_Tab_Info', {
    extend: 'Ext.panel.Panel',
    xtype: 'POrder_Tab_Info',
    id: 'POrder_Tab_Info',
    layout: 'border',
    border: true,
    items: [
        {
            region: 'north',
            height: 120,
            border: false,
            xtype: 'POrder_InfoView'
        }, {
            region: 'center',
            layout: 'border',
            // border: false,
            items: [
                {
                    region: 'west',
                    xtype: 'POLine_SKU_View',
                    border: true,
                    bind: {
                        hidden: '{is_poline_hidden}',
                        width: '{width_sku_poline}'
                    }
                },
                {
                    region: 'center',
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '0 0 0 2',
                    items: [
                        {
                            // region: 'west',
                            xtype: 'POrder_ProductSKUView',
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
                                            id: 'btnAddToGrantSku',
                                            tooltip: 'Thêm vào tổ chuyền',
                                            iconCls: 'x-fa fa-arrow-right',
                                            weight: 30,
                                            // handler: 'onPorder_AddSKU'
                                        },
                                        { height: 10 },
                                        {
                                            xtype: 'button',
                                            id: 'btnRemoveFromGrantSku',
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
                            id: 'POrder_List_GrantSKUViewTabInfo',
                            reference: 'POrder_List_GrantSKUViewTabInfo',
                            bind: {
                                // store: '{POrder_ListGrantSKUStoreForWindow}',
                                title: '{grantSKUViewTabInfoTitle}',
                                hidden: '{is_poline_skugranted_hidden}'
                            },
                            width: '40%',
                            height: '100%',
                            border: true
                        },
                    ]
                }]
        }
    ]
})