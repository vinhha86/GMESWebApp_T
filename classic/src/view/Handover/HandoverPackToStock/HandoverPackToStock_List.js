Ext.define('GSmartApp.view.handover.HandoverPackToStock_List', {
    extend: 'Ext.grid.Panel',
    xtype: 'HandoverPackToStock_List',
    itemId: 'HandoverPackToStock_List',
    reference: 'HandoverPackToStock_List',
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
            items: [{
                iconCls: 'x-fa fas fa-pencil-square-o greenIcon',
                tooltip: 'Sửa phiếu',
                handler: 'onEdit'
            }, {
                iconCls: 'x-fa fas fa-trash-o redIcon',
                tooltip: 'Xóa phiếu',
                handler: 'onDelete'
            }]
        },        
        {header: 'Số phiếu', dataIndex: 'stockincode', width: 150},
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
            // {
            //     xtype: 'button',
            //     margin: 3,
            //     text: 'Lập phiếu mới',
            //     iconCls: 'x-fa fa-bars',
            //     menu: [
            //         {
            //             itemId: 'btnThemMoi_ByPOLine', // id:1
            //             // iconCls: 'fa fa-file-pdf-o greenIcon',
            //             text: 'Nhập từ sản xuất',
            //         },
            //         {
            //             itemId: 'btnThemMoi_Move', // id:3
            //             // iconCls: 'fa fa-file-pdf-o greenIcon',
            //             text: 'Nhập điều chuyển',
            //         },
            //     ],
            // },
            {
                xtype: 'button',
                itemId: 'btnThemMoi',
                margin: 3,
                text: 'Lập phiếu mới',
                iconCls: 'x-fa fa-plus',
            },
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
                itemId: 'stockintypeid_link',
                xtype: 'combobox',
                emptyText: 'Loại nhập kho',
                bind:{
                    store: '{StockinTypeStore}'
                },
                // value: 21,
                queryMode: 'local',
                anyMatch: true,
                margin: 3,
                displayField: 'name',
                valueField: 'id',
                editable: false,
                readOnly: true,
                hidden: true,
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
    // {
    //     dock: 'bottom',
    //     layout: 'hbox',
    //     xtype: 'toolbar',
    //     border: false,
    //     height: 50,
    //     items: [{
    //         xtype: 'textfield',
    //         value: 25,
    //         itemId: 'limitpage',
    //         maskRe: /[0-9]/,
    //         width: 180,
    //         selectOnFocus: true,
    //         margin: 5,
    //         fieldLabel: 'Số bản ghi/ Trang',
    //         labelWidth: 120
    //     }, '-', {
    //         xtype: 'pagingtoolbar',
    //         displayInfo: true,
    //         flex: 1,
    //         nextText: 'Trang tiếp',
    //         prevText: 'Trang trước',
    //         afterPageText: '/ {0}',
    //         beforePageText: 'Trang',
    //         itemId: 'page',
    //         refreshText: 'Làm mới dữ liệu',
    //         border: false,
    //         bind: {
    //             store: '{StockinStore}'
    //         },
    //         emptyMsg: 'Không có kết quả tìm kiếm',
    //         lastText: 'Trang cuối',
    //         firstText: 'Trang đầu',
    //         displayMsg: 'Hiển thị {0} - {1} của {2}'
    //     }]
    // }
]
});

