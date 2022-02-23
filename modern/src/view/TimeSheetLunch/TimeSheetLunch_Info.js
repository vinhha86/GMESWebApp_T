Ext.define('GSmartApp.view.TimeSheetLunch.TimeSheetLunch_Info', {
    extend: 'Ext.grid.Grid',
    xtype: 'TimeSheetLunch_Info',
    itemId: 'TimeSheetLunch_Info',
    // id:'TimeSheetLunch_Info',
    cls: 'TimeSheetLunch_Info',
    reference: 'TimeSheetLunch_Info',
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
    },

    selectable: {
        rows: true,
        cells: false
    },

    bind: {
        store: '{TimeSheetLunchStore}'
    },
    plugins: {
        gridsummaryrow: true,
    },
    columns: [
        {
            text: 'Tổ', 
            flex: 1,
            // width: 90,
            dataIndex: 'orgCode',
            align: 'center',
            // renderer: function(value, record, dataIndex, cell, column) {
            //     return value.toUpperCase();
            // },
        },
        {
            text: 'Ca 1', 
            flex: 1,
            dataIndex: 'sumCa1',
            align: 'center',
            summary: 'sum',
            summaryRenderer: 'renderSum'
        },
        {
            text: 'Ca 2', 
            flex: 1,
            dataIndex: 'sumCa2',
            align: 'center',
            summary: 'sum',
            summaryRenderer: 'renderSum'
        },
        {
            text: 'Ca 3', 
            flex: 1,
            dataIndex: 'sumCa3',
            align: 'center',
            summary: 'sum',
            summaryRenderer: 'renderSum'
        },
        {
            text: 'Ca 4', 
            flex: 1,
            dataIndex: 'sumCa4',
            align: 'center',
            summary: 'sum',
            summaryRenderer: 'renderSum'
        },
    ],
});