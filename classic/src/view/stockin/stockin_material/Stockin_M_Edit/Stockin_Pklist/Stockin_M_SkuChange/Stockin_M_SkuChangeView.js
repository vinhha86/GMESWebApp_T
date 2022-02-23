Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.stockin_pklist.Stockin_M_SkuChangeView', {
	extend: 'Ext.grid.Panel',
	xtype: 'Stockin_M_SkuChangeView',
	itemId: 'Stockin_M_SkuChangeView',
	cls: 'Stockin_M_SkuChangeView',
	controller: 'Stockin_M_SkuChangeViewController',
    viewModel: {
        type: 'Stockin_M_SkuChangeViewModel'
    },
	columnLines: true,
	rowLines: true,
	border: true,
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false               
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
	bind:{
		store: '{Stockin_d_Store}'
	},

	columns: [
		{
			text: 'Mã nguyên phụ liệu',
			dataIndex: 'skuCode',
			sortable: true,
			flex: 1
		},
	],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        border: false,
        items: [
            {
				margin: 3,
				xtype:'button',
				text:  'Thoát',
				iconCls: 'x-fa fa-window-close',
				itemId: 'btnThoat'
			},
			{
				margin: 3,
				xtype:'button',
				text:  'Lưu',
				iconCls: 'x-fa fa-save',
				itemId: 'btnLuu'
			},
			{
				flex: 1
			},
		]
    }]
});

