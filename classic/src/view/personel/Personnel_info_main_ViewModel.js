Ext.define('GSmartApp.view.personel.Personnel_info_main_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Personnel_info_main_ViewModel',
    requires: ['GSmartApp.store.gender.GenderStore', 'GSmartApp.store.org.ListOrgStore',
        'GSmartApp.store.personnel.PersonnelType_Store', 'GSmartApp.store.personnel.PersonnelStatus_Store',
        'GSmartApp.store.personnel.personnel_his_store','GSmartApp.store.personnel.Personnel_Position_Store',
        'GSmartApp.store.Labor.LaborStore' ],
    stores: {
        GenderStore: {
            type: 'GenderStore'
        },
        OrgManagerStore: {
            type: 'ListOrgStore'
        },
        OrgStore: {
            type: 'ListOrgStore'
        },
        OrgCountryStore: {
            type: 'ListOrgStore'
        },
        OrgProvinceStore: {
            type: 'ListOrgStore'
        },
        OrgDistrictStore: {
            type: 'ListOrgStore'
        },
        OrgCommuneStore: {
            type: 'ListOrgStore'
        },
        PersonnelTypeStore: {
            type: 'PersonnelType_Store'
        },
        PersonnelStatus_Store: {
            type: 'PersonnelStatus_Store'
        },
        PersonnelHis_Store: {
            type: 'personnel_his_store'
        },
        Personnel_Position_Store : {
            type:'Personnel_Position_Store'
        },
        LaborStore: {
            type: 'LaborStore'
        },
    },
    data: {
        personnel: {
            id: null,
            status: 1,
            levelid_link:null
        },
        isActive: false,
        Tinh:{
            old:null
        },
        Huyen:{
            old:null
        },
        Xa:{
            old:null
        },
        Thon:{
            old:null
        },
        TrangThai:{
            old:null
        },
        NghiViec:{
            old:null
        },
        NgayVaoCty:{
            old:null
        },
        TGCongTac:{
            old:null
        }
    },
    formulas: {
        qr_person: function (get) {
            return config.getQrcode_personel_url() + get('personnel.id')
        },
        qr_bike: function (get) {
            if (get('personnel.bike_number') == "" || get('personnel.bike_number') == null) {
                return null;
            }
            else
                return config.getQrcode_bike_number_url() + get('personnel.bike_number');
        }
    }
})