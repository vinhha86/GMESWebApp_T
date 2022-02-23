Ext.define('GSmartApp.view.groupuser.GroupUser_Menu_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.GroupUser_Menu_Controller',
    init: function () {
        // var viewModel = this.getViewModel();
        // var store = viewModel.getStore('MenuStore');
        // store.loadStore_byrole(0);
    },
    control: {
        '#GroupUser_Menu': {
            checkchange: 'onCheckChange',
            itemclick: 'onloadFunction'
        }
    },
    onCheckChange: function(node, checked, e, eOpts ){
        var viewModel = this.getViewModel();
        var params = new Object();
        params.menuid_link = node.data.id;
        params.roleid_link = viewModel.get('roleid_link');
        params.checked = checked;

        GSmartApp.Ajax.post('/api/v1/approle/create_role_menu', Ext.JSON.encode(params),
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
                 var store = viewModel.getStore('MenuStore');
                 store.loadStore_byrole(params.roleid_link);
                }
            }
        })
    },
    onloadFunction: function( grid, record, item, index, e, eOpts){
        this.getViewModel().set('menuid_link', record.data.id);
        var funcStore = this.getViewModel().getStore('FunctionStore');
        funcStore.loadStore_byrole(this.getViewModel().get('roleid_link'), record.data.id);
    }
})