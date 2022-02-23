Ext.define('GSmartApp.view.dm_capbac.CapBacViewModel',{
    extend:'Ext.app.ViewModel',
    alias:'viewmodel.CapBacViewModel',
    requires:['GSmartApp.store.Labor.LaborStore'],

    stores:{
        LaborlevelStore:{
            type:'LaborStore'
        }
    }
})