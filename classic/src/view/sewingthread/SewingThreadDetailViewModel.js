Ext.define('GSmartApp.view.sewingtrim.SewingThreadDetailViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.SewingThreadDetailViewModel',
    requires: ['GSmartApp.store.product.ProductStore', 'GSmartApp.store.UserListStore',
    'GSmartApp.store.attribute.attributeStore','GSmartApp.store.attribute.attributeValueStore',
    'GSmartApp.store.product.ProductAttributeValueStore', 'GSmartApp.store.product.SKUStore',
    'GSmartApp.store.unit.UnitStore'],
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
        },
        UnitStore:{
            type: 'UnitStore'
        }
    },
    data:{
        product : {
            code: '',
            name: '',
            designerid_link: 0,
            samplemakername :''
        },
        img:{            
            img1:'',
            img2:'',
            img3:'',
            img4:'',
            img5:''
        },
        isWindow: false,
        btnQuayLai: false
    }
})