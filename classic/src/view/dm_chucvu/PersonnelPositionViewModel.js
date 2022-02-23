Ext.define('GSmartApp.view.dm_chucvu.PersonnelPosition_ViewModel',{
    extend:'Ext.app.ViewModel',
    alias:'viewmodel.PersonnelPosition_ViewModel',
    requires: ['GSmartApp.store.personnel.Personnel_Position_Store'],

    stores:{
       personnel_position_store : {
            type:'Personnel_Position_Store'
        }
    },
    data:{
        personnel_position:{
            name:null,
            name_en:null,
            code:null
        }
    }
})