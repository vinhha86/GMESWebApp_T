Ext.define('GSmartApp.view.product.ProductSewingCost.Product_Balance.ProductBalance_WorkingProcess', {
    extend: 'Ext.grid.Panel',
    xtype: 'ProductBalance_WorkingProcess',
    id: 'ProductBalance_WorkingProcess',
    reference: 'ProductBalance_WorkingProcess',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true,
        plugins: {
            ptype: 'gridviewdragdrop',
            enableDrag: true,
            //dragText: '{0} Mã sản xuất được tính lương',
            dragGroup: 'BalanceWorkingProcessGroup',
            dropGroup: 'BalanceDetailGroupSub'
        },
        listeners: {
            // drop: 'onDropOrg',
            beforedrop: 'onBeforeDropBalanceDetailSub'
        }
    },
    bind: {
        store: '{ProductSewingCostStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Tên công đoạn',
        dataIndex: 'workingprocess_name',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
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
    }, {
        text: 'Thời gian',
        dataIndex: 'timespent_standard',
        renderer: function(value, metaData, record, rowIdx, colIdx, store){
            return value + ' (s)';
        },
        width: 80,
        align: 'end'
    // }, {
        // xtype: 'actioncolumn',
        // width: 28,
        // menuDisabled: true,
        // sortable: false,
        // align: 'center',
        // items: [
        //     {
        //         iconCls: 'x-fa fas fa-bars violetIcon',
        //         handler: 'onMenu'
        //     },            
        // ],
        // bind: {
        //     hidden: '{isCreateNew}'
        // }
    }],
});

