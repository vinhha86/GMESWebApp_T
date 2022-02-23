Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pklist_Add_NoLabelPkl.Stockout_Pklist_Add_NoLabelPkl_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_Pklist_Add_NoLabelPkl_ViewModel',
    requires: [
    ],
    stores: {
    },
    data: {
        skuid_link: null,
        stockout: null,
        stockoutDRec: null,

        obj: {
            // row: null,
            // space: null,
            // floor: null,
            lotnumber: null,
            packageid: null,
            width_met: null,
            met: null,
        }
    },
    formulas:{
    }
})