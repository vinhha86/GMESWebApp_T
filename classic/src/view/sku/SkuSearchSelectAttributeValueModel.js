Ext.define('GSmartApp.view.sku.SkuSearchSelectAttributeValueModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.SkuSearchSelectAttributeValueModel',
    stores:{
        SkuAtributeValueStore: {
            type: 'skuattributevalues'
        }
    },
    data: {
        IdAttribute: null,
        AttrRecord: null
    }
});
