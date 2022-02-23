Ext.define('GSmartApp.view.devicein.StockinDevice_List', {
    extend: 'Ext.grid.Panel',
    xtype: 'StockinDevice_List',
    id: 'StockinDevice_List',
    reference: 'StockinDevice_List',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind:{
        store: '{DeviceInStore}'
    },
    columns: [
        {text: 'Số phiếu', dataIndex: 'devicein_code', width: 150},
        {text: 'Loại nhập kho', dataIndex: 'deviceInTypeName', width: 200},    
        {
            text: GSmartApp.Locales.ngaynhap[GSmartApp.Locales.currentLocale],
            xtype: 'datecolumn',
            format: 'd/m/Y',
            dataIndex: 'devicein_date',
            width: 120
        },
        {text: 'Nơi xuất', dataIndex: 'orgFromName', flex: 1},    
        {text: 'Nơi nhận', dataIndex: 'orgToName', flex: 1 },
        {text: 'Người lập phiếu', dataIndex: 'usercreate_name', width: 120},    
        // {
        //     text: 'Số lượng',
        //     xtype: 'numbercolumn',
        //     format: '0,000',
        //     align: 'right',
        //     dataIndex: 'totalpackage',
        //     flex: 1
        // },
        {
            xtype: 'actioncolumn',
            width: 50,
            menuDisabled: true,
            sortable: false,

            items: [{
                iconCls: 'x-fa fas fa-edit',
                tooltip: GSmartApp.Locales.btn_sua[GSmartApp.Locales.currentLocale],
                handler: 'onEdit'
            }, {
                iconCls: 'x-fa fas fa-trash',
                tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
                // handler: 'onDelete'
            }]
        }
    ],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        xtype: 'toolbar',
        border: false,
        items: [
            // {
            //     xtype: 'button',
            //     margin: 3,
            //     text: 'Lập phiếu mới',
            //     iconCls: 'x-fa fa-plus',
            //     itemId: 'btnThemMoi',
            //     bind: {
            //         hidden: '{isNhapmoi}'
            //     }
            // }, 
            {
                margin: 3,
                itemId: 'devicein_date_from',
                xtype: 'datefield',
                // value: new Date(),
                value: '01/01/2020',
                format:'d/m/Y',
                fieldLabel: 'Nhập từ ngày:',
                labelWidth: 86,
                width: 215,
            }, 
            {
                itemId: 'devicein_date_to',
                xtype: 'datefield',
                value: new Date(),
                margin: 3,
                format:'d/m/Y',
                fieldLabel: 'đến ngày:',
                labelWidth: 65,
                width: 195,
            },        
            {
                itemId: 'OrgFromStore',
                xtype: 'combobox',
                emptyText: 'Nơi xuất',
                bind:{
                    store: '{OrgFromStore}'
                },
                queryMode: 'local',
                anyMatch: true,
                margin: 3,
                displayField: 'name',
                valueField: 'id'
            },{
                itemId: 'deviceintypeid_link',
                xtype: 'combobox',
                emptyText: 'Loại nhập kho',
                bind:{
                    store: '{DeviceInTypeStore}'
                },
                queryMode: 'local',
                anyMatch: true,
                margin: 3,
                displayField: 'name',
                valueField: 'id'
            }, 
            {
                // width: 100,
                xtype: 'button',
                margin: 3,
                // text: GSmartApp.Locales.btn_loc[GSmartApp.Locales.currentLocale],
                iconCls: 'x-fa fa-search',
                itemId: 'btnTimKiem'
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
                store: '{DeviceInStore}'
            },
            emptyMsg: 'Không có kết quả tìm kiếm',
            lastText: 'Trang cuối',
            firstText: 'Trang đầu',
            displayMsg: 'Hiển thị {0} - {1} của {2}'
        }]
    }]
});

