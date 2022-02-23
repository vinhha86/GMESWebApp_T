Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_StockList', {
    extend: 'Ext.grid.Panel',
    xtype: 'CutplanProcessing_StockList',
    itemId: 'CutplanProcessing_StockList',
    reference: 'CutplanProcessing_StockList',
    controller: 'CutplanProcessing_StockList_Controller',
    viewModel:{
        type:'CutplanProcessing_StockList_ViewModel'
    },
    viewConfig: {
        stripeRows: false,
        enableTextSelection: false,
        columnLines: true,
        rowLines: true,
    },
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'SINGLE'
    // },
    features: [
        {
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '<b>Đơn vị: {name}</b>',
            hideGroupedHeader: false,
            enableGroupingMenu: false,
        },
    ],
    bind:{
        store:'{WarehouseStore}'
    },
    columns:[
        { 
            header: 'Số lot', 
            dataIndex: 'lotnumber', 
            flex: 1
        },
        { 
            header: 'Số cây', 
            dataIndex: 'packageid', 
            flex: 1
        },
        { 
            header: 'Màu NPL', 
            dataIndex: 'colorname', 
            width: 250
        },
        { 
            header: 'Dài(m)', 
            dataIndex: 'met', 
            flex: 1,
            renderer: function (value, metaData, record){
                if(value == null) return "";
                return Ext.util.Format.number(value, '0,000.00');
            },
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
        },
        { 
            header: 'Dài(y)', 
            dataIndex: 'yds', 
            flex: 1,
            renderer: function (value, metaData, record){
                if(value == null) return "";
                return Ext.util.Format.number(value, '0,000.00');
            },
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
        },
        { 
            header: 'Khổ(cm)', 
            dataIndex: 'width_met', 
            flex: 1,
            renderer: function (value, metaData, record){
                if(value == null) return "";
                return value * 100;
            }
        },
    ],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close'
        },{
            flex:1,
            border: false
        },]
    }]
});

