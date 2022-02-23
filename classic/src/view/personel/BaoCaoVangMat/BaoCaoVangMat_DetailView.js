Ext.define('GSmartApp.view.TimeSheetAbsence.BaoCaoVangMat_DetailView', {
    extend: 'Ext.grid.Panel',
    xtype: 'BaoCaoVangMat_DetailView',
    controller: 'BaoCaoVangMat_DetailViewController',
    reference: 'BaoCaoVangMat_DetailView',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{TimeSheetAbsenceStore}',
        title: '{title_detail}'
    },
    features: [{
        ftype: 'groupingsummary',
        groupHeaderTpl: '{name}',
        startCollapsed: true,
        collapseTip: "",
        expandTip: ""
    },
    {
        ftype: 'summary',
        dock: 'bottom'
    }],
    columns: [
        {
            text: 'Đơn vị',
            dataIndex: 'personnelOrgname',
            width: 100,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            summaryType: 'count',
            summaryRenderer: 'renderSum'
        }, {
            text: 'Mã NV',
            dataIndex: 'personnelCode',
            width: 80,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        }, {
            text: 'Họ tên',
            dataIndex: 'personnelFullname',
            width: 150,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        }, {
            text: 'Từ ngày',
            dataIndex: 'absencedate_from',
            // flex: 1,
            width: 130,
            align: 'center',
            renderer: Ext.util.Format.dateRenderer('d/m/Y H:i')
        }, {
            text: 'Đến ngày',
            dataIndex: 'absencedate_to',
            // flex: 1,
            width: 130,
            align: 'center',
            renderer: Ext.util.Format.dateRenderer('d/m/Y H:i')
        }, {
            text: 'Loại nghỉ',
            dataIndex: 'timesheetAbsenceType',
            width: 170,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        }, {
            text: 'Lý do',
            dataIndex: 'absence_reason',
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        }]
});

