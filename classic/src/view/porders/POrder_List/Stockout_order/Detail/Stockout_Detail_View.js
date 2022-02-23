Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detail.Stockout_Detail_View', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockout_Detail_View',
    id: 'Stockout_Detail_View',
    controller: 'Stockout_Detail_ViewController',
    viewModel: {
        type: 'Stockout_Detail_ViewModel'
    },
    layout: 'border',
    items: [{
        region: 'north',
        xtype: 'Stockout_detail_M_View',
        height: 135,
        margin: 1,
        border: true
    }, {
        region: 'center',
        margin: 1,
        border: true,
        layout: 'border',
        items: [{
            region: 'west',
            xtype: 'Stockout_order_coloramount_View',
            width: 262,
            border: true
        }, {
            region: 'center',
            xtype: 'Stockout_detail_D_View',
            border: true
        }]
    }],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        }, {
            xtype: 'button',
            formBind: true,
            text: 'Tạo phiếu YCX',
            margin: 5,
            itemId: 'btnLuu',
            iconCls: 'x-fa fa-save',
            bind: {
                text: '{textbtnLuu}'
            }
        }]
    }]
})