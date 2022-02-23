Ext.define('GSmartApp.store.faq.FAQ', {
    extend: 'Ext.data.Store',
    alias: 'store.faq',

    model: 'GSmartApp.model.faq.Category',

    proxy: {
        type: 'api',
        url: '~api/faq/faq'
    }
});
