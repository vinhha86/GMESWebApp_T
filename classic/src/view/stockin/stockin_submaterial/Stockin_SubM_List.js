Ext.define('GSmartApp.view.stockin.stockin_submaterial.Stockin_SubM_List', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockin_SubM_List',
    itemId: 'Stockin_SubM_List',
    reference: 'Stockin_SubM_List',
    controller: 'Stockin_SubM_List_Controller',
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
            // width: 30,
            width: 50,
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
        {text: 'Số phiếu', dataIndex: 'stockincode', width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'stockincodeFilter',
                width: 115,
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onStockincodeFilterKeyup',
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
                reference: 'invoice_numberFilter',
                width: 115,
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onInvoice_numberFilterKeyup',
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
                xtype: 'button',
                margin: 3,
                text: 'Lập phiếu mới',
                iconCls: 'x-fa fa-bars',
                menu: [
                    {
                        itemId: 'btnNhapMuaMoi', // id:11
                        iconCls: 'x-fa fa-plus',
                        text: 'Nhập mua mới',
                        // handler: 'onNhapMuaMoi'
                    },
                    {
                        itemId: 'btnNhapDieuChuyen', // id:12
                        iconCls: 'x-fa fa-plus',
                        text: 'Nhập điều chuyển',
                        // handler: 'onNhapDieuChuyen'
                    },
                ],
            },
            {
                margin: 3,
                itemId: 'stockindate_from',
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
                itemId: 'stockindate_to',
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
                itemId: 'OrgFromStore',
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
                itemId: 'cbo_StockinTypeStore',
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
                iconCls: 'x-fa fa-search',
                itemId: 'btnTimKiem'
            }
        ]
    },
]
});

