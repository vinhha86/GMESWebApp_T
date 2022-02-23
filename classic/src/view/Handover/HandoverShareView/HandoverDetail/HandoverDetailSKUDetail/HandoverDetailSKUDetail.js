Ext.define('GSmartApp.view.handover.HandoverDetailSKUDetail', {
    extend: 'Ext.grid.Panel',
    xtype: 'HandoverDetailSKUDetail',
    id: 'HandoverDetailSKUDetail',
    reference: 'HandoverDetailSKUDetail',
    controller: 'HandoverDetailSKUDetailController',
    viewModel:{
        // type:'HandoverDetailSKUDetailViewModel'
    },
    viewConfig: {
        stripeRows: false,
        enableTextSelection: false,
        columnLines: true,
        rowLines: true,
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEditHandoverSKU'
            } 
        }
    },    
    features: [{
        ftype:'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'MULTI'
    // }, 
    bind:{
        store:'{HandoverSkuStore}'
    },
    columns:[
        { header: 'SKU', dataIndex: 'skuCode', flex: 1},
        { header: 'Mã vạch', dataIndex: 'barcode', width: 150},
        { header: 'Màu', dataIndex: 'skuColor', width: 100},
        { header: 'Cỡ', dataIndex: 'skuSize', width: 70},  
        { header: 'Số lượng', dataIndex: 'totalpackage', width: 80, summaryType: 'sum', align: 'end', 
            summaryRenderer: 'renderSum',
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                return Ext.util.Format.number(value, '0,000');
            },
            editor:{
                xtype:'textfield',
                maskRe: /[0-9.]/,
                selectOnFocus: true,
                listeners: {
                    specialkey: 'onSpecialkey'
                }
            },
        }
    ]
});

