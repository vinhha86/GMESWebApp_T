Ext.define('GSmartApp.view.TimeSheetLunch.TimeSheetLunch_ListView', {
    extend: 'Ext.grid.Panel',
    xtype: 'TimeSheetLunch_ListView',
    id: 'TimeSheetLunch_ListView',
    cls: 'TimeSheetLunch_ListView',
    controller: 'TimeSheetLunch_ListViewController',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true,
        getRowClass: function (record, index) {
            if (record.get('status') == 1) {
                return 'po_offer';
            }
        }
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            // listeners: {
            //     edit: 'onEditCheckBox'
            // } 
        }
    },    
    bind: {
        store: '{TimeSheetLunchStore}'
    },
    enableColumnMove: false,
    reserveScrollbar: true,
    columns: [{
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã NV',
        dataIndex: 'personnelCode',
        width: 100,
        sortable: false,
        menuDisabled: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'personnelCodeFilter',
            itemId: 'personnelCodeFilter',
            width: 96,
            margin: 2,
            enableKeyEvents: true,
            bind: {
                value: '{personnelCodeFilterValue}'
            },
            listeners: {
                keyup: 'onPersonnelCodeFilterKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Mã đăng ký',
        dataIndex: 'register_code',
        width: 100,
        sortable: false,
        menuDisabled: true,
        hidden: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'personnelRegCodeFilter',
            itemId: 'personnelRegCodeFilter',
            width: 96,
            margin: 2,
            enableKeyEvents: true,
            bind: {
                value: '{personnelRegCodeFilterValue}'
            },
            listeners: {
                keyup: 'onPersonnelRegCodeFilterKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Họ và tên',
        dataIndex: 'personnelFullname',
        // flex: 1,
        width: 200,
        sortable: false,
        menuDisabled: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'personnelFullnameFilter',
            itemId: 'personnelFullnameFilter',
            // flex: 1,
            width: 196,
            margin: 2,
            enableKeyEvents: true,
            bind: {
                value: '{personnelFullnameFilterValue}'
            },
            listeners: {
                keyup: 'onPersonnelFullnameFilterKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Không ăn trưa',
        dataIndex: 'nolunch_shift_idlink',
        // flex: 1,
        width: 100,
        sortable: false,
        menuDisabled: true,
        // renderer: function (value, metaData, record, rowIdx, colIdx, store) {
        //     // metaData.tdAttr = 'data-qtip="' + value + '"';
        //     var viewModel = this.getViewModel();
        //     console.log(viewModel);
        //     return value;
        // },
        renderer: 'renderedKhongAnTrua',
        editor:{
            field: {
                xtype: 'combobox',
                bind:{
                    store:'{TimesheetShiftTypeOrgStore}',
                    // value: '{data.type}'
                },
                displayField: 'name',
                valueField: 'id',
                // editable: false,
                allowBlank: true,
                listeners:{
                    // change: 'onTypeChange',
                    // focusleave: 'onTypeFocusLeave'
                }
            }
        }
    },
        // {
        //     text: 'Ca 1',
        //     flex: 1,
        //     columns: [
        //         {
        //             xtype: 'checkcolumn',
        //             text: 'Đi làm',
        //             dataIndex: 'workingShift1',
        //             headerCheckbox: true,
        //             flex: 1,
        //             // width: 75,
        //             listeners: {
        //                 beforecheckchange: 'onBeforecheckchange',
        //                 checkchange: 'onCheckchange',
        //                 headerclick: 'onHeaderClick'
        //             }
        //         },
        //         {
        //             xtype: 'checkcolumn',
        //             text: 'Ăn',
        //             dataIndex: 'lunchShift1',
        //             // headerCheckbox: true,
        //             flex: 1,
        //             // width: 50,
        //             listeners: {
        //                 beforecheckchange: 'onBeforecheckchange',
        //                 checkchange: 'onCheckchange',
        //                 // headerclick: 'onHeaderClick'
        //             }
        //         }
        //     ]
        // },
        // {
        //     text: 'Ca 2',
        //     flex: 1,
        //     columns: [
        //         {
        //             xtype: 'checkcolumn',
        //             text: 'Đi làm',
        //             dataIndex: 'workingShift2',
        //             headerCheckbox: true,
        //             flex: 1,
        //             // width: 75,
        //             listeners: {
        //                 beforecheckchange: 'onBeforecheckchange',
        //                 checkchange: 'onCheckchange',
        //                 headerclick: 'onHeaderClick'
        //             }
        //         },
        //         {
        //             xtype: 'checkcolumn',
        //             text: 'Ăn',
        //             dataIndex: 'lunchShift2',
        //             // headerCheckbox: true,
        //             flex: 1,
        //             // width: 50,
        //             listeners: {
        //                 beforecheckchange: 'onBeforecheckchange',
        //                 checkchange: 'onCheckchange',
        //                 // headerclick: 'onHeaderClick'
        //             }
        //         }
        //     ]
        // },
        // {
        //     text: 'Ca 3',
        //     flex: 1,
        //     columns: [
        //         {
        //             xtype: 'checkcolumn',
        //             text: 'Đi làm',
        //             dataIndex: 'workingShift3',
        //             headerCheckbox: true,
        //             flex: 1,
        //             // width: 75,
        //             listeners: {
        //                 beforecheckchange: 'onBeforecheckchange',
        //                 checkchange: 'onCheckchange',
        //                 headerclick: 'onHeaderClick'
        //             }
        //         },
        //         {
        //             xtype: 'checkcolumn',
        //             text: 'Ăn',
        //             dataIndex: 'lunchShift3',
        //             // headerCheckbox: true,
        //             flex: 1,
        //             // width: 50,
        //             listeners: {
        //                 beforecheckchange: 'onBeforecheckchange',
        //                 checkchange: 'onCheckchange',
        //                 // headerclick: 'onHeaderClick'
        //             }
        //         }
        //     ]
        // }
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        border: false,
        items: [
            {
                xtype: 'button',
                margin: 5,
                text: 'Xác nhận',
                iconCls: 'x-fa fa-check',
                itemId: 'btnConfirm',
                // bind: {
                //     hidden: '{isBtnConfirmHidden}'
                // }
            },
            {
                xtype: 'button',
                margin: 5,
                text: 'Tự động lấy dữ liệu',
                iconCls: 'x-fa fa-sync',
                itemId: 'btnAutoGetInfo',
            },
            {
                xtype: 'button',
                margin: 5,
                text: 'Lưu',
                iconCls: 'x-fa fa-save',
                itemId: 'btnSave',
            },
            {
                xtype: 'button',
                margin: 5,
                text: 'Hủy xác nhận',
                iconCls: 'x-fa fa-backward',
                itemId: 'btnCancelApprove',
            }
        ]
    }, {
        dock: 'top',
        layout: 'hbox',
        items: [{
            xtype: 'textfield',
            itemId: 'sumCa1',
            fieldLabel: 'Ca 1',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa1}',
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa2',
            fieldLabel: 'Ca 2',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa2}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa3',
            fieldLabel: 'Ca 3',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa3}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa4',
            fieldLabel: 'Ca 4',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa4}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa5',
            fieldLabel: 'Ca 5',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa5}'
            }
        }]
    }]
});

