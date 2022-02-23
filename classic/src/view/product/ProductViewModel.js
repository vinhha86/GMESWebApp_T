Ext.define('GSmartApp.view.product.ProductViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ProductViewModel',
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
    },
    data: {
        search: {
            
        }
    }
})