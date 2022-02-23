Ext.define('GSmartApp.view.RFID.demoRFID.inv.inv_viewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.inv_viewController',
    init: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('inv_store');
        store.loadStore();
    },
    control: {
        '#btnAddInv': {
            click: 'onAddInv'
        },
        'inv_view': {
            itemclick: 'onSelectInv'
        }
    },
    onSelectInv: function (grid, record, item, index, e, eOpts) {
        var viewmodel = this.getViewModel();
        viewmodel.set('inv', record.data);

        var storeItem = viewmodel.getStore('inv_detail_store');
        storeItem.loadItemInStore(record.get('id'));
    },
    onFilterCodeKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('inv_store');
        var filterField = this.lookupReference('filtercode'),
            filters = store.getFilters();

        if (filterField.value) {
            this.filtercode = filters.add({
                id: 'filtercode',
                property: 'codename',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.filtercode) {
            filters.remove(this.filtercode);
            this.filtercode = null;
        }
    },
    onFilterNameKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('inv_store');
        var filterField = this.lookupReference('filtername'),
            filters = store.getFilters();

        if (filterField.value) {
            this.filtername = filters.add({
                id: 'filtername',
                property: 'storename',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.filtername) {
            filters.remove(this.filtername);
            this.filtername = null;
        }
    },
    onAddInv: function () {
        var viewmodel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            height: 250,
            width: 400,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thêm mới kho',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'inv_create_View',
                viewModel: {
                    data: {
                        inv: {
                            id: null
                        }
                    }
                }
            }]
        });

        form.show();

        form.down('#inv_create_View').getController().on('Thoat', function () {
            form.close();
        });

        form.down('#inv_create_View').on('Create', function () {
            var store = viewmodel.getStore('inv_store');
            store.load();
            form.close();
        });
    }
})