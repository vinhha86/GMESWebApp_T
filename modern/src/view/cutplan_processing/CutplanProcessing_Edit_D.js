Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Edit_D', {
    extend: 'Ext.grid.Grid',
    xtype: 'CutplanProcessing_Edit_D',
    id: 'CutplanProcessing_Edit_D',
    // viewModel: {
    //     type: 'HandoverDetailViewModel'
    // },
    // cls: 'HandoverListModern',
    controller: 'CutplanProcessing_Edit_D_Controller',
    reference: 'CutplanProcessing_Edit_D',

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
        // store:'{cutplanProcessing.cutplanProcessingD}',
        store: '{CutplanProcessingDStore}'
    },

    columns: [
    // {
    //     text: 'Số lot',
    //     align:'right',
    //     flex: 1,
    //     dataIndex: 'lotnumber'
    // },
    // {
    //     text: 'Số cây',
    //     align:'right',
    //     flex: 1,
    //     dataIndex: 'packageid'
    // },
    {
        xtype: 'numbercolumn',
        format:'0,000.00',
        text: 'Dài cây', 
        align:'right',
        dataIndex: 'met',
        // summaryType: 'sum',
        // summaryRenderer: 'renderSum',
        flex: 1,
    },{
        xtype: 'numbercolumn',
        format:'0,000',
        text: 'Số lá', 
        align:'right',
        // summaryType: 'sum',
        // summaryRenderer: 'renderSum',
        dataIndex: 'la_vai',
        flex: 1,
    },
    {
        xtype: 'numbercolumn',
        format:'0,000.00',
        text: 'T/hao', 
        align:'right',
        dataIndex: 'tieu_hao',
        // summaryType: 'sum',
        // summaryRenderer: 'renderSum',
        flex: 1,
    },
    {
        xtype: 'numbercolumn',
        format:'0,000.00',
        text: 'Đầu tấm', 
        align:'right',
        // summaryType: 'sum',
        // summaryRenderer: 'renderSum',
        dataIndex: 'con_lai',
        flex: 1,
    },
    {
        xtype: 'numbercolumn',
        format:'0,000.00',
        text: 'P/S', 
        align:'right',
        dataIndex: 'ps',
        // summaryType: 'sum',
        // summaryRenderer: 'renderSum',
        flex: 1,
    }],

});