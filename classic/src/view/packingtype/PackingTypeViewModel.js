Ext.define('GSmartApp.view.packingtype.PackingTypeViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PackingTypeViewModel',
    requires: ['GSmartApp.store.PackingTypeStore'],
	stores: {
        PackingStore: {
            type: 'PackingTypeStore'
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