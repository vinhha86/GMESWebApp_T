Ext.define('GSmartApp.view.porders.PorderProcessingDetail', {
    extend: 'Ext.grid.Panel',
    xtype: 'PorderProcessingDetail',
    reference: 'PorderProcessingDetail',
    requires: [
        // 'GSmartApp.store.POrderProcessing',
        // 'Ext.Number',
        // 'Ext.Date',
        // 'Ext.selection.CellModel'
    ],
    controller: 'PorderProcessingDetailController',
    // viewModel: {
        // type: 'PProcessViewModel'
    // },
    layout: 'fit',
    scrollable: true,
    bind:{
        store:'{porderprocessing}'
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
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
     },
    columns: [
        { header: 'Ngày', dataIndex: 'processingdate', width: 70, renderer: Ext.util.Format.dateRenderer('d/m/y')},
        // { header: 'SL đơn hàng', locked: true, dataIndex: 'grantamount', width: 60, summaryType: 'sum', summaryRenderer: 'renderSum',
        //     align: 'end', 
        //     renderer: function(value){
        //         return Ext.util.Format.number(parseFloat(value), '0,000');
        //     },
        // },
        { header: 'Khoán RC', reference: 'pprocess_edit_amounttarget',
            columns: [
                { header: 'H-nay', dataIndex: 'amounttarget', width: 60,
                    editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, minValue: 0, maxValue: 100000, selectOnFocus: false},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function (value, metaData, record, rowIndex) {
                        metaData.tdCls = 'process-editablecolumn';
                        if(value == null) value = 0;
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    }                     
                },
                { header: 'H-trc', dataIndex: 'amounttargetprev', width: 60,
                    //editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, minValue: 0, maxValue: 100000, selectOnFocus: false},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function(value){
                        if(value == null) value = 0;
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    },
                }                
            ]
        },
        { header: 'Vào chuyền', reference: 'pprocess_edit_amountinput',
            columns: [
                { header: 'SL', dataIndex: 'amountinput', width: 55,
                    editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, maxValue: 100000, selectOnFocus: false},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function (value, metaData, record, rowIndex) {
                        metaData.tdCls = 'process-editablecolumn';
                        if(value == null) value = 0;
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    }                     
                }, 
                { header: 'LK', dataIndex: 'amountinputsum', width: 60, 
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function(value){
                        if(value == null) value = 0;
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
                        if(value == null) value = 0;
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    }                     
                }, 
                { header: 'LK', dataIndex: 'amountoutputsum', width: 60, 
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function(value){
                        if(value == null) value = 0;
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    },
                }
            ]
        },
        { header: 'Đăng ký QC', reference: 'pprocess_edit_amountkcsreg',
            columns: [
                { header: 'H-nay', dataIndex: 'amountkcsreg', width: 60,
                    editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, minValue: 0, maxValue: 100000, selectOnFocus: false},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function (value, metaData, record, rowIndex) {
                        metaData.tdCls = 'process-editablecolumn';
                        if(value == null) value = 0;
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    }                     
                },
                { header: 'H-trc', dataIndex: 'amountkcsregprev', width: 60,
                    //editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, minValue: 0, maxValue: 100000, selectOnFocus: false},
                    summaryType: 'sum', summaryRenderer: 'renderSum', 
                    align: 'end', 
                    renderer: function(value){
                        if(value == null) value = 0;
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    },
                }                
            ]
        },
        { header: 'Nhập hoàn thiện', reference: 'pprocess_edit_amountstocked',
            columns: [
                { header: 'SL', dataIndex: 'amountpackstocked', width: 55,
                    editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, maxValue: 100000, selectOnFocus: false},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function (value, metaData, record, rowIndex) {
                        metaData.tdCls = 'process-editablecolumn';
                        if(value == null) value = 0;
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    }                     
                }, 
                { header: 'LK', dataIndex: 'amountpackstockedsum', width: 60,
                    summaryType: 'sum', summaryRenderer: 'renderSum', 
                    align: 'end', 
                    renderer: function(value){
                        if(value == null) value = 0;
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    },
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
                        if(value == null) value = 0;
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    }                     
                }, 
                { header: 'LK', dataIndex: 'amountpackedsum', width: 60, 
                    summaryType: 'sum', summaryRenderer: 'renderSum', 
                    align: 'end', 
                    renderer: function(value){
                        if(value == null) value = 0;
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    },
                }
            ]
        },
        { header: 'Nhập thành phẩm', dataIndex: 'amountstocked', width: 75,
            summaryType: 'sum', summaryRenderer: 'renderSum', 
            align: 'end', 
            renderer: function(value){
                if(value == null) value = 0;
                return Ext.util.Format.number(parseFloat(value), '0,000');
            },
        },
        { header: 'ĐG-RC', dataIndex: 'amountdg_rc', width: 65,
            summaryType: 'sum', summaryRenderer: 'renderSum', 
            align: 'end', 
            renderer: function(value){
                if(value == null) value = 0;
                return Ext.util.Format.number(parseFloat(value), '0,000');
            },
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
        // {
        //     xtype: 'datefield',
        //     width: 130,
        //     format: 'd/m/Y',
        //     reference:'processingdate',
        //     name: 'processingdate',
        //     value: new Date(),  // defaults to today
        //     listeners: {
        //         change: 'onProcessingDateChange'
        //     }
        // }, 
        // {
        //     xtype: 'combobox',
        //     reference:'factorycombo',
        //     width: 130,
        //     editable: false,
        //     bind: {
        //         store: '{FactoryStore}'
        //     },
        //     displayField: 'name',
        //     valueField: 'id',
        //     listeners: {
        //         select: 'onFactoryItemSelected'
        //     }
        // },     
        {
            tooltip: 'Tải lại bảng tiến độ',
            iconCls: 'x-fa fa-refresh',
            weight: 30,
            handler: 'onRefreshTap'
        },           
        {
            xtype: 'combobox',
            emptyText: 'Tổ chuyền',
            width: 170,
            editable: false,
            bind: {
                store: '{POrderGrantStore}'
            },
            // displayField: 'granttoorgname',
            displayField: 'displayName',
            valueField: 'id',
            reference:'POrderGrantStoreCombo',
            listeners: {
                select: 'onPOrderGrantStoreComboSelect'
            }
        },
        '->',
        {
            xtype: 'datefield',
            width: 130,
            format: 'd/m/Y',
            reference:'addProcessingdate',
            name: 'addProcessingdate',
            value: new Date(),  // defaults to today,
            maxValue: new Date(),
        }, 
        { 
            xtype: 'button',
            margin: 5,
            text: 'Thêm ngày',
            width: 90,
            itemId: 'btnAddProcessingdate',
            listeners: {
                click: 'onBtnAddProcessingdate'
            }
        }
    ]
    }],
    // listeners: {
    //     // activate: 'onActivate',
    //     celldblclick: 'onCelldblclick'
    // }
});
