Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_TonKho.Stockout_P_TonKho', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_P_TonKho',
    itemId: 'Stockout_P_TonKho',
    controller: 'Stockout_P_TonKho_Controller',
    viewModel: {
        type: 'Stockout_P_TonKho_ViewModel'
    },
    border: true,
    bind:{
        store: '{StockoutD_Store}'
    },
    columnLines: true,
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
    },
    columns: [
        {
			header: 'Mã vạch', 
			dataIndex: 'skuCode',
			width: 120,
		},{
			header: 'Mã SP', 
			dataIndex: 'productcode',
            width: 120,
		},{
			header: 'Tên sản phẩm', 
			dataIndex: 'productname',
			flex: 1
		},
        {
			text: 'Màu', 
			dataIndex: 'mauSanPham',
			flex: 1
		},{
			text: 'Cỡ', 
			dataIndex: 'coSanPham',
			width: 50
		},
        {
            header: 'Tồn kho', dataIndex: 'so_luong_ton_kho', width: 90,
            align:'right',
        },
    ],
    dockedItems: [{
        dock: 'bottom',
        xtype: 'container',
        items: [
            {
                margin: '5',
                xtype:'button',
                text:  "Thoát",
                iconCls: 'x-fa fa-window-close',
                itemId: 'btnThoat',
            }
        ]
    }]
});
