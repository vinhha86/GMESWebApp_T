Ext.define('GSmartApp.view.stockout.stockout_material.stockout_m_list.stockout_m_edit.stockout_m_edit_pkl.Stockout_M_Edit_Pkl_Rip_Detail_Controller', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockout_M_Edit_Pkl_Rip_Detail_Controller',
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
        '#btnCheckRip':{
            tap: 'onCheckRip'
        },
        '#btnDeletePklRip':{
            tap: 'onbtnDeletePklRip'
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

        var objRip = new Object();
        objRip.id = record.get('id');
        objRip.lotnumber = record.get('lotnumber');
        objRip.packageid = record.get('packageid');
        objRip.met_check = record.get('met_check') == null ? 0 : record.get('met_check');
        objRip.ydscheck = record.get('ydscheck') == null ? 0 : record.get('ydscheck');
        objRip.met_remain = record.get('met_remain') == null ? 0 : record.get('met_remain');
        objRip.yds_remain = record.get('yds_remain') == null ? 0 : record.get('yds_remain');
        objRip.met_remain_and_check = record.get('met_remain_and_check') == null ? 0 : record.get('met_remain_and_check');
        objRip.yds_remain_and_check = record.get('yds_remain_and_check') == null ? 0 : record.get('yds_remain_and_check');

        viewModel.set('objRip', objRip);
    },
    resetFormRip: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var lotnumber = viewModel.get('objRip.lotnumber');
        viewModel.set('objRip', null);
        viewModel.set('objRip.lotnumber', lotnumber);
    },
    onCheckRip: function(btn, e, eOpts){
        var m = this;
        var me = this.getView();
        me.down('#lotnumberTxtRip').focus();
        setTimeout(function(){
            m.CheckRip();
        }, 50);
    },
    CheckRip: function(){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');
        var selectedPklRecord = viewModel.get('selectedPklRecord');
        var objRip = viewModel.get('objRip');
        // objRip: lưu thông tin của các trường
        // id, lotnumber, packageid, met_check, ydscheck (các trường của stockout pkl)
        // met_remain, yds_remain (trường để update warehouse)

        // check combo đã chọn chưa
        var pklRip_stockoutdId = viewModel.get('pklRip_stockoutdId');
        if(pklRip_stockoutdId == '' || pklRip_stockoutdId == null){
            Ext.toast('Cần chọn loại vải', 2000);
            return;
        }

        if(objRip.id == null){
            Ext.toast('Không tìm thấy cây vải có số lot và cây này', 2000);
            return;
        }

        // check textfield
        if(
            objRip.yds_remain == '' || objRip.yds_remain == null ||
            objRip.ydscheck == '' || objRip.ydscheck == null ||
            objRip.met_remain == '' || objRip.met_remain == null ||
            objRip.met_check == '' || objRip.met_check == null
        ){
            var currentEditField = viewModel.get('currentEditField');
            currentEditField = '#' + currentEditField;
            var textfield = me.down(currentEditField);
            m.onPklRipTextfieldFocusLeave(textfield);
        }
        
        // quy đổi met <-> yds
        if(stockout.unitid_link == 3){
            // có y
            // objRip.ydscheck = parseFloat(objRip.ydscheck);
            objRip.met_check = objRip.ydscheck * 0.9144;
            // objRip.yds_remain = parseFloat(objRip.yds_remain);
            objRip.met_remain = objRip.yds_remain * 0.9144;
        }
        if(stockout.unitid_link == 1){
            // có m
            // objRip.met_check = parseFloat(objRip.met_met_checkcheck);
            objRip.ydscheck = objRip.met_check / 0.9144;
            // objRip.met_remain = parseFloat(objRip.met_remain);
            objRip.yds_remain = objRip.met_remain / 0.9144;
        }
        // console.log(objRip);

        // lấy 2 số thập phân
        objRip.met_check = parseFloat(objRip.met_check);
        objRip.ydscheck = parseFloat(objRip.ydscheck);
        objRip.met_remain = parseFloat(objRip.met_remain);
        objRip.yds_remain = parseFloat(objRip.yds_remain);

        // lưu
        me.setMasked({
            xtype: 'loadmask',
            message: 'Đang lưu'
        });

        var params = new Object();
        params.id = objRip.id;
        params.lotnumber = objRip.lotnumber;
        params.packageid = objRip.packageid;
        params.met_check = objRip.met_check;
        params.ydscheck = objRip.ydscheck;
        params.met_remain = objRip.met_remain;
        params.yds_remain = objRip.yds_remain;
        // id, lotnumber, packageid, met_check, ydscheck (các trường của stockout pkl)
        // met_remain, yds_remain (trường để update warehouse)

        GSmartApp.Ajax.postJitin('/api/v1/stockout_pklist/update_rip', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                me.setMasked(false);
                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.respcode == 200) {
                        Ext.toast('Lưu thành công', 2000);
                        
                        m.fireEvent('reloadStore');
                        if(selectedPklRecord == null){
                            m.resetFormRip();
                            m.getView().down('#packageidTxtRip').focus();
                        }
                    }else{
                        Ext.toast('Lưu thất bại: ' + response.message, 2000);
                    }
                } else {
                    Ext.toast('Lưu thất bại: ' + response.message, 2000);
                }
        })
    },
    onbtnResetFormRip: function(){
        var m = this;
        var viewModel = this.getViewModel();
        viewModel.set('lotnumberTxtRip', '');
        m.resetFormRip();
    },
    onlotnumberTxtAndpackageidTxtRipleave: function(textfield, event, eOpts){
        //
        this.onFocusLeave(textfield);
        //
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var selectedDRecord = viewModel.get('selectedDRecord');
        var selectedPklRecord = viewModel.get('selectedPklRecord');

        var lotnumber = viewModel.get('objRip.lotnumber');
        var packageid = viewModel.get('objRip.packageid');

        // nếu đang chọn 1 record thì edit, ko tìm trên db, return
        if(selectedPklRecord != null){
            return;
        }

        if( // nếu chưu đủ thông tin hoặc chưa chọn loại vải, return
            lotnumber == '' || packageid == '' ||
            lotnumber == null || packageid == null ||
            selectedDRecord == null
        ){
            viewModel.set('objRip', null);
            viewModel.set('objRip.lotnumber', lotnumber);
            viewModel.set('objRip.packageid', packageid);
            return;
        }else{ // tìm cây vải theo lot và package
            var stockoutdid_link = selectedDRecord.get('id');

            me.setMasked({
                xtype: 'loadmask',
                message: 'Đang tải'
            });

            var params = new Object();
            params.stockoutdid_link = stockoutdid_link;
            params.lotnumber = lotnumber;
            params.packageid = packageid;

            GSmartApp.Ajax.postJitin('/api/v1/stockout_pklist/getByStockoutDLotAndPackageId', Ext.JSON.encode(params),
                function (success, response, options) {
                    // me.setLoading(false);
                    me.setMasked(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            if(response.data.length == 0){
                                Ext.toast('Không tìm thấy cây vải có số lot và cây này', 2000);
                                viewModel.set('objRip', null);
                                viewModel.set('objRip.lotnumber', lotnumber);
                                viewModel.set('objRip.packageid', packageid);

                            }else{
                                // tìm thấy cây vải, set thông tin cho các trường
                                var responseObjs = response.data;
                                if(responseObjs.length == 1){ // tim dc 1 cay vai duy nhat
                                    var responseObj = response.data[0];
                                    var objRip = m.setDataObjPkl(responseObj);
                                    viewModel.set('objRip', objRip);
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
    onPklRipTextfieldFocus: function(textfield, e, eOpts){
        this.onFocus(textfield, e, eOpts);
        // set viewmodel currentEditField (textfield đang edit)
        var viewModel = this.getViewModel();
        var itemId = textfield.getItemId();
        viewModel.set('isTextFieldFocus', true);
        viewModel.set('currentEditField', itemId);
    },
    onPklRipTextfieldFocusLeave: function(textfield, e, eOpts){
        //
        this.onFocusLeave(textfield);
        //
        // update các textfield còn lại
        // console.log(textfield);
        // console.log(textfield.getItemId());
        var viewModel = this.getViewModel();
        viewModel.set('isTextFieldFocus', false);
        var itemId = '';
        if(textfield == null){
            itemId = 'metCheck';
        }else{
            itemId = textfield.getItemId();
        }

        var objRip = viewModel.get('objRip');
        if(objRip == null || objRip.id == null) return;
        // met_check ydscheck met_remain yds_remain met_remain_and_check yds_remain_and_check
        switch(itemId){
            case 'metCheck':
                if(objRip.met_check < 0){
                    Ext.toast('Giá trị < 0', 1000);
                    objRip.met_check = objRip.met_remain_and_check - objRip.met_remain;
                }else
                if(objRip.met_check > objRip.met_remain_and_check){
                    Ext.toast('Giá trị > tổng số xé và số còn', 2000);
                    objRip.met_check = objRip.met_remain_and_check - objRip.met_remain;
                }else
                {
                    if(objRip.met_check == null || objRip.met_check == '') objRip.met_check = 0;
                    objRip.met_remain = objRip.met_remain_and_check - objRip.met_check;
                    objRip.yds_remain = objRip.met_remain / 0.9144;
                    objRip.ydscheck = objRip.yds_remain_and_check - objRip.yds_remain;
                }
                break;
            case 'metRemain':
                console.log('here');
                if(objRip.met_remain < 0){
                    Ext.toast('Giá trị < 0', 1000);
                    objRip.met_remain = objRip.met_remain_and_check - objRip.met_check;
                }else
                if(objRip.met_remain > objRip.met_remain_and_check){
                    Ext.toast('Giá trị > tổng số xé và số còn', 2000);
                    objRip.met_remain = objRip.met_remain_and_check - objRip.met_check;
                }else
                {
                    if(objRip.met_remain == null || objRip.met_remain == '') objRip.met_remain = 0;
                    objRip.met_check = objRip.met_remain_and_check - objRip.met_remain;
                    objRip.ydscheck = objRip.met_check / 0.9144;
                    objRip.yds_remain = objRip.yds_remain_and_check - objRip.ydscheck;
                }
                break;
            case 'ydsCheck':
                if(objRip.ydscheck < 0){
                    Ext.toast('Giá trị < 0', 1000);
                    objRip.ydscheck = objRip.yds_remain_and_check - objRip.yds_remain;
                }else
                if(objRip.ydscheck > objRip.yds_remain_and_check){
                    Ext.toast('Giá trị > tổng số xé và số còn', 2000);
                    objRip.ydscheck = objRip.yds_remain_and_check - objRip.yds_remain;
                }else
                {
                    if(objRip.ydscheck == null || objRip.ydscheck == '') objRip.ydscheck = 0;
                    objRip.yds_remain = objRip.yds_remain_and_check - objRip.ydscheck;
                    objRip.met_remain = objRip.yds_remain * 0.9144;
                    objRip.met_check = objRip.met_remain_and_check - objRip.met_remain;
                }
                break;
            case 'ydsRemain':
                if(objRip.yds_remain < 0){
                    Ext.toast('Giá trị < 0', 1000);
                    objRip.yds_remain = objRip.yds_remain_and_check - objRip.ydscheck;
                }else
                if(objRip.yds_remain > objRip.yds_remain_and_check){
                    Ext.toast('Giá trị > tổng số xé và số còn', 2000);
                    objRip.yds_remain = objRip.yds_remain_and_check - objRip.ydscheck;
                }else
                {
                    if(objRip.yds_remain == null || objRip.yds_remain == '') objRip.yds_remain = 0;
                    objRip.ydscheck = objRip.yds_remain_and_check - objRip.yds_remain;
                    objRip.met_check = objRip.ydscheck * 0.9144;
                    objRip.met_remain = objRip.met_remain_and_check - objRip.met_check;
                }
                break;
            default:
                break;
        }
        viewModel.set('objRip', objRip);
    },
    setDataObjPkl:function(objPkl){
        objPkl.met_check = objPkl.met_check == null ? 0 : objPkl.met_check;
        objPkl.ydscheck = objPkl.ydscheck == null ? 0 : objPkl.ydscheck;
        objPkl.met_remain = objPkl.met_remain == null ? 0 : objPkl.met_remain;
        objPkl.yds_remain = objPkl.yds_remain == null ? 0 : objPkl.yds_remain;
        objPkl.met_remain_and_check = objPkl.met_remain_and_check == null ? 0 : objPkl.met_remain_and_check;
        objPkl.yds_remain_and_check = objPkl.yds_remain_and_check == null ? 0 : objPkl.yds_remain_and_check;
        return objPkl;
    },
    popUpSelectCayVai: function(responseObjs){
        var m = this;
        var viewModel = this.getViewModel();
        
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
            var objRip = m.setDataObjPkl(responseObj);
            viewModel.set('objRip', objRip);
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

        console.log(popUpWindowData);

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
            zIndex:2,
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
                    xtype: 'Stockout_M_Edit_Pkl_Rip_Select',
                    viewModel: {
                        data: {
                            listValue: popUpWindowData
                        }
                    }
                }
            ],
        });
        dialog.show();

        dialog.down('#Stockout_M_Edit_Pkl_Rip_Select').getController().on('onSelectValue', function (selectValue) {
            // console.log(selectValue);
            var responseObj = selectValue.data;
            var objRip = m.setDataObjPkl(responseObj);
            viewModel.set('objRip', objRip);

            me.setMasked(false);
            dialog.close();
        });
    },
    onbtnDeletePklRip: function(){
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
        var stockout = viewModel.get('stockout');
        var stockoutid = stockout.id;
        var id = selectedPklRecord.get('id');

        // myview.setMasked({
        //     xtype: 'loadmask',
        //     message: 'Đang xoá'
        // });

        var params = new Object();
        params.id = id;

        GSmartApp.Ajax.postJitin('/api/v1/stockout_pklist/pklist_delete_rip', Ext.JSON.encode(params),
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