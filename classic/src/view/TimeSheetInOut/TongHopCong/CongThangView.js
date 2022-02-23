Ext.define('GSmartApp.view.TimeSheetInOut.TongHopCong.CongThangView', {
    extend: 'Ext.grid.Panel',
    xtype: 'CongThangView',

    viewModel: {
        type: 'CongThangViewModel'
    },
    bind: {
        store: '{TimeSheetMonthStore}'
    },
    controller: 'CongThangViewController',
    viewConfig: {
        columnLines: true,
        rowLines: true
    },
    features: [
        {
            ftype: 'summary',
            dock: 'bottom'
        }
    ],
    plugins: {
        gridexporter: true
    },
    columns: [
        {
            text: 'STT',
            width: 50,
            xtype: 'rownumberer'
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
            summaryType: 'count',
            summaryRenderer: function (value, summaryData, dataIndex) {
                return '<div style="color:red; font-weight: bold; align: right"> Tổng: ' + Ext.util.Format.number(value, '0,000') + ' nhân viên</div>';
            }
        },
        {
            text: 'Ngày vào',
            dataIndex: 'ngayvao_congty',
            xtype: 'datecolumn',
            format: 'd-m-Y',
            width: 120
        },
        {
            text: 'Giờ công (h)',
            dataIndex: 'time_working',
            align: 'right',
            width: 70,
            summaryType: 'sum',
            summaryRenderer: function (value, summaryData, dataIndex) {
                return '<div style="color:red; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
            }
        },
        {
            text: 'Làm thêm (h)',
            dataIndex: 'time_plus',
            align: 'right',
            width: 70,
            summaryType: 'sum',
            summaryRenderer: function (value, summaryData, dataIndex) {
                return '<div style="color:red; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
            }
        },
        {
            text: 'Bổ sung (h)',
            dataIndex: 'time_over',
            align: 'right',
            width: 70,
            summaryType: 'sum',
            summaryRenderer: function (value, summaryData, dataIndex) {
                return '<div style="color:red; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
            }
        },
        {
            text: 'Chủ nhật (h)',
            dataIndex: 'time_sunday',
            align: 'right',
            width: 70,
            summaryType: 'sum',
            summaryRenderer: function (value, summaryData, dataIndex) {
                return '<div style="color:red; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
            }
        },
        {
            text: 'Tổng (h)',
            dataIndex: 'total',
            align: 'right',
            width: 70,
            summaryType: 'sum',
            summaryRenderer: function (value, summaryData, dataIndex) {
                return '<div style="color:red; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
            }
        },
        {
            text: 'Nghỉ',
            align: 'right',
            columns: [{
                text: 'Ốm',
                dataIndex: 'nghi_om',
                align: 'right',
                sortable: false,
                menuDisabled: true,
                width: 70,
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return '<div style="color:red; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
                }
            }, {
                text: 'TS',
                dataIndex: 'nghi_thaisan',
                align: 'right',
                sortable: false,
                menuDisabled: true,
                width: 70,
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return '<div style="color:red; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
                }
            }, {
                text: 'T.nạn',
                dataIndex: 'nghi_tainan',
                align: 'right',
                sortable: false,
                menuDisabled: true,
                width: 70,
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return '<div style="color:red; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
                }
            }, {
                text: 'Lễ',
                dataIndex: 'nghi_le',
                align: 'right',
                sortable: false,
                menuDisabled: true,
                width: 70,
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return '<div style="color:red; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
                }
            }, {
                text: 'Ko Lương',
                dataIndex: 'nghi_khongluong',
                align: 'right',
                sortable: false,
                menuDisabled: true,
                width: 75,
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return '<div style="color:red; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
                }
            }, {
                text: 'Phép',
                dataIndex: 'nghi_phep',
                align: 'right',
                sortable: false,
                menuDisabled: true,
                width: 70,
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return '<div style="color:red; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
                }
            }, {
                text: 'H.tập',
                dataIndex: 'nghi_hoctap',
                align: 'right',
                sortable: false,
                menuDisabled: true,
                width: 70,
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return '<div style="color:red; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
                }
            }, {
                text: 'Văn nghệ',
                dataIndex: 'nghi_vannghe',
                align: 'right',
                sortable: false,
                menuDisabled: true,
                width: 70,
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return '<div style="color:red; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
                }
            }, {
                text: 'Bù',
                dataIndex: 'nghi_bu',
                align: 'right',
                sortable: false,
                menuDisabled: true,
                width: 70,
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return '<div style="color:red; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
                }
            }, {
                text: 'Chờ việc',
                dataIndex: 'nghi_choviec',
                align: 'right',
                sortable: false,
                menuDisabled: true,
                width: 70,
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return '<div style="color:red; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
                }
            }, {
                text: 'C.tác',
                dataIndex: 'nghi_congtac',
                align: 'right',
                sortable: false,
                menuDisabled: true,
                width: 70,
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return '<div style="color:red; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
                }
            }, {
                text: 'Tự do',
                dataIndex: 'nghi_tudo',
                align: 'right',
                sortable: false,
                menuDisabled: true,
                width: 70,
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return '<div style="color:red; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
                }
            }, {
                text: 'Việc CN',
                dataIndex: 'nghi_viecrieng',
                align: 'right',
                sortable: false,
                menuDisabled: true,
                width: 70,
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return '<div style="color:red; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
                }
            }, {
                text: 'Ko phép',
                dataIndex: 'nghi_khongphep',
                align: 'right',
                sortable: false,
                menuDisabled: true,
                width: 70,
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return '<div style="color:red; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
                }
            }, {
                text: 'Cách ly',
                dataIndex: 'nghi_cachly',
                align: 'right',
                sortable: false,
                menuDisabled: true,
                width: 70,
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return '<div style="color:red; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
                }
            }]
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
                        value: '{timesheetmonth.orgid_link}'
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
                        value: '{timesheetmonth.grantid_link}',
                        hidden: true
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
                        value: '{timesheetmonth.month}'
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
                        value: '{timesheetmonth.year}'
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
                    handler: 'onExport'
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