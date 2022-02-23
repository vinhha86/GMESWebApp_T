Ext.define('GSmartApp.view.tagencode.Encode_Porder_List', {
    extend: 'Ext.grid.Panel',
    xtype: 'Encode_Porder_List',
    id: 'Encode_Porder_List',
    controller: 'Encode_Porder_List_Controller',
    viewModel: {
        type: 'Encode_Porder_List_ViewModel'
    },
    reference: 'Encode_List',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{Porder_Encode_Store}'
    },
    columns: [{
        text: 'Lệnh sản xuất',
        dataIndex: 'porder_code',
        width: 200
    },
    {
        text: 'Số phiên',
        dataIndex: 'session_code',
        width: 200
    },
    {
        text: 'Người mã hóa',
        dataIndex: 'usercreate_name',
        flex: 1
    },
    {
        text: 'Ngày mã hóa',
        xtype: 'datecolumn',
        format: 'd/m/Y',
        dataIndex: 'timecreate',
        width: 120
    },
    {
        text: 'Thiết bị',
        dataIndex: 'device_name',
        width: 200
    },
    {
        text: 'Trạng thái',
        dataIndex: 'status_name',
        width: 100
    },
    {
        xtype: 'actioncolumn',
        width: 50,
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fas fa-edit',
            tooltip: GSmartApp.Locales.btn_sua[GSmartApp.Locales.currentLocale],
            handler: 'onEdit'
        }]
    }],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        xtype: 'toolbar',
        border: false,
        items: [{
            xtype: 'button',
            margin: 3,
            text: 'Lập phiên mới',
            iconCls: 'x-fa fa-plus',
            itemId: 'btnThemMoi'
        }, {
            itemId: 'pordercode',
            xtype: 'textfield',
            emptyText: 'Lệnh sản xuất',
            margin: 3
        }, {
            itemId: 'usercreateid_link',
            xtype: 'combobox',
            emptyText: 'Người mã hóa',
            bind: {
                store: '{UserStore}'
            },
            queryMode: 'local',
            anyMatch: true,
            margin: 3,
            valueField: 'id',
            displayField: 'fullName'
        }, {
            margin: 3,
            itemId: 'encodedatefrom',
            xtype: 'datefield',
            value: new Date(),
            format:'d/m/Y',
            emptyText: 'Mã hóa từ ngày'
        }, {
            itemId: 'encodedateto',
            xtype: 'datefield',
            value: new Date(),
            margin: 3,
            format:'d/m/Y',
            emptyText: 'Mã hóa đến ngày'
        }, {
            width: 100,
            xtype: 'button',
            margin: 3,
            // text: GSmartApp.Locales.btn_loc[GSmartApp.Locales.currentLocale],
            iconCls: 'x-fa fa-search',
            itemId: 'btnTimKiem'
        }]
    }, {
        dock: 'bottom',
        layout: 'hbox',
        xtype: 'toolbar',
        border: false,
        height: 50,
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
                store: '{Porder_Encode_Store}'
            },
            emptyMsg: 'Không có kết quả tìm kiếm',
            lastText: 'Trang cuối',
            firstText: 'Trang đầu',
            displayMsg: 'Hiển thị {0} - {1} của {2}'
        }]
    }]
});

