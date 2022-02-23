Ext.define('GSmartApp.view.dm_loainhanvien.PersonnelTypeViewModel',{
    extend:'Ext.app.ViewModel',
    alias:'viewmodel.PersonnelTypeViewModel',
    requires:['GSmartApp.store.personnel.PersonnelType_Store'],

    stores:{
        Personnel_Type:{
            type: 'PersonnelType_Store'
        }
    }

})