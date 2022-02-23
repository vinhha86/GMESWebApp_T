Ext.define('GSmartApp.view.invcheck.InvCheckList_M_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.InvCheckList_M_ViewModel',
    stores:{
        InvCheckListStore: {
            type: 'InvCheckListStore'
        },
        ListOrgStore:{
            type: 'ListOrgStore'
        },
        InvCheckStatusStore:{
            type: 'InvCheckStatusStore'
        }        
    },
	data: {
        type: 1,
		urlback:''
    },
})