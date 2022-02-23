Ext.define('GSmartApp.view.Schedule.Plan.GridBreakPlan_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'GridBreakPlan_View',
    id: 'GridBreakPlan_View',
    IdPOrder: 0,
    controller: 'Plan_break_Controller',
    viewModel: {
        type: 'Plan_break_ViewModel'
    },
    viewConfig: {
        stripeRows: true,
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
    // features: [{
    //     ftype: 'summary',
    //     groupHeaderTpl: 'Tổng',
    //     dock: 'bottom'
    // }],
    features: [{
        id: 'group',
        ftype: 'groupingsummary',
        groupHeaderTpl: '{name}',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    bind: {
        store: '{POrder_ListGrantSKUStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'SKU',
        dataIndex: 'skucode',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },   {
        text: 'Màu',
        dataIndex: 'mauSanPham',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Cỡ',
        dataIndex: 'coSanPham',
        flex: 1
    }, {
        text: 'Số lượng',
        dataIndex: 'grantamount',
        flex: 1,
        align: 'end',
        summaryType: 'sum',
        summaryRenderer: 'renderSum',        
        renderer: function(value, metaData, record, rowIdx, colIdx, store){
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    },{
        text: 'SL tách',
        dataIndex: 'amount_break',
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                maskRe: /[0-9]/
            }
        },
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        flex: 1,
        align: 'end',
        renderer: function(value, metaData, record, rowIdx, colIdx, store){
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    }],
    dockedItems: [{
        dock:'bottom',
        layout: 'hbox',
        items:[{
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        },{
            xtype:'button',
            text: 'Xác nhận',
            margin: 5,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-check'
        },{
            flex:1
        },]
    },{
        dock: 'top',
        layout: 'hbox',
        items:[{
            flex: 1
        },{
            xtype: 'textfield',
            fieldLabel: 'Số lượng tách',
            maskRe: /[0-9]/,
            vtype: 'dollar',
            itemId: 'amount',
            margin: 1,
            bind: {
                value: '{amount}',
                readOnly: '{ishidden}'
            }
        }]
    }]
});

