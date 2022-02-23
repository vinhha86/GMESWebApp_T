Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pklist.Stockout_Pklist_WarehouseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_Pklist_WarehouseController',
    init: function () {
        
    },
    listen: {

    },
    control: {
        '#Stockout_Pklist_Warehouse': {
            // afterrender: 'onAfterrender',
            // itemclick: 'onItemclick'
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnSelect': {
            click: 'onSelect'
        },
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    onSelect: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        // var ListEndBuyer = viewModel.getStore('ListEndBuyer');
        var select = me.getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Phải chọn một đơn hàng",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        this.fireEvent("ThemDonHang", select);
        // this.onThoat();
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var productid_link = viewModel.get('productid_link');

        var mainView = Ext.getCmp('Stockout_Pcontract_Main_View');
        if(mainView) mainView.setLoading(true);

        var params = new Object();
        params.productid_link = productid_link ;
        GSmartApp.Ajax.post('/api/v1/pcontract/getByProduct',Ext.JSON.encode(params),
		function(success,response,options ) {
            if(mainView) mainView.setLoading(false);
            var response = Ext.decode(response.responseText);
            if(response.respcode == 200) {
				// console.log(response);
                var data = response.data;
                var PContractStore = viewModel.getStore('PContractStore');
                PContractStore.setData(data);
                // console.log(data);
            }
		})
    },
    // onItemclick: function(thisView, record, item, index, e, eOpts){
    //     // console.log(record);
    //     var m = this;
    //     var me = this.getView();
    //     var viewModel = this.getViewModel();
    //     var pcontractid_link = record.get('id');
    //     var productid_link = viewModel.get('productid_link');
    //     viewModel.set('pcontractid_link', pcontractid_link);

    //     var StockoutD_Store = viewModel.getStore('StockoutD_Store');

    //     var mainView = Ext.getCmp('Stockout_Pcontract_Main_View');
    //     if(mainView) mainView.setLoading(true);

    //     var params = new Object();
    //     params.pcontractid_link = pcontractid_link ;
    //     params.productid_link = productid_link ;
    //     GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/getbom_by_product_multithread',Ext.JSON.encode(params),
	// 	function(success,response,options ) {
    //         if(mainView) mainView.setLoading(false);
    //         var response = Ext.decode(response.responseText);
    //         if(response.respcode == 200) {
	// 			// console.log(response.data);
    //             var dataMaterial = new Array();
    //             for(var i = 0; i < response.data.length; i++){
    //                 var product_type = response.data[i].product_type;
    //                 if(product_type == '20'){
    //                     var isNotContain = true;
    //                     for(var j = 0; j < dataMaterial.length; j++){
    //                         if(dataMaterial[j].materialid_link == response.data[i].materialid_link){
    //                             isNotContain = false;
    //                         }
    //                     }
    //                     if(isNotContain){
    //                         dataMaterial.push(response.data[i]);
    //                     }
    //                 }
    //             }
    //             StockoutD_Store.removeAll();
    //             StockoutD_Store.insert(0, dataMaterial);
    //         }
	// 	})
    // },
    onHeaderCheckChange: function(checkcolumn, checked, e, eOpts){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        m.recalculateTotal();
    },
    onCheckcolumnCheckChange: function(checkcolumn, rowIndex, checked, record, eOpts){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        m.recalculateTotal();

        // console.log(record);
        // console.log(StockStoreData);
        // return;
        // if (checked) {
        //     // uncheck the second checkbox
        //     record.set('ac2', false)
        // }else{

        // }
    },
    // recalculateTotal: function(){
    //     var m = this;
    //     var me = this.getView();
    //     var viewModel = this.getViewModel();
    //     var StockStore = viewModel.getStore('StockStore');
    //     var StockStoreData = StockStore.getData();
    //     // console.log(StockStoreData);
    //     var items = StockStoreData.items;
    //     var totalcay = 0;
    //     var totaldai = 0;
    //     for(var i=0; i<items.length; i++){
    //         var khoang = items[i];
    //         var warehouseList = khoang.get('warehouseList');
    //         for(var j=0;j< warehouseList.length; j++){
    //             if(warehouseList[j].isChecked){
    //                 totalcay++;
    //                 totaldai+= warehouseList[j].met == null ? 0 : warehouseList[j].met;
    //             }
    //         }
    //     }

    //     viewModel.set('totalcay', totalcay);
    //     viewModel.set('totaldai', totaldai);
    // },
    recalculateTotal: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        WarehouseStore.commitChanges();
        var WarehouseStoreData = WarehouseStore.getData();
        var allRecords = (WarehouseStore.getData().getSource() || WarehouseStore.getData()).getRange();

        // console.log(WarehouseStoreData);
        // console.log(allRecords);
        
        // var items = WarehouseStoreData.items;
        var items = allRecords;
        var totalcay = 0;
        var totaldai = 0;
        var totaldaiyard = 0;
        var totalkg = 0;
        var totallbs = 0;

        // console.log(items);
        for(var i=0; i<items.length; i++){
            var cayVai = items[i];
            if(cayVai.get('isChecked') == true){
                totalcay++;
                totaldai+= cayVai.get('met') == null ? 0 : cayVai.get('met');
                totaldaiyard+= cayVai.get('yds') == null ? 0 : cayVai.get('yds');
                totalkg+= cayVai.get('grossweight') == null ? 0 : cayVai.get('grossweight');
                totallbs+= cayVai.get('grossweight_lbs') == null ? 0 : cayVai.get('grossweight_lbs');
            }
        }

        viewModel.set('totalcay', totalcay);
        viewModel.set('totaldai', totaldai.toFixed(2));
        viewModel.set('totaldaiyard', totaldaiyard.toFixed(2));
        viewModel.set('totalkg', totalkg.toFixed(2));
        viewModel.set('totallbs', totallbs.toFixed(2));
    },

    onFilterValueKhoangKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('WarehouseStore');
        var filterField = this.lookupReference('ValueFilterFieldKhoang'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldKhoang = filters.add({
                id: 'ValueFilterFieldKhoang',
                property: 'spaceString',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldKhoang) {
            filters.remove(this.ValueFilterFieldKhoang);
            this.ValueFilterFieldKhoang = null;
        }
    },
    onFilterValueLotKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('WarehouseStore');
        var filterField = this.lookupReference('ValueFilterFieldLot'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldLot = filters.add({
                id: 'ValueFilterFieldLot',
                property: 'lotnumber',
                value: filterField.value,
                anyMatch: true,
                // exactMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldLot) {
            filters.remove(this.ValueFilterFieldLot);
            this.ValueFilterFieldLot = null;
        }
    },
    onFilterValueMaSPKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('WarehouseStore');
        var filterField = this.lookupReference('ValueFilterFieldMaSP'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldMaSP = filters.add({
                id: 'ValueFilterFieldMaSP',
                property: 'stockinProductString',
                value: filterField.value,
                anyMatch: true,
                // exactMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldMaSP) {
            filters.remove(this.ValueFilterFieldMaSP);
            this.ValueFilterFieldMaSP = null;
        }
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';    
    },
    renderCount: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    },
})