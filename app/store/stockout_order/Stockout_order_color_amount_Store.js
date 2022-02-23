Ext.define('GSmartApp.store.stockout_order.Stockout_order_color_amount_Store', {
    extend: 'Ext.data.Store',
    storeId: 'Stockout_order_color_amount_Store',
    alias: 'store.Stockout_order_color_amount_Store',
    fields: ['id', 'stockoutorderid_link', 'colorid_link', 'color_name', 'amount']

});
