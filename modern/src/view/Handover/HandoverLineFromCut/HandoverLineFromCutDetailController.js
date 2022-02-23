Ext.define('GSmartApp.view.handover.HandoverLineFromCutDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverLineFromCutDetailController',
    init: function() {
        var viewModel = this.getViewModel();
        viewModel.set('viewId', 'handover_line_fromcut_edit');
        viewModel.set('viewIdList', 'handover_line_fromcut');

        var UserListStore = viewModel.getStore('UserListStore');
        UserListStore.loadUserbyOrg(1);

        var ListOrgStore_From = viewModel.getStore('ListOrgStore_From');
        var ListOrgStore_To = viewModel.getStore('ListOrgStore_To');
        var orgtypestring_from = '17';
        ListOrgStore_From.loadStoreByOrgTypeString(orgtypestring_from);
        // cut to line chon porder de load ListOrgStore_To, nhung van cho chon to chuyen
        var orgtypestring_to = '14';
        ListOrgStore_To.loadStoreByOrgTypeString(orgtypestring_to);
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData',
                // newdata: 'onNewData',
				// urlBack:'onUrlBack'
            }
        }
	},
    control: {
        '#btnLuu': {
            tap: 'onLuu'
        },
        // '#btnDelete': {
        //     tap: 'onDelete'
        // },
        '#btnHandover': {
            tap: 'onConfirm'
        },
        '#btnCancelConfirm': {
            tap: 'onCancelConfirm'
        },
        // '#btnPlus': {
        //     tap: 'onBtnPlus'
        // },
        // '#btnSearch': {
        //     tap: 'onBtnSearch'
        // },
        '#btnHome':{
            tap: 'onBtnHomeTap'
        },
        '#btnBack': {
            tap: 'onBtnBackTap'
        }
    },
    onBtnHomeTap: function(){
        this.redirectTo("mobilemenu");
    },
    onBtnBackTap: function(){
        // Ext.util.History.back();
        this.redirectTo("handover_line_fromcut");
    },
    onLoadData: function (id){
        var m = this;
        var viewModel = this.getViewModel();
        viewModel.set('id', id);
        if(id == 0){
            // console.log('onLoadData: id 0');
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
        viewModel.set('isCreateNew', true);
        viewModel.set('currentRec.id', 0);
        viewModel.set('currentRec.status', 0);
        viewModel.set('currentRec.handover_userid_link', session.id);
        viewModel.set('currentRec.handover_date', new Date());
        viewModel.set('currentRec.handovertypeid_link', 1);
    },
    loadInfo: function(id){
        var viewModel = this.getViewModel();
        var id = viewModel.get('id');

        var params = new Object();
        params.id = id;

        var mainView = Ext.getCmp('handover_line_fromcut_edit');
        if(mainView) {
            mainView.setMasked({
                xtype: 'loadmask',
                message: 'Đang tải'
            });
        }

        GSmartApp.Ajax.post('/api/v1/handover/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if(mainView) {
                    mainView.setMasked(false);
                }
                if (success) {
                    var response = Ext.decode(response.responseText);
                    data = response.data;

                    // console.log('function loadInfo: success');
                    // console.log(data);

                    var date = Ext.Date.parse(data.handover_date, 'c');
                    if(date == null) date = new Date(data.handover_date);
                    data.handover_date = date;

                    // set data
                    viewModel.set('isCreateNew', false);
                    viewModel.set('currentRec', data);

                    var pordercode = data.ordercode.toString();
                    viewModel.set('pordercode',pordercode);

                    var ListOrgStore_To = viewModel.getStore('ListOrgStore_To');
                    ListOrgStore_To.loadStoreByPorderIdLink(data.porderid_link);

                    // set sku store
                    var handoverProducts = data.handoverProducts;
                    if(handoverProducts != null && handoverProducts.length > 0){
                        var handoverProduct = handoverProducts[0];
                        viewModel.set('handoverProduct',handoverProduct);
                        if(
                            handoverProduct != null && 
                            handoverProduct.handoverSKUs != null && 
                            handoverProduct.handoverSKUs.length > 0
                        ){
                            var handoverSKUs = handoverProduct.handoverSKUs;
                            var HandoverSkuStore = viewModel.getStore('HandoverSkuStore');
                            HandoverSkuStore.setData([]);
                            HandoverSkuStore.setData(handoverSKUs);
                            viewModel.set('handoverSKUs',handoverSKUs);
                            // console.log(HandoverSkuStore);

                            // Update mac dinh so nhan = so giao
                            var status = viewModel.get('currentRec.status');
                            if(status == 1){
                                var handoverProductTotalPackagecheck =0;
                                for(var i=0; i<HandoverSkuStore.data.items.length;i++){
                                    var data = HandoverSkuStore.data.items[i];
                                    data.set('totalpackagecheck', data.get('totalpackage'));
                                    handoverProductTotalPackagecheck = handoverProductTotalPackagecheck + data.get('totalpackage');
                                }
                                viewModel.set('handoverProduct.totalpackagecheck', handoverProductTotalPackagecheck);
                            }
                        }
                    }
                }else{
                    console.log('function loadInfo: failed');
                }
            })
    },
    onLuu: function(btn, e, eOpts){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var currentRec = viewModel.get('currentRec');
        var handoverProduct = viewModel.get('handoverProduct');
        // console.log(currentRec);
        // console.log(handoverProduct);

        var handoverProducts = new Array();
        handoverProducts.push(handoverProduct);

        var params = new Object();
        var data = new Object();
        data = viewModel.get('currentRec');
        data.handoverProducts = handoverProducts;

        //
        if(data.id == 0 || isNaN(data.id)){
            data.id = null;
        }
        if(data.handoverProducts != null){
            for(var i=0; i<data.handoverProducts.length; i++){
                var handoverProduct = data.handoverProducts[i];
                if(handoverProduct.id == 0 || isNaN(handoverProduct.id)){
                    handoverProduct.id = null;
                }
    
                if(handoverProduct.handoverSKUs != null){ 
                    for(var j=0; j<handoverProduct.handoverSKUs.length; j++){
                        var handoverSKU = handoverProduct.handoverSKUs[j];
                        if(handoverSKU.id == 0 || isNaN(handoverSKU.id)){
                            handoverSKU.id = null;
                        }
                    }
                }
            }
        }

        params.data = data;
        params.msgtype = "HANDOVER_CREATE";
        params.message = "Tạo handover";

        var mainView = Ext.getCmp('handover_line_fromcut_edit');
        if(mainView) {
            mainView.setMasked({
                xtype: 'loadmask',
                message: 'Đang tải'
            });
        }

        GSmartApp.Ajax.post('/api/v1/handover/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if(mainView) {
                    mainView.setMasked(false);
                }
                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.respcode == 200) {
                        Ext.toast('Lưu thành công', 1000);
                        console.log(response.data);
                        viewModel.set('currentRec', response.data);
                        var handover_date = viewModel.get('currentRec.handover_date');
                        var date = Ext.Date.parse(handover_date, 'c');
                        if (null == date) date = new Date(handover_date);
                        viewModel.set('currentRec.handover_date',date);

                        m.redirectTo("handover_line_fromcut" + "/" + response.data.id + "/edit");
                    }
                    else {
                        Ext.toast('Lưu thất bại', 1000);
                        console.log(response.message);
                    }

                } else {
                    Ext.toast('Lưu thất bại', 1000);
                }
            })
    },

    onBtnPlus: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var pordercode = viewModel.get('pordercode');

        if(pordercode == null || pordercode.length == 0){
            Ext.toast('Mã lệnh không được bỏ trống', 1000);
            return;
        }

        var params = new Object();
        params.pordercode = pordercode;

        var mainView = Ext.getCmp('handover_line_fromcut_edit');
        if(mainView) {
            mainView.setMasked({
                xtype: 'loadmask',
                message: 'Đang tải'
            });
        }

        GSmartApp.Ajax.post('/api/v1/porderlist/getbyexactpordercode', Ext.JSON.encode(params),
            function (success, response, options) {
                if(mainView) {
                    mainView.setMasked(false);
                }
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        // console.log(response);
                        if(response.message == 'Mã lệnh không tồn tại'){
                            Ext.toast(response.message, 1000);
                        }else{
                            // load bản ghi đầu tiên trả vê, cần sửa lại nếu có nhiều lệnh trùng ordercode
                            var porderid_link = response.data[0].id;

                            viewModel.set('currentRec.porderid_link', porderid_link);
                            var ListOrgStore_To = viewModel.getStore('ListOrgStore_To');
                            ListOrgStore_To.loadStoreByPorderIdLink(porderid_link);
                            me.down('#orgid_to_link').setValue(null);
                            me.down('#orgid_to_link').focus();

                            m.loadHandoverProductOnPorderSelect(porderid_link);
                        }
                    }
                    else {
                        Ext.toast('Lấy thông tin thất bại', 1000);
                        console.log(response.message);
                    }

                } else {
                    Ext.toast('Lấy thông tin thất bại', 1000);
                    console.log('request failed');
                }
            })
    },
    onBtnSearch:function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var pordercode = viewModel.get('pordercode');
        var viewId = viewModel.get('viewId');

        // console.log(pordercode);
        // console.log(viewId);

        if(pordercode == null || pordercode.length == 0){
            Ext.toast('Mã lệnh không được bỏ trống', 1000);
            return;
        }

        var dialog = Ext.create({
            xtype: 'dialog',
            itemId: 'dialog',
            // title: 'Số lượng',
            width: 300,
            height: 300,
            header: false,
            closable: true,
            closeAction: 'destroy',
            maximizable: false,
            maskTapHandler: function(){
                // console.log('mask tapped');
                if(dialog){
                    dialog.close();
                }
            },
            bodyPadding: '1',
            maxWidth: 300,
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'HandoverDetailPorderSearch',
                viewModel: {
                    data: {
                        pordercode: pordercode,
                        viewId: viewId
                    }
                }
            }],
        });
        dialog.show();

        // get event
        dialog.down('#HandoverDetailPorderSearch').getController().on('selectPOrder', function (record) {
            console.log(record);

            var porderid_link = record.get('id');
            var ordercode = record.get('ordercode');

            // cut to line, load store ListOrgStore_To
            var ListOrgStore_To = viewModel.getStore('ListOrgStore_To');
            ListOrgStore_To.loadStoreByPorderIdLink(porderid_link);
            me.down('#orgid_to_link').setValue(null);
            me.down('#orgid_to_link').focus();

            viewModel.set('currentRec.porderid_link', porderid_link);
            viewModel.set('pordercode', ordercode);
            m.loadHandoverProductOnPorderSelect(porderid_link);

            dialog.close();
        });
    },

    // product
    loadHandoverProductOnPorderSelect: function(porderid_link){
        var m = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.porderid_link = porderid_link;

        var mainView = Ext.getCmp('handover_line_fromcut_edit');
        if(mainView) {
            mainView.setMasked({
                xtype: 'loadmask',
                message: 'Đang tải'
            });
        }

        GSmartApp.Ajax.post('/api/v1/handoverproduct/getByPorderId', Ext.JSON.encode(params),
            function (success, response, options) {
                if(mainView) {
                    mainView.setMasked(false);
                }
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        response.data.buyercode = response.buyercode;
                        response.data.buyername = response.buyername;
                        response.data.unitName = response.unitName;
                        // response.data.totalpackage = 1;
                        // response.data.totalpackagecheck = 1;
                        
                        viewModel.set('handoverProduct', response.data);
                        m.loadHandoverSku();
                        // console.log(response.data);
                    }
                }
            })
    },

    // sku
    loadHandoverSku:function(){
        var m = this;
        var viewModel = this.getViewModel();
        var currentRec = viewModel.get('currentRec');
        var handoverProduct = viewModel.get('handoverProduct');

        if(currentRec.id == null || currentRec.id == 0){ // handover moi, chua co du lieu
            
            var handoverSKUs = handoverProduct.handoverSKUs;
            if(handoverSKUs == null || handoverSKUs.length == 0){
                // lay sku theo porder
                var porderid_link = currentRec.porderid_link;
                var productid_link = handoverProduct.productid_link;
                var handoverid_link = currentRec.id;
                m.getNewHandoverSKUs(handoverProduct, handoverid_link, porderid_link, productid_link);
            }else{
                // set HandoverDetail_SkuGrid theo handoverSKUs
                m.setOldHandoverSKUs(handoverProduct);
            }
        }else{ // handover cu, da co du lieu
            // lay sku theo handover
            var handoverSKUs = handoverProduct.handoverSKUs;
            if(handoverSKUs == null || handoverSKUs.length == 0){
                // neu chua co handoverSKUs
            }else{
                // neu co handoverSKUs
                m.setOldHandoverSKUs(handoverProduct);
            }
        }
    },

    getNewHandoverSKUs:function(handoverProduct, handoverid_link, porderid_link, productid_link){
        var m = this;
        var viewModel = this.getViewModel();

        var params = new Object();
        params.handoverid_link = handoverid_link;
        params.porderid_link = porderid_link;
        params.productid_link = productid_link;

        var mainView = Ext.getCmp('handover_line_fromcut_edit');
        if(mainView) {
            mainView.setMasked({
                xtype: 'loadmask',
                message: 'Đang tải'
            });
        }

        GSmartApp.Ajax.post('/api/v1/handoversku/getByHandoverProduct', Ext.JSON.encode(params),
            function (success, response, options) {
                if(mainView) {
                    mainView.setMasked(false);
                }
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
                    // record.set('handoverSKUs', []);
                    // record.set('handoverSKUs', data);
                    handoverProduct.handoverSKUs = data;
                    HandoverSkuStore.setData(handoverProduct.handoverSKUs);
                }else{
                    console.log('fail');
                }
            })
    },
    setOldHandoverSKUs: function (handoverProduct){
        var m = this;
        var viewModel = this.getViewModel();
        var HandoverSkuStore = viewModel.getStore('HandoverSkuStore');
        HandoverSkuStore.setData(handoverProduct.handoverSKUs);
        // console.log(handoverProduct);
    },

    // delete
    onDelete: function () {
        var m = this;
        var viewModel = this.getViewModel();
        var id = viewModel.get('currentRec.id');

        Ext.Msg.confirm('Xác nhận', 'Xoá phiếu điều chuyển?',
            function(answer) {
                if(answer === 'yes'){
                    m.Xoa(id);
                }
            }
        );
    },
    Xoa: function (id) {
        var m = this;
        var me = this.getView();
        var params = new Object();
        params.id = id;

        var mainView = Ext.getCmp('handover_line_fromcut_edit');
        if(mainView) {
            mainView.setMasked({
                xtype: 'loadmask',
                message: 'Đang tải'
            });
        }

        GSmartApp.Ajax.post('/api/v1/handover/delete', Ext.JSON.encode(params),
            function (success, response, options) {
                if(mainView) {
                    mainView.setMasked(false);
                }
                var response = Ext.decode(response.responseText);
                if (success) {
                    if(response.message == 'Phiếu đã được bên nhận xác nhận'){
                        Ext.toast(response.message, 1000);
                    }else{
                        Ext.toast('Xóa thành công', 1000);
                        m.redirectTo("handover_line_fromcut");
                    }
                } else {
                    Ext.toast('Xóa thất bại', 1000);
                }
            })
    },

    // confirm
    onConfirm: function(){
        // nhận
        var me = this;
        var viewModel = this.getViewModel();
        var handoverid_link = viewModel.get('currentRec.id');
        var status = viewModel.get('currentRec.status');
        var viewId = viewModel.get('viewId');

        var dialog = Ext.create({
            xtype: 'dialog',
            itemId: 'dialog',
            title: 'Xác thực',
            header: true,
            closable: true,
            closeAction: 'destroy',
            maximizable: false,
            maskTapHandler: function(){
                if(dialog){
                    dialog.close();
                }
            },
            bodyPadding: '5',
            maxWidth: 300,
            layout: {
                type: 'fit', // fit screen for window
            },
            items: [{
                border: false,
                xtype: 'HandoverDetailConfirm',
                viewModel: {
                    data: {
                        handoverid_link: handoverid_link,
                        currentStatus: status,
                        viewId: viewId,
                    }
                }
            }],
            listeners: {
                
            }
        });
        dialog.show();

        dialog.down('#HandoverDetailConfirm').getController().on('updateStatus', function (obj) {
            me.updateStatus(obj);
            dialog.close();
        });

        // dialog.down('#HandoverDetailConfirm').getController().on('XacThuc', function (obj) {
        //     if(obj.approver_userid_link != 0){
        //         viewModel.set('currentRec.approver_userid_link', obj.approver_userid_link);
        //     }
        //     if(obj.receiver_userid_link != 0){
        //         viewModel.set('currentRec.receiver_userid_link', obj.receiver_userid_link);
        //     }
        //     viewModel.set('currentRec.status', obj.status);

        //     dialog.close();
        // });

        dialog.down('#HandoverDetailConfirm').getController().on('Thoat', function () {
            dialog.close();
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

        var currentRec = viewModel.get('currentRec');
        console.log(obj);
        console.log(currentRec);

        // handover obj params
        // var HandoverProductStore = viewModel.getStore('HandoverProductStore');
        // var HandoverSkuStore = viewModel.getStore('HandoverSkuStore');

        // var handoverProductsData = HandoverProductStore.getData().items;
        // var handoverProducts = new Array();
        // for(var i=0;i<handoverProductsData.length;i++){
        //     handoverProducts.push(handoverProductsData[i].data);
        // }

        var params = new Object();
        var data = new Object();
        data = viewModel.get('currentRec');
        // data.handoverProducts = handoverProducts;
        
        params.data = data;
        params.status = status;
        params.handoverid_link = handoverid_link;
        params.approver_userid_link = approver_userid_link;
        params.receiver_userid_link = receiver_userid_link;
        params.msgtype = "HANDOVER_SETSTATUS";
        params.message = "Set status";

        var mainView = Ext.getCmp('handover_line_fromcut_edit');
        if(mainView) {
            mainView.setMasked({
                xtype: 'loadmask',
                message: 'Đang tải'
            });
        }

        GSmartApp.Ajax.post('/api/v1/handover/setstatus', Ext.JSON.encode(params),
            function (success, response, options) {
                if(mainView) {
                    mainView.setMasked(false);
                }
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        if(
                            response.message == 'Không tồn tại POrderProcessing' || 
                            response.message == 'Tổng SL vào chuyền không được vượt quá SL đơn' || 
                            response.message == 'Tổng SL nhập hoàn thiện không được vượt quá tổng SL vào chuyền'
                            ){
                            Ext.toast(response.message, 3000);
                        }else {
                            Ext.toast('Xác thực thành công', 1000);

                            viewModel.set('currentRec', response.data);
                            var handover_date = viewModel.get('currentRec.handover_date');
                            var date = Ext.Date.parse(handover_date, 'c');
                            if (null == date) date = new Date(handover_date);
                            viewModel.set('currentRec.handover_date',date);

                            var viewIdList = viewModel.get('viewIdList');
                            me.redirectTo(viewIdList + "/" + response.data.id + "/edit");
                        }
                    }
                    else {
                        Ext.toast('Xác thực thất bại', 1000);
                    }

                } else {
                    Ext.toast('Xác thực thất bại (no network)', 1000);
                }
            })
    },

    onCancelConfirm: function (){
        var me = this;
        var viewModel = this.getViewModel();
        var id = viewModel.get('currentRec.id');
        me.CancelConfirm(id);
    },
    CancelConfirm: function(id){
        var m = this;
        var me = this.getView();
        var params = new Object();
        params.id = id;

        var mainView = Ext.getCmp('handover_line_fromcut_edit');
        if(mainView) {
            mainView.setMasked({
                xtype: 'loadmask',
                message: 'Đang tải'
            });
        }

        GSmartApp.Ajax.post('/api/v1/handover/cancelconfirm', Ext.JSON.encode(params),
            function (success, response, options) {
                if(mainView) {
                    mainView.setMasked(false);
                }
                var response = Ext.decode(response.responseText);
                if (success) {
                    if(response.message == 'Phiếu chưa được xác nhận'){
                        Ext.toast(response.message, 1000);
                    }else if(response.message == 'Không tồn tại POrderProcessing'){
                        Ext.toast(response.message, 1000);
                    }else{
                        Ext.toast('Huỷ xác nhận thành công', 1000);
                        m.getViewModel().set('currentRec.status', 1);
                        m.getViewModel().set('currentRec.receiver_userid_link', null);
                    }
                } else {
                    Ext.toast('Huỷ xác nhận thất bại', 1000);
                }
            })
    },
});
