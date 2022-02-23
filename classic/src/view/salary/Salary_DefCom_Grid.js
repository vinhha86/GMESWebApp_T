Ext.define('GSmartApp.view.salary.Salary_DefCom_Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'Salary_DefCom_Grid',
    itemId:'Salary_DefCom_Grid',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    plugins: {
        cellediting: {
            clicksToEdit: 2,
            listeners: {
                validateedit: 'onDefComGridItemEdit'
            }       
        }
    },
    bind:{
        store:'{SalComStore}'
    },
    columns:[
        {
            xtype: 'actioncolumn',
            width: 28,
            menuDisabled: true,
            sortable: false,
            align: 'center',
            iconCls:'x-fa fas fa-trash-o redIcon',
            handler: 'onXoa_LaborLevel'
        },   
        {
            text:'Loại phụ cấp',
            dataIndex:'name',
            flex: 1
        },
        {
            text:'Hệ số',
            dataIndex:'comratio',
            width: 50,
            editor: {xtype: 'numberfield', hideTrigger:true, allowDecimals: true, allowBlank: false, maxValue: 100, selectOnFocus: false},
        },
        {
            text:'Phụ cấp',
            dataIndex:'comamount',
            width: 80,
            editor: {xtype: 'numberfield', hideTrigger:true, allowDecimals: false, allowBlank: false, maxValue: 1000000000, selectOnFocus: false},
            renderer: function (value, metaData, record, rowIndex) {
                return Ext.util.Format.number(parseInt(value), '0,000');
            }       
        }
    ],    
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        padding: '0 0 10 5',
        height: 40,
        items: [
        {
            xtype:'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
            labelWidth : 0,
            value: 'Phụ cấp'
        },
        '->'
        ,            
        {
            tooltip: 'Thêm vị trí',
            iconCls: 'x-fa fa-plus',
            weight: 30,
            handler: 'onAddSalCom'
        }
    ]
    }]
});

