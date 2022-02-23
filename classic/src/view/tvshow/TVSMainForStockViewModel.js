Ext.define('GSmartApp.view.material.TVSMainForStockViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tvsmainforstock',
    requires: [
        'GSmartApp.store.TVSOrgStatus'
    ],
    stores: {
        TVSOrgStatus: {
            type: 'tvsorgstatus'
        }
    }
})