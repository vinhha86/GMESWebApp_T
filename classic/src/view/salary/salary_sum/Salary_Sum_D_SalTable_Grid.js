Ext.define('GSmartApp.view.salary.Salary_Sum_D_SalTable_Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'Salary_Sum_D_SalTable_Grid',
    reference: 'Salary_Sum_D_SalTable_Grid',
    requires: [
        'Ext.Number',
        'Ext.Date',
        'Ext.selection.CellModel'
    ],
    layout: 'fit',
    scrollable: true,
    bind:{
        store:'{SalarySumStore}'
    },
    columnLines: true,
    selModel: {
        type: 'cellmodel'
    },    
    plugins: {
        cellediting: {
            clicksToEdit: 2,
            listeners: {
                validateedit: 'onSalTableItemEdit'
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
    features: [
        // {
        //     id: 'group',
        //     ftype: 'groupingsummary',
        //     groupHeaderTpl: '<b>Tổ sản xuất: {name}</b>',
        //     hideGroupedHeader: false,
        //     enableGroupingMenu: false
        // },
        {
            ftype: 'summary',
            dock: 'bottom'
        }
    ], 
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
     },
    // renderTo: Ext.getBody(),   
    columns: [
        {xtype: 'rownumberer'},
        { header: 'Họ và tên', locked: true, dataIndex: 'personel_fullname', width: 150,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'fullnameFilterField',
                width: 145,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onfullnameFilterKeyup',
                    buffer: 500
                }
            },
            summaryType: 'count', summaryRenderer: 'renderSum'                   
        },
        { header: 'Thang lương', headerWrap: true, align: 'center', dataIndex: 'personel_saltypecode', width: 60},
        { header: 'Bậc lương', headerWrap: true, align: 'center', dataIndex: 'personel_sallevelcode', width: 55},
        { header: 'Lương sản phẩm',
            columns: [
                { header: 'Số giây', dataIndex: 'luongsp_sl', width: 65,
                    // editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, minValue: 0, maxValue: 100000, selectOnFocus: false},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function (value, metaData, record, rowIndex) {
                        // metaData.tdCls = 'process-editablecolumn';
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    }                     
                },
                { header: 'Số tiền', dataIndex: 'luongsp_tien', width: 80,
                    //editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, minValue: 0, maxValue: 100000, selectOnFocus: false},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function(value){
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    },
                }                
            ]
        },
        { header: 'Lương thời gian',
            columns: [
                { header: 'Số công', dataIndex: 'luongtg_sl', width: 65,
                    // editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, maxValue: 100000, selectOnFocus: false},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function (value, metaData, record, rowIndex) {
                        // metaData.tdCls = 'process-editablecolumn';
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    }                     
                }, 
                { header: 'Số tiền', dataIndex: 'luongtg_tien', width: 100, 
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function(value){
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    },
                }
            ]
        },
        { header: 'Nghỉ hưởng 100% lương',
            columns: [
                { header: 'Số công', dataIndex: 'nghi_sl', width: 65,
                    // editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, maxValue: 100000, selectOnFocus: false},
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function (value, metaData, record, rowIndex) {
                        // metaData.tdCls = 'process-editablecolumn';
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    }                     
                }, 
                { header: 'Số tiền', dataIndex: 'nghi_tien', width: 90, 
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function(value){
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    },
                }
            ]
        },
        { header: 'Phụ cấp chức vụ', headerWrap: true, dataIndex: 'phucap_chucvu', width: 80,
            summaryType: 'sum', summaryRenderer: 'renderSum',
            align: 'end', 
            renderer: function (value, metaData, record, rowIndex) {
                // metaData.tdCls = 'process-editablecolumn';
                return Ext.util.Format.number(parseFloat(value), '0,000');
            }            
        },
        { header: 'Phụ cấp khác', headerWrap: true, dataIndex: 'phucap_khac', width: 80,
            summaryType: 'sum', summaryRenderer: 'renderSum',
            align: 'end', 
            renderer: function (value, metaData, record, rowIndex) {
                // metaData.tdCls = 'process-editablecolumn';
                return Ext.util.Format.number(parseFloat(value), '0,000');
            }            
        },    
        { header: 'Tổng lương', headerWrap: true, dataIndex: 'tongluong', width: 100,
            summaryType: 'sum', summaryRenderer: 'renderSum',
            align: 'end', 
            renderer: function (value, metaData, record, rowIndex) {
                // metaData.tdCls = 'process-editablecolumn';
                return Ext.util.Format.number(parseFloat(value), '0,000');
            }            
        },
        { header: 'Các khoản khấu trừ vào lương', reference: 'pprocess_edit_amountkcsreg',
            columns: [
                { header: 'BHXH', dataIndex: 'giamtru_bhxh', width: 80, 
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function(value){
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    },
                },           
                { header: 'BHYT', dataIndex: 'giamtru_bhyt', width: 80, 
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function(value){
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    },
                },           
                { header: 'BHTN', dataIndex: 'giamtru_bhtn', width: 80, 
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function(value){
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    },
                },           
                { header: 'KPCĐ', dataIndex: 'giamtru_kpcd', width: 100, 
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function(value){
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    },
                },  
                { header: 'Thuế TNCN', dataIndex: 'giamtru_kpcd', width: 80, 
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function(value){
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    },
                },                                
                { header: 'Cộng', dataIndex: 'giamtru_tong', width: 80, 
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                    renderer: function(value){
                        return Ext.util.Format.number(parseFloat(value), '0,000');
                    },
                },           
            ]
        },
        { header: 'Kỳ I', headerWrap: true, dataIndex: 'ky1_tien', width: 80,
            summaryType: 'sum', summaryRenderer: 'renderSum',
            align: 'end', 
            renderer: function (value, metaData, record, rowIndex) {
                // metaData.tdCls = 'process-editablecolumn';
                return Ext.util.Format.number(parseFloat(value), '0,000');
            }            
        },
        { header: 'Kỳ II', headerWrap: true, dataIndex: 'ky2_tien', width: 80,
            summaryType: 'sum', summaryRenderer: 'renderSum',
            align: 'end', 
            renderer: function (value, metaData, record, rowIndex) {
                // metaData.tdCls = 'process-editablecolumn';
                return Ext.util.Format.number(parseFloat(value), '0,000');
            }            
        },    
        // { header: 'Ghi chú', dataIndex: 'comment', flex: 1,
        // editor: {
        //     allowBlank: true,
        //     selectOnFocus: false
        // }
        // },
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        // padding: '0 0 5 5',
        height: 40,
        items: [
            {
                xtype: 'combobox',
                name: 'cbosalarymonth',
                reference:'cbosalarymonth',                
                width: 210,
                editable: false,
                //margin: '0 5 0 5',
                fieldLabel: 'Tháng/Năm TL:',
                labelWidth: 95,
                store: {
                    type: 'monthstore'
                },
                displayField: 'name',
                valueField: 'id',
                bind: {
                    value:'{month}'
                }       
            },            
            {
                xtype: 'numberfield',
                clearable: false,
                hideTrigger:true,
                allowBlank: true, 
                minValue: Ext.Date.format(new Date(), 'Y') - 10,
                name: 'txtsalaryyear',
                reference:'txtsalaryyear',
                width: 65,
                hideLabel: false,
                emptyText: 'Năm',
                bind: {
                    value:'{year}'
                }
            }, 
            {
                tooltip: 'Tải bảng lương',
                iconCls: 'x-fa fa-refresh',
                weight: 30,
                handler: 'onReload_SalTable'
            },
            {
                text: 'Tính lương',
                iconCls: 'x-fa fa-calculator',
                weight: 30,
                handler: 'onCal_SalTable'
            },
            '->',
            {
                text: 'Chốt bảng lương',
                iconCls: 'x-fa fa-check',
                weight: 30,
                handler: 'onConfirm_SalTable'
            },
    ]
    }],
});
