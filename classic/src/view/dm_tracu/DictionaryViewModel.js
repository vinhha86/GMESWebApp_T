Ext.define('GSmartApp.view.dm_tracuu.DictionaryViewModel',{
    extend:'Ext.app.ViewModel',
    alias:'viewmodel.DictionaryViewModel',
    requires:['GSmartApp.store.dictionary.dictionary_type_store','GSmartApp.store.dictionary.dictionary_store'],

    stores:{
        DictionaryType_Store:{
            type:'dictionary_type_store'
        },
        Dictionary_Store:{
            type:'dictionary_store'
        }
    }

})
