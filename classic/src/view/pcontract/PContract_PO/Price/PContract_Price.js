Ext.define('GSmartApp.view.pcontract.PContract_Price', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_Price',
    id: 'PContract_Price',
    // controller: 'PContractProductBomViewController',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            } 
        }
    },
    bind: {
        store: '{PContractProductBomStore}',
        title: '{title}'
    },
    columns: [{
        text: 'Ngày chào',
        dataIndex: 'pricedate',
        width: 80
    },{
        text: 'Ngày chốt',
        dataIndex: 'activedate',
        width: 80
    },{
        text: 'Giá chào',
        dataIndex: 'totalprice',
        width: 80
    },{
        text: 'Loại tiền',
        dataIndex: 'currencyid_link',
        width: 80
    },{
        text: 'Tỷ giá',
        dataIndex: 'exchangerate',
        flex: 1
    },{
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        bind:{
            hidden: '{ishiddenActionColumn}'
        },
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    }],
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
        padding: '0 0 10 5',
        height: 35,
        items:[{
            xtype:'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
            labelWidth : 0,
            value: 'Chào giá'
        },
		'->'
		,
		{
            xtype:'button',
            itemId:'btnThemMoi',
            ui: 'header',
            margin: '10 5 0 0',
			tooltip: 'Thêm sản phẩm',
            iconCls: 'x-fa fa-plus'
        }]
    }]
});

