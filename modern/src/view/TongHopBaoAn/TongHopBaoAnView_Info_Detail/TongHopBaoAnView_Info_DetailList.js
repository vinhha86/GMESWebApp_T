Ext.define('GSmartApp.view.TongHopBaoAn.TongHopBaoAnView_InfoDetail.TongHopBaoAnView_Info_DetailList', {
    extend: 'Ext.grid.Grid',
    xtype: 'TongHopBaoAnView_Info_DetailList',
    itemId: 'TongHopBaoAnView_Info_DetailList',
    // id:'TimeSheetLunch_Info',
    cls: 'TongHopBaoAnView_Info_DetailList',
    reference: 'TongHopBaoAnView_Info_DetailList',
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
            text: 'Tổ', 
            flex: 1,
            // width: 90,
            dataIndex: 'orgCode',
            align: 'center',
            renderer: function(value, record, dataIndex, cell, column) {
                if(record.get('orgType') == 166){
                    cell.setStyle('background: lightblue;');
                }else{
                    cell.setStyle('background: white;');
                }
                return value;
            },
        },
        {
            text: 'Đăng ký', 
            flex: 1,
            dataIndex: 'soDangKy',
            align: 'center',
            summary: 'sum',
            summaryRenderer: 'renderSum',
            renderer: function(value, record, dataIndex, cell, column) {
                if(record.get('orgType') == 166){
                    cell.setStyle('background: lightblue;');
                }else{
                    cell.setStyle('background: white;');
                }
                if(value == 0 || value == null){
                    value = '';
                }
                return value;
            },
        },
        {
            text: 'Thêm', 
            flex: 1,
            dataIndex: 'soThem',
            align: 'center',
            summary: 'sum',
            summaryRenderer: 'renderSum',
            renderer: function(value, record, dataIndex, cell, column) {
                if(record.get('orgType') == 166){
                    cell.setStyle('background: lightblue;');
                }else{
                    cell.setStyle('background: white;');
                }
                if(value == 0 || value == null){
                    value = '';
                }
                return value;
            },
        },
        
        {
            text: 'Tổng', 
            flex: 1,
            dataIndex: 'soTong',
            align: 'center',
            summary: 'sum',
            summaryRenderer: 'renderSum',
            renderer: function(value, record, dataIndex, cell, column) {
                if(record.get('orgType') == 166){
                    cell.setStyle('background: lightblue;');
                }else{
                    cell.setStyle('background: white;');
                }
                if(value == 0 || value == null){
                    value = '';
                }
                return value;
            },
        },
    ],
});