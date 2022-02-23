Ext.define('GSmartApp.view.TimeSheetInOut.BaoCao.BaoCaoRaVaoView', {
    extend: 'Ext.grid.Panel',
    xtype: 'BaoCaoRaVaoView',

    viewModel: {
        type: 'BaoCaoRaVaoViewModel'
    },
    bind: '{TimeSheetDailyStore}',
    controller: 'BaoCaoRaVaoViewController',
    viewConfig: {
        columnLines: true,
        rowLines: true,
        getRowClass: function (record, index) {
            if (record.data.sortvalue == 0) {
                return "po_accept";
            }
        }
    },
    plugins: {
        gridexporter: true
    },
    columns: [
        {
            text: 'STT',
            width: 50,
            dataIndex: 'stt',
            align: 'center',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                return record.data.sortvalue == 0 ? value : "";
            }
        },
        {
            text: "Mã nhân viên",
            width: 120,
            dataIndex: 'personnel_code',
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'CodeFilter',
                width: '99%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onCodeFilter',
                    buffer: 500
                }
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                return record.data.sortvalue == 0 ? value : "";
            }
        },
        {
            text: "Tên nhân viên",
            width: 150,
            dataIndex: 'fullname',
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'NameFilter',
                width: '99%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onNameFilter',
                    buffer: 500
                }
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                return record.data.sortvalue == 0 ? value : "";
            }
        },
        {
            text: "1",
            width: 50,
            dataIndex: 'day1',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "2",
            width: 50,
            dataIndex: 'day2',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "3",
            width: 50,
            dataIndex: 'day3',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "4",
            width: 50,
            dataIndex: 'day4',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "5",
            width: 50,
            dataIndex: 'day5',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "6",
            width: 50,
            dataIndex: 'day6',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "7",
            width: 50,
            dataIndex: 'day7',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "8",
            width: 50,
            dataIndex: 'day8',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "9",
            width: 50,
            dataIndex: 'day9',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "10",
            width: 50,
            dataIndex: 'day10',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "11",
            width: 50,
            dataIndex: 'day11',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "12",
            width: 50,
            dataIndex: 'day12',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "13",
            width: 50,
            dataIndex: 'day13',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "14",
            width: 50,
            dataIndex: 'day14',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "15",
            width: 50,
            dataIndex: 'day15',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "16",
            width: 50,
            dataIndex: 'day16',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "17",
            width: 50,
            dataIndex: 'day17',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "18",
            width: 50,
            dataIndex: 'day18',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "19",
            width: 50,
            dataIndex: 'day19',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "20",
            width: 50,
            dataIndex: 'day20',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "21",
            width: 50,
            dataIndex: 'day21',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "22",
            width: 50,
            dataIndex: 'day22',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "23",
            width: 50,
            dataIndex: 'day23',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "24",
            width: 50,
            dataIndex: 'day24',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "25",
            width: 50,
            dataIndex: 'day25',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "26",
            width: 50,
            dataIndex: 'day26',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "27",
            width: 50,
            dataIndex: 'day27',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "28",
            width: 50,
            dataIndex: 'day28',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "29",
            width: 50,
            dataIndex: 'day29',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "30",
            width: 50,
            dataIndex: 'day30',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        },
        {
            text: "31",
            width: 50,
            dataIndex: 'day31',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
            }
        }
    ],
    dockedItems: [
        {
            layout: 'hbox',
            dock: 'top',
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Đơn vị',
                    bind: {
                        store: '{ListOrgStore}',
                        value: '{timesheetdaily.orgid_link}'
                    },
                    displayField: 'code',
                    valueField: 'id',
                    margin: 5,
                    labelWidth: 50,
                    itemId: 'cmbDonVi',
                    width: 180
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Bộ phận',
                    bind: {
                        store: '{GrantStore}',
                        value: '{timesheetdaily.grantid_link}'
                    },
                    displayField: 'code',
                    valueField: 'id',
                    itemId: 'cmbBoPhan',
                    margin: 5,
                    labelWidth: 60,
                    width: 180
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Tháng',
                    bind: {
                        store: '{MonthStore}',
                        value: '{timesheetdaily.month}'
                    },
                    displayField: 'name',
                    valueField: 'id',
                    margin: 5,
                    labelWidth: 50,
                    width: 150
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Năm',
                    bind: {
                        store: '{YearStore}',
                        value: '{timesheetdaily.year}'
                    },
                    displayField: 'name',
                    valueField: 'id',
                    margin: 5,
                    labelWidth: 50,
                    width: 150
                },
                {
                    xtype: 'button',
                    text: 'Tìm kiếm',
                    iconCls: 'x-fa fa-filter',
                    itemId: 'btnSearch',
                    margin: 5,
                    handler: 'Search'
                },
                {
                    xtype: 'button',
                    text: 'Excel',
                    iconCls: 'x-fa fa-file-excel-o',
                    margin: 5,
                    handler: 'onExport_Excel'
                },
                {
                    xtype: 'button',
                    text: 'Tính toán dữ liệu',
                    iconCls: 'x-fa fa-calculator',
                    margin: 5,
                    handler: 'onCalculate'
                }
            ]
        }
    ]
})