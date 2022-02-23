Ext.define('GSmartApp.view.pordercreating.POrderCreating_New_View', {
    extend: 'Ext.form.Panel',
    xtype: 'POrderCreating_New_View',
    id: 'POrderCreating_New_View',
    controller: 'POrderCreating_New_ViewController',
    // viewModel: {
    //     type: 'POrderCreating_New_ViewModel'
    // },
    // layout: 'border',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },    
    // border: true,
    items: [
        // {
        //     region: 'north',
        //     height: 115,
        //     border: true,
        //     xtype: 'POrder_Creating_Info_View',
        //     margin: 1
        // },
        {
            border: true,
            xtype: 'PContract_POList',
            padding: 5,
            width: '30%',                   
        },
        {
            // region: 'west',
            border: true,
            // width: '50%',
            // margin: 1,
            title: 'Sản phẩm theo đơn hàng',
            xtype: 'POrderCreating_New_Product',
            padding: 5,
            width: '33%',       
        },
        {
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
                            tooltip: 'Thêm vào Lệnh sản xuất',
                            //margin: '0 0 20 0',
                            iconCls: 'x-fa fa-arrow-right',
                            weight: 30,
                            handler: 'onTaoLenh'
                        },
                        {
                            xtype: 'button',
                            tooltip: 'Hủy khỏi Lệnh sản xuất',
                            margin: '10 0 0 0',
                            iconCls: 'x-fa fa-arrow-left',
                            weight: 30,
                            // handler: 'onRemovePklistFromStockout'
                        }       
                    ]
                }
            ]
        },        
        {
            // region: 'center',
            border: true,
            // margin: 1,
            title: 'Lệnh sản xuất',
            xtype: 'POrderCreating_New_POrder',
            padding: 5,
            flex: 1            
        }
    ],
    // dockedItems: [{
    //     layout: 'hbox',
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
    //     }]
    // }]
})