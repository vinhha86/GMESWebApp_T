Ext.define('GSmartApp.view.pcontract.PContract_PO.Export_Quotation.SelectPO_Quotation', {
    extend: 'Ext.grid.Panel',
    xtype: 'SelectPO_Quotation',
    controller: 'SelectPO_Quotation_Controller',
    viewModel: {
        type: 'SelectPO_Quotation_ViewModel'
    },
    id:'SelectPO_Quotation',
    requires: [
        'Ext.Number',
        'Ext.Date'
    ],
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
        getRowClass: function (record, index) {
            if (record.data.status == 0) {
                return "po_accept";
            }
        }
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SIMPLE',
        checkOnly: true
    },
    bind:{
        store:'{PO_Quotation_Store}'
    },
    columns:[{
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    },{
        text:'PO Buyer',
        dataIndex:'po_buyer',
        width: 140
    },{
        text:'PO Vendor',
        dataIndex:'po_vendor',
        width: 140
    },{
        text:'SP',
        dataIndex:'productbuyercode',
        width: 80
    },{
        text:'SL',
        align: 'end',
        dataIndex:'po_quantity',
        width: 60
    },{
        text:'Ngày giao',
        dataIndex:'shipdate',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        width: 95
    },
    {
        text:'Ngày NPL',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        dataIndex:'matdate',
        width: 70
    },
    {
        text:'Ngày VC',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        dataIndex:'productiondate',
        width: 70
    }],
    dockedItems:[{
        dock: 'bottom',
        layout:'hbox',
        items:[{
            flex: 1
        },{
            xtype:'button',
            text: 'Chọn',
            margin: 3,
            itemId:'btnChon',
            iconCls: 'x-fa fa-check'
        },{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }]
    },{
        dock:'top',
        layout:'hbox',
        items: [{
            xtype: 'textfield',
            margin: 3,
            fieldLabel: 'Tên báo giá',
            bind: {
                value: '{name_quotation}'
            }
        }]
    }]
});

