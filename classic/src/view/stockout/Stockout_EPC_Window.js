Ext.define('GSmartApp.view.stockout.Stockout_EPC_Window', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_EPC_Window',
    itemId: 'Stockout_EPC_Window',
    controller: 'Stockout_EPC_Controller',
    viewModel: {
        type: 'Stockout_EPC_Model'
    },
    viewConfig: {
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
        stripeRows: false,
    },
	// plugins: {
    //     cellediting: {
    //         clicksToEdit: 1,
	// 		listeners: {
    //             edit: 'onItemSkuEdit',
    //         }    
    //     }
    // },
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'MULTI',
    //     checkOnly: true
    // },
    bind: {
        store: '{stockout_d.stockout_packinglist}'
    },
    columns: [
        {
            text: 'STT',
            width: 40,
            xtype: 'rownumberer',
            align: 'center'
        },
        {
            text: 'Mã chíp',
            dataIndex: 'epc',
            // flex: 1,
            width: 250,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
        {
            text: 'Ghi chú',
            dataIndex: 'extrainfo',
            flex: 1,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
    ],

    dockedItems: [{
        dock: 'top',
        xtype: 'container',
        layout: 'hbox',
        border: true,
        style: "background-color : white;",
        items: [{
            labelWidth: 120,
            margin:'3',
            xtype: 'combobox',
            editable: false,
            fieldLabel: 'Loại thành phẩm',
            bind: {
                store: '{TPGroupStore}',
                value: '{TPGroupStoreValue}'
            },
            width: 270,
            displayField: 'name',
            valueField: 'value',
            itemId: 'TPGroupStoreCbbox'
        }, {
            xtype: 'button',
            itemId: 'btnLuu',
            tooltip: 'Lưu',
            text:  'Lưu',
            iconCls: 'x-fa fa-floppy-o',
            margin:'3',
        }]
    }]
});

