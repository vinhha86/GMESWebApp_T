Ext.define('GSmartApp.view.sync.Folder.FolderLocalViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FolderLocalViewController',
    init: function () {
        // var viewmodel = this.getViewModel();
        // var store = viewmodel.getStore('FolderTreeStore');
        // var path = viewmodel.get('pathLocal');
        // store.loadFolderLocal(path);
    },
    control: {
        'FolderLocalView': {
            itemdblclick: 'onEntryFolder',
            select: 'onSelectFolder',
            deselect: 'onDeselectFolder'
        },
        '#textpathLocal': {
            specialkey: 'onSpecialkey'
        },
        '#btnUpload': {
            click: 'onUpload'
        },
        '#btnReload': {
            click: 'onReload'
        }
    },
    listen: {
        store: {
            'FolderTreeStore': {
                'loadFolderLocalSuccess': 'onloadFolderLocalSuccess'
            }
        }

    },
    onCreatedJob: function (grid, rowIndex, colIndex, item, e, record) {
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
                xtype: 'CreatedJobView',
                viewModel: {
                    data: {
                        src_path: record.get('Path'),
                        des_path: "{driver}:" + viewmodel.get('pathDriver')
                    }
                }
            }]
        });
        form.show();

        form.down('#CreatedJobView').on('ThanhCong', function () {
            form.close();
        })
    },
    onReload: function () {
        var viewmodel = this.getViewModel();
        var storeLocal = viewmodel.getStore('FolderTreeStore');
        var pathLocal = viewmodel.get('pathLocal');
        storeLocal.loadFolderLocal(pathLocal);
    },
    onSelectFolder: function (grid, record, index, eOpts) {
        var viewmodel = this.getViewModel();
        viewmodel.set('pathLocal', record.get('Path'));
    },
    onDeselectFolder: function (grid, record, index, eOpts) {
        var viewmodel = this.getViewModel();
        var path = viewmodel.get('pathLocal');
        var lst = path.split('/');
        path = "";
        for (var i = 0; i < lst.length - 2; i++) {
            path += lst[i] + "/";
        }

        viewmodel.set('pathLocal', path);
    },
    onSpecialkey: function (field, e) {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('FolderTreeStore');
        if (e.getKey() == e.ENTER) {
            var value = field.getValue();
            if (!value.includes("/"))
                value += "/";
            store.loadFolderLocal(value);
        }
    },
    onloadFolderLocalSuccess: function (path) {
        var viewmodel = this.getViewModel();
        viewmodel.set('pathLocal', path);
    },
    onEntryFolder: function (grid, record, item, index, e, eOpts) {
        if (record.get('IsDir')) {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('FolderTreeStore');
            var path = record.get('Path');
            if (path == "..") {
                var currentPath = viewmodel.get('pathLocal');
                var lst = currentPath.split('/');
                path = "";
                if (lst.length > 2) {
                    for (var i = 0; i < lst.length - 2; i++) {
                        path += lst[i] + "/";
                    }
                }
            }
            store.loadFolderLocal(path);
        }
    },
    onUpload: function () {
        var me = this;
        var grid = this.getView();

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('FolderTreeStore');
        if (store.data.length == 1) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Thư mục gốc không có File bạn hãy chọn lại thư mục',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
        else {
            var params = new Object();
            params.srcFs = viewmodel.get('pathLocal');
            params.desFs = viewmodel.get('pathDriver');

            GSmartApp.Ajax.post_demo('sync/copyfolder_to_driver', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: "Thêm thành công",
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                },
                                fn: function () {
                                    var storeDriver = viewmodel.getStore('FolderDriverStore');
                                    storeDriver.loadFolderDriver(viewmodel.get('pathDriver'));

                                    var taskid = response.data;
                                    var tab = grid.up('#FolderMainView').up('#SyncView');
                                    tab.setActiveTab(1);

                                    me.fireEvent('ReloadTask', taskid);
                                }
                            });
                        }
                        else {
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng'
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
                            }
                        });
                    }
                })
        }
    }
})