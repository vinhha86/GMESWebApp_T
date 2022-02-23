Ext.define('GSmartApp.view.shipmode.ShipModeViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ShipModeViewModel',
    requires: ['GSmartApp.store.category.ShipModeStore'],
	stores: {
        ShipModeStore: {
            type: 'ShipModeStore'
        }
    }
})