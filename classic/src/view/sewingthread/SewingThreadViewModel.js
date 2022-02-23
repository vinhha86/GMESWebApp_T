Ext.define('GSmartApp.view.sewingtrim.SewingThreadViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.SewingThreadViewModel',
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