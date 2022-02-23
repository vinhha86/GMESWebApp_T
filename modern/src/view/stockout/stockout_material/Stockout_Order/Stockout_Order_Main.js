Ext.define('GSmartApp.view.stockout.stockout_material.stockout_order.Stockout_Order_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockout_Order_Main',
    id: 'Stockout_Order_Main',
    reference: 'Stockout_Order_Main',
    // viewModel: {
    //     type: 'Stockout_M_MainViewModel'
    // },
    controller: 'Stockout_Order_MainController',
    height: '100%',
    layout: 'vbox',
    width: '100%',
    items: [
        {
            layout: 'hbox',
            defaults: {
                margin: 5
            },
            items: [
                {
                    xtype: 'datefield',
                    reference: 'stockoutorderdate_from',
                    itemId: 'stockoutorderdate_from',
                    label: 'Từ:',
                    // labelWidth: 'auto',
                    labelWidth: 60,
                    value: new Date(),
                    // value: new Date(2020, 1, 1),
                    dateFormat : 'd/m/y',
                    flex: 1,
                    enableKeyEvents: true,
                    listeners: {
                        change : 'onOrderSearch'
                    }
                },
                {
                    xtype: 'datefield',
                    reference: 'stockoutorderdate_to',
                    itemId: 'stockoutorderdate_to',
                    label: 'Đến:',
                    // labelWidth: 'auto',
                    labelWidth: 60,
                    value: new Date(),
                    dateFormat : 'd/m/y',
                    flex: 1,
                    enableKeyEvents: true,
                    listeners: {
                        change : 'onOrderSearch'
                    }
                }
            ]
        },
        {
            layout: 'hbox',
            defaults: {
                margin: 5
            },
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'stockout_M_OrderFilter',
                    // label: 'Invoice:',
                    // labelWidth: 60,
                    // margin: 1,
                    // padding: 6,
                    flex: 1,
                    // width: '100%',
                    // minWidth: 80,
                    // maxWidth: 200,
                    textAlign: 'left',
                    placeholder: 'Tìm kiếm nhanh ...',
                    // editable: false,
                    // readOnly: true,
                    // clearable: false,
                    cls: 'searchField',
                    // bind: {
                    //     value: '{maNPLFilter}'
                    // },
                    listeners: {
                        change: 'onStockout_M_OrderFilterKeyup',
                        keyup: 'onStockout_M_OrderFilterKeyup',
                        buffer: 500
                    }
                },
            ]
        },
        {
            margin: 1,
            flex: 1,
            xtype: 'Stockout_Order',
        },
        {
            margin: 1,
            flex: 1,
            xtype: 'Stockout_Order_D',
        },
    ], 
});
