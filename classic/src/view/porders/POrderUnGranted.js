Ext.define('GSmartApp.view.porders.POrderUnGranted', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrderUnGranted',
    id: 'POrderUnGranted',
    requires: [
        'Ext.Number',
        'Ext.Date'
    ],
    title: 'Lệnh chưa phân chuyền',
    bind: {
        store: '{POrderUnGranted}'
    },
    columnLines: true,
    //multiSelect: true,
    selModel: 'rowmodel',
    features: [{
        ftype: 'groupingsummary',
        startCollapsed: true,
        groupHeaderTpl: '<b style= "color:blue">{name}</b>',
        hideGroupedHeader: false,
        enableGroupingMenu: false
    }, {
        ftype: 'summary',
        dock: 'bottom'
    }],
    viewConfig: {
        stripeRows: false,
        enableTextSelection: false,
        columnLines: true,
        rowLines: true,
        plugins: {
            ptype: 'gridviewdragdrop',
            enableDrag: true,
            id: 'POrderOffer_event',
            copy: false,
            dragText: '{0} sản phẩm',
            dragGroup: 'porderFreeDropGroup',
            dropGroup: 'porderGanttDropGroup'
        },
        listeners: {
            expandbody: 'onSelectOffer_Porder',
            drop: 'onDrop',
            beforedrop: 'onBeforeDrop'
        }
    },
    columns: [
        {
            xtype: 'actioncolumn',
            width: 30,
            menuDisabled: true,
            sortable: false,
            align: 'center',
            items: [
                {
                    iconCls: 'x-fa fas fa-photo greenIcon',
                    tooltip: "Ảnh sản phẩm",
                    handler: 'viewImg'
                },
            ]
        },   
        // {
        //     text:'Ảnh',
        //     // dataIndex:'imgproduct',
        //     width: 45,
        //     textAlign: 'center',
        //     listeners:{
        //         click: 'viewImg'
        //     }
        // },
        {
            header: 'Số PO', 
            dataIndex: 'po_buyer', 
            flex: 1,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'unGrantedPoBuyerFilterField',
                width: '99%',
                margin: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onUnGrantedPoBuyerFilterKeyup',
                    buffer: 500
                }
            },
            summaryType: 'count',
            summaryRenderer: function (value, summaryData, dataIndex) {
                if (null == value) value = 0;
                return '<div style="font-weight: bold; color:darkred;">Tổng: ' + Ext.util.Format.number(value, '0,000') + '</div>';
            }
        },
    {
        header: 'Mã SP (Buyer)', dataIndex: 'product_buyername', width: 130,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'unGrantedProductCodeFilterField',
            width: '99%',
            margin: 1,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onUnGrantedProductCodeFilterKeyup',
                buffer: 500
            }
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        header: 'Buyer', dataIndex: 'buyername', width: 80,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'unGrantedBuyernameFilterField',
            width: '99%',
            margin: 1,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onUnGrantedBuyernameFilterKeyup',
                buffer: 500
            }
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
    },
    {
        header: 'Vendor', dataIndex: 'vendorname', width: 80,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'unGrantedVendornameFilterField',
            width: '99%',
            margin: 1,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onUnGrantedVendornameFilterKeyup',
                buffer: 500
            }
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
    },
    { header: 'Vào chuyền', headerWrap: true, dataIndex: 'productiondate', renderer: Ext.util.Format.dateRenderer('d/m/y'), width: 67 },
    {
        header: 'Giao hàng', headerWrap: true, dataIndex: 'shipdate',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        // renderer: function(value){
        //     var date = Ext.Date.parse(value, 'c');
        //     return Ext.Date.format(date, 'd/m/y');
        // },
        width: 67
    },
    {
        header: 'SL', dataIndex: 'quantity', width: 65, xtype: 'numbercolumn', format: '0,000', align: 'right',

        summaryType: 'sum',
        summaryRenderer: function (value, summaryData, dataIndex) {
            return '<div style="color:black; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
        },
        // renderer: function(value, metaData, record, rowIdx, colIdx, store) {
        //     metaData.tdAttr = 'data-qtip="' + value + '"';
        //     return value;
        // },
    },
    ],
    plugins: {
        rowwidget: {
            widget:
            {
                xtype: 'grid',
                viewConfig: {
                    stripeRows: false,
                    enableTextSelection: false,
                    columnLines: true,
                    rowLines: true,
                    plugins: {
                        ptype: 'gridviewdragdrop',
                        enableDrag: true,
                        id: 'POrderUnGranted_event',
                        copy: false,
                        dragText: '{0} yêu cầu',
                        dragGroup: 'porderFreeDropGroup',
                        dropGroup: 'porderGanttDropGroup'
                    }
                },
                bind: {
                    store: '{record.porder}',
                    // title: 'Danh sách hàng xuất'
                },
                columns: [{
                    xtype: 'actioncolumn',
                    width: 28,
                    menuDisabled: true,
                    sortable: false,
                    align: 'center',
                    items: [
                        {
                            iconCls: 'x-fa fas fa-bars violetIcon',
                            handler: 'onMenuPorderUnGrant'
                        }
                    ]
                }, {
                    text: 'STT',
                    width: 40,
                    xtype: 'rownumberer',
                    align: 'center'
                }, {
                    text: 'PO Buyer',
                    dataIndex: 'po_buyer',
                    width: 110,
                    renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                        metaData.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    }
                    // renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    //     if (record.data.status == 0) {
                    //         metaData.tdCls =  "po_accept";
                    //     }
                    //     else if (record.data.status == -3){
                    //         metaData.tdCls =  "po_cancel";
                    //         metaData.tdAttr = 'data-qtip="PO đã hủy"';
                    //     }            
                    //     return value;
                    // }
                }, {
                    text: 'PO Vendor',
                    dataIndex: 'po_vendor',
                    width: 100,
                    renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                        metaData.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    }
                }, {
                    text: 'SL',
                    align: 'end',
                    dataIndex: 'totalorder',
                    width: 70,
                    renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                        return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
                    }
                },
                // {
                //     text:'YCSX',
                //     align: 'end',
                //     dataIndex:'amount_org',
                //     width: 70,
                //     renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                //         return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
                //     }
                // },
                {
                    text: 'Ngày giao',
                    dataIndex: 'shipdate',
                    // renderer: Ext.util.Format.dateRenderer('d/m/y'),
                    renderer: function (value) {
                        var date = Ext.Date.parse(value, 'c');
                        return Ext.Date.format(date, 'd/m/y');
                    },
                    width: 70
                }, {
                    text: 'Ngày NPL',
                    // renderer: Ext.util.Format.dateRenderer('d/m/y'),
                    renderer: function (value) {
                        var date = Ext.Date.parse(value, 'c');
                        return Ext.Date.format(date, 'd/m/y');
                    },
                    dataIndex: 'matdate',
                    width: 70
                }, {
                    text: 'Ngày Ra chuyền',
                    // renderer: Ext.util.Format.dateRenderer('d/m/y'),
                    renderer: function (value) {
                        var date = Ext.Date.parse(value, 'c');
                        return Ext.Date.format(date, 'd/m/y');
                    },
                    dataIndex: 'po_Productiondate',
                    width: 70
                }]
            }
        }
    },
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                tooltip: 'Làm mới danh sách',
                iconCls: 'x-fa fa-refresh',
                weight: 30,
                handler: 'onSearchTap'
            },
            {
                tooltip: 'Ẩn danh sách',
                iconCls: 'x-fa fa-eye',
                weight: 30,
                handler: 'onHiddenList'
            }
        ]
    }]
});
