Ext.define('GSmartApp.view.TongHopBaoAn.TongHopBaoAnView_Info', {
    extend: 'Ext.grid.Grid',
    xtype: 'TongHopBaoAnView_Info',
    itemId: 'TongHopBaoAnView_Info',
    // id:'TimeSheetLunch_Info',
    cls: 'TongHopBaoAnView_Info',
    reference: 'TongHopBaoAnView_Info',
    requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.plugin.Summary'
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
            text: 'Ca', 
            flex: 1,
            // width: 90,
            dataIndex: 'caName',
            align: 'center',
            // renderer: function(value, record, dataIndex, cell, column) {
            //     return value.toUpperCase();
            // },
        },
        {
            text: 'Đăng ký', 
            flex: 1,
            dataIndex: 'soDangKy',
            align: 'center',
            renderer: function(value, record, dataIndex, cell, column) {
                if(value == 0 || value == null){
                    value = '';
                }
                return value;
            },
            summary: 'sum',
            summaryRenderer: 'renderSum'
        },
        {
            text: 'Thêm', 
            flex: 1,
            dataIndex: 'soThem',
            align: 'center',
            renderer: function(value, record, dataIndex, cell, column) {
                if(value == 0 || value == null){
                    value = '';
                }
                return value;
            },
            summary: 'sum',
            summaryRenderer: 'renderSum'
        },
        
        {
            text: 'Khách', 
            flex: 1,
            dataIndex: 'soKhach',
            align: 'center',
            renderer: function(value, record, dataIndex, cell, column) {
                if(value == 0 || value == null){
                    value = '';
                }
                return value;
            },
            summary: 'sum',
            summaryRenderer: 'renderSum'
        },
        {
            text: 'Tổng', 
            flex: 1,
            dataIndex: 'soTong',
            align: 'center',
            renderer: function(value, record, dataIndex, cell, column) {
                if(value == 0 || value == null){
                    value = '';
                }
                return value;
            },
            summary: 'sum',
            summaryRenderer: 'renderSum'
        },
    ],
});