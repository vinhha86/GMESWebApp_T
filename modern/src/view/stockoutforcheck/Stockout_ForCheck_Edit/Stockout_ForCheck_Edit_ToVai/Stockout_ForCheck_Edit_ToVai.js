Ext.define('GSmartApp.view.stockoutforcheck.Stockout_ForCheck_Edit_ToVai', {
    extend: 'Ext.grid.Grid',
    xtype: 'Stockout_ForCheck_Edit_ToVai',
    itemId: 'Stockout_ForCheck_Edit_ToVai',
    cls: 'Stockout_ForCheck_Edit_ToVai',
    // viewModel: {
    //     type: 'HandoverDetailViewModel'
    // },
    // controller: 'Stockin_M_Edit_D_Controller',
    reference: 'Stockout_ForCheck_Edit_ToVai',

    requires: [
        'Ext.grid.plugin.CellEditing'
    ],
    // height: '100%',
    // width: '100%',
    markDirty: true,
    columnLines: true,
    striped: false,
    variableHeights: true,
    width: '100%',

    plugins: {
        gridcellediting: {
            selectOnEdit: true
        },
        // listswiper: {
        //     defaults: {
        //         width: 96
        //     },
        //     left: [
        //         {
        //             iconCls: 'x-fa fa-arrow-left',
        //             ui: 'alt action',
        //             commit: 'onRemovePkl'
        //         },
        //     ]
        // }
    },

    selectable: {
        rows: true,
        cells: false
    },

    bind: {
        // store: '{Stockout_order_pkl_Store}'
        store: '{WarehouseCheckStore}'
    },

    columns: [
    // {
    //     text: '',
    //     width: 30,
    //     xtype: 'rownumberer',
    //     align: 'center'
    // },
    {
        text: 'Số Lot', 
        // flex: 1,
        width: 90,
        dataIndex: 'lotnumber',
        renderer: function(value, record, dataIndex, cell, column) {
            return value.toUpperCase();
        },
    },
    {
        text: 'Số cây', 
        // flex: 1,
        width: 75,
        dataIndex: 'packageid',
        align: 'center',
    },
    {
        text: 'Kiểm dài(M)', 
        flex: 1,
        dataIndex: 'met_check',
        align: 'center',
        renderer: function(value, record, dataIndex, cell, column) {
            if(value == null) value = 0;
            var warehouse_check_met_check = record.get('warehouse_check_met_check') == null ? 0 : record.get('warehouse_check_met_check');
            var met_check = record.get('met_check') == null ? 0 : record.get('met_check');
            var met_origin = record.get('met_origin') == null ? 0 : record.get('met_origin');
            // if (metorigin == metcheck) {
            //     cell.setCls('cellGreen');
            // } else if (metorigin < metcheck) {
            //     cell.setCls('cellYellow');
            // } else{
            //     cell.setCls('cellRed');
            // }
            
            // return metorigin + ' / ' + metcheck;
            warehouse_check_met_check = Ext.util.Format.number(warehouse_check_met_check, '0.00');
            met_check = Ext.util.Format.number(met_check, '0.00');
            met_origin = Ext.util.Format.number(met_origin, '0.00');
            return met_check;
        },
        // bind: {
        //     hidden: '{isMetColumnHidden}',
        // }
    },
    // {
    //     text: 'Kiểm dài(Y)', 
    //     flex: 1,
    //     dataIndex: 'ydscheck',
    //     align: 'center',
    //     renderer: function(value, record, dataIndex, cell, column) {
    //         if(value == null) value = 0;
    //         var yds_check = record.get('yds_check') == null ? 0 : record.get('yds_check');
    //         var yds_origin = record.get('yds_origin') == null ? 0 : record.get('yds_origin');
    //         // if (ydsorigin == ydscheck) {
    //         //     cell.setCls('cellGreen');
    //         // } else if (ydsorigin < ydscheck) {
    //         //     cell.setCls('cellYellow');
    //         // } else{
    //         //     cell.setCls('cellRed');
    //         // }
            
    //         // return ydsorigin + ' / ' + ydscheck;
    //         yds_check = Ext.util.Format.number(yds_check, '0.00');
    //         yds_origin = Ext.util.Format.number(yds_origin, '0.00');
    //         return yds_check;
    //     },
    //     bind: {
    //         hidden: '{isYdsColumnHidden}',
    //     }
    // },
    {
        text: 'Kiểm khổ(cm)', 
        flex: 1,
        dataIndex: 'width_check',
        align: 'center',
        renderer: function(value, record, dataIndex, cell, column) {
            if(value == null) value = 0;
            var warehouse_check_width_check = record.get('warehouse_check_width_check') == null ? 0 : record.get('warehouse_check_width_check');
            var width_check = record.get('width_check') == null ? 0 : record.get('width_check');
            var width_met = record.get('width_met') == null ? 0 : record.get('width_met');
            // if (width_met == width_met_check) {
            //     cell.setCls('cellGreen');
            // } else if (width_met < width_met_check) {
            //     cell.setCls('cellYellow');
            // } else{
            //     cell.setCls('cellRed');
            // }
            
            // return width_met + ' / ' + width_met_check;
            return width_check * 100;
        },
        bind: {
            // hidden: '{isMetColumnHidden}',
        },
    },
    ],
});