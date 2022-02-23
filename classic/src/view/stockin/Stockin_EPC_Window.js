Ext.define('GSmartApp.view.stockin.Stockin_EPC_Window', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockin_EPC_Window',
    itemId: 'Stockin_EPC_Window',
    controller: 'Stockin_EPC_Controller',
    viewModel: {
        type: 'Stockin_EPC_Model'
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
        store: '{stockin_d.stockin_packinglist}'
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
