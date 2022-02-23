Ext.define('GSmartApp.view.groupuser.GroupUser_Function_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.GroupUser_Function_Controller',
    init: function () {

    },
    control: {
        '#checkcolumn': {
            checkchange: 'onCheckChange'
        },
        '#checkcolumn_readonly': {
            checkchange: 'onCheckChange'
        }
    },
    onCheckChange: function (grid, rowIndex, checked, record, e, eOpts) {
        var viewModel = this.getViewModel();
        var params = new Object();
        params.roleid_link = viewModel.get('roleid_link');
        params.functionid_link = record.data.id;
        params.checked = record.data.checked;
        params.ishidden = false;
        params.isreadonly = record.data.readonly;

        GSmartApp.Ajax.post('/api/v1/approle/create_role_function', Ext.JSON.encode(params),
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
                        var store = viewModel.getStore('FunctionStore');
                        store.commitChanges();
                    }
                }
            })
    }
})