Ext.define('GSmartApp.view.users.UserDetail_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.UserDetail_Controller',
    init: function () {

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
            click: 'onUpdate'
        }
    },
    onQuayLai: function(){
        this.redirectTo("lsusers");
    },
    onLoadData:function(id,type){
        var viewModel = this.getViewModel();
        this.getInfo(id);

        var GroupUserStore = viewModel.getStore('GroupUserStore');
        var sorters = [{
            property: 'checked',
            direction: 'DESC'
        }]
        GroupUserStore.sorter =sorters;
        GroupUserStore.loadStore_byuser(id);

        viewModel.set('userid_link',id);
        var GpayUserFactory = viewModel.getStore('GpayUserFactory');
        var listtypefactory = [13,8,4];
        GpayUserFactory.loadStore(id, listtypefactory);
        GpayUserFactory.load();

        var GpayUserVendor = viewModel.getStore('GpayUserVendor');
        var listtypevendor = [11];
        GpayUserVendor.loadStore(id, listtypevendor);
        GpayUserVendor.load();

        var GpayUserBuyer = viewModel.getStore('GpayUserBuyer');
        var listtypebuyer = [12];
        GpayUserBuyer.loadStore(id, listtypebuyer);
        GpayUserBuyer.load();
    },
    getInfo: function (id) {
        var viewModel = this.getViewModel();
        var params = new Object();
        params.id = id;

        GSmartApp.Ajax.post('/api/v1/users/user_getinfo', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                       viewModel.set('User', response.data);
                       var grantStore = viewModel.getStore('OrgGrantStore');
                        var parentid_link = viewModel.get('User.orgid_link');
                        grantStore.getbyParent(parentid_link);
                    }
                }
            })
    },
    onUpdate: function(){
        var grid = this.getView();
        grid.setLoading('Đang lưu dữ liệu');
        var me = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        var user = new Object();
        user = viewModel.get('User');
        user.personnel_code=viewModel.get('User.personnel_code') == "" ? null : viewModel.get('User.personnel_code') ;
        params.user = user;

        delete params.user.authorities;
        
        
        GSmartApp.Ajax.post('/api/v1/users/user_update', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    console.log(response);
                    if (response.respcode == 200) {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: "Lưu thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },
                            fn: function(){
                                if(0 == viewModel.get('User.status')){
                                    me.onQuayLai();
                                }
                            }
                        });
                    }
                    else{
                        var mes = response.message == null ? "Lưu thất bại" : response.message;
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: mes,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                }
            })
    },
    onXoa_OrgView: function(grid, rowIndex, colIndex){
        var me = this.getView();
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa phân xưởng?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.setLoading("Đang xóa dữ liệu");
                    var params = new Object();
                    params.id = id;

                    GSmartApp.Ajax.post('/api/v1/users/user_orgview_delete', Ext.JSON.encode(params),
                    function (success, response, options) {
                        me.setLoading(false);
                        var response = Ext.decode(response.responseText);
                        if (success) {
                            grid.getStore().reload();
                        } else {
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                    })
                }
            }
        });
    },
    onAdd_OrgFactoryView: function(){
        var viewmodel = this.getViewModel();
        if (null != viewmodel.get('userid_link')){
            var form = Ext.create('Ext.window.Window', {
                height: 400,
                closable: true,
                title: 'Thêm phân xưởng',
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
                    xtype: 'User_OrgView_Add',
                    viewModel: {
                        data: {
                            userid_link: viewmodel.get('userid_link'),
                            orgtypeid_link: 13,
                            orgtypeid_link_list: '4,8,13',
                        }
                    }
                }]
            });
            form.show();

            form.down('#User_OrgView_Add').getController().on('AcceptSuccess', function () {
                var store = viewmodel.getStore('GpayUserFactory');
                store.load();
                form.close();
            })
        }
    },
    onAdd_OrgVendorView: function(){
        var viewmodel = this.getViewModel();
        if (null != viewmodel.get('userid_link')){
            var form = Ext.create('Ext.window.Window', {
                height: 400,
                closable: true,
                title: 'Thêm Vendor',
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
                    xtype: 'User_OrgView_Add',
                    viewModel: {
                        data: {
                            userid_link: viewmodel.get('userid_link'),
                            orgtypeid_link: 11
                        }
                    }
                }]
            });
            form.show();

            form.down('#User_OrgView_Add').getController().on('AcceptSuccess', function () {
                var store = viewmodel.getStore('GpayUserVendor');
                store.load();
                form.close();
            })
        }
    },
    onAdd_OrgBuyerView: function(){
        var viewmodel = this.getViewModel();
        if (null != viewmodel.get('userid_link')){
            var form = Ext.create('Ext.window.Window', {
                height: 400,
                closable: true,
                title: 'Thêm Buyer',
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
                    xtype: 'User_OrgView_Add',
                    viewModel: {
                        data: {
                            userid_link: viewmodel.get('userid_link'),
                            orgtypeid_link: 12
                        }
                    }
                }]
            });
            form.show();

            form.down('#User_OrgView_Add').getController().on('AcceptSuccess', function () {
                var store = viewmodel.getStore('GpayUserBuyer');
                store.load();
                form.close();
            })
        }
    },
})