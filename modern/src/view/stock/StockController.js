Ext.define('GSmartApp.view.stock.StockController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockController',
    init: function () {
    },
    control: {
        '#btnBack':{
            tap: 'onBackPage'
        },
        '#Sku_AutoCompleteCbo': {
            beforeQuery: 'Sku_AutoComplete_beforeQuery'
        },
        '#btnResetTree': {
            tap: 'onResetTree'
        },
        '#btnSearch': {
            tap: 'onloadPage'
        },
        // '#btnBackNode': {
        //     tap: 'onbtnBackNode'
        // },
        '#stock': {
            painted: 'onpainted', // sau khi load giao dien
        },
    },
    listen: {
        store: {
            'StockTreeStore': {
                'loadStore_Done': 'onloadStore_Done'
            }
        }

    },
    Sku_AutoComplete_beforeQuery: function(){ 
        var viewModel = this.getViewModel();
        var Sku_AutoComplete = viewModel.getStore('Sku_AutoComplete');
        var typeFrom = 20;
        var typeTo = 30;
        // console.log(Sku_AutoComplete.getProxy());

        var combobox = this.getView().down('#Sku_AutoCompleteCbo');
        // console.log(combobox);
        // console.log(combobox.getQueryParam());
        // console.log(combobox.getInputValue());

        if(combobox.getInputValue() === null || combobox.getInputValue() === ''){
            Sku_AutoComplete.proxy.extraParams = {
                typeFrom: typeFrom,
                typeTo: typeTo,
                code: ''
            }
        }else{
            Sku_AutoComplete.proxy.extraParams = {
                typeFrom: typeFrom,
                typeTo: typeTo,
                code: combobox.getInputValue()
            }
        }
        
    },
    // onbtnBackNode: function(){
    //     var m = this;
    //     var me = this.getView();
    //     var viewModel = this.getViewModel();

    //     var StockMenu = Ext.getCmp('StockMenu');
    //     var root = viewModel.get('root');
    //     console.log(root);
    //     if(root != null)StockMenu.goToNode(root.parentNode);
    // },
    onBackPage: function(){
        // console.log('onBackPage');   
        this.redirectTo("mobilemenu");
    },
    onpainted: function(){
        this.onload();
    },
    onload: function () {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        // me.setMasked({
        //     xtype: 'loadmask',
        //     message: 'Đang tải'
        // });

        var StockTreeStore = viewModel.getStore('StockTreeStore');
        StockTreeStore.loadStore(null, null);
        StockTreeStore.getSorters().add({
            property: 'khoangKhongXacDinh',
            direction: 'ASC'
        },{
            property: 'name_sort',
            direction: 'ASC'
        });
    },
    onloadPage: function () {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        //
        var searchObj = viewModel.get('searchObj');
        // var maHang = searchObj.maHang == null ? null : searchObj.maHang.trim();
        var maHangId = searchObj.maHangId;
        var donHang = searchObj.donHang == null ? null : searchObj.donHang.trim();
        var maSP = searchObj.maSP == null ? null : searchObj.maSP.trim();
        //
        if(isNaN(maHangId)) maHangId = null;
        //

        // me.setMasked({
        //     xtype: 'loadmask',
        //     message: 'Đang tải'
        // });

        var StockTreeStore = viewModel.getStore('StockTreeStore');
        StockTreeStore.loadStore_async(maHangId, donHang, maSP);
        StockTreeStore.load({
			scope: this,
			callback: function(records, operation, success) {
                // me.setMasked(false);
				if(!success){
                    Ext.toast('Lấy thông tin thất bại', 1000);
					// this.fireEvent('logout');
				} else {
                    // var StockMenu = Ext.getCmp('StockMenu');
                    // var root = viewModel.get('root');
                    // if(root != null)StockMenu.goToNode(root.parentNode);

                    // filter cho window ds cay vai
                    viewModel.set('maHangFilter', maHangId);
                    viewModel.set('donHangFilter', donHang);
                    viewModel.set('maSPFilter', maSP);
				}
			}
        });

        //
        this.loadDsKhoang(maHangId, donHang, maSP);
    },
    loadDsKhoang: function(maHangId, donHang, maSP){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        if(donHang == ''){
            donHang = null;
        }
        if(maSP == ''){
            maSP = null;
        }

        var params = new Object();
        params.maHangId = maHangId ;
        params.donHang = donHang;
        params.maSP = maSP;
        GSmartApp.Ajax.postJitin('/api/v1/stock/stockmenu_space_list',Ext.JSON.encode(params),
		function(success,response,options ) {
            var response = Ext.decode(response.responseText);
            if(response.respcode == 200) {
                var space_list = response.space_list;
                var dskhoang = '';
                if(space_list != null){
                    for(var i=0;i<space_list.length;i++) {
                        if(dskhoang == ''){
                            dskhoang+='<div>' + space_list[i] + '</div>';
                        }else{
                            dskhoang+='<div>' + space_list[i] + '</div>';
                        }
                    }
                }
                viewModel.set('dskhoang', dskhoang);
                // console.log(response);
            }
		})
    },
    onResetTree: function(){
        var me = this.getView();
        var viewModel = this.getViewModel();

        viewModel.set('searchObj.maHang', null);
        viewModel.set('searchObj.maHangId', null);
        viewModel.set('searchObj.donHang', null);
        viewModel.set('searchObj.maSP', null);
        var WarehouseStore = viewModel.get('WarehouseStore');
        WarehouseStore.clearFilter();
        WarehouseStore.removeAll();

        viewModel.set('maHangFilter', null);
        viewModel.set('donHangFilter', null);
        viewModel.set('maSPFilter', null);

        this.onloadPage();
    },
    onloadStore_Done: function () {
        var me = this.getView();
        console.log('onloadStore_Done event');
        me.setMasked(false);
    },
    // filter cho danh sach npl (theo 2 txt field maHang va donHang)
    onDonHangFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('WarehouseStore');
        var filterField = this.lookupReference('ValueFilterFieldDonHang'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldDonHang = filters.add({
                id: 'ValueFilterFieldDonHang',
                property: 'contractcode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldDonHang) {
            filters.remove(this.ValueFilterFieldDonHang);
            this.ValueFilterFieldDonHang = null;
        }
    },
    onSelectMaHangId: function(combo, record, eOpts){
        // var viewmodel = this.getViewModel();
        // var store = viewmodel.get('WarehouseStore');
        // var filters = store.getFilters();

        // var maHangId = viewmodel.get('searchObj.maHangId');
        // if(isNaN(maHangId)) maHangId = null;

        // if (maHangId) {
        //     this.ValueFilterFieldmaHangId = filters.add({
        //         id: 'ValueFilterFieldmaHangId',
        //         property: 'skuid_link',
        //         value: maHangId,
        //         exactMatch: true,
        //     });
        // }
        // else if (this.ValueFilterFieldmaHangId) {
        //     filters.remove(this.ValueFilterFieldmaHangId);
        //     this.ValueFilterFieldmaHangId = null;
        // }
    }
})