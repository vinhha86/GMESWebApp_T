Ext.define('GSmartApp.view.product.ProductDetailViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ProductDetailViewModel',
    requires: ['GSmartApp.store.product.ProductStore', 'GSmartApp.store.UserListStore',
    'GSmartApp.store.attribute.attributeStore','GSmartApp.store.attribute.attributeValueStore',
    'GSmartApp.store.product.ProductAttributeValueStore', 'GSmartApp.store.product.SKUStore'],
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
        },
        ProductAttributeValueStore: {
            type : 'ProductAttributeValueStore'
        },
        SKUStore: {
            type : 'SKUStore'
        }
    },
    data:{
        product : {
            code: '',
            name: '',
            designerid_link: 0,
            samplemakername :'',
            vendorname: '',
            buyercode: '',
            vendorcode: '',
            buyername: ''
        },
        img:{            
            img1:'',
            img2:'',
            img3:'',
            img4:'',
            img5:''
        },
        isWindow: false,
        btnQuayLai: false,
        IdAttribute: null,
        IdProduct: null
    }
})