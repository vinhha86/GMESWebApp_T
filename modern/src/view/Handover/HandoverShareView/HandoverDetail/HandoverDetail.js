Ext.define('GSmartApp.view.handover.HandoverShareView.HandoverDetail.HandoverDetail', {
    extend: 'Ext.grid.Grid',
    xtype: 'HandoverDetail',
    id: 'HandoverDetail',
    // viewModel: {
    //     type: 'HandoverDetailViewModel'
    // },
    cls: 'HandoverListModern',
    controller: 'HandoverDetailController',
    reference: 'HandoverDetail',

    requires: [
        'Ext.grid.plugin.CellEditing'
    ],
    // height: '100%',
    // width: '100%',
    markDirty: false,
    columnLines: true,
    striped: false,

    plugins: {
        gridcellediting: {
            selectOnEdit: true
        }
    },

    selectable: {
        rows: false,
        cells: true
    },

    bind: {
        store:'{HandoverSkuStore}'
    },

    columns: [{
    //     text: 'SKU',
    //     flex: 1,
    //     dataIndex: 'skuCode',
    //     // editable: true
    // }, {
        text: 'Màu',
        flex: 1,
        dataIndex: 'skuColor',
        // editable: true
    }, {
        text: 'Cỡ',
        maxWidth: 80,
        dataIndex: 'skuSize',
        // editable: true
    }, {
        text: 'SL giao',
        flex: 1,
        maxWidth: 80,
        dataIndex: 'totalpackage',
        align: 'right',
        renderer: function(value){
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        // editor: {
        //     allowBlur: false,
        //     field: {
        //         xtype: 'numberfield'
        //     }
        // }
    }, {
        text: 'SL nhận',
        flex: 1,
        maxWidth: 85,
        dataIndex: 'totalpackagecheck',
        align: 'right',
        renderer: function(value){
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        // editor: {
        //     allowBlur: false,
        //     field: {
        //         xtype: 'numberfield'
        //     }
        // }
    }],

});