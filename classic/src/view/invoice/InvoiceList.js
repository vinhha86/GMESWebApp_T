Ext.define('GSmartApp.view.invoice.InvoiceList', {
    extend: 'Ext.grid.Panel',
	xtype: 'InvoiceList',
	id: 'InvoiceList',
    controller: 'InvoiceListController',
	viewModel: {
        type: 'InvoiceListViewModel'
	},
	bind: {
		store: '{Invoice_Store}'
	},
	columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    },
	{
		text: 'Mã đơn hàng',
		dataIndex: 'pcontractcode',
		width: 120
	},	
	{
		text: 'Số hóa đơn',
		dataIndex: 'invoicenumber',
		width: 100
	},
	// {
	// 	text: 'Ngày hóa đơn',
	// 	xtype: 'datecolumn',
	// 	format: 'd/m/Y',
	// 	dataIndex: 'invoicedate',
	// 	width: 120
	// },
	{
		text: 'Dự kiến về',
		dataIndex: 'shipdateto',
		xtype: 'datecolumn',
		format: 'd/m/Y',
		width: 120
	},{
		text: 'Nhà cung cấp',
		dataIndex: 'orgProviderName',
		flex: 1
	},{
		text: 'Số tờ khai',
		dataIndex: 'custom_declaration',
		width: 90
	},{
		text: 'Số lượng',
		dataIndex: 'invoiceDTotalPackage',
		xtype: 'numbercolumn',
		format: '0,000',
		width: 100
	},{
		text: 'Ngày nhập kho',
		dataIndex: 'stockout_date',
		xtype: 'datecolumn',
		format: 'd/m/Y',
		width: 120
	},{
		text: 'Trạng thái',
		dataIndex: 'status_name',
		width: 120
	},{
        xtype: 'actioncolumn',
        width: 50,
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fas fa-edit',
            tooltip: "Chi tiết",
            handler: 'onEdit'
        }, {
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onDelete'
        }]
    }],
	dockedItems: [{
		dock: 'top',
		layout: 'hbox',
		items: [{
            xtype: 'button',
            margin: 5,
            text: 'Thêm mới',
            width: 110,
            iconCls: 'x-fa fa-plus',
            itemId: 'btnThemMoi'
        },{
			xtype:'textfield',
			itemId: 'invoicenumber',
			emptyText:'Số hóa đơn',
			width: 100,
			labelWidth: 0,
			margin: '5 0 5 0'
		},{
			xtype:'textfield',
			emptyText:'Số tờ khai',
			itemId: 'custom_declaration',
			width: 100,
			labelWidth: 0,
			margin: '5 0 5 0'
		},{
			xtype:'datefield',
			labelWidth: 0,
			emptyText: 'Ngày HĐ từ',
			itemId: 'invoicedate_from',
			editable: false,
			margin: '5 0 5 0',
			value: new Date(),
			// value: new Date().setDate(new Date().getDate()-30),
			width: 125,
            format:'d/m/Y'
		},{
			xtype:'datefield',
			labelWidth: 0,
			emptyText: 'Ngày HĐ đến',
			itemId: 'invoicedate_to',
			editable: false,
			margin: '5 0 5 0',
			width: 125,
			value: new Date(),
            format:'d/m/Y'
		},{
            xtype: 'combobox',
			emptyText: 'Nhà cung cấp',
			itemId: 'org_prodviderid_link',
            bind:{
                store: '{OrgProviderStore}'
            },
            queryMode: 'local',
			anyMatch: true,
            margin: '5 0 5 0',
            displayField: 'name',
            valueField: 'id'
        },{
            xtype: 'combobox',
			emptyText: 'Trạng thái',
			itemId: 'status',
            bind:{
                store: '{Invoice_status_store}'
			},
			value: 0,
            queryMode: 'local',
			anyMatch: true,
            margin: '5 0 5 0',
            displayField: 'name',
            valueField: 'id'
        },{
            xtype: 'button',
            margin: 5,
            iconCls: 'x-fa fa-search',
            itemId: 'btnTimKiem'
        }]
	},{
        dock: 'bottom',
        layout: 'hbox',
        xtype: 'toolbar',
        border: false,
        items: [{
            xtype: 'textfield',
            value: 25,
            itemId: 'limitpage',
            maskRe: /[0-9]/,
            width: 180,
            selectOnFocus: true,
            margin: 5,
            fieldLabel: 'Số bản ghi/ Trang',
            labelWidth: 120
        }, '-', {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            flex: 1,
            nextText: 'Trang tiếp',
            prevText: 'Trang trước',
            afterPageText: '/ {0}',
            beforePageText: 'Trang',
            itemId: 'page',
            refreshText: 'Làm mới dữ liệu',
            border: false,
            bind: {
                store: '{Invoice_Store}'
            },
            emptyMsg: 'Không có kết quả tìm kiếm',
            lastText: 'Trang cuối',
            firstText: 'Trang đầu',
            displayMsg: 'Hiển thị {0} - {1} của {2}'
        }]
    }]
});

