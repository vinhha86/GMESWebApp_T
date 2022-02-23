Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit_D_MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockin_M_Edit_D_MainController',
	init: function () {
		
	},
	control: {
        '#btnAddLot':{
            tap: 'onAddLot'
        },
        '#Stockin_M_Edit_D': {
			// itemtap: 'onItemTap',
            itemsingletap: 'onStockin_M_Edit_DItemTap'
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
        if(placeholder == 'Tổng độ dài'){
            oldValue = viewModel.get('yNumberTxt');
        }else if(placeholder == 'Tổng khối lượng'){
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
                    }else if(placeholder == 'Tổng khối lượng'){
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
    onStockin_M_Edit_DItemTap: function(dataView, index, target, record, e, eOpts){
        var me = this.getView();
        var m = this;
		var viewModel = this.getViewModel();
		viewModel.set('selectedDRecord', record);

        this.setComboLot();
        this.setComboPkl();
        this.setComboPklRecheck();
    },
    setComboLot: function(){
        var viewModel = this.getViewModel();
        var selectedDRecord = viewModel.get('selectedDRecord');
        viewModel.set('lot_stockindId', selectedDRecord.get('id'));
    },
    setComboPkl: function(){
        var viewModel = this.getViewModel();
        var selectedDRecord = viewModel.get('selectedDRecord');
        viewModel.set('pkl_stockindId', selectedDRecord.get('id'));
    },
    setComboPklRecheck: function(){
        var viewModel = this.getViewModel();
        var selectedDRecord = viewModel.get('selectedDRecord');
        viewModel.set('pklRecheck_stockindId', selectedDRecord.get('id'));
    },
	onAddLot: function(){
        var me = this.getView();
        var m = this;
		var viewModel = this.getViewModel();
		var stockin = viewModel.get('stockin');
		var selectedDRecord = viewModel.get('selectedDRecord');
        var stockinid_link = viewModel.get('stockin.id');

        if(selectedDRecord == null){ // chưa chọn vải
            Ext.toast('Chưa chọn mã vải', 2000);
            return;
        }

        var lotNumberTxt = viewModel.get('lotNumberTxt');
        var cayNumberTxt = viewModel.get('cayNumberTxt');
        var yNumberTxt = viewModel.get('yNumberTxt');
        var canNumberTxt = viewModel.get('canNumberTxt');

        // check form info
        if(lotNumberTxt == '') {Ext.toast('Chưa nhập lot', 2000); return;}
        if(cayNumberTxt == '') {Ext.toast('Chưa nhập số cây', 2000); return;}
        if(stockin.unitid_link == 1 || stockin.unitid_link == 3){
            // if(yNumberTxt == '') {Ext.toast('Chưa nhập độ dài', 2000); return;}
            if(yNumberTxt == '') {Ext.toast('Độ dài phải là số', 2000); return;}
            if(isNaN(yNumberTxt)) {Ext.toast('Độ dài phải là số', 2000); return;}
        }
        if(stockin.unitid_link == 4 || stockin.unitid_link == 5){
            // if(canNumberTxt == '') {Ext.toast('Chưa nhập khối lượng', 2000); return;}
            if(canNumberTxt == '') {Ext.toast('Khối lượng phải là số', 2000); return;}
            if(isNaN(canNumberTxt)) {Ext.toast('Khối lượng phải là số', 2000); return;}
        }

        // check stockin_lot tồn tại chưa
        var stockin_lot = selectedDRecord.get('stockin_lot');
        if(stockin_lot != null){
            for(var i = 0; i < stockin_lot.length; i++){
                var stockin_lotRec = stockin_lot[i];
                if(stockin_lotRec.lot_number.toUpperCase() == lotNumberTxt.toUpperCase() && stockin_lotRec.materialid_link == selectedDRecord.get('skuid_link')){
                    // lot cho sku đã tồn tại, ko Thêm
                    Ext.toast('Đã tồn tại lot của mã vải', 2000);
                    return;
                }
            }
        }

        // thêm vào stockin_lot
        var newLotObj = new Object();
        newLotObj.stockinid_link = stockin.id;
        newLotObj.lot_number = lotNumberTxt;
        newLotObj.totalpackage = cayNumberTxt;
        newLotObj.totalpackagecheck = 0;
        newLotObj.totalydscheck = 0;
        newLotObj.totalmetcheck = 0;
        newLotObj.totalpackagepklist = 0;
        newLotObj.space = '';
        newLotObj.status = -1;
        newLotObj.materialid_link = selectedDRecord.get('skuid_link');
        newLotObj.skucode = selectedDRecord.get('skuCode');
        newLotObj.stockindid_link = selectedDRecord.get('id');

        // thêm sl yêu cầu
        if(yNumberTxt == null || yNumberTxt == '') yNumberTxt = 0;
        if(canNumberTxt == null || canNumberTxt == '') canNumberTxt = 0;

        if(stockin.unitid_link == 1 || stockin.unitid_link == 3){
            if(stockin.unitid_link == 3){ // yds
                var ydsorigin = parseFloat(yNumberTxt);
                var met_origin =  parseFloat(Ext.util.Format.number(ydsorigin * 0.9144, '0.00'));
                newLotObj.totalyds = ydsorigin;
                newLotObj.totalmet = met_origin;
            }
            if(stockin.unitid_link == 1){ // m
                var met_origin = parseFloat(yNumberTxt);
                var ydsorigin =  parseFloat(Ext.util.Format.number(met_origin / 0.9144, '0.00'));
                newLotObj.totalyds = ydsorigin;
                newLotObj.totalmet = met_origin;
            }
            // mặc định là kg
            var grossweight = parseFloat(canNumberTxt);
            var grossweight_lbs = parseFloat(Ext.util.Format.number(grossweight * 2.20462, '0.00'));
            newLotObj.grossweight = grossweight;
            newLotObj.grossweight_lbs = grossweight_lbs;
        }
        if(stockin.unitid_link == 4 || stockin.unitid_link == 5){
            if(stockin.unitid_link == 4){ // kg
                var grossweight = parseFloat(canNumberTxt);
                var grossweight_lbs = parseFloat(Ext.util.Format.number(grossweight * 2.20462, '0.00'));
                newLotObj.grossweight = grossweight;
                newLotObj.grossweight_lbs = grossweight_lbs;
            }
            if(stockin.unitid_link == 5){ // lbs
                var grossweight_lbs = parseFloat(canNumberTxt);
                var grossweight = parseFloat(Ext.util.Format.number(grossweight_lbs / 2.20462, '0.00'));
                newLotObj.grossweight = grossweight;
                newLotObj.grossweight_lbs = grossweight_lbs;
            }
            // mặc định là met
            var met_origin = parseFloat(yNumberTxt);
            var ydsorigin =  parseFloat(Ext.util.Format.number(met_origin / 0.9144, '0.00'));
            newLotObj.totalyds = ydsorigin;
            newLotObj.totalmet = met_origin;
        }

        // lưu lot vào db qua api -> nhận obj trả về -> đẩy obj vào d/sách trên giao diện
        me.setMasked({
            xtype: 'loadmask',
            message: 'Đang lưu'
        });

        var params = new Object();
        params.data = newLotObj;

        GSmartApp.Ajax.postJitin('/api/v1/stockin_lot/stockin_lot_create', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                me.setMasked(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        if(response.message == 'Số lot đã tồn tại'){
                            Ext.toast(response.message, 3000);
                        }else{
                            Ext.toast('Lưu thành công', 3000);
                            var data = response.data;
                            // reload obj stockin để làm mới danh sách lot
                            var Stockin_M_Edit = Ext.getCmp('Stockin_M_Edit');
                            Stockin_M_Edit.getController().getInfo(stockin.id);

                            // reload view
                            m.reloadStore();
                            // reset form
                            m.resetFormAddLot();
                        }
                        // console.log(response);
                    } else{
                        Ext.toast('Lưu thất bại: ' + response.message, 3000);
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lưu thất bại: ' + response.message, 3000);
                }
        })
    },
	resetFormAddLot: function(){
        var m = this;
        var viewModel = this.getViewModel();

        viewModel.set('lotNumberTxt', '');
        viewModel.set('cayNumberTxt', '');
        viewModel.set('yNumberTxt', '');
        viewModel.set('canNumberTxt', '');
    },
	onmaNPLFilterKeyup: function (){
        var grid = this.getView().down('#Stockin_M_Edit_D'),
            // Access the field using its "reference" property name.
            filterField = this.getView().down('#maNPLFilter'),
            filters = grid.store.getFilters();
        
        var viewModel = this.getViewModel();
        viewModel.set('selectedDRecord', null);
        grid.getSelectable().deselectAll();

        if (filterField.getValue()) {
            this.maNPLFilter = filters.add({
                id: 'maNPLFilter',
                property: 'skuCode',
                value: filterField.getValue(),
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.maNPLFilter) {
            filters.remove(this.maNPLFilter);
            this.maNPLFilter = null;
        }
    },
	onlotNumberTxtType: function(field, newValue, oldValue, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        // console.log(newValue.toUpperCase());
        viewModel.set('lotNumberTxt', newValue.toUpperCase());
        field.setValue(newValue.toUpperCase());
    },
    reloadStore: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockinid_link = viewModel.get('stockin.id');
        var selectedDRecord = viewModel.get('selectedDRecord');

        me.setMasked({
            xtype: 'loadmask',
            message: 'Đang tải'
        });

        var Stockin_d_Store = viewModel.getStore('Stockin_d_Store');
        Stockin_d_Store.loadStore_byStockinId_async(stockinid_link);
        Stockin_d_Store.load({
            scope: this,
            callback: function(records, operation, success) {
                me.setMasked(false);
                if(!success){
                    // this.fireEvent('logout');
                } else {
                    if(selectedDRecord != null){
                        var storeItems = Stockin_d_Store.getData().items;
                        for(var i=0; i<storeItems.length; i++){
                            var item = storeItems[i];
                            if(item.get('id') == selectedDRecord.get('id')){
                                var grid = m.getView().down('#Stockin_M_Edit_D');
                                grid.getSelectable().select(item);
                                viewModel.set('selectedDRecord', item);
                                viewModel.set('lot_stockindId', item.get('id'));
                                viewModel.set('pkl_stockindId', item.get('id'));
                                viewModel.set('pklRecheck_stockindId', item.get('id'));
                            }
                        }
                    }
                }
            }
        });
    }
})