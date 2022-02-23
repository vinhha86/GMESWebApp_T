Ext.define('GSmartApp.view.pcontract.PContract_POrder_SizeColorPickup_Product', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_POrder_SizeColorPickup_Product',
    id:'PContract_POrder_SizeColorPickup_Product',
    
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
        store:'{PContractProduct_PO_Store}'
    },
    columns:[
        {
            text:'Mã Buyer (SP)',
            dataIndex:'code',
            width: 100,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }   
        },{
            text:'Mô tả',
            dataIndex:'info',
            flex: 1,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
        {
            text:'SL',
            dataIndex:'pquantity',
            width: 90,
            align: 'right',
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
            }
        }
    ]     
});

