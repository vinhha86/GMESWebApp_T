Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Porders', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_PO_Edit_Porders',
    id:'PContract_PO_Edit_Porders',
    controller: 'PContract_PO_Edit_PordersController',
    IdPcontract: 0,
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
        plugins: {
            ptype: 'gridviewdragdrop',
            enableDrag: false,
            //dragText: '{0} Mã sản xuất được tính lương',
            dragGroup: 'firstGridDDGroup',
            dropGroup: 'porderGanttDropGroup'
        },
        listeners: {
            // drop: 'onDropOrg',
            beforedrop: 'onBeforeDropOrg'
        }          
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            // listeners: {
            //     edit: 'onEdit'
            // } 
        }
    },
    features: [{
        ftype:'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind:{
        store:'{POrderStore}'
    },
    columns:[{
        header:'PX',
        dataIndex:'granttoorgcode',
        width: 80
    },
    {
        header:'Dải cỡ',
        dataIndex:'sizesetname',
        flex: 1
    },
    {
        header:'SL',
        dataIndex:'totalorder',
        width: 70,
        summaryType: 'sum', 
        // summaryRenderer: 'renderSum'
        editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, maxValue: 9999999, selectOnFocus: false}
    },{
        xtype: 'actioncolumn',
        id: 'PContract_PO_Edit_Porders_deletebutton',
        width: 20,
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: 'Xóa',
            handler: 'onXoa'
        }]
    }]
});

