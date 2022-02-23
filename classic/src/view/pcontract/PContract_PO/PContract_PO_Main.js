Ext.define('GSmartApp.view.pcontract.PContract_PO_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_PO_Main',
    id: 'PContract_PO_Main',
    itemId: 'PContract_PO_Main',
    controller: 'PContract_POController',
    // viewModel: {
    //     type: 'PContract_POViewModel'
    // },    
    IdProduct: 0,
    pcontractid_link: 0,
    layout: 'border',
    items: [
        {
            region: 'center',
            layout: 'border',
            items: [
                {
                    // region: 'north',
                    region: 'center',
                    // height: '50%',
                    xtype: 'PContract_PO_List',
                    border: true,
                    margin: 1
                },
                // {
                //     region: 'center',
                //     xtype: 'PContract_PO_Shipping_List',
                //     border: true,
                //     margin: 1
                // }
            ]

        },
        {
            region: 'west',
            width: 400,
            xtype: 'PContract_PO_ProductList',
            border: true,
            margin: 1
        }
    ]
})