Ext.define('GSmartApp.view.personel.BaoCaoBaoAn.ChiTietBaoAnView', {
    extend: 'Ext.grid.Panel',
    xtype: 'ChiTietBaoAnView',
    id: 'ChiTietBaoAnView',
    controller: 'ChiTietBaoAnViewController',
    bind: {
        store: '{BaoAnStore}',
        title: '{title_detail}'
    },
    features: [{
        ftype: 'summary',
        dock: 'top'
    }],
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
        columnLines: true,
        getRowClass: function (record, index) {
            if (record.get('orgtypeid_link') == 166) {
                return 'po_offer';
            }
        }
    },
    columns: [{
        dataIndex: 'org_name',
        text: 'Tổ',
        flex: 1
    }, {
        dataIndex: 'ca1',
        text: 'Ca 1',
        width: 70,
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            return (value == null || value == 0) ? "" : value;
        }
    }, {
        dataIndex: 'ca2',
        text: 'Ca 2',
        width: 70,
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            return (value == null || value == 0) ? "" : value;
        }
    }, {
        dataIndex: 'ca3',
        text: 'Ca 3',
        width: 70,
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            return (value == null || value == 0) ? "" : value;
        }
    }, {
        dataIndex: 'ca4',
        text: 'Ca 4',
        width: 70,
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            return (value == null || value == 0) ? "" : value;
        }
    }, {
        dataIndex: 'ca5',
        text: 'Ca 5',
        width: 70,
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            return (value == null || value == 0) ? "" : value;
        }
    }]
});

