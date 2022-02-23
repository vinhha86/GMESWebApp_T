Ext.define('GSmartApp.view.stockin.StockIn_P_Order_List', {
    extend: 'Ext.grid.Panel',
    xtype: 'StockIn_P_Order_List',
    itemId: 'StockIn_P_Order_List',
    reference: 'StockIn_P_Order_List',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind:{
        store: '{StockinStore_Order}'
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
            width: 30,
            menuDisabled: true,
            sortable: false,
            align: 'center',
            items: [
                {
                    iconCls: 'x-fa fas fa-pencil-square-o greenIcon',
                    tooltip: 'Sửa phiếu',
                    handler: 'onEdit'
                }, 
                // {
                //     iconCls: 'x-fa fas fa-trash-o redIcon',
                //     tooltip: 'Xóa phiếu',
                //     handler: 'onDelete'
                // }
            ]
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
        {
            margin: 3,
            itemId: 'stockindate_from_order',
            xtype: 'datefield',
            value: new Date(),
            format:'d/m/Y',
            fieldLabel: 'Nhập từ ngày:',
            labelWidth: 86,
            width: 215,
        }, 
        {
            itemId: 'stockindate_to_order',
            xtype: 'datefield',
            value: new Date(),
            margin: 3,
            format:'d/m/Y',
            fieldLabel: 'đến ngày:',
            labelWidth: 65,
            width: 195,
        },
        {
            itemId: 'OrgFromStore_order',
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
            itemId: 'cbo_StockinTypeStore_order',
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
            // text: "Đồng bộ từ MITI",
            iconCls: 'x-fa fa-search',
            itemId: 'btnTimKiem_order',
        }]
    }, 
],
 
});

