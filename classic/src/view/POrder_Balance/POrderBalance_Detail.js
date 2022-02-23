Ext.define('GSmartApp.view.POrder_Balance.POrderBalance_Detail', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrderBalance_Detail',
    id:'POrderBalance_Detail',
    requires: [
        'Ext.Number',
        'Ext.Date',
        'Ext.grid.plugin.RowWidget'
    ],
    viewConfig: {
        stripeRows: false,
        // enableTextSelection: true,
        columnLines: true,
        rowLines: true,
        plugins:{
            ptype: 'gridviewdragdrop',
            enableDrag: false,
            //dragText: '{0} Mã sản xuất được tính lương',
            // dragGroup: 'BalanceDetailGroup',
            dropGroup: 'BalanceWorkingProcessGroup'
        },
        listeners: {
            // drop: 'onDropOrg',
            beforedrop: 'onBeforeDropWorkingProcess'
        }
    },
    selModel: {
        selType: 'checkboxmodel',
        checkOnly: true
    },
    bind:{
        store:'{POrderBalanceStore}'
    },
    columns:[
        {
            text: 'STT',
            width: 40,
            xtype: 'rownumberer',
            align: 'center',
            sortable: false
        },
        {
            text:'Cụm công đoạn',
            dataIndex:'balance_name',
            width: 150,
            sortable: false
        },
        {
            text:'Danh sách công đoạn',
            dataIndex:'workingprocess_name',
            flex: 1,
            sortable: false,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
        {
            text:'Tổng thời gian',
            align: 'right',
            dataIndex:'timespent_standard',
            width: 80,
            sortable: false,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                return value + ' (s)';
            }
        },
        {
            xtype: 'actioncolumn',
            width: 30,
            menuDisabled: true,
            sortable: false,
            align: 'center',
            sortable: false,
            items: [
                // {
                //     iconCls: 'x-fa fas fa-bars violetIcon',
                //     handler: 'onMenu_PO'
                // },            
                {
                    iconCls: 'x-fa fas fa-trash',
                    tooltip: 'Xóa cụm công đoạn',
                    handler: 'onBtnXoaViTri'
                },
                // {
                //     iconCls: 'x-fa fas fa-list',
                //     tooltip: 'Chi tiết',
                //     handler: 'onEdit'
                // },
                // {
                //     iconCls: 'x-fa fas fa-check',
                //     tooltip: 'Chốt đơn',
                //     handler: 'onAccept'
                // }
            ]
        },
    ],
    plugins: {
        rowwidget: {
            widget: 
            {
                xtype: 'grid',
                viewConfig: {
                    stripeRows: false,
                    plugins:{
                        ptype: 'gridviewdragdrop',
                        enableDrag: true,
                        //dragText: '{0} Mã sản xuất được tính lương',
                        dragGroup: 'BalanceDetailGroupSub',
                        dropGroup: 'BalanceDetailGroupSub'
                    },
                    listeners: {
                        // drop: 'onDropOrg',
                        beforedrop: 'onBeforeDropBalanceDetailSubToSub'
                    }
                },                
                bind: {
                    store: '{record.porderBalanceProcesses}',
                    // title: 'Danh sách hàng xuất'
                },
                columns:[{
                //     xtype: 'actioncolumn',
                //     width: 28,
                //     menuDisabled: true,
                //     sortable: false,
                //     align: 'center',
                //     items: [
                //         {
                //             iconCls: 'x-fa fas fa-bars violetIcon',
                //             handler: 'onMenu_SubPO'
                //         }
                //     ]
                // },{
                    text:'Tên công đoạn',
                    dataIndex:'workingprocess_name',
                    flex: 1,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                        metaData.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    }
                },{
                    text: 'Thiết bị',
                    dataIndex: 'device_name',
                    renderer: function(value, metaData, record, rowIdx, colIdx, store){
                        metaData.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    },
                    flex: 1,
                    align: 'end'
                }, {
                    text: 'Bậc thợ',
                    dataIndex: 'laborlevel_name',
                    renderer: function(value, metaData, record, rowIdx, colIdx, store){
                        metaData.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    },
                    flex: 1,
                    align: 'end'
                },{
                    text:'Thời gian',
                    align: 'end',
                    dataIndex:'timespent_standard',
                    width: 80,
                    renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                        return value + ' (s)';
                    }
                }]				
            }
        }
    },
    dockedItems:[{
        dock:'top',
        layout:'hbox',
        border: false,
        items:[
            {
                flex: 1,
            },
            {
                xtype: 'button',
                margin: 5,
                // text: 'Thêm vị trí',
                tooltip: 'Sắp xếp cụm công đoạn',
                iconCls: 'x-fa fa-random',
                // width: 90,
                itemId: 'btnSapXepCumCongDoan',
                // handler: 'onBtnThemViTri'
            },
            {
                xtype: 'button',
                margin: 5,
                // text: 'Thêm vị trí',
                tooltip: 'Xoá cụm công đoạn',
                iconCls: 'x-fa fa-trash',
                // width: 90,
                itemId: 'btnXoaViTriMulti',
                // handler: 'onBtnThemViTri'
            },
            {
                xtype: 'button',
                margin: 5,
                // text: 'Thêm vị trí',
                tooltip: 'Thêm cụm công đoạn',
                iconCls: 'x-fa fa-plus',
                // width: 90,
                itemId: 'btnThemViTri',
                // handler: 'onBtnThemViTri'
            }
        ]
    }]
});

