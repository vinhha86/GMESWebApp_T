Ext.define('GSmartApp.view.pcontract.PContractAttributeViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractAttributeViewCotroller',
    init: function () {
        common.Check_Object_Permission();
    },
    control: {
        '#btnAttr_PContractAttributeView': {
            click: 'onThemMoi'
        }
    },
    onThemMoi: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var IdProduct = viewModel.get('IdProduct');
        var IdPContract = viewModel.get('PContract').id;

        if (IdProduct == 0) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn phải chọn sản phẩm trước khi thêm thuộc tính',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
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
                xtype: 'PContractInsertAttributeView',
                IdProduct: IdProduct,
                IdPContract: IdPContract
            }]
        });
        form.show();
    },
    onAddValue: function (grid, rowIndex, colIndex) {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var IdProduct = viewModel.get('IdProduct');
        var IDPContract = viewModel.get('PContract').id;
        var name = grid.getStore().getAt(rowIndex).get('attributeName');
        var AttributeId = grid.getStore().getAt(rowIndex).get('attributeid_link');

        var form = Ext.create('Ext.window.Window', {
            height: 400,
            closable: true,
            title: 'Thuộc tính : ' + name,
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
                xtype: 'PContractInsertValueView',
                IdAttribute: AttributeId,
                IdProduct: IdProduct,
                IdPContract: IDPContract
            }]
        });
        form.show();
    },
    Xoa: function (grid, rowIndex) {
        var viewModel = this.getViewModel();

        var IdProduct = viewModel.get('IdProduct');
        var IdPContract = viewModel.get('PContract').id;
        var attributeid_link = grid.getStore().getAt(rowIndex).get('attributeid_link');

        var params = new Object();
        params.productid_link = IdProduct;
        params.attributeid_link = attributeid_link;

        GSmartApp.Ajax.post('/api/v1/productattribute/deleteatt', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Xóa thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });

                        grid.getStore().removeAt(rowIndex);

                        SKUView = Ext.getCmp('PContractSKUView');
                        SKUView.getStore().load();
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Xóa thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

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
            })
    },
    onXoaAtt: function (grid, rowIndex, colIndex) {
        var me = this.getView();
        var t = this;
        var viewModel = this.getViewModel();
        var name = grid.getStore().getAt(rowIndex).get('attributeName');
        var id = grid.getStore().getAt(rowIndex).get('attributeid_link');
        var mes = "";
        if(id== 4 || id == 30){
            mes = 'Xóa thuộc tính màu sắc hoặc cõ sẽ ảnh hưởng đến danh sách sku! <br>'+
            'Bạn có chắc chắn xóa?'
        }
        else{
            mes = 'Bạn có muốn xóa thuộc tính ' + name + '?';
        }

        Ext.Msg.show({
            title: 'Thông báo',
            msg: mes,
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    t.Xoa(grid, rowIndex);
                }
            }
        });
    }
})