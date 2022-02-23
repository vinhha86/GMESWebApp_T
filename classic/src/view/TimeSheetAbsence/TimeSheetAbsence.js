Ext.define('GSmartApp.view.TimeSheetAbsence.TimeSheetAbsence', {
    extend: 'Ext.grid.Panel',
    xtype: 'TimeSheetAbsence',
    id: 'TimeSheetAbsence',
    viewModel: {
        type: 'TimeSheetAbsenceViewModel'
    },
    controller: 'TimeSheetAbsenceController',
    reference: 'TimeSheetAbsence',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    features: [{
        ftype: 'groupingsummary',
        groupHeaderTpl: '{name}',
        collapseTip: "",
        expandTip: ""
    }, {
        ftype: 'summary',
        dock: 'bottom'
    }],
    bind: {
        store: '{TimeSheetAbsenceStore}'
    },
    columns: [
        {
            xtype: 'actioncolumn',
            width: 50,
            menuDisabled: true,
            sortable: false,
            align: 'center',
            items: [{
                iconCls: 'x-fa fas fa-edit',
                tooltip: "Chi tiết",
                handler: 'onCapNhat',
            }, {
                iconCls: 'x-fa fas fa-trash',
                tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
                handler: 'onXoa',
            }]
        }, {
            text: 'Đơn vị',
            dataIndex: 'personnelOrgManagename',
            width: 100,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            summaryType: 'count', summaryRenderer: 'renderSum'
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
            // width: 120,
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        }, {
            text: 'Tổ',
            dataIndex: 'personnelOrgname',
            width: 80,
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
            width: 100,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        }, {
            text: 'Người xác nhận',
            dataIndex: 'userApprove',
            width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        }, {
            text: 'Ngày xác nhận',
            dataIndex: 'timeapprove',
            //  flex: 1,
            width: 130,
            align: 'center',
            renderer: Ext.util.Format.dateRenderer('d/m/Y H:m')
        }],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        border: false,
        items: [{
            xtype: 'button',
            margin: '5 1 5 1',
            text: 'Thêm mới',
            width: 105,
            iconCls: 'x-fa fa-plus',
            itemId: 'btnThemMoi',
        }, {
            xtype: 'combo',
            labelWidth: 0,
            emptyText: 'Đơn vị',
            bind: {
                store: '{ListOrgStore}'

            },
            valueField: 'id',
            displayField: 'name',
            itemId: 'orgFactoryList',
            queryMode: 'local',
            anyMatch: true,
            margin: '5 1 5 0',
            width: 120
        }, {
            xtype: 'textfield',
            labelWidth: 0,
            margin: '5 1 5 0',
            emptyText: "Mã nhân viên",
            itemId: 'personnelCode',
            width: 120
        }, {
            xtype: 'textfield',
            labelWidth: 0,
            margin: '5 1 5 0',
            emptyText: "Họ tên",
            itemId: 'personnelName',
            width: 140
        }, {
            xtype: 'datefield',
            labelWidth: 0,
            fieldLabel: 'Từ:',
            emptyText: 'Từ ngày',
            labelWidth: 30,
            itemId: 'datefrom',
            reference: 'datefrom',
            format: 'd/m/Y',
            margin: '5 1 5 0',
            width: 170,
            bind: {
                value: '{timesheetabsence.fromdate}',
            },
        }, {
            xtype: 'datefield',
            labelWidth: 0,
            fieldLabel: 'Đến:',
            labelWidth: 40,
            emptyText: 'Đến ngày',
            itemId: 'dateto',
            reference: 'dateto',
            format: 'd/m/Y',
            margin: '5 1 5 0',
            width: 170,
            bind: {
                value: '{timesheetabsence.todate}',
            },
        }, {
            xtype: 'combo',
            labelWidth: 0,
            emptyText: 'Loại nghỉ',
            bind: {
                store: '{TimeSheetAbsenceTypeStore}'
            },
            valueField: 'id',
            displayField: 'name',
            itemId: 'timeSheetAbsenceTypeList',
            queryMode: 'local',
            anyMatch: true,
            margin: '5 1 5 0',
            width: 150
        }, {
            xtype: 'button',
            margin: '5 1 5 1',
            // text: 'Tìm kiếm',
            iconCls: 'x-fa fa-search',
            itemId: 'btnTimKiem'
        }]
    }]
});

