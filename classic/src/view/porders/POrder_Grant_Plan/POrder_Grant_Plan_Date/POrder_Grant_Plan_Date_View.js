Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_Date_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_Grant_Plan_Date_View',
    itemId: 'POrder_Grant_Plan_Date_View',
    reference: 'POrder_Grant_Plan_Date_View',
    cls: 'POrder_Grant_Plan_Date_View',
    controller: 'POrder_Grant_Plan_Date_ViewController',
    viewModel:{
        type:'POrder_Grant_Plan_Date_ViewModel'
    },
    // requires: [
	// 	'Ext.grid.plugin.CellEditing',
	// 	'Ext.grid.plugin.Exporter',
	// ],
    // plugins: [
    //     {
    //         ptype: 'gridexporter',
    //         // gridexporter: true
    //     },
    // ],
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    // features: [
    //     {
    //         id: 'group',
    //         ftype: 'groupingsummary',
    //         groupHeaderTpl: '<b>{name}</b>',
    //         hideGroupedHeader: false,
    //         enableGroupingMenu: false,
    //     },
    // ],
    bind:{
        store:'{DateStore}'
    },
    columns:[
        { 
            xtype: 'datecolumn',
            format: 'd/m/Y',
            header: 'Ngày', 
            dataIndex: 'date', 
            flex: 1,
			// items: {
			// 	xtype: 'textfield',
			// 	fieldStyle: "",
			// 	margin: 1,
			// 	reference: 'ValueFilterFieldMaNPL',
			// 	width: '99%',
			// 	enableKeyEvents: true,
			// 	listeners: {
			// 		keyup: 'onFilterValueMaNPLKeyup',
			// 		buffer: 500
			// 	}
			// },
            // renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	metaData.tdAttr = 'data-qtip="' + value + '"';
			// 	return value;
			// },
            // summaryType: 'count',
			// summaryRenderer: 'renderCount',
        },
    ],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[
            {
                xtype:'button',
                text: 'Thoát',
                margin: 3,
                itemId:'btnThoat',
                iconCls: 'x-fa fa-window-close'
            },
            {
                xtype:'button',
                text: 'Chọn',
                margin: 3,
                itemId:'btnSelect',
                iconCls: 'x-fa fa-check'
            },
            {
                flex:1,
                border: false
            },
        ]
    }]
});

