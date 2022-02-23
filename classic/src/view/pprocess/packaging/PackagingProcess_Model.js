Ext.define('GSmartApp.view.pprocess.PackagingProcess_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PackagingProcess_Model',
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