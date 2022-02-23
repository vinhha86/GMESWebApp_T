Ext.define('GSmartApp.view.handover.HandoverShareView.HandoverList', {
    extend: 'Ext.grid.Grid',
    xtype: 'HandoverList',
    id: 'HandoverList',
    // viewModel: {
    //     type: 'HandoverListViewModel'
    // },
    controller: 'HandoverListController',
    reference: 'HandoverList',
    cls: 'HandoverListModern',

    requires: [
        'Ext.grid.plugin.CellEditing'
    ],

    // height: '100%',
    // width: '100%',
    // rowNumbers: true,
    markDirty: true,

    columnLines: true,
    striped: false,

    selectable: {
        rows: false,
        cells: true
    },

    bind: {
        store:'{HandoverStore}'
    },

    columns: [{
        text: 'Mã lệnh',
        flex: 1,
        dataIndex: 'ordercode',
        renderer: function (value, record, dataIndex, cell, column ) {
            var c = record.data.status;
            if (c == 0) {
                cell.setCls('status0');
            } else if (c == 1) {
                cell.setCls('status1');
            } else if (c == 2) {
                cell.setCls('status2');
            }
            return value;
        },
        // editable: true
    }, {
        text: 'Ngày GH',
        flex: 1,
        maxWidth: 90,
        dataIndex: 'handover_date',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        // editable: true
    }, {
        text: 'Nơi nhận',
        maxWidth: 90,
        dataIndex: 'orgToName',
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
    }],

});