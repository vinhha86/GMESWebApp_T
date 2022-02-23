Ext.define('GSmartApp.view.pcontract.PContractListPOView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractListPOView',
    id: 'PContractListPOView',
    requires: [
        'Ext.ProgressBarWidget'
    ],
    controller: 'PContractListPOViewController',
    reference: 'PContractListPOView',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            }
        }
    },

    bind: {
        store: '{PContractPOList}'
    },
    features: [{
        ftype: 'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    columns: [{
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'PO Buyer',
        dataIndex: 'po_buyer',
        width: 120,
        sortable: false,
        menuDisabled: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';

            if (record.data.status == 0) {
                metaData.tdCls = "po_accept";
            }
            else if (record.data.status == -3) {
                metaData.tdCls = "po_cancel";
                metaData.tdAttr = 'data-qtip="PO đã hủy"';
            }
            return value;
        }
    }, {
        text: 'Mã SP (Buyer)',
        dataIndex: 'productbuyercode',
        width: 120,
        sortable: false,
        menuDisabled: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'BuyerCodeFilterField',
            width: '99%',
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onBuyerCodeFilterKeyup',
                buffer: 500
            }
        }
    },
    {
        text: 'SL',
        align: 'right',
        dataIndex: 'po_quantity',
        width: 80,
        sortable: false,
        menuDisabled: true,
        summaryType: 'sum',
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        },
        summaryRenderer: function (value, summaryData, dataIndex) {
            return '<div style="color:red; font-size:9px; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
        }
    }, {
        text: 'ĐVT',
        dataIndex: 'totalpair',
        width: 60,
        sortable: false,
        menuDisabled: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 1 ? "Chiếc" : "Bộ (" + value + ")";
        }
    }, {
        text: 'SL SP',
        align: 'right',
        dataIndex: 'po_quantity_sp',
        width: 80,
        sortable: false,
        menuDisabled: true,
        summaryType: 'sum',
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        },
        summaryRenderer: function (value, summaryData, dataIndex) {
            return '<div style="color:red; font-size:9px; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
        }
    }, 
    // {
    //     text: 'Ngày giao',
    //     dataIndex: 'shipdate',
    //     renderer: Ext.util.Format.dateRenderer('d/m/y'),
    //     width: 80,
    //     items: {
    //         xtype: 'textfield',
    //         fieldStyle: "",
    //         reference: 'NgayGiaoFilterField',
    //         width: '99%',
    //         margin: 2,
    //         enableKeyEvents: true,
    //         listeners: {
    //             keyup: 'onNgayGiaoFilterKeyup',
    //             buffer: 500
    //         }
    //     }
    // },
    {
        text: 'Ngày giao',
        dataIndex: 'shipdateString',
        // renderer: Ext.util.Format.dateRenderer('d/m/y'),
        width: 80,
        sortable: false,
        menuDisabled: true,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'NgayGiaoStringFilterField',
            width: '99%',
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onNgayGiaoStringFilterKeyup',
                buffer: 500
            }
        }
    },
    {
        text: 'Ngày NPL',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        dataIndex: 'matdate',
        width: 80,
        sortable: false,
        menuDisabled: true,
    },
    {
        text: 'Ngày VC',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        dataIndex: 'productiondate',
        width: 70,
        sortable: false,
        menuDisabled: true,
    },
    // {
    //     text:'Số ngày SX',
    //     align: 'right',
    //     dataIndex:'productiondays',
    //     width: 90
    // },
    {
        text: 'Phân xưởng',
        dataIndex: 'factories',
        width: 100,
        sortable: false,
        menuDisabled: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'PhanXuongFilterField',
            width: '99%',
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPhanXuongFilterKeyup',
                buffer: 500
            }
        }
    },
    // {
    //     text: 'Phụ trách',
    //     dataIndex: 'merchandiser_name',
    //     width: 150,
    //     sortable: false,
    //     menuDisabled: true,
    //     // renderer: function (value, metaData, record, rowIdx, colIdx, store) {
    //     //     metaData.tdAttr = 'data-qtip="' + value + '"';
    //     //     return value;
    //     // },
    //     items: {
    //         xtype: 'textfield',
    //         fieldStyle: "",
    //         reference: 'PhuTrachFilterField',
    //         width: '99%',
    //         margin: 2,
    //         enableKeyEvents: true,
    //         listeners: {
    //             keyup: 'onPhuTrachFilterKeyup',
    //             buffer: 500
    //         }
    //     }
    // },
    {
        text: 'Phụ trách',
        dataIndex: 'merchandiserid_link',
        width: 150,
        sortable: false,
        menuDisabled: true,
        // renderer: function (value, metaData, record, rowIdx, colIdx, store) {
        //     metaData.tdAttr = 'data-qtip="' + value + '"';
        //     return value;
        // },
        renderer: 'renderedPhuTrach',
        editor:{
            field: {
                xtype: 'combobox',
                bind:{
                    store:'{UserStore}',
                    // value: '{data.type}'
                },
                displayField: 'fullname',
                valueField: 'id',
                // editable: false,
                allowBlank: true,
				queryMode: 'local',
				anyMatch: true,
                listeners:{
                    // change: 'onTypeChange',
                    // focusleave: 'onTypeFocusLeave'
                },
                matchFieldWidth: false,
                listConfig: {
                    listeners: {
                        beforeshow: function(picker) {
                            picker.minWidth = picker.up('combobox').getSize().width;
                        }
                    }
                },
            }
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'PhuTrachFilterField',
            width: '99%',
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPhuTrachFilterKeyup',
                buffer: 500
            }
        }
    },
    {
        text: 'FOB',
        dataIndex: 'fob_worklist',
        flex: 1,
        sortable: false,
        menuDisabled: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        padding: '0 0 5 5',
        height: 40,
        items: [
            {
				margin:'0 5 0 0',
				xtype: 'button',
				iconCls: 'x-fa fa-angle-double-up',
				itemId: 'btnThuGon',
				bind: {
					hidden: '{IsformMaster}'
				}
			}, 
			{
				margin:'0 5 0 0',
				xtype: 'button',
				itemId: 'btnMoRong',
				iconCls: 'x-fa fa-angle-double-down',
				bind: {
					hidden: '{!IsformMaster}'
				}
			}, 
            {
                xtype: 'displayfield',
                fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
                labelWidth: 0,
                value: ' Danh sách PO Line (Nhịp giao hàng kế hoạch)'
            },
                '->'
                ,
            {
                xtype: 'button',
                itemId: 'btnEditAllLine',
                ui: 'header',
                tooltip: 'Sửa nhanh line giao hàng',
                iconCls: 'x-fa fa-edit',
                bind: {
                    hidden: '{isHiddenEditAll}'
                }
            }
        ]
    },
    {
        dock: 'bottom',
        width: '100%',
        layout: 'vbox',
        border: false,
        items: [{
            layout: 'hbox',
            border: false,
            items: [{
                html: '<div class="color-box">'
                    + '<div class="color-square po_free"></div>&nbspChưa chốt'
                    + '</div>',
                margin: '5'
            }, {
                html: '<div class="color-box">'
                    + '<div class="color-square po_accept"></div>&nbspĐã chốt'
                    + '</div>',
                margin: '5'
            }, {
                html: '<div class="color-box">'
                    + '<div class="color-square po_cancel"></div>&nbspĐã hủy'
                    + '</div>',
                margin: '5'
            }]
        }]
    }
    ],

});

