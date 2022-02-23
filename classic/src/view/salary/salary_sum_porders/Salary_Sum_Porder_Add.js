Ext.define('GSmartApp.view.salary.Salary_Sum_Porder_Add', {
    extend: 'Ext.grid.Panel',
    xtype: 'Salary_Sum_Porder_Add',
    id: 'Salary_Sum_Porder_Add',
    reference: 'Salary_Sum_Porder_Add',
    requires: [
        'Ext.Number',
        'Ext.Date',
        'Ext.selection.CellModel'
    ],
    controller: 'Salary_Sum_Porder_Add_Controller',
    viewModel:{
        type:'Salary_Sum_Porder_Add_Model'
    },    
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    bind:{
        store:'{POrder_Grant}'
    },
    // renderTo: Ext.getBody(),   
    columns: [
        // {xtype: 'rownumberer'},
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
            dataIndex: 'grantamount',
            renderer: function(value){
                return Ext.util.Format.number(parseFloat(value), '0,000');
            },
            // flex: 1,
            width: 75,
            align: 'end'
        }
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items:[{
            flex: 1,
            border: false
        },{
            xtype: 'button',
            margin: 5,
            text: 'Xác nhận',
            iconCls: 'x-fa fa-check',
            itemId: 'btnXacNhan',
            formBind: true
        },{
            xtype: 'button',
            margin: 5,
            text: 'Thoát',
            iconCls: 'x-fa fa-window-close',
            itemId: 'btnThoat'
        }]
    }]
})