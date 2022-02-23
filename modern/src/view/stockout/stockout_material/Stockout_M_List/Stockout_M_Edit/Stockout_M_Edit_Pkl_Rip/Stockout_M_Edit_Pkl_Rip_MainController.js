Ext.define('GSmartApp.view.stockout.stockout_material.stockout_m_list.stockout_m_edit.stockout_m_edit_pkl_rip.Stockout_M_Edit_Pkl_Rip_MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockout_M_Edit_Pkl_Rip_MainController',
	init: function () {
		
	},
    control: {
        '#btnCheckRip':{
            tap: 'onCheckRip'
        },
        '#btnThemMoiPklRip': {
            tap: 'onbtnThemMoiPklRip'
        },
        '#Stockout_M_Edit_Pkl_Rip':{
            // childtap: 'onItemPklRipTap',
            childtap: 'onItemPklRipTapDetail'
        },
        '#cbbox_pklRip_stockoutdId':{
            change: 'oncbbox_pklRip_stockoutdId_change'
        }
    },
    onFocus: function(textfield, e, eOpts){
        //
        this.setTooltip(textfield);
    },
    onFocusLeave: function(textfield, event, eOpts ){
        //
        this.removeTooltip();
        //
        // this.showSelectValueWindow(textfield, event);
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
            oldValue = viewModel.get('objRecheck.met_check');
        }else 
        if(placeholder == 'Dài phiếu (M)'){
            oldValue = viewModel.get('objRecheck.met_origin');
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

                    // var Stockin_ValueSelect_window = Ext.getCmp("Stockin_ValueSelect_window");
                    // if(Stockin_ValueSelect_window) {
                    //     event.stopEvent();
                    //     me.focus(false);
                    //     return;
                    // }
                    var isStockin_ValueSelect_window_open = viewModel.get('isStockin_ValueSelect_window_open');
                    // console.log(isStockin_ValueSelect_window_open);
                    if(isStockin_ValueSelect_window_open){
                        return;
                    }
                    viewModel.set('isStockin_ValueSelect_window_open', true);
    
                    // create window
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
                        // if(placeholder == 'Dài kiểm (M)'){
                        //     viewModel.set('objRecheck.met_check', selectValue);
                        // }else 
                        // if(placeholder == 'Dài phiếu (M)'){
                        //     viewModel.set('objRecheck.met_origin', selectValue);
                        // }
                        dialog.close();
                        setTimeout(function(){
                            viewModel.set('isStockin_ValueSelect_window_open', false);
                        }, 200);
                        
                    });
                }else{ // ios value chia het cho 100
                    
                }
            }else{ // ko phai ios
                
            }
        }
        // console.log("Version " + Ext.os.version);
    },
    oncbbox_pklRip_stockoutdId_change: function(cbbox, newValue, oldValue, eOpts){
        var viewModel = this.getViewModel();
        var pklRip_stockoutdId = viewModel.get('pklRip_stockoutdId');
        if(newValue != null && newValue != ''){
            var stockout_pklist_rip = viewModel.getStore('stockout_pklist_rip');
            stockout_pklist_rip.loadstore_ByStockoutDId_Rip(newValue);
            
            viewModel.set('pkl_stockoutdId', newValue);

            if(cbbox.getSelection() != null){
                viewModel.set('selectedDRecord', cbbox.getSelection());
            }
        }
    },

    onbtnThemMoiPklRip: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var stockout = viewModel.get('stockout');
        var pklRip_stockoutdId = viewModel.get('pklRip_stockoutdId');
        var selectedDRecord = viewModel.get('selectedDRecord');

        if(pklRip_stockoutdId == null){
            Ext.toast('Bạn chưa chọn loại NPL', 2000);
            return;
        }
        
        var objPkl = new Object();
        // objPkl.lotnumberTxt = cbbox_lotnumber_value;

        var dialog = Ext.create({
            xtype: 'dialog',
            // id: 'StockMenuWindow_Main_dialog',
            itemId: 'Stockout_M_Edit_Pkl_Rip_Detail_dialog',
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
                xtype: 'Stockout_M_Edit_Pkl_Rip_Detail',
                viewModel: {
                    data: {
                        stockout: stockout,
                        pklRip_stockoutdId: pklRip_stockoutdId,
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

        dialog.down('#Stockout_M_Edit_Pkl_Rip_Detail').getController().on('reloadStore', function (objData) {
            m.reloadStore();
        });
    },
    onItemPklRipTapDetail: function(list, location, eOpts){
        console.log(location);
        var record = location.record;

        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var stockout = viewModel.get('stockout');
        var pklRip_stockoutdId = viewModel.get('pklRip_stockoutdId');
        var selectedDRecord = viewModel.get('selectedDRecord');

        if(pklRip_stockoutdId == null){
            Ext.toast('Bạn chưa chọn loại NPL', 2000);
            return;
        }
        
        var objPkl = new Object();
        // objPkl.lotnumberTxt = cbbox_lotnumber_value;

        var dialog = Ext.create({
            xtype: 'dialog',
            // id: 'StockMenuWindow_Main_dialog',
            itemId: 'Stockout_M_Edit_Pkl_Rip_Detail_dialog',
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
                xtype: 'Stockout_M_Edit_Pkl_Rip_Detail',
                viewModel: {
                    data: {
                        stockout: stockout,
                        pklRip_stockoutdId: pklRip_stockoutdId,
                        selectedDRecord: selectedDRecord,
                        selectedPklRecord: record,
                        objPkl: objPkl,
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

        dialog.down('#Stockout_M_Edit_Pkl_Rip_Detail').getController().on('reloadStore', function (objData) {
            m.reloadStore();
        });
        dialog.down('#Stockout_M_Edit_Pkl_Rip_Detail').getController().on('close', function (objData) {
            dialog.close();
        });

    },

    onmaPklRipFilterKeyup: function (){
        var grid = this.getView().down('#Stockout_M_Edit_Pkl_Rip'),
            // Access the field using its "reference" property name.
            filterField = this.getView().down('#maPklRipFilter'),
            store = grid.store,
            filters = grid.store.getFilters();

        var viewModel = this.getViewModel();
        grid.getSelectable().deselectAll();
        viewModel.set('lotnumberTxtRip', '');
        this.resetFormRip();

        var maPklFilter = viewModel.get('maPklRipFilter') == null ? '' : viewModel.get('maPklRipFilter').toLowerCase();
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
    resetFormRip: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var lotnumber = viewModel.get('objRip.lotnumber');
        viewModel.set('objRip', null);
        viewModel.set('objRip.lotnumber', lotnumber);
    },
    onItemPklRipTap: function(list, location, eOpts ){
        var m = this;
        var viewModel = this.getViewModel();

        var record = location.record;
        viewModel.set('selectedPklRipRecord', record);

        // objRip: lưu thông tin của các trường
        // id, lotnumber, packageid, met_check, ydscheck (các trường của stockout pkl)
        // met_remain, yds_remain (trường để update warehouse)
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

        // console.log(record);
        // console.log(objRip);
    },
    onCheckRip: function(){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');
        var selectedPklRipRecord = viewModel.get('selectedPklRipRecord');
        var objRip = viewModel.get('objRip');
        // objRip: lưu thông tin của các trường
        // id, lotnumber, packageid, met_check, ydscheck (các trường của stockout pkl)
        // met_remain, yds_remain (trường để update warehouse)

        // check combo đã chọn chưa
        var pklRip_stockoutdId = viewModel.get('pklRip_stockoutdId');
        if(pklRip_stockoutdId == '' || pklRip_stockoutdId == null){
            Ext.toast('Cần chọn loại vải', 3000);
            return;
        }

        if(objRip.id == null){
            Ext.toast('Không tìm thấy cây vải có số lot và cây này', 3000);
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
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.toast('Lưu thành công', 3000);
                        // bỏ highlight
                        var grid = me.down('#Stockout_M_Edit_Pkl_Rip');
                        grid.getSelectable().deselectAll();
                        viewModel.set('selectedPklRipRecord', null);

                        m.reloadStore();
                        m.resetFormRip();
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
    onbtnResetFormRip: function(){
        var m = this;
        var viewModel = this.getViewModel();
        viewModel.set('lotnumberTxtRip', '');
        m.resetFormRip();
    },
    onlotnumberTxtRipType: function(field, newValue, oldValue, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        viewModel.set('objRip.lotnumber', newValue.toUpperCase());
        field.setValue(newValue.toUpperCase());
    },
    onlotnumberTxtAndpackageidTxtRipleave: function(textfield, event, eOpts){
        //
        this.onFocusLeave(textfield);
        //
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var selectedDRecord = viewModel.get('selectedDRecord');
        var selectedPklRipRecord = viewModel.get('selectedPklRipRecord');

        var lotnumber = viewModel.get('objRip.lotnumber');
        var packageid = viewModel.get('objRip.packageid');

        // nếu đang chọn 1 record thì edit, ko tìm trên db, return
        if(selectedPklRipRecord != null){
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
                                Ext.toast('Không tìm thấy cây vải có số lot và cây này', 3000);
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

                                // bỏ highlight
                                var grid = me.down('#Stockout_M_Edit_Pkl_Rip');
                                grid.getSelectable().deselectAll();
                                // highlight nếu cây vải có trong danh sách 10%
                                var storeItems = viewModel.getStore('stockout_pklist_rip').getData().items;
                                for(var i=0; i<storeItems.length; i++){
                                    var item = storeItems[i];
                                    if(item.get('id') == responseObj.id){
                                        grid.getSelectable().select(item);
                                        viewModel.set('selectedPklRipRecord', item);
                                        // console.log(item);
                                    }
                                }
                                //
                                // console.log(responseObj);
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
                    Ext.toast('Giá trị > tổng số xé và số còn', 3000);
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
                    Ext.toast('Giá trị > tổng số xé và số còn', 3000);
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
                    Ext.toast('Giá trị > tổng số xé và số còn', 3000);
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
                    Ext.toast('Giá trị > tổng số xé và số còn', 3000);
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
        var stockout_pklist_rip = viewModel.getStore('stockout_pklist_rip');
        var storeData = stockout_pklist_rip.getData().items;
        
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

    reloadStore: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockoutid_link = viewModel.get('stockout.id');
        var pklRip_stockoutdId = viewModel.get('pklRip_stockoutdId');
        var selectedPklRipRecord = viewModel.get('selectedPklRipRecord');

        var stockout_pklist_rip = viewModel.getStore('stockout_pklist_rip');
        stockout_pklist_rip.loadstore_ByStockoutDId_Rip_async(pklRip_stockoutdId);
        stockout_pklist_rip.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    // this.fireEvent('logout');
                } else {
                    if(selectedPklRipRecord != null){
                        var stockoutpklid_link = selectedPklRipRecord.get('id');
                        var storeItems = stockout_pklist_rip.getData().items;
                        for(var i=0; i<storeItems.length; i++){
                            var item = storeItems[i];
                            if(item.get('id') == stockoutpklid_link){
                                var grid = m.getView().down('#Stockout_M_Edit_Pkl_Rip');
                                grid.getSelectable().select(item);
                                viewModel.set('selectedPklRipRecord', item);
                            }
                        }
                    }
                }
            }
        });
    }
})