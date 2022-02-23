Ext.define('GSmartApp.store.invoice.Invoice_status_store', {
    extend: 'Ext.data.Store',
    storeId: 'Invoice_status_store',
    alias: 'store.Invoice_status_store',
    fields: ['id', 'name'],
    data: [{
        id: 0, name: 'Tất cả'
    },{
        id: 1, name: 'Đang lập'
    },{
        id: 2, name: 'Đã xác nhận'
    }]
});
