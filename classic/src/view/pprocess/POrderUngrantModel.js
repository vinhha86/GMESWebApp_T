Ext.define('GSmartApp.view.main.POrderUngrantModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.porderungrant',

    data: {
        pprocesingid: -1,
        porderid_link: null,
        ordercode: '',
        comment: ''
    }
});
