Ext.define('GSmartApp.view.provider.ProviderDetailViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProviderDetailViewCotroller',
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
            click: 'Luu'
        },
        '#btnLuuVaTaoMoi': {
            click: 'Luu'
        }
    },
    onLuu: function (thisBtn) {
        var viewMain = Ext.getCmp('ProviderView');
        var m = this;
        var me = this.getView();
        me.setLoading("Đang lưu dữ liệu");

        var viewModel = this.getViewModel();

        var params = new Object();
        var data = new Object();
        data = viewModel.get('currentRec');
        data.id = this.Id;
        data.orgtypeid_link = 5;
        data.orgrootid_link = 0;
        data.status = 1;

        params.data = data;
        params.msgtype = "PROVIDER_CREATE";
        params.message = "Tạo nhà cung cấp";

        GSmartApp.Ajax.post('/api/v1/orgmenu/createOrg', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },
                            fn: function(){
                                if (data.id == 0) {
                                    if(viewMain)
                                    viewMain.getStore().load();
                                }
                                if(thisBtn.itemId=='btnLuu')
                                    me.Id = response.id;
                                if(thisBtn.itemId=='btnLuuVaTaoMoi')
                                    me.Id = 0;
                                m.redirectTo("lsprovider/" + me.Id + "/edit");
                            }
                        });

                        
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Lưu thất bại',
                            msg: response.message,
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
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
    },
    Luu:function(thisBtn){
        // Thông tin Tên hoặc Tên tắt bị trùng, Có tiếp tục lưu không?
        var m = this;
        var me = this.getView();
        var code = me.down('#code').getValue();
        var name = me.down('#name').getValue();
        if(code == name){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Thông tin Tên và Tên tắt bị trùng, Có tiếp tục lưu không?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                buttonText: {
                    yes: 'Có',
                    no: 'Không'
                },
                fn: function (btn) {
                    if (btn === 'no') {
                        me.down('#code').focus();
                    }else{
                        m.onLuu(thisBtn);
                    }
                }
            });
        }else{
            m.onLuu(thisBtn);
        }
    },
    onQuayLai: function () {
        var me = this.getView();
        //me.getForm().reset();
        this.redirectTo('lsprovider');
    },
    onLoadData: function (id, type) {
        var me = this;
        var viewMain = Ext.getCmp('ProviderView');
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