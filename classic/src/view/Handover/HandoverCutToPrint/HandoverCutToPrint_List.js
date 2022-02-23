Ext.define('GSmartApp.view.handover.HandoverCutToPrint_List', {
    extend: 'Ext.grid.Panel',
    xtype: 'HandoverCutToPrint_List',
    id: 'HandoverCutToPrint_List',
    viewModel: {
        type: 'HandoverCutToPrint_ListViewModel'
    },
    controller: 'HandoverCutToPrint_ListController',
    reference: 'HandoverCutToPrint_List',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{HandoverStore}'
    },
    cls: 'HandoverCutToPrint_List',
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
            tooltip: 'Xoá',
            handler: 'onXoa',
        }]
    },{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã lệnh',
        dataIndex: 'ordercode',
        // width: 120,
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            var status = record.data.status;
            metaData.tdAttr = 'data-qtip="' + value + '"';
            switch(status){
                case 0: metaData.tdCls = 'status0'; break;
                case 1: metaData.tdCls = 'status1'; break;
                case 2: metaData.tdCls = 'status2'; break;
                default: break;
            }
            return value;
        }
    }, {
        text: 'Số phiếu',
        dataIndex: 'handover_code',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Ngày xuất',
        dataIndex: 'handover_date',
        width: 90,
        align: 'center',
        renderer: Ext.util.Format.dateRenderer('d/m/Y')
    },
    // {
    //     text: 'Người giao',
    //     dataIndex: 'handoverUserName',
    //     width: 120,
    //     renderer: function(value, metaData, record, rowIdx, colIdx, store) {
    //         metaData.tdAttr = 'data-qtip="' + value + '"';
    //         return value;
    //     }
    // },
    {
        text: 'Nơi giao',
        dataIndex: 'orgFromNameParent',
        width: 100,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'SL giao',
        dataIndex: 'totalpackage',
        width: 80,
        align: 'end',
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return Ext.util.Format.number(value, '0,000');
        }
    },
    {
        text: 'Nơi nhận',
        dataIndex: 'orgToNameParent',
        width: 100,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'SL nhận',
        dataIndex: 'totalpackagecheck',
        width: 80,
        align: 'end',
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return Ext.util.Format.number(value, '0,000');
        }
    },
    // {
    //     text: 'Người nhận',
    //     dataIndex: 'receiverUserName',
    //     width: 120,
    //     renderer: function(value, metaData, record, rowIdx, colIdx, store) {
    //         metaData.tdAttr = 'data-qtip="' + value + '"';
    //         return value;
    //     }
    // },
    {
        text: 'Trạng thái',
        dataIndex: 'statusAndTimeToReceive',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
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
            bind: {
                hidden: '{isBtnThemMoiHidden}'
            }
        },{
            xtype:'textfield',
            labelWidth: 0,
            margin: '5 1 5 0',
            emptyText: "Mã lệnh",
            itemId: 'ordercode',
            width: 120
        },{
            xtype: 'datefield',
            labelWidth: 0,
            emptyText:'Xuất từ',
            itemId: 'handover_datefrom',
            reference: 'handover_datefrom',
            format:'d/m/Y',
            margin: '5 1 5 0',
            width: 130
        },{
            xtype: 'datefield',
            labelWidth: 0,
            emptyText:'Xuất đến',
            itemId: 'handover_dateto',
            reference: 'handover_dateto',
            format:'d/m/Y',
            margin: '5 1 5 0',
            width: 130
        },{
        //     xtype: 'datefield',
        //     labelWidth: 0,
        //     emptyText:'Nhập từ',
        //     itemId: 'handover_datefrom',
        //     reference: 'handover_datefrom',
        //     margin: '5 1 5 0',
        //     width: 130
        // },{
        //     xtype: 'datefield',
        //     labelWidth: 0,
        //     emptyText:'Nhập đến',
        //     itemId: 'handover_dateto',
        //     reference: 'handover_dateto',
        //     margin: '5 1 5 0',
        //     width: 130
        // },{
            xtype: 'combo',
            labelWidth: 0,
            emptyText:'Nơi giao',
            bind: {
                store : '{ListOrgStoreFrom}'
            },
            valueField: 'id',
            displayField: 'nameParent',
            queryMode: 'local',
            anyMatch: true,
            itemId: 'orgid_from_link',
            margin: '5 1 5 0',
            width: 130
        },{
            xtype: 'combo',
            labelWidth: 0,
            emptyText:'Nơi nhận',
            bind: {
                store : '{ListOrgStoreTo}'
            },
            valueField: 'id',
            displayField: 'nameParent',
            queryMode: 'local',
            anyMatch: true,
            itemId: 'orgid_to_link',
            margin: '5 1 5 0',
            width: 130
        },{
            xtype:'combobox',
            itemId:'status',
            bind:{
                store:'{HandOverStatusStore}'
            },
            displayField: 'name',
            valueField: 'id',
            value: [0,1,2],
            queryMode: 'local',
            anyMatch: true,
            editable: true,
            allowBlank: true,
            multiSelect: true,
            emptyText: 'Trạng thái',
            margin: '5 1 5 0',
            width: 130
        },{
            xtype: 'button',
            margin: '5 1 5 1',
            // text: 'Tìm kiếm',
            iconCls: 'x-fa fa-search',
            itemId: 'btnTimKiem'
        }]
    }, {
        dock: 'bottom',
        layout: 'vbox',
        border: false,
        items: [{
            layout: 'hbox',
            border: false,
            items: [{
                html: '<div class="color-box">'
                +'<div class="color-square status0"></div>&nbspChưa duyệt'
                +'</div>',
                margin: '5'
            },{
                html: '<div class="color-box">'
                +'<div class="color-square status1"></div>&nbspĐã duyệt'
                +'</div>',
                margin: '5'
            },{
                html: '<div class="color-box">'
                +'<div class="color-square status2"></div>&nbspĐã nhận'
                +'</div>',
                margin: '5'
            }]
        }, 
        {
            layout: 'hbox',
            xtype: 'toolbar',
            border: false,
            cls: 'botToolbar',
            items: [{
                xtype: 'textfield',
                value: 25,
                itemId: 'limitpage',
                maskRe: /[0-9]/,
                width: 180,
                selectOnFocus: true,
                margin: 5,
                fieldLabel: 'Số bản ghi/ Trang',
                labelWidth: 120
            }, '-', {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                flex: 1,
                nextText: 'Trang tiếp',
                prevText: 'Trang trước',
                afterPageText: '/ {0}',
                beforePageText: 'Trang',
                itemId: 'page',
                refreshText: 'Làm mới dữ liệu',
                border: false,
                bind: {
                    store: '{HandoverStore}'
                },
                emptyMsg: 'Không có kết quả tìm kiếm',
                lastText: 'Trang cuối',
                firstText: 'Trang đầu',
                displayMsg: 'Hiển thị {0} - {1} của {2}'
            }]
        }]
    }],
    listeners: {
        itemdblclick: 'onCapNhatdbl'
    }
});

