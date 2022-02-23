Ext.define('GSmartApp.view.cutting.CuttingList', {
    extend: 'Ext.grid.Panel',
    xtype: 'cuttinglist',
    reference: 'cuttinglist',
    requires: [
        'GSmartApp.store.POrderProcessing',
        'Ext.Number',
        'Ext.Date',
        'Ext.selection.CellModel'
    ],
    layout: 'fit',
    scrollable: true,
    store: {
        type: 'porderprocessing'
    },
    columnLines: true,
    selModel: {
        type: 'cellmodel'
    },    
    plugins: {
        cellediting: {
            clicksToEdit: 2,
            listeners: {
                edit: 'onProcessingItemEdit'
            }            
        }
        // rowediting: {
        //     clicksToMoveEditor: 1,
        //     autoCancel: false,l
        //     listeners: {
        //         edit: 'onProcessingItemEdit'
        //     }               
        // }        
    },    
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }], 
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
        plugins: {
            ptype: 'gridviewdragdrop',
            // enableDrag: false,
            //dragText: '{0} Mã sản xuất được tính lương',
            dragGroup: 'firstGridDDGroup',
            dropGroup: 'secondGridDDGroup'
        },
        listeners: {
            drop: 'onDrop'
        }          
     },
    // renderTo: Ext.getBody(),   
    columns: [
        { header: 'Mã SX', locked: true, dataIndex: 'ordercode', width: 70,
            //editor: {xtype: 'textfield', readOnly: true},
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'porderFilterField',
                width: 65,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onPOrderFilterKeyup',
                    buffer: 500
                }
            },
            renderer: function (value, metaData, record, rowIndex) {
                var c = record.get('status');
                if (c == 20) {
                    metaData.tdCls = 'process-ready';
                } else if (c == 21) {
                    metaData.tdCls =  'process-subprocess';
                } else if (c == 23) {
                    metaData.tdCls =  'process-running';
                } else if (c == 24) {
                    metaData.tdCls =  'process-done';
                }                
                return value;
            },
            summaryType: 'count', summaryRenderer: 'renderSum'                   
        },
        { header: 'Lịch lên hàng', headerWrap: true, locked: true, dataIndex: 'golivedesc', width: 90,
            editor: {
                allowBlank: true,
                selectOnFocus: false
            }
        },
        { header: 'Dự kiến SX', headerWrap: true, locked: true, dataIndex: 'productiondate', width: 90, renderer: Ext.util.Format.dateRenderer('d/m/Y')},
        { header: 'Cắt DK', locked: true, dataIndex: 'totalorder', width: 60, summaryType: 'sum', summaryRenderer: 'renderSum'},
        { header: 'Cắt TT', locked: true, dataIndex: 'amountcutsum', width: 60, summaryType: 'sum', summaryRenderer: 'renderSum',
            renderer: function (value, metaData, record, rowIndex) {
                var c = record.get('iscuttt');
                if (c == 0) {
                    metaData.tdCls = 'process-granted';
                } else {
                    metaData.tdCls =  'process-finish';
                }      
                return value;
            },        
        },
        { header: 'Xuất vải?', headerWrap: true, xtype: 'checkcolumn', dataIndex: 'isstockouttocut', width: 60},
        { header: 'Cắt', reference: 'cutting_amountcutting',
            columns: [
                { header: 'SL', dataIndex: 'amountcutting', width: 55,
                    editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, minValue: 0, maxValue: 100000, selectOnFocus: false},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    renderer: function (value, metaData, record, rowIndex) {
                        metaData.tdCls = 'process-editablecolumn';
                        return value;
                    }                     
                },
                { header: 'LK', dataIndex: 'amountcuttingsum', width: 55,
                    //editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, minValue: 0, maxValue: 100000, selectOnFocus: false},
                    summaryType: 'sum', summaryRenderer: 'renderSum'
                }                
            ]
        },
        { header: 'Đánh số', reference: 'cutting_amountnumbering',
            columns: [
                { header: 'SL', dataIndex: 'amountnumbering', width: 55,
                    editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, maxValue: 100000, selectOnFocus: false},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    renderer: function (value, metaData, record, rowIndex) {
                        metaData.tdCls = 'process-editablecolumn';
                        return value;
                    }                     
                }, 
                { header: 'LK', dataIndex: 'amountnumberingsum', width: 60, 
                    summaryType: 'sum', summaryRenderer: 'renderSum'
                }
            ]
        },
        { header: 'Ép Mex', reference: 'cutting_amountmex',
            columns: [
                { header: 'SL', dataIndex: 'amountmex', width: 55,
                    editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, maxValue: 100000, selectOnFocus: false},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    renderer: function (value, metaData, record, rowIndex) {
                        metaData.tdCls = 'process-editablecolumn';
                        return value;
                    }                     
                }, 
                { header: 'LK', dataIndex: 'amountmexsum', width: 60, 
                    summaryType: 'sum', summaryRenderer: 'renderSum'
                }
            ]
        },
        { header: 'Phát lên chuyền', reference: 'cutting_amounttoline',
            columns: [
                { header: 'SL', dataIndex: 'amounttoline', width: 55,
                    editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, maxValue: 100000, selectOnFocus: false},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    renderer: function (value, metaData, record, rowIndex) {
                        metaData.tdCls = 'process-editablecolumn';
                        return value;
                    }                     
                }, 
                { header: 'LK', dataIndex: 'amounttolinesum', width: 60,
                    summaryType: 'sum', summaryRenderer: 'renderSum'
                }
            ]
        },
        { header: 'Ghi chú', dataIndex: 'comment', flex: 1,
        editor: {
            allowBlank: true,
            selectOnFocus: false
        }
        }
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
            tooltip: 'Tải lại bảng tiến độ',
            iconCls: 'x-fa fa-refresh',
            weight: 30,
            handler: 'onRefreshTap'
        },
        {
            tooltip: 'Thêm lệnh vào bàn cắt',
            iconCls: 'x-fa fa-plus',
            weight: 30,
            handler: 'onOrderListTap'
        },
        { xtype: 'checkboxfield', id: 'chkReady', reference: 'chkReady', boxLabel: '<span style="background-color:yellow; color:red">' + 'Đang cắt' + '</span>', checked: true, listeners: {change:'onCheckStatusChange'}},
        { xtype: 'checkboxfield', id: 'chkNumbering', reference: 'chkNumbering', boxLabel: '<span style="background-color:blue; color:yellow">' + 'Đang đánh số' + '</span>', checked: true, listeners: {change:'onCheckStatusChange'}},
        { xtype: 'checkboxfield', id: 'chkMex', reference: 'chkMex', boxLabel: '<span style="background-color:green; color:yellow">' + 'Đang Ép Mex' + '</span>', checked: true, listeners: {change:'onCheckStatusChange'}},
        { xtype: 'checkboxfield', id: 'chkDelivered', reference: 'chkDelivered', boxLabel: '<span style="background-color:lightgray; color:blue">' + 'Đã phát lên chuyền' + '</span>', checked: true, listeners: {change:'onCheckStatusChange'}},
    ]
    }],
    // listeners: {
    //     activate: 'onActivate'
    // }
});
