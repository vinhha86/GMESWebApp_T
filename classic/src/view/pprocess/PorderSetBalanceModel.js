Ext.define('GSmartApp.view.main.PorderSetBalanceModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pordersetbalance',
    data: {
        granttoorgid_link: null,
        pprocesingid: -1,
        porderid_link: null,
        ordercode: '',
        balance_date: null,
        balance_status: 0,
        balance_rate: 0,
        stockoutd: null
    }
});
