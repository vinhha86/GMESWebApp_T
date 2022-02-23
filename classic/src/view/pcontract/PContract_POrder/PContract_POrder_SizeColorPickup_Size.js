Ext.define('GSmartApp.view.pcontract.PContract_POrder_SizeColorPickup_Size', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_POrder_SizeColorPickup_Size',
    id:'PContract_POrder_SizeColorPickup_Size',
    
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    }, 
    bind:{
        store:'{SizePickupStore}'
    },
    columns:[
        { header: 'Cỡ', dataIndex: 'name', flex:1},  
    ]     
});

