Ext.define('GSmartApp.view.handover.HandoverPackFromLine_Detail_SkuGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'HandoverPackFromLine_Detail_SkuGrid',
    id: 'HandoverPackFromLine_Detail_SkuGrid',
    reference: 'HandoverPackFromLine_Detail_SkuGrid',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEditSkuTotalPackage'
            } 
        }
    },
    bind: {
        store: '{HandoverSkuStore}'
    },
    columns:[
        // { header: 'SKU', dataIndex: 'skuCode', flex: 1},
        // { header: 'Mã vạch', dataIndex: 'barcode', flex: 1},
        { header: 'Màu', dataIndex: 'skuColor', flex: 1},
        { header: 'Cỡ', dataIndex: 'skuSize', width: 70},  
        { 
            text: 'SL giao',
            dataIndex: 'totalpackage',
            // editor:{
            //     xtype:'textfield',
            //     maskRe: /[0-9]/,
            //     selectOnFocus: true
            // },
            renderer: function(value){
                return Ext.util.Format.number(parseFloat(value), '0,000');
            },
            flex: 1,
            align: 'end'
        },
        { 
            text: 'SL nhận',
            dataIndex: 'totalpackagecheck',
            editor:{
                xtype:'textfield',
                maskRe: /[0-9]/,
                selectOnFocus: true
            },
            renderer: function(value){
                return Ext.util.Format.number(parseFloat(value), '0,000');
            },
            flex: 1,
            align: 'end'
        }
    ]
});

