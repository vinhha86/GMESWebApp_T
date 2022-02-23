Ext.define('GSmartApp.view.TaskGrid.TaskGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'TaskGrid',
    id: 'TaskGrid',
    viewModel: {
        type: 'TaskGridViewModel'
    },
    controller: 'TaskGridController',
    reference: 'TaskGrid',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },    
    bind:{
        store:'{TaskBoard_Store}'
    },
    columns:[{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    },{
        text:'Tên công việc',
        dataIndex:'name',
        width: 200,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'nameFilter',
            width: '99%',
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onNameFilterKeyup',
                buffer: 500
            }
        }
    },{
        text:'Chú thích',
        dataIndex:'description',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'descriptionFilter',
            width: '99%',
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onDescriptionFilterKeyup',
                buffer: 500
            }
        }
    },{
        text:'Người phụ trách',
        dataIndex:'UserInChargeName',
        width: 200,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'userInChargeNameFilter',
            width: '99%',
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onUserInChargeNameFilterKeyup',
                buffer: 500
            }
        }
    },{
        text:'Trạng thái',
        dataIndex:'State',
        width: 130,
        renderer: function(value, metaData, record, rowIdx, colIdx){
            switch (value){
                case 'DangLam':
                    return 'Đang làm';
                case 'ChuaLam':
                    return 'Chưa làm';
                case 'DaXong':
                    return 'Đã xong';
                case 'TuChoi':
                    return 'Từ chối';
            }
        }
    }],
    dockedItems:[{
        dock: 'top',
        xtype: 'toolbar',
        items:[{
            xtype: 'button',
            tooltip: 'Chuyển view',
            iconCls: 'x-fa fa-toggle-on',
            itemId: 'btnSwitch',
            margin: 5
        },{
            xtype: 'button',
            tooltip: 'Làm mới danh sách',
            iconCls: 'x-fa fa-refresh',
            itemId: 'btnRefresh',
            margin: 5
        },{
            xtype: 'button',
            tooltip: 'Thêm việc khác',
            iconCls: 'x-fa fa-plus',
            itemId: 'btnAddTask',
            margin: 5
        },{
            xtype: 'combo',
            margin: 5,
            bind : {
                store: '{TaskTypeStore}',
                value: -10
            },
            valueField: 'id',
            displayField: 'name',
            margin: 5,
            editable: false,
            emptyText: 'Loại công việc',
            itemId: 'cmbtype'
        },{
            xtype: 'combo',
            margin: 5,
            bind : {
                store: '{TaskStatusStore}',
            },
            valueField: 'Name',
            displayField: 'Text',
            margin: 5,
            editable: false,
            emptyText: 'Trạng thái',
            itemId: 'taskstatus'
        },{
            xtype: 'combo',
            margin: 5,
            bind : {
                store: '{OrgStore}',
            },
            valueField: 'id',
            displayField: 'name',
            margin: 5,
            editable: false,
            emptyText: 'Đơn vị',
            itemId: 'comboOrgGrid'
        },{
            xtype: 'combo',
            margin: 5,
            bind : {
                store: '{TaskUser_Store}',
            },
            valueField: 'Name',
            displayField: 'Name',
            margin: 5,
            // editable: false,
            queryMode: 'local',
            anyMatch: true,
            emptyText: 'Người phụ trách',
            itemId: 'comboUserGrid'
        }]
    }],
});

