Ext.define('GSmartApp.store.sync.FolderTreeStore', {
    extend: 'Ext.data.Store',
    storeId: 'FolderTreeStore',
    alias: 'store.FolderTreeStore',
    fields: [
        'ID',
        { name: 'Name', type: 'string' },
        'Size',
        'IsDir', 'MimeType',
        {
            name: 'ModTime', type: 'date', format: 'c'
        }, 'Path'
    ],
    sorters: [{
        property: 'IsDir',
        direction: 'DESC'
    }, {
        property: 'Name',
        direction: 'ASC'
    }],
    loadFolderDriver: function (folderName) {
        var params = new Object();
        params.name = folderName;

        this.setProxy({
            type: 'ajax',
            //url: config.getBack() + 'menuperm',
            url: config.getAppBaseUrl_demo() + 'sync/getfolder_driver',
            actionMethods: {
                read: 'POST'
            },
            extraParams: params,
            paramsAsJson: true,
            noCache: false,
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            timeout: 60000,
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        });
        this.load({
            callback: function (records, operation, success) {
                if (folderName != "") {
                    this.insert(0,
                        new Object({
                            Name: "..",
                            Size: 0,
                            IsDir: true,
                            Path: ".."
                        })
                    );
                }
                this.fireEvent('loadFolderDriverSuccess', folderName);
            }
        });
    },
    loadFolderLocal: function (folderName) {
        var params = new Object();
        params.name = folderName;

        this.setProxy({
            type: 'ajax',
            //url: config.getBack() + 'menuperm',
            url: config.getAppBaseUrl_demo() + 'sync/getfolder_local',
            actionMethods: {
                read: 'POST'
            },
            extraParams: params,
            paramsAsJson: true,
            noCache: false,
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            timeout: 60000,
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        });
        this.load({
            callback: function (records, operation, success) {
                if (folderName.split("/").length > 2) {
                    this.insert(0,
                        new Object({
                            Name: "..",
                            Size: 0,
                            IsDir: true,
                            Path: ".."
                        })
                    );
                }
                this.fireEvent('loadFolderLocalSuccess', folderName);
            }
        });
    }
});