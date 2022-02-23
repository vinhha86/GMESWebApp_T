Ext.define('GSmartApp.view.dm_loaithietbi.DeviceType_ViewModel',{
    extend:'Ext.app.ViewModel',
    alias:'viewmodel.DeviceType_ViewModel',
    requires: ['GSmartApp.store.device.devices_type_store'],

    stores:{
        devices_store : {
            type:'devices_type_store'
        }
    },
    data:{
        device:{
            name:null,
            code:null,
            check:null
        }
    }
})