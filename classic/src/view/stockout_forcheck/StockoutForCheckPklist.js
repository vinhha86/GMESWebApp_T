Ext.define('GSmartApp.view.stockout.StockoutForCheckPklist', {
    extend: 'Ext.grid.Panel',
    xtype: 'stockoutforcheckpklist',
    reference: 'stockoutforcheckpklist',
    requires: [
        'Ext.grid.Panel',
        'GSmartApp.store.Stockout_pklist_forcheck'
    ],
    title: 'Chi tiết kiểm, xử lý vải',
    layout: 'fit',
    border: true,
    scrollable: true,
    store: {
        type: 'stockout_pklist_forcheck'
    },
    flex: 1,
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onPklistItemEdit'
            }            
        }            
        // rowediting: {
        //     listeners: {
        //         cancelEdit: 'onCancelEdit',
        //         beforeedit: 'onBeforeEdit'    
        //     }
        // }
    }, 
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    viewConfig: {
        enableTextSelection: false,
        stripeRows: false,
    },                  
    columns: [
        { text: 'Theo hóa đơn',flex: 1, reference: 'col_invoice',
            columns:[
                { text: 'SL', reference: 'col_ydsorigin', dataIndex: 'ydsorigin', width: 70, summaryType: 'sum', summaryRenderer: 'renderSummary',
                    editable: true,
                    editor: {
                        xtype: 'numberfield',
                        hideTrigger:true,
                        required: true,
                        spinUpEnabled: false,
                        spinDownEnabled: false,
                        selectOnFocus: true,
                        validators: {
                            type: 'number',
                            message: 'Invalid value'
                        },
                        // listeners: {
                        //     specialkey: function(field, e){
                        //         // e.HOME, e.END, e.PAGE_UP, e.PAGE_DOWN,
                        //         // e.TAB, e.ESC, arrow keys: e.LEFT, e.RIGHT, e.UP, e.DOWN
                        //         if (e.getKey() == e.DOWN) {
                        //             var grid = this.getView().store;
                        //             var nextRow = grid.lastEdit.row + 1;
                        //             if (nextRow < grid.view.getRows().length) {
                        //                 grid.stopEditing();
                        //                 grid.startEditing(nextRow, contributions.lastEdit.col);
                        //                 grid.selModel.select(nextRow, grid.lastEdit.col);
                        //             }
                        //         }
                        //     }
                        // }                        
                    }          
                },                
                { text: 'Khổ', reference: 'col_widthorigin', dataIndex: 'widthorigin', width: 70, summaryType: 'count', summaryRenderer: 'renderSummary',
                    editable: true,
                    editor: {
                        xtype: 'numberfield',
                        hideTrigger:true,
                        required: true,
                        spinUpEnabled: false,
                        spinDownEnabled: false,
                        validators: {
                            type: 'number',
                            message: 'Invalid value'
                        }
                    }         
                }
            ]
        },
        { text: 'Sau kiểm vải', flex: 1, reference: 'col_check',
            columns:[
                { text: 'SL', reference: 'col_ydscheck', dataIndex: 'ydscheck', width: 70, summaryType: 'sum', summaryRenderer: 'renderSummary',
                    editable: true,
                    editor: {
                        xtype: 'numberfield',
                        hideTrigger:true,
                        required: true,
                        spinUpEnabled: false,
                        spinDownEnabled: false,
                        validators: {
                            type: 'number',
                            message: 'Invalid value'
                        }
                    },                    
                },                
                { text: 'Khổ', reference: 'col_widthcheck', dataIndex: 'widthcheck', width: 70, name: 'widthcheck',
                    editable: true,
                    editor: {
                        xtype: 'numberfield',
                        hideTrigger:true,
                        required: true,
                        spinUpEnabled: false,
                        spinDownEnabled: false,
                        validators: {
                            type: 'number',
                            message: 'Invalid value'
                        }
                    }       
                },        
                { text: 'Chênh lệch', reference: 'col_dif_checked', headerWrap: true, dataIndex: 'dif_checked', width: 70,
                    renderer: 'renderCell',
                    summaryType: 'sum', summaryRenderer: 'renderSummary'
                }                                
            ]
        },
        { text: 'Sau xử lý vải', flex: 1, reference: 'col_processed',
            columns:[
                { text: 'SL', reference: 'col_ydsprocessed', dataIndex: 'ydsprocessed', width: 70, summaryType: 'sum', summaryRenderer: 'renderSummary',
                    editable: true,
                    editor: {
                        xtype: 'numberfield',
                        hideTrigger:true,
                        required: true,
                        spinUpEnabled: false,
                        spinDownEnabled: false,
                        validators: {
                            type: 'number',
                            message: 'Invalid value'
                        }
                    }                 
                },                
                { text: 'Khổ', reference: 'col_widthprocessed', dataIndex: 'widthprocessed', width: 70,
                    editable: true,
                    editor: {
                        xtype: 'numberfield',
                        hideTrigger:true,
                        required: true,
                        spinUpEnabled: false,
                        spinDownEnabled: false,
                        validators: {
                            type: 'number',
                            message: 'Invalid value'
                        }
                    },                    
        
                },        
                { text: 'Chênh lệch', reference: 'col_dif_processed', headerWrap: true, dataIndex: 'dif_processed', width: 70, 
                    renderer: 'renderCell',
                    summaryType: 'sum', summaryRenderer: 'renderSummary'
                }
            ]
        },
        { header: 'Lỗi', reference: 'col_totalerror', dataIndex: 'totalerror', width: 70, summaryType: 'sum', summaryRenderer: 'renderSummary',
            editable: true,
            editor: {
                xtype: 'numberfield',
                hideTrigger:true,
                required: true,
                spinUpEnabled: false,
                spinDownEnabled: false,
                validators: {
                    type: 'number',
                    message: 'Invalid value'
                }
            },                    
        },        
        { header: 'Ghi chú', dataIndex: 'extrainfo', flex: 1,
            editable: true,
            editor: {
                xtype: 'textfield'
            }              
        },
        {
            xtype: 'actioncolumn',
            reference: 'porderprocessing_contextmenu',
            width: 25,
            menuDisabled: true,
            sortable: false,
            renderer: function (value, metadata, record) {
                if (record.get('status') > 0) {
                    this.iconCls = 'x-fa fas fa-trash-o greyIcon';
                    this.tooltip = 'Đã xuất kho';                    
                }
                else {
                    this.iconCls = 'x-fa fas fa-trash-o redIcon';
                    this.tooltip = 'Xóa cuộn vải';  
                }
            },            
            handler: 'onPklistItemDelete'
        }                                 
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
        {
            xtype: 'numberfield',
            hidden: true,
            // labelAlign: 'top',
            // fieldLabel: 'SL HĐ',
            emptyText: 'SL HĐ',
            clearable: false,
            hideTrigger:true,
            allowBlank: false, 
            minValue: 0,
            maxValue: 10000,
            reference:'txtydsorigin',
            width: 80,
            enableKeyEvents: true,
            listeners: {
                specialkey: 'onYdsOriginKeyup'
            }
        },            
        {
            xtype: 'numberfield',
            hidden: true,
            // labelAlign: 'top',
            // fieldLabel: 'Khổ HĐ',
            emptyText: 'Khổ HĐ',
            clearable: false,
            hideTrigger:true,
            allowBlank: false, 
            minValue: 0,
            maxValue: 10000,
            reference:'txtwidthorigin',
            width: 80,
            enableKeyEvents: true,
            listeners: {
                specialkey: 'onWidthOriginKeyup'
            }
        },   
        {
            xtype: 'numberfield',
            // labelAlign: 'top',
            // fieldLabel: 'SL đo',
            emptyText: 'Kiểm vải',
            clearable: false,
            hideTrigger:true,
            allowBlank: false, 
            minValue: 0,
            maxValue: 10000,
            reference:'txtydscheck',
            width: 100,
            enableKeyEvents: true,
            listeners: {
                specialkey: 'onYdsCheckKeyup'
            }
        },          
        {
            xtype: 'numberfield',
            id: 'txt_widthcheck',
            // labelAlign: 'top',
            // fieldLabel: 'Khổ đo',
            emptyText: 'Khổ vải',
            clearable: false,
            hideTrigger:true,
            allowBlank: false, 
            minValue: 0,
            maxValue: 10000,
            reference:'txtwidthcheck',
            width: 100,
            enableKeyEvents: true,
            listeners: {
                specialkey: 'onWidthCheckKeyup'
            }
        },  
        {
            xtype: 'numberfield',
            // labelAlign: 'top',
            // fieldLabel: 'SL co',
            emptyText: 'Xử lý vải',
            clearable: false,
            hideTrigger:true,
            allowBlank: false, 
            minValue: 0,
            maxValue: 10000,
            reference:'txtydsprocessed',
            width: 100,
            enableKeyEvents: true,
            listeners: {
                specialkey: 'onYdsProcessedKeyup'
            }
        },
        {
            xtype: 'numberfield',
            // labelAlign: 'top',
            // fieldLabel: 'Khổ co',
            emptyText: 'Khổ vải (co)',
            clearable: false,
            hideTrigger:true,
            allowBlank: false, 
            minValue: 0,
            maxValue: 10000,
            reference:'txtwidthprocessed',
            width: 100,
            enableKeyEvents: true,
            listeners: {
                specialkey: 'onWidthProcessedKeyup'
            }
        },          
        {
            xtype: 'numberfield',
            // labelAlign: 'top',
            // fieldLabel: 'Lỗi',
            emptyText: 'Lỗi',
            clearable: false,
            hideTrigger:true,
            allowBlank: false, 
            minValue: 0,
            maxValue: 10000,
            reference:'txttotalerror',
            width: 100,
            enableKeyEvents: true,
            listeners: {
                specialkey: 'onTotalErrorKeyup'
            }
        },                      
        {
            xtype: 'button',
            tooltip: 'Thêm vào danh sách kiểm',
            //margin: '0 0 20 0',
            iconCls: 'x-fa fa-plus',
            weight: 30,
            handler: 'onAddPklistButton'
        },
    ]
    }],
    // listeners: {
    //     keypress: {
    //         element: 'el',
    //         fn: function(iEvent, iElement) {
    //             iCode = iEvent.getKey();
    //             if (iCode != undefined && iCode != iEvent.LEFT && iCode != iEvent.RIGHT && iCode != iEvent.UP && iCode != iEvent.DOWN && iCode != iEvent.ENTER && iCode != iEvent.ESC) {
    //                 var iView = grid.getView();

    //                 var selection = iView.selModel.selection;

    //                 grid.plugins[0].startEditByPosition({row:selection.rowIdx,
    //                                                column: selection.colIdx});
    //             }
    //         }
    //     }
    // },    
});
