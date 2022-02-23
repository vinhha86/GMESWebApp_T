Ext.define('GSmartApp.view.sewingtrim.SewingTrimViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.SewingTrimViewModel',
    requires: ['GSmartApp.store.product.ProductStore', 'GSmartApp.store.UserListStore',
    'GSmartApp.store.attribute.attributeStore','GSmartApp.store.attribute.attributeValueStore'],
    stores: {
        ProductStore: {
            type: 'ProductStore'
        },
        UserStore: {
            type: 'userliststore'
        },
        AttributeStore: {
            type: 'attributeStore'
        },
        AttributeValueStore: {
            type: 'attributeValueStore'
        }
    }
})