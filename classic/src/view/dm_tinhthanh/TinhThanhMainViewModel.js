Ext.define('GSmartApp.view.dm_tinhthanh.TinhThanhMainViewModel',{
    extend:'Ext.app.ViewModel',
    alias:'viewmodel.TinhThanhMainViewModel',
    
    requires:['GSmartApp.store.org.ListOrgStore'],

    stores:{
        org_tinh_store:{
            type:'ListOrgStore'
        },
        org_huyen_store:{
            type:'ListOrgStore'
        },
        org_xa_store:{
            type:'ListOrgStore'
        },
    },

    data:{
        Tinh:{
            title:'',
            name:'',
            code:'',
            id: null
        },
        Huyen:{
            title:'',
            name:'',
            code:'',
            id:null
        },
        Xa:{
            name:'',
            code:''
        },
        old:''
      
    },
    formulas: {
        showTitle_Huyen: function (get) {
            if (get('Tinh.title') == "" || get('Tinh.title') == null) {
                return 'Danh sách quận huyện'
            }else{
                return "Danh sách quận huyện của: " + get('Tinh.title')
            }
        },
        showTitle_Xa: function (get) {
            if (get('Huyen.title') == "" || get('Huyen.title') == null) {
                return 'Danh sách xã phường'
            }else{
                return "Danh sách xã phường của: " + get('Huyen.title')
            }
        }
    }
})