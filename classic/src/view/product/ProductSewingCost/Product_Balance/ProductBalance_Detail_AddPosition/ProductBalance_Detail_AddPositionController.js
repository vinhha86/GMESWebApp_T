Ext.define('GSmartApp.view.product.ProductSewingCost.Product_Balance.ProductBalance_Detail_AddPositionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProductBalance_Detail_AddPositionController',
    init: function () {
        
    },
    control: {
        '#btnLuu': {
            click: 'onBtnLuu'
        },
        '#btnThoat': {
            click: 'onBtnThoat'
        }
    },
    onBtnThoat: function(){
        var view = this.getView().up('window');
		view.close();
    },
    onBtnLuu: function(){
        var me = this;
        var viewModel = this.getViewModel();
        var productid_link = viewModel.get('productid_link');

        var name = viewModel.get('name');
        if(name == null || name == ''){
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Tên cụm công đoạn không được bỏ trống",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
            return;
        }
        name = name.trim();
        me.onLuu(productid_link, name);
    },
    onLuu: function(productid_link, name){
        var me = this;
        var params = new Object();
        params.productid_link = productid_link;
        params.name = name;

        GSmartApp.Ajax.post('/api/v1/product_balance/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Thêm mới thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },
                        });
                        me.fireEvent('reloadProductBalanceStore');
                        // me.onBtnThoat();
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                }
                else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Thêm mới thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    Luu: function(productid_link, amount){
        var me = this;
        var params = new Object();
        params.productid_link = productid_link;
        params.amount = amount;

        GSmartApp.Ajax.post('/api/v1/product_balance/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Thêm mới thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },
                        });
                        var ProductBalanceView = Ext.getCmp('ProductBalance');
                        ProductBalanceView.getViewModel().getStore('ProductBalanceStore').load();
                        me.onBtnThoat();
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Thêm mới thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                }
                else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Thêm mới thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    }
});