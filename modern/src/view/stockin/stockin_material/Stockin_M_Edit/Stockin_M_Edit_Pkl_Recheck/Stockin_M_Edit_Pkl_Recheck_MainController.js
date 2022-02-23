Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit_Pkl_Recheck_MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockin_M_Edit_Pkl_Recheck_MainController',
	init: function () {
		
	},
    control: {
        '#btnResetFormRecheck':{
            tap: 'onbtnResetFormRecheck'
        },
        '#btnCheckRecheck':{
            tap: 'onCheckRecheck'
        },
        '#Stockin_M_Edit_Pkl_Recheck':{
            // childtap: 'onItemPklRecheckTap',
            childtap: 'onItemPklRecheckTapDetail'
        },
        '#cbbox_pklRecheck_stockindId':{
            change: 'oncbbox_pklRecheck_stockindId_change'
        },
        '#cbbox_lotnumber_recheck':{
            // change: 'oncbbox_lotnumber_recheck_change',
            select: 'oncbbox_lotnumber_recheck_change',
        },
        '#btnThemMoiPklRecheck': {
            tap: 'onbtnThemMoiPklRecheck'
        }
    },
    // listen: {
    //     store: {
    //       'StockinLotStore': {
    //             'loadStore_byStockinDId_Done': 'onloadStore_byStockinDId_Done'
    //         }
    //     }
    // },
    // onloadStore_byStockinDId_Done: function(){
    //     Ext.Viewport.setMasked(false);
    // },
    onFocus: function(textfield, e, eOpts){
        //
        // this.setTooltip(textfield);
    },
    onFocusLeave: function(textfield, event, eOpts ){
        //
        // this.removeTooltip();
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
        if(placeholder == 'Dài kiểm (Y)'){
            oldValue = viewModel.get('objRecheck.ydscheck');
        }else 
        if(placeholder == 'Dài phiếu (Y)'){
            oldValue = viewModel.get('objRecheck.ydsorigin');
        }else 
        if(placeholder == 'Cân kiểm'){
            oldValue = viewModel.get('objRecheck.grossweight_check');
        }else 
        if(placeholder == 'Cân phiếu'){
            oldValue = viewModel.get('objRecheck.grossweight');
        }else 
        if(placeholder == 'Lbs kiểm'){
            oldValue = viewModel.get('objRecheck.grossweight_lbs_check');
        }else 
        if(placeholder == 'Lbs phiếu'){
            oldValue = viewModel.get('objRecheck.grossweight_lbs');
        }else 
        if(placeholder == 'Khổ kiểm (cm)'){
            oldValue = viewModel.get('objRecheck.width_met_check');
        }else 
        if(placeholder == 'Khổ phiếu (cm)'){
            oldValue = viewModel.get('objRecheck.width_met');
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
                        if(placeholder == 'Dài kiểm (M)'){
                            viewModel.set('objRecheck.met_check', selectValue);
                        }else 
                        if(placeholder == 'Dài phiếu (M)'){
                            viewModel.set('objRecheck.met_origin', selectValue);
                        }else 
                        if(placeholder == 'Dài kiểm (Y)'){
                            viewModel.set('objRecheck.ydscheck', selectValue);
                        }else 
                        if(placeholder == 'Dài phiếu (Y)'){
                            viewModel.set('objRecheck.ydsorigin', selectValue);
                        }else 
                        if(placeholder == 'Cân kiểm'){
                            viewModel.set('objRecheck.grossweight_check', selectValue);
                        }else 
                        if(placeholder == 'Cân phiếu'){
                            viewModel.set('objRecheck.grossweight', selectValue);
                        }else 
                        if(placeholder == 'Lbs kiểm'){
                            viewModel.set('objRecheck.grossweight_lbs_check', selectValue);
                        }else 
                        if(placeholder == 'Lbs phiếu'){
                            viewModel.set('objRecheck.grossweight_lbs', selectValue);
                        }else 
                        if(placeholder == 'Khổ kiểm (cm)'){
                            viewModel.set('objRecheck.width_met_check', selectValue);
                        }else 
                        if(placeholder == 'Khổ phiếu (cm)'){
                            viewModel.set('objRecheck.width_met', selectValue);
                        }
                        dialog.close();
                        setTimeout(function(){
                            viewModel.set('isStockin_ValueSelect_window_open', false);
                        }, 200);
                        
                    });
                }else{ // ios value chia het cho 100
                    // oldValue
                    // if(placeholder == 'Dài kiểm (M)'){
                    //     var mTxt = viewModel.get('objPkl.mTxt');
                    //     var mOriginTxt = viewModel.get('objPkl.mOriginTxt');
                    //     if(mOriginTxt == null || mOriginTxt == ''){
                    //         viewModel.set('objPkl.mOriginTxt', mTxt);
                    //     }
                    // }else if(placeholder == 'Dài kiểm (Y)'){
                    //     var yTxt = viewModel.get('objPkl.yTxt');
                    //     var yOriginTxt = viewModel.get('objPkl.yOriginTxt');
                    //     if(yOriginTxt == null || yOriginTxt == ''){
                    //         viewModel.set('objPkl.yOriginTxt', yTxt);
                    //     }
                    // }else if(placeholder == 'Khổ kiểm (cm)'){
                    //     var widthMetCheckTxt = viewModel.get('objPkl.widthMetCheckTxt');
                    //     var widthMetTxt = viewModel.get('objPkl.widthMetTxt');
                    //     if(widthMetTxt == null || widthMetTxt == ''){
                    //         viewModel.set('objPkl.widthMetTxt', widthMetCheckTxt);
                    //     }
                    // }
                }
            }else{ // ko phai ios
                // oldValue
                // if(placeholder == 'Dài kiểm (M)'){
                //     var mTxt = viewModel.get('objPkl.mTxt');
                //     var mOriginTxt = viewModel.get('objPkl.mOriginTxt');
                //     if(mOriginTxt == null || mOriginTxt == ''){
                //         viewModel.set('objPkl.mOriginTxt', mTxt);
                //     }
                // }else if(placeholder == 'Dài kiểm (Y)'){
                //     var yTxt = viewModel.get('objPkl.yTxt');
                //     var yOriginTxt = viewModel.get('objPkl.yOriginTxt');
                //     if(yOriginTxt == null || yOriginTxt == ''){
                //         viewModel.set('objPkl.yOriginTxt', yTxt);
                //     }
                // }else if(placeholder == 'Khổ kiểm (cm)'){
                //     var widthMetCheckTxt = viewModel.get('objPkl.widthMetCheckTxt');
                //     var widthMetTxt = viewModel.get('objPkl.widthMetTxt');
                //     if(widthMetTxt == null || widthMetTxt == ''){
                //         viewModel.set('objPkl.widthMetTxt', widthMetCheckTxt);
                //     }
                // }
            }
        }
        // console.log("Version " + Ext.os.version);
    },
    oncbbox_pklRecheck_stockindId_change: function(cbbox, newValue, oldValue, eOpts){// console.log('d recheck change');
        var me = this.getView();
        var viewModel = this.getViewModel();
        
        if(newValue != null && newValue != ''){
            var StockinPklRecheckStore = viewModel.getStore('StockinPklRecheckStore');
            // StockinPklRecheckStore.loadStore_byStockinDIdAndEqualStatus(newValue, 2);

            StockinPklRecheckStore.removeAll();
            viewModel.set('cbbox_lotnumber_value', null);
            me.down('#cbbox_lotnumber_recheck').setValue(null);

            // Ext.Viewport.setMasked({ xtype: 'loadmask' });
            var StockinLotStore = viewModel.getStore('StockinLotStore');
            StockinLotStore.loadStore_byStockinDId(newValue);

            viewModel.set('lot_stockindId', newValue);
            viewModel.set('pkl_stockindId', newValue);

            if(cbbox.getSelection() != null){
                viewModel.set('selectedDRecord', cbbox.getSelection());
            }
            
            // bỏ selectedRecord
            viewModel.set('selectedLotRecord', null);
            viewModel.set('selectedPklRecord', null);
            viewModel.set('selectedPklRecheckRecord', null);
        }
    },
    oncbbox_lotnumber_recheck_change: function(cbbox, newValue, oldValue, eOpts){
        var viewModel = this.getViewModel();
        newValue = newValue.get('lot_number');

        if(newValue != null && newValue != ''){ // console.log(newValue);
            var pklRecheck_stockindId = viewModel.get('pklRecheck_stockindId');
            // var selection = cbbox.getSelection();
            // var lot_number = selection.get('lot_number');
            var lot_number = newValue;

            var StockinPklRecheckStore = viewModel.getStore('StockinPklRecheckStore');
            StockinPklRecheckStore.loadStore_byStockinDIdAndEqualStatus(pklRecheck_stockindId, lot_number, 2);

            // if(cbbox.getSelection() != null){
                viewModel.set('cbbox_lotnumber_value', lot_number);
            // }

            // bỏ selectedRecord
            viewModel.set('selectedLotRecord', null);
            viewModel.set('selectedPklRecord', null);
            viewModel.set('selectedPklRecheckRecord', null);
        }
    },
    onbtnThemMoiPklRecheck: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var stockin = viewModel.get('stockin');
        var selectedDRecord = viewModel.get('selectedDRecord');
        var cbbox_lotnumber_value = viewModel.get('cbbox_lotnumber_value');

        if(selectedDRecord == null){
            Ext.toast('Bạn chưa chọn loại NPL', 2000);
            return;
        }
        if(cbbox_lotnumber_value == null){
            Ext.toast('Bạn chưa chọn số lot', 2000);
            return;
        }

        var objRecheck = new Object();
        objRecheck.lotnumber = cbbox_lotnumber_value;

        var dialog = Ext.create({
            xtype: 'dialog',
            // id: 'StockMenuWindow_Main_dialog',
            itemId: 'Stockin_M_Edit_Pkl_Recheck_Detail_dialog',
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
                xtype: 'Stockin_M_Edit_Pkl_Recheck_Detail',
                viewModel: {
                    data: {
                        stockin: stockin,
                        selectedDRecord: selectedDRecord,
                        selectedPklRecord: null,
                        objRecheck: objRecheck
                    }
                }
            }],
        });
        dialog.show();

        dialog.down('#Stockin_M_Edit_Pkl_Recheck_Detail').getController().on('reloadStore', function (objData) {
            m.reloadStore();
        });
    },
    onItemPklRecheckTapDetail: function(list, location, eOpts){
        // console.log(location);
        var record = location.record;

        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var stockin = viewModel.get('stockin');
        var selectedDRecord = viewModel.get('selectedDRecord');
        var cbbox_lotnumber_value = viewModel.get('cbbox_lotnumber_value');

        if(selectedDRecord == null){
            Ext.toast('Bạn chưa chọn loại NPL', 2000);
            return;
        }
        if(cbbox_lotnumber_value == null){
            Ext.toast('Bạn chưa chọn số lot', 2000);
            return;
        }

        var objRecheck = new Object();

        var dialog = Ext.create({
            xtype: 'dialog',
            // id: 'StockMenuWindow_Main_dialog',
            itemId: 'Stockin_M_Edit_Pkl_Recheck_Detail_dialog',
            title: 'Chi tiết cây vải',
            width: '90%',
            // height: '60%',
            zIndex: null,
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
                xtype: 'Stockin_M_Edit_Pkl_Recheck_Detail',
                viewModel: {
                    data: {
                        stockin: stockin,
                        selectedDRecord: selectedDRecord,
                        selectedPklRecord: record,
                        objRecheck: objRecheck
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

        dialog.down('#Stockin_M_Edit_Pkl_Recheck_Detail').getController().on('reloadStore', function (objData) {
            m.reloadStore();
        });
        dialog.down('#Stockin_M_Edit_Pkl_Recheck_Detail').getController().on('close', function (objData) {
            dialog.close();
        });
    },

    onmaPklRecheckFilterKeyup: function (){
        var grid = this.getView().down('#Stockin_M_Edit_Pkl_Recheck'),
            // Access the field using its "reference" property name.
            filterField = this.getView().down('#maPklRecheckFilter'),
            store = grid.store,
            filters = grid.store.getFilters();

        var viewModel = this.getViewModel();
        grid.getSelectable().deselectAll();
        viewModel.set('lotnumberTxtRecheck', '');
        this.resetFormRecheck();

        var maPklFilter = viewModel.get('maPklRecheckFilter') == null ? '' : viewModel.get('maPklRecheckFilter').toLowerCase();
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
    resetFormRecheck: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var lotnumber = viewModel.get('objRecheck.lotnumber');
        viewModel.set('objRecheck', null);
        viewModel.set('objRecheck.lotnumber', lotnumber);
    },
    onItemPklRecheckTap: function(list, location, eOpts ){
        var m = this;
        var viewModel = this.getViewModel();
        var selectedPklRecheckRecord = viewModel.get('selectedPklRecheckRecord');
        var tappedRecord = location.record;

        if(selectedPklRecheckRecord == null){
            var record = location.record;
            viewModel.set('selectedPklRecheckRecord', record);
    
            // copy obj, để thay đổi thông tin ko ảnh hưởng đến view model
            // khi click lên record ở grid sẽ lấy lại giá trị cũ
            var newObjData = JSON.parse(JSON.stringify(record.data));
            // chuyển khổ m -> cm
            newObjData.width_met = newObjData.width_met * 100;
            newObjData.width_met_check = newObjData.width_met_check * 100;
            viewModel.set('objRecheck', newObjData);
        } else{
            var selectable = list.getSelectable();
            var selectRecord = selectable.getSelectedRecord();

            if(selectRecord == tappedRecord){
                // nếu ấn vào 1 record đã chọn thì bỏ chọn record này và set viewModel selectedPklRecheckRecord thành null
                // bỏ highlight trên giao diện grid
                setTimeout(function(){
                    m.onGridDeselect();
                }, 50);

                viewModel.set('selectedPklRecheckRecord', null);
                viewModel.set('objRecheck', null);
            }else{
                // nếu ấn vào 1 record khác với record đã chọn, bỏ chionj record cũ và chọn record mới
                // set viewModel selectedPklRecord thành record mới
                var record = location.record;
                viewModel.set('selectedPklRecheckRecord',record);

                // copy obj, để thay đổi thông tin ko ảnh hưởng đến view model
                // khi click lên record ở grid sẽ lấy lại giá trị cũ
                var newObjData = JSON.parse(JSON.stringify(record.data));
                // chuyển khổ m -> cm
                newObjData.width_met = newObjData.width_met * 100;
                newObjData.width_met_check = newObjData.width_met_check * 100;
                viewModel.set('objRecheck', newObjData);
            }
        }
    },
    onGridDeselect: function(){
        var grid = this.getView().down('#Stockin_M_Edit_Pkl_Recheck');
        var selectable = grid.getSelectable();
        var selectRecord = selectable.getSelectedRecord();
        selectable.deselectAll();
    },
    onCheckRecheck: function(){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        // var selectedDRecord = viewModel.get('selectedDRecord');
        var selectedPklRecheckRecord = viewModel.get('selectedPklRecheckRecord');
        var objRecheck = viewModel.get('objRecheck');

        // check combo đã chọn chưa
        var pklRecheck_stockindId = viewModel.get('pklRecheck_stockindId');
        if(pklRecheck_stockindId == '' || pklRecheck_stockindId == null){
            Ext.toast('Cần chọn loại vải', 2000);
            return;
        }

        if(objRecheck.id == null){
            Ext.toast('Không tìm thấy cây vải có số lot và cây này', 2000);
            return;
        }

        // check textfield
        if(stockin.unitid_link == 3){
            if(objRecheck.packageid == '' || objRecheck.ydscheck == ''){
                Ext.toast('Thiếu thông tin Số cây hoặc độ dài', 2000);
                return;
            }
            if(isNaN(objRecheck.ydscheck)){
                Ext.toast('Số Y phải là số', 2000);
                return;
            }
        }
        if(stockin.unitid_link == 1){
            if(objRecheck.packageid == '' || objRecheck.met_check == ''){
                Ext.toast('Thiếu thông tin Số cây hoặc độ dài', 2000);
                return;
            }
            if(isNaN(objRecheck.met_check)){
                Ext.toast('Số M phải là số', 2000);
                return;
            }
        }
        
        // tạo obj
        if(objRecheck.ydscheck == null || objRecheck.ydscheck == '') objRecheck.ydscheck = 0;
        if(objRecheck.met_check == null || objRecheck.met_check == '') objRecheck.met_check = 0;
        if(objRecheck.ydsorigin == null || objRecheck.ydsorigin == '' || objRecheck.ydsorigin == 0) objRecheck.ydsorigin = objRecheck.ydscheck;
        if(objRecheck.met_origin == null || objRecheck.met_origin == '' || objRecheck.met_origin == 0) objRecheck.met_origin = objRecheck.met_check;
        if(objRecheck.sample_check == null || objRecheck.sample_check == '') objRecheck.sample_check = 0;
        if(objRecheck.grossweight_check == null || objRecheck.grossweight_check == '') objRecheck.grossweight_check = 0;
        if(objRecheck.grossweight == null || objRecheck.grossweight == '' || objRecheck.grossweight == 0) objRecheck.grossweight = objRecheck.grossweight_check;
        if(objRecheck.grossweight_lbs_check == null || objRecheck.grossweight_lbs_check == '') objRecheck.grossweight_lbs_check = 0;
        if(objRecheck.grossweight_lbs == null || objRecheck.grossweight_lbs == '' || objRecheck.grossweight_lbs == 0) objRecheck.grossweight_lbs = objRecheck.grossweight_lbs_check;
        if(objRecheck.width_met_check == null || objRecheck.width_met_check == '') objRecheck.width_met_check = 0;
        if(objRecheck.width_met == null || objRecheck.width_met == '' || objRecheck.width_met == 0) widthMetTxt = objRecheck.width_met_check;

        if(stockin.unitid_link == 1 || stockin.unitid_link == 4 || stockin.unitid_link == 5){
            // met
            objRecheck.met_check = parseFloat(objRecheck.met_check);
            objRecheck.ydscheck = objRecheck.met_check / 0.9144;
            objRecheck.met_origin = parseFloat(objRecheck.met_origin);
            objRecheck.ydsorigin = objRecheck.met_origin / 0.9144;
        }
        if(stockin.unitid_link == 3){
            // yrd
            objRecheck.ydscheck = parseFloat(objRecheck.ydscheck);
            objRecheck.met_check = objRecheck.ydscheck * 0.9144;
            objRecheck.ydsorigin = parseFloat(objRecheck.ydsorigin);
            objRecheck.met_origin = objRecheck.ydsorigin * 0.9144;
        }
        if(stockin.unitid_link == 4 || stockin.unitid_link == 1 || stockin.unitid_link == 3){
            // kg
            objRecheck.grossweight_check = parseFloat(objRecheck.grossweight_check);
            objRecheck.grossweight_lbs_check = objRecheck.grossweight_check * 2.20462;
            objRecheck.grossweight = parseFloat(objRecheck.grossweight);
            objRecheck.grossweight_lbs = objRecheck.grossweight * 2.20462;
        }
        if(stockin.unitid_link == 5){
            // lbs
            objRecheck.grossweight_lbs_check = parseFloat(objRecheck.grossweight_lbs_check);
            objRecheck.grossweight_check = objRecheck.grossweight_lbs_check / 2.20462;
            objRecheck.grossweight_lbs = parseFloat(objRecheck.grossweight_lbs);
            objRecheck.grossweight = objRecheck.grossweight_lbs / 2.20462;
        }
        

        objRecheck.met_check = parseFloat(objRecheck.met_check);
        objRecheck.ydscheck = parseFloat(objRecheck.ydscheck);
        objRecheck.met_origin = parseFloat(objRecheck.met_origin);
        objRecheck.ydsorigin = parseFloat(objRecheck.ydsorigin);

        objRecheck.grossweight_lbs_check = parseFloat(objRecheck.grossweight_lbs_check);
        objRecheck.grossweight_check = parseFloat(objRecheck.grossweight_check);
        objRecheck.grossweight_lbs = parseFloat(objRecheck.grossweight_lbs);
        objRecheck.grossweight = parseFloat(objRecheck.grossweight);

        objRecheck.width_met_check = parseFloat(objRecheck.width_met_check / 100);
        objRecheck.width_yds_check = parseFloat(objRecheck.width_met_check / 0.9144);
        objRecheck.width_met = parseFloat(objRecheck.width_met / 100);
        objRecheck.width_yds = parseFloat(objRecheck.width_met / 0.9144);

        //
        // console.log(objRecheck);

        me.setMasked({
            xtype: 'loadmask',
            message: 'Đang lưu'
        })

        var params = new Object();
        params.data = objRecheck;

        GSmartApp.Ajax.postJitin('/api/v1/stockin_pklist/update', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                me.setMasked(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        if(response.message == 'Đã tồn tại cây vải khác có lot và packageid này'){
                            Ext.toast('Lưu thất bại: ' + response.message, 2000);
                        }else{
                            Ext.toast('Lưu thành công', 2000);
                            var data = response.data;
                            
                            // bỏ highlight
                            var grid = me.down('#Stockin_M_Edit_Pkl_Recheck');
                            grid.getSelectable().deselectAll();
                            viewModel.set('selectedPklRecheckRecord', null);

                            m.reloadStore();
                            m.resetFormRecheck();
                            m.getView().down('#packageidTxtRecheck').focus();
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
    onbtnResetFormRecheck: function(){
        var m = this;
        var viewModel = this.getViewModel();
        viewModel.set('lotnumberTxtRecheck', '');
        m.resetFormRecheck();
    },
    onlotnumberTxtRecheckType: function(field, newValue, oldValue, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        viewModel.set('objRecheck.lotnumber', newValue.toUpperCase());
        field.setValue(newValue.toUpperCase());
    },
    onlotnumberTxtAndpackageidTxtRecheckleave: function(textfield, event, eOpts){
        //
        this.onFocusLeave(textfield);
        //
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var selectedDRecord = viewModel.get('selectedDRecord');
        var selectedPklRecheckRecord = viewModel.get('selectedPklRecheckRecord');

        var lotnumber = viewModel.get('objRecheck.lotnumber');
        var packageid = viewModel.get('objRecheck.packageid');

        // nếu đang chọn 1 record thì edit, ko tìm trên db, return
        // if(selectedPklRecheckRecord != null){ console.log('here');
        //     return;
        // }

        if( // nếu chưa đủ thông tin hoặc chưa chọn loại vải, return
            lotnumber == '' || packageid == '' ||
            lotnumber == null || packageid == null ||
            selectedDRecord == null
        ){
            viewModel.set('objRecheck', null);
            viewModel.set('objRecheck.lotnumber', lotnumber);
            viewModel.set('objRecheck.packageid', packageid);
            return;
        }else{ // tìm cây vải theo lot và package
            var stockindid_link = selectedDRecord.get('id');

            me.setMasked({
                xtype: 'loadmask',
                message: 'Đang tải'
            });

            var params = new Object();
            params.stockindid_link = stockindid_link;
            params.lotnumber = lotnumber;
            params.packageid = packageid;

            GSmartApp.Ajax.postJitin('/api/v1/stockin_pklist/getByStockinDLotAndPackageId', Ext.JSON.encode(params),
                function (success, response, options) {
                    // me.setLoading(false);
                    me.setMasked(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            if(response.data.length == 0){
                                Ext.toast('Không tìm thấy cây vải có số lot và cây này', 2000);
                                viewModel.set('objRecheck', null);
                                viewModel.set('objRecheck.lotnumber', lotnumber);
                                viewModel.set('objRecheck.packageid', packageid);

                            }else{
                                // tìm thấy cây vải, set thông tin cho các trường
                                var responseObj = response.data[0];
                                // chuyển khổ m -> cm
                                responseObj.width_met = responseObj.width_met * 100;
                                responseObj.width_met_check = responseObj.width_met_check * 100;
                                viewModel.set('objRecheck', responseObj);

                                // bỏ highlight
                                var grid = me.down('#Stockin_M_Edit_Pkl_Recheck');
                                grid.getSelectable().deselectAll();
                                // highlight nếu cây vải có trong danh sách 10%
                                var storeItems = viewModel.getStore('StockinPklRecheckStore').getData().items;
                                for(var i=0; i<storeItems.length; i++){
                                    var item = storeItems[i];
                                    if(item.get('id') == responseObj.id){
                                        grid.getSelectable().select(item);
                                        viewModel.set('selectedPklRecheckRecord', item);
                                        // console.log(item);
                                    }
                                }
                                //
                                // console.log(responseObj);
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

    reloadStore: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockinid_link = viewModel.get('stockin.id');
        var pklRecheck_stockindId = viewModel.get('pkl_stockindId');
        var selectedPklRecheckRecord = viewModel.get('selectedPklRecheckRecord');

        var cbbox_lotnumber_recheck = me.down('#cbbox_lotnumber_recheck');
        var selection = cbbox_lotnumber_recheck.getSelection();
        var lot_number = viewModel.get('cbbox_lotnumber_value');
        // var lot_number = null;
        // if(selection != null){
        //     lot_number = selection.get('lot_number');
        // }

        var StockinPklRecheckStore = viewModel.getStore('StockinPklRecheckStore');
        StockinPklRecheckStore.loadStore_byStockinDIdAndEqualStatus_async(pklRecheck_stockindId, lot_number, 2);
        StockinPklRecheckStore.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    // this.fireEvent('logout');
                } else {
                    if(selectedPklRecheckRecord != null){
                        var stockinpklid_link = selectedPklRecheckRecord.get('id');
                        var storeItems = StockinPklRecheckStore.getData().items;
                        for(var i=0; i<storeItems.length; i++){
                            var item = storeItems[i];
                            if(item.get('id') == stockinpklid_link){
                                var grid = m.getView().down('#Stockin_M_Edit_Pkl_Recheck');
                                grid.getSelectable().select(item);
                                viewModel.set('selectedPklRecheckRecord', item);
                            }
                        }
                    }
                }
            }
        });
    }
})