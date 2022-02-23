Ext.define('GSmartApp.view.handover.HandoverDetailViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverDetailViewModel',
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

        // PACK TO STOCK values:
        ptsBuyerCode: '',
        ptsQuantity: null,
        ptsSkuCode: '',
    },
    formulas: {
        isBtnConfirmOutHidden : function (get) { // Xuat
            var viewId = get('viewId');
            if (
                viewId != 'handover_cut_toline_detail' &&
                viewId != 'handover_cut_toprint_detail' &&
                viewId != 'handover_line_topack_detail' &&
                viewId != 'handover_line_toprint_detail'
            ) {
                return true;
            }
            if (get('isCreateNew')) {
                return true;
            }
            if (get('currentRec.status') != 0) {
                return true;
            }
            return false;
        },
        isBtnConfirmInHidden : function (get) { // Nhap
            var viewId = get('viewId');
            if (
                viewId != 'handover_line_fromcut_detail' &&
                viewId != 'handover_pack_fromline_detail' &&
                viewId != 'handover_cut_toprint_detail'  &&
                viewId != 'handover_line_toprint_detail'
            ) {
                return true;
            }
            if (get('isCreateNew')) {
                return true;
            }
            if (get('currentRec.status') != 1) {
                return true;
            }
            return false;
        },
        isBtnDeleteHidden : function (get) { // Xoa
            var viewId = get('viewId');
            if (
                viewId != 'handover_cut_toline_detail' &&
                viewId != 'handover_cut_toprint_detail' &&
                viewId != 'handover_line_topack_detail' &&
                viewId != 'handover_line_toprint_detail'
            ) {
                return true;
            }
            if (get('isCreateNew')) {
                return true;
            }
            return false;
        },
        isBtnCancelConfirmHidden : function (get) { // Huy xac nhan
            if (get('currentRec.status') != 2) {
                return true;
            }
            return false;
        },
        isPorderCodeFieldHidden: function (get) { 
            var viewId = get('viewId');
            if (
                viewId == 'handover_pack_tostock_detail'
            ) {
                return true;
            }
            return false;
        },
        isPackToStockExtrainfo: function (get) {
            var viewId = get('viewId');
            if (
                viewId == 'handover_pack_tostock_detail'
            ) {
                return 2;
            }
            return 3;
        },
        isPackToStockOrgTo: function (get) {
            var viewId = get('viewId');
            if (
                viewId == 'handover_pack_tostock_detail'
            ) {
                return 1;
            }
            return 2;
        },
        isRdoLine1Hidden: function (get) {
            var radioVal = get('radioVal');
            if (
                radioVal != 1
            ) {
                return true;
            }
            return false;
        },
        isRdoLine2Hidden: function (get) {
            var radioVal = get('radioVal');
            if (
                radioVal != 2
            ) {
                return true;
            }
            return false;
        },
        isRdoLine3Hidden: function (get) {
            var radioVal = get('radioVal');
            if (
                radioVal != 3
            ) {
                return true;
            }
            return false;
        },
    }
})