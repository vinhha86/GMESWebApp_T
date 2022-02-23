Ext.define('GSmartApp.view.salary.Salary_DefProductivity_SalTypeLabor', {
    extend: 'Ext.grid.Panel',
    xtype: 'Salary_DefProductivity_SalTypeLabor',
    id:'Salary_DefProductivity_SalTypeLabor',
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
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            } 
        }
    },
    bind:{
        store:'{SalTypeLaborLevelStore}'
    },
    columns:[
        {
            xtype: 'actioncolumn',
            width: 28,
            reference: 'sku_contextmenu',
            menuDisabled: true,
            sortable: false,
            align: 'center',
            iconCls:'x-fa fas fa-trash-o redIcon',
            handler: 'onXoa_LaborLevel'
        },   
        {
            text:'Chức danh',
            dataIndex:'laborlevel_name',
            flex: 1
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
            value: 'Chức danh công việc'
        },
        '->'
        ,            
        {
            tooltip: 'Thêm vị trí',
            iconCls: 'x-fa fa-plus',
            weight: 30,
            handler: 'onAddSalLabor'
        }
    ]
    }]
});

