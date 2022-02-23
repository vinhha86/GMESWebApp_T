Ext.define('GSmartApp.view.Port.PortDetailViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PortDetailViewCotroller',
    Id: 0,
    init: function () {
        var me = this.getView();
        var viewmodel = me.getViewModel();
        viewmodel.getStore('ShipModeStore').loadStore();
        viewmodel.getStore('ShipModeStore').getSorters().add('name');
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
        var viewMain = Ext.getCmp('PortView');
        var m = this;
        var me = this.getView();
        me.setLoading("Đang lưu dữ liệu");

        var viewModel = this.getViewModel();

        var params = new Object();
        var data = new Object();
        data = viewModel.get('currentRec');
        data.id = this.Id;

        params.data = data;
        params.msgtype = "PORT_CREATE";
        params.message = "Tạo cảng";

        GSmartApp.Ajax.post('/api/v1/categoty/createPort', Ext.JSON.encode(params),
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
                            }
                        });

                        if (data.id == 0) {
                            if(viewMain)
                            viewMain.getStore().load();
                        }
                        if(thisBtn.itemId=='btnLuu')
                            me.Id = response.id;
                        if(thisBtn.itemId=='btnLuuVaTaoMoi')
                            me.Id = 0;
                        m.redirectTo("port/" + me.Id + "/edit");
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
        this.redirectTo('port');
    },
    onLoadData: function (id, type) {
        var me = this;
        var viewMain = Ext.getCmp('PortView');
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
        GSmartApp.Ajax.post('/api/v1/categoty/getPortById', Ext.JSON.encode(params),
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