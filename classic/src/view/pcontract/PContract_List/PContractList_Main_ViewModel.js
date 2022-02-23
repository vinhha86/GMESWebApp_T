Ext.define('GSmartApp.view.pcontract.PContractList_Main_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContractList_Main_ViewModel',
    requires: ['GSmartApp.store.pcontract.PContractStore', 'GSmartApp.store.org.ListOrgStore',
        'GSmartApp.branch.BranchStore', 'GSmartApp.season.SeasonStore'],
    stores: {
        PContractStore: {
            type: 'PContractStore'
        },
        PContractPOList: {
            type: 'PContractPOStore'
        },
        CustomerStore: {
            type: 'ListOrgStore'
        },
        BranchStore: {
            type: 'BranchStore'
        },
        SeasonStore: {
            type: 'SeasonStore'
        },
        EndBuyer: {
            type: 'ListOrgStore'
        },
        Vendor: {
            type: 'ListOrgStore'
        },
        UserStore: {
            type: 'userliststore'
        },
    },
    data: {
        value: {
            productbuyer_code: '',
            po_code: '',
            orgbuyerid_link: 0,
            orgvendorid_link: 0,
            contractbuyer_code: '',
            contractbuyer_yearfrom: (new Date()).getFullYear() - 1,
            contractbuyer_yearto: (new Date()).getFullYear() + 1
        },
        pcontractid_link: 0,
        IsformMaster:false,
    },
    formulas: {
        isHiddenEditAll: function (get) {
            if (get('pcontractid_link') == 0) {
                return true;
            }
            return false;
        }
    }
})