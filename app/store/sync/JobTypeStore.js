Ext.define('GSmartApp.store.sync.JobTypeStore', {
    extend: 'Ext.data.Store',
    storeId: 'JobTypeStore',
    alias: 'store.JobTypeStore',
    fields: [
        'id',
        'classname'
    ],
    data: [
        { id: "vn.gpay.sync.crontab.Sync_DailyJob", classname: 'Đồng bộ' }
    ]
});