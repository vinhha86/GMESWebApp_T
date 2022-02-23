Ext.define('GSmartApp.view.attribute.attributeValueViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.attributeValueViewModel',
    requires: ['GSmartApp.store.attribute.attributeValueStore'],
    stores: {
        AttributeValueStore: {
            type: 'attributeValueStore'
        }
    },
    data: {
        isABCsortHidden: true
    }
})