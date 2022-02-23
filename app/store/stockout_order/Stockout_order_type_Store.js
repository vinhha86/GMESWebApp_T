Ext.define('GSmartApp.store.stockout_order.Stockout_order_type_Store', {
    extend: 'Ext.data.Store',
    storeId: 'Stockout_order_type_Store',
    alias: 'store.Stockout_order_type_Store',
    fields:['id', 'name'],
    data:[{
        id: 1, name: 'YCX Nguyên liệu'
    },{
        id: 2, name: 'YCX Phụ liệu'
    }]

});
