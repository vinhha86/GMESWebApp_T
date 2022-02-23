Ext.define('GSmartApp.view.pcontract.PContract_POrder_Edit_POSKU', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_POrder_Edit_POSKU',
    id: 'PContract_POrder_Edit_POSKU',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
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
        store:'{POSKUStore}'
    },
    columns:[
        { header: 'SKU', dataIndex: 'skuCode', flex: 1},
        { header: 'Màu', dataIndex: 'mauSanPham', width: 100},
        { header: 'Cỡ', dataIndex: 'coSanPham', width: 60},  
        { header: 'SL đơn hàng', dataIndex: 'pquantity_total', width: 85, summaryType: 'sum', align: 'end', 
            summaryRenderer: 'renderSum',
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                // return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
                return Ext.util.Format.number(value, '0,000');
            }
        },
        { header: 'SL trong lệnh', dataIndex: 'pquantity_lenhsx', width: 85, summaryType: 'sum', align: 'end', 
            summaryRenderer: 'renderSum',
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                return Ext.util.Format.number(value, '0,000');
            }
        },
        { header: 'SL còn lại', dataIndex: 'pquantity_free', width: 85, summaryType: 'sum', align: 'end', 
            summaryRenderer: 'renderSum',
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                return Ext.util.Format.number(value, '0,000');
            }
        }             
    ]  
});

