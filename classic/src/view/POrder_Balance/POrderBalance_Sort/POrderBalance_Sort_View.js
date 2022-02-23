Ext.define('GSmartApp.view.POrder_Balance.POrderBalance_Sort_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrderBalance_Sort_View',
    itemId: 'POrderBalance_Sort_View',
    controller: 'POrderBalance_Sort_ViewController',
    viewModel: {
        type: 'POrderBalance_Sort_ViewModel'
    },
    selModel: {
        selType: 'rowmodel',
        mode: 'SINGLE'
    },
    // plugins: {
    //     cellediting: {
    //         clicksToEdit: 1
    //     }
    // },
    viewConfig: {
        stripeRows: true,
        enableTextSelection: false,
        scrollable: true,
        columnLines: true,
        rowLines: true,
        plugins: {
            ptype: 'gridviewdragdrop'
        },
        listeners: {
            drop: 'onDrop',
        }     
    },
    bind: {
        store: '{POrderBalanceStore}'
    },
    columns: [
        {
            text: 'STT',
            width: 40,
            xtype: 'rownumberer',
            align: 'center',
            sortable: false
        },
        {
            text:'Cụm công đoạn',
            dataIndex:'balance_name',
            width: 150,
            sortable: false
        },
        {
            text:'Danh sách công đoạn',
            dataIndex:'workingprocess_name',
            flex: 1,
            sortable: false,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
        {
            text:'Tổng thời gian',
            align: 'right',
            dataIndex:'timespent_standard',
            width: 80,
            sortable: false,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                return value + ' (s)';
            }
        },
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        border: false,
        items: [
            {
                xtype: 'button',
                margin: 5,
                text: 'Sắp xếp A-Z',
                width: 100,
                itemId: 'btnSort',
                bind: {
                    // hidden: '{isABCsortHidden}'
                }
            }, {
                xtype: 'button',
                margin: 5,
                text: 'Sắp xếp Z-A',
                width: 100,
                itemId: 'btnSortDesc',
                bind: {
                    // hidden: '{isABCsortHidden}'
                }
            }
        ]
    }]
});

