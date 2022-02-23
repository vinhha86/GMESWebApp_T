Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Info_Main_Window', {
    extend: 'Ext.window.Window',
    xtype: 'PContract_PO_Edit_Info_Main_Window',
    id: 'PContract_PO_Edit_Info_Main_Window',
    height: 330,
    width: 800,
    closable: true,
    resizable: false,
    modal: true,
    border: false,
    title: 'Thông tin đơn hàng',
    closeAction: 'destroy',
    bodyStyle: 'background-color: transparent',
    layout: {
        type: 'border', // fit screen for window
        padding: 5
    },
    controller: 'PContract_PO_Edit_Info_Main_Controller',
    // requires: ['Ext.ux.TreePicker'],
    viewModel: {
        type: 'PContract_PO_Edit_Info_Main_ViewModel'
    },
    items: [
        {
            region: 'center',
            layout: 'border',
            items:[
                {
                    region: 'center',
                    xtype: 'PContract_PO_Edit_Info',
                    id: 'PContract_PO_Edit_Info_window',
                    border: true,
                    margin: 1,
                },
                {
                    region: 'east',
                    width: 250,
                    xtype: 'PContract_PO_Edit_Porder_Req',
                    border: true,
                    margin: 1,
                }
            ]
        },
        // {
        //     region: 'south',
        //     height: 150,
        //     xtype: 'PContract_PO_Shipping_List',
        //     border: true,
        //     margin: 1,            
        // }
    ]
})