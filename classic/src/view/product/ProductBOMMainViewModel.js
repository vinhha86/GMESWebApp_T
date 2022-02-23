Ext.define('GSmartApp.view.product.ProductBOMMainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ProductBOMMainViewModel',
    requires: ['GSmartApp.store.product.ProductBomStore', 'GSmartApp.store.product.ProductStore',
        'GSmartApp.store.product.ProductTypeStore','GSmartApp.store.unit.UnitStore'],
    stores: {
        ProductBom: {
            type: 'ProductBomStore'
        },
        productStore: {
            type: 'ProductStore'
        },
        ProductTypeStore: {
            type: 'ProductTypeStore'
        },
        UnitStore:{
            type:'UnitStore'
        }
    }
})