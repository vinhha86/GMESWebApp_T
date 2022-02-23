Ext.define('GSmartApp.view.salebill.SalebillCreateViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.SalebillCreateViewModel',
	requires: ['GSmartApp.store.org.ListOrgStore', 'GSmartApp.store.salebill.SalebillDetailStore', 'GSmartApp.store.salebill.SalebillDetailEpcStore'],
	stores: {
		SalebillDetailStore: {
			type: 'SalebillDetailStore'
		},
		SalebillDetailEpcStore: {
			type: 'SalebillDetailEpcStore'
		}
	},
	data: {
		btnplus: true,
		isbtnclose: false,
		isAddnew: true,
		invoice_id: null,
		IsformMaster: false,
		clsbtn: 'red-button',
		clsbtnStart: 'blue-button',
		clsbtnStop: '',
		isStart: false,
		isTabEpc: true,

		bill: {
			salename: '',
			id: null
		},
		channel: null,
		sendChannel: null,
		list_epc: new Map()
	},
})