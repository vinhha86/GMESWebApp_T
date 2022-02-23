Ext.define('GSmartApp.view.product.ProductBOMFilterViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProductBOMFilterViewController',
    init: function () {
        
    },
    control:{
        '#product_type':{
            select : 'onSearch'
        },
        '#name':{
            specialkey: 'onSpecialkey'
        },
        '#code':{
            specialkey: 'onSpecialkey'
        },
        '#tenmaunpl':{
            specialkey: 'onSpecialkey'
        },
        '#btnTimKiem':{
            click: 'onSearch'
        }
    },
    onSpecialkey: function(field, e){
        var t = this;
        if (e.getKey() == e.ENTER) {
            t.onSearch();
        }
    },
    onSearch : function(){
        var me = this.getView();
        var t = this;
        var viewmodel = this.getViewModel();

        var name = me.down('#name').getValue();
        var code = me.down('#code').getValue();
        var tenmaunpl = me.down('#tenmaunpl').getValue();
        var product_type = me.down('#product_type').getValue();

        var storeNPL = viewmodel.getStore('productStore');
        storeNPL.loadStore_NPL_NotinBom(product_type, name, code, tenmaunpl, me.IdProduct);
    }
})