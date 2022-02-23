Ext.define('GSmartApp.view.pprocess.POrderProcessingViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.POrderProcessingViewModel',
    requires: [
        'GSmartApp.store.POrderProcessing',
        'GSmartApp.store.org.ListOrgStore'
    ],
    stores: {
        POrderProcessingStore: {
            type: 'porderprocessing'
        },
        FactoryStore: {
            type: 'ListOrgStore'
        },
        ProductionLineStore: {
            type: 'ListOrgStore'
        },
    },

    data: {
        
    }
})