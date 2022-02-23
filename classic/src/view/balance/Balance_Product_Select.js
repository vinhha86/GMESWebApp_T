Ext.define('GSmartApp.view.stockin.Balance_Product_Select', {
    extend: 'Ext.grid.Panel',
    xtype: 'Balance_Product_Select',
    id:'Balance_Product_Select',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        selType: 'checkboxmodel',
    },
    bind:{
        store:'{PContractProductStore}'
    },
    columns:[
        {
            text:'Mã SP',
            dataIndex:'productBuyerCode',
            width: 100,
            listeners:{
                dblclick: 'viewProductDetail'
            },
        },
        // {
        //     text:'Tên SP (Buyer)',
        //     dataIndex:'productName',
        //     width: 200
        // },
        {
            text:'Mô tả',
            dataIndex:'productinfo',
            flex: 1
        }
    ],
	fbar: [
        {
			minWidth: 80,
			text: 'Đóng',
			iconCls: 'x-fa fa-window-close',
			handler: 'onCloseButton'
		}, 
        '->',
        {
            minWidth: 80,
            text: 'Tính cân đối',
            iconCls: 'x-fa fa-calculator',
            handler: 'onCalBalance'
        }
    ],        
});

