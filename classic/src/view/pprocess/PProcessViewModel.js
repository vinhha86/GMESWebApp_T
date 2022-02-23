Ext.define('GSmartApp.view.pprocess.PProcessViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PProcessViewModel',
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
})