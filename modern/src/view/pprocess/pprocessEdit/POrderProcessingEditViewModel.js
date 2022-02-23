Ext.define('GSmartApp.view.pprocess.POrderProcessingEditViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.POrderProcessingEditViewModel',
    requires: ['GSmartApp.store.POrderProcessing'],
    stores: {
        POrderProcessingStore: {
            type: 'porderprocessing'
        }
    },

    data: {

        record: null,
        grantamount: null,
        pordercode: null,
        // input output
        amountinput: null,
        amountinputsum: null,
        amountoutput: null,
        amountoutputsum: null,

        // QC
        amountkcs: null,
        amountkcssum: null,
        amounterror: null,
        amounterrorsum: null,
        amountkcscomplete: null,

        // Packing
        amountpacked: null,
        amountpackedsum: null,
        amountstocked: null,
        amountstockedsum: null,

        // input target, qc reg
        amounttarget: null,
        amountkcsreg: null,

        // misc
        isbtnDisabled: false

    }
})