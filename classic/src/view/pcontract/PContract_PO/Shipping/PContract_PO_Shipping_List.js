Ext.define('GSmartApp.view.pcontract.PContract_PO_Shipping_List', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_PO_Shipping_List',
    // id:'PContract_PO_Shipping_List',

    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
        getRowClass: function (record, index) {
            if (record.data.status == 1) {
                return "accept";
            }
        }
    },
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            } 
        }
    },
    bind:{
        store:'{POShippingStore}'
    },
    columns:[{
        text:'Số Line',
        dataIndex:'code',
        width: 100
    },{
        text:'Ngày giao',
        dataIndex:'shipdate',
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        width: 80
    },{
        text:'SL giao',
        dataIndex:'shipamount',
        width: 80
    },{
        text:'Cảng gửi',
        dataIndex:'portfromname',
        width: 150
    },{
        text:'Cảng nhận',
        dataIndex:'porttoname',
        width: 150
    },{
        text:'Đóng gói',
        dataIndex:'packingnoticecode',
        flex: 1
    },{
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        sortable: false,
        items: [
            {
                iconCls: 'x-fa fas fa-bars violetIcon',
                handler: 'onMenu_Shipping'
            },            
        ]
    }],
    // dockedItems:[{
    //     dock:'top',
    //     xtype:'toolbar',
    //     padding: '0 0 10 5',
    //     height: 35,
    //     items:[{
    //         xtype:'displayfield',
    //         fieldStyle: "font-weight: bold; font-size: 14px; color: black",
    //         labelWidth : 0,
    //         bind:{
    //             value: 'Kế hoạch (Line) giao hàng'
    //         }
    //     },
	// 	'->'
	// 	,
	//     {
    //         xtype:'button',
    //         itemId:'btnThemMoi',
    //         ui: 'header',
	// 		tooltip: 'Thêm kế hoạch giao hàng',
    //         iconCls: 'x-fa fa-plus',
    //         handler: 'onAddPOTap',
    //     },
    //     // {
    //     //     xtype:'button',
    //     //     itemId:'btnShowFactory',
    //     //     ui: 'header',
	// 	// 	tooltip: 'Xem năng suất nhà máy',
    //     //     iconCls: 'x-fa fa-industry',
    //     //     handler: 'onFactoriesTap',
    //     // }
    //     ]
    // }]
});

