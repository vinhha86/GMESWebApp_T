Ext.define('GSmartApp.view.Schedule.POrderReq.Schedule_POrderReq_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'Schedule_POrderReq_View',
    id:'Schedule_POrderReq_View',
    // controller: 'Schedule_POrderReq_ViewController',
    requires: [
        'Ext.Number',
        'Ext.Date',
        'Ext.grid.plugin.RowWidget'
    ],
    viewConfig: {
        stripeRows: false,
        enableTextSelection: false,
        columnLines: true,
        rowLines: true,   
        plugins: {
            ptype: 'gridviewdragdrop',
            enableDrag: true,
            id: 'Porder_Req_Product_Event',
            copy: false,
            dragText: '{0} sản phẩm',
            dragGroup: 'porderFreeDropGroup',
            dropGroup: 'porderGanttDropGroup'
        },     
        listeners: {
            expandbody : 'onSelectOffer'
        }
    },
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '<b style= "color:blue">{name}</b>',
        hideGroupedHeader: false,
        enableGroupingMenu: false
    },{
        ftype: 'summary',
        dock: 'bottom'
    }], 
    bind:{
        store:'{PContractrPoductPOStore}'
    },
    columns:[
        {
            text: 'STT',
            width: 40,
            xtype: 'rownumberer',
            align: 'center'
        },
        { 
            header: 'Số PO', 
            dataIndex: 'po_buyer', 
            flex: 1,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'poBuyerFilterField',
                width: '99%',
                margin: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onPoBuyerFilterKeyup',
                    buffer: 500
                }
            },
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
        { 
            header: 'Mã SP (Buyer)', 
            dataIndex: 'product_buyername', 
            width: 130,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'codeFilterField',
                width: '99%',
                margin: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onCodeFilterKeyup',
                    buffer: 500
                }
            },
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            summaryType: 'count',
            summaryRenderer: function (value, summaryData, dataIndex) {
                return '<div style="color:black; font-weight: bold; align: right">'+'Tổng: ' + value+'</div>';
            }
        },

        { 
            header: 'Buyer', 
            dataIndex: 'buyername', 
            width: 80,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'unGrantedReqBuyernameFilterField',
                width: '99%',
                margin: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onUnGrantedReqBuyernameFilterKeyup',
                    buffer: 500
                }
            },
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        { 
            header: 'Vendor', 
            dataIndex: 'vendorname', 
            width: 80,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'unGrantedReqVendornameFilterField',
                width: '99%',
                margin: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onUnGrantedReqVendornameFilterKeyup',
                    buffer: 500
                }
            },
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        { header: 'Giao hàng', headerWrap: true, dataIndex: 'shipdate', 
            renderer: Ext.util.Format.dateRenderer('d/m/y'),
            // renderer: function(value){
            //     // var date = Ext.Date.parse(value, 'c');
            //     // return Ext.Date.format(date, 'd/m/y');
            // },
            width: 70
        },
        { header: 'SL', dataIndex: 'quantity', width: 70,  xtype: 'numbercolumn', format: '0,000', align: 'right',
            summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return '<div style="color:black; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000')+'</div>';
            }
        }
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
                        id: 'Porder_Req_Event',
                        copy: false,
                        dragText: '{0} yêu cầu',
                        dragGroup: 'porderFreeDropGroup',
                        dropGroup: 'porderGanttDropGroup'
                    }
                },               
                bind: {
                    store: '{record.porder_req}',
                    // title: 'Danh sách hàng xuất'
                },	
                columns:[{
                    xtype: 'actioncolumn',
                    width: 28,
                    menuDisabled: true,
                    sortable: false,
                    align: 'center',
                    items: [
                        {
                            iconCls: 'x-fa fas fa-bars violetIcon',
                            handler: 'onMenuPorderReqList'
                        }
                    ]
                },{
                    text: 'STT',
                    width: 40,
                    xtype: 'rownumberer',
                    align: 'center'
                },{
                    text:'PO Buyer',
                    dataIndex:'po_buyer',
                    width: 110,
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
                },{
                    text:'PO Vendor',
                    dataIndex:'po_vendor',
                    width: 100
                },{
                    text:'SL',
                    align: 'end',
                    dataIndex:'totalorder',
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
                    text:'Ngày giao',
                    dataIndex:'shipdate',
                    // renderer: Ext.util.Format.dateRenderer('d/m/y'),
                    renderer: function(value){
                        var date = Ext.Date.parse(value, 'c');
                        return Ext.Date.format(date, 'd/m/y');
                    },
                    width: 70
                },{
                    text:'Ngày NPL',
                    // renderer: Ext.util.Format.dateRenderer('d/m/y'),
                    renderer: function(value){
                        var date = Ext.Date.parse(value, 'c');
                        return Ext.Date.format(date, 'd/m/y');
                    },
                    dataIndex:'matdate',
                    width: 70
                },{
                    text:'Ngày Ra chuyền',
                    // renderer: Ext.util.Format.dateRenderer('d/m/y'),
                    renderer: function(value){
                        var date = Ext.Date.parse(value, 'c');
                        return Ext.Date.format(date, 'd/m/y');
                    },
                    dataIndex:'po_Productiondate',
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
                handler: 'onSearchPorderReqOffer'
            },
            {
                tooltip: 'Ẩn danh sách',
                iconCls: 'x-fa fa-eye',
                weight: 30,
                handler: 'onHiddenListReq'
            }
    ]
    }]
});

