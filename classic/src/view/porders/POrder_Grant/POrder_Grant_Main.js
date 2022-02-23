Ext.define('GSmartApp.view.porders.POrder_Grant_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'POrder_Grant_Main',
    id: 'POrder_Grant_Main',
    controller: 'POrder_Grant_Controller',
    viewModel: {
        type: 'POrder_Grant_ViewModel'
    },
    callviewid_link: 0,
    porderid_link: null,
    pcontract_poid_link: null,
    pcontractid_link: null,
    granttoorgid_link: null,
    granttoorg_name: null,
    
    layout: 'border',
    items: [
        {
            region: 'center',
            border: true,
            xtype: 'POrder_Grant_Edit',
            // padding: 1,
        },
        // {
        //     region: 'east',
        //     border: true,
        //     title: 'Tiến độ',
        //     xtype: 'POrderProcessingLineChart',
        //     // padding: 1,
        //     width: 500,     
        //     hidden: true    
        // }
    ],
    dockedItems:[{
        dock:'bottom',
        layout:'hbox',
        border: false,
        items:[{
            border: false,
            flex : 1
        },{
            xtype:'button',
            text: 'Xác nhận',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save'
        },{
            xtype:'button',
            text: 'Hủy bỏ',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }]
    }]
})