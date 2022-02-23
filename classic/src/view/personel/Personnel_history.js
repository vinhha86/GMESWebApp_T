Ext.define('GSmartApp.view.personel.Personnel_history', {
    extend: 'Ext.grid.Panel',
    xtype: 'Personnel_history',
    id: 'Personnel_history',
    controller: 'Personnel_history_ViewController',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{PersonnelHis_Store}'
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
                handler: 'onEdit'
            },
            {
                iconCls: 'x-fa fas fa-trash',
                handler: 'onDelete'
            }            
        ]
    },{
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Loại',
        dataIndex: 'type_name',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Chức vụ',
        dataIndex: 'position_name',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text: 'Cấp bậc',
        dataIndex: 'level_name',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Đơn vị trực thuộc',
        dataIndex: 'org_name',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Thang lương',
        dataIndex: 'saltype_name',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Bậc lương',
        dataIndex: 'sallevel_name',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Số quyết định',
        dataIndex: 'decision_number',
        width: 100,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Ngày quyết định',
        dataIndex: 'decision_date',
        align: 'center',
        width: 130,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            var date = Ext.Date.parse(value, 'c');
            return Ext.Date.format(date, 'd/m/Y');
        }
    }
   ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        border: false,
        items: [{
            xtype: 'button',
            margin: 1,
            text: 'Thêm mới chức vụ',
            iconCls: 'x-fa fa-plus',
            itemId: 'btn_position',
        },{
            xtype: 'button',
            margin: 1,
            text: 'Thêm mới cấp bậc',
            iconCls: 'x-fa fa-plus',
            itemId: 'btn_level',
        },{
            xtype: 'button',
            margin: 1,
            text: 'Thêm mới phòng ban',
            iconCls: 'x-fa fa-plus',
            itemId: 'btn_department',
        },{
            xtype: 'button',
            margin: 1,
            text: 'Thêm mới ngạch,bậc lương',
            iconCls: 'x-fa fa-plus',
            itemId: 'btn_salary',
        }]
    }
    ]
});

