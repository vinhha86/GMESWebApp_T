Ext.define('GSmartApp.view.contractbuyer.ContractBuyerDetail.ContractBuyerDetail_BuyerList', {
    extend: 'Ext.grid.Panel',
    xtype: 'ContractBuyerDetail_BuyerList',
    id: 'ContractBuyerDetail_BuyerList',
    // viewModel: {
    //     type: 'ContractBuyerDetail_BuyerListViewModel'
    // },
    controller: 'ContractBuyerDetail_BuyerListController',
    reference: 'ContractBuyerDetail_BuyerList',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{ListEndBuyer}'
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    columns: [
    {
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, 
    {
        text: 'Buyer',
        dataIndex: 'code',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'codeFilter',
            width: 304,
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onCodeFilterKeyup',
                buffer: 500
            }
        }
    }],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close',
            formBind: false
        },{
            xtype:'button',
            text: 'Thêm Buyer',
            margin: 3,
            itemId:'btnAdd',
            iconCls: 'x-fa fa-plus',
            formBind: false
        },{
            flex:1,
            border: false
        }]
    }]
});

