Ext.define('GSmartApp.view.pprocess.PackagingProcess', {
    extend: 'Ext.grid.Panel',
    xtype: 'PackagingProcess',
    reference: 'PackagingProcess',
    requires: [
        'Ext.Number',
        'Ext.Date',
        'Ext.selection.CellModel'
    ],
    controller: 'PackagingProcess_Controller',
    viewModel: {
        type: 'PProcessViewModel'
    },    
    layout: 'fit',
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
        { header: 'PO Buyer', locked: true, dataIndex: 'pordercode', width: 155,
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
                    metaData.tdCls =  'process-done';
                } else if (c == 6) {
                    metaData.tdCls =  'process-finish';
                }
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            summaryType: 'count', summaryRenderer: 'renderSum'                   
        },
        { header: 'Ngày giao', headerWrap: true, locked: true, dataIndex: 'golivedate', width: 70, 
            // renderer: Ext.util.Format.dateRenderer('d/m/y'),
            renderer: function(value){
                var date = Ext.Date.parse(value, 'c');
                return Ext.Date.format(date, 'd/m/y');
            },
        },
        { header: 'SL đơn', locked: true, dataIndex: 'grantamount', width: 60, summaryType: 'sum', summaryRenderer: 'renderSum',
            align: 'end', 
            renderer: function(value){
                return Ext.util.Format.number(parseFloat(value), '0,000');
            },
        },
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
        { header: 'Đóng gói', reference: 'pprocess_edit_amountpacked',
            columns: [
                { header: 'SL', dataIndex: 'amountpacked', width: 55, id: 'pprocess_edit_amountpacked',
                    editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, maxValue: 100000, selectOnFocus: false},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function (value, metaData, record, rowIndex) {
                        metaData.tdCls = 'process-editablecolumn';
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    }                     
                }, 
                { header: 'LK', dataIndex: 'amountpackedsum', width: 60, 
                    summaryType: 'sum', summaryRenderer: 'renderSum', 
                    align: 'end', 
                    renderer: function(value){
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    },
                }
            ]
        },
        { header: 'Xuất TP-->Kho', reference: 'pprocess_edit_amountstocked',
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
        { header: 'Ghi chú', dataIndex: 'comment', flex: 1,
        editor: {
            allowBlank: true,
            selectOnFocus: false
        }
        },
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
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
        { xtype: 'checkboxfield', id: 'chkGrant', reference: 'chkGrant', boxLabel:  'Chưa SX', checked: true, listeners: {change:'onCheckStatusChange'}},
        // { xtype: 'checkboxfield', id: 'chkReady', reference: 'chkReady', boxLabel: '<span style="background-color:yellow; color:red">' + 'Chuẩn bị SX' + '</span>', checked: true, listeners: {change:'onCheckStatusChange'}},
        { xtype: 'checkboxfield', id: 'chkSubProcess', reference: 'chkSubProcess', boxLabel: '<span style="background-color:blue; color:yellow">' + 'Công đoạn phụ' + '</span>', checked: true, listeners: {change:'onCheckStatusChange'}},
        { xtype: 'checkboxfield', id: 'chkRunning', reference: 'chkRunning', boxLabel: '<span style="background-color:green; color:yellow">' + 'Đang SX' + '</span>', checked: true, listeners: {change:'onCheckStatusChange'}},
        { xtype: 'checkboxfield', id: 'chkDone', reference: 'chkDone', boxLabel: '<span style="background-color:lightgray; color:blue">' + 'Kết thúc SX' + '</span>', checked: true, listeners: {change:'onCheckStatusChange'}},
    ]
    }],
    listeners: {
        celldblclick: 'onCelldblclick'
    }
});
