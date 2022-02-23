Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.stockin_m_edit_pkl_detail.Stockin_M_Edit_Pkl_Detail_Controller', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockin_M_Edit_Pkl_Detail_Controller',
    channelPrint: { cmd: null, dta: null },
	init: function () {
        var m = this;
		var viewModel = this.getViewModel();
        var selectedPklRecord = viewModel.get('selectedPklRecord');
        if(selectedPklRecord != null){
            m.onSetFormData();
        }
        m.setLot_RollNotCheck_Info();
        
        // var stockin = viewModel.get('stockin');
        // var selectedDRecord = viewModel.get('selectedDRecord');
        // var objPkl = viewModel.get('objPkl');

        // console.log(stockin);
        // console.log(selectedDRecord);
        // console.log(objPkl);
	},
    control: {
        '#btnCheck':{
            tap: 'onCheck'
        },
        '#btnPrintPkl':{
            tap: 'onPrintPkl'
        },
        '#btnDeletePkl':{
            tap: 'onDeletePkl'
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
        this.showSelectValueWindow(textfield);
    },
    setTooltip: function(textfield){
        var viewModel = this.getViewModel();
        var placeholder = textfield.getPlaceholder();
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: textfield,
            html: placeholder,
            zIndex: 2
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
            oldValue = viewModel.get('objPkl.mTxt');
        }else 
        if(placeholder == 'Dài phiếu (M)'){
            oldValue = viewModel.get('objPkl.mOriginTxt');
        }else 
        if(placeholder == 'Dài kiểm (Y)'){
            oldValue = viewModel.get('objPkl.yTxt');
        }else 
        if(placeholder == 'Dài phiếu (Y)'){
            oldValue = viewModel.get('objPkl.yOriginTxt');
        }else 
        if(placeholder == 'Khổ kiểm (cm)'){
            oldValue = viewModel.get('objPkl.widthMetCheckTxt');
        }else 
        if(placeholder == 'Khổ phiếu (cm)'){
            oldValue = viewModel.get('objPkl.widthMetTxt');
        }else
        if(placeholder == 'Khổ kiểm (inch)'){
            oldValue = viewModel.get('objPkl.widthYdsCheckTxt');
        }else 
        if(placeholder == 'Khổ phiếu (inch)'){
            oldValue = viewModel.get('objPkl.widthYdsTxt');
        }else
        if(placeholder == 'Cân kiểm'){
            oldValue = viewModel.get('objPkl.grossweightCheckTxt');
        }else 
        if(placeholder == 'Cân phiếu'){
            oldValue = viewModel.get('objPkl.grossweightTxt');
        }else
        if(placeholder == 'Lbs kiểm'){
            oldValue = viewModel.get('objPkl.grossweightLbsCheckTxt');
        }else 
        if(placeholder == 'Lbs phiếu'){
            oldValue = viewModel.get('objPkl.grossweightLbsTxt');
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
            if(placeholder == 'Dài kiểm (M)'){
                var mTxt = viewModel.get('objPkl.mTxt');
                var mOriginTxt = viewModel.get('objPkl.mOriginTxt');
                if(mOriginTxt == null || mOriginTxt == ''){
                    viewModel.set('objPkl.mOriginTxt', mTxt);
                }
            }else 
            if(placeholder == 'Dài kiểm (Y)'){
                var yTxt = viewModel.get('objPkl.yTxt');
                var yOriginTxt = viewModel.get('objPkl.yOriginTxt');
                if(yOriginTxt == null || yOriginTxt == ''){
                    viewModel.set('objPkl.yOriginTxt', yTxt);
                }
            }else 
            if(placeholder == 'Cân kiểm'){
                var grossweightCheckTxt = viewModel.get('objPkl.grossweightCheckTxt');
                var grossweightTxt = viewModel.get('objPkl.grossweightTxt');
                if(grossweightTxt == null || grossweightTxt == ''){
                    viewModel.set('objPkl.grossweightTxt', grossweightCheckTxt);
                }
            }else 
            if(placeholder == 'Lbs kiểm'){
                var grossweightLbsCheckTxt = viewModel.get('objPkl.grossweightLbsCheckTxt');
                var grossweightLbsTxt = viewModel.get('objPkl.grossweightLbsTxt');
                if(grossweightLbsTxt == null || grossweightLbsTxt == ''){
                    viewModel.set('objPkl.grossweightLbsTxt', grossweightLbsCheckTxt);
                }
            }else 
            if(placeholder == 'Khổ kiểm (cm)'){
                var widthMetCheckTxt = viewModel.get('objPkl.widthMetCheckTxt');
                var widthMetTxt = viewModel.get('objPkl.widthMetTxt');
                if(widthMetTxt == null || widthMetTxt == ''){
                    viewModel.set('objPkl.widthMetTxt', widthMetCheckTxt);
                }
            }else 
            if(placeholder == 'Khổ kiểm (inch)'){
                var widthYdsCheckTxt = viewModel.get('objPkl.widthYdsCheckTxt');
                var widthYdsTxt = viewModel.get('objPkl.widthYdsTxt');
                if(widthYdsTxt == null || widthYdsTxt == ''){
                    viewModel.set('objPkl.widthYdsTxt', widthYdsCheckTxt);
                }
            }
        }
        // console.log("Version " + Ext.os.version);
    },
    resetForm: function(){
        var myview = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var objPkl = viewModel.get('objPkl');
        
        Ext.Viewport.setMasked(false);

        // viewModel.set('objPkl.lotnumberTxt', '');
        viewModel.set('objPkl.id', null);
        viewModel.set('objPkl.packageidTxt', '');
        viewModel.set('objPkl.yTxt', '');
        viewModel.set('objPkl.mTxt', '');
        viewModel.set('objPkl.yOriginTxt', '');
        viewModel.set('objPkl.mOriginTxt', '');
        // viewModel.set('colorTxt', stockinD.colorid_link);
        // viewModel.set('widthTxt', '');
        viewModel.set('objPkl.grossweightTxt', '');
        viewModel.set('objPkl.grossweightCheckTxt', '');
        viewModel.set('objPkl.grossweightLbsTxt', '');
        viewModel.set('objPkl.grossweightLbsCheckTxt', '');
        viewModel.set('objPkl.sampleCheckTxt', '');
        // viewModel.set('objPkl.widthYdsCheckTxt', '');
        // viewModel.set('objPkl.widthYdsTxt', '');
        // viewModel.set('objPkl.widthMetCheckTxt', '');
        // viewModel.set('objPkl.widthMetTxt', '');

        // viewModel.set('pklSpaceTxt', null);
        // viewModel.set('pklFloorTxt', null);
        // myview.down('#packageidTxt').focus();
        // console.log(objPkl);
    },
    resetFormKeepWidth: function(){
        var myview = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var objPkl = viewModel.get('objPkl');
        
        Ext.Viewport.setMasked(false);

        // viewModel.set('objPkl.lotnumberTxt', '');
        viewModel.set('objPkl.id', null);
        // viewModel.set('objPkl.packageidTxt', '');
        viewModel.set('objPkl.yTxt', '');
        viewModel.set('objPkl.mTxt', '');
        viewModel.set('objPkl.yOriginTxt', '');
        viewModel.set('objPkl.mOriginTxt', '');
        // viewModel.set('colorTxt', stockinD.colorid_link);
        // viewModel.set('widthTxt', '');
        viewModel.set('objPkl.grossweightTxt', '');
        viewModel.set('objPkl.grossweightCheckTxt', '');
        viewModel.set('objPkl.grossweightLbsTxt', '');
        viewModel.set('objPkl.grossweightLbsCheckTxt', '');
        viewModel.set('objPkl.sampleCheckTxt', '');
        // viewModel.set('objPkl.widthYdsCheckTxt', '');
        // viewModel.set('objPkl.widthYdsTxt', '');
        // viewModel.set('objPkl.widthMetCheckTxt', '');
        // viewModel.set('objPkl.widthMetTxt', '');

        // viewModel.set('pklSpaceTxt', null);
        // viewModel.set('pklFloorTxt', null);
        // myview.down('#packageidTxt').focus();
        // console.log(objPkl);
    },
    onSetFormData: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var record = viewModel.get('selectedPklRecord');
        
        viewModel.set('objPkl.lotnumberTxt', record.get('lotnumber'));
        viewModel.set('objPkl.packageidTxt', record.get('packageid'));
        viewModel.set('objPkl.yTxt', record.get('ydscheck'));
        viewModel.set('objPkl.mTxt', record.get('met_check'));
        viewModel.set('objPkl.yOriginTxt', record.get('ydsorigin'));
        viewModel.set('objPkl.mOriginTxt', record.get('met_origin'));
        viewModel.set('objPkl.colorTxt', record.get('colorid_link'));
        viewModel.set('objPkl.grossweightTxt', record.get('grossweight'));
        viewModel.set('objPkl.grossweightCheckTxt', record.get('grossweight_check'));
        viewModel.set('objPkl.grossweightLbsTxt', record.get('grossweight_lbs'));
        viewModel.set('objPkl.grossweightLbsCheckTxt', record.get('grossweight_lbs_check'));
        viewModel.set('objPkl.sampleCheckTxt', record.get('sample_check'));
        viewModel.set('objPkl.widthMetCheckTxt', record.get('width_met_check')  * 100); // m -> cm
        viewModel.set('objPkl.widthMetTxt', record.get('width_met') * 100); // m -> cm
        viewModel.set('objPkl.widthYdsCheckTxt', (record.get('width_yds_check')  * 36).toFixed(2)); // yds -> inch
        viewModel.set('objPkl.widthYdsTxt', (record.get('width_yds')  * 36).toFixed(2)); // yds -> inch

        // set khoang info cho pkl
        viewModel.set('objPkl.pklFloorTxt', record.get('floor'));
        viewModel.set('objPkl.pklSpaceTxt', record.get('space'));
        viewModel.set('objPkl.pklRowTxt', record.get('row'));

        //
        m.onFieldKeyUp();
    },
    onPrintPkl: function () {
        console.log('onPrintPkl clicked');
        // popup here
    },
    onDeletePkl: function () {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var selectedPklRecord = viewModel.get('selectedPklRecord');
        if(selectedPklRecord == null || isNaN(selectedPklRecord.get('id'))){
            Ext.toast('Cần chọn cây vải', 2000);
            return;
        }

        var msgWindow = Ext.Msg.show({
            title: 'Thông báo',
            message: 'Bạn có chắc chắn xoá?',
            width: 300,
            closable: false,
            zIndex: 2,
            modal: false,
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
        // console.log(selectedPklRecord);
    },
    deletePkl: function(){
        var myview = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        var selectedPklRecord = viewModel.get('selectedPklRecord');
        var id = selectedPklRecord.get('id');

        myview.setMasked({
            xtype: 'loadmask',
            message: 'Đang xoá'
        });

        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.postJitin('/api/v1/stockin_pklist/pklist_delete', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                myview.setMasked(false);
                if (success) {
                    Ext.toast('Xoá thành công', 2000);
                    m.fireEvent('reloadStore');
                    m.fireEvent('close');

                } else {
                    Ext.toast('Lỗi xoá pkl: ' + response.message, 2000);
                }
        })        
    },
    setLot_RollNotCheck_Info: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var stockin = viewModel.get('stockin');
        var selectedDRecord = viewModel.get('selectedDRecord');
        var objPkl = viewModel.get('objPkl');

        var stockinid_link = stockin.id;
        var stockindid_link = selectedDRecord.get('id');
        var lotnumber = objPkl.lotnumberTxt;

        var params = new Object();
        params.stockinid_link = stockinid_link;
        params.stockindid_link = stockindid_link;
        params.lotnumber = lotnumber;
        
        GSmartApp.Ajax.postJitin('/api/v1/stockin_pklist/lot_rollnotcheck_info', Ext.JSON.encode(params),
            function (success, response, options) {
                // myview.setMasked(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
					//    console.log(response);
                       viewModel.set('slcankiem', response.total);
                       viewModel.set('dschuakiem', response.list_not_check);
                    }else{
                        // Ext.toast('Lỗi kiểm cây: ' + response.message, 2000);
                        console.log('fail');
                    }
                } else {
                    // Ext.Viewport.setMasked(false);
                    // var response = Ext.decode(response.responseText);
                    // Ext.toast('Lỗi kiểm cây: ' + response.message, 2000);
                        console.log('fail network');
                }
        })        
    },
    onCheck: function(){
        var m = this;
        var me = this.getView();

        // me.down('#focusField').focus();

        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var selectedDRecord = viewModel.get('selectedDRecord');
        var selectedPklRecord = viewModel.get('selectedPklRecord');

        var lotnumberTxt = viewModel.get('objPkl.lotnumberTxt');
        var packageidTxt = viewModel.get('objPkl.packageidTxt');
        var yTxt = viewModel.get('objPkl.yTxt');
        var mTxt = viewModel.get('objPkl.mTxt');
        var yOriginTxt = viewModel.get('objPkl.yOriginTxt');
        var mOriginTxt = viewModel.get('objPkl.mOriginTxt');
        
        var grossweightCheckTxt = viewModel.get('objPkl.grossweightCheckTxt');
        var grossweightLbsCheckTxt = viewModel.get('objPkl.grossweightLbsCheckTxt');
        var grossweightTxt = viewModel.get('objPkl.grossweightTxt');
        var grossweightLbsTxt = viewModel.get('objPkl.grossweightLbsTxt');
        
        var sampleCheckTxt = viewModel.get('objPkl.sampleCheckTxt');
        var widthMetCheckTxt = viewModel.get('objPkl.widthMetCheckTxt');
        var widthMetTxt = viewModel.get('objPkl.widthMetTxt');
        var widthYdsCheckTxt = viewModel.get('objPkl.widthYdsCheckTxt');
        var widthYdsTxt = viewModel.get('objPkl.widthYdsTxt');
        // var widthMetTxt = viewModel.get('objPkl.widthMetTxt') == null ? viewModel.get('objPkl.widthMetCheckTxt') : viewModel.get('objPkl.widthMetTxt');
        var pklRowTxt = viewModel.get('objPkl.pklRowTxt');
        var pklSpaceTxt = viewModel.get('objPkl.pklSpaceTxt');
        var pklFloorTxt = viewModel.get('objPkl.pklFloorTxt');

        // check combo đã chọn chưa
        var pkl_stockindId = selectedDRecord.get('id');
        if(pkl_stockindId == '' || pkl_stockindId == null){
            Ext.toast('Cần chọn loại vải', 2000);
            return;
        }

        // check textfield
        if(packageidTxt == '' || packageidTxt == null){
            Ext.toast('Thiếu thông tin Số cây', 2000);
            return;
        }
        if(stockin.unitid_link == 1){ // met
            if(mTxt == '' || mTxt == null || isNaN(mTxt)){
                if(mTxt !== 0){
                    Ext.toast('Số M kiểm phải là số', 2000);
                    return;
                }
            }
            if(mOriginTxt == '' || mOriginTxt == null || isNaN(mOriginTxt)){
                if(mOriginTxt !== 0){
                    // Ext.toast('Số M phiếu phải là số', 2000);
                    // return;
                    mOriginTxt = mTxt;
                }
            }
        }
        if(stockin.unitid_link == 3){ // yds
            if(yTxt == '' || yTxt == null || isNaN(yTxt)){
                if(yTxt !== 0){
                    Ext.toast('Số Y phải là số', 2000);
                    return;
                }
            }
            if(yOriginTxt == '' || yOriginTxt == null || isNaN(yOriginTxt)){
                if(yOriginTxt !== 0){
                    // Ext.toast('Số Y phiếu phải là số', 2000);
                    // return;
                    yOriginTxt = yTxt;
                }
            }
        }
        if(stockin.unitid_link == 4){ // kg
            if(grossweightCheckTxt == '' || grossweightCheckTxt == null || isNaN(grossweightCheckTxt)){
                if(grossweightCheckTxt !== 0){
                    Ext.toast('Cân kiểm phải là số', 2000);
                    return;
                }
            }
            if(grossweightTxt == '' || grossweightTxt == null || isNaN(grossweightTxt)){
                if(grossweightTxt !== 0){
                    // Ext.toast('Cân phiếu phải là số', 2000);
                    // return;
                    grossweightTxt = grossweightCheckTxt;
                }
            }
        }
        if(stockin.unitid_link == 5){ // lbs
            if(grossweightLbsCheckTxt == '' || grossweightLbsCheckTxt == null || isNaN(grossweightLbsCheckTxt)){
                if(grossweightLbsCheckTxt !== 0){
                    Ext.toast('Lbs kiểm phải là số', 2000);
                    return;
                }
            }
            if(grossweightLbsTxt == '' || grossweightLbsTxt == null || isNaN(grossweightLbsTxt)){
                if(grossweightLbsTxt !== 0){
                    // Ext.toast('Lbs phiếu phải là số', 2000);
                    // return;
                    grossweightLbsTxt = grossweightLbsCheckTxt;
                }
            }
        }
        // console.log(stockin.width_unitid_link);
        if(stockin.width_unitid_link == null || stockin.width_unitid_link == 1){ // cm
            if(widthMetCheckTxt == '' || widthMetCheckTxt == null || isNaN(widthMetCheckTxt)){
                if(widthMetCheckTxt !== 0){
                    Ext.toast('Số khổ kiểm (cm) phải là số', 2000);
                    return;
                }
            }
            if(widthMetTxt == '' || widthMetTxt == null || isNaN(widthMetTxt)){
                if(widthMetTxt !== 0){
                    // Ext.toast('Số khổ phiếu phải là số', 2000);
                    // return;
                    widthMetTxt = widthMetCheckTxt;
                }
            }
        }
        if(stockin.width_unitid_link == 3){ // inch
            if(widthYdsCheckTxt == '' || widthYdsCheckTxt == null || isNaN(widthYdsCheckTxt)){
                if(widthYdsCheckTxt !== 0){
                    console.log(widthYdsCheckTxt);
                    Ext.toast('Số khổ kiểm (inch) phải là số', 2000);
                    return;
                }
            }
            if(widthYdsTxt == '' || widthYdsTxt == null || isNaN(widthYdsTxt)){
                if(widthYdsTxt !== 0){
                    // Ext.toast('Số khổ phiếu phải là số', 2000);
                    // return;
                    widthYdsTxt = widthYdsCheckTxt;
                }
            }
        }

        // spaceepc_link: khoang cây vải
        var numberOfEmptyField = 0;
        if(pklRowTxt == null || pklRowTxt == '') {
            numberOfEmptyField++;
        }
        if(pklSpaceTxt == null || pklSpaceTxt == '') {
            numberOfEmptyField++;
        }
        if(pklFloorTxt == null || pklFloorTxt == '') {
            numberOfEmptyField++;
        }
        
        if(numberOfEmptyField !=0 && numberOfEmptyField != 3){
            Ext.toast('Phải điền tất cả hoặc bỏ trống tất cả thông tin dãy, hàng, tầng', 2000);
            return;
        }

        // tạo obj
        if(yTxt == null || yTxt == '') yTxt = 0;
        if(mTxt == null || mTxt == '') mTxt = 0;
        if(yOriginTxt == null || yOriginTxt == '' || yOriginTxt == 0) yOriginTxt = yTxt;
        if(mOriginTxt == null || mOriginTxt == '' || mOriginTxt == 0) mOriginTxt = mTxt;
        if(sampleCheckTxt == null || sampleCheckTxt == '') sampleCheckTxt = 0;

        if(grossweightCheckTxt == null || grossweightCheckTxt == '') grossweightCheckTxt = 0;
        if(grossweightTxt == null || grossweightTxt == '' || grossweightTxt == 0) grossweightTxt = grossweightCheckTxt;
        if(grossweightLbsCheckTxt == null || grossweightLbsCheckTxt == '') grossweightLbsCheckTxt = 0;
        if(grossweightLbsTxt == null || grossweightLbsTxt == '' || grossweightLbsTxt == 0) grossweightLbsTxt = grossweightLbsCheckTxt;
        
        if(widthMetCheckTxt == null || widthMetCheckTxt == '') widthMetCheckTxt = 0;
        if(widthMetTxt == null || widthMetTxt == '' || widthMetTxt == 0) widthMetTxt = widthMetCheckTxt;
        if(widthYdsCheckTxt == null || widthYdsCheckTxt == '') widthYdsCheckTxt = 0;
        if(widthYdsTxt == null || widthYdsTxt == '' || widthYdsTxt == 0) widthYdsTxt = widthYdsCheckTxt;

        var objData = new Object();
        objData.id = viewModel.get('objPkl.id');
        objData.rssi = viewModel.get('objPkl.rssi');
        objData.lotnumber = lotnumberTxt;
        objData.packageid = packageidTxt;
        objData.ydscheck = yTxt;
        objData.met_check = mTxt;
        objData.ydsorigin = yOriginTxt;
        objData.met_origin = mOriginTxt;
        objData.grossweight_check = grossweightCheckTxt;
        objData.grossweight = grossweightTxt;
        objData.grossweight_lbs_check = grossweightLbsCheckTxt;
        objData.grossweight_lbs = grossweightLbsTxt;
        objData.colorid_link = selectedDRecord.get('colorid_link');;
        // objData.widthTxt = widthTxt;
        objData.sample_check = sampleCheckTxt;

        if(stockin.width_unitid_link == null || stockin.width_unitid_link == 1){ // cm
            objData.width_met_check = widthMetCheckTxt / 100;
            objData.width_met = widthMetTxt / 100;
            objData.width_yds_check = objData.width_met_check / 0.9144;
            objData.width_yds = objData.width_met / 0.9144;
        }
        if(stockin.width_unitid_link == 3){ // inch
            objData.width_yds_check = widthYdsCheckTxt / 36;
            objData.width_yds = widthYdsTxt / 36;
            objData.width_met_check = objData.width_yds_check * 0.9144;
            objData.width_met = objData.width_yds * 0.9144;
        }


        objData.unitid_link = stockin.unitid_link;
        objData.stockinid_link = stockin.id;
        objData.stockindid_link = pkl_stockindId;
        objData.skuid_link = selectedDRecord.get('skuid_link');
        // objData.spaceepc_link = spaceepc_link;
        // objData.status = 1;
        objData.row = pklRowTxt;
        objData.space = pklSpaceTxt;
        objData.floor = pklFloorTxt;


        if(stockin.unitid_link == 1 || stockin.unitid_link == null){
            // met
            objData.met_check = parseFloat(mTxt);
            objData.ydscheck = objData.met_check / 0.9144;
            objData.met_origin = parseFloat(mOriginTxt);
            objData.ydsorigin = objData.met_origin / 0.9144;
        }
        if(stockin.unitid_link == 3){
            // yds
            objData.ydscheck = parseFloat(yTxt);
            objData.met_check = objData.ydscheck * 0.9144;
            objData.ydsorigin = parseFloat(yOriginTxt);
            objData.met_origin = objData.ydsorigin * 0.9144;
        }
        if(stockin.unitid_link == 4){
            // kg
            objData.grossweight_check = parseFloat(grossweightCheckTxt);
            objData.grossweight = parseFloat(grossweightTxt);
            objData.grossweight_lbs_check = objData.grossweight_check * 2.20462;
            objData.grossweight_lbs = objData.grossweight * 2.20462;
        }
        if(stockin.unitid_link == 5){
            // lbs
            objData.grossweight_lbs_check = parseFloat(grossweightLbsCheckTxt);
            objData.grossweight_lbs = parseFloat(grossweightLbsTxt);
            objData.grossweight_check = objData.grossweight_lbs_check / 2.20462;
            objData.grossweight = objData.grossweight_lbs / 2.20462;
        }

        objData.met_check = parseFloat(objData.met_check);
        objData.ydscheck = parseFloat(objData.ydscheck);
        objData.met_origin = parseFloat(objData.met_origin);
        objData.ydsorigin = parseFloat(objData.ydsorigin);

        objData.grossweight_lbs_check = parseFloat(objData.grossweight_lbs_check);
        objData.grossweight_lbs = parseFloat(objData.grossweight_lbs);
        // objData.netweight_lbs = objData.grossweight_lbs_check;
        objData.grossweight_check = parseFloat(objData.grossweight_check);
        objData.grossweight = parseFloat(objData.grossweight);
        // objData.netweight = objData.grossweight_check;
        
        objData.width_met_check = parseFloat(objData.width_met_check);
        objData.width_yds_check = parseFloat(objData.width_yds_check);
        objData.width_met = parseFloat(objData.width_met);
        objData.width_yds = parseFloat(objData.width_yds);

        if(selectedPklRecord != null){
            objData.id = selectedPklRecord.get('id');
        }

        // 
        m.onUpdate_Print_Pklist(objData);
        // this.fireEvent('onCheck', objData);
    },
    
    //hungdaibang code
    onUpdate_Print_Pklist: function(pklistData){
        var myview = this.getView();
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Đang in tem'
        });
        myview.setMasked({
            xtype: 'loadmask',
            message: 'Đang lưu'
        });

		var me = this;
        var viewModel = this.getViewModel();
        var selectedPklRecord = viewModel.get('selectedPklRecord');

        var params = new Object();
        params.data = pklistData;

        if (null!=pklistData.id){
            //Neu la update thong tin cay vai --> Khong in tem
            params.isprintlabel = false;
        } else {
            //Neu la them moi cay vai --> Theo cau hinh he thong (In/Ko in)
            params.isprintlabel = config.getPrint_material_label();
        }
        
        params.rfid_enable = config.getPrint_rfid_enable();
        GSmartApp.Ajax.postJitin('/api/v1/stockin_pklist/pklist_create', Ext.JSON.encode(params),
            function (success, response, options) {
                myview.setMasked(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
					   //Goi mqtt de in tem
                        if (null != response.rfprintid_link && response.rfprintid_link > 0){
					        me.onPrint_WithRFID(response.rfprintid_link);
                        } else {
                            //Reload danh sach Pklist va Reset cac o nhap lieu
                            Ext.Viewport.setMasked(false);
                            Ext.toast('Lưu thành công', 2000);
                            if(selectedPklRecord == null){
                                // them moi
                                me.fireEvent('reloadStore');
                                me.setLot_RollNotCheck_Info();
                                me.resetForm();
                                Ext.defer(function () { myview.down('#packageidTxt').focus(); }, 50);
                            }else{
                                // edit
                                me.fireEvent('reloadStore');
                                me.setLot_RollNotCheck_Info();
                            }
                        }
                        me.onFieldKeyUp();
                    }else{
                        Ext.toast('Lỗi kiểm cây: ' + response.message, 2000);
                    }
                } else {
                    Ext.Viewport.setMasked(false);
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lỗi kiểm cây: ' + response.message, 2000);
                }
        })        
    },
	onPrint_WithRFID: function(rfprintid_link){
        // console.log(rfprintid_link);
        var me = this;

        //Ngat connect trc khi goi
		GSmartApp.Mqtt.onDisconnect();

        var viewModel = this.getViewModel();
		var host = config.getHost();
		var port = config.getPort();
		var clientid = config.getClientid();
		var termid = config.getTermid();
        var deviceId = 2;
		me.sessionid = ""+rfprintid_link;
		
		me.channelPrint.cmd = 'gsm5/term/' + termid + '/cmd';
		GSmartApp.Mqtt.connect(host, port, clientid, me.channelPrint, deviceId, function (topic, message) {
			if (topic.includes("cmd")) {
				var jsonObj = Ext.JSON.decode(message);
				// console.log(jsonObj);
                //Neu respcode = 2 --> may in chua san sang
                if (jsonObj.respcode == 2){
                    Ext.Viewport.setMasked(false);
                    Ext.Msg.alert('Thông báo', 'Máy in chưa sẵn sàng', Ext.emptyFn);
                    viewModel.set('isKiemcay_CheckEnable', true);
                } else {
                    if (jsonObj.ct == 1) {
                        if (jsonObj.cid == 'CMD_START_PRINT') {

                            //Disable nut check --> Khong cho nhan luc dang in
                            viewModel.set('isKiemcay_CheckEnable', false);
                        }
                    }

                    //Khi het time out tu dong enable nut check cho nhap tiep
                    if (jsonObj.ct == 2 && jsonObj.cid == 'NTF_ON_STOP') {
                        me.onPrintStop(rfprintid_link);
                    }
                }
			} 
		}, function () {
			me.sendChannel = 'gsm5/device/' + 'rfprinter-0001' + '/cmd';
			me.funcid = ""+1;
			var cmd = { ct: 0, cid: "CMD_START_PRINT", srcid: termid, reqdata: { timeout: 120000, sessionid: me.sessionid, funcid: me.funcid } };
			console.log("Device channel:" + me.sendChannel);
			var message = new Paho.Message(Ext.JSON.encode(cmd));
			message.destinationName = me.sendChannel;
			message.qos = 0;
			GSmartApp.Mqtt.client.send(message);

		}, function () {
            Ext.Viewport.setMasked(false);
			console.log('Loi connect may in');
			var viewModel = me.getViewModel();
			viewModel.set('clsbtn', "red-button");
			viewModel.set('clsbtnStart', "blue-button");
			viewModel.set('clsbtnStop', "");
			viewModel.set('isStart', false);
		});
	},  
    onPrintStop: function (rfprintid_link) {
        var me = this;
        var viewModel = this.getViewModel();
        viewModel.set('isKiemcay_CheckEnable', true);

        //Kiem tra lai trang thai cua Session print
        var params = new Object();
        params.rfprintid_link = rfprintid_link;
        GSmartApp.Ajax.postJitin('/api/v1/rfprint/getbyid', Ext.JSON.encode(params),
            function (success, response, options) {
                Ext.Viewport.setMasked(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        if (response.status == 2){//In tem OK
                            //In Success --> Reload danh sach Pklist va Reset cac o nhap lieu
                            if(selectedPklRecord == null){
                                // them moi
                                me.fireEvent('reloadStore');
                                me.resetForm();
                            }else{
                                // edit
                                me.fireEvent('reloadStore');
                            }
                        } else {
                            Ext.Msg.alert('Thông báo', 'Lỗi máy in:' + response.err_msg, Ext.emptyFn);
                            me.reloadStore();
                        }
                    } else {
                        Ext.toast('Lỗi kiểm tra kết quả in: ' + response.message, 2000);
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lỗi kiểm tra kết quả in: ' + response.message, 2000);
                }
        }) 
    },
    onlotnumberTxtType: function(field, newValue, oldValue, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        // console.log(newValue.toUpperCase());
        viewModel.set('objPkl.lotnumberTxt', newValue.toUpperCase());
        field.setValue(newValue.toUpperCase());
    },
    onmTxtFocusleave: function(textfield, event, eOpts){
        //
        this.onFocusLeave(textfield);
        //
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        var mTxt = viewModel.get('objPkl.mTxt');
        var mOriginTxt = viewModel.get('objPkl.mOriginTxt');
        if(mOriginTxt == null || mOriginTxt == ''){
            viewModel.set('objPkl.mOriginTxt', mTxt);
        }
    },
    onyTxtFocusleave: function(textfield, event, eOpts){
        //
        this.onFocusLeave(textfield);
        //
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        var yTxt = viewModel.get('objPkl.yTxt');
        var yOriginTxt = viewModel.get('objPkl.yOriginTxt');
        if(yOriginTxt == null || yOriginTxt == ''){
            viewModel.set('objPkl.yOriginTxt', yTxt);
        }
    },
    oncanCheckTxtFocusleave: function(textfield, event, eOpts){
        //
        this.onFocusLeave(textfield);
        //
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        var grossweightCheckTxt = viewModel.get('objPkl.grossweightCheckTxt');
        var grossweightTxt = viewModel.get('objPkl.grossweightTxt');
        if(grossweightTxt == null || grossweightTxt == ''){
            viewModel.set('objPkl.grossweightTxt', grossweightCheckTxt);
        }
    },
    onwidthYdsCheckTxtFocusleave: function(textfield, event, eOpts){
        //
        this.onFocusLeave(textfield);
        //
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        var widthYdsCheckTxt = viewModel.get('objPkl.widthYdsCheckTxt');
        var widthYdsTxt = viewModel.get('objPkl.widthYdsTxt');
        if(widthYdsTxt == null || widthYdsTxt == ''){
            viewModel.set('objPkl.widthYdsTxt', widthYdsCheckTxt);
        }
    },
    onwidthMetCheckTxtFocusleave: function(textfield, event, eOpts){
        //
        this.onFocusLeave(textfield);
        //
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        var widthMetCheckTxt = viewModel.get('objPkl.widthMetCheckTxt');
        var widthMetTxt = viewModel.get('objPkl.widthMetTxt');
        if(widthMetTxt == null || widthMetTxt == ''){
            viewModel.set('objPkl.widthMetTxt', widthMetCheckTxt);
        }
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

        // me.down('#focusField').focus();

        var viewModel = this.getViewModel();
        var selectedDRecord = viewModel.get('selectedDRecord');

        var selectedPklRecord = viewModel.get('selectedPklRecord');
        if(selectedPklRecord != null){
            return;
        }

        viewModel.set('isPklTextfieldFocus', false);
        var lotnumber = viewModel.get('objPkl.lotnumberTxt');
        var packageid = viewModel.get('objPkl.packageidTxt');

        if( // nếu chưa đủ thông tin hoặc chưa chọn loại vải, return
            lotnumber == '' || packageid == '' ||
            lotnumber == null || packageid == null
        ){
            m.resetFormKeepWidth();
            Ext.defer(function () { me.down('#packageidTxt').focus(); }, 50);
            return;
        }else{ // tìm cây vải theo lot và package
            var skuid_link = selectedDRecord.get('skuid_link');
            var stockindid_link = selectedDRecord.get('id');
            // console.log(selectedDRecord);
            // console.log(lotnumber);
            // console.log(packageid);

            me.setMasked({
                xtype: 'loadmask',
                message: 'Đang tải'
            });

            var params = new Object();
            params.skuid_link = skuid_link;
            params.lotnumber = lotnumber;
            params.packageid = packageid;
            params.stockindid_link = stockindid_link;

            GSmartApp.Ajax.postJitin('/api/v1/stockin_pklist/getByLotAndPackageId', Ext.JSON.encode(params),
                function (success, response, options) {
                    // me.setLoading(false);
                    me.setMasked(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            if(response.data.length == 0){
                                // Ext.toast('Không tìm thấy cây vải có số lot và cây này', 2000);
                                // viewModel.set('objPkl.id', null);
                                // viewModel.set('objPkl.lotnumberTxt', lotnumber);
                                // viewModel.set('objPkl.packageidTxt', packageid);
                                m.resetFormKeepWidth();
                            }else{
                                // tìm thấy cây vải, set thông tin cho các trường
                                var responseObj = response.data[0];
                                // console.log(responseObj);
                                var objPkl = m.setDataObjPkl(responseObj);
                                viewModel.set('objPkl', objPkl);
                            }
                        }else{
                            // Ext.toast('Lỗi khi tìm cây vải: ' + response.message, 2000);
                        }
                        m.onFieldKeyUp();
                    } else {
                        var response = Ext.decode(response.responseText);
                        // Ext.toast('Lỗi khi tìm cây vải: ' + response.message, 2000);
                    }
            })        
        }
    },
    setDataObjPkl:function(objPkl){
        var viewModel = this.getViewModel();

        objPkl.lotnumberTxt = objPkl.lotnumber;
        objPkl.packageidTxt = objPkl.packageid;
        objPkl.mOriginTxt = objPkl.met_origin;
        objPkl.mTxt = objPkl.met_check;
        objPkl.yOriginTxt = objPkl.ydsorigin;
        objPkl.yTxt = objPkl.ydscheck;
        objPkl.grossweightTxt = objPkl.grossweight;
        objPkl.grossweightCheckTxt = objPkl.grossweight_check;
        objPkl.grossweightLbsTxt = objPkl.grossweight_lbs;
        objPkl.grossweightLbsCheckTxt = objPkl.grossweight_lbs_check;
        
        objPkl.widthMetTxt = objPkl.width_met == null ? '' : objPkl.width_met * 100;
        objPkl.widthYdsTxt = objPkl.width_yds == null ? '' : (objPkl.width_yds * 36).toFixed(2);
        
        //
        var widthMetCheckTxt = viewModel.get('objPkl.widthMetCheckTxt');
        var widthYdsCheckTxt = viewModel.get('objPkl.widthYdsCheckTxt');
        if(objPkl.width_met_check != null && objPkl.width_met_check != ''){
            objPkl.widthMetCheckTxt = objPkl.width_met_check == null ? '' : objPkl.width_met_check * 100;
        }else{
            objPkl.widthMetCheckTxt = widthMetCheckTxt;
        }
        if(objPkl.width_yds_check != null && objPkl.width_yds_check != ''){
            objPkl.widthYdsCheckTxt = objPkl.width_yds_check == null ? '' : (objPkl.width_yds_check * 36).toFixed(2);
        }else{
            objPkl.widthYdsCheckTxt = widthYdsCheckTxt;
        }

        //
        var pklRowTxt = viewModel.get('objPkl.pklRowTxt');
        var pklSpaceTxt = viewModel.get('objPkl.pklSpaceTxt');
        var pklFloorTxt = viewModel.get('objPkl.pklFloorTxt');
        if(objPkl.row != null && objPkl.row != ''){
            objPkl.pklRowTxt = objPkl.row;
        }else{
            objPkl.pklRowTxt = pklRowTxt;
        }
        if(objPkl.space != null && objPkl.space != ''){
            objPkl.pklSpaceTxt = objPkl.space;
        }else{
            objPkl.pklSpaceTxt = pklSpaceTxt;
        }
        if(objPkl.floor != null && objPkl.floor != ''){
            objPkl.pklFloorTxt = objPkl.floor;
        }else{
            objPkl.pklFloorTxt = pklFloorTxt;
        }
        return objPkl;
    },

    onFieldKeyUp: function( thisField, e, eOpts){
        var m = this;
        var viewModel = this.getViewModel();
        var me = this.getView();

        var mOriginTxt = viewModel.get('objPkl.mOriginTxt');
        var mTxt = viewModel.get('objPkl.mTxt');
        if(mOriginTxt != null && mOriginTxt != '' && mTxt != null && mTxt != ''){
            if(mTxt < mOriginTxt){
                me.down('#mTxt').setCls('redField');
                me.down('#mTxtIos').setCls('redField');
            }else{
                me.down('#mTxt').setCls('whiteField');
                me.down('#mTxtIos').setCls('whiteField');
            }
        }

        var yOriginTxt = viewModel.get('objPkl.yOriginTxt');
        var yTxt = viewModel.get('objPkl.yTxt');
        if(yOriginTxt != null && yOriginTxt != '' && yTxt != null && yTxt != ''){
            if(yTxt < yOriginTxt){
                me.down('#yTxt').setCls('redField');
                me.down('#yTxtIos').setCls('redField');
            }else{
                me.down('#yTxt').setCls('whiteField');
                me.down('#yTxtIos').setCls('whiteField');
            }
        }

        var grossweightTxt = viewModel.get('objPkl.grossweightTxt');
        var grossweightCheckTxt = viewModel.get('objPkl.grossweightCheckTxt');
        if(grossweightTxt != null && grossweightTxt != '' && grossweightCheckTxt != null && grossweightCheckTxt != ''){
            if(grossweightCheckTxt < grossweightTxt){
                me.down('#canCheckTxt').setCls('redField');
                me.down('#canCheckTxtIos').setCls('redField');
            }else{
                me.down('#canCheckTxt').setCls('whiteField');
                me.down('#canCheckTxtIos').setCls('whiteField');
            }
        }

        var grossweightLbsTxt = viewModel.get('objPkl.grossweightLbsTxt');
        var grossweightLbsCheckTxt = viewModel.get('objPkl.grossweightLbsCheckTxt');
        if(grossweightLbsTxt != null && grossweightLbsTxt != '' && grossweightLbsCheckTxt != null && grossweightLbsCheckTxt != ''){
            if(grossweightLbsCheckTxt < grossweightLbsTxt){
                me.down('#lbsCheckTxt').setCls('redField');
                me.down('#lbsCheckTxtIos').setCls('redField');
            }else{
                me.down('#lbsCheckTxt').setCls('whiteField');
                me.down('#lbsCheckTxtIos').setCls('whiteField');
            }
        }

        var widthMetTxt = viewModel.get('objPkl.widthMetTxt');
        var widthMetCheckTxt = viewModel.get('objPkl.widthMetCheckTxt');
        if(widthMetTxt != null && widthMetTxt != '' && widthMetCheckTxt != null && widthMetCheckTxt != ''){
            if(widthMetCheckTxt < widthMetTxt){
                me.down('#widthMetCheckTxt').setCls('redField');
                me.down('#widthMetCheckTxtIos').setCls('redField');
            }else{
                me.down('#widthMetCheckTxt').setCls('whiteField');
                me.down('#widthMetCheckTxtIos').setCls('whiteField');
            }
        }

        var widthYdsTxt = viewModel.get('objPkl.widthYdsTxt');
        var widthYdsCheckTxt = viewModel.get('objPkl.widthYdsCheckTxt');
        if(widthYdsTxt != null && widthYdsTxt != '' && widthYdsCheckTxt != null && widthYdsCheckTxt != ''){
            if(widthYdsCheckTxt < widthYdsTxt){
                me.down('#widthYdsCheckTxt').setCls('redField');
                me.down('#widthYdsCheckTxtIos').setCls('redField');
            }else{
                me.down('#widthYdsCheckTxt').setCls('whiteField');
                me.down('#widthYdsCheckTxtIos').setCls('whiteField');
            }
        }
    }
})