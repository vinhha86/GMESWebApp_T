Ext.define('GSmartApp.view.sizeset.SizesetViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.SizesetViewModel',
    requires: ['GSmartApp.store.sizeset.SizesetStore', 'GSmartApp.store.attribute.attributeValueStore'],
    stores: {
        SizesetStore: {
            type: 'SizesetStore'
        },
        AttributeValueStore:{
            type: 'attributeValueStore'
        }
    }
})