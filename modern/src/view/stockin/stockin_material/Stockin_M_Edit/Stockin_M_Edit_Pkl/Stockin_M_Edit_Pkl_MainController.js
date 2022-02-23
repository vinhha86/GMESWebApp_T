Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit_Pkl_MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockin_M_Edit_Pkl_MainController',
    channelPrint: { cmd: null, dta: null },
	init: function () {
		
	},
    control: {
        '#btnResetForm':{
            tap: 'onbtnResetForm'
        },
        '#btnCheck':{
            tap: 'onCheck'
        },
        '#btnPrintPkl':{
            tap: 'onPrintPkl'
        },
        '#btnDeletePkl':{
            tap: 'onDeletePkl'
        },
        '#Stockin_M_Edit_Pkl':{
            // childtap: 'onItemPklTap',
            childtap: 'onItemPklDetail'
        },
        '#cbbox_pkl_stockindId':{
            change: 'oncbbox_pkl_stockindId_change',
        },
        '#cbbox_lotnumber':{
            // change: 'oncbbox_lotnumber_change',
            select: 'oncbbox_lotnumber_change',
        },
        '#btnThemMoiPkl': {
            tap: 'onbtnThemMoiPkl'
        },
        '#btnTestfield': {
            tap: 'onbtnTestfield'
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
    onbtnTestfield: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var testfield = me.down('#testfield');
        var testfieldValue = viewModel.get('testfieldValue');
        console.log(testfield);
        console.log(testfieldValue);
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
            }
        }
        // console.log("Version " + Ext.os.version);
    },
    oncbbox_pkl_stockindId_change: function(cbbox, newValue, oldValue, eOpts){
        var me = this.getView();
        var viewModel = this.getViewModel();

        if(newValue != null && newValue != ''){
            var StockinPklStore = viewModel.getStore('StockinPklStore');
            // StockinPklStore.loadStore_byStockinDIdAndGreaterThanStatus(newValue, -1);
            StockinPklStore.removeAll();
            viewModel.set('cbbox_lotnumber_value', null);
            me.down('#cbbox_lotnumber').setValue(null);

            // Ext.Viewport.setMasked({ xtype: 'loadmask' });
            var StockinLotStore = viewModel.getStore('StockinLotStore');
            StockinLotStore.loadStore_byStockinDId(newValue);

            viewModel.set('lot_stockindId', newValue);
            viewModel.set('pklRecheck_stockindId', newValue);

            if(cbbox.getSelection() != null){
                viewModel.set('selectedDRecord', cbbox.getSelection());
            }

            // bỏ selectedRecord
            viewModel.set('selectedLotRecord', null);
            viewModel.set('selectedPklRecord', null);
            viewModel.set('selectedPklRecheckRecord', null);
        }
    },
    oncbbox_lotnumber_change: function(cbbox, newValue, oldValue, eOpts){
        var viewModel = this.getViewModel();
        newValue = newValue.get('lot_number');

        if(newValue != null && newValue != ''){
            var pkl_stockindId = viewModel.get('pkl_stockindId');
            // var selection = cbbox.getSelection();
            // var lot_number = selection.get('lot_number');
            var lot_number = newValue;

            var StockinPklStore = viewModel.getStore('StockinPklStore');
            StockinPklStore.loadStore_byStockinDIdAndGreaterThanStatus(pkl_stockindId, lot_number, -1);

            // if(cbbox.getSelection() != null){
                viewModel.set('cbbox_lotnumber_value', lot_number);
            // }

            // bỏ selectedRecord
            viewModel.set('selectedLotRecord', null);
            viewModel.set('selectedPklRecord', null);
            viewModel.set('selectedPklRecheckRecord', null);
        }
    },
    onbtnThemMoiPkl: function(){
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

        var objPkl = new Object();
        objPkl.lotnumberTxt = cbbox_lotnumber_value;

        var dialog = Ext.create({
            xtype: 'dialog',
            // id: 'StockMenuWindow_Main_dialog',
            itemId: 'Stockin_M_Edit_Pkl_Detail_dialog',
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
                xtype: 'Stockin_M_Edit_Pkl_Detail',
                viewModel: {
                    data: {
                        stockin: stockin,
                        selectedDRecord: selectedDRecord,
                        selectedPklRecord: null,
                        objPkl: objPkl
                    }
                }
            }],
        });
        dialog.show();

        dialog.down('#Stockin_M_Edit_Pkl_Detail').getController().on('reloadStore', function (objData) {
            m.reloadStore();
        });
    },
    onItemPklDetail: function(list, location, eOpts){
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

        var objPkl = new Object();
        objPkl.lotnumberTxt = cbbox_lotnumber_value;

        var dialog = Ext.create({
            xtype: 'dialog',
            // id: 'StockMenuWindow_Main_dialog',
            itemId: 'Stockin_M_Edit_Pkl_Detail_dialog',
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
                xtype: 'Stockin_M_Edit_Pkl_Detail',
                viewModel: {
                    data: {
                        stockin: stockin,
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

        dialog.down('#Stockin_M_Edit_Pkl_Detail').getController().on('reloadStore', function (objData) {
            m.reloadStore();
        });
        dialog.down('#Stockin_M_Edit_Pkl_Detail').getController().on('close', function (objData) {
            dialog.close();
        });
    },
    onmaPklFilterKeyup: function (){
        var grid = this.getView().down('#Stockin_M_Edit_Pkl'),
            // Access the field using its "reference" property name.
            filterField = this.getView().down('#maPklFilter'),
            store = grid.store,
            filters = grid.store.getFilters();

        var viewModel = this.getViewModel();
        grid.getSelectable().deselectAll();
        viewModel.set('selectedPklRecord', null);
        viewModel.set('objPkl.lotnumberTxt', '');
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
        var myview = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        
        Ext.Viewport.setMasked(false);

        // viewModel.set('objPkl.lotnumberTxt', '');
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
        viewModel.set('objPkl.widthYdsCheckTxt', '');
        viewModel.set('objPkl.widthYdsTxt', '');
        viewModel.set('objPkl.widthMetCheckTxt', '');
        viewModel.set('objPkl.widthMetTxt', '');

        // viewModel.set('pklSpaceTxt', null);
        // viewModel.set('pklFloorTxt', null);
        myview.down('#packageidTxt').focus();

    },
    onItemPklTap: function(list, location, eOpts ){
        var m = this;
        var viewModel = this.getViewModel();
        var selectedPklRecord = viewModel.get('selectedPklRecord');
        var tappedRecord = location.record;

        if(selectedPklRecord == null){
            var record = location.record;
            viewModel.set('selectedPklRecord',record);

            // console.log(record);
            
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
    
            // set khoang info cho pkl
            viewModel.set('objPkl.pklFloorTxt', record.get('floor'));
            viewModel.set('objPkl.pklSpaceTxt', record.get('space'));
            viewModel.set('objPkl.pklRowTxt', record.get('row'));
        }else{
            var selectable = list.getSelectable();
            var selectRecord = selectable.getSelectedRecord();

            if(selectRecord == tappedRecord){
                // nếu ấn vào 1 record đã chọn thì bỏ chọn record này và set viewModel selectedPklRecord thành null
                // bỏ highlight trên giao diện grid
                setTimeout(function(){
                    m.onGridDeselect();
                }, 50);

                viewModel.set('selectedPklRecord', null);

                viewModel.set('objPkl.lotnumberTxt', null);
                viewModel.set('objPkl.packageidTxt', null);
                viewModel.set('objPkl.yTxt', null);
                viewModel.set('objPkl.mTxt', null);
                viewModel.set('objPkl.yOriginTxt', null);
                viewModel.set('objPkl.mOriginTxt', null);
                viewModel.set('objPkl.colorTxt', null);
                viewModel.set('objPkl.grossweightTxt', null);
                viewModel.set('objPkl.grossweightCheckTxt', null);
                viewModel.set('objPkl.grossweightLbsTxt', null);
                viewModel.set('objPkl.grossweightLbsCheckTxt', null);
                viewModel.set('objPkl.sampleCheckTxt', null);
                viewModel.set('objPkl.widthMetCheckTxt', null); // m -> cm
                viewModel.set('objPkl.widthMetTxt', null); // m -> cm
        
                // set khoang info cho pkl
                viewModel.set('objPkl.pklFloorTxt', null);
                viewModel.set('objPkl.pklSpaceTxt', null);
                viewModel.set('objPkl.pklRowTxt', null);

            }else{
                // nếu ấn vào 1 record khác với record đã chọn, bỏ chionj record cũ và chọn record mới
                // set viewModel selectedPklRecord thành record mới
                var record = location.record;
                viewModel.set('selectedPklRecord',record);
                
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
        
                // set khoang info cho pkl
                viewModel.set('objPkl.pklFloorTxt', record.get('floor'));
                viewModel.set('objPkl.pklSpaceTxt', record.get('space'));
                viewModel.set('objPkl.pklRowTxt', record.get('row'));
            }
        }
    },
    onGridDeselect: function(){
        var grid = this.getView().down('#Stockin_M_Edit_Pkl');
        var selectable = grid.getSelectable();
        var selectRecord = selectable.getSelectedRecord();
        selectable.deselectAll();
    },
    onPrintPkl: function () {
        console.log('onPrintPkl clicked');
        // popup here
    },
    onDeletePkl: function () {
        var m = this;
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
            buttons: [{
                text: 'Thoát',
                itemId: 'no'
            }, {
                text: 'Xoá',
                itemId: 'yes'
            }],
            multiline: false,
            fn: function (buttonValue, inputText, showConfig) {
                if(buttonValue == 'no'){
                    if(msgWindow){
                        msgWindow.hide();
                    }
                }
                if(buttonValue == 'yes'){
                    m.deletePkl();
                }
            },
            icon: Ext.Msg.QUESTION
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
                    viewModel.set('selectedPklRecord', null);
                    m.reloadStore();
                    m.resetForm();
                    myview.down('#packageidTxt').focus();

                } else {
                    Ext.toast('Lỗi xoá pkl: ' + response.message, 2000);
                }
        })        
    },
    onCheck: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var selectedDRecord = viewModel.get('selectedDRecord');
        var selectedPklRecord = viewModel.get('selectedPklRecord');

        // var lotnumberTxt = viewModel.get('objPkl.lotnumberTxt');
        var cbbox_lotnumber = me.down('#cbbox_lotnumber');
        var selection = cbbox_lotnumber.getSelection();
        var lotnumberTxt = null;
        if(selection != null){
            var lot_number = selection.get('lot_number');
            viewModel.set('objPkl.lotnumberTxt', lot_number.toUpperCase());
            lotnumberTxt = lot_number.toUpperCase();
        }else{
            Ext.toast('Cần chọn số lot vải', 2000);
            return;
        }

        var packageidTxt = viewModel.get('objPkl.packageidTxt');
        var yTxt = viewModel.get('objPkl.yTxt');
        var mTxt = viewModel.get('objPkl.mTxt');
        var yOriginTxt = viewModel.get('objPkl.yOriginTxt') == null ? viewModel.get('objPkl.yTxt') : viewModel.get('objPkl.yOriginTxt');
        var mOriginTxt = viewModel.get('objPkl.mOriginTxt') == null ? viewModel.get('objPkl.mTxt') : viewModel.get('objPkl.mOriginTxt');
        
        var grossweightCheckTxt = viewModel.get('objPkl.grossweightCheckTxt');
        var grossweightLbsCheckTxt = viewModel.get('objPkl.grossweightLbsCheckTxt');
        var grossweightTxt = viewModel.get('objPkl.grossweightTxt') == null ? viewModel.get('objPkl.grossweightCheckTxt') : viewModel.get('objPkl.grossweightTxt');
        var grossweightLbsTxt = viewModel.get('objPkl.grossweightLbsTxt') == null ? viewModel.get('objPkl.grossweightLbsCheckTxt') : viewModel.get('objPkl.grossweightLbsTxt');
        
        var sampleCheckTxt = viewModel.get('objPkl.sampleCheckTxt');
        var widthMetCheckTxt = viewModel.get('objPkl.widthMetCheckTxt');
        var widthMetTxt = viewModel.get('objPkl.widthMetTxt') == null ? viewModel.get('objPkl.widthMetCheckTxt') : viewModel.get('objPkl.widthMetTxt');
        var pklRowTxt = viewModel.get('objPkl.pklRowTxt');
        var pklSpaceTxt = viewModel.get('objPkl.pklSpaceTxt');
        var pklFloorTxt = viewModel.get('objPkl.pklFloorTxt');

        // check combo đã chọn chưa
        var pkl_stockindId = viewModel.get('pkl_stockindId');
        if(pkl_stockindId == '' || pkl_stockindId == null){
            Ext.toast('Cần chọn loại vải', 2000);
            return;
        }

        // check textfield
        if(stockin.unitid_link == 1){ // met
            if(packageidTxt == '' || mTxt == '' || widthMetCheckTxt == ''){
                Ext.toast('Thiếu thông tin Số cây, khổ hoặc độ dài', 2000);
                return;
            }
            if(isNaN(mTxt)){
                Ext.toast('Số M phải là số', 2000);
                return;
            }
        }
        if(stockin.unitid_link == 3){ // yds
            if(packageidTxt == '' || yTxt == '' || widthMetCheckTxt == ''){
                Ext.toast('Thiếu thông tin Số cây, khổ hoặc độ dài', 2000);
                return;
            }
            if(isNaN(yTxt)){
                Ext.toast('Số Y phải là số', 2000);
                return;
            }
        }
        if(stockin.unitid_link == 4){ // kg
            if(packageidTxt == '' || grossweightCheckTxt == '' || widthMetCheckTxt == ''){
                Ext.toast('Thiếu thông tin Số cây, khổ hoặc khối lượng', 2000);
                return;
            }
            if(isNaN(grossweightCheckTxt)){
                Ext.toast('Số M phải là số', 2000);
                return;
            }
        }
        if(stockin.unitid_link == 5){ // lbs
            if(packageidTxt == '' || grossweightLbsCheckTxt == '' || widthMetCheckTxt == ''){
                Ext.toast('Thiếu thông tin Số cây, khổ hoặc khối lượng', 2000);
                return;
            }
            if(isNaN(grossweightLbsCheckTxt)){
                Ext.toast('Số M phải là số', 2000);
                return;
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

        var objData = new Object();
        objData.id = null;
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
        objData.width_met_check = widthMetCheckTxt / 100;
        objData.width_met = widthMetTxt / 100;
        objData.width_yds_check = objData.width_met_check / 0.9144;
        objData.width_yds = objData.width_met / 0.9144;
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
        objData.grossweight_check = parseFloat(objData.grossweight_check);
        objData.grossweight = parseFloat(objData.grossweight);
        objData.width_met_check = parseFloat(objData.width_met_check);
        objData.width_yds_check = parseFloat(objData.width_yds_check);
        objData.width_met = parseFloat(objData.width_met);
        objData.width_yds = parseFloat(objData.width_yds);

        if(selectedPklRecord != null){
            objData.id = selectedPklRecord.get('id');
        }

        // 
        m.onUpdate_Print_Pklist(objData);
    },
    
    //hungdaibang code
    onUpdate_Print_Pklist: function(pklistData){
        var myview = this.getView();
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Đang in tem'
        });

		var me = this;
        var viewModel = this.getViewModel();
        // console.log("update pklist");
        // console.log(pklistData);
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
                // me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                    //    console.log(response);
					   
					   //Goi mqtt de in tem
                        if (null != response.rfprintid_link && response.rfprintid_link > 0){
					        me.onPrint_WithRFID(response.rfprintid_link);
                        } else {
                            //Reload danh sach Pklist va Reset cac o nhap lieu
                            Ext.Viewport.setMasked(false);
                            viewModel.set('selectedPklRecord', null);
                            me.reloadStore();
                            me.resetForm();
                            myview.down('#packageidTxt').focus();
                        }
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
                            me.reloadStore();
                            me.resetForm();
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
    onbtnResetForm: function(){
        var m = this;
        var viewModel = this.getViewModel();
        viewModel.set('objPkl.lotnumberTxt', '');
        m.resetForm();
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

    reloadStore: function(){ // console.log('reloadStore');
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockinid_link = viewModel.get('stockin.id');
        var pkl_stockindId = viewModel.get('pkl_stockindId');
        var selectedPklRecord = viewModel.get('selectedPklRecord');

        var cbbox_lotnumber = me.down('#cbbox_lotnumber');
        var selection = cbbox_lotnumber.getSelection();
        var lot_number = viewModel.get('cbbox_lotnumber_value');
        // var lot_number = null;
        // if(selection != null){
        //     lot_number = selection.get('lot_number');
        // }

        var StockinPklStore = viewModel.getStore('StockinPklStore');
        StockinPklStore.loadStore_byStockinDIdAndGreaterThanStatus_async(pkl_stockindId, lot_number, -1);
        StockinPklStore.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    // this.fireEvent('logout');
                } else {
                    if(selectedPklRecord != null){
                        var stockinpklid_link = selectedPklRecord.get('id');
                        var storeItems = StockinPklStore.getData().items;
                        for(var i=0; i<storeItems.length; i++){
                            var item = storeItems[i];
                            if(item.get('id') == stockinpklid_link){
                                var grid = m.getView().down('#Stockin_M_Edit_Pkl');
                                grid.getSelectable().select(item);
                                viewModel.set('selectedPklRecord', item);
                            }
                        }
                    }
                }
            }
        });
    }
})