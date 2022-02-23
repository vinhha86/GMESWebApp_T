Ext.define('GSmartApp.view.pcontract.PContract_POrder_Edit_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_POrder_Edit_Main',
    id: 'PContract_POrder_Edit_Main',
    layout: 'border',
    controller: 'PContract_POrder_Edit_Controller',
    // requires: ['Ext.ux.TreePicker'],
    viewModel: {
        type: 'PContract_POrder_Edit_ViewModel'
    },
    items: [
        {
            region: 'center',
            layout: 'border',
            items:[
                {
                    region: 'east',
                    title: 'Chi tiết lệnh',
                    width:'40%',
                    xtype: 'PContract_POrder_Edit_PorderSKU',
                    itemId:'PContract_POrder_Edit_PorderSKU',
                    border: true,
                    margin: 1,
                },
                {
                    region: 'west',
                    title: 'Chi tiết đơn hàng',
                    width:'55%',
                    xtype: 'PContract_POrder_Edit_POSKU',
                    border: true,
                    margin: 1,
                },
                {
                    region: 'center',
                    xtype: 'panel',
                    layout: 'center',
                    items:[
                        {
                            xtype: 'container',
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'button',
                                    tooltip: 'Thêm vào Lệnh',
                                    //margin: '0 0 20 0',
                                    iconCls: 'x-fa fa-arrow-right',
                                    weight: 30,
                                    handler: 'onPorder_AddSKU'
                                },
                                {
                                    xtype: 'button',
                                    tooltip: 'Hủy khỏi Lệnh',
                                    margin: '10 0 0 0',
                                    iconCls: 'x-fa fa-arrow-left',
                                    weight: 30,
                                    handler: 'onPorder_RemoveSKU'
                                }       
                            ]
                        }
                    ]
                }                
            ]
        },
        // {
        //     region: 'north',
        //     height: 50,
        //     xtype: 'panel',
        //     border: true,
        //     margin: 1,
        //     items:[
        //         {
        //             xtype: 'panel',
        //             margin: 2,
        //             width: '100%',
        //             layout: 'hbox',
        //             items:[
        //                 {
        //                     xtype: 'textfield',
        //                     labelStyle: "font-size:11px;padding:5px 0px 0px 5px;",
        //                     fieldStyle: 'font-size:11px;font-weight:bold;text-align:right;background-color:azure',                            
        //                     fieldLabel: "NS xưởng",
        //                     bind: {
        //                         value: '{porder.plan_productivity}'
        //                     },
        //                     labelWidth: 80,
        //                     width: '50%',
        //                 },
        //                 {
        //                     xtype: 'textfield',
        //                     labelStyle: "font-size:11px;padding:5px 0px 0px 5px;",
        //                     fieldStyle: 'font-size:11px;text-align:right;background-color:azure',                            
        //                     fieldLabel: "SL chuyền",
        //                     bind: {
        //                         value: '{porder.plan_linerequired}'
        //                     },
        //                     labelWidth: 80,
        //                     width: '50%',
        //                 },                
        //             ]                      
        //         }                
        //     ]          
        // }
    ],
    dockedItems:[{
        dock:'bottom',
        layout: 'hbox',
        items:[{
            flex:1
        },{
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        }]
    }]
})