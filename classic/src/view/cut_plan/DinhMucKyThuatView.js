Ext.define('GSmartApp.view.cut_plan.DinhMucKyThuatView', {
    extend: 'Ext.grid.Panel',
    xtype: 'DinhMucKyThuatView',
    id: 'DinhMucKyThuatView',
    controller: 'DinhMucKyThuatViewController',
    bind: {
        store: '{POrderBom2Store}'
    },
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    columns: [{
        text: 'Mã NPL',
        dataIndex: 'materialCode',
        width: 120,
        sortable: false,
        menuDisabled: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        }
    }, {
        text: 'Màu SP',
        dataIndex: 'color_name',
        width: 150,
        sortable: false,
        menuDisabled: true,
    }, {
        text: 'Nguyên phụ liệu',
        dataIndex: 'materialName',
        width: 150,
        sortable: false,
        menuDisabled: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        }
    }, {
        text: 'TP vải',
        dataIndex: 'thanhPhanVai',
        width: 200,
        sortable: false,
        menuDisabled: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        }
    }, {
        text: 'Tiêu hao',
        dataIndex: 'lost_ratio',
        width: 70,
        sortable: false,
        menuDisabled: true,
        xtype: 'numbercolumn',
        format: '0.000'
    }]
})