Ext.define('GSmartApp.view.pcontract.PContract_POrder_SizeColorPickup_Color', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_POrder_SizeColorPickup_Color',
    id:'PContract_POrder_SizeColorPickup_Color',
    
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
        store:'{ColorPickupStore}'
    },
    columns:[
        { header: 'Màu', dataIndex: 'name', flex:1},  
    ]     
});

