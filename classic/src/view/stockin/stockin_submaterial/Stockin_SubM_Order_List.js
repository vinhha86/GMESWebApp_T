Ext.define('GSmartApp.view.stockin.stockin_submaterial.Stockin_SubM_Order_List', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockin_SubM_Order_List',
    itemId: 'Stockin_SubM_Order_List',
    reference: 'Stockin_SubM_Order_List',
    controller: 'Stockin_SubM_Order_List_Controller',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind:{
        store: '{Stockin_Order_Store}'
    },
    features: [
        {
            ftype: 'summary',
            dock: 'bottom'
        }
    ],
    columns: [
        // {
        //     xtype: 'actioncolumn',
        //     width: 30,
        //     menuDisabled: true,
        //     sortable: false,
        //     align: 'center',
        //     items: [
        //         {
        //             iconCls: 'x-fa fas fa-pencil-square-o greenIcon',
        //             tooltip: 'Sửa phiếu',
        //             handler: 'onEdit'
        //         }, 
        //         // {
        //         //     iconCls: 'x-fa fas fa-trash-o redIcon',
        //         //     tooltip: 'Xóa phiếu',
        //         //     handler: 'onDelete'
        //         // }
        //     ]
        // },
        {text: 'Số phiếu', dataIndex: 'stockincode', width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'stockin_order_code_filter',
                width: 115,
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onStockin_Order_Code_FilterKeyup',
                    buffer: 500
                }
            },
            summaryType: 'count',
            summaryRenderer: 'renderSum'
        },
        {text: 'Số Invoice', dataIndex: 'invoice_number', width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'stockin_order_invoice_filter',
                width: 115,
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onStockin_Order_Invoice_FilterKeyup',
                    buffer: 500
                }
            },
        },
        {header: 'Ngày nhập', dataIndex: 'stockindate', renderer: Ext.util.Format.dateRenderer('d/m/Y'), width: 90 },
        {header: 'Loại nhập', dataIndex: 'stockintype_name', width: 150},    
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
            format:'d/m/Y',
            fieldLabel: 'Nhập từ ngày:',
            labelWidth: 86,
            width: 215,
            bind: {
                value: '{searchObj.stockindate_from}'
            }
        }, 
        {
            itemId: 'stockindate_to_order',
            xtype: 'datefield',
            margin: 3,
            format:'d/m/Y',
            fieldLabel: 'đến ngày:',
            labelWidth: 65,
            width: 195,
            bind: {
                value: '{searchObj.stockindate_to}'
            }
        },
        {
            itemId: 'OrgFromStore_order',
            xtype: 'combobox',
            emptyText: 'Nơi xuất',
            bind:{
                store: '{OrgFromStore}',
                value: '{searchObj.orgid_from_link}'
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
                store: '{StockinTypeStore}',
                value: '{searchObj.stockintypeid_link}'
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

