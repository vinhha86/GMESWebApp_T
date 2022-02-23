Ext.define('GSmartApp.view.main.POrderSplitGrantModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pordersplitgrant',

    data: {
        sourceorgid_link: null,
        splittoorgid_link: null,
        pprocesingid: -1,
        porderid_link: null,
        ordercode: '',
        productiondate: null,
        amountcutsum: 0,
        amountorigin: 0,
        amountsplit: 0
    }
});
