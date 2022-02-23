Ext.define('GSmartApp.view.dm_loaitudien.DictionaryTypeViewModel',{
    extend:'Ext.app.ViewModel',
    alias:'viewmodel.DictionaryTypeViewModel',
    requires:['GSmartApp.store.dictionary.dictionary_type_store'],

    stores:{
        DictionaryType_Store:{
            type:'dictionary_type_store'
        }
    }

})
