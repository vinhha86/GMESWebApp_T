Ext.define('GSmartApp.view.fobprice.FOBPriceViewViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.FOBPriceViewViewModel',
    requires: ['GSmartApp.store.fobprice.fobpricestore'],
	stores: {
        PriceStore: {
            type: 'fobpricestore'
        }
    },
    data: {
        
    }
})