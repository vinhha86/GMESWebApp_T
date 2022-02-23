Ext.define('GSmartApp.view.dm_loaidonvi.OrgTypeViewModel',{
    extend:'Ext.app.ViewModel',
    alias:'viewmodel.OrgTypeViewModel',
    requires: ['GSmartApp.store.org.OrgTypeStore'],

    stores:{
       orgtype_store : {
            type:'OrgTypeStore'
        }
    },
    data:{
        org:{
            name:null,
            name_en:null,
        }
    }
})