Ext.define('GSmartApp.view.stockin.stockin_product.stockin_p_edit.stockin_POLINE.Stockin_POLINE_Sku', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockin_POLINE_Sku',
    itemId: 'Stockin_POLINE_Sku',
    controller: 'Stockin_POLINE_Sku_Controller',
    // viewModel: {
    //     type: 'Stockout_POLINE_ViewModel'
    // },
    viewConfig: {
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
	plugins: {
        cellediting: {
            clicksToEdit: 1,
			listeners: {
                edit: 'onItemSkuEdit',
            }    
        }
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        checkOnly: true
    },
    bind: {
        store: '{PContractSKUStore}'
    },
    columns: [
        {
            text: 'STT',
            width: 40,
            xtype: 'rownumberer',
            align: 'center'
        },
        {
            text: 'Mã SP',
            dataIndex: 'skuCode',
            flex: 1,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
        {
            text: 'Màu',
            dataIndex: 'mauSanPham',
            flex: 1,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
        {
            text: 'Cỡ',
            dataIndex: 'coSanPham',
            width: 50,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
        {
            text: 'SL',
            dataIndex: 'so_luong_yeu_cau',
            width: 70,
            editor:{
                xtype:'textfield',
                maskRe: /[0-9]/,
                selectOnFocus: true,
            },
        },
]
});

