Ext.define('GSmartApp.view.stock.stock_material_list.StockMaterialList', {
    extend: 'Ext.grid.Panel',
    xtype: 'StockMaterialList',
    itemId: 'StockMaterialList',
    reference: 'StockMaterialList',
    controller: 'StockMaterialListController',
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        enableTextSelection: true,
        rowLines: true
    },
    features: [
        {
            ftype: 'summary',
            dock: 'bottom'
        }
    ],
    bind: {
        store: '{WarehouseStore}'
    },
    columns: [
        // {
        //     text: 'STT',
        //     width: 50,
        //     xtype: 'rownumberer',
        //     align: 'center'
        // },
        {
            text: 'Mã NPL',
            dataIndex: 'skuCode',
            // flex: 1,
            width: 180,
            align: 'center',
			items: {
				xtype: 'textfield',
				fieldStyle: "",
				margin: 1,
				reference: 'ValueFilterFieldMaNPL',
				width: '99%',
				enableKeyEvents: true,
				listeners: {
					keyup: 'onFilterValueMaNPLKeyup',
					buffer: 500
				}
			},
            renderer: function(value, meta, record){
                if(value == null){
                    return '';
                }
                // return value * 100;
                meta.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            summaryType: 'count',
            summaryRenderer: 'renderCount'
        },
        {
            text: 'Màu',
            dataIndex: 'colorname',
            // flex: 1,
            width: 150,
            align: 'center',
			items: {
				xtype: 'textfield',
				fieldStyle: "",
				margin: 1,
				reference: 'ValueFilterFieldColor',
				width: '99%',
				enableKeyEvents: true,
				listeners: {
					keyup: 'onFilterValueColorKeyup',
					buffer: 500
				}
			},
            renderer: function(value, meta, record){
                if(value == null){
                    return '';
                }
                // return value * 100;
                meta.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        {
            text: 'Số lot',
            dataIndex: 'lotnumber',
            // flex: 1,
            width: 150,
            align: 'center',
            items: {
				xtype: 'textfield',
				fieldStyle: "",
				margin: 1,
				reference: 'ValueFilterFieldLot',
				width: '99%',
				enableKeyEvents: true,
				listeners: {
					keyup: 'onFilterValueLotKeyup',
					buffer: 500
				}
			},
            renderer: function(value, meta, record){
                if(value == null){
                    return '';
                }
                // return value * 100;
                meta.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        {
            text: 'Số cây',
            dataIndex: 'packageid',
            // flex: 1,
            width: 75,
            align: 'center',
            renderer: function(value, meta, record){
                if(value == null){
                    return '';
                }
                // return value * 100;
                meta.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        {
            text: 'Sản phẩm',
            dataIndex: 'stockinProductString',
            // flex: 1,
            width: 150,
            align: 'center',
            items: {
				xtype: 'textfield',
				fieldStyle: "",
				margin: 1,
				reference: 'ValueFilterFieldProduct',
				width: '99%',
				enableKeyEvents: true,
				listeners: {
					keyup: 'onFilterValueProductKeyup',
					buffer: 500
				}
			},
            renderer: function(value, meta, record){
                if(value == null){
                    return '';
                }
                // return value * 100;
                meta.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        {
            text: 'Dài (m)',
            dataIndex: 'met',
            // flex: 1,
            width: 75,
            align: 'center',
            renderer: function(value, meta, record){
                if(value == null || isNaN(value)){
                    return '';
                }
                // return value * 100;
                // metaData.tdAttr = 'data-qtip="' + value + '"';
                return Ext.util.Format.number(value, '0.00');
            },
            summaryType: 'sum',
            summaryRenderer: 'renderSum'
        },
        {
            text: 'Dài (y)',
            dataIndex: 'yds',
            // flex: 1,
            width: 75,
            align: 'center',
            renderer: function(value, meta, record){
                if(value == null || isNaN(value)){
                    return '';
                }
                // return value * 100;
                return Ext.util.Format.number(value, '0.00');
            },
            summaryType: 'sum',
            summaryRenderer: 'renderSum'
        },
        {
            text: 'Khổ cỡ(cm)',
            dataIndex: 'width_met',
            // flex: 1,
            width: 75,
            align: 'center',
            renderer: function(value, meta, record){
                if(value == null){
                    return '';
                }
                return value * 100;
            },
        },
        {
            text: 'Đơn hàng',
            dataIndex: 'contractcode',
            // flex: 1,
            width: 150,
            align: 'center',
            renderer: function(value, meta, record,){
                if(value == null){
                    return '';
                }
                // return value * 100;
                meta.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
    ],
    dockedItems:[
        {
            layout:'hbox',
            border: false,
            dock:'bottom',
            items:[
                {
                    xtype:'textfield',
                    // itemId: 'code',
                    // margin: 5,
                    fieldLabel: 'Dãy',
                    bind:{
                        value :'{objStock.row}'
                    },
                    width: 140,
                    labelWidth: 35,
                    margin: '5 1 5 1',
                },
                {
                    xtype:'textfield',
                    // itemId: 'code',
                    // margin: 5,
                    fieldLabel: 'Tầng',
                    bind:{
                        value :'{objStock.space}'
                    },
                    width: 140,
                    labelWidth: 35,
                    margin: '5 5 5 1',
                    maskRe: /[0-9]/,
                },
                {
                    xtype:'textfield',
                    // itemId: 'code',
                    // margin: 5,
                    fieldLabel: 'Khoang',
                    bind:{
                        value :'{objStock.floor}'
                    },
                    width: 150,
                    labelWidth: 45,
                    margin: '5 5 5 1',
                    maskRe: /[0-9]/,
                },
                {
                    xtype: 'button',
                    itemId: 'btnChuyenKhoang',
                    iconCls: 'x-fa fa-random',
                    tooltip: 'Chuyển khoang',
                    text: 'Chuyển khoang',
                    margin: '5 1 5 1',
                },
            ]
        }
    ],
});

