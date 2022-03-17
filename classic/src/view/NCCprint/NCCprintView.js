Ext.define('GSmartApp.view.NCCprint.NCCprintView', {
    extend: 'Ext.grid.Panel',
    xtype: 'InTheuView', // same with database, 'PortView' shows error
    id: 'lsintheu',
    viewModel: {
        type: 'NCCprintViewModel'
    },
    // plugins: {
    //     cellediting: {
    //         clicksToEdit: 1
    //     }
    // },
    plugins: {
        cellediting: {
            clicksToEdit: 2,
            listeners: {
                edit: 'onEdit'
            }
        }
    },
    controller: 'NCCprintViewController',
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'SINGLE'
    // },
    reference: 'NCCprintView',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{OrgStore}'
        // store:'{ColorStore}'
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 50,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [
            {
            iconCls: 'x-fa fas fa-edit',
            tooltip: GSmartApp.Locales.btn_sua[GSmartApp.Locales.currentLocale],
            handler: 'onCapNhat'
        }, 
        {
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    },{
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
            reference: 'NCCprintCodeFilter',
            width: 116,
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onNCCprintCodeFilterKeyup',
                buffer: 500
            }
        },
        editor: {
            completeOnEnter: true,
            field: {
                // editor: {
                //     xtype: 'textfield',
                //     selectOnFocus: true,
                  
                //     },
                selectOnFocus: true,
                xtype: 'textfield',
                allowBlank: false,
                blankText:'Không được để trống tên viết tắt',
                itemId:'txtCode',
                // listeners:{
                //     change:'onChangeCode',
                //     // focusleave:'onFocusLeaveCode'
                // }
            }
        },
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Tên vendor',
        dataIndex: 'name',
        width: 150,
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'NCCprintNameFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onNCCprintNameFilterKeyup',
                buffer: 500
            }
        },
        editor: {
            completeOnEnter: true,
            field: {
                selectOnFocus: true,
                xtype: 'textfield',
                allowBlank: false,
                blankText:'Không được để trống tên Vendor',
                itemId:'txtName',
                // listeners:{
                //     change:'onChangeName',
                //     // focusleave:'onFocusLeaveName'
                // }
            }
        },
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Thành phố',
        dataIndex: 'city',
        width: 150,
        flex: 1,
        editor: {
            completeOnEnter: true,
            field: {
                selectOnFocus: true,
                xtype: 'textfield',
                allowBlank: true,
                blankText:'Không được để trống tên thành phố',
                itemId:'txtCity',
                // listeners:{
                //     change:'onChangeCity',
                //     // focusleave:'onFocusLeaveCity'
                // }
            }
        },
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Địa chỉ',
        dataIndex: 'address',
        width: 150,
        flex: 1,
        editor: {
            completeOnEnter: true,
            field: {
                selectOnFocus: true,
                xtype: 'textfield',
                allowBlank: true,
                blankText:'Không được để trống tên địa chỉ',
                itemId:'txtAddress',
                // listeners:{
                //     change:'onChangeAddress',
                //     // focusleave:'onFocusLeaveAddress'
                // }
            }
        },
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Người đại diện',
        dataIndex: 'contactperson',
        width: 150,
        flex: 1,
        editor: {
            completeOnEnter: true,
            field: {
                selectOnFocus: true,
                xtype: 'textfield',
                allowBlank: true,
                blankText:'Không được để trống tên địa chỉ',
                itemId:'txtCtperson',
                // listeners:{
                //     change:'onChangeCtperson',
                //     // focusleave:'onFocusLeaveCtperson'
                // }
            }
        },      
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Email',
        dataIndex: 'email',
        width: 150,
        vtype: 'email',
        vtypeText : 'Bạn phải nhập đúng định dạng email. Ví dụ name@example.com',
        flex: 1,
        editor: {
            completeOnEnter: true,
            field: {
                selectOnFocus: true,
                xtype: 'textfield',
                allowBlank: true,
                blankText:'Không được để trống tên địa chỉ',
                itemId:'txtEmail',
                // listeners:{
                //     change:'onChangeEmail',
                //     // focusleave:'onFocusLeaveEmail'
                // }
            }
        }, 
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Điện thoại',
        dataIndex: 'phone',
        width: 150,
        flex: 1,
        maskRe: /[0-9+-]/,
        align: 'end',
        editor: {
            completeOnEnter: true,
            field: {
                selectOnFocus: true,
                xtype: 'textfield',
                allowBlank: true,
                blankText:'Không được để trống tên địa chỉ',
                itemId:'txtPhone',
                // listeners:{
                //     change:'onChangePhone',
                //     // focusleave:'onFocusLeavePhone'
                // }
            }
        }, 
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Màu đại diện',
        dataIndex: 'clsName',
        width: 200,
        sortable: false,
        menuDisabled: true,
        // renderer: 'renderedBoxColor',
        editor: {
            field: {

                xtype: 'combobox',
                bind:{
                    store:'{ColorStore}',
                    // value:['{currentRec.colorid_link}','{currentRec.clsName}'],
                    // value:'{currentRec.clsName}',
                    value:'{currentRec.colorid_link}'
                     },
                selectOnFocus: true,
                allowBlank: false,
                displayField: 'name',
                valueField: 'id',
                queryMode: 'local',
                anyMatch: true,
                editable: true,
                // listeners:{
                //     // change:'onChangeClsName',
                //     focusleave:'onFocusLeaveClsName'
                // },
                tpl: [
                    '<ul class="x-list-plain">',
                    '<tpl for=".">',
                    '<li class="x-boundlist-item listItmes"',
                    '<div style="display: flex; align-items: center;">',
                    '<div style="height: 16px; width: 16px; border: 1px solid #777777; display: inline-block; background-color:{rgbvalue}"></div>',
                    '&nbsp&nbsp{name}',
                    '</div>',
                    '</li>',
                    '</tpl>',
                    '</ul>'
                ]
            },
        },
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, ],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        border: false,
        items: [{
            xtype: 'button',
            margin: 5,
            text: 'Thêm mới',
            // width: 110,
            iconCls: 'x-fa fa-plus',
            itemId: 'btnThemMoi'
        },
        {
            xtype: 'button',
            margin: 5,
            text: 'Thêm mới 2',
            // width: 110,
            iconCls: 'x-fa fa-plus',
            itemId: 'btnThemMoi2'   
        },
        {
            xtype: 'button',
            margin: 5,
            text: 'Upload',
            iconCls: 'x-fa fa-upload',
            itemId: 'splbtn_Upload',
            tooltip: 'Upload nhân viên',
        },
        {
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
            margin: 5,
            text: 'Tải file mẫu',
            iconCls: 'x-fa fa-download',
            itemId: 'splbtn_Download',
            tooltip: 'Download file nhân viên',
        },]
    }],
    listeners:{
        rowclick: 'onRowClick',
        dblclick: 'onRowClick'
    }
});

