Ext.define('GSmartApp.view.pprocess.POrderProcessingBySalaryMonth', {
    extend: 'Ext.grid.Panel',
    xtype: 'porderprocessingbysalarymonth',
    reference: 'porderprocessingbysalarymonth',
    requires: [
        'GSmartApp.store.POrderProcessing',
        'Ext.Number',
        'Ext.Date'
    ],
    controller: 'porderprocessingbysalarymonth',
    layout: 'fit',
    //frame: true,
    scrollable: true,
    store: {
        type: 'porderprocessing'
    },
    columnLines: true,
    
    plugins: {
        cellediting: {
            clicksToEdit: 2,
            listeners: {
                edit: 'onProcessingItemEdit',
                beforeedit : function(editor, context, eOpts) {
                    //Lenh da sx xong khong cho sua so luong
                    if (context.record.data.status == 5)
                        return false;
                    else
                        return true;
                }
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
        plugins: {
            ptype: 'gridviewdragdrop',
            enableDrag: false,
            //dragText: '{0} Mã sản xuất được tính lương',
            dragGroup: 'firstGridDDGroup',
            dropGroup: 'secondGridDDGroup'
        },
        listeners: {
            drop: 'onDrop',
            beforedrop: 'onBeforeDrop'
        }     
     },
    //renderTo: Ext.getBody(),   
    columns: [
        //{ text: 'STT',  dataIndex: 'id', width: 44 },
        //{xtype: 'rownumberer'},
        { 
			xtype: 'actioncolumn',
			width: 25,
			menuDisabled: true,
            sortable: false,
            locked: true,
            renderer: function (value, metadata, record) {
                if (record.get('balance_status') > 0) {
                    this.iconCls = 'x-fa fas fa-battery-4 greenIcon';
                    this.tooltip = 'NPL Sẵn sàng';                    

                }
                else {
                    if (record.get('balance_date') != null){
                        var dt = new Date(record.get('balance_date'));
                        this.tooltip = 'Dự kiến NPL về: ' + Ext.Date.format(dt, "d/m/Y"); 
                        this.iconCls = 'x-fa fas fa-battery-2 violetIcon';    
                    } else {
                        this.tooltip = 'Dự kiến NPL về: Chưa xác định';
                        this.iconCls = 'x-fa fas fa-battery-0 redIcon';
                    }
                }
            },
            handler: 'onSetBalance' 
		},           
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
                //metaData.tdCls = record.get('change') > 0 ? 'color-other' : 'color-gio';
                // if (null != record.get('productiondate')){
                //     metaData.tdAttr = 'data-qtip="' + Ext.util.Format.date(record.get('productiondate'),'d/m/Y') + '"';
                // }
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
        { header: 'Dự kiến SX', headerWrap: true, locked: true, dataIndex: 'productiondate', width: 80, renderer: Ext.util.Format.dateRenderer('d/m/Y')},
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
        { header: 'Khoán RC', reference: 'pprocess_edit_amounttarget',
            columns: [
                { header: 'H-nay', dataIndex: 'amounttarget', width: 55,
                    editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, minValue: 0, maxValue: 100000, selectOnFocus: false},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    renderer: function (value, metaData, record, rowIndex) {
                        metaData.tdCls = 'process-editablecolumn';
                        return value;
                    }                     
                },
                { header: 'H-trc', dataIndex: 'amounttargetprev', width: 55,
                    //editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, minValue: 0, maxValue: 100000, selectOnFocus: false},
                    summaryType: 'sum', summaryRenderer: 'renderSum'
                }                
            ]
        },
        { header: 'Vào chuyền', reference: 'pprocess_edit_amountinput',
            columns: [
                { header: 'SL', dataIndex: 'amountinput', width: 55,
                    editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, maxValue: 100000, selectOnFocus: true},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    renderer: function (value, metaData, record, rowIndex) {
                        metaData.tdCls = 'process-editablecolumn';
                        return value;
                    }                     
                }, 
                { header: 'LK', dataIndex: 'amountinputsum', width: 60, 
                    summaryType: 'sum', summaryRenderer: 'renderSum'
                }
            ]
        },
        { header: 'Ra chuyền', reference: 'pprocess_edit_amountoutput',
            columns: [
                { header: 'SL', dataIndex: 'amountoutput', width: 55,
                    editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, maxValue: 100000, selectOnFocus: true},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    renderer: function (value, metaData, record, rowIndex) {
                        metaData.tdCls = 'process-editablecolumn';
                        return value;
                    }                     
                }, 
                { header: 'LK', dataIndex: 'amountoutputsum', width: 60, 
                    summaryType: 'sum', summaryRenderer: 'renderSum'
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
        { header: 'Đăng ký QC', reference: 'pprocess_edit_amountkcsreg',
            columns: [
                { header: 'H-nay', dataIndex: 'amountkcsreg', width: 55,
                    editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, minValue: 0, maxValue: 100000, selectOnFocus: false},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    renderer: function (value, metaData, record, rowIndex) {
                        metaData.tdCls = 'process-editablecolumn';
                        return value;
                    }                     
                },
                { header: 'H-trc', dataIndex: 'amountkcsregprev', width: 55,
                    //editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, minValue: 0, maxValue: 100000, selectOnFocus: false},
                    summaryType: 'sum', summaryRenderer: 'renderSum'
                }                
            ]
        },
        { header: 'Nhập kho', reference: 'pprocess_edit_amountstocked',
            columns: [
                { header: 'SL', dataIndex: 'amountstocked', width: 55,
                    editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, maxValue: 100000, selectOnFocus: true},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    renderer: function (value, metaData, record, rowIndex) {
                        metaData.tdCls = 'process-editablecolumn';
                        return value;
                    }                     
                }, 
                { header: 'LK', dataIndex: 'amountstockedsum', width: 60,
                    summaryType: 'sum', summaryRenderer: 'renderSum'
                }
            ]
        },
        // { header: 'Nhập hoàn thiện', reference: 'pprocess_edit_amountpackstocked',
        //     columns: [
        //         { header: 'SL', dataIndex: 'amountpackstocked', width: 55,
        //             editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, maxValue: 100000, selectOnFocus: true},
        //             summaryType: 'sum', summaryRenderer: 'renderSum',
        //             renderer: function (value, metaData, record, rowIndex) {
        //                 metaData.tdCls = 'process-editablecolumn';
        //                 return value;
        //             }                     
        //         }, 
        //         { header: 'LK', dataIndex: 'amountpackstockedsum', width: 60,
        //             summaryType: 'sum', summaryRenderer: 'renderSum'
        //         }
        //     ]
        // },        
        { header: 'Đóng gói', reference: 'pprocess_edit_amountpacked',
            columns: [
                { header: 'SL', dataIndex: 'amountpacked', width: 55, id: 'pprocess_edit_amountpacked',
                    editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, maxValue: 100000, selectOnFocus: true},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    renderer: function (value, metaData, record, rowIndex) {
                        metaData.tdCls = 'process-editablecolumn';
                        return value;
                    }                     
                }, 
                { header: 'LK', dataIndex: 'amountpackedsum', width: 60, 
                    summaryType: 'sum', summaryRenderer: 'renderSum'
                }
            ]
        },
        { header: 'Nhập thành phẩm', dataIndex: 'totalstocked', width: 60,
            summaryType: 'sum', summaryRenderer: 'renderSum'
        },
        { header: 'ĐG-RC', dataIndex: 'amountdg_rc', width: 65,
            summaryType: 'sum', summaryRenderer: 'renderSum'
        },
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
        { 
            xtype: 'actioncolumn',
            reference: 'porderprocessing_contextmenu',
			width: 25,
			menuDisabled: true,
			sortable: false,
			items: [
            {
				iconCls: 'x-fa fas fa-bars violetIcon',
                //tooltip:'Chuẩn bị SX',
                //handler: 'onItemSetReady'
                handler: 'onMenu'
            },
            // {
			// 	iconCls: 'x-fa fas fa-forward violetIcon',
			// 	tooltip: 'Chuyển/Tách chuyền',
			// 	handler: 'onSplitGrant'
			// },{
			// 	iconCls: 'x-fa fas fa-cogs blueIcon',
			// 	tooltip: 'Công đoạn phụ',
			// 	handler: 'onSubProcess'
			// },{
			// 	iconCls: 'x-fa fas fa-stop-circle redIcon',
			// 	tooltip: 'Dừng SX',
			// 	handler: 'onFinishProcess'
			// },{
			// 	iconCls: 'x-fa fas fa-file-text-o orangeIcon',
			// 	tooltip: 'Biên bản lỗi'
			// 	//handler: 'onDelete'
            // }
        ]
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
        }, {
            xtype: 'combobox',
            width: 130,
            editable: false,
            //margin: '0 5 0 5',
            //fieldLabel: 'Tổ SX',
            store: {
                type: 'orgtosx'
            },
            displayField: 'name',
            valueField: 'id',
            reference:'orgcombo',
            listeners: {
                select: 'onOrgItemSelected'
            }
        },
        {
            xtype: 'combobox',
            reference:'cbosalarymonth_Salary',                
            width: 150,
            editable: false,
            //margin: '0 5 0 5',
            // fieldLabel: 'Tháng/Năm TL:',
            // labelWidth: 95,
            store: {
                type: 'monthstore'
            },
            displayField: 'name',
            valueField: 'id',
            listeners: {
                select: 'onMonthItemSelected'
            }                
        },            
        {
            xtype: 'numberfield',
            clearable: false,
            hideTrigger:true,
            allowBlank: true, 
            minValue: Ext.Date.format(new Date(), 'Y') - 10,
            reference:'txtsalaryyear_Salary',
            width: 60,
            hideLabel: false,
            emptyText: 'Năm',
            //value: Ext.Date.format(new Date(), 'Y')
        },         
        {
            tooltip: 'Tải bảng tiến độ',
            iconCls: 'x-fa fa-search',
            weight: 30,
            handler: 'onSearchTap'
        },
        {
            tooltip: 'Lệnh tính lương',
            iconCls: 'x-fa fa-money',
            weight: 30,
            handler: 'onSalaryManTap'
        }        
    ]
    }],

    listeners: {
        activate: 'onActivate'
    }
});
