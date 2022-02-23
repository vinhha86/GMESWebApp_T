Ext.define('GSmartApp.view.pcontract.PContractProductColorView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractProductColorView',
    id:'PContractProductColorView',
    controller: 'PContractProductColorViewCotroller',
    IdPContract: 0,
    IdProduct: 0,
    viewModel: {
        type :'PContractViewModel'
    },
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    features: [{
        ftype:'summary',
        groupHeaderTpl: 'Tổng'
    }],
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            } 
        }
    },
    bind:{
        store:'{PContractProductColorStore}'
    },
    columns:[{
        text:'Màu sản phẩm',
        dataIndex:'colorName',
        flex: 1,
        summaryType: 'count',
        summaryRenderer: function (value, summaryData, dataIndex) {
            return '<div style="color:red; font-weight: bold; align: right">'+ 'Tổng';
        }
    },{
        text:'SL',
        dataIndex:'pquantity',
        width: 100,
        editor:{
            xtype:'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        summaryType: 'sum',
        summaryRenderer: function(value, summaryData, dataIndex) {
            return '<div style="color:red; font-weight: bold; align: right">'+ value ;
        }
    }],
    dockedItems:[{
        dock:'bottom',
        border: false,
        layout:'hbox',
        items:[{
            flex: 1
        },{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }]
    }]
});

