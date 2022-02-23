Ext.define('GSmartApp.view.users.User_Org_FactoryView', {
    extend: 'Ext.grid.Panel',
    xtype: 'User_Org_FactoryView',
    id:'User_Org_FactoryView',
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
    bind:{
        store:'{GpayUserFactory}'
    },
    columns:[
        {
            xtype: 'actioncolumn',
            width: 28,
            menuDisabled: true,
            sortable: false,
            align: 'center',
            iconCls:'x-fa fas fa-trash-o redIcon',
            handler: 'onXoa_OrgView'
        },   
        {
            text:'Phân xưởng',
            dataIndex:'orgname',
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
            value: 'Phân xưởng quản lý'
        },
        '->'
        ,            
        {
            tooltip: 'Thêm phân xưởng',
            iconCls: 'x-fa fa-plus',
            weight: 30,
            handler: 'onAdd_OrgFactoryView'
        }
    ]
    }]
});

