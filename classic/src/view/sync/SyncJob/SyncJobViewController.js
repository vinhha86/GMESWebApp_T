Ext.define('GSmartApp.view.sync.SyncJob.SyncJobViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SyncJobViewController',
    init: function () {

    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#btnReload': {
            click: 'onReload'
        }
    },
    onEdit: function (editor, context, e) {
        var me = this;
        if (context.value == context.originalValue) return;

        var data = context.record;
        me.UpdateJob(data);
    },
    onMenu: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var isPlay = record.get('status') == 0 ? false : true;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            minWidth: 150,
            viewModel: {},
            items: [
                {
                    text: 'Tạm dừng',
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-pause violetIcon',
                    hidden: !isPlay,
                    handler: function () {
                        record.set('status', 0);
                        me.UpdateJob(record);
                    }
                },
                '-',
                {
                    text: 'Chạy lịch',
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-play violetIcon',
                    hidden: isPlay,
                    handler: function () {
                        record.set('status', 1);
                        me.UpdateJob(record);
                    }
                }
            ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX() - 10, e.getY() - 10];
        e.stopEvent();
        menu_grid.showAt(position);
        common.Check_Menu_Permission(menu_grid);
    },
    UpdateJob: function (record) {
        var viewmodel = this.getViewModel();
        var params = new Object();
        params = record.data;

        GSmartApp.Ajax.post_demo('sync/update_syncjob', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var store = viewmodel.getStore('SyncJobStore');
                        store.load();
                    }
                    else {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            f: function () {
                                var store = viewmodel.getStore('SyncJobStore');
                                store.load();
                            }
                        });
                    }
                }
                else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Có lỗi trong quá trình xử lý dữ liệu",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        },
                        f: function () {
                            var store = viewmodel.getStore('SyncJobStore');
                            store.load();
                        }
                    });
                }
            })
    },
    onReload: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('SyncJobStore');
        store.load();
    },
    onThemMoi: function () {
        var viewmodel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            height: 450,
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Tạo lịch đồng bộ',
            closeAction: 'destroy',
            width: 600,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'CreatedJobView'
            }]
        });
        form.show();

        form.down('#CreatedJobView').on('ThanhCong', function () {
            var store = viewmodel.getStore('SyncJobStore');
            store.load();
            form.close();
        })
    }
})