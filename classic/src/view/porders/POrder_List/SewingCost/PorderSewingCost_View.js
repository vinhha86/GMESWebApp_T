Ext.define('GSmartApp.view.porders.POrderList.SewingCost.PorderSewingCost_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'PorderSewingCost_View',
    id: 'PorderSewingCost_View',
    requires: [
        'Ext.grid.Panel'
    ],
    border: true,
    controller: 'PorderSewingCost_ViewController',
    bind: {
        store: '{PorderSewingCostStore}'
    },
    // selModel: 'rowmodel',
    selModel: {
        selType: 'checkboxmodel',
        checkOnly: true
    },
    features: [
        {
            id: 'group',
            ftype: 'groupingsummary',
            // groupHeaderTpl: '<b>Cụm công đoạn: {name}</b>',
            groupHeaderTpl: [
                '<div><b>{name:this.formatName}</b></div>',
                {
                    formatName: function(name) {
                        if(name != null && name != ''){
                            return 'Cụm công đoạn: ' + Ext.String.trim(name);
                        }
                        return '&nbsp';
                    }
                }
            ],
            hideGroupedHeader: false,
            enableGroupingMenu: false,
        },
        {
            ftype: 'summary',
            dock: 'bottom'
        },
    ],
    viewConfig: {
        enableTextSelection: false,
        stripeRows: false,
        rowLines: true,
        columnLines: true
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            } 
        }
    },
    
    columns: [
        {
            text: 'STT',
            width: 50,
            xtype: 'rownumberer',
            align: 'center'
        },
        {
            header: 'Tên công đoạn',
            dataIndex: 'workingprocess_name',
            flex: 1,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        {
            header: 'Mã công đoạn',
            dataIndex: 'workingprocess_code',
            flex: 1,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        {
            header: 'Thiết bị',
            dataIndex: 'device_name',
            width: 120,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        {
            header: 'Bậc thợ',
            dataIndex: 'laborlevel_name',
            width: 135,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        {
            header: 'Thời gian',
            dataIndex: 'timespent_standard',
            width: 100,
            renderer: function(value){
                return value == null ? "" : (value + " (s)");
            }
        },
        {
            header: 'Chú thích',
            dataIndex: 'techcomment',
            flex: 1,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        {
            header: 'Đơn giá',
            dataIndex: 'cost',
            align: 'right',
            width: 100,
            renderer: 'rendernumber',
            editor:{
                xtype:'textfield',
                maskRe: /[0-9.]/,
                selectOnFocus: true,
                cancelOnEsc: false,
                completeOnEnter: false
            }
        },
        {
            header: 'S/lượng',
            dataIndex: 'amount',
            align: 'right',
            width: 90,
            renderer: 'rendernumberint',
            editor:{
                xtype:'textfield',
                maskRe: /[0-9]/,
                selectOnFocus: true,
                cancelOnEsc: false,
                completeOnEnter: false
            }
        },
        {
            header: 'Tổng giá',
            dataIndex: 'totalcost',
            width: 130,
            align: 'right',
            summaryType: 'sum', 
            summaryRenderer: 'renderSum',
            renderer: 'rendernumber'
        },
        {
            xtype: 'actioncolumn',
            width: 30,
            menuDisabled: true,
            sortable: false,
            items: [{
                iconCls: 'x-fa fas fa-trash',
                tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
                handler: 'onXoa'
            }]
        }
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                tooltip: 'Thêm công đoạn',
                iconCls: 'x-fa fa-plus',
                itemId:'btnThemCongDoan',
                weight: 30,
            },
            {
                tooltip: 'Copy công đoạn sản phẩm',
                iconCls: 'x-fa fa-copy',
                itemId:'btnCopyCongDoan',
                weight: 30,
            },
            {
                xtype:'button',
                text: 'Chốt quy trình công nghệ',
                itemId:'btnConfirmSewingCost',
                // ui: 'header',
                tooltip: 'Chốt quy trình công nghệ',
                iconCls: 'x-fa fa-check greenIcon',
                // handler: 'onFactoriesTap',
            },
            {
                xtype:'button',
                text: 'Cụm công đoạn',
                itemId:'btnPorderBalance',
                // ui: 'header',
                tooltip: 'Cụm công đoạn',
                // iconCls: 'x-fa fa-check greenIcon',
            },
            // {
            //     xtype: 'button',
            //     tooltip: 'Tải file mẫu (quy trình công nghệ tiêu chuẩn)',
            //     itemId: 'btnDownloadTmpFileStandard',
            //     // margin: 3,
            //     // text: 'Mẫu file quy trình công nghệ',
            //     iconCls: 'x-fa fa-download',
            // },
            {
                xtype: 'button',
                tooltip: 'Tải file mẫu (quy trình công nghệ)',
                itemId: 'btnDownloadTmpFile',
                // margin: 3,
                // text: 'Mẫu file quy trình công nghệ',
                iconCls: 'x-fa fa-download',
            },
            {
                xtype: 'button',
                tooltip: 'Upload file (quy trình công nghệ)',
                itemId: 'btnUploadTmpFile',
                // margin: 3,
                // text: 'Mẫu file quy trình công nghệ',
                iconCls: 'x-fa fa-upload',
            },
            {
                xtype: 'filefield',
                buttonOnly: true,
                hidden: true,
                itemId: 'fileUpload',
            },
            '->',
            {
                xtype: 'button',
                tooltip: 'Xoá',
                itemId: 'btnDeletePorderSewingCost',
                // margin: 3,
                // text: 'Mẫu file quy trình công nghệ',
                iconCls: 'x-fa fa-trash',
            }
        ]
    }]
});
