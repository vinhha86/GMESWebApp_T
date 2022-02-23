Ext.define('GSmartApp.view.balance.Balance_Main', {
    extend: 'Ext.container.Container',
    xtype: 'Balance_Main',
    id: 'Balance_Main',
    controller: 'Balance_Main_Controller',
    viewModel: {
        type: 'Balance_ViewModel'
    },    
	layout: {
        type: 'border'
    },
    items: [
        // {
        //     region: 'west',
        //     width: 300,
        //     xtype: 'Balance_Product_Select',
        //     id: 'Balance_Product',
        // },
        {
            region: 'center',
            xtype: 'Balance_D'
        }
    ] 
});
