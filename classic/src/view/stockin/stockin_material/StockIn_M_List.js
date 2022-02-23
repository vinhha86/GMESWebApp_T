Ext.define('GSmartApp.view.stockin.stockin_material.Stockin_M_List', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockin_M_List',
    itemId: 'Stockin_M_List',
    cls: 'Stockin_M_List',
    reference: 'Stockin_M_List',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    bind:{
        store: '{StockinStore}'
    },
    features: [
        {
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '<b>{name}</b>',
            hideGroupedHeader: false,
            enableGroupingMenu: false,
        },
        {
            ftype: 'summary',
            dock: 'bottom'
        }
    ],
    // features: [
    //     {
    //         ftype: 'summary',
    //         dock: 'bottom'
    //     }
    // ],
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
        {text: 'Số phiếu', dataIndex: 'stockincode', width: 120,
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
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'stockincodeFilter',
                width: '98%',
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
                width: '98%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onInvoice_numberFilterKeyup',
                    buffer: 500
                }
            },
        },
        {
            text: GSmartApp.Locales.ngaynhap[GSmartApp.Locales.currentLocale],
            xtype: 'datecolumn',
            format: 'd/m/Y',
            dataIndex: 'stockindate',
            width: 90
        },
        {
            text: 'Loại nhập kho', dataIndex: 'stockintype_name', width: 150,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'combobox',
                width: '98%',
                flex: 1,
                margin: 2,
                editable: false,
                readOnly: false,
                displayField: 'name',
                valueField: 'id',
                queryMode: 'local',
                anyMatch: true,
                // enableKeyEvents: true,
                listeners: {
                    // keyup: 'onStockincodeFilterKeyup',
                    // buffer: 500,
                    select: 'onStockinTypeFilterKeyup',
                },
                bind:{
                    store: '{StockinTypeStore}',
                    value: '{stockinTypeComboValue}',
                },
                matchFieldWidth: false,
                listConfig: {
                    listeners: {
                        beforeshow: function(picker) {
                            picker.minWidth = picker.up('combobox').getSize().width;
                        }
                    }
                },
                triggers: {
                    clear: {
                        cls: 'x-form-clear-trigger',
                        weight: 1,
                        handler: 'onStockinTypeComboValueTriggerClick',
                        bind: {
                            // hidden: '{!isStatusComboValueTriggerHidden}',
                            // hidden: '{isStatusComboValueTriggerHidden}',
                            // hidden: '{!statusComboValue}',
                        }
                    }
                }
            },
        },    
        {
            text: 'Nơi giao', dataIndex: 'orgfrom_name', flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                // fieldStyle: "",
                // reference: 'invoice_numberFilter',
                width: '98%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onOrgFromFilterKeyup',
                    buffer: 500
                },
                bind:{
                    value: '{orgFromFilterValue}',
                },
            },
        },    
        {
            text: 'Nơi nhận', dataIndex: 'orgto_name', flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                // fieldStyle: "",
                // reference: 'invoice_numberFilter',
                width: '98%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onOrgToFilterKeyup',
                    buffer: 500
                },
                bind:{
                    value: '{orgToFilterValue}',
                },
            },
        },
        {
            text: 'Mã SP', dataIndex: 'stockinProductString', flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                // fieldStyle: "",
                // reference: 'invoice_numberFilter',
                width: '98%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onProductStringFilterKeyup',
                    buffer: 500
                },
                bind:{
                    value: '{productStringFilterValue}',
                },
            },
        },
        {
            text: 'Lý do nhập', dataIndex: 'reason', flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                // fieldStyle: "",
                // reference: 'invoice_numberFilter',
                width: '98%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onReasonFilterKeyup',
                    buffer: 500
                },
                bind:{
                    value: '{reasonFilterValue}',
                },
            },
        },
        {
            text: 'Người lập phiếu', dataIndex: 'usercreate_name', width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                // fieldStyle: "",
                // reference: 'invoice_numberFilter',
                width: '98%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onUsercreateFilterKeyup',
                    buffer: 500
                },
                bind:{
                    value: '{UsercreateFilterValue}',
                },
            },
        },    
        // {
        //     text: 'Số lượng',
        //     xtype: 'numbercolumn',
        //     format: '0,000',
        //     align: 'right',
        //     dataIndex: 'totalpackage',
        //     flex: 1
        // },
        {
            text: 'Trạng thái', dataIndex: 'statusString', width: 120,
            items: {
                xtype: 'combobox',
                width: '98%',
                flex: 1,
                margin: 2,
                editable: false,
                readOnly: false,
                displayField: 'text',
                valueField: 'id',
                queryMode: 'local',
                anyMatch: true,
                // enableKeyEvents: true,
                listeners: {
                    // keyup: 'onStockincodeFilterKeyup',
                    // buffer: 500,
                    select: 'onStatusFilterKeyup',
                },
                bind:{
                    store:'{listStatusArray}',
                    value: '{statusComboValue}',
                },
                matchFieldWidth: false,
                listConfig: {
                    listeners: {
                        beforeshow: function(picker) {
                            picker.minWidth = picker.up('combobox').getSize().width;
                        }
                    }
                },
                triggers: {
                    clear: {
                        cls: 'x-form-clear-trigger',
                        weight: 1,
                        handler: 'onStatusComboValueTriggerClick',
                        reference: 'statusComboValueTrigger',
                        bind: {
                            hidden: '{statusComboValueTrigger.value==""}'
                        }
                    }
                }
            },
        },    
    ],
    dockedItems: [
        {
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
                        itemId: 'btnNhapMuaMoi', // id:1
                        iconCls: 'x-fa fa-plus',
                        text: 'Nguyên liệu',
                        handler: 'onNhapMuaMoi'
                    },
                    {
                        itemId: 'btnNhapMuaMoiPhuLieu', // id:11
                        iconCls: 'x-fa fa-plus',
                        text: 'Phụ liệu',
                        handler: 'onNhapMuaMoiPhuLieu'
                    },
                ],
                bind: {
                    hidden: '{!isAdd_Pcontract_Stockin}'
                }
            },
            {
                xtype: 'button',
                margin: 3,
                // text: 'Lập phiếu mới',
                iconCls: 'x-fa fa-bars',
                menu: [
                    {
                        itemId: 'btnNhapMuaMoi', // id:1
                        iconCls: 'x-fa fa-plus',
                        text: 'Nhập mua mới',
                        handler: 'onNhapMuaMoi'
                    },
                    // {
                    //     itemId: 'btnNhapDieuChuyen', // id:2
                    //     iconCls: 'x-fa fa-plus',
                    //     text: 'Nhập điều chuyển',
                    //     handler: 'onNhapDieuChuyen'
                    // },
                ],
                bind: {
                    hidden: '{isAdd_Pcontract_Stockin}'
                }
            },
            {
                margin: 3,
                itemId: 'stockindate_from',
                xtype: 'datefield',
                // value: new Date(),
                format:'d/m/y',
                fieldLabel: 'Nhập từ:',
                labelWidth: 55,
                width: 165,
                bind: {
                    value: '{searchObj.stockindate_from}',
                    hidden: '{isAdd_Pcontract_Stockin}'
                }
            }, 
            {
                itemId: 'stockindate_to',
                xtype: 'datefield',
                // value: new Date(),
                margin: 3,
                format:'d/m/y',
                fieldLabel: 'đến:',
                labelWidth: 30,
                width: 140,
                bind: {
                    value: '{searchObj.stockindate_to}',
                    hidden: '{isAdd_Pcontract_Stockin}'
                }
            },        
            {
                itemId: 'OrgFromStore',
                xtype: 'combobox',
                emptyText: 'Nơi giao',
                width: 130,
                bind:{
                    store: '{OrgFromStore}',
                    value: '{searchObj.orgid_from_link}',
                    hidden: '{isAdd_Pcontract_Stockin}',
                },
                queryMode: 'local',
                margin: 3,
                displayField: 'name',
                valueField: 'id',
                // flex: 1,
            },      
            // {
            //     itemId: 'OrgToStore',
            //     xtype: 'combobox',
            //     emptyText: 'Nơi nhận',
            //     bind:{
            //         store: '{OrgToStore}'
            //     },
            //     queryMode: 'local',
            //     margin: 3,
            //     displayField: 'name',
            //     valueField: 'id',
            //     flex: 1,
            // },
            {
                itemId: 'stockintypeid_link',
                xtype: 'combobox',
                emptyText: 'Loại nhập kho',
                width: 140,
                bind:{
                    store: '{StockinTypeStore}',
                    value: '{searchObj.stockintypeid_link}',
                    hidden: '{isAdd_Pcontract_Stockin}',
                },
                queryMode: 'local',
                anyMatch: true,
                margin: 3,
                displayField: 'name',
                valueField: 'id',
                // flex: 1,
            },
            {
                itemId: 'pcontractString',
                xtype: 'textfield',
                emptyText: 'Đơn hàng',
                width: 140,
                bind:{
                    value: '{searchObj.pcontract}',
                    hidden: '{isAdd_Pcontract_Stockin}',
                },
                margin: 3,
            },
            {
                itemId: 'productString',
                xtype: 'textfield',
                emptyText: 'Sản phẩm',
                width: 140,
                bind:{
                    value: '{searchObj.product}',
                    hidden: '{isAdd_Pcontract_Stockin}',
                },
                margin: 3,
            },
            {
                // width: 100,
                xtype: 'button',
                margin: 3,
                // text: GSmartApp.Locales.btn_loc[GSmartApp.Locales.currentLocale],
                iconCls: 'x-fa fa-search',
                itemId: 'btnTimKiem',
                bind: {
                    hidden: '{isAdd_Pcontract_Stockin}'
                }
            }
        ]
    },
],
 
});

