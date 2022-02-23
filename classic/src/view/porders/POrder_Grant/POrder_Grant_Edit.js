Ext.define('GSmartApp.view.porders.POrder_Grant_Edit', {
    extend: 'Ext.form.Panel',
    xtype: 'POrder_Grant_Edit',
    id: 'POrder_Grant_Edit',
    layout: 'border',
    items: [
        {
            region: 'north',
            border: true,
            height: 145,
            xtype: 'POrder_Grant_Edit_Info',
            padding: 1,
        },
        {
            region: 'center',
            // border: true,
            // padding: 1,
            
            layout: 'border',
            items:[
                {
                    region: 'west',
                    border: true,
                    padding: 1,
                    width: '47%',
                    xtype: 'POrder_Grant_Edit_OrderSKU'
                },
                {
                    region: 'east',
                    border: true,
                    padding: 1,
                    width: '47%',
                    xtype: 'POrder_Grant_Edit_GrantSKU'
                },
                {
                    region: 'center',
                    xtype: 'panel',
                    width: 40,
                    layout: 'center',
                    items:[
                        {
                            xtype: 'container',
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'button',
                                    tooltip: 'Thêm vào chuyền',
                                    //margin: '0 0 20 0',
                                    iconCls: 'x-fa fa-arrow-right',
                                    weight: 30,
                                    handler: 'onAddToGrantt'
                                },
                                {
                                    xtype: 'button',
                                    tooltip: 'Hủy khỏi chuyền',
                                    margin: '10 0 0 0',
                                    iconCls: 'x-fa fa-arrow-left',
                                    weight: 30,
                                    handler: 'onRemoveFromGrantt'
                                    // handler: 'onRemovePklistFromStockout'
                                }       
                            ]
                        }
                       
                    ]
                }  
            ]
        }
    ]
})