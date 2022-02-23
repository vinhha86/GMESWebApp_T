Ext.define('GSmartApp.view.pordercreating.POrderCreating_List_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrderCreating_List_View',
    id: 'POrderCreating_List_View',
    viewModel: {
        type: 'POrderCreating_List_ViewModel'
    },
    controller: 'POrderCreating_List_ViewCotroller',
    reference: 'POrderCreating_List_View',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{PContractStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Style KH',
        dataIndex: 'cust_contractcode',
        width: 120
    }, {
        text: 'Style nội bộ',
        dataIndex: 'contractcode',
        width: 120
    }, {
        text: 'Khách Hàng',
        dataIndex: 'orgcustomerName',
        flex: 1
    },{
        text: 'Branch',
        dataIndex: 'branchName',
        flex: 1
    },{
        text: 'Season',
        dataIndex: 'seasonName',
        flex: 1
    },{
        text: 'Ngày giao hàng',
        dataIndex: 'contractdate',
        width: 120,
        renderer: Ext.util.Format.dateRenderer('d/m/Y')
    }, {
        text: 'Người lập đơn',
        dataIndex: 'usercreatedName',
        width: 150
    },{
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fas fa-forward',
            tooltip: "Tạo lệnh sản xuất",
            handler: 'onCreatePOrder'
        }]
    }],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        border: false,
        items: [{
            xtype:'textfield',
            labelWidth: 0,
            emptyText: "Style KH",
            itemId: 'cust_contractcode',
            margin: '5 0 5 5',
            width: 120
        },{
            xtype:'textfield',
            labelWidth: 0,
            margin: '5 1 5 1',
            emptyText: "Style nội bộ",
            itemId: 'contractcode',
            width: 120
        },{
            xtype: 'combo',
            labelWidth: 0,
            emptyText:'Khách hàng',
            bind: {
                store : '{CustomerStore}'
            },
            valueField: 'id',
            displayField: 'name',
            itemId: 'orgcustomerid_link',
            margin: '5 1 5 0'
        },{
            xtype: 'combo',
            labelWidth: 0,
            emptyText:'Branch',
            bind: {
                store : '{BranchStore}'
            },
            valueField: 'id',
            displayField: 'name',
            itemId: 'branchid_link',
            margin: '5 1 5 0'
        },{
            xtype: 'combo',
            labelWidth: 0,
            emptyText:'Season',
            bind: {
                store : '{SeasonStore}'
            },
            valueField: 'id',
            displayField: 'name',
            itemId: 'seasonid_link',
            margin: '5 1 5 0'
        },{
            xtype: 'button',
            margin: '5 1 5 1',
            text: 'Tìm kiếm',
            iconCls: 'x-fa fa-filter',
            itemId: 'btnTimKiem'
        }]
    }, {
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
                store: '{PContractStore}'
            },
            emptyMsg: 'Không có kết quả tìm kiếm',
            lastText: 'Trang cuối',
            firstText: 'Trang đầu',
            displayMsg: 'Hiển thị {0} - {1} của {2}'
        }]
    }]
});

