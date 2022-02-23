Ext.define('GSmartApp.view.tagencode.Encode_POrder', {
    extend: 'Ext.grid.Panel',
    xtype: 'Encode_POrder',
    id: 'Encode_POrder',
    controller: 'Encode_POrder_Controller',
    border: true,
    bind: {
        store: '{Porder_SKU_Store}'
    },
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    columnLines: true,
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false
    },
    columns: [
        { header: 'Mã lệnh', dataIndex: 'pordercode', width: 80},
        { header: 'Mã vạch', dataIndex: 'skucode', width: 120},
        { header: 'Mã SP', dataIndex: 'product_code', width: 80},
        { header: 'Tên SP', dataIndex: 'skuname', flex: 1},
        { header: 'SL lệnh', dataIndex: 'pquantity_total', width: 70, summaryType: 'sum', summaryRenderer: 'renderSum'},
        { header: 'Đã mã', dataIndex: 'pquantity_encode', width: 70, summaryType: 'sum', summaryRenderer: 'renderSum'},
        { header: 'Còn lại', dataIndex: 'pquantity_remain', width: 70, summaryType: 'sum', summaryRenderer: 'renderSum', headerWrap: true},
        {
            xtype: 'actioncolumn',
            width: 30,
            menuDisabled: true,
            sortable: false,
            items: [{
                iconCls: 'x-fa fas fa-forward',
                tooltip: 'Chọn mã vạch để in',
                handler: 'onPrint'
            }]
        }
    ],
    dockedItems: [
        {
            dock: 'top',
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'textfield',
                    margin: '0 0 0 5',
                    itemId:'ordercode',
                    fieldLabel: 'Lệnh sản xuất:',
                    flex: 1,
                    labelWidth: 90,
                    hideLabel: false,
                    bind: {
                        readOnly: '{isEdit}'
                    }
                },
                {
                    xtype: 'textfield',
                    margin: '0 0 0 5',
                    itemId:'skucode',
                    fieldLabel: 'Mã vạch:',
                    width: 200,
                    labelWidth: 60,
                    hideLabel: false,
                    bind: {
                        readOnly: '{isEdit}'
                    }
                },                
                {
                    tooltip: 'Tìm kiếm',
                    itemId: 'btnTimKiem',
                    margin: '0 5 0 5',
                    //text: 'Thêm thẻ vải',
                    iconCls: 'x-fa fa-search',
                    weight: 30,
                    bind: {
                        disabled: '{isEdit}'
                    }
                }   
            ]
        }
    ]
});
