Ext.define('GSmartApp.view.handover.HandoverLineToPrint_ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverLineToPrint_ListController',
    init: function () {
        var m = this;
        var viewModel = this.getViewModel();
        var session = GSmartApp.util.State.get('session');

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

        // LINE TO PRINT - xuất btp in thêu
        viewModel.set('viewId', 'handover_line_toprint');
        HandoverStore.loadStoreBySearch(5, '', 
        null, null, null, null, [], 25, 1, 'handover_line_toprint');
        orgtypestringfrom = '14';
        orgtypestringto = '20';

        if(session.orgid_link == 1){
            // lấy hết nếu orgid_link == 1
            ListOrgStoreFrom.loadStoreByOrgTypeString(orgtypestringfrom);
            ListOrgStoreTo.loadStoreByOrgTypeString(orgtypestringto);
        }else{ 
            // lấy của px nếu orgid_link là px
            ListOrgStoreFrom.getbyParentandType(session.orgid_link, orgtypestringfrom);
            ListOrgStoreTo.loadStoreByOrgTypeString(orgtypestringto);
        }

        // ListOrgStoreFrom.loadStoreByOrgTypeString(orgtypestringfrom);
        // ListOrgStoreTo.loadStoreByOrgTypeString(orgtypestringto);
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
        var handovertypeid_link = 5;
        //
        var viewId = viewModel.get('viewId');
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