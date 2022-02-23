Ext.define('GSmartApp.view.factory.FactoryDetailViewDetailViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FactoryDetailViewCotroller',
    Id: 0,
    init: function () {
        var me = this.getView();
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData'
            }
        }
    },
    control: {
        '#btnQuayLai': {
            click: 'onQuayLai'
        },
        '#btnLuu': {
            click: 'onLuu'
        }
    },
    onLuu: function () {
        var viewMain = Ext.getCmp('FactoryView');

        var me = this.getView();
        me.setLoading("Đang lưu dữ liệu");

        var viewModel = this.getViewModel();

        var params = new Object();
        var data = new Object();
        data = viewModel.get('currentRec');
        data.id = this.Id;
        data.orgtypeid_link = 2;
        data.orgrootid_link = 0;
        data.status = 1;

        params.data = data;
        params.msgtype = "PRODUCT_CREATE";
        params.message = "Tạo sản phẩm";

        GSmartApp.Ajax.post('/api/v1/org/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Lưu thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });

                        if (data.id == 0) {
                            if(viewMain)
                            viewMain.getStore().load();
                        }
                        me.Id = response.id;
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Lưu thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        me.down('#code').focus();
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Lưu thất bại',
                        msg: null,
                        buttons: [{
                            itemId: 'cancel',
                            text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
                        }]
                    });
                }
                me.setLoading(false);
            })
    },
    onQuayLai: function () {
        var me = this.getView();
        //me.getForm().reset();
        this.redirectTo('lsfactory');
    },
    onLoadData: function (id, type) {
        var me = this;
        var viewMain = Ext.getCmp('FactoryView');
        var viewmodel = me.getViewModel();
        viewmodel.set('id', id);
        if (id == 0) {
            viewmodel.set('currentRec', null);
            me.getView().getForm().reset();
        }
        else {
            if(viewMain){
                var data = viewMain.getStore().getById(id).data;
                viewmodel.set('currentRec', data);
                viewmodel.set('name', data.name);
            }
            else{
                me.loadInfo(id, viewmodel);
            }
        }

        me.Id = id;
    },
    loadInfo: function(id, viewmodel ){
        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/org/getOrgById', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    data = response.data;
                    viewmodel.set('currentRec', data);
                    viewmodel.set('name', data.name);
                }
            })
    }
})