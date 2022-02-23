Ext.define('GSmartApp.view.POrder_Grant_Balance.POrderGrantBalance_Detail', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrderGrantBalance_Detail',
    id:'POrderGrantBalance_Detail',
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
            enableDrag: true,
            //dragText: '{0} Mã sản xuất được tính lương',
            dragGroup: 'WorkingProcessGroup',
            dropGroup: 'PersonnelGroup'
        },
        listeners: {
            // drop: 'onDropOrg',
            beforedrop: 'onBeforePersonnelGroupDrop'
        }
    },
    // selModel: {
    //     //selType: 'checkboxmodel',
    //     mode: 'SINGLE'
    // },
    bind:{
        store:'{POrderBalanceStore}'
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
    //             handler: 'onMenu_PO'
    //         },            
    //         // {
    //         //     iconCls: 'x-fa fas fa-trash',
    //         //     tooltip: 'Xóa',
    //         //     handler: 'onXoa'
    //         // },{
    //         //     iconCls: 'x-fa fas fa-list',
    //         //     tooltip: 'Chi tiết',
    //         //     handler: 'onEdit'
    //         // },{
    //         //     iconCls: 'x-fa fas fa-check',
    //         //     tooltip: 'Chốt đơn',
    //         //     handler: 'onAccept'
    //         // }
    //     ]
    // },{
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    },{
        text:'Vị trí',
        dataIndex:'balance_name',
        width: 150,
    },{
        text:'Danh sách công đoạn',
        dataIndex:'workingprocess_name',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text:'Tổng thời gian',
        align: 'right',
        dataIndex:'timespent_standard',
        width: 80,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            return value + ' (s)';
        }
    },{
        text:'Nhân sự',
        align: 'right',
        dataIndex:'personnelFullName',
        width: 150,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            return value;
        }
    }],
    plugins: {
        rowwidget: {
            widget: 
            {
                xtype: 'grid',
                viewConfig: {
                    stripeRows: false,
                    // plugins:{
                    //     ptype: 'gridviewdragdrop',
                    //     enableDrag: true,
                    //     //dragText: '{0} Mã sản xuất được tính lương',
                    //     dragGroup: 'BalanceDetailGroupSub',
                    //     dropGroup: 'BalanceDetailGroupSub'
                    // },
                    // listeners: {
                    //     // drop: 'onDropOrg',
                    //     // beforedrop: 'onBeforeDropBalanceDetailSubToSub'
                    // }
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
    // dockedItems:[{
    //     dock:'top',
    //     layout:'hbox',
    //     border: false,
    //     items:[{
    //         flex: 1,
    //     },{
    //         xtype: 'button',
    //         margin: 5,
    //         // text: 'Thêm vị trí',
    //         tooltip: 'Thêm vị trí',
    //         iconCls: 'x-fa fa-plus',
    //         // width: 90,
    //         itemId: 'btnThemViTri',
    //         handler: 'onBtnThemViTri'
    //     }]
    // }]
});

