Ext.define('GSmartApp.view.stockoutforcheck.Stockout_ForCheck_Edit_ToVai_MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockout_ForCheck_Edit_ToVai_MainController',
	init: function () {
		
	},
    control: {
        // '#btnResetForm':{
        //     tap: 'onbtnResetForm'
        // },
        '#btnCheck':{
            tap: 'onCheck'
        },
        '#Stockout_ForCheck_Edit_ToVai':{
            //// childtap: 'onItemPklTap',
            // childtap: 'onItemPklTapDetail'
        },
        '#cbbox_pkl_stockout_order_dId':{
            change: 'oncbbox_pkl_stockout_order_dId_change'
        },
        '#cbbox_lotnumber':{
            // change: 'oncbbox_lotnumber_change',
            select: 'oncbbox_lotnumber_change',
        },
        '#btnThemMoiPklToVai': {
            tap: 'onbtnThemMoiPklToVai'
        },
        '#btnTestReload': {
            tap: 'ontestReload'
        },
        '#btnTest': {
            tap: 'ontest'
        },
    },
    onFocus: function(textfield, e, eOpts){
        //
        this.setTooltip(textfield);
    },
    onFocusLeave: function(textfield, event, eOpts ){
        //
        this.removeTooltip();
        //
        // this.showSelectValueWindow(textfield);
    },
    setTooltip: function(textfield){
        var viewModel = this.getViewModel();
        var placeholder = textfield.getPlaceholder();
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: textfield,
            html: placeholder,
        });
        tip.show();
        viewModel.set('fieldTooltip', tip);
    },
    removeTooltip: function(){
        var viewModel = this.getViewModel();
        var fieldTooltip = viewModel.get('fieldTooltip');
        if(fieldTooltip){
            fieldTooltip.close();
        }
    },
    showSelectValueWindow: function(textfield, event){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');

        var placeholder = textfield.getPlaceholder();
        // console.log(textfield);
        // console.log(placeholder);

        var oldValue = '';
        if(placeholder == 'Dài kiểm (M)'){
            oldValue = viewModel.get('objPkl.met_check');
        }else 
        if(placeholder == 'Dài kiểm (Y)'){
            oldValue = viewModel.get('objPkl.yds_check');
        }else 
        if(placeholder == 'Vải lỗi (M)'){
            oldValue = viewModel.get('objPkl.met_err');
        }else 
        {
            return;
        }

        if(
            oldValue != null 
            && oldValue != '' 
            && oldValue != 0 
            && !isNaN(oldValue)
        ){
            if (Ext.os.is.iOS) { // ios
                if(
                    !((oldValue/100 - Math.floor(oldValue/100)) == 0) 
                    && ((oldValue - Math.floor(oldValue)) == 0)
                ){ // ios value ko chia het cho 100
                    var listValue = [];
                    var value1 = { value: oldValue};
                    var value2 = { value: oldValue/10};
                    var value3 = { value: oldValue/100};
    
                    listValue.push(value1);
                    listValue.push(value2);
                    listValue.push(value3);

                    var isStockin_ValueSelect_window_open = viewModel.get('isStockin_ValueSelect_window_open');
                    if(isStockin_ValueSelect_window_open){
                        return;
                    }
                    viewModel.set('isStockin_ValueSelect_window_open', true);
    
                    var dialog = Ext.create({
                        xtype: 'dialog',
                        id: 'Stockin_ValueSelect_window',
                        itemId: 'dialog',
                        title: '' + placeholder,
                        width: 300,
                        height: 200,
                        // maxWidth: 300,
                        // maxHeight: 600,
                        header: true,
                        closable: true,
                        closeAction: 'destroy',
                        maximizable: false,
                        maskTapHandler: function(){
                            // console.log('mask tapped');
                            if(dialog){
                                dialog.close();
                                me.setMasked(false);
                                setTimeout(function(){
                                    viewModel.set('isStockin_ValueSelect_window_open', false);
                                }, 200);
                            }
                        },
                        bodyPadding: '1',
                        layout: {
                            type: 'fit', // fit screen for window
                            padding: 5
                        },
                        items: [{
                            border: false,
                            xtype: 'Stockin_ValueSelect',
                            viewModel: {
                                data: {
                                    listValue: listValue
                                }
                            }
                        }],
                    });
                    dialog.show();
    
                    dialog.down('#Stockin_ValueSelect').getController().on('onSelectValue', function (selectValue) {
                        // console.log('selectValue: ' + selectValue);
                        if(placeholder == 'Dài kiểm (M)'){
                            viewModel.set('objPkl.met_check', selectValue);
                        }else if(placeholder == 'Dài kiểm (Y)'){
                            viewModel.set('objPkl.yds_check', selectValue);
                        }else if(placeholder == 'Vải lỗi (M)'){
                            viewModel.set('objPkl.met_err', selectValue);
                        }
                        dialog.close();
                        setTimeout(function(){
                            viewModel.set('isStockin_ValueSelect_window_open', false);
                        }, 200);
                    });
                }else{ // ios value chia het cho 100
                    // oldValue
                }
            }else{ // ko phai ios
                // oldValue
            }
        }
        // console.log("Version " + Ext.os.version);
    },
    ontestReload: function(){
        var viewModel = this.getViewModel();
        var WarehouseCheckStore = viewModel.getStore('WarehouseCheckStore');
        WarehouseCheckStore.load();
    },
    ontest: function(){
        var viewModel = this.getViewModel();
        var WarehouseCheckStore = viewModel.getStore('WarehouseCheckStore');
        var data = WarehouseCheckStore.getData().items;
        console.log(data);
    },
    // oncbbox_pkl_stockout_order_dId_change: function(cbbox, newValue, oldValue, eOpts){
    //     var viewModel = this.getViewModel();
    //     var pkl_stockout_order_dId = viewModel.get('pkl_stockout_order_dId');
    //     if(newValue != null && newValue != ''){
    //         var WarehouseCheckStore = viewModel.getStore('WarehouseCheckStore');
    //         // WarehouseCheckStore.loadstore_ByStockoutOrderD(newValue);
    //         WarehouseCheckStore.loadstore_ByStockoutOrderD_ToVai(newValue);
    //         if(cbbox.getSelection() != null){
    //             viewModel.set('selectedDRecord', cbbox.getSelection());
    //         }
    //     }
    // },
    oncbbox_pkl_stockout_order_dId_change: function(cbbox, newValue, oldValue, eOpts){
        var me = this.getView();
        var viewModel = this.getViewModel();
        
        if(newValue != null && newValue != ''){
            var WarehouseCheckStore = viewModel.getStore('WarehouseCheckStore');
            // StockinPklRecheckStore.loadStore_byStockinDIdAndEqualStatus(newValue, 2);

            WarehouseCheckStore.removeAll();
            viewModel.set('cbbox_lotnumber_value', null);
            me.down('#cbbox_lotnumber').setValue(null);

            // Ext.Viewport.setMasked({ xtype: 'loadmask' });
            var StockinLotStore = viewModel.getStore('StockinLotStore');
            StockinLotStore.loadStore_getLotNumber_ByStockout_order_d(newValue);
            // StockinLotStore.loadStore_byStockinDId(newValue);

            if(cbbox.getSelection() != null){
                viewModel.set('selectedDRecord', cbbox.getSelection());
            }
            
            // // bỏ selectedRecord
            // viewModel.set('selectedLotRecord', null);
            // viewModel.set('selectedPklRecord', null);
            // viewModel.set('selectedPklRecheckRecord', null);
        }
    },
    oncbbox_lotnumber_change: function(cbbox, newValue, oldValue, eOpts){
        var viewModel = this.getViewModel();
        newValue = newValue.get('lotnumber');

        if(newValue != null && newValue != ''){ // console.log(newValue);
            var pkl_stockout_order_dId = viewModel.get('pkl_stockout_order_dId');
            // var selection = cbbox.getSelection();
            // var lotnumber = selection.get('lotnumber');
            var lotnumber = newValue;

            var WarehouseCheckStore = viewModel.getStore('WarehouseCheckStore');
            WarehouseCheckStore.loadStore_byStockinDId_lotnumber(pkl_stockout_order_dId, lotnumber);

            viewModel.set('cbbox_lotnumber_value', lotnumber);

            // // bỏ selectedRecord
            // viewModel.set('selectedLotRecord', null);
            // viewModel.set('selectedPklRecord', null);
            // viewModel.set('selectedPklRecheckRecord', null);
        }
    },
    onbtnThemMoiPklToVai: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var stockout_order = viewModel.get('stockout_order');
        var pkl_stockout_order_dId = viewModel.get('pkl_stockout_order_dId');
        var cbbox_lotnumber_value = viewModel.get('cbbox_lotnumber_value');
        var selectedDRecord = viewModel.get('selectedDRecord');

        if(pkl_stockout_order_dId == null){
            Ext.toast('Bạn chưa chọn loại NPL', 2000);
            return;
        }
        if(cbbox_lotnumber_value == null){
            Ext.toast('Bạn chưa chọn số Lot', 2000);
            return;
        }
        
        var objPkl = new Object();
        objPkl.lotnumber = cbbox_lotnumber_value;

        var dialog = Ext.create({
            xtype: 'dialog',
            // id: 'StockMenuWindow_Main_dialog',
            itemId: 'Stockout_ForCheck_Edit_ToVai_Detail_dialog',
            title: 'Thêm mới cây vải',
            width: '90%',
            // height: '60%',
            zIndex: 1,
            // maxWidth: 300,
            // maxHeight: 600,
            header: true,
            closable: true,
            closeAction: 'destroy',
            maximizable: false,
            top: 10,
            left: '5%',
            right: '5%',
            maskTapHandler: function(){
                if(dialog){
                    dialog.close();
                    me.setMasked(false);
                }
            },
            bodyPadding: '1',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'Stockout_ForCheck_Edit_ToVai_Detail',
                viewModel: {
                    data: {
                        stockout_order: stockout_order,
                        pkl_stockout_order_dId: pkl_stockout_order_dId,
                        selectedDRecord: selectedDRecord,
                        selectedPklRecord: null,
                        objPkl: objPkl
                    }
                }
            }],
            listeners: {
                destroy: {
                    fn: function(){ 
                        if(Ext.Msg){
                            Ext.Msg.hide();
                        }
                    }
                },
            },
        });
        dialog.show();

        dialog.down('#Stockout_ForCheck_Edit_ToVai_Detail').getController().on('reloadStore', function (objData) {
            m.reloadStore();
        });
    },
    onItemPklTapDetail: function(list, location, eOpts){
        // console.log(location);
        var record = location.record;

        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var stockout_order = viewModel.get('stockout_order');
        var pkl_stockout_order_dId = viewModel.get('pkl_stockout_order_dId');
        var selectedDRecord = viewModel.get('selectedDRecord');

        if(pkl_stockout_order_dId == null){
            Ext.toast('Bạn chưa chọn loại NPL', 2000);
            return;
        }
        
        var objPkl = new Object();
        // objPkl.lotnumberTxt = cbbox_lotnumber_value;

        var dialog = Ext.create({
            xtype: 'dialog',
            // id: 'StockMenuWindow_Main_dialog',
            itemId: 'Stockout_ForCheck_Edit_ToVai_Detail_dialog',
            title: 'Chi tiết cây vải',
            width: '90%',
            // height: '60%',
            zIndex: 1,
            // maxWidth: 300,
            // maxHeight: 600,
            header: true,
            closable: true,
            closeAction: 'destroy',
            maximizable: false,
            top: 10,
            left: '5%',
            right: '5%',
            maskTapHandler: function(){
                if(dialog){
                    dialog.close();
                    me.setMasked(false);
                }
            },
            bodyPadding: '1',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'Stockout_ForCheck_Edit_ToVai_Detail',
                viewModel: {
                    data: {
                        stockout_order: stockout_order,
                        pkl_stockout_order_dId: pkl_stockout_order_dId,
                        selectedDRecord: selectedDRecord,
                        selectedPklRecord: record,
                        objPkl: objPkl
                    }
                }
            }],
            listeners: {
                destroy: {
                    fn: function(){ 
                        if(Ext.Msg){
                            Ext.Msg.hide();
                        }
                    }
                },
            },
        });
        dialog.show();

        dialog.down('#Stockout_ForCheck_Edit_ToVai_Detail').getController().on('reloadStore', function (objData) {
            m.reloadStore();
        });
        dialog.down('#Stockout_ForCheck_Edit_ToVai_Detail').getController().on('close', function (objData) {
            dialog.close();
        });

    },

    onmaPklFilterKeyup: function (){
        var grid = this.getView().down('#Stockout_ForCheck_Edit_ToVai'),
            // Access the field using its "reference" property name.
            filterField = this.getView().down('#maPklFilter'),
            store = grid.store,
            filters = grid.store.getFilters();

        var viewModel = this.getViewModel();
        grid.getSelectable().deselectAll();
        viewModel.set('lotnumberTxt', '');
        this.resetForm();

        var maPklFilter = viewModel.get('maPklFilter') == null ? '' : viewModel.get('maPklFilter').toLowerCase();
        store.clearFilter();
        store.filterBy(function(rec) { //toLowerCase() // includes()
            var isByLotOK = false;
            if(
                rec.get('lotnumber').toLowerCase().includes(maPklFilter)
            ){
                isByLotOK = true;
            }
            if(
                isByLotOK
            ){
                return true;
            }else{
                return false;
            }
        });
    },
    resetForm: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var lotnumber = viewModel.get('objPkl.lotnumber');
        viewModel.set('objPkl', null);
        viewModel.set('objPkl.lotnumber', lotnumber);
    },
    onItemPklTap: function(list, location, eOpts ){
        var m = this;
        var viewModel = this.getViewModel();

        // dung timeout vi conflict voi ham onlotnumberTxtAndpackageidTxtleave
        setTimeout(function(){
            var record = location.record;
            viewModel.set('selectedPklRecord', record);

            // copy obj, để thay đổi thông tin ko ảnh hưởng đến view model
            // khi click lên record ở grid sẽ lấy lại giá trị cũ
            var newObjData = JSON.parse(JSON.stringify(record.data));
            newObjData.width_check = newObjData.width_check * 100;
            newObjData.width_origin = newObjData.width_origin * 100;
            viewModel.set('objPkl', newObjData);
            console.log(newObjData);
        }, 100);
    },
    onCheck: function(){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var stockout_order = viewModel.get('stockout_order');
        var selectedDRecord = viewModel.get('selectedDRecord');
        var objPkl = viewModel.get('objPkl');

        // console.log(objPkl);
        // if(objPkl.id == null){
        //     Ext.toast('Không tìm thấy cây vải có số lot và cây này', 3000);
        //     return;
        // }

        // check textfield
        if(objPkl.packageid == null || objPkl.packageid == ''){
            Ext.toast('Thiếu thông tin số cây', 3000);
            return;
        }
        if(objPkl.lotnumber == null || objPkl.lotnumber == ''){
            Ext.toast('Thiếu thông tin số lot', 3000);
            return;
        }
        if(stockout_order.unitid_link == null) stockout_order.unitid_link = 1;
        if(stockout_order.unitid_link == 3){
            if(objPkl.width_check == '' || objPkl.yds_check == ''){
                Ext.toast('Thiếu thông tin khổ hoặc độ dài', 3000);
                return;
            }
            if(isNaN(objPkl.yds_check)){
                Ext.toast('Số Y phải là số', 3000);
                return;
            }
        }
        if(stockout_order.unitid_link == 1){
            if(objPkl.width_check == '' || objPkl.met_check == ''){
                Ext.toast('Thiếu thông tin khổ hoặc độ dài', 3000);
                return;
            }
            if(isNaN(objPkl.met_check)){
                Ext.toast('Số M phải là số', 3000);
                return;
            }
        }

        
        // tạo obj
        if(objPkl.yds_check == null || objPkl.yds_check == '') objPkl.yds_check = 0;
        if(objPkl.met_check == null || objPkl.met_check == '') objPkl.met_check = 0;
        if(objPkl.yds_origin == null || objPkl.yds_origin == '' || objPkl.yds_origin == 0) objPkl.yds_origin = objPkl.yds_check;
        if(objPkl.met_origin == null || objPkl.met_origin == '' || objPkl.met_origin == 0) objPkl.met_origin = objPkl.met_check;
        
        if(objPkl.width_check == null || objPkl.width_check == '') objPkl.width_check = 0;
        if(objPkl.width_origin == null || objPkl.width_origin == '' || objPkl.width_origin == 0) objPkl.width_origin = objPkl.width_check;
        if(objPkl.met_err == null || objPkl.met_err == '') objPkl.met_err = 0;

        if(stockout_order.unitid_link == 3){
            // có y
            objPkl.yds_check = parseFloat(objPkl.yds_check);
            objPkl.met_check = objPkl.yds_check * 0.9144;
            objPkl.yds_origin = parseFloat(objPkl.yds_origin);
            objPkl.met_origin = objPkl.yds_origin * 0.9144;

            objPkl.width_check = parseFloat(objPkl.width_check);
            objPkl.width_origin = parseFloat(objPkl.width_origin);
        }
        if(stockout_order.unitid_link == 1){
            // có m
            objPkl.met_check = parseFloat(objPkl.met_check);
            objPkl.yds_check = objPkl.met_check / 0.9144;
            objPkl.met_origin = parseFloat(objPkl.met_origin);
            objPkl.yds_origin = objPkl.met_origin / 0.9144;

            objPkl.width_check = parseFloat(objPkl.width_check);
            objPkl.width_origin = parseFloat(objPkl.width_origin);
        }

        objPkl.met_check = parseFloat(objPkl.met_check);
        objPkl.yds_check = parseFloat(objPkl.yds_check);
        objPkl.met_origin = parseFloat(objPkl.met_origin);
        objPkl.yds_origin = parseFloat(objPkl.yds_origin);
        objPkl.width_check = parseFloat(objPkl.width_check / 100);
        objPkl.width_origin = parseFloat(objPkl.width_origin / 100);
        var stockoutorderid_link = stockout_order.id;
        var stockoutorderdid_link = selectedDRecord.get('id');

        
        me.setMasked({
            xtype: 'loadmask',
            message: 'Đang lưu'
        })

        var params = new Object();
        params.warehouse_check = objPkl;
        params.stockoutorderid_link = stockoutorderid_link;
        params.stockoutorderdid_link = stockoutorderdid_link;

        GSmartApp.Ajax.postJitin('/api/v1/warehouse/updateToVai', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    me.setMasked(false);
                    if (response.respcode == 200) {
                        if(response.message == 'Không tồn tại cây vải trong kho'){
                            Ext.toast('Lưu thất bại: ' + response.message, 3000);
                        }else{
                            Ext.toast('Lưu thành công', 3000);
                            var data = response.data;

                            // bỏ highlight
                            var grid = me.down('#Stockout_ForCheck_Edit_ToVai');
                            grid.getSelectable().deselectAll();
                            viewModel.set('selectedPklRecord', null);

                            m.reloadStore();
                            m.resetForm();
                            m.getView().down('#packageidTxt').focus();
                        }
                        // console.log(response);
                    }else{
                        Ext.toast('Lưu thất bại: ' + response.message, 3000);
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lưu thất bại: ' + response.message, 3000);
                }
        })
    },
    // onbtnResetForm: function(){
    //     var m = this;
    //     var viewModel = this.getViewModel();
    //     viewModel.set('lotnumberTxt', '');
    //     m.resetForm();
    // },
    onlotnumberTxtType: function(field, newValue, oldValue, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        viewModel.set('objPkl.lotnumber', newValue.toUpperCase());
        field.setValue(newValue.toUpperCase());
    },
    onlotnumberTxtAndpackageidTxtenter: function(textfield, event, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        viewModel.set('isPklTextfieldFocus', true);
    },
    onlotnumberTxtAndpackageidTxtleave: function(textfield, event, eOpts){
        //
        this.onFocusLeave(textfield);
        //
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var selectedDRecord = viewModel.get('selectedDRecord');

        viewModel.set('isPklTextfieldFocus', false);
        var lotnumber = viewModel.get('objPkl.lotnumber');
        var packageid = viewModel.get('objPkl.packageid');

        if( // nếu chưa đủ thông tin hoặc chưa chọn loại vải, return
            lotnumber == '' || packageid == '' ||
            lotnumber == null || packageid == null ||
            selectedDRecord == null
        ){
            viewModel.set('objPkl', null);
            viewModel.set('objPkl.lotnumber', lotnumber);
            viewModel.set('objPkl.packageid', packageid);
            return;
        }else{ // tìm cây vải theo lot và package
            // var stockoutorderdid_link = selectedDRecord.get('id');
            var skuid_link = selectedDRecord.get('material_skuid_link');

            me.setMasked({
                xtype: 'loadmask',
                message: 'Đang tải'
            });

            var params = new Object();
            // params.stockoutorderdid_link = stockoutorderdid_link;
            params.skuid_link = skuid_link;
            params.lotnumber = lotnumber;
            params.packageid = packageid;

            GSmartApp.Ajax.postJitin('/api/v1/warehouse/getByLotAndPackageId', Ext.JSON.encode(params),
                function (success, response, options) {
                    // me.setLoading(false);
                    me.setMasked(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            if(response.data.length == 0){
                                // Ext.toast('Không tìm thấy cây vải có số lot và cây này', 3000);
                                Ext.toast('Cây vải không tồn tại hoặc đã có trong yêu cầu xuất', 3000);
                                viewModel.set('objPkl', null);
                                viewModel.set('objPkl.lotnumber', lotnumber);
                                viewModel.set('objPkl.packageid', packageid);

                            }else{
                                // tìm thấy cây vải, set thông tin cho các trường
                                // var responseObj = response.data[0];
                                // var objPkl = m.setDataObjPkl(responseObj);
                                // viewModel.set('objPkl', objPkl);

                                var responseObjs = response.data;
                                if(responseObjs.length == 1){ // tim dc 1 cay vai duy nhat
                                    var responseObj = response.data[0];
                                    var objPkl = m.setDataObjPkl(responseObj);
                                    viewModel.set('objPkl', objPkl);
                                }else if(responseObjs.length > 1){ // tim dc 2 cay vai tro len, hien popup chon
                                    m.popUpSelectCayVai(responseObjs);
                                }
                                // bỏ highlight
                                var grid = me.down('#Stockout_ForCheck_Edit_ToVai');
                                grid.getSelectable().deselectAll();
                            }
                        }else{
                            Ext.toast('Lỗi khi tìm cây vải: ' + response.message, 3000);
                        }
                    } else {
                        var response = Ext.decode(response.responseText);
                        Ext.toast('Lỗi khi tìm cây vải: ' + response.message, 3000);
                    }
            })        
        }
    },
    setDataObjPkl:function(objPkl){
        // skuid_link, colorid_link, lotnumber, packageid, 
        // ydsorigin, ydscheck, metorigin, metcheck, 
        // grossweight, epc,
        // width_yds_check, width_yds, width_met_check, width_met
        // console.log(objPkl);
        objPkl.warehouseid_link = objPkl.id;
        objPkl.id = null;
        objPkl.yds_origin = objPkl.yds;
        objPkl.yds_check = null;
        objPkl.met_origin = objPkl.met;
        objPkl.met_check = null;
        if(objPkl.unitid_link == null) objPkl.unitid_link = 1;
        // width
        objPkl.width_origin = objPkl.width_met * 100;
        objPkl.width_check = null;
        return objPkl;
    },

    popUpSelectCayVai: function(responseObjs){
        var m = this;
        var viewModel = this.getViewModel();
        var WarehouseCheckStore = viewModel.getStore('WarehouseCheckStore');
        var storeData = WarehouseCheckStore.getData().items;
        
        // tao array cua popup window
        var popUpWindowData = [];
        for(var i = 0; i < responseObjs.length; i++){
            var isExistInStore = false;
            for(var j = 0; j < storeData.length; j++){
                if(responseObjs[i].epc === storeData[j].data.epc){
                    isExistInStore = true;
                    break;
                }
            }
            if(!isExistInStore){
                popUpWindowData.push(responseObjs[i]);
            }
        }

        if(popUpWindowData.length == 1){
            var responseObj = popUpWindowData[0];
            var objPkl = m.setDataObjPkl(responseObj);
            viewModel.set('objPkl', objPkl);
        }else if(popUpWindowData.length > 1){
            // popup
            m.popUpSelectCayVaiWindow(popUpWindowData);
        }
        // console.log(responseObjs);
        // console.log(storeData);
        // console.log(popUpWindowData);
    },
    popUpSelectCayVaiWindow:function(popUpWindowData){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        // console.log(popUpWindowData);

        me.setMasked({
            xtype: 'loadmask',
            message: 'Đang tải'
        });

        var dialog = Ext.create({
            xtype: 'dialog',
            // id: 'Stockout_ForCheck_Warehouse_Select',
            itemId: 'dialog',
            title: 'Chọn cây vải',
            width: 400,
            height: 500,
            // maxWidth: 300,
            // maxHeight: 600,
            header: true,
            closable: true,
            closeAction: 'destroy',
            maximizable: false,
            maskTapHandler: function(){
                // console.log('mask tapped');
                if(dialog){
                    dialog.close();
                    me.setMasked(false);
                }
            },
            bodyPadding: '1',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            
            items: [
                {
                    border: false,
                    xtype: 'Stockout_ForCheck_Warehouse_Select',
                    viewModel: {
                        data: {
                            listValue: popUpWindowData
                        }
                    }
                }
            ],
        });
        dialog.show();

        dialog.down('#Stockout_ForCheck_Warehouse_Select').getController().on('onSelectValue', function (selectValue) {
            // console.log(selectValue);
            var responseObj = selectValue.data;
            var objPkl = m.setDataObjPkl(responseObj);
            viewModel.set('objPkl', objPkl);

            me.setMasked(false);
            dialog.close();
        });
    },
    reloadStore:function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockoutorderid_link = viewModel.get('stockout_order.id');
        var pkl_stockout_order_dId = viewModel.get('pkl_stockout_order_dId');
        var selectedPklRecord = viewModel.get('selectedPklRecord');

        var WarehouseCheckStore = viewModel.getStore('WarehouseCheckStore');
        WarehouseCheckStore.load();
        // WarehouseCheckStore.loadstore_ByStockoutOrderD_ToVai_async(pkl_stockout_order_dId);
        // WarehouseCheckStore.load({
        //     scope: this,
        //     callback: function(records, operation, success) {
        //         if(!success){
        //             // this.fireEvent('logout');
        //         } else {
        //             if(selectedPklRecord != null){
        //                 var id = selectedPklRecord.get('id');
        //                 var storeItems = WarehouseCheckStore.getData().items;
        //                 for(var i=0; i<storeItems.length; i++){
        //                     var item = storeItems[i];
        //                     if(item.get('id') == id){
        //                         var grid = m.getView().down('#Stockout_ForCheck_Edit_ToVai');
        //                         grid.getSelectable().select(item);
        //                         viewModel.set('selectedPklRecord', item);
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // });
    }
})