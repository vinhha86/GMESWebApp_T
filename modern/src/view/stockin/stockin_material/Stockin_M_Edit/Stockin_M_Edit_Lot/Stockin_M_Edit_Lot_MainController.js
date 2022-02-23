Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit_Lot_MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockin_M_Edit_Lot_MainController',
	init: function () {
		
	},
    control: {
        '#btnLotEditSpace':{
            tap: 'onLotEditSpace'
        },
        '#btnLotAddSpace':{
            tap: 'onLotAddSpace'
        },
        '#Stockin_M_Edit_Lot': {
            childtap: 'onStockin_M_Edit_LotItemTap'
		},
        '#cbbox_lot_stockindId':{
            change: 'oncbbox_lot_stockindId_change'
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
        if(placeholder == 'Tổng độ dài'){
            oldValue = viewModel.get('yNumberTxt');
        }else if(placeholder == 'Tổng cân nặng'){
            oldValue = viewModel.get('canNumberTxt');
        }else{
            return;
        }

        if(
            oldValue != null 
            && oldValue != '' 
            && oldValue != 0 
            && !isNaN(oldValue)
            && ((oldValue - Math.floor(oldValue)) == 0)
            && !((oldValue/100 - Math.floor(oldValue/100)) == 0)
        ){
            if (Ext.os.is.iOS) {
                var listValue = [];
                var value1 = { value: oldValue};
                var value2 = { value: oldValue/10};
                var value3 = { value: oldValue/100};

                listValue.push(value1);
                listValue.push(value2);
                listValue.push(value3);

                // var Stockin_ValueSelect_window = Ext.getCmp("Stockin_ValueSelect_window");
                // if(Stockin_ValueSelect_window) {
                //     me.focus(false);
                //     return;
                // }
                var isStockin_ValueSelect_window_open = viewModel.get('isStockin_ValueSelect_window_open');
                // console.log(isStockin_ValueSelect_window_open);
                if(isStockin_ValueSelect_window_open){
                    return;
                }
                viewModel.set('isStockin_ValueSelect_window_open', true);

                var dialog = Ext.create({
                    xtype: 'dialog',
                    id: 'Stockin_ValueSelect_window',
                    itemId: 'dialog',
                    // title: 'Chọn giá trị',
                    title: placeholder,
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
                    if(placeholder == 'Tổng độ dài'){
                        viewModel.set('yNumberTxt', selectValue);
                    }else if(placeholder == 'Tổng cân nặng'){
                        viewModel.set('canNumberTxt', selectValue);
                    }
                    dialog.close();
                    setTimeout(function(){
                        viewModel.set('isStockin_ValueSelect_window_open', false);
                    }, 200);
                });
            }
        }
        // console.log("Version " + Ext.os.version);
    },
    oncbbox_lot_stockindId_change: function(cbbox, newValue, oldValue, eOpts){
        var viewModel = this.getViewModel();
        if(newValue != null && newValue != ''){
            var StockinLotStore = viewModel.getStore('StockinLotStore');
            StockinLotStore.loadStore_byStockinDId(newValue);

            viewModel.set('pkl_stockindId', newValue);
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
    onStockin_M_Edit_LotItemTap: function(grid, location, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        if(location.record.get('stockinLotSpace') == null) location.record.set('stockinLotSpace', '');
        viewModel.set('selectedLotRecord', location.record);

        // lotnumberTxt
        var selectedPklRecord = viewModel.get('selectedPklRecord');
        viewModel.set('cbbox_lotnumber_value', location.record.get('lot_number'));

        // objRecheck.lotnumber
        var selectedPklRecheckRecord = viewModel.get('selectedPklRecheckRecord');

        if(selectedPklRecheckRecord == null){
            viewModel.set('objRecheck.lotnumber', location.record.get('lot_number'));
        }
    },
    onLotEditSpace: function(){
        // popup danh sách các khoang của lot này
        // từ string space tách ra thành các record
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinid_link = viewModel.get('stockin.id');
        var unitid_link = stockin.unitid_link;

        // thông báo nếu chưa chọn lot
        var selectedLotRecord = viewModel.get('selectedLotRecord');
        if(selectedLotRecord == null){
            Ext.toast('Chưa chọn lot', 1000);
            return;
        }

        // taọ popup và chuyền thông tin record vào
        var dialog = Ext.create({
            xtype: 'dialog',
            itemId: 'dialog',
            title: 'Thông tin chi tiết',
            width: 300,
            height: 600,
            maxWidth: 300,
            maxHeight: 600,
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
            items: [{
                border: false,
                xtype: 'Stockin_M_Edit_LotSpace_Edit',
                viewModel: {
                    data: {
                        selectedLotRecord: selectedLotRecord,
                        unitid_link: unitid_link
                    }
                }
            }],
        });
        dialog.show();

        dialog.down('#Stockin_M_Edit_LotSpace_Edit').getController().on('Luu', function () {
            m.reloadStore();
            // reload obj stockin để làm mới danh sách lot
            var Stockin_M_Edit = Ext.getCmp('Stockin_M_Edit');
            Stockin_M_Edit.getController().getInfo(stockin.id);
        });

        dialog.down('#Stockin_M_Edit_LotSpace_Edit').getController().on('Xoa', function () {
            dialog.close();
            viewModel.set('selectedLotRecord', null)
            m.reloadStore();
        });

        dialog.down('#Stockin_M_Edit_LotSpace_Edit').getController().on('Thoat', function () {
            me.setMasked(false);
            dialog.close();
        });

        // console.log(stockin);
    },
    onLotAddSpace: function(){
        // console.log(info);
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var stockinid_link = viewModel.get('stockin.id');

        // thông báo nếu chưa chọn lot
        var selectedLotRecord = viewModel.get('selectedLotRecord');
        if(selectedLotRecord == null){
            Ext.toast('Chưa chọn lot', 1000);
            return;
        }

        // check thông tin
        var stockinlotid_link = selectedLotRecord.get('id');
        var lotRow = viewModel.get('lotRow');
        var lotSpace = viewModel.get('lotSpace');
        var lotFloor = viewModel.get('lotFloor');
        var lotAmount = viewModel.get('lotAmount');

        var numberOfEmptyField = 0;
        if(lotRow == null || lotRow == ''){
            lotRow = 'x';
            numberOfEmptyField++;
        }
        if(lotSpace == null || lotSpace == ''){
            lotSpace = 'x';
            numberOfEmptyField++;
        }
        if(lotFloor == null || lotFloor == ''){
            lotFloor = 'x';
            numberOfEmptyField++;
        }
        if(lotAmount == null || lotAmount == '' || lotAmount <= 0){
            Ext.toast('Phải điền sl cây vải lớn hơn 0', 1000);
            return;
            // lotAmount = 0;
        }

        if(numberOfEmptyField !=0 && numberOfEmptyField != 3){
            Ext.toast('Phải điền tất cả hoặc bỏ trống tất cả thông tin dãy, tầng, khoang', 3000);
            return;
        }

        var spaceepcid_link = 'D-' + lotRow + '|T-' + lotSpace + '|K-' + lotFloor + '|';

        //
        me.setMasked({
            xtype: 'loadmask',
            message: 'Đang lưu'
        });

        var params = new Object();
        params.stockinlotid_link = stockinlotid_link;
        params.spaceepcid_link = spaceepcid_link
        params.totalpackage = lotAmount;
        params.stockinid_link = stockinid_link;

        GSmartApp.Ajax.postJitin('/api/v1/stockin_lot_space/stockin_lot_space_create', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                me.setMasked(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.toast('Lưu thành công', 3000);
                        var data = response.data;

                        m.reloadStore();
                        m.resetFormAddSpace();
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
    resetFormAddSpace: function(){
        var m = this;
        var viewModel = this.getViewModel();
        
        viewModel.set('lotRow', null);
        viewModel.set('lotSpace', null);
        viewModel.set('lotFloor', null);
        viewModel.set('lotAmount', null);
    },
    onmaLotFilterKeyup: function (){
        var grid = this.getView().down('#Stockin_M_Edit_Lot'),
            // Access the field using its "reference" property name.
            filterField = this.getView().down('#maLotFilter'),
            store = grid.store,
            filters = grid.store.getFilters();

        var viewModel = this.getViewModel();
        grid.getSelectable().deselectAll();
        viewModel.set('selectedLotRecord', null);
        this.resetFormAddSpace();

        var maLotFilter = viewModel.get('maLotFilter') == null ? '' : viewModel.get('maLotFilter').toLowerCase();
        store.clearFilter();
        store.filterBy(function(rec) {
            var isByLotOK = false;
            if(
                rec.get('lot_number').toLowerCase().includes(maLotFilter)
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

    reloadStore: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockinid_link = viewModel.get('stockin.id');
        var lot_stockindId = viewModel.get('lot_stockindId');
        var selectedLotRecord = viewModel.get('selectedLotRecord');

        var StockinLotStore = viewModel.getStore('StockinLotStore');
        StockinLotStore.loadStore_byStockinDId_async(lot_stockindId);
        StockinLotStore.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    // this.fireEvent('logout');
                } else {
                    if(selectedLotRecord != null){
                        var stockinlotid_link = selectedLotRecord.get('id');
                        var storeItems = StockinLotStore.getData().items;
                        for(var i=0; i<storeItems.length; i++){
                            var item = storeItems[i];
                            if(item.get('id') == stockinlotid_link){
                                var grid = m.getView().down('#Stockin_M_Edit_Lot');
                                grid.getSelectable().select(item);
                                viewModel.set('selectedLotRecord', item);
                            }
                        }
                    }
                }
            }
        });
    },

    colummnWrap: function(val){
        return '<div style:"white-space:normal !important;">' + val + '</div>';
    },
})