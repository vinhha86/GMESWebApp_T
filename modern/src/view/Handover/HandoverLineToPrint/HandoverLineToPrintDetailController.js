Ext.define('GSmartApp.view.handover.HandoverLineToPrintDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverLineToPrintDetailController',
    init: function() {
        var session = GSmartApp.util.State.get('session'); // console.log(session);
        var viewModel = this.getViewModel();
        viewModel.set('viewId', 'handover_line_toprint_edit');
        viewModel.set('viewIdList', 'handover_line_toprint');

        var UserListStore = viewModel.getStore('UserListStore');
        UserListStore.loadUserbyOrg(1);

        var ListOrgStore_From = viewModel.getStore('ListOrgStore_From');
        var ListOrgStore_To = viewModel.getStore('ListOrgStore_To');
        var orgtypestring_from = '14';
        var orgtypestring_to = '20';
        // ListOrgStore_From.loadStoreByOrgTypeString(orgtypestring_from);
        this.loadStoreInfo(orgtypestring_from, orgtypestring_to, session.user);
        
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
        '#btnDelete': {
            tap: 'onDelete'
        },
        '#btnHandover': {
            tap: 'onConfirm'
        },
        '#btnPlus': {
            tap: 'onBtnPlus'
        },
        '#btnSearch': {
            tap: 'onBtnSearch'
        },
        '#btnBack': {
            tap: 'onBtnBackTap'
        },
        '#btnHome':{
            tap: 'onBtnHomeTap'
        },
        '#orgid_to_link': {
            change: 'onOrgToComboSelect'
        },
        '#orgid_from_link': {
            change: 'onOrgFromComboSelect'
        }
    },
    onBtnHomeTap: function(){
        this.redirectTo("mobilemenu");
    },
    onBtnBackTap: function(){
        // Ext.util.History.back();
        this.redirectTo("handover_line_toprint");
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
        // console.log(session);
        viewModel.set('isCreateNew', true);
        viewModel.set('currentRec.id', 0);
        viewModel.set('currentRec.status', 0);
        viewModel.set('currentRec.handover_userid_link', session.user);
        viewModel.set('currentRec.handover_date', new Date());
        viewModel.set('currentRec.handovertypeid_link', 5);

        this.loadUserInfo(session.user);
    },
    loadUserInfo: function(userid_link){
        var viewModel = this.getViewModel();

        var params = new Object();
        params.id = userid_link;

        GSmartApp.Ajax.post('/api/v1/users/user_getinfo', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    data = response.data;
                    // console.log('function loadInfo: success');
                    console.log(data);
                    if(data.org_grant_id_link != null){
                        viewModel.set('currentRec.orgid_from_link', data.org_grant_id_link);
                    }
                    
                }else{
                    console.log('function loadUserInfo: failed');
                }
            })
    },
    loadStoreInfo: function(orgtypestring_from, orgtypestring_to, userid_link){
        var viewModel = this.getViewModel();
        var ListOrgStore_From = viewModel.getStore('ListOrgStore_From');
        var ListOrgStore_To = viewModel.getStore('ListOrgStore_To');

        var params = new Object();
        params.id = userid_link;

        GSmartApp.Ajax.post('/api/v1/users/user_getinfo', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    data = response.data;
                    // console.log('function loadInfo: success');
                    console.log(data);
                    
                    if(data.orgid_link == 1){
                        // lấy hết nếu orgid_link == 1
                        ListOrgStore_From.loadStoreByOrgTypeString(orgtypestring_from);
                        ListOrgStore_To.loadStoreByOrgTypeString(orgtypestring_to);
                    }else{ 
                        // lấy của px nếu orgid_link là px
                        ListOrgStore_From.getbyParentandType(data.orgid_link, orgtypestring_from);
                        ListOrgStore_To.loadStoreByOrgTypeString(orgtypestring_to);
                    }
                }else{
                    console.log('function loadStoreInfo: failed');
                }
            })
    },
    loadInfo: function(id){
        var viewModel = this.getViewModel();
        var id = viewModel.get('id');

        var params = new Object();
        params.id = id;

        GSmartApp.Ajax.post('/api/v1/handover/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    data = response.data;

                    // console.log('function loadInfo: success');
                    console.log(data);

                    var date = Ext.Date.parse(data.handover_date, 'c');
                    if(date == null) date = new Date(data.handover_date);
                    data.handover_date = date;

                    // set data
                    viewModel.set('isCreateNew', false);
                    viewModel.set('currentRec', data);
                    viewModel.set('handoverProduct', data.handoverProducts[0]);

                    var pordercode = data.ordercode.toString();
                    viewModel.set('pordercode',pordercode);

                    var ListOrgStore_From = viewModel.getStore('ListOrgStore_From');
                    ListOrgStore_From.loadStoreByPorderIdLink(data.porderid_link);

                    // set sku store
                    var handoverProducts = data.handoverProducts;
                    if(handoverProducts != null && handoverProducts.length > 0){
                        var handoverProduct = handoverProducts[0];
                        // viewModel.set('handoverProduct',handoverProduct);
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
                            console.log(viewModel.get('handoverProduct'));

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

        console.log(data);

        params.data = data;
        params.msgtype = "HANDOVER_CREATE";
        params.message = "Tạo handover";

        GSmartApp.Ajax.post('/api/v1/handover/create', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.respcode == 200) {
                        Ext.toast('Lưu thành công', 1000);
                        // console.log(response.data);
                        viewModel.set('currentRec', response.data);
                        var handover_date = viewModel.get('currentRec.handover_date');
                        var date = Ext.Date.parse(handover_date, 'c');
                        if (null == date) date = new Date(handover_date);
                        viewModel.set('currentRec.handover_date',date);

                        m.redirectTo("handover_line_toprint" + "/" + response.data.id + "/edit");
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

        GSmartApp.Ajax.post('/api/v1/porderlist/getbyexactpordercode', Ext.JSON.encode(params),
            function (success, response, options) {
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
        var currentRec = viewModel.get('currentRec');
        var granttoorgid_link = currentRec.orgid_from_link;
        // console.log(granttoorgid_link);
        // console.log(pordercode);
        // console.log(viewId);

        var HandoverProductStore = viewModel.getStore('HandoverProductStore');
        var HandoverSkuStore = viewModel.getStore('HandoverSkuStore');

        if((pordercode == null || pordercode.length == 0) && granttoorgid_link == null){
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
                        granttoorgid_link: granttoorgid_link,
                        viewId: viewId
                    }
                }
            }],
        });
        dialog.show();

        // get event
        dialog.down('#HandoverDetailPorderSearch').getController().on('selectPOrder', function (record) {
            // console.log(record);

            var porderid_link = record.get('id');
            var ordercode = record.get('ordercode');

            // line to pack, load store ListOrgStore_From
            // var ListOrgStore_From = viewModel.getStore('ListOrgStore_From');
            // ListOrgStore_From.loadStoreByPorderIdLink(porderid_link);
            // me.down('#orgid_from_link').setValue(null);
            // me.down('#orgid_from_link').focus();

            viewModel.set('currentRec.porderid_link', porderid_link);
            viewModel.set('pordercode', ordercode);
            // m.loadHandoverProductOnPorderSelect(porderid_link);

            HandoverProductStore.setData([]);
            HandoverSkuStore.setData([]);

            var viewId = viewModel.get('viewId');
            var id = viewModel.get('currentRec.id');
            if(id == 0 || id == null){
                if(viewId == 'handover_line_toprint_edit'){
                    var porderid_link = viewModel.get('currentRec.porderid_link');
                    m.loadHandoverProductOnPorderSelect(porderid_link);
                }
            }

            dialog.close();
        });
        dialog.down('#HandoverDetailPorderSearch').getController().on('found0Porder', function () {
            Ext.toast('Không tìm thấy lệnh', 1000);
            dialog.close();
        });
        dialog.down('#HandoverDetailPorderSearch').getController().on('found1Porder', function (record) {
            Ext.toast('Tìm thấy 1 lệnh', 1000);
            var record = record[0];

            var porderid_link = record.get('id');
            var ordercode = record.get('ordercode');

            // line to pack, load store ListOrgStore_From
            // var ListOrgStore_From = viewModel.getStore('ListOrgStore_From');
            // ListOrgStore_From.loadStoreByPorderIdLink(porderid_link);
            // me.down('#orgid_to_link').setValue(null);
            // me.down('#orgid_to_link').focus();

            viewModel.set('currentRec.porderid_link', porderid_link);
            viewModel.set('pordercode', ordercode);
            // m.loadHandoverProductOnPorderSelect(porderid_link);

            HandoverProductStore.setData([]);
            HandoverSkuStore.setData([]);

            var viewId = viewModel.get('viewId');
            var id = viewModel.get('currentRec.id');
            if(id == 0 || id == null){
                if(viewId == 'handover_line_toprint_edit'){
                    var porderid_link = viewModel.get('currentRec.porderid_link');
                    m.loadHandoverProductOnPorderSelect(porderid_link);
                }
            }

            dialog.close();
        });
    },
    onOrgToComboSelect: function(cbbox, newValue, oldValue, eOpts){
        // console.log(newValue);
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        
        // var parentid_link = newValue.data.parentid_link;
        var viewId = viewModel.get('viewId');

        var id = viewModel.get('currentRec.id');
        if(id == 0 || id == null){
            if(viewId == 'handover_line_toprint_edit' && newValue != null){
                var porderid_link = viewModel.get('currentRec.porderid_link');
                m.loadHandoverProductOnPorderSelect(porderid_link);
            }
        }
    },
    onOrgFromComboSelect: function(){

    },

    // product
    loadHandoverProductOnPorderSelect: function(porderid_link){ // console.log('loadHandoverProductOnPorderSelect');
        var m = this;
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
                        // response.data.totalpackage = 1;
                        // response.data.totalpackagecheck = 1;

                        var data = new Array();
                        data.push(response.data);

                        var HandoverProductStore = viewModel.getStore('HandoverProductStore');
                        HandoverProductStore.setData(data);
                        HandoverProductStore.commitChanges();
                        
                        viewModel.set('handoverProduct', response.data);
                        // m.loadHandoverSku();
                        console.log(response.data);

                        var record = HandoverProductStore.getData().items[0];
                        // console.log(record);
                        m.onHandoverDetail_ProductGridItemClick(record);
                    }
                }
            })
    },
    // sku
    onHandoverDetail_ProductGridItemClick:function(record){
        // console.log('onHandoverDetail_ProductGridItemClick');
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
        // console.log('getNewHandoverSKUs')
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
                    var data = response.data; console.log(data);
                    for(var i=0; i<data.length; i++) {
                        data[i].skuCode = data[i].skuCodeString;
                        data[i].skuColor = data[i].skuColorString;
                        data[i].skuSize = data[i].skuSizeString;
                        data[i].skuSizeSortVal = data[i].skuSizeSortValInt;
                    }

                    var HandoverSkuStore = viewModel.getStore('HandoverSkuStore');
                    // record.set('handoverSKUs', []);
                    // record.set('handoverSKUs', data);
                    viewModel.set('handoverProduct.handoverSKUs', data)
                    // handoverProduct.handoverSKUs = data;
                    HandoverSkuStore.setData(data);
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

        GSmartApp.Ajax.post('/api/v1/handover/delete', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    if(response.message == 'Phiếu đã được bên nhận xác nhận'){
                        Ext.toast(response.message, 1000);
                    }else{
                        Ext.toast('Xóa thành công', 1000);
                        m.redirectTo("handover_line_toprint");
                    }
                } else {
                    Ext.toast('Xóa thất bại', 1000);
                }
            })
    },

    // confirm
    onConfirm: function(){
        // nhận
        var viewModel = this.getViewModel();
        var me = this;
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

        GSmartApp.Ajax.post('/api/v1/handover/setstatus', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        if(response.message == 'Không tồn tại POrderProcessing'){
                            Ext.toast(response.message, 1000);
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
});
