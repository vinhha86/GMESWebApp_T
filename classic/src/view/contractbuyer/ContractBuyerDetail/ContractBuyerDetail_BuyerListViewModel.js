Ext.define('GSmartApp.view.contractbuyer.ContractBuyerDetail.ContractBuyerDetail_BuyerListViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ContractBuyerDetail_BuyerListViewModel',
    requires: [
        'GSmartApp.store.FOBPricePODetailStore',
    ],
	stores: {
        ListEndBuyer:{
            type : 'ListOrgStore'
        },
    },
    data: {
        
    }
})