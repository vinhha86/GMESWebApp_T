Ext.define('GSmartApp.view.pcontract.PContract_FOB_Price_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_FOB_Price_ViewModel',
    requires: ['GSmartApp.store.fobprice.fobpricestore'],
	stores: {
        PriceStore: {
            type: 'fobpricestore'
        }
    }
})