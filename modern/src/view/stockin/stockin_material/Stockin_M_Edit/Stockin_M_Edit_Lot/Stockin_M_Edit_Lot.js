Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit_Lot', {
    extend: 'Ext.grid.Grid',
    xtype: 'Stockin_M_Edit_Lot',
    itemId: 'Stockin_M_Edit_Lot',
    cls: 'Stockin_M_Edit_Lot',
    reference: 'Stockin_M_Edit_Lot',

    requires: [
        'Ext.grid.plugin.CellEditing'
    ],
    // height: '100%',
    // width: '100%',
    markDirty: false,
    columnLines: true,
    striped: false,
    variableHeights: true,
    
    plugins: {
        gridcellediting: {
            selectOnEdit: true
        },
    },

    // selectable: {
    //     rows: true,
    //     cells: false
    // },

    selectable:{
        mode: 'single',
        rows: true,
        checkbox: true,
        checkboxColumnIndex: 0,
        // checkboxDefaults: {
        //     xtype: 'selectioncolumn',
        //     text: null,
        //     width: 30
        // },
        checkboxSelect: true,
        // checkOnly : true,
    },

    bind: {
        store: '{StockinLotStore}'
    },

    columns: [
        {
            text: 'Số Lot', 
            flex: 1,
            // width: 90,
            dataIndex: 'lot_number',
            align: 'center',
            renderer: function(value, record, dataIndex, cell, column) {
                if(value == null) value = '';
                return value.toUpperCase();
            },
        },
        {
            text: 'Kiểm lot', 
            flex: 1,
            // width: 85,
            dataIndex: 'totalpackage',
            align: 'center',
            renderer: function(value, record, dataIndex, cell, column) {
                if(value == null) value = 0;
                var totalpackagecheck = record.get('totalpackagecheck') == null ? 0 : record.get('totalpackagecheck');
                var totalpackage = record.get('totalpackage') == null ? 0 : record.get('totalpackage');
                var totalpackagepklist = record.get('totalpackagepklist') == null ? 0 : record.get('totalpackagepklist');
                if (totalpackage == totalpackagecheck || totalpackage == totalpackagepklist) {
                    cell.setCls('cellGreen');
                } else if (totalpackage < totalpackagecheck || totalpackage < totalpackagepklist) {
                    cell.setCls('cellYellow');
                } else{
                    cell.setCls('cellRed');
                }
                
                return totalpackage + ' / ' + totalpackagecheck + ' / ' + totalpackagepklist;
            },
        },
        {
            text: 'Kiểm dài(M)', 
            flex: 1,
            dataIndex: 'totalmet',
            align: 'center',
            renderer: function(value, record, dataIndex, cell, column) {
                if(value == null) value = 0;
                var totalmetcheck = record.get('totalmetcheck') == null ? 0 : record.get('totalmetcheck');
                var totalmet = record.get('totalmet') == null ? 0 : record.get('totalmet');
                
                if (totalmet == totalmetcheck) {
                    cell.setCls('cellGreen');
                } else if (totalmet < totalmetcheck) {
                    cell.setCls('cellYellow');
                } else{
                    cell.setCls('cellRed');
                }

                totalmetcheck = Ext.util.Format.number(totalmetcheck, '0.00');
                totalmet = Ext.util.Format.number(totalmet, '0.00');
                return totalmet + ' / ' + totalmetcheck;
                // return Ext.util.Format.number(totalmet, '0.00') + ' / ' + Ext.util.Format.number(totalmetcheck, '0.00');
            },
            bind: {
                hidden: '{isMetColumnHidden}',
            },
        },
        {
            text: 'Kiểm dài(Y)', 
            flex: 1,
            dataIndex: 'totalyds',
            align: 'center',
            renderer: function(value, record, dataIndex, cell, column) {
                if(value == null) value = 0;
                var totalydscheck = record.get('totalydscheck') == null ? 0 : record.get('totalydscheck');
                var totalyds = record.get('totalyds') == null ? 0 : record.get('totalyds');

                if (totalyds == totalydscheck) {
                    cell.setCls('cellGreen');
                } else if (totalyds < totalydscheck) {
                    cell.setCls('cellYellow');
                } else{
                    cell.setCls('cellRed');
                }
                
                totalydscheck = Ext.util.Format.number(totalydscheck, '0.00');
                totalyds = Ext.util.Format.number(totalyds, '0.00');
                return totalyds + ' / ' + totalydscheck;
                // return Ext.util.Format.number(totalyds, '0.00') + ' / ' + Ext.util.Format.number(totalydscheck, '0.00');
            },
            bind: {
                hidden: '{isYdsColumnHidden}',
            },
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
                    cell.setCls('cellWhite');
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
                    cell.setCls('cellWhite');
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