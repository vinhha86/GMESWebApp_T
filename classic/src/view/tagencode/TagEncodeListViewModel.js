Ext.define('GSmartApp.view.tagencode.TagEncodeListViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.tagencodelist',
	requires:['GSmartApp.store.TagEncodeListStore'],
	stores: {
        TagEncodeListStore: {
            type: 'tagencodeliststore'
        }
    },
	data: {
        type: 1,
		urlback:'',
		clsbtn:'red-button',
		clsbtnStart:'blue-button',
		clsbtnStop:'',
		isStart:false,
		tagnumber:0
    }
})