Ext.define('GSmartApp.view.invcheck.InvCheck_M_New_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.InvCheck_M_New_ViewModel',
    stores:{
        ListOrgStore:{
            type: 'ListOrgStore'
        },
        InvCheckStatusStore:{
            type: 'InvCheckStatusStore'
        }        
    },
	data: {
        isEdit: false,
		urlback:'',
		stockintypeid_link:1,
		IsformMaster:false
    },
})