Ext.define('GSmartApp.view.NCCprint.NCCprintDetailWindowViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.NCCprintDetailWindowViewController',
    Id: 0,
    init: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('OrgStore');
        var storeColor = viewmodel.getStore('ColorStore');
        console.log(storeColor.data.map);
        storeColor.loadStore();
        store.GetOrgByTypeId(20);
        store.sort('name', 'ASC');
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData'
            }
        }
    },
    control: {
        '#btnLuu': {
            click: 'Luu'
        },
        '#btnThoat': {
            click: 'onThoat'
        }
    },
    ///////
    CapNhat: function (params) {
        // console.log('CapNhat OK');
        console.log(params);
        let me = this.getView();
        GSmartApp.Ajax.post('/api/v1/orgmenu/createOrg', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    let store = me.getViewModel().getStore('OrgStore');
                    let storeColor =me.getViewModel().getStore('ColorStore');
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
                        store.GetOrgByTypeId(20);
                        store.sort('name', 'ASC');
                        storeColor.loadStore();
                    }
                } else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Lưu thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
     },
    //////
    Luu: function (thisBtn) {
        var viewMain = Ext.getCmp('NCCprintView');
        var m = this;
        var me = this.getView();
        me.setLoading("Đang lưu dữ liệu");

        var viewModel = this.getViewModel();

        var params = new Object();
        var data = new Object();
        data = viewModel.get('currentRec');
        data.id = this.Id;
        data.orgtypeid_link = 20;
        data.status = 1;
        console.log(data);

        params.data = data;
        params.msgtype = "VENDOR_CREATE";
        params.message = "Tạo vendor";

        GSmartApp.Ajax.post('/api/v1/orgmenu/createOrg', Ext.JSON.encode(params),
        function (success, response, options) {
            if (success) {
                // let store = me.getViewModel().getStore('OrgStore');
                // let storeColor =me.getViewModel().getStore('ColorStore');
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
                            m.fireEvent('Add', response.data);
                        }
                    });
                    //  store.GetOrgByTypeId(20);
                    //  store.sort('name', 'ASC');
                    //  storeColor.loadStore();
                    // var viewMain = Ext.getCmp('NCCprintViewController');
                    // store.GetOrgByTypeId(20);
                    // store.sort('name', 'ASC');
                    // storeColor.loadStore();
                    // var viewMain = Ext.getCmp('NCCprintView');
                    // viewMain.onloadPage();
                    // me.up('window').close();
                    // storeColor.loadStore();
                    // store.GetOrgByTypeId(20);
                    //  store.sort('name', 'ASC');
                    // this.redirectTo('lsintheu');

                }
            } else {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Lưu thất bại",
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
            }
            me.setLoading(false);
        })
    },
    // Luu:function(thisBtn){
    //     // Thông tin Tên hoặc Tên tắt bị trùng, Có tiếp tục lưu không?
    //     var m = this;
    //     var me = this.getView();
    //     var code = me.down('#code').getValue();
    //     var name = me.down('#name').getValue();
    //     if(code == name){
    //         Ext.Msg.show({
    //             title: 'Thông báo',
    //             msg: 'Thông tin Tên và Tên tắt bị trùng, Có tiếp tục lưu không?',
    //             buttons: Ext.Msg.YESNO,
    //             icon: Ext.Msg.QUESTION,
    //             buttonText: {
    //                 yes: 'Có',
    //                 no: 'Không'
    //             },
    //             fn: function (btn) {
    //                 if (btn === 'no') {
    //                     me.down('#code').focus();
    //                 }else{
    //                     m.onLuu(thisBtn);
    //                 }
    //             }
    //         });
    //     }else{
    //         m.onLuu(thisBtn);
    //     }
    // },
    onThoat: function () {
        var me = this.getView();
        let store = me.getViewModel().getStore('OrgStore');
        let storeColor =me.getViewModel().getStore('ColorStore');
        store.GetOrgByTypeId(20);
        store.sort('name', 'ASC');
        storeColor.loadStore();
        this.getView().up('window').close();
    },
    // onQuayLai: function () {
    //     var me = this.getView();
    //     //me.getForm().reset();
    //     this.redirectTo('lsintheu');
    // },
    onLoadData: function (id, type) {
        var me = this;
        var viewMain = Ext.getCmp('NCCprintView');
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