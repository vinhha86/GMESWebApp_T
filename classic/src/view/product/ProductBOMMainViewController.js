Ext.define('GSmartApp.view.product.ProductBOMMainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProductBOMMainViewController',
    isThemMoi: false,
    init: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();

        var storeBom = viewmodel.getStore('ProductBom');
        storeBom.loadStore(me.IdProduct);

        var unitStore = viewmodel.getStore('UnitStore');
        unitStore.loadStore();
    },
    control:{
        '#btnNPL':{
            click: 'onThemNPL'
        },
        '#btnThoat':{
            click: 'onThoat'
        }
    },
    onThoat: function(){
        var me = this.getView();
        me.up('window').close();
    },
    onThemNPL: function(m){
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var storeNPL = viewmodel.getStore('productStore');

        var main = me.down('#ProductMaterialView');
        var east = me.down('#ProductBOMView');
        var north = me.down('#ProductBOMFilter');

        if(t.isThemMoi){
            m.setText("Thêm NPL");
            m.setIconCls("x-fa fa-plus");

            main.setWidth("0%");
            main.updateLayout();
        
            east.setWidth("100%");
            east.updateLayout();

            north.setHeight(0);
            north.updateLayout();
        }
        else{
            var name = north.down('#name').getValue();
            var code = north.down('#code').getValue();
            var tenmaunpl = north.down('#tenmaunpl').getValue();
            var product_type = north.down('#product_type').getValue();
            me.setLoading("Đang tải dữ liệu");
            storeNPL.loadStore_NPL_NotinBom(product_type, name, code, tenmaunpl, me.IdProduct, me);

            m.setText("Quay lại");
            m.setIconCls("x-fa fa-backward");
            
            main.setWidth("50%");
            main.updateLayout();
            main.IdProduct = me.IdProduct;
            
            east.setWidth("50%");
            east.updateLayout();
            east.IdProduct = me.IdProduct;

            north.setHeight(38);
            north.updateLayout();
            north.IdProduct = me.IdProduct;
        }

        t.isThemMoi = !t.isThemMoi;
    }
})