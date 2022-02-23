Ext.define('GSmartApp.view.provider.DanhSachShopEditViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DanhSachShopEditViewCotroller',

    init: function () {
        var me = this.getView();
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'loadData'
            }
        }
    },
    control: {
        '#btnQuayLai': {
            click: 'onQuayLai'
        },
        '#btnLuu': {
            click: 'Luu'
        },
        '#btnLuuVaTaoMoi': {
            click: 'Luu'
        }
    },
    onQuayLai: function () {
        this.redirectTo('dm_shop');
    },
    Actionluu: function (thisBtn) {
        var me = this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        var shop = new Object();
        shop.code = viewmodel.get('shop.code');
        shop.name = viewmodel.get('shop.name');
        shop.phone = viewmodel.get('shop.phone');
        shop.email = viewmodel.get('shop.email');
        shop.city = viewmodel.get('shop.city');
        shop.address = viewmodel.get('shop.address');

        shop.orgtypeid_link = 4;
        shop.orgrootid_link = 1;
        shop.status = 1;
        shop.parentid_link = 1;
        shop.id = viewmodel.get('shop.id');

        params.data = shop;
        GSmartApp.Ajax.post('/api/v1/orgmenu/createOrg', Ext.JSON.encode(params),
            function (success, response, option) {
                if (success) {
                    var response = Ext.decode(response.responseText)
                    if (response.respcode = 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },
                            fn: function () {
                                if (thisBtn.itemId == 'btnLuu') {
                                    var id = response.id;
                                    me.redirectTo("dm_shop/" + id + "/edit");
                                }
                                if (thisBtn.itemId == 'btnLuuVaTaoMoi') {
                                    viewmodel.set('shop.code',null);
                                    viewmodel.set('shop.name',null);
                                    viewmodel.set('shop.phone',null);
                                    viewmodel.set('shop.email',null);
                                    viewmodel.set('shop.city',null);
                                    viewmodel.set('shop.address',null);
                                    me.redirectTo("dm_shop/create");
                                }
                            }
                        });
                    } else {
                        Ext.Mgs.show({
                            title: 'Lưu thất bại',
                            msg: null,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        })
                    }
                }
            })
    },
    Luu: function (thisBtn) {
        var me = this;
        // Thông báo thông tin Tên hoặc Tên tắt bị trùng, Có tiếp tục lưu không?
        var viewmodel = this.getViewModel();
        var code = viewmodel.get('shop.code');
        var name = viewmodel.get('shop.name');
        if (code == name) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Thông tin tên và tên tắt bị trùng, Có tiếp tục lưu không?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                buttonText: {
                    yes: 'Có',
                    no: 'Không'
                },
                fn: function (btn) {
                    if (btn === 'yes') {
                        me.Actionluu(thisBtn);
                    }
                }
            });
        } else {
            me.Actionluu(thisBtn);
        }
    },

    //load thong tin shop
    loadData: function (id) {
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/org/getOrgById', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    data = response.data;


                    viewmodel.set('shop.name', data.name);
                    viewmodel.set('shop.code', data.code);
                    viewmodel.set('shop.phone', data.phone);
                    viewmodel.set('shop.email', data.email);
                    viewmodel.set('shop.city', data.city);
                    viewmodel.set('shop.address', data.address);
                    viewmodel.set('shop.id', data.id);
                }
            })
    }

})