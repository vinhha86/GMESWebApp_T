Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit_Pkl_Recheck', {
    extend: 'Ext.grid.Grid',
    xtype: 'Stockin_M_Edit_Pkl_Recheck',
    itemId: 'Stockin_M_Edit_Pkl_Recheck',
    cls: 'Stockin_M_Edit_Pkl_Recheck',
    // viewModel: {
    //     type: 'HandoverDetailViewModel'
    // },
    // controller: 'Stockin_M_Edit_D_Controller',
    reference: 'Stockin_M_Edit_Pkl_Recheck',

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
        //             commit: 'onRemovePklRecheck'
        //         },
        //     ]
        // }
    },

    selectable: {
        rows: true,
        cells: false
    },

    bind: {
        store: '{StockinPklRecheckStore}'
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
        flex: 1,
        // width: 90,
        dataIndex: 'lotnumber',
        align: 'center',
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
            var met_check = record.get('met_check') == null ? 0 : record.get('met_check');
            var met_origin = record.get('met_origin') == null ? 0 : record.get('met_origin');
            
            if (met_origin == met_check) {
                cell.setCls('cellGreen');
            } else if (met_origin < met_check) {
                cell.setCls('cellYellow');
            } else{
                cell.setCls('cellRed');
            }
            
            met_check = Ext.util.Format.number(met_check, '0.00');
            met_origin = Ext.util.Format.number(met_origin, '0.00');
            return met_origin + ' / ' + met_check;
        },
        bind: {
            hidden: '{isMetColumnHidden}',
        }
    },
    {
        text: 'Kiểm dài(Y)', 
        flex: 1,
        dataIndex: 'ydscheck',
        align: 'center',
        renderer: function(value, record, dataIndex, cell, column) {
            if(value == null) value = 0;
            var ydscheck = record.get('ydscheck') == null ? 0 : record.get('ydscheck');
            var ydsorigin = record.get('ydsorigin') == null ? 0 : record.get('ydsorigin');
            
            if (ydsorigin == ydscheck) {
                cell.setCls('cellGreen');
            } else if (ydsorigin < ydscheck) {
                cell.setCls('cellYellow');
            } else{
                cell.setCls('cellRed');
            }
            
            ydscheck = Ext.util.Format.number(ydscheck, '0.00');
            ydsorigin = Ext.util.Format.number(ydsorigin, '0.00');
            return ydsorigin + ' / ' + ydscheck;
        },
        bind: {
            hidden: '{isYdsColumnHidden}',
        }
    },
    {
        text: 'Kiểm cân', 
        flex: 1,
        dataIndex: 'grossweight_check',
        align: 'center',
        renderer: function(value, record, dataIndex, cell, column) {
            if(value == null) value = 0;
            var grossweight_check = record.get('grossweight_check') == null ? 0 : record.get('grossweight_check');
            var grossweight = record.get('grossweight') == null ? 0 : record.get('grossweight');
            if (grossweight == grossweight_check) {
                cell.setCls('cellGreen');
            } else if (grossweight < grossweight_check) {
                cell.setCls('cellYellow');
            } else{
                cell.setCls('cellRed');
            }
            
            return grossweight + ' / ' + grossweight_check;
        },
        bind: {
            hidden: '{isKgColumnHidden}',
        },
    },
    {
        text: 'Kiểm lbs', 
        flex: 1,
        dataIndex: 'grossweight_lbs_check',
        align: 'center',
        renderer: function(value, record, dataIndex, cell, column) {
            if(value == null) value = 0;
            var grossweight_lbs_check = record.get('grossweight_lbs_check') == null ? 0 : record.get('grossweight_lbs_check');
            var grossweight_lbs = record.get('grossweight_lbs') == null ? 0 : record.get('grossweight_lbs');
            if (grossweight_lbs == grossweight_lbs_check) {
                cell.setCls('cellGreen');
            } else if (grossweight_lbs < grossweight_lbs_check) {
                cell.setCls('cellYellow');
            } else{
                cell.setCls('cellRed');
            }
            
            return grossweight_lbs + ' / ' + grossweight_lbs_check;
        },
        bind: {
            hidden: '{isLbsColumnHidden}',
        },
    },
    ],
});