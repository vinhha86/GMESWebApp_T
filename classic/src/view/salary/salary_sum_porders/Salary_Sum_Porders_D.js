Ext.define('GSmartApp.view.salary.Salary_Sum_Porders_D', {
    extend: 'Ext.grid.Panel',
    xtype: 'Salary_Sum_Porders_D',
    reference: 'Salary_Sum_Porders_D',
    requires: [
        'Ext.Number',
        'Ext.Date',
        'Ext.selection.CellModel'
    ],
    controller: 'Salary_Sum_Porders_D_Controller',
    layout: 'fit',
    scrollable: true,
    bind:{
        store:'{SalarySumPOrdersStore}'
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
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
     },
    // renderTo: Ext.getBody(),   
    columns: [
        {xtype: 'rownumberer'},
        {
            xtype: 'actioncolumn',
            width: 28,
            menuDisabled: true,
            sortable: false,
            align: 'center',
            items: [
                {
                    iconCls: 'x-fa fas fa-trash-o redIcon',
                    handler: 'onDelete_Porder'
                },            
            ]
        },           
        {
            text: 'Mã lệnh',
            dataIndex: 'pordercode',
            width: 120,
            renderer: function (value, metaData, record, rowIndex) {
                var c = record.get('status');
                if(c == 0){
                    metaData.tdCls = 'process-free';
                }else if (c == 1) {
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
        },     
        {
            text: 'Mã SP (Buyer)',
            dataIndex: 'productcode',
            width: 140,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },       
        {
            text: 'PO Buyer',
            dataIndex: 'po_buyer',
            flex: 1,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },     
        {
            text: 'Buyer',
            dataIndex: 'buyername',
            width: 120,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        }, 
        {
            text: 'Vendor',
            dataIndex: 'vendorname',
            width: 120,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },   
        {
            text: 'Vào chuyền',
            dataIndex: 'start_date_plan',
            renderer: Ext.util.Format.dateRenderer('d/m/y'),
            // flex: 1,
            width: 70,
        }, {
            text: 'Kết thúc',
            dataIndex: 'finish_date_plan',
            renderer: Ext.util.Format.dateRenderer('d/m/y'),
            // flex: 1,
            width: 70,
        }, {
            text: 'Số lượng',
            dataIndex: 'amountstocked',
            renderer: function(value){
                return Ext.util.Format.number(parseFloat(value), '0,000');
            },
            // flex: 1,
            width: 75,
            align: 'end'
        }
    ],
    dockedItems: [
    {
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
                handler: 'onReload_Porder'
            },
            {
                text: 'Thêm lệnh sản xuất',
                iconCls: 'x-fa fa-plus',
                weight: 30,
                handler: 'onAdd_Porder'
            },
            '->',
            {
                text: 'Chốt bảng lệnh',
                iconCls: 'x-fa fa-check',
                weight: 30,
                handler: 'onConfirm_POrderList'
            },
    ]
    },
    {
        dock: 'bottom',
        layout: 'vbox',
        border: false,
        items: [
        {
            layout: 'hbox',
            border: false,
            items: [{
                html: '<div class="color-box">'
                +'<div class="color-square process-running"></div>&nbspĐang SX'
                +'</div>',
                margin: '5'
            },{
                html: '<div class="color-box">'
                +'<div class="color-square process-done"></div>&nbspSX xong'
                +'</div>',
                margin: '5'
            },{
                html: '<div class="color-box">'
                +'<div class="color-square process-finish"></div>&nbspNhập kho xong'
                +'</div>',
                margin: '5'
            }]
        }
        ]
    }    
],
});
