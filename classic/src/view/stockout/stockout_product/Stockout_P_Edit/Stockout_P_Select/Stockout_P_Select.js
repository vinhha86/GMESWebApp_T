Ext.define('GSmartApp.view.stockout.Stockout_P_Select', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_P_Select',
    id: 'Stockout_P_Select',
    reference: 'Stockout_P_Select',
    controller: 'Stockout_P_Select_Controller',
    viewModel: {
        type: 'Stockout_P_Select_ViewModel'
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE',
        checkOnly: true
    },
    requires: [
        'GSmartApp.store.Stockout',
        'Ext.Number',
        'Ext.Date'
    ],
    layout: 'fit',
    //frame: true,
    scrollable: true,
    bind: {
        store: '{Stockout}'
    },
    columnLines: true,
    viewConfig: {
        enableTextSelection: false,
        stripeRows: false
    },
    columns: [
        { header: 'Số phiếu', dataIndex: 'stockoutcode', width: 150 },
        { header: 'Loại phiếu', dataIndex: 'stockouttype_name', width: 150 },
        { header: 'Ngày xuất', dataIndex: 'stockoutdate', renderer: Ext.util.Format.dateRenderer('d/m/Y'), width: 90 },
        { header: 'Nơi xuất', dataIndex: 'org_from_name', flex: 1 },
        { header: 'Nơi nhận', dataIndex: 'org_to_name', flex: 1 },
        { header: 'Trạng thái', dataIndex: 'statusString', width: 120}, 
        { header: 'Người lập phiếu', dataIndex: 'usercreate_name', width: 120 },
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            flex: 1,
            border: false
        }, {
            xtype: 'button',
            text: 'Chọn',
            margin: 3,
            itemId: 'btnLuu',
            iconCls: 'x-fa fa-check'
        }, {
            xtype: 'button',
            text: 'Thoát',
            margin: 3,
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }]
    }]    
});
