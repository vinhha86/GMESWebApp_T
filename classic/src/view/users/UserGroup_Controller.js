Ext.define('GSmartApp.view.users.UserGroup_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.UserGroup_Controller',
    init: function () {

    },
    control: {
        '#UserGroup': {
            select: 'OnloadMenu'
        },
        '#checkcolumn': {
            checkchange: 'onCheckChange',
            beforecheckchange: 'onbefore'
        }
    },
    OnloadMenu: function (grid, record, index, eOpts) {
        var viewmodel = this.getViewModel();
        var storemenu = viewmodel.getStore('MenuStore');
        var storeFunction = viewmodel.getStore('FunctionStore');
        viewmodel.set('roleid_link', record.data.id);
        storemenu.loadStore_inrole(record.data.id);
        storeFunction.loadStore_inrole(record.data.id, viewmodel.get('menuid_link'));
    },
    onbefore: function (grid, rowIndex, checked, record, e, eOpts) {
        var mes = "";
        var viewModel = this.getViewModel();
        var user = viewModel.get('User');
        if (checked)
            mes = "Bạn có muốn phân quyền " + record.data.name + " cho tài khoản " + user.username;
        else
            mes = "Bạn có muốn hủy phân quyền " + record.data.name + " cho tài khoản " + user.username;
        Ext.Msg.show({
            title: "Thông báo",
            msg: mes,
            buttons: Ext.Msg.YESNO,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'no') {
                    record.set('checked', !checked)
                }
                else {
                    var params = new Object();
                    params.roleid_link = record.data.id;
                    params.userid = viewModel.get('User.id');
                    params.checked = checked;

                    GSmartApp.Ajax.post('/api/v1/users/user_updaterole', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                var store = viewModel.getStore('GroupUserStore');
                                if (response.respcode != 200) {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: 'Lưu thất bại',
                                        buttons: Ext.Msg.YES,
                                        buttonText: {
                                            yes: 'OK'
                                        },
                                        fn: function () {
                                            store.load();
                                        }
                                    });
                                }
                                else {
                                    store.commitChanges();
                                }
                            }
                        })
                }
            }
        });
    },
    onCheckChange: function(){
        
    }
})