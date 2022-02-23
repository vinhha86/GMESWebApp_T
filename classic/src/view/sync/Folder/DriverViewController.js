Ext.define('GSmartApp.view.sync.Folder.DriverViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DriverViewController',
    init: function () {
        // var viewmodel = this.getViewModel();
        // var store = viewmodel.getStore('FolderDriverStore');
        // store.loadFolderDriver("");

    },
    control: {
        'DriverView': {
            itemdblclick: 'onEntryFolder',
            select: 'onSelectFolder',
            deselect: 'onDeselectFolder'
        },
        '#btnReload': {
            click: 'onReload'
        },
        '#btnAddFolder': {
            click: 'onAddFolder'
        },
        '#btnSaveFolder': {
            click: 'onSaveFolder'
        }
    },
    listen: {
        store: {
            'FolderTreeStore': {
                'loadFolderDriverSuccess': 'onloadFolderDriverSuccess'
            }
        }
    },
    onSaveFolder: function () {
        var viewmodel = this.getViewModel();
        var params = new Object();
        var currentPath = viewmodel.get('pathDriver');
        if (currentPath != "") currentPath += "/";
        params.remote = currentPath + viewmodel.get('newFolder');
        GSmartApp.Ajax.post_demo('sync/create_folder', Ext.JSON.encode(params),
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
                            }
                        });
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
        viewmodel.set('isAddFolder', true);
    },
    onXoa: function (grid, rowIndex, colIndex, item, e, record) {
        var viewmodel = this.getViewModel();
        var path = record.get('Path');
        if (record.get('IsDir')) return;

        Ext.Msg.show({
            title: "Thông báo",
            msg: 'Bạn có chắc chắn muốn xóa file ?',
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    var params = new Object();
                    params.remote = path;

                    GSmartApp.Ajax.post_demo('sync/delete_file', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                var store = viewmodel.getStore('FolderDriverStore');
                                if (response.respcode == 200) {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: 'Xóa thành công',
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'OK'
                                        }
                                    });
                                    store.remove(record);
                                }
                                else {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: 'Xóa thất bại',
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'OK'
                                        }
                                    });
                                }
                            }
                        })
                }
            }
        });
    },
    onAddFolder: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('isAddFolder', false);
    },
    onReload: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('FolderDriverStore');
        store.loadFolderDriver(viewmodel.get('pathDriver'));
    },
    onloadFolderDriverSuccess: function (path) {
        var viewmodel = this.getViewModel();
        viewmodel.set('pathDriver', path);
    },
    onSelectFolder: function (grid, record, index, eOpts) {
        var viewmodel = this.getViewModel();
        viewmodel.set('pathDriver', record.get('Path'));
    },
    onDeselectFolder: function (grid, record, index, eOpts) {
        var viewmodel = this.getViewModel();
        var path = viewmodel.get('pathDriver');
        var lst = path.split('/');
        path = "";
        for (var i = 0; i < lst.length - 1; i++) {
            path += '/' + lst[i];
        }
        path = path.substr(1);

        viewmodel.set('pathDriver', path);
    },
    onEntryFolder: function (grid, record, item, index, e, eOpts) {
        if (record.get('IsDir')) {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('FolderDriverStore');
            var path = record.get('Path');
            if (path == "..") {
                var currentPath = viewmodel.get('pathDriver');
                var lst = currentPath.split('/');
                path = "";
                if (lst.length > 1) {
                    for (var i = 0; i < lst.length - 1; i++) {
                        path += "/" + lst[i];
                    }
                    path = path.substr(1);
                }
            }
            store.loadFolderDriver(path);

        }
    }
})