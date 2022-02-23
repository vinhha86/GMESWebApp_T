Ext.define('GSmartApp.view.laborlevel.LaborLevelViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.LaborLevelViewModel',
    requires: ['GSmartApp.store.LaborLevelStore'],
	stores: {
        LaborLevelStore: {
            type: 'LaborLevelStore'
        }
    },
    data: {
        currentRec: null,
        oldName: null,
        newName: null,
        oldCode: null,
        newCode: null,
        oldComment: null,
        newComment: null,
        oldRate: null,
        newRate: null
    }
})