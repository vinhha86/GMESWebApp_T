Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit_LotSpace_EditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_Edit_LotSpace_EditController',
    init: function() {
        var viewModel = this.getViewModel();
        var selectedLotRecord = viewModel.get('selectedLotRecord');
        // var unitid_link = viewModel.get('unitid_link');
        var stockinlotid_link = selectedLotRecord.get('id');
        this.getInfo(stockinlotid_link);

    },
    control: {
        '#btnDeleteLot': {
            tap: 'onDeleteLot'
        },
        '#btnLuu': {
            tap: 'onLuu'
        },
        '#btnThoat': {
            tap: 'onThoat'
        },
        '#Stockin_M_Edit_LotSpace_Edit_List': {
            childtap: 'onLotSpaceTap'
        },
        '#totalpackage': { // đây là totalpackage của space
            keyup: 'ontotalpackageChange',
        },
        '#totalmet': { // đây là totalmet của lot
            keyup: 'onDoDaiChange',
        },
        '#totalyds': { // đây là totalyds của lot
            keyup: 'onDoDaiChange',
        },
        '#kg': { // đây là totalmet của lot
            keyup: 'onKhoiLuongChange',
        },
        '#lbs': { // đây là totalyds của lot
            keyup: 'onKhoiLuongChange',
        },
        '#lot_number': { // đây là lot_number của lot
            change: 'onlotNumberTxtType',
        }
    },
    onDeleteLot: function(){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var stockinLot = viewModel.get('stockinLot');
        var stockinlotid_link = stockinLot.id;

        me.setMasked({
            xtype: 'loadmask',
            message: 'Đang lưu'
        });
        var params = new Object();
        params.stockinlotid_link = stockinlotid_link;

        GSmartApp.Ajax.postJitin('/api/v1/stockin_lot/delete', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                me.setMasked(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        if(response.message == 'Lot này đã tồn tại cây vải'){
                            Ext.toast('Xoá thất bại: ' + response.message, 3000);
                        }else{
                            Ext.toast('Xoá thành công', 3000);
                            m.fireEvent('Xoa');
                        }
                        // console.log(response);
                    }else{
                        Ext.toast('Xoá thất bại: ' + response.message, 3000);
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Xoá thất bại: ' + response.message, 3000);
                }
        })

        // fire event
        // this.fireEvent('Luu', selectedLotRecord);
        // Ext.toast('Lưu thành công', 1000);
        // console.log(selectedLotRecord);
    },
    onLuu: function(){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var stockinLot = viewModel.get('stockinLot');

        if(stockinLot.lot_number == null || stockinLot.lot_number == ''){
            Ext.toast('Thiếu thông tin Số Lot', 3000);
            return;
        }
        if(stockinLot.totalpackage == null || stockinLot.totalpackage == ''){
            Ext.toast('Thiếu thông tin Số Cây', 3000);
            return;
        }
        if(stockinLot.totalmet === null || stockinLot.totalmet === ''){
            console.log(stockinLot.totalmet);
            Ext.toast('Thiếu thông tin Độ dài', 3000);
            return;
        }
        if(stockinLot.totalyds === null || stockinLot.totalyds === ''){
            console.log(stockinLot.totalyds);
            Ext.toast('Thiếu thông tin Độ dài', 3000);
            return;
        }
        if(stockinLot.grossweight === null || stockinLot.grossweight === ''){
            Ext.toast('Thiếu thông tin khối lượng', 3000);
            return;
        }
        if(stockinLot.grossweight_lbs === null || stockinLot.grossweight_lbs === ''){
            Ext.toast('Thiếu thông tin khối lượng', 3000);
            return;
        }

        me.setMasked({
            xtype: 'loadmask',
            message: 'Đang lưu'
        });
        var params = new Object();
        params.stockinLot = stockinLot;

        GSmartApp.Ajax.postJitin('/api/v1/stockin_lot/update', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                me.setMasked(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.toast('Lưu thành công', 3000);
                        m.fireEvent('Luu');
                        // console.log(response);
                    }else{
                        Ext.toast('Lưu thất bại: ' + response.message, 3000);
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lưu thất bại: ' + response.message, 3000);
                }
        })

        // fire event
        // this.fireEvent('Luu', selectedLotRecord);
        // Ext.toast('Lưu thành công', 1000);
        // console.log(selectedLotRecord);
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    getInfo: function(stockinlotid_link){
        var me = this.getView();
        var viewModel = this.getViewModel();

        me.setMasked({
            xtype: 'loadmask',
            message: 'Đang tải'
        });

        var params = new Object();
        params.stockinlotid_link = stockinlotid_link;

        GSmartApp.Ajax.postJitin('/api/v1/stockin_lot/getById', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                me.setMasked(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        viewModel.set('stockinLot', response.data);
                        // console.log(response);
                    } else{
                        Ext.toast('Lấy thông tin chi tiết lot thất bại: ' + response.message, 3000);
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lấy thông tin chi tiết lot thất bại: ' + response.message, 3000);
                }
        })
    },
    updateSpace: function(){
        var viewModel = this.getViewModel();
        var selectedLotRecord = viewModel.get('selectedLotRecord');
        var lotSpace = viewModel.get('lotSpace');
        var lotSpaceAmount = viewModel.get('lotSpaceAmount');

        // check form
        if(lotSpace == null){
            Ext.toast('Chưa chọn khoang', 1000);
            return;
        }
        if(lotSpaceAmount == null || lotSpaceAmount == ''){
            Ext.toast('Chưa nhập số cây', 1000);
            return;
        }

        // updateLotRecord
        var space = selectedLotRecord.get('space');
        var spaceStringArr = space.split(';'); // D1H1T1C1
        var newLotSpaceString = ''; 
        for(var i = 0; i < spaceStringArr.length; i++){
            if(spaceStringArr[i].includes(lotSpace+'C')){
                spaceStringArr[i] = lotSpace + 'C' + lotSpaceAmount;
            }
            if(newLotSpaceString == ''){
                newLotSpaceString+=spaceStringArr[i];
            }else{
                newLotSpaceString+=';' + spaceStringArr[i];
            }
        }
        selectedLotRecord.set('space', newLotSpaceString);

        // update grid
        this.setSpaceStore(newLotSpaceString);
    },
    setInfo: function(){
        var viewModel = this.getViewModel();
        var selectedLotRecord = viewModel.get('selectedLotRecord');

        var lot_number = selectedLotRecord.get('lot_number') == null ? '' : selectedLotRecord.get('lot_number').toUpperCase();
        var totalpackage = selectedLotRecord.get('totalpackage') == null ? 0 : selectedLotRecord.get('totalpackage');
        var totalyds = selectedLotRecord.get('totalyds') == null ? 0 : selectedLotRecord.get('totalyds');
        var totalmet = selectedLotRecord.get('totalmet') == null ? 0 : selectedLotRecord.get('totalmet');
        var grossweight = selectedLotRecord.get('grossweight') == null ? 0 : selectedLotRecord.get('grossweight');

        viewModel.set('lot_number', lot_number);
        viewModel.set('totalpackage', totalpackage);
        viewModel.set('totalyds', totalyds);
        viewModel.set('totalmet', totalmet);
        viewModel.set('grossweight', grossweight);
    },
    setSpaceStore: function(lotSpace){
        // update space textfield
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var lotSpaceArr = lotSpace.split(';');
        var lotSpaceArrStore = new Array();
        for(var i = 0; i < lotSpaceArr.length; i++){
            if(lotSpaceArr[i] != null && lotSpaceArr[i] != ''){
                lotSpaceObj = new Object();
                lotSpaceObj.space = lotSpaceArr[i];
                lotSpaceArrStore.push(lotSpaceObj);
            }
        }
        //Stockin_M_Edit_LotSpace_Edit_List
        viewModel.set('spaces',lotSpaceArrStore);
        if(me.down('#Stockin_M_Edit_LotSpace_Edit_List').getStore()){
            me.down('#Stockin_M_Edit_LotSpace_Edit_List').getStore().setData([]);
            me.down('#Stockin_M_Edit_LotSpace_Edit_List').getStore().insert(0, lotSpaceArrStore);
        }
    },
    resetSpaceForm: function(){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        viewModel.set('space', null);
        viewModel.set('totalpackage', null);
    },
    onLotSpaceTap:function(grid, location, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var record = location.record;

        viewModel.set('selectedSpaceRecord', record);
        viewModel.set('space', record.get('space'))
        viewModel.set('totalpackage', record.get('totalpackage'));

        // console.log(record);
    },
    onLotSpaceDelete: function(grid, info){
        var me = this.getView();
        var m = this;
        var store = grid.store;
        var viewModel = this.getViewModel();
        var stockinLot = viewModel.get('stockinLot');
        var stockin_lot_space = viewModel.get('stockinLot.stockin_lot_space');

        store.remove(info.record); // remove trên store
        for(var i = 0; i < stockin_lot_space.length; i++){ // remove trên viewModel obj
            if(stockin_lot_space[i].id == info.record.get('id')){
                stockin_lot_space.splice(i, 1);
            }
        }

        this.resetSpaceForm();
        // console.log(grid);
        // console.log(info);
        // console.log(stockinLot);
    },
    ontotalpackageChange: function(numberfield, e, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var stockinLot = viewModel.get('stockinLot');
        var selectedSpaceRecord = viewModel.get('selectedSpaceRecord');
		var totalpackage = viewModel.get('totalpackage');

        if(totalpackage == null || totalpackage == '') totalpackage = 0;
        selectedSpaceRecord.set('totalpackage', totalpackage);

        // console.log(stockinLot);
        // console.log(selectedSpaceRecord);
    },
    onDoDaiChange: function(numberfield, e, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var stockinLot = viewModel.get('stockinLot');

        var itemId = numberfield.getItemId();
        if(itemId == 'totalmet'){
            if(stockinLot.totalmet == null) stockinLot.totalmet = 0;
            stockinLot.totalyds = stockinLot.totalmet / 0.9144;
            stockinLot.totalyds = parseFloat(stockinLot.totalyds);
        }
        if(itemId == 'totalyds'){
            if(stockinLot.totalyds == null) stockinLot.totalyds = 0;
            stockinLot.totalmet = stockinLot.totalyds * 0.9144;
            stockinLot.totalmet = parseFloat(stockinLot.totalmet);
        }

        viewModel.set('stockinLot.totalmet', stockinLot.totalmet);
        viewModel.set('stockinLot.totalyds', stockinLot.totalyds);

        // console.log(stockinLot);
    },
    onKhoiLuongChange: function(numberfield, e, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var stockinLot = viewModel.get('stockinLot');

        var itemId = numberfield.getItemId();
        if(itemId == 'kg'){
            if(stockinLot.grossweight == null) stockinLot.grossweight = 0;
            stockinLot.grossweight_lbs = stockinLot.grossweight * 2.20462;
            stockinLot.grossweight_lbs = parseFloat(stockinLot.grossweight_lbs);
        }
        if(itemId == 'lbs'){
            if(stockinLot.grossweight_lbs == null) stockinLot.grossweight_lbs = 0;
            stockinLot.grossweight = stockinLot.grossweight_lbs / 2.20462;
            stockinLot.grossweight = parseFloat(stockinLot.grossweight);
        }

        viewModel.set('stockinLot.grossweight', stockinLot.grossweight);
        viewModel.set('stockinLot.grossweight_lbs', stockinLot.grossweight_lbs);

        // console.log(stockinLot);
    },

    onlotNumberTxtType: function(field, newValue, oldValue, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        // console.log(newValue.toUpperCase());
        viewModel.set('stockinLot.lot_number', newValue.toUpperCase());
        field.setValue(newValue.toUpperCase());
    },
});
