Ext.define('GSmartApp.view.markettype.MarketTypeViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.MarketTypeViewModel',
    requires: ['GSmartApp.store.market.MarketStore'],
	stores: {
        MarketStore: {
            type: 'MarketStore'
        }
    },
    data: {
        currentRec: null,
        oldName: null,
        newName: null,
        oldCode: null,
        newCode: null
    }
})