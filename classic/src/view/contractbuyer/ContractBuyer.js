Ext.define('GSmartApp.view.contractbuyer.ContractBuyer', {
    extend: 'Ext.grid.Panel',
    xtype: 'ContractBuyer',
    id: 'ContractBuyer',
    viewModel: {
        type: 'ContractBuyerViewModel'
    },
    controller: 'ContractBuyerController',
    reference: 'ContractBuyer',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{ContractBuyerStore}'
    },
    columns: [
    {
        xtype: 'actioncolumn',
        width: 50,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            iconCls: 'x-fa fas fa-edit',
            tooltip: "Chi tiết",
            handler: 'onCapNhat',
        }, {
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa',
        }]
    },{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã hợp đồng',
        dataIndex: 'contract_code',
        width: 150,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Năm hợp đồng',
        dataIndex: 'contract_year',
        width: 60,
        align: 'center'
    },{
        text: 'Ngày hợp đồng',
        dataIndex: 'contract_date',
        width: 100,
        align: 'center',
        renderer: Ext.util.Format.dateRenderer('d/m/Y')
    },
    {
        text: 'Ngày kết thúc',
        dataIndex: 'contract_date_finish',
        width: 100,
        align: 'center',
        renderer: Ext.util.Format.dateRenderer('d/m/Y')
    },
    {
        text: 'Buyer',
        dataIndex: 'buyerNames',
        width: 250,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Vendor',
        dataIndex: 'vendorName',
        width: 120,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Chú thích',
        dataIndex: 'comment',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        border: false,
        items: [{
            xtype: 'button',
            margin: '5 1 5 1',
            text: 'Thêm mới',
            width: 105,
            iconCls: 'x-fa fa-plus',
            itemId: 'btnThemMoi',
        },{
            xtype:'textfield',
            labelWidth: 0,
            margin: '5 1 5 0',
            emptyText: "Mã hợp đồng",
            itemId: 'contract_code',
            width: 120,
			enableKeyEvents : true,
        },{
            xtype: 'combo',
            labelWidth: 0,
            emptyText:'Năm',
            bind: {
                store : '{ContractBuyerYearsStore}'
            },
            valueField: 'contract_year',
            displayField: 'contract_year',
            itemId: 'contract_year',
            margin: '5 1 5 0',
            width: 100,
			enableKeyEvents : true,
        },{
            xtype: 'datefield',
            labelWidth: 0,
            emptyText:'Từ ngày',
            itemId: 'contract_datefrom',
            reference: 'contract_datefrom',
            format:'d/m/Y',
            margin: '5 1 5 0',
            width: 130,
			enableKeyEvents : true,
        },{
            xtype: 'datefield',
            labelWidth: 0,
            emptyText:'Đến ngày',
            itemId: 'contract_dateto',
            reference: 'contract_dateto',
            format:'d/m/Y',
            margin: '5 1 5 0',
            width: 130,
			enableKeyEvents : true,
        },{
            xtype: 'combo',
            labelWidth: 0,
            emptyText:'Buyer',
            bind: {
                store : '{EndBuyer}'
            },
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            anyMatch: true,
            itemId: 'buyerid_link',
            margin: '5 1 5 0',
            width: 130,
			enableKeyEvents : true,
        },{
            xtype: 'combo',
            labelWidth: 0,
            emptyText:'Vendor',
            bind: {
                store : '{Vendor}'
            },
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            anyMatch: true,
            itemId: 'vendorid_link',
            margin: '5 1 5 0',
            width: 130,
			enableKeyEvents : true,
        },{
            xtype: 'button',
            margin: '5 1 5 1',
            // text: 'Tìm kiếm',
            iconCls: 'x-fa fa-search',
            itemId: 'btnTimKiem'
        }]
    }, {
        dock: 'bottom',
        layout: 'hbox',
        xtype: 'toolbar',
        border: false,
        cls: 'botToolbar',
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
                store: '{ContractBuyerStore}'
            },
            emptyMsg: 'Không có kết quả tìm kiếm',
            lastText: 'Trang cuối',
            firstText: 'Trang đầu',
            displayMsg: 'Hiển thị {0} - {1} của {2}'
        }]
    }]
});

