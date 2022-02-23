Ext.define('GSmartApp.view.stockout.stockout_material.stockout_m_list.stockout_m_edit.stockout_m_edit_pkl.Stockout_M_Edit_Pkl_Detail_Controller', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockout_M_Edit_Pkl_Detail_Controller',
	init: function () {
        var m = this;
		var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');
        var selectedPklRecord = viewModel.get('selectedPklRecord');
        if(selectedPklRecord != null){
            m.onSetFormData();
        }
	},
    control: {
        '#btnCheck':{
            tap: 'onCheck'
        },
        '#btnDeletePkl':{
            tap: 'onBtnDeletePkl'
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
            zIndex:2
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
    onSetFormData: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var record = viewModel.get('selectedPklRecord');

        // dung timeout vi conflict voi ham onlotnumberTxtAndpackageidTxtleave
        setTimeout(function(){
            var newObjData = JSON.parse(JSON.stringify(record.data));
            newObjData.widthcheck = newObjData.widthcheck * 100;
            newObjData.widthorigin = newObjData.widthorigin * 100;
            viewModel.set('objPkl', newObjData);
        }, 100);
    },
    onlotnumberTxtType: function(field, newValue, oldValue, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        // console.log(newValue.toUpperCase());
        viewModel.set('objPkl.lotnumber', newValue.toUpperCase());
        field.setValue(newValue.toUpperCase());
    },
    onlotnumberTxtAndpackageidTxtenter: function(){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        viewModel.set('isFocusTxtField', true);

    },
    onlotnumberTxtAndpackageidTxtleave: function(textfield, event, eOpts){
        //
        this.onFocusLeave(textfield);
        //
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var selectedDRecord = viewModel.get('selectedDRecord');
        viewModel.set('isFocusTxtField', false);

        viewModel.set('isPklTextfieldFocus', false);
        var lotnumber = viewModel.get('objPkl.lotnumber');
        var packageid = viewModel.get('objPkl.packageid');

        var selectedPklRecord = viewModel.get('selectedPklRecord');
        if(selectedPklRecord != null){
            return;
        }

        if(selectedDRecord == null){
            viewModel.set('objPkl', null);
            viewModel.set('objPkl.lotnumber', lotnumber);
            Ext.toast('Cần chọn nguyên phụ liệu', 2000);
            return;
        }

        if( // nếu chưa đủ thông tin hoặc chưa chọn loại vải, return
            lotnumber == '' || packageid == '' ||
            lotnumber == null || packageid == null
        ){
            viewModel.set('objPkl', null);
            viewModel.set('objPkl.lotnumber', lotnumber);
            viewModel.set('objPkl.packageid', packageid);
            return;
        }else{ // tìm cây vải theo lot và package
            var skuid_link = selectedDRecord.get('skuid_link');

            me.setMasked({
                xtype: 'loadmask',
                message: 'Đang tải'
            });

            var params = new Object();
            params.skuid_link = skuid_link;
            params.lotnumber = lotnumber;
            params.packageid = packageid;

            GSmartApp.Ajax.postJitin('/api/v1/warehouse/getByLotAndPackageIdForStockout', Ext.JSON.encode(params),
                function (success, response, options) {
                    // me.setLoading(false);
                    me.setMasked(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            if(response.data.length == 0){
                                Ext.toast('Không tìm thấy cây vải có số lot và cây này', 2000);
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
                            }
                        }else{
                            Ext.toast('Lỗi khi tìm cây vải: ' + response.message, 2000);
                        }
                    } else {
                        var response = Ext.decode(response.responseText);
                        Ext.toast('Lỗi khi tìm cây vải: ' + response.message, 2000);
                    }
            })        
        }
    },
    setDataObjPkl:function(objPkl){
        // widthorigin, widthcheck, ydsorigin, ydscheck, met_origin, met_check, packageid, lotnumber, warehousestatus
        // console.log(objPkl);
        objPkl.widthorigin = objPkl.width_met * 100;
        objPkl.widthcheck = objPkl.width_met * 100;
        objPkl.ydsorigin = objPkl.yds;
        objPkl.ydscheck = objPkl.yds;
        objPkl.met_origin = objPkl.met;
        objPkl.met_check = objPkl.met;
        objPkl.warehousestatus = objPkl.status;
        objPkl.status = 0;
        if(objPkl.unitid_link == null) objPkl.unitid_link = 1;
        return objPkl;
    },
    popUpSelectCayVai: function(responseObjs){
        var m = this;
        var viewModel = this.getViewModel();
        // var stockout_pklist = viewModel.getStore('stockout_pklist');
        // var storeData = stockout_pklist.getData().items;
        
        // tao array cua popup window
        var popUpWindowData = [];
        for(var i = 0; i < responseObjs.length; i++){
            // var isExistInStore = false;
            // for(var j = 0; j < storeData.length; j++){
            //     if(responseObjs[i].epc === storeData[j].data.epc){
            //         isExistInStore = true;
            //         break;
            //     }
            // }
            // if(!isExistInStore){
            //     popUpWindowData.push(responseObjs[i]);
            // }
            popUpWindowData.push(responseObjs[i]);
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

        // me.setMasked({
        //     xtype: 'loadmask',
        //     message: 'Đang tải'
        // });

        var dialog = Ext.create({
            xtype: 'dialog',
            // id: 'Stockout_ForCheck_Warehouse_Select',
            itemId: 'Stockout_ForCheck_Warehouse_Select_dialog',
            title: 'Chọn cây vải',
            width: 400,
            height: 500,
            zIndex: 2,
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
    resetForm: function(){
        var myview = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        
        var lotnumber = viewModel.get('objPkl.lotnumber');
        viewModel.set('objPkl', null);
        viewModel.set('objPkl.lotnumber', lotnumber);
    },

    onCheck: function(){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');
        var selectedDRecord = viewModel.get('selectedDRecord');
        var selectedPklRecord = viewModel.get('selectedPklRecord');
        var objPkl = viewModel.get('objPkl');

        // check textfield
        if(objPkl.packageid == null || objPkl.packageid == ''){
            Ext.toast('Thiếu thông tin số cây', 2000);
            return;
        }
        if(objPkl.lotnumber == null || objPkl.lotnumber == ''){
            Ext.toast('Thiếu thông tin số lot', 2000);
            return;
        }
        if(stockout.unitid_link == null) stockout.unitid_link = 1;
        if(stockout.unitid_link == 3){
            if(objPkl.widthcheck == '' || objPkl.ydscheck == '' || objPkl.widthcheck == null || objPkl.ydscheck == null){
                Ext.toast('Thiếu thông tin khổ hoặc độ dài', 2000);
                return;
            }
            if(isNaN(objPkl.ydscheck)){
                Ext.toast('Số Y phải là số', 2000);
                return;
            }
        }
        if(stockout.unitid_link == 1){
            if(objPkl.widthcheck == '' || objPkl.met_check == '' || objPkl.widthcheck == null || objPkl.met_check == null){
                Ext.toast('Thiếu thông tin khổ hoặc độ dài', 2000);
                return;
            }
            if(isNaN(objPkl.met_check)){
                Ext.toast('Số M phải là số', 2000);
                return;
            }
        }

        // widthorigin, widthcheck, ydsorigin, ydscheck, met_origin, met_check, packageid, lotnumber
        
        // tạo obj
        if(objPkl.ydscheck == null || objPkl.ydscheck == '') objPkl.ydscheck = 0;
        if(objPkl.met_check == null || objPkl.met_check == '') objPkl.met_check = 0;
        if(objPkl.ydsorigin == null || objPkl.ydsorigin == '' || objPkl.ydsorigin == 0) objPkl.ydsorigin = objPkl.ydscheck;
        if(objPkl.met_origin == null || objPkl.met_origin == '' || objPkl.met_origin == 0) objPkl.met_origin = objPkl.met_check;
        if(objPkl.grossweight == null || objPkl.grossweight == '' || objPkl.grossweight == 0) objPkl.grossweight = 0;
        if(objPkl.widthcheck == null || objPkl.widthcheck == '') objPkl.widthcheck = 0;
        if(objPkl.widthorigin == null || objPkl.widthorigin == '' || objPkl.widthorigin == 0) objPkl.widthorigin = objPkl.widthcheck;

        if(stockout.unitid_link == 3){
            // có y
            objPkl.ydscheck = parseFloat(objPkl.ydscheck);
            objPkl.met_check = objPkl.ydscheck * 0.9144;
            objPkl.ydsorigin = parseFloat(objPkl.ydsorigin);
            objPkl.met_origin = objPkl.ydsorigin * 0.9144;

            objPkl.widthcheck = parseFloat(objPkl.widthcheck);
            objPkl.widthorigin = parseFloat(objPkl.widthorigin);
        }
        if(stockout.unitid_link == 1){
            // có m
            objPkl.met_check = parseFloat(objPkl.met_check);
            objPkl.ydscheck = objPkl.met_check / 0.9144;
            objPkl.met_origin = parseFloat(objPkl.met_origin);
            objPkl.ydsorigin = objPkl.met_origin / 0.9144;

            objPkl.widthcheck = parseFloat(objPkl.widthcheck);
            objPkl.widthorigin = parseFloat(objPkl.widthorigin);
        }

        objPkl.met_check = parseFloat(objPkl.met_check);
        objPkl.ydscheck = parseFloat(objPkl.ydscheck);
        objPkl.met_origin = parseFloat(objPkl.met_origin);
        objPkl.ydsorigin = parseFloat(objPkl.ydsorigin);
        objPkl.widthcheck = parseFloat(objPkl.widthcheck / 100);
        objPkl.widthorigin = parseFloat(objPkl.widthorigin / 100);

        objPkl.stockoutid_link = stockout.id;
        objPkl.stockoutdid_link = selectedDRecord.get('id');

        // console.log(objPkl);

        me.setMasked({
            xtype: 'loadmask',
            message: 'Đang lưu'
        })

        var params = new Object();
        params.data_pklist = objPkl;

        GSmartApp.Ajax.postJitin('/api/v1/stockout_pklist/pklist_create_single', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    me.setMasked(false);
                    if (response.respcode == 200) {
                        if(response.message == 'Không tồn tại cây vải trong kho'){
                            Ext.toast('Lưu thất bại: ' + response.message, 2000);
                        }else{
                            Ext.toast('Lưu thành công', 2000);
                            var data = response.data;

                            m.fireEvent('reloadStore');
                            if(selectedPklRecord == null){
                                m.resetForm();
                                m.getView().down('#packageidTxt').focus();
                            }
                        }
                        // console.log(response);
                    }else{
                        Ext.toast('Lưu thất bại: ' + response.message, 2000);
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lưu thất bại: ' + response.message, 2000);
                }
        })
    },

    onBtnDeletePkl: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var msgWindow = Ext.Msg.show({
            title: 'Thông báo',
            message: 'Bạn có chắc chắn xoá?',
            width: 300,
            closable: false,
            zIndex: 2,
            // modal: true,
            // masked: true,
            // maskTapHandler: function(){
            //     if(Ext.Msg){
            //         Ext.Msg.hide();
            //         me.setMasked(false);
            //     }
            // },
            buttons: [{
                text: 'Thoát',
                itemId: 'no'
            }, {
                text: 'Xoá',
                itemId: 'yes'
            }],
            fn: function (buttonValue, inputText, showConfig) {
                if(buttonValue == 'no'){
                    if(Ext.Msg){
                        Ext.Msg.hide();
                    }
                }
                if(buttonValue == 'yes'){
                    m.deletePkl();
                }
            },
            icon: Ext.Msg.QUESTION,
        });
    },
    deletePkl: function(){
        var myview = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        var selectedPklRecord = viewModel.get('selectedPklRecord');
        var id = selectedPklRecord.get('id');

        // myview.setMasked({
        //     xtype: 'loadmask',
        //     message: 'Đang xoá'
        // });

        var params = new Object();
        params.id = id;

        GSmartApp.Ajax.postJitin('/api/v1/stockout_pklist/pklist_delete', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                myview.setMasked(false);
                if (success) {
                    Ext.toast('Xoá thành công', 2000);
                    m.fireEvent('reloadStore');
                    m.fireEvent('close');

                } else {
                    Ext.toast('Lỗi xoá: ' + response.message, 2000);
                }
        })        
    },
})