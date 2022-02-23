Ext.define('GSmartApp.view.packingtrim.PackingTrimAttributeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PackingTrimAttributeViewController',
    init: function () {
        var me = this.getView();
    },
    control:{
        '#PackingTrimAttributeView':{
            itemdblclick :'onitemdblclick'
        },
        '#btnThemMoi':{
            click: 'onThemMoiAtt'
        },
        '#btnXoa':{
            click: 'onXoa'
        }
    },
    onXoa: function(grid, row, col){
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
                xtype: 'PackingTrimSelectAttributeValueView',
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
                xtype: 'PackingTrimSelectAttributeValueView',
                IdAttribute: record.data.attributeid_link,
                IdProduct: me.IdProduct
            }]
        });
        form.show();
    },
    onThemMoiAtt: function(){
        var me = this.getView();
        var viewModel = this.getViewModel();
        if(viewModel.get('product.id') ==0 ){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn phải tạo phụ liệu hoàn thiện trước khi chọn thuộc tính',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            var viewInfo = Ext.getCmp('PackingTrimInfoView');
            viewInfo.down('#code').focus();
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
                xtype: 'PackingTrimSelectAttribueView',
                IdProduct: me.IdProduct
            }]
        });
        form.show();
    }
})