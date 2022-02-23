Ext.define('GSmartApp.view.pcontract.PContract_POrder_Edit_PorderSKU', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_POrder_Edit_PorderSKU',
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
                edit: 'onPorder_EditSKU'
            } 
        }
    },    
    features: [{
        ftype:'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    }, 
    bind:{
        store:'{porderSKUStore}'
    },
    columns:[
        { header: 'SKU', dataIndex: 'skucode', flex: 1},
        { header: 'Màu', dataIndex: 'mauSanPham', width: 100},
        { header: 'Cỡ', dataIndex: 'coSanPham', width: 70},  
        { header: 'Số lượng', dataIndex: 'pquantity_total', width: 80, summaryType: 'sum', align: 'end', 
            summaryRenderer: 'renderSum',
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                return Ext.util.Format.number(value, '0,000');
            },
            editor:{
                xtype:'textfield',
                maskRe: /[0-9.]/,
                selectOnFocus: true            },
        }
    ]     
});

