Ext.define('GSmartApp.view.attribute.ProductAttributeViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProductAttributeViewCotroller',
    init: function () {
        var me = this.getView();
    },
    control:{
        '#ProductAttributeView':{
            itemdblclick :'onitemdblclick'
        },
        '#btnThemMoi':{
            click: 'onThemMoiAtt'
        },
        '#btnXoa':{
            click: 'onXoa'
        }
    },
    onCheckAttribute: function(col, rowIndex, checked, record, e, eOpts){
        var me = this.getView();
        me.setLoading("Đang xử lý dữ liệu!");
        var viewmodel = this.getViewModel();

        var store = viewmodel.getStore('ProductAttributeValueStore');
        var description = "";
        for(var i=0; i< store.data.length; i++){
            var rec = store.data.items[i];
            if(rec.get('is_select')){
                var name = rec.get('attributeValueName').replace('ALL, ','');
                if(description!=""){
                    description += "; "+name;
                }
                else {
                    description = name;
                }
            }
        }

        var params = new Object();
        params.productid_link = me.IdProduct;
        params.attributeid_link = record.get('attributeid_link');
        params.check = checked;
        params.description = description;

        GSmartApp.Ajax.post('/api/v1/product/update_select_att', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var viewInfo = Ext.getCmp('ProductInfoView');
                    viewInfo.getController().loadInfo(me.IdProduct);
                    var store = viewmodel.getStore('ProductAttributeValueStore');
                    store.commitChanges();

                    viewmodel.set('product.description', description);
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Có lỗi trong quá trình xử lý dữ liệu! Bạn vui lòng thử lại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        },
                        fn: function(){
                            record.set('is_select', !checked);
                        }
                    });
                }
            })
    },
    onXoa: function(grid, row, col){
        var viewmodel = this.getViewModel();
        var me = this.getView();
        var rec = grid.getStore().getAt(row);
        var name = rec.get('attributeName');

        var id = rec.get('attributeid_link');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa thuộc tính ' + name + '?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.setLoading("Đang xóa dữ liệu");
                    var params = new Object();
                    params.attributeid_link = id;
                    params.productid_link = me.IdProduct;

                    GSmartApp.Ajax.post('/api/v1/productattribute/deleteatt', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                Ext.Msg.show({
                                    title: 'Thông báo',
                                    msg: 'Xóa thành công',
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                                var store = me.getStore();
                                store.remove(rec);
                                var storeSKU = viewmodel.getStore('SKUStore');
                                storeSKU.load();
                            } else {
                                Ext.Msg.show({
                                    title: 'Thông báo',
                                    msg: 'Xóa thất bại',
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
                            me.setLoading(false);
                        })
                }
            }
        });
    },
    onAddValue: function(grid, row, col){
        var me = this.getView();
        var record = grid.getStore().getAt(row);
        var form = Ext.create('Ext.window.Window', {
            height: 400,
            closable: true,
            title: 'Thuộc tính : ' + record.data.attributeName,
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            width: 400,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'ProductSelectAttributeView',
                IdAttribute: record.data.attributeid_link,
                IdProduct: me.IdProduct
            }]
        });
        form.show();
    },
    onitemdblclick : function(m, record, item, index, e, eOpts){
        var me = this.getView();
        var form = Ext.create('Ext.window.Window', {
            height: 400,
            closable: true,
            title: 'Thuộc tính : ' + record.data.attributeName,
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            width: 400,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'ProductSelectAttributeView',
                viewModel: {
                    type: 'ProductDetailViewModel',
                    data: {
                        IdAttribute: record.data.attributeid_link,
                        IdProduct: me.IdProduct
                    }
                },
                IdAttribute: record.data.attributeid_link,
                IdProduct: me.IdProduct
            }]
        });
        form.show();
    },
    onThemMoiAtt: function(){
        var me = this.getView();
        var viewModel = this.getViewModel();
        if(viewModel.get('product.id') == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn phải tạo sản phẩm trước khi chọn thuộc tính',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            var viewInfo = Ext.getCmp('ProductInfoView');
            viewInfo.down('#buyercode').focus();
            return;
        }

        var form = Ext.create('Ext.window.Window', {
            height: 400,
            closable: true,
            title: 'Thêm mới thuộc tính ',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            width: 400,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'ProductAddAttributeView',
                IdProduct: me.IdProduct
            }]
        });
        form.show();
    }
})