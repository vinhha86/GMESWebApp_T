Ext.define('GSmartApp.view.groupuser.GroupUser_List_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.GroupUser_List_Controller',
    init: function () {
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('GroupUserStore');
        store.loadStore();
    },
    control: {
        '#txtThemMoi': {
            specialkey: 'onSpecialkey'
        },
        '#btnThemMoi': {
            click: 'onCreate'
        },
        '#GroupUser_List' :{
            select: 'OnloadMenu'
        }
    },
    onSpecialkey: function (field, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.onCreate();
        }
    },
    CheckValidate: function () {
        var me = this.getView();
        var mes = "";
        if (me.down('#txtThemMoi').getValue() == "") {
            mes = "Bạn chưa nhập tên nhóm quyền";
            return mes;
        }

        var store = this.getViewModel().getStore('GroupUserStore');
        var rec = store.find('name',me.down('#txtThemMoi').getValue());
        if(rec != -1){
            mes = "Tên nhóm quyền đã tồn tại ở dòng "+ (rec+1);
        }

        return mes;
    },
    onCreate: function () {
        var me = this;
        var mes = me.CheckValidate();
        var viewModel = this.getViewModel();
        if (mes == "") {
            me.getView().setLoading("Đang lưu dữ liệu");
            var params = new Object();
            var data = new Object();
            data.id = null;
            data.name = me.getView().down('#txtThemMoi').getValue();
            data.name_en = "";
            params.data = data;

            GSmartApp.Ajax.post('/api/v1/approle/create', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: "Lưu thành công",
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                },
                                fn: function () {
                                    var store = viewModel.getStore('GroupUserStore');
                                    store.load({
                                        callback: function(){
                                            var rec = store.find('id',response.data.id);
                                            me.getView().getSelectionModel().select(rec);
                                        }
                                    });
                                    me.getView().down('#txtThemMoi').reset();
                                }
                            });
                        }
                    } else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Lưu thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                    me.getView().setLoading(false);
                })
        }
        else {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: mes,
                buttons: Ext.Msg.YES,
                buttonText: {
                    yes: 'OK'
                },
                fn: function (btn) {
                    if (btn === 'yes') {
                        me.getView().down('#txtThemMoi').focus();
                    }
                }
            });
        }


    },
    onUpdate: function(editor, context, e){
        var viewmodel  = this.getViewModel();
        var data = context.record.data;
        var params = new Object();
        params.data = data;

        GSmartApp.Ajax.post('/api/v1/approle/create', Ext.JSON.encode(params),
           function (success, response, options) {
               if (success) {
                   var response = Ext.decode(response.responseText);
                   if (response.respcode != 200) {
                       Ext.Msg.show({
                           title: "Thông báo",
                           msg: 'Lưu thất bại',
                           buttons: Ext.Msg.YES,
                           buttonText: {
                               yes: 'OK'
                           }
                       });
                   }
                   else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: 'Cập nhật thành công',
                        buttons: Ext.Msg.YES,
                        buttonText: {
                            yes: 'OK'
                        },
                        fn: function(){
                            var store = viewmodel.getStore('GroupUserStore');
                        store.commitChanges();
                        }
                    });
                   }
               }
           })
   },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var name = rec.get('name');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa nhóm quyền "' + name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    var params = new Object();
                    params.id = id;
                    GSmartApp.Ajax.post('/api/v1/approle/delete', Ext.JSON.encode(params),
                    function (success, response, options) {
                        if (success) {
                            var response = Ext.decode(response.responseText);
                            if (response.respcode != 200) {
                                Ext.Msg.show({
                                    title: "Thông báo",
                                    msg: 'Xóa thất bại',
                                    buttons: Ext.Msg.YES,
                                    buttonText: {
                                        yes: 'OK'
                                    }
                                });
                            }
                            else {
                             Ext.Msg.show({
                                 title: "Thông báo",
                                 msg: 'Xóa thành công',
                                 buttons: Ext.Msg.YES,
                                 buttonText: {
                                     yes: 'OK'
                                 },
                                 fn: function(){
                                     var store = grid.getStore('');
                                     store.remove(rec);
                                 }
                             });
                            }
                        }
                    })
                }
            }
        });
    },
    OnloadMenu: function(grid, record, index, eOpts){
        var viewmodel = this.getViewModel();
        var storemenu = viewmodel.getStore('MenuStore');
        var storeFunction = viewmodel.getStore('FunctionStore');
        viewmodel.set('roleid_link', record.data.id);
        storemenu.loadStore_byrole(record.data.id);
        storeFunction.loadStore_byrole(record.data.id, viewmodel.get('menuid_link'));
    }
})