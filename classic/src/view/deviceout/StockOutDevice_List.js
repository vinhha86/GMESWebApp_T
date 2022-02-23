Ext.define('GSmartApp.view.deviceout.StockOutDevice_List', {
    extend: 'Ext.grid.Panel',
    xtype: 'StockOutDevice_List',
    id: 'StockOutDevice_List',
    reference: 'StockOutDevice_List',
    // controller: 'Stockout_P_Controller',
    viewModel: {
        // type: 'Stockout_P_EditModel'
    },
    requires: [
        'Ext.Number',
        'Ext.Date'
    ],
    layout: 'fit',
    //frame: true,
    scrollable: true,
    bind: {
        store: '{DeviceOutStore}'
    },
    columnLines: true,
    viewConfig: {
        enableTextSelection: false,
        stripeRows: false
    },
    columns: [
        { header: 'Số phiếu', dataIndex: 'deviceout_code', width: 150 },
        { header: 'Loại phiếu', dataIndex: 'deviceOutTypeName', width: 150 },
        { header: 'Ngày xuất', dataIndex: 'deviceout_date', renderer: Ext.util.Format.dateRenderer('d/m/Y'), width: 120 },
        { header: 'Nơi xuất', dataIndex: 'orgFromName', flex: 1 },
        { header: 'Nơi nhận', dataIndex: 'orgToName', flex: 1 },
        // { header: 'Tổng tiền', dataIndex: 'totalprice', width: 110},   
        { header: 'Người lập phiếu', dataIndex: 'usercreate_name', width: 120 },
        { header: 'Trạng thái', dataIndex: 'status', width: 120,
            renderer: function(value, metaData, record){
                switch(value){
                    case -1: return 'Đã xoá';
                    case 0: return 'Đang hoạt động';
                    case 1: return 'Đã xác nhận';
                }
                return '';
            }

        },
        {
            xtype: 'actioncolumn',
            reference: 'stockout_contextmenu',
            width: 45,
            menuDisabled: true,
            sortable: false,
            items: [
                {
                    // iconCls: 'x-fa fas fa-bars violetIcon',
                    iconCls: 'x-fa fas fa-pencil-square-o greenIcon',
                    tooltip: 'Sửa phiếu',
                    handler: 'onStockoutEdit'
                },
                {
                    // iconCls: 'x-fa fas fa-bars violetIcon',
                    iconCls: 'x-fa fas fa-trash-o redIcon',
                    tooltip: 'Xóa phiếu',
                    // handler: 'onStockoutItemDelete'
                },
            ]
        }
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            // {
            //     tooltip: 'Lập phiếu xuất kho mới',
            //     text: 'Lập phiếu mới',
            //     iconCls: 'x-fa fa-plus',
            //     margin: 3,
            //     itemId: 'btnThemMoi'
            // },
            {
                xtype: 'datefield',
                margin: 3,
                fieldLabel: 'Xuất từ ngày:',
                labelWidth: 86,
                width: 215,
                format:'d/m/Y',
                itemId: 'deviceout_date_from',
                // value: new Date(),  // defaults to today
                value: '01/01/2020'
                // value: Ext.Date.add (new Date(),Ext.Date.DAY,-5),  // defaults to today
            },
            {
                xtype: 'datefield',
                margin: 3,
                fieldLabel: 'đến ngày:',
                labelWidth: 65,
                width: 195,
                format:'d/m/Y',
                itemId: 'deviceout_date_to',
                value: new Date(),  // defaults to today
            },
            {
                itemId: 'OrgToStore',
                xtype: 'combobox',
                emptyText: 'Nơi nhận',
                bind: {
                    store: '{OrgToStore}'
                },
                queryMode: 'local',
                anyMatch: true,
                margin: 3,
                width: 130,
                displayField: 'name',
                valueField: 'id'
            },
            // {
            //     itemId: 'OrgFromStore',
            //     xtype: 'combobox',
            //     emptyText: 'Nơi xuất',
            //     bind: {
            //         store: '{OrgFromStore}'
            //     },
            //     queryMode: 'local',
            //     margin: 1,
            //     width: 180,
            //     displayField: 'name',
            //     valueField: 'id'
            // },
            {
                xtype: 'combobox',
                margin: 3,
                width: 130,
                itemId: 'deviceouttypeid_link',
                emptyText: 'Loại xuất kho',
                displayField: 'name',
                valueField: 'id',
                bind: {
                    store: '{DeviceOutTypeStore}'
                }
            },
            {
                xtype: 'combobox',
                margin: 3,
                width: 130,
                itemId: 'status',
                emptyText: 'Trạng thái',
                displayField: 'name',
                valueField: 'id',
                value: [0, 1],
                queryMode: 'local',
                anyMatch: true,
                editable: true,
                allowBlank: true,
                multiSelect: true,
                bind: {
                    store: '{DeviceOutStatusStore}'
                }
            },
            {
                tooltip: 'Tìm phiếu xuất',
                iconCls: 'x-fa fa-search',
                margin: 1,
                handler: 'onSearch'
            }
        ]
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
                store: '{DeviceOutStore}'
            },
            emptyMsg: 'Không có kết quả tìm kiếm',
            lastText: 'Trang cuối',
            firstText: 'Trang đầu',
            displayMsg: 'Hiển thị {0} - {1} của {2}'
        }]
    }]
});
