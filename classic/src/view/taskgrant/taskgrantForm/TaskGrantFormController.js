Ext.define('GSmartApp.view.taskgrant.TaskGrantFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TaskGrantFormController',
    init: function () {
        var viewmodel = this.getViewModel();
        var ListOrgStore = viewmodel.getStore('ListOrgStore');
        var TaskType = viewmodel.getStore('TaskType');
        ListOrgStore.loadStore(13);
        TaskType.loadStore();
        if(viewmodel.get('id') > 0){
            var UserListStore = viewmodel.getStore('UserListStore');
            UserListStore.loadUserbyOrg(viewmodel.get('orgid_link'));
        }
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onLuu'
        }
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onLuu: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();

        var id = viewmodel.get('id');
        var orgid_link = viewmodel.get('orgid_link');
        var tasktypeid_link = viewmodel.get('tasktypeid_link');
        var userid_link = viewmodel.get('userid_link');

        var params = new Object();
        var data = new Object();

        data.id = id;
        data.orgid_link = orgid_link;
        data.tasktypeid_link = tasktypeid_link;
        data.userid_link = userid_link;

        params.data = data;
        params.msgtype = "TASKGRANT_SAVE";
        params.message = "Lưu task grant";

        GSmartApp.Ajax.post('/api/v1/taskgrant/save', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var res = Ext.decode(response.responseText);
                    if (res.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: res.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        var mainView = Ext.getCmp('TaskGrant');
                        mainView.getStore().load();
                        me.up('window').close();
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })

    },
    onOrgChange: function ( cbbox, newValue, oldValue, eOpts ) {
        var viewmodel = this.getViewModel();
        var UserListStore = viewmodel.getStore('UserListStore');
        UserListStore.loadUserbyOrg(newValue);
    }
})