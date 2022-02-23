Ext.define('GSmartApp.view.TongHopBaoAn.TongHopBaoAnView_InfoDetail.TongHopBaoAnView_Info_DetailViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.TongHopBaoAnView_Info_DetailViewModel',
    requires: [
        'GSmartApp.store.TimeSheetLunch.TimeSheetLunchStore'
    ],
	stores:{
		TimeSheetLunchStore: {
            type: 'TimeSheetLunchStore'
        }
	},
	data: {
		orgid_link: null,
        date: null,
        location: null,
	},
})