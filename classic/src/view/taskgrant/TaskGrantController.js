Ext.define('GSmartApp.view.taskgrant.TaskGrantController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TaskGrantController',
    isActivate: false,
    init: function () {
        this.onloadPage();
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#TaskGrant':{
            itemdblclick :'onitemdblclick'
        },
    },
    onThemMoi: function(){
        var viewModel = this.getViewModel();
        var me = this.getView();
        var form = Ext.create('Ext.window.Window', {
            // height: 250,
            width: 400,
            closable: true,
            title: 'Thêm mới người phụ trách',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'TaskGrantForm',
                viewModel: {
                    data: {
                        id: 0,
                        isOrgCbBoxReadonly: false,
                        isTasktypeCbBoxReadonly: false,
                    }
                },
            }]
        });
        form.show();
    },
    onitemdblclick: function(m, record, item, index, e, eOpts){
        console.log(record);
        var viewModel = this.getViewModel();
        var me = this.getView();
        var form = Ext.create('Ext.window.Window', {
            // height: 250,
            width: 400,
            closable: true,
            title: 'Thay đổi người phụ trách',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'TaskGrantForm',
                viewModel: {
                    data: {
                        id: record.data.id,
                        orgid_link: record.data.orgid_link,
                        tasktypeid_link: record.data.tasktypeid_link,
                        userid_link: record.data.userid_link,
                        isOrgCbBoxReadonly: true,
                        isTasktypeCbBoxReadonly: true,
                    }
                },
            }]
        });
        form.show();
    },
    onloadPage: function () {
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var TaskGrantStore = viewmodel.getStore('TaskGrantStore');
        TaskGrantStore.loadStore();
        TaskGrantStore.sort('taskName', 'ASC');
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Xoa(id);
                }
            }
        });
    },
    Xoa: function (id) {
        var me = this.getView();
        me.setLoading("Đang xóa dữ liệu");
        var params = new Object();
        params.id = id;

        GSmartApp.Ajax.post('/api/v1/taskgrant/delete', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Xóa thành công",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });

                    var store = me.getStore();
                    store.load();
                } else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Xóa thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
    },
})