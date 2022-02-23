Ext.define('GSmartApp.view.handover.HandoverCutToPrint_Detail_SkuGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'HandoverCutToPrint_Detail_SkuGrid',
    id: 'HandoverCutToPrint_Detail_SkuGrid',
    reference: 'HandoverCutToPrint_Detail_SkuGrid',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }], 
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
            editor:{
                xtype:'textfield',
                maskRe: /[0-9]/,
                selectOnFocus: true
            },
            renderer: function(value){
                return Ext.util.Format.number(parseFloat(value), '0,000');
            },
            flex: 1,
            align: 'end',
            summaryType: 'sum', summaryRenderer: 'renderSum'
        },
        { 
            text: 'SL nhận',
            dataIndex: 'totalpackagecheck',
            // editor:{
            //     xtype:'textfield',
            //     maskRe: /[0-9]/,
            //     selectOnFocus: true
            // },
            renderer: function(value){
                return Ext.util.Format.number(parseFloat(value), '0,000');
            },
            flex: 1,
            align: 'end',
            summaryType: 'sum', summaryRenderer: 'renderSum'
        }
    ]
});

