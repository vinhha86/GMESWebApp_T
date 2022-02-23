Ext.define('GSmartApp.view.pcontracttype.PContractTypeViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContractTypeViewModel',
    requires: ['GSmartApp.store.ContractTypeStore'],
	stores: {
        ContractTypeStore: {
            type: 'ContractTypeStore'
        }
    }
})