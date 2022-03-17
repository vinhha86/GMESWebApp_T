Ext.define('GSmartApp.view.giatla.giatLaView', {
    extend: 'Ext.grid.Panel',
    xtype: 'GiatLaView',
    id: 'lsgiatla',
    viewModel: {
        type: 'giatLaViewModel'
    },
    controller: 'giatLaViewController',
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'SINGLE'
    // },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit',
            }
        }
    },
    reference: 'giatLaView',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{OrgStore}'
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 50,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            iconCls: 'x-fa fas fa-edit',
            tooltip: GSmartApp.Locales.btn_sua[GSmartApp.Locales.currentLocale],
            handler: 'onCapNhat'
        }, {
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    }, 
    {
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Tên viết tắt',
        dataIndex: 'code',
        width: 120,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'vendorCodeFilter',
            width: 116,
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onVendorCodeFilterKeyup',
                buffer: 500
            }
        },
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                allowBlank: false,
                blankText:'Không được để trống mã thị trường',
                itemId:'txtCode',
            }
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Tên giặt là',
        dataIndex: 'name',
        width: 150,
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'vendorNameFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onVendorNameFilterKeyup',
                buffer: 500
            }
        },
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                allowBlank: false,
                blankText:'Không được để trống tên thị trường',
                itemId:'txtName',
            }
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Thành phố',
        dataIndex: 'city',
        width: 150,
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Địa chỉ',
        dataIndex: 'address',
        width: 150,
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Người đại diện',
        dataIndex: 'contactperson',
        width: 150,
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Email',
        dataIndex: 'email',
        width: 150,
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Điện thoại',
        dataIndex: 'phone',
        width: 150,
        flex: 1,
        align: 'end',
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Màu đại diện',
        dataIndex: 'colorid_link',
        width: 150,
        flex: 1,
        editor: {
            completeOnEnter: true,
            field: {
                width:100,
                margin: 0,
                labelWidth: 0,
                xtype: 'combobox',
                // fieldLabel: 'Màu đại diện ',
                bind:{
                    store:'{ColorStore}',
                    value:'{currentRec.colorid_link}'
                },
                displayField: 'name',
                valueField: 'id',
                queryMode: 'local',
                anyMatch: true,
                editable: false,
                tpl: [
                    '<ul class="x-list-plain">',
                    '<tpl for=".">',
                    // '<div class="x-combo-list-item">',
                    // '<div style="height: 16px; width: 16px; border: 1px solid #777777; display: inline-block; background-color:{rgbvalue}"></div>',
                    // '&nbsp&nbsp{name}',
                    // '</div>',
                    '<li class="x-boundlist-item listItmes"',
                    // 'style="background-color: {rgbvalue}">',
                    '<div style="display: flex; align-items: center;">',
                    '<div style="height: 16px; width: 16px; border: 1px solid #777777; display: inline-block; background-color:{rgbvalue}"></div>',
                    '&nbsp&nbsp{name}',
                    '</div>',
                    '</li>',
                    '</tpl>',
                    '</ul>'
                ],
            }
        },
        renderer: 'rendererColor'
    },],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        border: false,
        items: [{
            xtype: 'button',
            margin: 5,
            text: 'Thêm mới',
            width: 110,
            iconCls: 'x-fa fa-plus',
            itemId: 'btnThemMoi'
        }]
    }]
});

