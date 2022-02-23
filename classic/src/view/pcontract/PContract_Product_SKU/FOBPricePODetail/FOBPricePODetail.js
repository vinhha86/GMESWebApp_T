Ext.define('GSmartApp.view.pcontract.FOBPricePODetail', {
    extend: 'Ext.grid.Panel',
    xtype: 'FOBPricePODetail',
    id: 'FOBPricePODetail',
    viewModel: {
        type: 'FOBPricePODetailViewModel'
    },
    controller: 'FOBPricePODetailController',
    reference: 'FOBPricePODetail',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{FOBPricePODetailStore}'
    },
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name}'
    }],
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onPriceDItemEdit',
                beforeedit: 'onPriceDItemBeforeEdit'
            }             
        }
    },
    columns: [
    {
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, 
    {
        text: 'Dải cỡ',
        dataIndex: 'sizesetname',
        width: 100,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Tên',
        dataIndex: 'fobprice_name',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'ĐM',
        align: 'end',
        dataIndex: 'quota',
        width: 100,
        xtype: 'numbercolumn',
        format: '0.000',
        editor:{
            xtype:'textfield',
            maskRe: /[0-9.]/,
            // maskRe: /^0$|^[1-9]\d*$|^\.\d+$|^0\.\d*$|^[1-9]\d*\.\d*$/,
            selectOnFocus: true
        },
        renderer: function (value, metaData, record) {
            if(value ==0) return "";
            metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.000') + '"';
            return Ext.util.Format.number(value, '0,000.000');
        }
    },
    {
        text: 'ĐVT',
        dataIndex: 'unitid_link',
        width: 100,
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'combo',
                typeAhead: true,
                triggerAction: 'all',
                selectOnFocus: false,
                bind: {
                    store: '{UnitStore}',
                    // value: '{unitid_link}'
                },
                displayField: 'code',
                valueField: 'id',
                queryMode : 'local'                
            }
        },
        renderer: 'renderUnit'
    },
    {
        text: 'Đơn giá',
        dataIndex: 'unitprice',
        width: 100,
        xtype: 'numbercolumn',
        format: '0.000',
        editor:{
            xtype:'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        renderer: function (value, metaData, record) {
            if(value ==0) return "";
            metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.000') + '"';
            return Ext.util.Format.number(value, '0,000.000');
        }
    },
    {
        text: 'Giá chào',
        dataIndex: 'price',
        width: 100,
        xtype: 'numbercolumn',
        format: '0.000',
        renderer: function (value, metaData, record) {
            if(value ==0) return "";
            metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.000') + '"';
            return Ext.util.Format.number(value, '0,000.000');
        }
    },
    {
        text: 'Loại tiền',
        dataIndex: 'currencyName',
        width: 100,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
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
            iconCls: 'x-fa fa-window-close',
            formBind: false
        },{
            xtype:'button',
            text: 'Thêm giá FOB',
            margin: 3,
            itemId:'btnAddFOB',
            iconCls: 'x-fa fa-plus',
            formBind: false
        },{
            flex:1,
            border: false
        }]
    }]
});

