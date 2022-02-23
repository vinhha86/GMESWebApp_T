Ext.define('GSmartApp.view.stockin.StockIn_P_List', {
    extend: 'Ext.grid.Panel',
    xtype: 'StockIn_P_List',
    itemId: 'StockIn_P_List',
    cls: 'StockIn_P_List',
    reference: 'StockIn_P_List',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind:{
        store: '{StockinStore}'
    },
    features: [
        {
            ftype: 'summary',
            dock: 'bottom'
        }
    ],
    columns: [
        {
            xtype: 'actioncolumn',
            width: 45,
            menuDisabled: true,
            sortable: false,
            align: 'center',
            items: [
                {
                    iconCls: 'x-fa fas fa-pencil-square-o greenIcon',
                    tooltip: 'Sửa phiếu',
                    handler: 'onEdit'
                }, 
                {
                    iconCls: 'x-fa fas fa-trash-o redIcon',
                    tooltip: 'Xóa phiếu',
                    handler: 'onDelete'
                }
            ]
        },
        {
            header: 'Số phiếu', dataIndex: 'stockincode', width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                var status = record.get('status');
                if(status == -1){
                    metaData.tdCls =  'rowYellow';
                }
                if(status == 0){
                    metaData.tdCls =  'rowWhite';
                }
                if(status == 1){
                    metaData.tdCls =  'rowGreen';
                }
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
        },
        {header: 'Loại phiếu', dataIndex: 'stockintype_name', width: 150},    
        {header: 'Ngày nhập', dataIndex: 'stockindate', renderer: Ext.util.Format.dateRenderer('d/m/Y'), width: 90 },
        {header: 'Nơi xuất', dataIndex: 'orgfrom_name', flex: 1},    
        {header: 'Nơi nhận', dataIndex: 'orgto_name', flex: 1 },
        {header: 'Trạng thái', dataIndex: 'statusString', width: 120}, 
        {header: 'Người lập phiếu', dataIndex: 'usercreate_name', width: 120},    
    ],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        xtype: 'toolbar',
        border: false,
        items: [
            {
                xtype: 'button',
                margin: 3,
                text: 'Lập phiếu mới',
                iconCls: 'x-fa fa-bars',
                menu: [
                    {
                        itemId: 'btnTaoPhieuNhapMoi', // id:21 // nhap tu san xuat, mua moi
                        // iconCls: 'fa fa-file-pdf-o greenIcon',
                        text: 'Nhập từ sản xuất',
                    },
                    {
                        itemId: 'btnTaoPhieuNhapDieuChuyen', // id:22 // nhap dieu chuyen
                        // iconCls: 'fa fa-file-pdf-o greenIcon',
                        text: 'Nhập điều chuyển',
                    },
                ],
            },
            // {
            //     // width: 100,
            //     xtype: 'button',
            //     margin: 3,
            //     text: 'Tạo phiếu nhập',
            //     iconCls: 'x-fa fa-plus',
            //     itemId: 'btnTaoPhieuNhap'
            // },
            {
                margin: 3,
                itemId: 'stockindate_from',
                xtype: 'datefield',
                value: new Date(),
                format:'d/m/Y',
                fieldLabel: 'Nhập từ ngày:',
                labelWidth: 86,
                width: 215,
            }, 
            {
                itemId: 'stockindate_to',
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
                itemId: 'cbo_StockinTypeStore',
                xtype: 'combobox',
                emptyText: 'Loại nhập kho',
                bind:{
                    store: '{StockinTypeStore}'
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
    },
]
});

