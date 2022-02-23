Ext.define('GSmartApp.view.handover.HandoverPackFromLine_Detail_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverPackFromLine_Detail_ViewModel',
    requires: [
        'GSmartApp.store.UserListStore',
        'GSmartApp.store.org.ListOrgStore',
        'GSmartApp.store.porder.POrder_ListStore',
        'GSmartApp.store.pprocess.POrderGrantStore',
        'GSmartApp.store.handover.HandoverProductStore',
        'GSmartApp.store.handover.HandoverSkuStore'
    ],
    stores: {
        UserListStore: {
            type: 'userliststore'
        },
        ListOrgStore_From: {
            type: 'ListOrgStore'
        },
        POrder_ListStore: {
            type: 'POrder_ListStore'
        },
        ListOrgStore_To: {
            type: 'ListOrgStore'
        },
        HandoverProductStore:{
            type: 'HandoverProductStore'
        },
        HandoverSkuStore: {
            type: 'HandoverSkuStore'
        },
    },
    data: {
        id: 0,
        currentRec: {
            id: null,
            handovertypeid_link: null,
            handover_code: null,
            handover_date: null,
            handover_userid_link: null,
            receiver_userid_link: null,
            orgid_from_link: null,
            orgid_to_link: null,
            reason: null,
            extrainfo: null,
            porderid_link: null,
            pordergrantid_link: null,
            status: null,
            handoverProducts: [{
                
            }]
        },
        pordercode: '',
        isCreateNew: false,
        isIn: false, // view nhap
        isOut: false, // view xuat
        viewId: '', // id view HandoverDetail ex: handover_cut_toline_detail
        viewIdParent: '', // id view parent HandoverDetail ex: handover_cut_toline_edit
        viewIdList: '', //  id view list, for btnQuayLai ex: handover_cut_toline
        radioVal: 1,
    },
    formulas: {
        isBtnConfirmOutHidden : function (get) { // Xuat
            if (get('isCreateNew')) {
                return true;
            }
            if (get('currentRec.status') != 0) {
                return true;
            }
            return false;
        },
        isBtnConfirmInHidden : function (get) { // Nhap
            if (get('isCreateNew')) {
                return true;
            }
            if (get('currentRec.status') != 1) {
                return true;
            }
            return false;
        },
        isBtnDeleteHidden : function (get) { // Xoa
            if (get('isCreateNew')) {
                return true;
            }
            return false;
        },
        isBtnCancelConfirmHidden : function (get) { // Huy xac nhan
            if (get('isCreateNew')) {
                return true;
            }
            if (get('currentRec.status') != 2) {
                return true;
            }
            return false;
        },
        isEditable : function (get) { // Huy xac nhan
            if (get('isCreateNew')) {
                return true;
            }
            return false;
        },
        isReadOnly : function (get) { // Huy xac nhan
            if (get('isCreateNew')) {
                return false;
            }
            return true;
        },
    }
})