Ext.define('GSmartApp.view.fabricprice.FabricPrice', {
    extend: 'Ext.grid.Panel',
    xtype: 'FabricPrice',
    id: 'FabricPrice',
    viewModel: {
        type: 'FabricPriceViewModel'
    },
    controller: 'FabricPriceController',
    reference: 'FabricPrice',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onFabricPriceItemEdit',
                beforeedit: 'onFabricPriceItemBeforeEdit'
            }             
        }
    },
    features: [
        // {
        //     id: 'group',
        //     ftype: 'groupingsummary',
        //     groupHeaderTpl: '<b>{name}</b>',
        //     hideGroupedHeader: false,
        //     enableGroupingMenu: false,
        // },
        {
            ftype: 'grouping',
            groupHeaderTpl: '{name}'
        }
    ],
    bind: {
        store: '{FabricPriceStore}'
    },
    columns: [
        {
            xtype: 'actioncolumn',
            width: 28,
            menuDisabled: true,
            sortable: false,
            align: 'center',
            items: [
                {
                    iconCls: 'x-fa fas fa-trash',
                    tooltip: 'Xoá giá vải',
                    handler: 'onFabricPrice_Delete'
                },
            ],
            // items: [
            //     {
            //         iconCls: 'x-fa fas fa-bars violetIcon',
            //         handler: 'onMenu_POrderList'
            //     },            
            // ]
        },           
        {
            text: 'STT',
            width: 40,
            xtype: 'rownumberer',
            align: 'center'
        },  
        {
            text: 'Mã NPL',
            dataIndex: 'materialCode',
            width: 200,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'materialCodeFilter',
                width: 196,
                // flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onMaterialCodeFilterKeyup',
                    buffer: 500
                }
            },
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },{
            text:'Màu',
            dataIndex:'color_name',
            width: 200,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'colorNameFilter',
                width: 196,
                // flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onColorNameFilterKeyup',
                    buffer: 500
                }
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },{
            text:'Size',
            dataIndex:'size_name',
            width: 120,
            align: 'end',
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'sizeNameFilter',
                width: 116,
                // flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onSizeNameFilterKeyup',
                    buffer: 500
                }
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
        {
            text: 'Giá/KG',
            dataIndex: 'price_per_kg',
            renderer: function(value){
                return Ext.util.Format.number(parseFloat(value), '0,000.000');
            },
            editor:{
                xtype:'textfield',
                maskRe: /[0-9.]/,
                selectOnFocus: true
            },
            // width: 130,
            flex: 1,
            align: 'end',
            // summaryType: 'sum',
            // summaryRenderer: 'renderSum'
        },
        {
            text: 'M/KG',
            dataIndex: 'm_per_kg',
            renderer: function(value){
                return Ext.util.Format.number(parseFloat(value), '0,000.000');
            },
            editor:{
                xtype:'textfield',
                maskRe: /[0-9.]/,
                selectOnFocus: true
            },
            // width: 130,
            flex: 1,
            align: 'end',
            // summaryType: 'sum',
            // summaryRenderer: 'renderSum'
        },
        {
            text: 'Giá/M',
            dataIndex: 'price_per_m',
            renderer: function(value){
                return Ext.util.Format.number(parseFloat(value), '0,000.000');
            },
            editor:{
                xtype:'textfield',
                maskRe: /[0-9.]/,
                selectOnFocus: true
            },
            // width: 130,
            flex: 1,
            align: 'end',
            // summaryType: 'sum',
            // summaryRenderer: 'renderSum'
        },
        {
            text: 'Ngoại tệ',
            dataIndex: 'currencyid_link',
            // renderer: function(value){
            //     return Ext.util.Format.number(parseFloat(value), '0,000');
            // },
            // width: 130,
            flex: 1,
            align: 'end',
            editor: {
                completeOnEnter: true,
                field: {
                    xtype: 'combo',
                    typeAhead: true,
                    triggerAction: 'all',
                    selectOnFocus: false,
                    bind: {
                        store: '{CurrencyStore}',
                    },
                    displayField: 'code',
                    valueField: 'id',
                    // queryMode : 'local'                
                }
            },
            renderer: 'renderCurrency'
        }
    ],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        border: false,
        items: [{
            xtype: 'button',
            margin: 5,
            text: 'Thêm mới',
            width: 110,
            iconCls: 'x-fa fa-plus',
            itemId: 'btnThemMoi'
        }]
    }]
});

