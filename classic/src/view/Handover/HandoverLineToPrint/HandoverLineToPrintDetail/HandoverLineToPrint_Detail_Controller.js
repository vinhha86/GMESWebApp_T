Ext.define('GSmartApp.view.handover.HandoverLineToPrint_Detail_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverLineToPrint_Detail_Controller',
    init: function () {
        var session = GSmartApp.util.State.get('session');
        console.log(session);
        var m = this;
        var viewModel = this.getViewModel();
        var UserListStore = viewModel.getStore('UserListStore');
        UserListStore.loadUserbyOrg(1);

        var ListOrgStore_From = viewModel.getStore('ListOrgStore_From');
        var ListOrgStore_To = viewModel.getStore('ListOrgStore_To');

        if(Ext.getCmp('handover_line_toprint_detail')){
            m.getView().setTitle('Xuất thành phẩm đến in thêu');
            viewModel.set('viewId', 'handover_line_toprint_detail');
            viewModel.set('viewIdParent', 'handover_line_toprint_edit');
            viewModel.set('viewIdList', 'handover_line_toprint');
            var orgtypestring_from = '14';
            if(session.orgid_link == 1){
                // lấy hết nếu orgid_link == 1
                ListOrgStore_From.loadStoreByOrgTypeString(orgtypestring_from);
            }else{ 
                // lấy của px nếu orgid_link là px
                ListOrgStore_From.getbyParentandType(session.orgid_link, orgtypestring_from);
            }
            var orgtypestring_to = '20';
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
        '#HandoverLineToPrint_Detail_ProductGrid': {
            select: 'onHandoverDetail_ProductGridItemClick'
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

                            // if(viewId == 'handover_line_toprint_detail'){
                            //     var ListOrgStore_To = viewModel.getStore('ListOrgStore_To');
                            //     ListOrgStore_To.loadStoreByPorderIdLink(porderid_link);
                            //     me.getView().down('#orgid_to_link').setValue(null);
                            //     me.getView().down('#orgid_to_link').focus();
                            // }

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
        var me = this.getView();
        var viewModel = this.getViewModel();
        var pordercode = viewModel.get('pordercode');
        var viewId = viewModel.get('viewId');

        var HandoverProductStore = viewModel.getStore('HandoverProductStore');
        var HandoverSkuStore = viewModel.getStore('HandoverSkuStore');

        var currentRec = viewModel.get('currentRec');
        var granttoorgid_link = null;
        granttoorgid_link = currentRec.orgid_to_link;

        if((pordercode == null || pordercode.length == 0)){
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
                xtype: 'HandoverLineToPrint_Detail_PorderSearch',
                viewModel: {
                    type: 'HandoverLineToPrint_Detail_PorderSearchViewModel',
                    data: {
                        pordercode: pordercode,
                        granttoorgid_link: granttoorgid_link,
                        viewId: viewId
                    }
                }
            }]
        });
        form.show();

        form.down('#HandoverLineToPrint_Detail_PorderSearch').getController().on('found0Porder', function () {
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
        form.down('#HandoverLineToPrint_Detail_PorderSearch').getController().on('found1Porder', function (record) {
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

            HandoverProductStore.setData([]);
            HandoverSkuStore.setData([]);

            //// load HandoverProductStore data here
            m.loadHandoverProductOnPorderSelect(porderid_link);

            form.close();
        });

        form.down('#HandoverLineToPrint_Detail_PorderSearch').getController().on('foundManyPorder', function (select) {
            if(select.length == 0){
                Ext.Msg.show({
                    title: "Thông báo",
                    msg: "Phải chọn ít nhất một lệnh",
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                return;
            }
    
            var porderid_link = select[0].data.id;
            var ordercode = select[0].data.ordercode;
    
            // cut to line, load store ListOrgStore_To
            // var ListOrgStore_To = viewModel.getStore('ListOrgStore_To');
            // ListOrgStore_To.loadStoreByPorderIdLink(porderid_link);
            // me.down('#orgid_to_link').setValue(null);
            // me.down('#orgid_to_link').focus();
    
            viewModel.set('currentRec.porderid_link', porderid_link);
            viewModel.set('pordercode', ordercode);

            HandoverProductStore.setData([]);
            HandoverSkuStore.setData([]);

            //// load HandoverProductStore data here
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
                                    var HandoverDetail_ProductGrid = Ext.getCmp('HandoverLineToPrint_Detail_ProductGrid');
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
        if(viewId == 'handover_line_toprint_detail'){
            viewModel.set('currentRec.handovertypeid_link', 5);
        }

        var viewId = viewModel.get('viewId');
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
                    // if(
                    //     viewId == 'handover_line_toprint_detail'
                    // ){
                    //     var ListOrgStore_To = viewModel.getStore('ListOrgStore_To');
                    //     ListOrgStore_To.loadStoreByPorderIdLink(data.porderid_link);
                    // }

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

                            if(Ext.getCmp('HandoverLineToPrint_Detail_ProductGrid')){
                                Ext.getCmp('HandoverLineToPrint_Detail_ProductGrid').getSelectionModel().select(0, true);
                            }
                        }
                    }); 
                }
            }
        });
    },
    onEditSkuTotalPackage: function (editor, context, e) { console.log(context);
        var HandoverDetail_ProductGrid = Ext.getCmp('HandoverLineToPrint_Detail_ProductGrid');
        var HandoverDetail_SkuGrid = Ext.getCmp('HandoverLineToPrint_Detail_SkuGrid');
        // HandoverDetail_ProductGrid.setLoading(true);
        // HandoverDetail_SkuGrid.setLoading(true);

        var viewModel = this.getViewModel();
        var currentRec = viewModel.get('currentRec');
        var viewId = viewModel.get('viewId');
        var HandoverProductStore = viewModel.getStore('HandoverProductStore');
        var HandoverSkuStore = viewModel.getStore('HandoverSkuStore');

        if(
            viewId == 'handover_line_toprint_detail'
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

        context.value = parseInt(context.value);
        if(context.field == "totalpackage"){
            context.record.set('totalpackage', context.value);
            // if(currentRec.status == 0){
            //     context.record.set('totalpackagecheck', context.value);
            // }
        }
        if(context.field == "totalpackagecheck"){
            context.record.set('totalpackagecheck', context.value);
        }

        // update product theo sku
        var selection = HandoverDetail_ProductGrid.getSelectionModel().getSelection();
        var HandoverSkuStoreData = HandoverSkuStore.getData().items;
        var totalpackage = 0;
        var totalpackagecheck = 0;
        if(context.field == "totalpackage"){
            for(var i = 0; i < HandoverSkuStoreData.length;i++){
                totalpackage+=parseInt(HandoverSkuStoreData[i].get('totalpackage'));
                totalpackagecheck+=parseInt(HandoverSkuStoreData[i].get('totalpackagecheck'));
            }
            selection[0].set('totalpackage', totalpackage);
            // if(currentRec.status == 0){
            //     selection[0].set('totalpackagecheck', totalpackagecheck);
            // }
        }
        if(context.field == "totalpackagecheck"){
            for(var i = 0; i < HandoverSkuStoreData.length;i++){
                totalpackagecheck+=parseInt(HandoverSkuStoreData[i].get('totalpackagecheck'));
            }
            selection[0].set('totalpackagecheck', totalpackagecheck);
        }
        HandoverProductStore.commitChanges();

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
        var HandoverDetail_ProductGrid = Ext.getCmp('HandoverLineToPrint_Detail_ProductGrid');
        var HandoverDetail_SkuGrid = Ext.getCmp('HandoverLineToPrint_Detail_SkuGrid');
        // HandoverDetail_ProductGrid.setLoading(true);
        // HandoverDetail_SkuGrid.setLoading(true);

        var viewModel = this.getViewModel();
        var currentRec = viewModel.get('currentRec');
        var viewId = viewModel.get('viewId');
        var HandoverProductStore = viewModel.getStore('HandoverProductStore');

        if(
            viewId == 'handover_line_toprint_detail'
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

        //
        context.value = parseInt(context.value);
        if(context.field == "totalpackage"){
            context.record.set('totalpackage', context.value);
            // if(currentRec.status == 0){
            //     context.record.set('totalpackagecheck', context.value);
            // }
        }
        if(context.field == "totalpackagecheck"){
            context.record.set('totalpackagecheck', context.value);
        }

        var isCreateNew = viewModel.get('isCreateNew');
        if(!isCreateNew){
            var me = this;
            me.onLuu();
        }else{
            HandoverProductStore.commitChanges();
        }

        // console.log(currentRec); console.log(context); 
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
    
    onConfirm: function(){
        // nhận
        var me = this;
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
                xtype: 'HandoverLineToPrint_Detail_Confirm',
                viewModel: {
                    type: 'HandoverLineToPrint_Detail_ConfirmViewModel',
                    data: {
                        handoverid_link: handoverid_link,
                        viewId: viewId,
                        currentStatus: status
                    }
                }
            }]
        });
        form.show();

        form.down('#HandoverLineToPrint_Detail_Confirm').getController().on('updateStatus', function (obj) {
            me.updateStatus(obj);
            form.close();
        });
    },
    updateStatus: function(obj){
        var me = this;
        var viewModel = this.getViewModel();

        // update status params
        var status = obj.status;
        var handoverid_link = obj.handoverid_link;
        var approver_userid_link = obj.approver_userid_link;
        var receiver_userid_link = obj.receiver_userid_link;

        // handover obj params
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
        params.status = status;
        params.handoverid_link = handoverid_link;
        params.approver_userid_link = approver_userid_link;
        params.receiver_userid_link = receiver_userid_link;
        params.msgtype = "HANDOVER_SETSTATUS";
        params.message = "Set status";

        GSmartApp.Ajax.post('/api/v1/handover/setstatus', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        if(response.message == 'Không tồn tại POrderProcessing'){
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }else {
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: 'Xác thực thành công',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                },
                                fn: function (btn) {
                                    if (btn === 'yes') {
                                        viewModel.set('currentRec', response.data);
                                        var handover_date = viewModel.get('currentRec.handover_date');
                                        var date = Ext.Date.parse(handover_date, 'c');
                                        if (null == date) date = new Date(handover_date);
                                        viewModel.set('currentRec.handover_date',date);

                                        var viewIdList = viewModel.get('viewIdList');
                                        me.redirectTo(viewIdList + "/" + response.data.id + "/edit");
                                    }
                                }
                            });


                        }
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Xác thực thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Xác thực thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
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

                        if(Ext.getCmp('HandoverLineToPrint_Detail_ProductGrid')){
                            Ext.getCmp('HandoverLineToPrint_Detail_ProductGrid').getSelectionModel().select(0, true);
                        }
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

    },
    onOrgToComboSelect: function(cbo, record, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var parentid_link = record.data.parentid_link;
        var viewId = viewModel.get('viewId');

        // if(viewId == 'handover_line_toprint_detail'){
        //     var porderid_link = viewModel.get('currentRec.porderid_link');
        //     m.loadHandoverProductOnPorderSelect(porderid_link);
        // }
    },

    loadListOrgStore_To: function(parentid_link, orgtypestring){
        var viewModel = this.getViewModel();
        var ListOrgStore_To = viewModel.getStore('ListOrgStore_To');
        ListOrgStore_To.getbyParentandType(parentid_link,orgtypestring);
    },
    //
    onHandoverDetail_ProductGridItemClick:function(selectionModel, record, index, eOpts){
        console.log('onHandoverDetail_ProductGridItemClick');
        var m = this;
        var viewModel = this.getViewModel();
        var currentRec = viewModel.get('currentRec');
        // console.log(currentRec);
        // console.log(record);

        if(currentRec.id == null || currentRec.id == 0){ // handover moi, chua co du lieu 
            var handoverSKUs = record.get('handoverSKUs');
            if(handoverSKUs == null || handoverSKUs.length == 0){
                // lay sku theo porder
                var porderid_link = viewModel.get('currentRec.porderid_link');
                var productid_link = record.get('productid_link');
                var handoverid_link = currentRec.id;
                m.getNewHandoverSKUs(record, handoverid_link, porderid_link, productid_link);
            }else{
                // set HandoverDetail_SkuGrid theo handoverSKUs
                m.setOldHandoverSKUs(record);
            }
        }else{ // handover cu, da co du lieu
            // lay sku theo handover
            var handoverSKUs = record.get('handoverSKUs');
            if(handoverSKUs == null || handoverSKUs.length == 0){
                // neu chua co handoverSKUs
            }else{
                // neu co handoverSKUs
                m.setOldHandoverSKUs(record);
            }
        }
    },

    getNewHandoverSKUs:function(record, handoverid_link, porderid_link, productid_link){
        var m = this;
        var viewModel = this.getViewModel();
        var orgid_from_link = viewModel.get('currentRec.orgid_from_link');

        var params = new Object();
        params.handoverid_link = handoverid_link;
        params.porderid_link = porderid_link;
        params.productid_link = productid_link;
        params.orgid_from_link = orgid_from_link; // org grant

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
    },

    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
	},
})