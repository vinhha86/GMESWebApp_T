Ext.define('GSmartApp.view.main.POrderFinishModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.porderfinish',

    data: {
        pprocesingid: -1,
        porderid_link: null,
        ordercode: '',
        comment: ''
    }
});
