Ext.define('GSmartApp.view.handover.HandoverDetailConfirmViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverDetailConfirmViewModel',
    requires: [
    ],
    stores: {
    },
    data: {
        username: '',
        password: '',
        handoverid_link: null,
        viewId: '',
        currentStatus: null
    }
})