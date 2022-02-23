Ext.define('GSmartApp.view.attribute.attributeViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.attributeViewModel',
    requires: ['GSmartApp.store.attribute.attributeStore'],
    stores: {
        AttributeStore: {
            type: 'attributeStore'
        }
    }
})