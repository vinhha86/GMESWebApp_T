Ext.define('GSmartApp.view.pprocess.POrderProcessing', {
    extend: 'Ext.grid.Panel',
    xtype: 'porderprocessing',
    reference: 'porderprocessing',
    cls: 'POrderProcessing',
    requires: [
        'GSmartApp.store.POrderProcessing',
        'Ext.Number',
        'Ext.Date',
        'Ext.selection.CellModel'
    ],
    controller: 'pprocess',
    viewModel: {
        type: 'PProcessViewModel'
    },    
    //title: 'Tiến độ sản xuất',
    //cls: 'tool-icon-size',
    //autoHeight: true,
    //height: 590,
    //width: 1024,
    layout: 'fit',
    //frame: true,
    scrollable: true,
    bind:{
        store:'{POrderProcessingStore}'
    },
    columnLines: true,
    selModel: {
        type: 'cellmodel'
    },    
    plugins: {
        cellediting: {
            clicksToEdit: 2,
            listeners: {
                validateedit: 'onProcessingItemEdit_Single'
            }            
        }
        // rowediting: {
        //     clicksToMoveEditor: 1,
        //     autoCancel: false,
        //     listeners: {
        //         edit: 'onProcessingItemEdit'
        //     }               
        // }        
    },    
    features: [{
        id: 'group',
        ftype: 'groupingsummary',
        groupHeaderTpl: '<b>Tổ sản xuất: {name}</b>',
        hideGroupedHeader: false,
        enableGroupingMenu: false
    },{
        ftype: 'summary',
        dock: 'bottom'
    }], 
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
     },
    // renderTo: Ext.getBody(),   
    columns: [
        //{ text: 'STT',  dataIndex: 'id', width: 44 },
        //{xtype: 'rownumberer'},
        // { 
		// 	xtype: 'actioncolumn',
		// 	width: 25,
		// 	menuDisabled: true,
        //     sortable: false,
        //     locked: true,
        //     renderer: function (value, metadata, record) {
        //         if (record.get('balance_status') > 0) {
        //             this.iconCls = 'x-fa fas fa-battery-4 greenIcon';
        //             this.tooltip = 'NPL Sẵn sàng';                    

        //         }
        //         else {
        //             if (record.get('balance_date') != null){
        //                 var dt = new Date(record.get('balance_date'));
        //                 this.tooltip = 'Dự kiến NPL về: ' + Ext.Date.format(dt, "d/m/Y"); 
        //                 this.iconCls = 'x-fa fas fa-battery-2 violetIcon';    
        //             } else {
        //                 this.tooltip = 'Dự kiến NPL về: Chưa xác định';
        //                 this.iconCls = 'x-fa fas fa-battery-0 redIcon';
        //             }
        //         }
        //     },
        //     handler: 'onSetBalance' 
        // },   
        {
            xtype: 'actioncolumn',
            width: 28,
            locked: true,
            menuDisabled: true,
            sortable: false,
            align: 'center',
            items: [
                {
                    iconCls: 'x-fa fas fa-bars violetIcon',
                    handler: 'onMenu_POrderProcessingList'
                },            
            ]
        },                
        { header: 'Mã lệnh', locked: true, dataIndex: 'pordercode', width: 155,
            //editor: {xtype: 'textfield', readOnly: true},
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'porderFilterField',
                width: 149,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onPOrderFilterKeyup',
                    buffer: 500
                }
            },
            renderer: function (value, metaData, record, rowIndex) {
                var c = record.get('status');
                if (c == 1) {
                    metaData.tdCls = 'process-granted';
                } else if (c == 2) {
                    metaData.tdCls =  'process-ready';
                } else if (c == 3) {
                    metaData.tdCls =  'process-subprocess';
                } else if (c == 4) {
                    metaData.tdCls =  'process-running';
                } else if (c == 5) {
                    metaData.tdCls =  'process-running';
                } else if (c == 6) {
                    // soNgayChamGiaoHang
                    metaData.tdCls =  'process-finish';
                }
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            summaryType: 'count', summaryRenderer: 'renderSum'                   
        },
        { header: 'Lịch giao hàng', headerWrap: true, locked: true, dataIndex: 'golivedate', width: 70, 
            // renderer: Ext.util.Format.dateRenderer('d/m/y'),
            renderer: function(value){
                var date = Ext.Date.parse(value, 'c');
                return Ext.Date.format(date, 'd/m/y');
            },
        },
        // { header: 'Lịch giao hàng', headerWrap: true, locked: true, dataIndex: 'golivedesc', width: 80,
        //     editor: {
        //         allowBlank: true,
        //         selectOnFocus: false
        //     }
        // },
        // { header: 'Dự kiến SX', headerWrap: true, locked: true, dataIndex: 'productiondate', width: 80, renderer: Ext.util.Format.dateRenderer('d/m/Y')},
        { header: 'SL đơn', locked: true, dataIndex: 'grantamount', width: 60, summaryType: 'sum', summaryRenderer: 'renderSum',
            align: 'end', 
            renderer: function(value){
                return Ext.util.Format.number(parseFloat(value), '0,000');
            },
        },
        // { header: 'SL cắt', locked: true, dataIndex: 'amountcutsum', width: 60, summaryType: 'sum', summaryRenderer: 'renderSum',
        //     renderer: function (value, metaData, record, rowIndex) {
        //         var c = record.get('iscuttt');
        //         if (c == 0) {
        //             metaData.tdCls = 'process-granted';
        //         } else {
        //             metaData.tdCls =  'process-finish';
        //         }      
        //         return value;
        //     },        
        // },
        // { header: 'Khoán RC', reference: 'pprocess_edit_amounttarget',
        //     columns: [
        //         { header: 'H-nay', dataIndex: 'amounttarget', width: 60,
        //             editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, minValue: 0, maxValue: 100000, selectOnFocus: false},
        //             summaryType: 'sum', summaryRenderer: 'renderSum',
        //             align: 'end', 
        //             renderer: function (value, metaData, record, rowIndex) {
        //                 metaData.tdCls = 'process-editablecolumn';
        //                 return Ext.util.Format.number(parseFloat(value), '0,000');
        //             }                     
        //         },
        //         { header: 'H-trc', dataIndex: 'amounttargetprev', width: 55,
        //             //editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, minValue: 0, maxValue: 100000, selectOnFocus: false},
        //             summaryType: 'sum', summaryRenderer: 'renderSum',
        //             align: 'end', 
        //             renderer: function(value){
        //                 return Ext.util.Format.number(parseFloat(value), '0,000');
        //             },
        //         }                
        //     ]
        // },
        { header: 'Vào chuyền', reference: 'pprocess_edit_amountinput',
            columns: [
                { header: 'SL', dataIndex: 'amountinput', width: 55,
                    editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, maxValue: 100000, selectOnFocus: false},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function (value, metaData, record, rowIndex) {
                        metaData.tdCls = 'process-editablecolumn';
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    }                     
                }, 
                { header: 'LK', dataIndex: 'amountinputsum', width: 60, 
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function(value){
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    },
                }
            ]
        },
        { header: 'Ra chuyền', reference: 'pprocess_edit_amountoutput',
            columns: [
                { header: 'SL', dataIndex: 'amountoutput', width: 55,
                    editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, maxValue: 100000, selectOnFocus: false},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function (value, metaData, record, rowIndex) {
                        metaData.tdCls = 'process-editablecolumn';
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    }                     
                }, 
                { header: 'LK', dataIndex: 'amountoutputsum', width: 60, 
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function(value){
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    },
                }
            ]
        },
        // { header: 'Lỗi', 
        //     columns: [
        //         { header: 'SL', dataIndex: 'amounterror', width: 55,
        //             editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, minValue: 0, maxValue: 100000, selectOnFocus: false},
        //             summaryType: 'sum', summaryRenderer: 'renderSum'
        //         }, 
        //         { header: 'LK', dataIndex: 'amounterrorsum', width: 60, 
        //             summaryType: 'sum', summaryRenderer: 'renderSum'
        //         }
        //     ]
        // },      
        // { header: 'Đăng ký QC', reference: 'pprocess_edit_amountkcsreg',
        //     columns: [
        //         { header: 'H-nay', dataIndex: 'amountkcsreg', width: 60,
        //             editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, minValue: 0, maxValue: 100000, selectOnFocus: false},
        //             summaryType: 'sum', summaryRenderer: 'renderSum',
        //             align: 'end', 
        //             renderer: function (value, metaData, record, rowIndex) {
        //                 metaData.tdCls = 'process-editablecolumn';
        //                 return Ext.util.Format.number(parseFloat(value), '0,000');
        //             }                     
        //         },
        //         { header: 'H-trc', dataIndex: 'amountkcsregprev', width: 55,
        //             //editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, minValue: 0, maxValue: 100000, selectOnFocus: false},
        //             summaryType: 'sum', summaryRenderer: 'renderSum', 
        //             align: 'end', 
        //             renderer: function(value){
        //                 return Ext.util.Format.number(parseFloat(value), '0,000');
        //             },
        //         }                
        //     ]
        // },
        { header: 'Nhập hoàn thiện', reference: 'pprocess_edit_amountpackstocked',
            columns: [
                { header: 'SL', dataIndex: 'amountpackstocked', width: 55,
                    editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, maxValue: 100000, selectOnFocus: true},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    renderer: function (value, metaData, record, rowIndex) {
                        metaData.tdCls = 'process-editablecolumn';
                        return value;
                    }                     
                }, 
                { header: 'LK', dataIndex: 'amountpackstockedsum', width: 60,
                    summaryType: 'sum', summaryRenderer: 'renderSum'
                }
            ]
        },        
        // { header: 'Đóng gói', reference: 'pprocess_edit_amountpacked',
        //     columns: [
        //         { header: 'SL', dataIndex: 'amountpacked', width: 55, id: 'pprocess_edit_amountpacked',
        //             editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, maxValue: 100000, selectOnFocus: false},
        //             summaryType: 'sum', summaryRenderer: 'renderSum',
        //             align: 'end', 
        //             renderer: function (value, metaData, record, rowIndex) {
        //                 metaData.tdCls = 'process-editablecolumn';
        //                 return Ext.util.Format.number(parseFloat(value), '0,000');
        //             }                     
        //         }, 
        //         { header: 'LK', dataIndex: 'amountpackedsum', width: 60, 
        //             summaryType: 'sum', summaryRenderer: 'renderSum', 
        //             align: 'end', 
        //             renderer: function(value){
        //                 return Ext.util.Format.number(parseFloat(value), '0,000');
        //             },
        //         }
        //     ]
        // },
        { header: 'Nhập thành phẩm', reference: 'pprocess_edit_amountstocked',
            columns: [
                { header: 'SL', dataIndex: 'amountstocked', width: 60,
                    editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, maxValue: 100000, selectOnFocus: false},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function (value, metaData, record, rowIndex) {
                        metaData.tdCls = 'process-editablecolumn';
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    }                     
                }, 
                { header: 'LK', dataIndex: 'amountstockedsum', width: 65,
                    summaryType: 'sum', summaryRenderer: 'renderSum', 
                    align: 'end', 
                    renderer: function(value){
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    },
                }
            ]
        },        
        // { header: 'Nhập kho TP', dataIndex: 'totalstocked', width: 60,
        //     summaryType: 'sum', summaryRenderer: 'renderSum', 
        //     align: 'end', 
        //     renderer: function(value){
        //         return Ext.util.Format.number(parseFloat(value), '0,000');
        //     },
        // },
        // { header: 'ĐG-RC', dataIndex: 'amountdg_rc', width: 65,
        //     summaryType: 'sum', summaryRenderer: 'renderSum', 
        //     align: 'end', 
        //     renderer: function(value){
        //         return Ext.util.Format.number(parseFloat(value), '0,000');
        //     },
        // },
        { header: 'Ghi chú', dataIndex: 'comment', flex: 1,
        editor: {
            allowBlank: true,
            selectOnFocus: false
        }
        },
        // {
        //     width: 40,
        //     cell: {
        //         tools: {
        //             menu: 'onMenu'
        //         }
        //     }
        // }        
        // { 
        //     xtype: 'actioncolumn',
        //     reference: 'porderprocessing_contextmenu',
		// 	width: 25,
		// 	menuDisabled: true,
		// 	sortable: false,
		// 	items: [
        //     {
		// 		iconCls: 'x-fa fas fa-bars violetIcon',
        //         //tooltip:'Chuẩn bị SX',
        //         //handler: 'onItemSetReady'
        //         handler: 'onMenu'
        //     },
        // ]
        // }
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [{
            xtype: 'datefield',
            width: 130,
            format: 'd/m/Y',
            reference:'processingdate',
            name: 'processingdate',
            value: new Date(),  // defaults to today
            listeners: {
                change: 'onProcessingDateChange'
            }
        }, 
        {
            xtype: 'combobox',
            reference:'factorycombo',
            width: 130,
            editable: false,
            bind: {
                store: '{FactoryStore}'
            },
            displayField: 'name',
            valueField: 'id',
            listeners: {
                select: 'onFactoryItemSelected'
            }
        },     
        {
            tooltip: 'Tải lại bảng tiến độ',
            iconCls: 'x-fa fa-refresh',
            weight: 30,
            handler: 'onRefreshTap'
        },           
        {
            xtype: 'combobox',
            emptyText: 'Tổ chuyền',
            width: 130,
            editable: false,
            bind: {
                store: '{ProductionLineStore}'
            },
            displayField: 'name',
            valueField: 'id',
            reference:'orgcombo',
            listeners: {
                select: 'onOrgItemSelected'
            }
        },
        // {
        //     tooltip: 'Thêm lệnh sản xuất vào tổ chuyền',
        //     text: 'Thêm lệnh sản xuất',
        //     iconCls: 'x-fa fa-plus',
        //     enableToggle: true,
        //     pressed: true,
        //     handler: 'onPOrderListDialog'
        // },
        // {
        //     xtype: 'checkboxgroup',
        //     layout: 'column',
        //     defaultType: 'container',
        //     //columns: 1,
        //     items: [
        //         {margin: '10 0 0 5', columnWidth: 0.25, items: [{ xtype: 'checkboxfield', boxLabel: 'Chưa SX'}]},
        //         {margin: '10 0 0 10', columnWidth: 0.25, items: [{ xtype: 'checkboxfield', boxLabel: 'Chuẩn bị SX'}]},
        //         {margin: '10 0 0 10', columnWidth: 0.25, items: [{ xtype: 'checkboxfield', boxLabel: 'Đang SX'}]},
        //         {margin: '10 0 0 10', columnWidth: 0.25, items: [{ xtype: 'checkboxfield', boxLabel: 'Kết thúc SX'}]},
        //     ]
        // }
        { xtype: 'checkboxfield', id: 'chkGrant', reference: 'chkGrant', boxLabel:  '<span class="process-granted">' + 'Chưa SX' + '</span>', checked: true, listeners: {change:'onCheckStatusChange'}},
        // { xtype: 'checkboxfield', id: 'chkReady', reference: 'chkReady', boxLabel: '<span style="background-color:yellow; color:red">' + 'Chuẩn bị SX' + '</span>', checked: true, listeners: {change:'onCheckStatusChange'}},
        { xtype: 'checkboxfield', id: 'chkSubProcess', reference: 'chkSubProcess', boxLabel: '<span class="process-subprocess">' + 'Công đoạn phụ' + '</span>', checked: true, listeners: {change:'onCheckStatusChange'}},
        { xtype: 'checkboxfield', id: 'chkRunning', reference: 'chkRunning', boxLabel: '<span class="process-running">' + 'Đang SX' + '</span>', checked: true, listeners: {change:'onCheckStatusChange'}},
        { xtype: 'checkboxfield', id: 'chkDone', reference: 'chkDone', boxLabel: '<span class="process-finish">' + 'Kết thúc SX' + '</span>', checked: true, listeners: {change:'onCheckStatusChange'}},
    ]
    }],
    // viewConfig: {
    //     getRowClass: function(record, index) {
    //         var c = record.get('status');
    //         if (c == 1) {
    //             return 'process-granted';
    //         } else if (c == 2) {
    //             return 'process-ready';
    //         } else if (c == 3) {
    //             return 'process-running';
    //         } else if (c == 4) {
    //             return 'process-done';
    //         } else if (c == 5) {
    //             return 'process-finish';
    //         } else if (c == 6) {
    //             return 'process-subprocess';
    //         }
    //     }
    // },
    listeners: {
        // activate: 'onActivate',
        celldblclick: 'onCelldblclick'
    }
});
