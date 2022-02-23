Ext.define('GSmartApp.view.RFID.demoRFID.inv.inv_detail_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.inv_detail_ViewController',
    init: function () {

    },
    control: {

    },
    onViewBarcode: function (grid, rowIndex, colIndex, item, e, record) {
        var form = Ext.create('Ext.window.Window', {
            height: 270,
            width: 230,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'QR Code',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'ViewQrcode',
                viewModel: {
                    data: {
                        epc: record.get('epc'),
                        typeView: 1
                    }
                }
            }]
        });

        form.show();
    },
    onFilterCodeKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('inv_detail_store');
        var filterField = this.lookupReference('filtercode'),
            filters = store.getFilters();

        if (filterField.value) {
            this.filtercode = filters.add({
                id: 'filtercode',
                property: 'prodcode',
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
        var store = viewmodel.get('inv_detail_store');
        var filterField = this.lookupReference('filtername'),
            filters = store.getFilters();

        if (filterField.value) {
            this.filtername = filters.add({
                id: 'filtername',
                property: 'prodname',
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
    onFilterLotKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('inv_detail_store');
        var filterField = this.lookupReference('filterlot'),
            filters = store.getFilters();

        if (filterField.value) {
            this.filterlot = filters.add({
                id: 'filterlot',
                property: 'lot',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.filterlot) {
            filters.remove(this.filterlot);
            this.filterlot = null;
        }
    }
})