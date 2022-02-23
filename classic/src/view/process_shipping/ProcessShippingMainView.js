Ext.define('GSmartApp.view.process_shipping.ProcessShippingMainView', {
    extend: 'Ext.form.Panel',
    xtype: 'ProcessShippingMainView',
    id: 'ProcessShippingMainView',
    itemId: 'ProcessShippingMainView',
    controller: 'ProcessShippingMainViewController',
    viewModel: {
        type: 'ProcessShippingMainViewModel'
    },
    layout: 'border',
    items: [
        {
            region: 'north',
            xtype: 'POLineView',
            margin: 1,
            border: true,
            bind: {
                height: '{heightPOLine}'
            }
        },
        {
            region: 'center',
            layout: 'border',
            items: [{
                region: 'west',
                xtype: 'POrderView',
                width: 300,
                margin: 1,
                border: true
            }, {
                region: 'center',
                xtype: 'tabpanel',
                itemId: 'tabDetail',
                margin: 1,
                border: true,
                items: [{
                    title: 'Chi tiết lệnh',
                    xtype: 'form',
                    layout: 'border',
                    items: [{
                        region: 'west',
                        width: '50%',
                        xtype: 'POLineSKU',
                        margin: 1,
                        border: true
                    }, {
                        region: 'center',
                        xtype: 'POrderSKU',
                        border: true
                    }]
                }, {
                    title: 'Chi tiết tổ',
                    xtype: 'SizeBreakdown_Grant_MainView'
                },
                // {
                //     title: 'Định mức',
                //     xtype: 'POrderBom2View'
                // }, 
                {
                    title: 'Cân đối NPL',
                    xtype: 'Balance_D_POrder'
                }]
            }]
        }
    ],
})