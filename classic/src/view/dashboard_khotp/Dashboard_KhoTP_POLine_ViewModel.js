Ext.define('GSmartApp.view.dashboard_khotp.Dashboard_KhoTP_POLine_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Dashboard_KhoTP_POLine_ViewModel',
    stores: {
        POLineStore: {
            type: 'PContractPOStore'
        },
        PContractSKUStore: {
            type: 'PContractSKUStore'
        },
        ShipModeStore: {
            type: 'ShipModeStore'
        },
        POLine_Orgs_Store: {
            type: 'Stockout_order_Store'
        },
        EndBuyer: {
            type: 'ListOrgStore'
        },
    },
    data: {
        shipdate_to: Ext.Date.add(new Date(), Ext.Date.DAY, 7),
        shipdate_from: Ext.Date.add(new Date(), Ext.Date.DAY, -10),
        orgbuyerid_link: null,

        ////////////////
        porderGrant: null, // load khi click danh sach poline
    },
    formulas: {
        isbtnBalance_MaSP_disabled: function(get){
            var porderGrant = get('porderGrant') ;
            if(porderGrant == null){
                return true;
            }
            return false;
        }
    }
})