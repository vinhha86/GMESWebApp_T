Ext.define('GSmartApp.view.personel.Personnel_ListView', {
    extend: 'Ext.grid.Panel',
    xtype: 'Personnel_ListView',
    id: 'Personnel_ListView',
    controller: 'Personnel_ListView_Controller',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{Personnel_Store}'
    },
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        checkOnly: true
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [
            {
                iconCls: 'x-fa fas fa-edit',
                handler: 'onEdit'
            },
        ]
    }, {
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Họ và tên',
        dataIndex: 'fullname',
       // flex: 1,
       width: 150,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'personnel_name',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onpersonnel_name',
                buffer: 500
            }
        },
        summaryType: 'count',
        summaryRenderer: function (value) {
            if (null == value) value = 0;
            return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + ' nhân viên</div>';
        }
    }, {
        text: 'Mã NV',
        dataIndex: 'code',
        width: 100,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'personnel_code',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onpersonnel_code',
                buffer: 500
            }
        }
    }, {
        text: 'Số CMT',
        dataIndex: 'idnumber',
        width: 80,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'personnel_cmt',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onpersonnel_cmt',
                buffer: 500
            }
        }
    },
  
    {

        text: 'Phòng ban', dataIndex: 'orgname', width: 120,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        },
        items: {
            xtype: 'combobox',
            width: '98%',
            flex: 1,
            margin: 2,
            editable: false,
            readOnly: false,
            displayField: 'name',
            valueField: 'id',
            queryMode: 'local',
            anyMatch: true,
            listeners: {
                select: 'onFilterOrgnameFilter',
            },
            bind: {
                store: '{ListOrgStore}',
                value: '{orgnameComboValue}',
            },
            matchFieldWidth: false,
            listConfig: {
                listeners: {
                    beforeshow: function (picker) {
                        picker.minWidth = picker.up('combobox').getSize().width;
                    }
                }
            },
            triggers: {
                clear: {
                    cls: 'x-form-clear-trigger',
                    weight: 1,
                    handler: 'onOrgNameComboValueTriggerClick',
                }
            }
        }
    },
    {
        text: 'Ca MĐ',
        dataIndex: 'shiftName',
        width: 80,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'personnel_shiftName',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onpersonnel_shiftName',
                buffer: 500
            }
        }
    },
    {
        text: 'Chức vụ',
        dataIndex: 'position',
      //  flex: 1,
        width:270,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            value = value == null ? "" : value;
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'combobox',
            width: '98%',
            flex: 1,
            margin: 2,
            editable: false,
            readOnly: false,
            displayField: 'name',
            valueField: 'id',
            queryMode: 'local',
            anyMatch: true,
            listeners: {
                select: 'onPositionFilter',
            },
            bind: {
                store: '{Personnel_Position_Store}',
                value: '{positionid_link}',
            },
            matchFieldWidth: false,
            listConfig: {
                listeners: {
                    beforeshow: function (picker) {
                        picker.minWidth = picker.up('combobox').getSize().width;
                    }
                }
            },
            triggers: {
                clear: {
                    cls: 'x-form-clear-trigger',
                    weight: 1,
                    handler: 'onPositionTriggerClick',
                }
            }
        }
    },
    {
        text: 'Ngày đi làm',
        dataIndex: 'date_startworking',
        width: 80,
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
    },  {
        text: 'Ngày nghỉ việc',
        dataIndex: 'date_endworking',
        width: 80,
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
    }

    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        border: false,
        items: [{
            xtype: 'button',
            margin: 1,
            text: 'Thêm mới',
            iconCls: 'x-fa fa-plus',
            itemId: 'btnThemMoi_Personnel',
        }, {
            xtype: 'button',
            margin: 1,
            text: 'Print',
            iconCls: 'x-fa fa-print',
            itemId: 'btnPrint_Personnel',
        }, {
            xtype: 'filefield',
            buttonOnly: true,
            hidden: true,
            itemId: 'fileUpload',
            width: 35,
            height: 32,
            margin: 3
        },
        {
            xtype: 'button',
            margin: 1,
            text: 'Upload',
            iconCls: 'x-fa fa-upload',
            itemId: 'splbtn_Upload',
            tooltip: 'Upload nhân viên',
        },
        {
            xtype: 'button',
            margin: 1,
            text: 'Tải file mẫu',
            iconCls: 'x-fa fa-download',
            itemId: 'splbtn_Download',
            tooltip: 'Download file nhân viên',
        },
        {
            xtype: 'button',
            margin: 1,
            text: 'Ca MĐ',
            iconCls: 'x-fa fa-plus',
            itemId: 'splbtn_ThemCa',
            tooltip: 'Chọn ca làm việc mặc định',
        }

            , '->',
            {
                xtype: 'combo',
                labelWidth: 30,
                fieldLabel: 'TT',
                labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:11px;',
                displayField: 'name',
                valueField: 'id',
                width: 200,
                margin: 1,
                itemId: 'cmbTinhTrang',
                bind: {
                    value: '{personnel.status}',
                    store: '{PersonnelStatus_Store}'
                },
                triggers: {
                    clear: {
                        cls: 'x-form-clear-trigger',
                        weight: 1,
                        handler: 'onTrangThaiTriggerClick',
                    }
                }
            },
        {
            xtype: 'combo',
            labelWidth: 50,
            fieldLabel: 'Loại NV',
            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
            fieldStyle: 'font-size:11px;',
            displayField: 'name',
            valueField: 'id',
            width: 200,
            margin: 1,
            itemId: 'cmbLoaiNV',
            bind: {
                value: '{personnel.personnel_typeid_link}',
                store: '{PersonnelTypeStore}'
            },
            triggers: {
                clear: {
                    cls: 'x-form-clear-trigger',
                    weight: 1,
                    handler: 'onLoaiNVTriggerClick',
                }
            }
        }
        ]
    }
    ]
});

