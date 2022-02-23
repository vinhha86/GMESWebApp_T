Ext.define('GSmartApp.view.pcontract.PContractSKU_ListProductViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractSKU_ListProductViewCotroller',
    init: function () {

    },
    control: {
        '#PContractSKU_ListProductView': {
            itemclick: 'onSelectProduct'
        }
    },

    onSelectProduct: function (t, record, index, eOpts) {
        var viewmodel = this.getViewModel();
        var storeSku = viewmodel.getStore('PContractSKUStore');
        var pcontract_poid_link = viewmodel.get('pcontract_poid_link');
        viewmodel.set('IdProduct', record.data.id);
        viewmodel.set('Product_pquantity', record.data.pquantity);
        var productid_link = viewmodel.get('IdProduct');
        console.log(123);
        storeSku.loadStoreByPO_and_Product(productid_link, pcontract_poid_link);

    },
    viewImg: function (grid, metadata, rowIndex) {
        var me = this.getView();
        var data = grid.getStore().getAt(rowIndex);
        var id = data.get('productid_link');
        var name = data.get('productName');
        me.getSelectionModel().select(data);

        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/product/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var form = Ext.create('Ext.window.Window', {
                            height: 250,
                            closable: true,
                            resizable: false,
                            modal: true,
                            border: false,
                            title: 'Ảnh sản phẩm ' + name,
                            closeAction: 'destroy',
                            width: 250,
                            bodyStyle: 'background-color: transparent',
                            layout: {
                                type: 'fit', // fit screen for window
                                padding: 5
                            },
                            items: [{
                                xtype: 'PContractImageView',
                                IdProduct: id,
                                viewModel: {
                                    data: {
                                        img: response.img
                                    }
                                }
                            }]
                        });
                        form.show();
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lấy thông tin thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    }
})