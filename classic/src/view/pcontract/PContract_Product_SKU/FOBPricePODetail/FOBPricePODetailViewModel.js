Ext.define('GSmartApp.view.pcontract.FOBPricePODetailViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.FOBPricePODetailViewModel',
    requires: [
        'GSmartApp.store.FOBPricePODetailStore',
        'GSmartApp.store.unit.UnitStore'
    ],
	stores: {
        FOBPricePODetailStore: {
            type: 'FOBPricePODetailStore'
        },
        UnitStore: {
            type: 'UnitStore'
        }
    },
    data: {
        record: null
    }
})