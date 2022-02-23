Ext.define('GSmartApp.view.handover.HandoverShareView.HandoverListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverListController',
    init: function () {
        var m = this;
        var viewModel = this.getViewModel();

        var HandoverStore = viewModel.getStore('HandoverStore');
        var ListOrgStoreFrom = viewModel.getStore('ListOrgStoreFrom');
        var ListOrgStoreTo = viewModel.getStore('ListOrgStoreTo');

        // SORTERS
        // HandoverStore.getSorters().add('handover_date');
        HandoverStore.getSorters().add({
            property: 'handover_date',
            direction: 'DESC'
        });

        ListOrgStoreFrom.getSorters().remove('id');
        ListOrgStoreFrom.getSorters().add('parentid_link');
        ListOrgStoreFrom.getSorters().add('name');

        ListOrgStoreTo.getSorters().remove('id');
        ListOrgStoreTo.getSorters().add('parentid_link');
        ListOrgStoreTo.getSorters().add('name');

        // ORG TYPE STRING
        var orgtypestringfrom = '';
        var orgtypestringto = '';

        // CUT TO LINE - tổ cắt xuất btp lên chuyền
        if(Ext.getCmp('handover_cut_tolinelist')) {
            // console.log('handover_cut_tolinelist');
            viewModel.set('viewId', 'handover_cut_toline');
            HandoverStore.loadStoreBySearch(1, '', 
            null, null, null, null, [], 25, 1, 'handover_cut_toline');
            orgtypestringfrom = '17';
            orgtypestringto = '14';
        }
        // LINE FROM CUT - nhận btp vào chuyền
        if(Ext.getCmp('handover_line_fromcutlist')) {
            console.log('handover_line_fromcutlist');
            viewModel.set('viewId', 'handover_line_fromcut');
            HandoverStore.loadStoreBySearch(1, '', 
            null, null, null, null, [1], 25, 1, 'handover_line_fromcut');
            orgtypestringfrom = '17';
            orgtypestringto = '14';
        }
        // LINE TO PACK - xuất tp hoàn thiện
        if(Ext.getCmp('handover_line_topacklist')) {
            console.log('handover_line_topacklist');
            viewModel.set('viewId', 'handover_line_topack');
            HandoverStore.loadStoreBySearch(4, '', 
                null, null, null, null, [], 25, 1, 'handover_line_topack');
            orgtypestringfrom = '14';
            orgtypestringto = '9';
        }
        // PACK FROM LINE - nhận tp từ chuyền
        if(Ext.getCmp('handover_pack_fromlinelist')) {
            console.log('handover_pack_fromlinelist');
            viewModel.set('viewId', 'handover_pack_fromline');
            HandoverStore.loadStoreBySearch(4, '', 
                null, null, null, null, [1], 25, 1, 'handover_pack_fromline');
                orgtypestringfrom = '14';
                orgtypestringto = '9';
        }
        // LINE TO PRINT - xuất tp in thêu
        if(Ext.getCmp('handover_line_toprintlist')) {
            console.log('handover_line_toprintlist');
            viewModel.set('viewId', 'handover_line_toprint');
            HandoverStore.loadStoreBySearch(5, '', 
                null, null, null, null, [], 25, 1, 'handover_line_toprint');
            orgtypestringfrom = '14';
            orgtypestringto = '20';
        }
        // CUT TO PRINT - xuất btp in thêu
        if(Ext.getCmp('handover_cut_toprintlist')) {
            console.log('handover_cut_toprintlist');
            viewModel.set('viewId', 'handover_cut_toprint');
            HandoverStore.loadStoreBySearch(2, '', 
                null, null, null, null, [], 25, 1, 'handover_cut_toprint');
            orgtypestringfrom = '17';
            orgtypestringto = '20';
        }
        // PACK TO STOCK - xuất tp xuống kho
        if(Ext.getCmp('handover_pack_tostocklist')) {
            console.log('handover_pack_tostocklist');
            viewModel.set('viewId', 'handover_pack_tostock');
            HandoverStore.loadStoreBySearch(9, '', 
                null, null, null, null, [], 25, 1, 'handover_pack_tostock');
            orgtypestringfrom = '9';
            orgtypestringto = '8';
        }

        ListOrgStoreFrom.loadStoreByOrgTypeString(orgtypestringfrom);
        ListOrgStoreTo.loadStoreByOrgTypeString(orgtypestringto);
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#btnTimKiem': {
            click: 'onSearch'
        }
    },
    onSearch: function(){
        var me = this.getView();
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('HandoverStore');
        var handovertypeid_link = 0;
        //
        var viewId = viewModel.get('viewId');
        console.log(viewId);
        switch (viewId) {
            case 'handover_cut_toline':
            case 'handover_line_fromcut':
                handovertypeid_link = 1;
                break;
            case 'handover_line_topack':
            case 'handover_pack_fromline':
                handovertypeid_link = 4;
                break;
            case 'handover_line_toprint':
                handovertypeid_link = 5;
                break;
            case 'handover_cut_toprint':
                handovertypeid_link = 2;
                break;
            case 'handover_pack_tostock':
                handovertypeid_link = 9;
                break;
        }
        //
        var ordercode, handover_datefrom, handover_dateto, orgid_from_link, orgid_to_link, status;
        if (me.down('#ordercode').getValue() == "") {
            ordercode = null;
        }else ordercode = me.down('#ordercode').getValue();
        if (me.down('#handover_datefrom').getValue() == "") {
            handover_datefrom = null;
        }else handover_datefrom = me.down('#handover_datefrom').getValue();
        if (me.down('#handover_dateto').getValue() == "") {
            handover_dateto = null;
        }else handover_dateto = me.down('#handover_dateto').getValue();
        if (me.down('#orgid_from_link').getValue() == "") {
            orgid_from_link = null;
        }else orgid_from_link = me.down('#orgid_from_link').getValue();
        if (me.down('#orgid_to_link').getValue() == "") {
            orgid_to_link = null;
        }else orgid_to_link = me.down('#orgid_to_link').getValue();
        if(me.down('#status').getValue() == null || me.down('#status').getValue() == ""){
            status = [];
        }else status = me.down('#status').getValue();

        var limit = me.down('#limitpage').getValue();
        var page = store.currentPage;
        if (limit == null) {
            limit = 25;
        }
        if (page == null) {
            page = 1;
        }
        store.loadStoreBySearch(handovertypeid_link, ordercode, 
            handover_datefrom, handover_dateto, orgid_from_link, orgid_to_link, status, limit, page, viewId);
    },
    onThemMoi: function (m, record) {
        // this.redirectTo("handover_cut_toline/" + 0 + "/edit");
        var viewModel = this.getViewModel();
        var viewId = viewModel.get('viewId');
        this.redirectTo(viewId + "/" + 0 + "/edit");
    },
    onCapNhatdbl: function (m, record, item, index, e, eOpts) {
        var id = record.data.id;
        var viewModel = this.getViewModel();
        var viewId = viewModel.get('viewId');
        this.redirectTo(viewId + "/" + id + "/edit");
    },
    onCapNhat: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var viewModel = this.getViewModel();
        var viewId = viewModel.get('viewId');
        this.redirectTo(viewId + "/" + id + "/edit");
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Xoa(id, rec);
                }
            }
        });
    },
    Xoa: function (id, rec) {
        var me = this.getView();
        me.setLoading("Đang xóa dữ liệu");
        var params = new Object();
        params.id = id;

        GSmartApp.Ajax.post('/api/v1/handover/delete', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    if(response.message == 'Phiếu đã được bên nhận xác nhận'){
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }else{
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: "Xóa thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        var store = me.getStore();
                        store.remove(rec);
                    }
                } else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Xóa thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
    },
})