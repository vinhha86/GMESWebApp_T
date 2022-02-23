Ext.define('GSmartApp.view.handover.HandoverDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverDetailController',
    init: function () {
        // var session = GSmartApp.util.State.get('session');
        // console.log(session);
        var m = this;
        var viewModel = this.getViewModel();
        var UserListStore = viewModel.getStore('UserListStore');
        UserListStore.loadUserbyOrg(1);

        var ListOrgStore_From = viewModel.getStore('ListOrgStore_From');
        var ListOrgStore_To = viewModel.getStore('ListOrgStore_To');

        if(Ext.getCmp('handover_cut_toline_detail')){
            m.getView().setTitle('Xuất bán thành phẩm đến tổ chuyền');
            viewModel.set('viewId', 'handover_cut_toline_detail');
            viewModel.set('viewIdParent', 'handover_cut_toline_edit');
            viewModel.set('viewIdList', 'handover_cut_toline');
            var orgtypestring_from = '17';
            ListOrgStore_From.loadStoreByOrgTypeString(orgtypestring_from);
            // cut to line chon porder de load ListOrgStore_To, nhung van cho chon to chuyen
            var orgtypestring_to = '14';
            ListOrgStore_To.loadStoreByOrgTypeString(orgtypestring_to);

            // set handOverSkuList hidden false for
            var handOverSkuList = m.getView().down('#handOverSkuList');
            if(handOverSkuList) handOverSkuList.setHidden(false);
        }

        if(Ext.getCmp('handover_cut_toprint_detail')){
            m.getView().setTitle('Xuất bán thành phẩm đến in thêu');
            viewModel.set('viewId', 'handover_cut_toprint_detail');
            viewModel.set('viewIdParent', 'handover_cut_toprint_edit');
            viewModel.set('viewIdList', 'handover_cut_toprint');
            var orgtypestring_from = '17';
            ListOrgStore_From.loadStoreByOrgTypeString(orgtypestring_from);
            var orgtypestring_to = '20';
            ListOrgStore_To.loadStoreByOrgTypeString(orgtypestring_to);
        }

        if(Ext.getCmp('handover_line_topack_detail')){
            m.getView().setTitle('Xuất thành phẩm đến hoàn thiện');
            viewModel.set('viewId', 'handover_line_topack_detail');
            viewModel.set('viewIdParent', 'handover_line_topack_edit');
            viewModel.set('viewIdList', 'handover_line_topack');
            var orgtypestring_from = '14';
            ListOrgStore_From.loadStoreByOrgTypeString(orgtypestring_from);
            var orgtypestring_to = '9';
            ListOrgStore_To.loadStoreByOrgTypeString(orgtypestring_to);
        }

        if(Ext.getCmp('handover_line_toprint_detail')){
            m.getView().setTitle('Xuất thành phẩm đến in thêu');
            viewModel.set('viewId', 'handover_line_toprint_detail');
            viewModel.set('viewIdParent', 'handover_line_toprint_edit');
            viewModel.set('viewIdList', 'handover_line_toprint');
            var orgtypestring_from = '14';
            ListOrgStore_From.loadStoreByOrgTypeString(orgtypestring_from);
            var orgtypestring_to = '20';
            ListOrgStore_To.loadStoreByOrgTypeString(orgtypestring_to);
        }

        if(Ext.getCmp('handover_line_fromcut_detail')){
            m.getView().setTitle('Nhập bán thành phẩm từ tổ cắt');
            viewModel.set('viewId', 'handover_line_fromcut_detail');
            viewModel.set('viewIdParent', 'handover_line_fromcut_edit');
            viewModel.set('viewIdList', 'handover_line_fromcut');
            var orgtypestring_from = '17';
            ListOrgStore_From.loadStoreByOrgTypeString(orgtypestring_from);

            // set handOverSkuList hidden false for
            var handOverSkuList = m.getView().down('#handOverSkuList');
            if(handOverSkuList) handOverSkuList.setHidden(false);
        }

        if(Ext.getCmp('handover_pack_fromline_detail')){
            m.getView().setTitle('Nhập thành phẩm từ tổ chuyền');
            viewModel.set('viewId', 'handover_pack_fromline_detail');
            viewModel.set('viewIdParent', 'handover_pack_fromline_edit');
            viewModel.set('viewIdList', 'handover_pack_fromline');
            var orgtypestring_from = '14';
            ListOrgStore_From.loadStoreByOrgTypeString(orgtypestring_from);
            var orgtypestring_to = '9';
            ListOrgStore_To.loadStoreByOrgTypeString(orgtypestring_to);
        }

        if(Ext.getCmp('handover_pack_tostock_detail')){
            m.getView().setTitle('Xuất thành phẩm đến kho TP');
            viewModel.set('viewId', 'handover_pack_tostock_detail');
            viewModel.set('viewIdParent', 'handover_pack_tostock_edit');
            viewModel.set('viewIdList', 'handover_pack_tostock');
            var orgtypestring_from = '9';
            ListOrgStore_From.loadStoreByOrgTypeString(orgtypestring_from);
            var orgtypestring_to = '8';
            ListOrgStore_To.loadStoreByOrgTypeString(orgtypestring_to);
        }


    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData'
            }
        }
    },
    control: {
        '#btnQuayLai': {
            click: 'onQuayLai'
        },
        '#btnLuu': {
            click: 'onLuu'
        },
        '#btnDelete': {
            click: 'onDelete'
        },
        '#btnHandover': {
            click: 'onConfirm'
        },
        '#btnConfirm': {
            click: 'onConfirm'
        },
        '#btnPlus': {
            click: 'onBtnPlus'
        },
        '#btnSearch': {
            click: 'onBtnSearch'
        },
        '#btnCancelConfirm': {
            click: 'onCancelConfirm'
        },
        '#HandoverDetail_ProductGrid': {
            itemclick: 'onHandoverDetail_ProductGridItemClick'
        },
    },
    onCancelConfirm: function (){
        var me = this;
        var viewModel = this.getViewModel();
        var id = viewModel.get('currentRec.id');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn hủy ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.CancelConfirm(id);
                }
            }
        });
    },
    CancelConfirm: function(id){
        var m = this;
        var me = this.getView();
        var params = new Object();
        params.id = id;

        GSmartApp.Ajax.post('/api/v1/handover/cancelconfirm', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    if(response.message == 'Phiếu chưa được xác nhận'){
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }else if(response.message == 'Không tồn tại POrderProcessing'){
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
                            msg: "Huỷ xác nhận thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        m.getViewModel().set('currentRec.status', 1);
                        m.getViewModel().set('currentRec.receiver_userid_link', null);
                    }
                } else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Huỷ xác nhận thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onDelete: function () {
        var me = this;
        var viewModel = this.getViewModel();
        var id = viewModel.get('currentRec.id');
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
                    me.Xoa(id);
                }
            }
        });
    },
    Xoa: function (id) {
        var m = this;
        var me = this.getView();
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
                        m.onQuayLai();
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
            })
    },
    onBtnPlus: function(){
        var me = this;
        var viewModel = this.getViewModel();
        var pordercode = viewModel.get('pordercode');
        var viewId = viewModel.get('viewId');

        if(pordercode == null || pordercode.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Mã lệnh không được bỏ trống',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

        var params = new Object();
        params.pordercode = pordercode;

        GSmartApp.Ajax.post('/api/v1/porderlist/getbyexactpordercode', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        // console.log(response);
                        if(response.message == 'Mã lệnh không tồn tại'){
                            Ext.Msg.show({
                                title: 'Lấy thông tin thất bại',
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }else{
                            // load bản ghi đầu tiên trả vê, cần sửa lại nếu có nhiều lệnh trùng ordercode
                            var porderid_link = response.data[0].id;
                            viewModel.set('currentRec.porderid_link', porderid_link);

                            if(viewId == 'handover_cut_toline_detail'){
                                var ListOrgStore_To = viewModel.getStore('ListOrgStore_To');
                                ListOrgStore_To.loadStoreByPorderIdLink(porderid_link);
                                me.getView().down('#orgid_to_link').setValue(null);
                                me.getView().down('#orgid_to_link').focus();
                            }

                            me.loadHandoverProductOnPorderSelect(porderid_link);
                        }
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Lấy thông tin thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Lấy thông tin thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onBtnSearch: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var pordercode = viewModel.get('pordercode');
        var viewId = viewModel.get('viewId');

        var currentRec = viewModel.get('currentRec');
        var granttoorgid_link = null;
        if(viewId == 'handover_cut_toline_detail'){
            granttoorgid_link = currentRec.orgid_to_link
        }

        if((pordercode == null || pordercode.length == 0) && granttoorgid_link == null){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Mã lệnh không được bỏ trống',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        var form = Ext.create('Ext.window.Window', {
            height: 400,
            width: 500,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Danh sách lệnh',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'HandoverDetailPorderSearch',
                viewModel: {
                    type: 'HandoverDetailPorderSearchViewModel',
                    data: {
                        pordercode: pordercode,
                        granttoorgid_link: granttoorgid_link,
                        viewId: viewId
                    }
                }
            }]
        });
        form.show();

        form.down('#HandoverDetailPorderSearch').getController().on('found0Porder', function () {
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Không tìm thấy lệnh",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            form.close();
        });
        form.down('#HandoverDetailPorderSearch').getController().on('found1Porder', function (record) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Tìm thấy 1 lệnh",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            var record = record[0];

            var porderid_link = record.get('id');
            var ordercode = record.get('ordercode');

            // cut to line, load store ListOrgStore_To

            // var ListOrgStore_To = viewModel.getStore('ListOrgStore_To');
            // ListOrgStore_To.loadStoreByPorderIdLink(porderid_link);
            
            // me.down('#orgid_to_link').setValue(null);
            // me.down('#orgid_to_link').focus();

            viewModel.set('currentRec.porderid_link', porderid_link);
            viewModel.set('pordercode', ordercode);
            m.loadHandoverProductOnPorderSelect(porderid_link);

            form.close();
        });
    },
    onLuu: function () {
        var m = this;
        var me = this.getView();

        var viewModel = this.getViewModel();
        var HandoverProductStore = viewModel.getStore('HandoverProductStore');
        var HandoverSkuStore = viewModel.getStore('HandoverSkuStore');

        var handoverProductsData = HandoverProductStore.getData().items;
        var handoverProducts = new Array();
        for(var i=0;i<handoverProductsData.length;i++){
            handoverProducts.push(handoverProductsData[i].data);
        }

        var params = new Object();
        var data = new Object();
        data = viewModel.get('currentRec');
        data.handoverProducts = handoverProducts;

        params.data = data;
        params.msgtype = "HANDOVER_CREATE";
        params.message = "Tạo handover";

        GSmartApp.Ajax.post('/api/v1/handover/create', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.respcode == 200) {
                        // Ext.Msg.show({
                        //     title: 'Thông báo',
                        //     msg: 'Lưu thành công',
                        //     buttons: Ext.MessageBox.YES,
                        //     buttonText: {
                        //         yes: 'Đóng',
                        //     }
                        // });
                        viewModel.set('currentRec', response.data);
                        var handover_date = viewModel.get('currentRec.handover_date');
                        var date = Ext.Date.parse(handover_date, 'c');
                        if (null == date) date = new Date(handover_date);
                        viewModel.set('currentRec.handover_date',date);

                        var viewIdList = viewModel.get('viewIdList');
                        m.redirectTo(viewIdList + "/" + response.data.id + "/edit");
                        // HandoverProductStore.load();
                        HandoverProductStore.loadStore_Async(response.data.id);
                        HandoverProductStore.load({
                            scope: this,
                            callback: function(records, operation, success) {
                                if(!success){
                                    // this.fireEvent('logout');
                                } else {
                                    var HandoverDetail_ProductGrid = Ext.getCmp('HandoverDetail_ProductGrid');
                                    var HandoverProductStoreData = HandoverProductStore.getData();
                                    HandoverSkuStore.setData(HandoverProductStoreData.items[0].get('handoverSKUs'));
                                    HandoverDetail_ProductGrid.getSelectionModel().select(0, true);
                                    // console.log(HandoverProductStoreData);

                                    HandoverProductStore.commitChanges();
                                    HandoverSkuStore.commitChanges();
                                }
                            }
                        });
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Lưu thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Lưu thất bại',
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onQuayLai: function () {
        var viewModel = this.getViewModel();
        var viewIdList = viewModel.get('viewIdList');
        this.redirectTo(viewIdList);
    },
    onLoadData: function (id, type) {
        var m = this;
        if(id == 0){
            m.loadNewInfo();
        }else{
            m.loadInfo(id);
        }
    },
    loadNewInfo: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var session = GSmartApp.util.State.get('session');
        console.log(session);
        if(session.org_grant_id_link != null){
            viewModel.set('currentRec.orgid_from_link', session.org_grant_id_link);
        }
        viewModel.set('isCreateNew', true);
        viewModel.set('currentRec.id', 0);
        viewModel.set('currentRec.status', 0);
        viewModel.set('currentRec.handover_userid_link', session.id);
        viewModel.set('currentRec.handover_date', new Date());

        var viewId = viewModel.get('viewId');
        if(viewId == 'handover_cut_toline_detail'){
            viewModel.set('currentRec.handovertypeid_link', 1);
        }
        if(viewId == 'handover_cut_toprint_detail'){
            viewModel.set('currentRec.handovertypeid_link', 2);
        }
        if(viewId == 'handover_line_topack_detail'){
            viewModel.set('currentRec.handovertypeid_link', 4);
        }
        if(viewId == 'handover_line_toprint_detail'){
            viewModel.set('currentRec.handovertypeid_link', 5);
        }
        if(viewId == 'handover_pack_tostock_detail'){
            viewModel.set('currentRec.handovertypeid_link', 9);
        }

        var viewId = viewModel.get('viewId');
        // Xuất TP từ Tổ chuyền vào phòng Hoàn thiện
        // nếu org_grant_id_link là tổ chuyền thì chọn tổ chuyền, nếu không chọn combo
        if(viewId == 'handover_line_topack_detail'){
            // console.log(session);
            if(session.org_grant_id_link != null) {
                var params = new Object();
                params.id = session.org_grant_id_link;
                GSmartApp.Ajax.post('/api/v1/org/getOrgById', Ext.JSON.encode(params),
                    function (success, response, options) {
                        if (success) {
                            var response = Ext.decode(response.responseText);
                            data = response.data;
                            // console.log(data);
                            if(data != null && data.orgtypeid_link == 14){ // tổ chuyền
                                viewModel.set('currentRec.orgid_from_link', session.org_grant_id_link);
                                me.down('#orgid_from_link').setReadOnly(true);
                                m.loadListOrgStore_To(data.parentid_link, '9');
                            }
                        }
                    })
            }
        }
        // Xuất từ tổ chuyền đi in thêu
        // nếu org_grant_id_link là tổ chuyền thì chọn tổ chuyền, nếu không chọn combo
        if(viewId == 'handover_line_toprint_detail'){
            // console.log(session);
            if(session.org_grant_id_link != null) {
                var params = new Object();
                params.id = session.org_grant_id_link;
                GSmartApp.Ajax.post('/api/v1/org/getOrgById', Ext.JSON.encode(params),
                    function (success, response, options) {
                        if (success) {
                            var response = Ext.decode(response.responseText);
                            data = response.data;
                            // console.log(data);
                            if(data != null && data.orgtypeid_link == 14){ // tổ chuyền
                                viewModel.set('currentRec.orgid_from_link', session.org_grant_id_link);
                                me.down('#orgid_from_link').setReadOnly(true);
                                // m.loadListOrgStore_To(data.parentid_link, '9');
                            }
                        }
                    })
            }
        }
        // Xuất từ tổ hoàn thiện đi kho TP
        // nếu org_grant_id_link là tổ hoàn thiện thì chọn tổ hoàn thiện, nếu không chọn combo
        if(viewId == 'handover_pack_tostock_detail'){
            // console.log(session);
            if(session.org_grant_id_link != null) {
                var params = new Object();
                params.id = session.org_grant_id_link;
                GSmartApp.Ajax.post('/api/v1/org/getOrgById', Ext.JSON.encode(params),
                    function (success, response, options) {
                        if (success) {
                            var response = Ext.decode(response.responseText);
                            data = response.data;
                            // console.log(data);
                            if(data != null && data.orgtypeid_link == 9){ // Tổ hoàn thiện
                                viewModel.set('currentRec.orgid_from_link', session.org_grant_id_link);
                                me.down('#orgid_from_link').setReadOnly(true);
                                // m.loadListOrgStore_To(data.parentid_link, '9');
                            }
                        }
                    })
            }
        }
    },
    loadInfo: function(id){
        var m = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/handover/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    data = response.data;
                    viewModel.set('isCreateNew', false);
                    viewModel.set('currentRec', data);
                    // console.log(data);

                    var handover_date = viewModel.get('currentRec.handover_date');
                    var date = Ext.Date.parse(handover_date, 'c');
                    if (null == date) date = new Date(handover_date);
                    viewModel.set('currentRec.handover_date',date);
                    viewModel.set('pordercode',viewModel.get('currentRec.ordercode'));
                    // console.log(viewModel.get('currentRec'));

                    var viewId = viewModel.get('viewId');
                    // console.log(viewId);
                    if(
                        viewId == 'handover_cut_toline_detail' ||
                        viewId == 'handover_line_fromcut_detail'
                    ){
                        var ListOrgStore_To = viewModel.getStore('ListOrgStore_To');
                        ListOrgStore_To.loadStoreByPorderIdLink(data.porderid_link);
                    }

                    m.loadHandoverProduct(data.id);
                }
            })
    },
    loadHandoverProduct: function(handoverid_link){
        var viewModel = this.getViewModel();
        var HandoverProductStore = viewModel.getStore('HandoverProductStore');
        HandoverProductStore.removeAll();
        HandoverProductStore.loadStore_Async(handoverid_link);

        HandoverProductStore.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    // this.fireEvent('logout');
                } else {
                    var params=new Object();
                    params.handoverid_link = handoverid_link;
                    // console.log(params);
                    GSmartApp.Ajax.post('/api/v1/handoverproduct/getByHandoverId', Ext.JSON.encode(params),
                    function (success, response, options) {
                        var response = Ext.decode(response.responseText);
                        if (success) {
                            // console.log(response);
                            HandoverProductStore.setData(response.data);
                            HandoverProductStore.commitChanges();
                        }
                    }); 
                }
            }
        });
    },
    onEditSkuTotalPackage: function (editor, context, e) { console.log(context);
        var HandoverDetail_ProductGrid = Ext.getCmp('HandoverDetail_ProductGrid');
        var HandoverDetail_SkuGrid = Ext.getCmp('HandoverDetail_SkuGrid');
        // HandoverDetail_ProductGrid.setLoading(true);
        // HandoverDetail_SkuGrid.setLoading(true);

        var viewModel = this.getViewModel();
        var viewId = viewModel.get('viewId');
        var HandoverSkuStore = viewModel.getStore('HandoverSkuStore');

        if(
            viewId == 'handover_line_fromcut_detail' ||
            viewId == 'handover_pack_fromline_detail'
        ){
            if(context.colIdx == 2){
                HandoverSkuStore.rejectChanges();
                return;
            }
        }
        if(
            viewId == 'handover_cut_toline_detail' ||
            viewId == 'handover_cut_toprint_detail' ||
            viewId == 'handover_line_topack_detail' ||
            viewId == 'handover_line_topack_detail' ||
            viewId == 'handover_pack_tostock_detail'
        ){
            if(context.colIdx == 3){
                HandoverSkuStore.rejectChanges();
                return;
            }
        }
        
        if(context.value == context.originalValue){
            return;
        }
        if(context.value < 0 || context.value == ''){
            HandoverSkuStore.rejectChanges();
            return;
        }

        // update product theo sku
        var selection = HandoverDetail_ProductGrid.getSelectionModel().getSelection();
        var HandoverSkuStoreData = HandoverSkuStore.getData().items;
        var totalpackage = 0;
        if(context.field == "totalpackage"){
            for(var i = 0; i < HandoverSkuStoreData.length;i++){
                totalpackage+=parseInt(HandoverSkuStoreData[i].get('totalpackage'));
            }
            selection[0].set('totalpackage', totalpackage);
        }
        if(context.field == "totalpackagecheck"){
            for(var i = 0; i < HandoverSkuStoreData.length;i++){
                totalpackage+=parseInt(HandoverSkuStoreData[i].get('totalpackagecheck'));
            }
            selection[0].set('totalpackagecheck', totalpackage);
        }

        // HandoverDetail_ProductGrid.setLoading(false);
        // HandoverDetail_SkuGrid.setLoading(false);
        var isCreateNew = viewModel.get('isCreateNew');
        if(!isCreateNew){
            var me = this;
            if (context.field == "totalpackage" || context.field == "totalpackagecheck") {
                // me.updateTotalpackage(context.record);
                me.onLuu();
            }
        }else{
            HandoverSkuStore.commitChanges();
        }
    },
    onEditProductTotalPackage: function (editor, context, e) {
        console.log(context);
        var HandoverDetail_ProductGrid = Ext.getCmp('HandoverDetail_ProductGrid');
        var HandoverDetail_SkuGrid = Ext.getCmp('HandoverDetail_SkuGrid');
        // HandoverDetail_ProductGrid.setLoading(true);
        // HandoverDetail_SkuGrid.setLoading(true);

        var viewModel = this.getViewModel();
        var viewId = viewModel.get('viewId');
        var HandoverProductStore = viewModel.getStore('HandoverProductStore');

        if(
            viewId == 'handover_line_fromcut_detail' ||
            viewId == 'handover_pack_fromline_detail'
        ){
            if(context.colIdx == 3){
                HandoverProductStore.rejectChanges();
                return;
            }
        }
        if(
            viewId == 'handover_cut_toline_detail' ||
            viewId == 'handover_cut_toprint_detail' ||
            viewId == 'handover_line_topack_detail' ||
            viewId == 'handover_line_topack_detail' ||
            viewId == 'handover_pack_tostock_detail'
        ){
            if(context.colIdx == 4){
                HandoverProductStore.rejectChanges();
                return;
            }
        }
        if(context.value == context.originalValue){
            return;
        }
        if(context.value < 0 || context.value == ''){
            HandoverProductStore.rejectChanges();
            return;
        }

        // HandoverDetail_ProductGrid.setLoading(false);
        // HandoverDetail_SkuGrid.setLoading(false);
        var isCreateNew = viewModel.get('isCreateNew');
        if(!isCreateNew){
            var me = this;
            if (context.field == "totalpackage" || context.field == "totalpackagecheck") {
                // me.updateProductTotalpackage(context.record);
                me.onLuu();
            }
        }else{
            HandoverProductStore.commitChanges();
        }
    },
    updateProductTotalpackage: function(record){
        var grid = this.getView();
        // console.log(record.data);
        var me = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.data = record.data;
        GSmartApp.Ajax.post('/api/v1/handoverproduct/updateHandoverProduct', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var HandoverProductStore = viewModel.getStore('HandoverProductStore');
                    if (response.respcode != 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        HandoverProductStore.rejectChanges();
                    }
                    else {
                        HandoverProductStore.commitChanges();
                    }
                }
            })
    },
    onMenu: function(grid, rowIndex, colIndex, item, e, record){
        var me = this;
        var viewModel = this.getViewModel();
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
            {
                text: 'Chi tiết SKU',
                itemId: 'btnSKU',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-edit brownIcon',
                handler: function(){
                    var record = this.parentMenu.record;
                    // console.log(record);
                    // me.onEdit(record);
                    var porderid_link = viewModel.get('currentRec.porderid_link');
                    var handoverid_link = viewModel.get('currentRec.id');
                    var handoverproductid_link = record.data.id;
                    var productid_link = record.data.productid_link;
                    var viewId = viewModel.get('viewId');

                    var form = Ext.create('Ext.window.Window', {
                        height: 400,
                        width: 600,
                        closable: true,
                        resizable: false,
                        modal: true,
                        border: false,
                        title: 'Chi tiết SKU',
                        closeAction: 'destroy',
                        bodyStyle: 'background-color: transparent',
                        layout: {
                            type: 'fit', // fit screen for window
                            padding: 5
                        },
                        items: [{
                            xtype: 'HandoverDetailSKUDetail',
                            viewModel: {
                                type: 'HandoverDetailSKUDetailViewModel',
                                data: {
                                    handoverid_link: handoverid_link, 
                                    handoverproductid_link: handoverproductid_link, 
                                    porderid_link: porderid_link, 
                                    productid_link: productid_link,
                                    viewId: viewId
                                }
                            }
                        }]
                    });
                    form.show();
                },
            }
        ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX()-10, e.getY()-10];
        e.stopEvent();
        menu_grid.record = record;
        menu_grid.showAt(position);
        // common.Check_Menu_Permission(menu_grid);
    },
    onConfirm: function(){
        // nhận
        var viewModel = this.getViewModel();
        var handoverid_link = viewModel.get('currentRec.id');
        var viewId = viewModel.get('viewId');
        var status = viewModel.get('currentRec.status');
        var form = Ext.create('Ext.window.Window', {
            // height: 200,
            width: 315,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Xác thực',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'HandoverDetailConfirm',
                viewModel: {
                    type: 'HandoverDetailConfirmViewModel',
                    data: {
                        handoverid_link: handoverid_link,
                        viewId: viewId,
                        currentStatus: status
                    }
                }
            }]
        });
        form.show();
    },
    loadHandoverProductOnPorderSelect: function(porderid_link){
        var viewModel = this.getViewModel();
        var params = new Object();
        params.porderid_link = porderid_link;

        GSmartApp.Ajax.post('/api/v1/handoverproduct/getByPorderId', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        response.data.buyercode = response.buyercode;
                        response.data.buyername = response.buyername;
                        response.data.unitName = response.unitName;
                        
                        var data = new Array();
                        data.push(response.data);

                        var HandoverProductStore = viewModel.getStore('HandoverProductStore');
                        HandoverProductStore.setData(data);
                        HandoverProductStore.commitChanges();
                    }
                }
            })
    },
    onPressEnterPordercode: function(textfield, e, eOpts){
        var me = this;
        if(e.getKey() == e.ENTER) {
            // Ext.Msg.alert('Keys','You pressed the Enter key');
            me.onBtnPlus();
        }
    },
    onOrgFromComboSelect: function(cbo, record, eOpts){
        // console.log(record.data.parentid_link);
        var me = this.getView();
        var viewModel = this.getViewModel();
        var parentid_link = record.data.parentid_link;
        var viewId = viewModel.get('viewId');
        if(viewId == 'handover_line_topack_detail'){
            this.loadListOrgStore_To(parentid_link, '9');
            me.down('#orgid_to_link').setValue(null);
        }
    },
    onOrgToComboSelect: function(cbo, record, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var parentid_link = record.data.parentid_link;
        var viewId = viewModel.get('viewId');

        if(viewId == 'handover_cut_toline_detail'){
            var porderid_link = viewModel.get('currentRec.porderid_link');
            m.loadHandoverProductOnPorderSelect(porderid_link);
        }
    },

    loadListOrgStore_To: function(parentid_link, orgtypestring){
        var viewModel = this.getViewModel();
        var ListOrgStore_To = viewModel.getStore('ListOrgStore_To');
        ListOrgStore_To.getbyParentandType(parentid_link,orgtypestring);
    },

    /////////// RADIO PACK TO STOCK
    onRadioChange: function(rdo, newValue, oldValue, eOpts ) {
        // var viewModel = this.getViewModel();
        // console.log(viewModel.get('radioVal'));
        // console.log(newValue);
    },
    // Nhap thu cong
    onPressEnterBuyerCodePackToStock: function(textfield, e, eOpts){
        var me = this;
        if(e.getKey() == e.ENTER) {
            var me = this;
        var viewModel = this.getViewModel();
        var ptsBuyerCode = viewModel.get('ptsBuyerCode');

        if(ptsBuyerCode == null || ptsBuyerCode.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Mã SP(Buyer) không được bỏ trống',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

        var params = new Object();
        params.buyercode = ptsBuyerCode;

        GSmartApp.Ajax.post('/api/v1/product/getProductByExactBuyercode', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        // console.log(response);
                        if(response.message == 'Mã SP(buyer) không tồn tại'){
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                            me.getView().down('#ptsBuyerCode').focus();
                        }else{
                            me.getView().down('#ptsQuantity').focus();
                        }
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Lấy thông tin thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Lấy thông tin thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
        }
    },
    onPressEnterQuantityPackToStock: function(textfield, e, eOpts){
        if(e.getKey() == e.ENTER) {
            var me = this;
            var viewModel = this.getViewModel();
            var ptsQuantity = viewModel.get('ptsQuantity');

            if(ptsQuantity == null || ptsQuantity.length == 0){
                Ext.Msg.show({
                    title: 'Thông báo',
                    msg: 'Số lượng không được bỏ trống',
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                return;
            }

            me.onBtnAddProductPackToStock();
        }
    },
    onBtnAddProductPackToStock: function(){
        var me = this;
        var viewModel = this.getViewModel();
        var ptsQuantity = viewModel.get('ptsQuantity');
        var ptsBuyerCode = viewModel.get('ptsBuyerCode');

        if(ptsBuyerCode == null || ptsBuyerCode.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Mã SP(Buyer) không được bỏ trống',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            me.getView().down('#ptsBuyerCode').focus();
            return;
        }
        if(ptsQuantity == null || ptsQuantity.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Số lượng không được bỏ trống',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            me.getView().down('#ptsQuantity').focus();
            return;
        }

        var params = new Object();
        params.buyercode = ptsBuyerCode;

        GSmartApp.Ajax.post('/api/v1/product/getProductByExactBuyercode', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        // console.log(response);
                        if(response.message == 'Mã SP(buyer) không tồn tại'){
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                            me.getView().down('#ptsBuyerCode').focus();
                        }else{
                            // console.log(response.data);
                            var productid_link = response.data.id;
                            var product_quantity = ptsQuantity;

                            // kiểm tra Product Store có chứa product hay ko
                            var HandoverProductStore = viewModel.getStore('HandoverProductStore');
                            var index = HandoverProductStore.find('productid_link', productid_link,
                            0, false, false, true);
                            if(index != -1){
                                Ext.Msg.show({
                                    title: 'Thông báo',
                                    msg: 'Sản phẩm đã có trong danh sách',
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                                return;
                            }
                            me.addToProductStore(productid_link, product_quantity);
                        }
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Lấy thông tin thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Lấy thông tin thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })

    },
    addToProductStore: function(productid_link, product_quantity){
        var me = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.productid_link = productid_link;
        params.product_quantity = product_quantity;

        GSmartApp.Ajax.post('/api/v1/handoverproduct/getNewHandoverProductByProductId', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    response.data.buyercode = response.buyercode;
                    response.data.buyername = response.buyername;
                    response.data.unitName = response.unitName;

                    var HandoverProductStore = viewModel.getStore('HandoverProductStore');
                    HandoverProductStore.add(response.data);

                    if(viewModel.get('currentRec.id') != null && viewModel.get('currentRec.id') > 0){
                        // console.log(response.data);
                        response.data.handoverid_link = viewModel.get('currentRec.id');
                        me.addProductToDb(response.data);
                    }
                }
            })

    },
    addProductToDb: function (data) {
        var me = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.data = data;

        GSmartApp.Ajax.post('/api/v1/handoverproduct/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var HandoverProductStore = viewModel.getStore('HandoverProductStore');
                    HandoverProductStore.load();
                }
            })
    },
    // Nhap ma vach sku
    onPressEnterSkuCodePackToStock: function(textfield, e, eOpts){
        // window
        var me = this;
        if(e.getKey() == e.ENTER) {
            var viewModel = this.getViewModel();
            var ptsSkuCode = viewModel.get('ptsSkuCode');

            if(ptsSkuCode == null || ptsSkuCode.length == 0){
                Ext.Msg.show({
                    title: 'Thông báo',
                    msg: 'Mã vạch không được bỏ trống',
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                me.getView().down('#ptsSkuCode').focus();
                return;
            }

            me.BtnAddSkuPackToStock(ptsSkuCode, 10);
        }
    },
    onBtnAddSkuPackToStock: function(){
        var me = this;
        var viewModel = this.getViewModel();
        var ptsSkuCode = viewModel.get('ptsSkuCode');

        if(ptsSkuCode == null || ptsSkuCode.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Mã vạch không được bỏ trống',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            me.getView().down('#ptsSkuCode').focus();
            return;
        }

        me.BtnAddSkuPackToStock(ptsSkuCode, 10);
    },
    BtnAddSkuPackToStock: function(skucode, skutypeid_link){
        // window
        var me = this;
        var params = new Object();
        params.skucode = skucode;
        params.skutypeid_link = skutypeid_link;

        GSmartApp.Ajax.post('/api/v1/sku/getProductSKU_ByCode', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        // console.log(response);
                        if(response.message == 'Mã vạch không tồn tại'){
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                            me.getView().down('#ptsSkuCode').focus();
                        }else{
                            me.addProductByBarcodePackToStock(response.data);
                        }
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Lấy thông tin thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Lấy thông tin thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
        
    },
    addProductByBarcodePackToStock: function(data){
        var me = this;
        var viewModel = this.getViewModel();
        var handoverid_link = viewModel.get('currentRec.id'); // 0
        var viewId = viewModel.get('viewId'); // handover_pack_tostock_detail

        var data = data[0];
        data.skuCode = data.code;
        data.skuColor = data.color_name;
        data.skuSize = data.size_name;
        data.skuSizeSortVal = data.sort_size;
        data.totalpackage = 1;
        // console.log(data);
        
        var HandoverProductStore = viewModel.getStore('HandoverProductStore');

        var handoverSku = new Object();
        handoverSku.productid_link = data.productid_link;
        handoverSku.skuid_link = data.id;
        handoverSku.totalpackage = 1;

        var index = HandoverProductStore.find('productid_link', data.productid_link,
        0, false, false, true);
        if(index != -1){
            // đã có
            // console.log(index);
            var products = HandoverProductStore.getData().items;
            var p = HandoverProductStore.findRecord('productid_link', data.productid_link,
            0, false, false, true);
            var product = p.data;

            if(product.handoverSKUs.length > 0){
                // console.log('>0');
                var SKUs = product.handoverSKUs;
                var isSkusExist = false;
                for(var i=0;i<SKUs.length;i++){
                    var sku = SKUs[i];
                    // console.log(handoverSKU);
                    if(sku.skuid_link == handoverSku.skuid_link){
                        sku.totalpackage += handoverSku.totalpackage;
                        isSkusExist = true;
                    }
                }
                if(!isSkusExist){
                    SKUs.push(handoverSku);
                }

                var total = 0;
                for(var i=0;i<SKUs.length;i++){
                    var sku = SKUs[i];
                    total+=parseInt(sku.totalpackage);
                }
                // product.totalpackage = total;
                p.set('totalpackage', total);
            }else{
                // console.log('=0');
                var SKUs = product.handoverSKUs;
                SKUs.push(handoverSku);
                var total = 0;
                for(var i=0;i<SKUs.length;i++){
                    var sku = SKUs[i];
                    total+=parseInt(sku.totalpackage);
                }
                p.set('totalpackage', total);
            }
        }else{
            // chưa có, thêm product vào store
            var handoverProduct = new Object();
            handoverProduct.productid_link = handoverSku.productid_link;
            handoverProduct.unitid_link = 2;
            handoverProduct.totalpackage = handoverSku.totalpackage;
            handoverProduct.buyercode  = data.product_code;
            handoverProduct.buyername = data.product_name;
            handoverProduct.unitName = 'Chiếc';

            var handoverSKUs = new Array();
            handoverSKUs.push(handoverSku);

            handoverProduct.handoverSKUs = handoverSKUs;
            HandoverProductStore.add(handoverProduct);
        }

        if(handoverid_link != null && handoverid_link != 0){
            me.LuuProduct();
        }

    },
    LuuProduct: function(){
        var me = this;
        var viewModel = this.getViewModel();
        var HandoverProductStore = viewModel.getStore('HandoverProductStore');

        var handoverProductsData = HandoverProductStore.getData().items;
        var handoverProducts = new Array();
        // console.log(handoverProductsData);
        for(var i=0;i<handoverProductsData.length;i++){
            // console.log(handoverProductsData[i].data.buyercode);
            handoverProducts.push(handoverProductsData[i].data);
        }

        var params = new Object();
        var data = new Object();
        data = viewModel.get('currentRec');

        data.handoverProducts = handoverProducts;

        params.data = data;
        params.msgtype = "HANDOVER_CREATE";
        params.message = "Tạo handover";

        GSmartApp.Ajax.post('/api/v1/handover/create', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.respcode == 200) {
                        
                        viewModel.set('currentRec', response.data);
                        var handover_date = viewModel.get('currentRec.handover_date');
                        var date = Ext.Date.parse(handover_date, 'c');
                        if (null == date) date = new Date(handover_date);
                        viewModel.set('currentRec.handover_date',date);

                        HandoverProductStore.load();
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Lưu thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Lưu thất bại',
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    loadSkuCodePackToStockWindow:function(data){
        var viewModel = this.getViewModel();
        var handoverid_link = viewModel.get('currentRec.id'); // 0
        var viewId = viewModel.get('viewId'); // handover_pack_tostock_detail
        // console.log(handoverid_link);
        // console.log(viewId);
        // console.log(data);

        var form = Ext.create('Ext.window.Window', {
            height: 400,
            width: 500,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Chi tiết SKU',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'HandoverDetailSKUDetail',
                viewModel: {
                    type: 'HandoverDetailSKUDetailViewModel',
                    data: {
                        handoverid_link: handoverid_link,
                        viewId: viewId,
                        data: data,
                        handoverproductid_link: null, 
                        porderid_link: null, 
                        productid_link: null,
                    }
                }
            }]
        });
        form.show();
    },

    // change cbo org to
    onOrgToCboSelect:function(){},

    //
    onHandoverDetail_ProductGridItemClick:function(grid, record, item, index, e, eOpts){
        console.log('onHandoverDetail_ProductGridItemClick');
        var m = this;
        var viewModel = this.getViewModel();
        var currentRec = viewModel.get('currentRec');
        // console.log(currentRec);
        // console.log(record);

        if(currentRec.id == null || currentRec.id == 0){ // handover moi, chua co du lieu 
            console.log(1);
            var handoverSKUs = record.get('handoverSKUs');
            if(handoverSKUs == null || handoverSKUs.length == 0){
                // lay sku theo porder
                console.log(1);
                var porderid_link = viewModel.get('currentRec.porderid_link');
                var productid_link = record.get('productid_link');
                var handoverid_link = currentRec.id;
                m.getNewHandoverSKUs(record, handoverid_link, porderid_link, productid_link);
                // console.log('getNewHandoverSKUs');
            }else{
                // set HandoverDetail_SkuGrid theo handoverSKUs
                m.setOldHandoverSKUs(record);
                // console.log('setOldHandoverSKUs 1');
            }
        }else{ // handover cu, da co du lieu
            // lay sku theo handover
            var handoverSKUs = record.get('handoverSKUs');
            if(handoverSKUs == null || handoverSKUs.length == 0){
                // neu chua co handoverSKUs
            }else{
                // neu co handoverSKUs
                m.setOldHandoverSKUs(record);
                // console.log('setOldHandoverSKUs 2');
            }
        }
    },

    getNewHandoverSKUs:function(record, handoverid_link, porderid_link, productid_link){
        var m = this;
        var viewModel = this.getViewModel();
        var orgid_to_link = viewModel.get('currentRec.orgid_to_link');

        var params = new Object();
        params.handoverid_link = handoverid_link;
        params.porderid_link = porderid_link;
        params.productid_link = productid_link;
        params.orgid_to_link = orgid_to_link; // org grant

        GSmartApp.Ajax.post('/api/v1/handoversku/getByHandoverProduct', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    var data = response.data;
                    for(var i=0; i<data.length; i++) {
                        data[i].skuCode = data[i].skuCodeString;
                        data[i].skuColor = data[i].skuColorString;
                        data[i].skuSize = data[i].skuSizeString;
                        data[i].skuSizeSortVal = data[i].skuSizeSortValInt;
                    }

                    var HandoverSkuStore = viewModel.getStore('HandoverSkuStore');
                    HandoverSkuStore.setData(data);
                    HandoverSkuStore.commitChanges();
                    record.set('handoverSKUs', []);
                    record.set('handoverSKUs', data);
                }else{
                    console.log('fail');
                }
            })
    },
    setOldHandoverSKUs: function (record){
        var m = this;
        var viewModel = this.getViewModel();
        var HandoverSkuStore = viewModel.getStore('HandoverSkuStore');
        HandoverSkuStore.setData(record.get('handoverSKUs'));
        HandoverSkuStore.commitChanges();
        // console.log(record.get('handoverSKUs'));
    }
})