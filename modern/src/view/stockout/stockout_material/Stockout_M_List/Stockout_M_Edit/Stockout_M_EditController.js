Ext.define('GSmartApp.view.stockout.stockout_material.stockout_m_list.stockout_m_edit.Stockout_M_EditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_M_EditController',
	init: function() {
        
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData',
                // newdata: 'onNewData',
				// // urlBack:'onUrlBack'
            }
        }
	},
    control:{
		'#btnThuGon': {
			tap: 'onhiddenMaster'
		},
		'#btnMoRong': {
			tap: 'onhiddenMaster'
		},
        '#btnBack':{
            tap: 'onBackPage'
        },
        '#btnHome':{
            tap: 'onBtnHomeTap'
        },
        '#TabView':{
            activeItemchange: 'onTabViewActiveItemchange'
        },
    },
    onTabViewActiveItemchange: function(sender, value, oldValue, eOpts){
        var m = this;
        var viewModel = this.getViewModel();
        var stockoutid_link = viewModel.get('stockout.id');
        var pkl_stockoutdId = viewModel.get('pkl_stockoutdId');
        var pklRip_stockoutdId = viewModel.get('pklRip_stockoutdId');

        switch(value.title){
            case 'DS vải':
                var selectedDRecord = viewModel.get('selectedDRecord');
                var Stockout_d = viewModel.getStore('Stockout_d');
                // Stockout_d.loadStore_byStockoutId(stockoutid_link); // loadStore_byStockoutId_async
                Stockout_d.loadByStockoutID_async(stockoutid_link);
                Stockout_d.load({
                    scope: this,
                    callback: function(records, operation, success) {
                        if(!success){
                            // this.fireEvent('logout');
                        } else {
                            if(selectedDRecord != null){
                                var storeItems = Stockout_d.getData().items;
                                for(var i=0; i<storeItems.length; i++){
                                    var item = storeItems[i];
                                    if(item.get('id') == selectedDRecord.get('id')){
                                        var grid = m.getView().down('#Stockout_M_Edit_D');
                                        grid.getSelectable().select(item);
                                        viewModel.set('selectedDRecord', item);
                                        viewModel.set('pkl_stockoutdId', item.get('id'));
                                        viewModel.set('pklRip_stockoutdId', item.get('id'));
                                    }
                                }
                            }
                        }
                    }
                });
                break;
            case 'DS cây':
                if(pkl_stockoutdId != null){
                    var selectedPklRecord = viewModel.get('selectedPklRecord');
                    var stockout_pklist = viewModel.getStore('stockout_pklist');
                    stockout_pklist.loadstore_ByStockoutDId_async(pkl_stockoutdId);
                    stockout_pklist.load({
                        scope: this,
                        callback: function(records, operation, success) {
                            if(!success){
                                // this.fireEvent('logout');
                            } else {
                                if(selectedPklRecord != null){
                                    var stockoutpklid_link = selectedPklRecord.get('id');
                                    var storeItems = stockout_pklist.getData().items;
                                    for(var i=0; i<storeItems.length; i++){
                                        var item = storeItems[i];
                                        if(item.get('id') == stockoutpklid_link){
                                            var grid = m.getView().down('#Stockout_M_Edit_Pkl');
                                            grid.getSelectable().select(item);
                                            viewModel.set('selectedPklRecord', item);
                                        }
                                    }
                                }
                            }
                        }
                    });

                    var cbbox_pkl_stockoutdId = m.getView().down('#cbbox_pkl_stockoutdId');
                    cbbox_pkl_stockoutdId.setValue(pkl_stockoutdId);
                }
                break;
            case 'Xé vải':
                if(pklRip_stockoutdId != null){
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

                    var cbbox_pklRip_stockoutdId = m.getView().down('#cbbox_pklRip_stockoutdId');
                    cbbox_pklRip_stockoutdId.setValue(pklRip_stockoutdId);
                }
                break;
            default: 
                console.log('tab title không tồn tại');
                break;
        }
    },
    
    onhiddenMaster: function () {
        var me = this.getView();
		var viewModel = this.getViewModel();
		var formMaster = me.down('#infoFields');
		// var isHidden = formMaster.getHeight() > 0 ? false : true; console.log(isHidden);
        var IsformMaster = viewModel.get('IsformMaster');
        if(IsformMaster){
            viewModel.set('IsformMaster', false);
		    formMaster.setHidden(true);
        }else{
            viewModel.set('IsformMaster', true);
            formMaster.setHidden(false);
        }
	},
    onPrint: function(){
        console.log('print btn');
    },
    onBtnHomeTap: function(){
        this.redirectTo("mobilemenu");
    },
    onNewData:function(type, id){
        console.log('onNewData');
        var viewModel = this.getViewModel();
        var session = GSmartApp.util.State.get('session');
        console.log(session);

        viewModel.set('stockout.stockoutdate',new Date());
        viewModel.set('stockout.usercreateid_link', session.user);
        viewModel.set('listepc', new Map());
        viewModel.set('stockout.orgid_to_link', session.orgid_link)
        viewModel.set('stockout.stockouttypeid_link', id);
        viewModel.set('stockout.status', -1);

        // set store org from
        if(id == 1) {// mua moi va cap bu thi là nha cung cap
            var orgfromstore = viewModel.getStore('OrgFromStore');
            orgfromstore.loadStore(5, false);
        }else{
            var listidtype = "13,4,8,9";
            var orgfromstore = viewModel.getStore('OrgFromStore');
            orgfromstore.loadStore_byRoot(listidtype);
        }

        console.log(viewModel.get('stockout'));
    },
    onLoadData:function(id,type){
        console.log('onLoadData: ' + id + ' ' + type);
        var viewModel = this.getViewModel();

        this.getInfo(id);
        // load store các tab
        var Stockout_d = viewModel.getStore('Stockout_d');
        Stockout_d.loadByStockoutID(id);
        // var StockoutLotStore = viewModel.getStore('StockoutLotStore');
        // StockoutLotStore.loadStore_byStockoutId(id);
    },
    onBackPage: function(){
        // console.log('onBackPage');
        this.redirectTo('stockout_m');
    },
    getInfo: function(id){
        var me = this;
        var viewModel = this.getViewModel();

        var params = new Object();
        params.id = id ;
        GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_getbyid',Ext.JSON.encode(params),
		function(success,response,options ) {
            var response = Ext.decode(response.responseText);
            if(response.respcode == 200) {
                var stockout =  response.data;
                stockout = me.setStockoutData(stockout);
                viewModel.set('stockout', stockout); 

                setTimeout(function(){
                    me.onSort();
                }, 50);

                // console.log(stockout);
            }
		})
    },
    setStockoutData:function(stockout){
        if(stockout.unitid_link == null){ // lấy mặc định là met nếu null
            stockout.unitid_link = 1;
            stockout.unit_name = 'MÉT';
        }
        return stockout;
    },
    setStorePklAndPklReCheck: function(stockout){
        var me = this;
        var viewModel = this.getViewModel();
        var data = stockout;
        var viewPkl = this.getView().down('#Stockout_M_Edit_Pkl');
        var storePkl = viewPkl.getStore();
        var viewPklRip = this.getView().down('#Stockout_M_Edit_Pkl_Rip');
        var storePklRip = viewPklRip.getStore();
        // set pklist store (hiển thị tất cả pkl của các stockout D)
        var storePackinglistArr = new Array();
        var storePackinglistArrStatusLessThan1 = new Array();
        var storePackinglistArrAll = new Array();
        for(var i = 0; i<data.stockout_d.length; i++){
            var stockout_d = data.stockout_d[i];
            var stockout_packinglist = stockout_d.stockout_packinglist == null ? [] : stockout_d.stockout_packinglist;
            for(var j = 0; j<stockout_packinglist.length; j++){
                // console.log(stockout_packinglist[j]);
                storePackinglistArrAll.push(stockout_packinglist[j]);
                // Khi nào api update lưu được status pkl != -1 thì xoá điều kiện or thứ 2 đi
                if(stockout_packinglist[j].status >= 1 || stockout_packinglist[j].status < 1){
                    storePackinglistArr.push(stockout_packinglist[j]);
                }else{
                    storePackinglistArrStatusLessThan1.push(stockout_packinglist[j]);
                }
            }
        }
        viewModel.set('storePackinglistArr', storePackinglistArr);
        viewModel.set('storePackinglistArrStatusLessThan1', storePackinglistArrStatusLessThan1);
        viewModel.set('storePackinglistArrAll', storePackinglistArrAll);
        // storePkl.setData([]);
        // me.setStorePkl(storePackinglistArr);
        storePkl.removeAll();
        storePkl.insert(0, storePackinglistArr);
        // console.log(storePackinglistArr);
        // console.log(storePkl);

        // set pklist recheck store (hiển thị tất cả pkl của các stockout D co status = 1)
        var storePackinglistRipArr = new Array();
        for(var i = 0; i<storePackinglistArr.length; i++){
            if(storePackinglistArr[i].status == 2){
                storePackinglistRipArr.push(storePackinglistArr[i]);
            }
        }
        viewModel.set('storePackinglistRipArr', storePackinglistRipArr);
        // storePklRip.setData([]);
        storePklRip.removeAll();
        storePklRip.insert(0, storePackinglistRipArr);

    },
    setPklAndPklStatusLessThan1: function(storePackinglistArrAll){
        var viewModel = this.getViewModel();
        var storePackinglistArr = new Array();
        var storePackinglistArrStatusLessThan1 = new Array();
        for(var i=0; i<storePackinglistArrAll.length; i++){
            // Khi nào api update lưu được status pkl != -1 thì xoá điều kiện or thứ 2 đi
            if(storePackinglistArrAll[i].status >= 1 || storePackinglistArrAll[i].status < 1){
                storePackinglistArr.push(storePackinglistArrAll[i]);
            }else{
                storePackinglistArrStatusLessThan1.push(storePackinglistArrAll[i]);
            }
        }
        viewModel.set('storePackinglistArr', storePackinglistArr);
        viewModel.set('storePackinglistArrStatusLessThan1', storePackinglistArrStatusLessThan1);
    },
    setStockoutLotForStockoutD: function(stockout){
        var data = stockout;
        for(var i=0; i<data.stockout_d.length; i++){
            var stockoutD = data.stockout_d[i];
            var stockoutDLot = '';
            if(stockoutD.skuid_link != null){
                var materialid_link = stockoutD.skuid_link;
                for(var j=0; j<stockout.stockout_lot.length; j++){
                    var stockoutLot = stockout.stockout_lot[j];
                    var result = '';
                    result+= stockoutLot.lot_number == null ? '' : stockoutLot.lot_number;
					result+= stockoutLot.totalpackage == null ? '' : ' (' +  stockoutLot.totalpackage + ')';
					// result+= stockoutLot.space == null ? '' : ' ' + stockoutLot.space;
					
					if(stockoutLot.materialid_link == materialid_link) {
						if(stockoutDLot == '') {
							stockoutDLot += result;
						}else {
							stockoutDLot += '; ' + result;
						}
					}
                }
            }
            stockoutD.stockoutDLot = stockoutDLot;
        }
        // console.log(data);
        return data;
    },
    
    setDataStockout: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');
        var stockout_d = viewModel.get('stockout.stockout_d');
        var stockout_lot = viewModel.get('stockout.stockout_lot');
        var storePackinglistArr = viewModel.get('storePackinglistArr');
        var storePackinglistArrAll = viewModel.get('storePackinglistArrAll');

        // Lot data
        var viewLot = this.getView().down('#Stockout_M_Edit_Lot');
        var storeLot = viewLot.getStore();
        for(var i = 0; i < stockout_lot.length; i++){
            var totalmetcheck = 0;
            var totalydscheck = 0;
            var grossweight_check = 0;
            var totalpackagepklist = 0;
            for(var j = 0; j < storePackinglistArrAll.length; j++){
                var pkl = storePackinglistArrAll[j];
                if(stockout_lot[i].lot_number.toUpperCase() == pkl.lotnumber.toUpperCase()){
                    totalmetcheck+=pkl.met_check;
                    totalydscheck+=pkl.ydscheck;
                    grossweight_check+=pkl.grossweight_check;
                    totalpackagepklist++;
                }
            }
            stockout_lot[i].totalmetcheck = totalmetcheck;
            stockout_lot[i].totalydscheck = totalydscheck;
            stockout_lot[i].grossweight_check = grossweight_check;
            stockout_lot[i].totalpackagepklist = totalpackagepklist;
        }
        viewModel.set('stockout.stockout_lot', stockout_lot);
        // storeLot.setData([]);
        storeLot.removeAll();
        storeLot.insert(0, stockout_lot);

        // StockoutD data
        var viewD = this.getView().down('#Stockout_M_Edit_D');
        var storeD = viewD.getStore();
        for(var i = 0; i < stockout_d.length; i++){
            stockout_d[i].stockout_packinglist = [];
            var totalmet_check = 0;
            var totalydscheck = 0;
            var grossweight = 0;
            for(var j = 0; j < storePackinglistArrAll.length; j++){
                var pkl = storePackinglistArrAll[j];
                if(stockout_d[i].skuid_link == pkl.skuid_link){
                    stockout_d[i].stockout_packinglist.push(pkl);
                    totalmet_check+=pkl.met_check;
                    totalydscheck+=pkl.ydscheck;
                    grossweight+=pkl.grossweight;
                }
            }
            stockout_d[i].totalmet_check = totalmet_check;
            stockout_d[i].totalydscheck = totalydscheck;
            stockout_d[i].grossweight = grossweight;
        }
        viewModel.set('stockout.stockout_d', stockout_d);
        // storeD.setData([]);
        storeD.removeAll();
        storeD.insert(0, stockout_d);

        // console.log(stockout);
        // console.log(storePackinglistArr);
    },
    onSave: function(){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.data = [];
        var stockout = viewModel.get('stockout');

        var stockout_d = stockout.stockout_d;
        if(stockout_d != null){
            for(var i = 0; i < stockout_d.length; i++){
                if(stockout_d[i].id == 0 || typeof stockout_d[i].id === 'string'){
                    stockout_d[i].id = null;
                }

                var stockout_packinglist = stockout_d[i].stockout_packinglist;
                if(stockout_packinglist != null){
                    for(var j = 0; j < stockout_packinglist.length; j++){
                        if(stockout_packinglist[j].id == 0 || typeof stockout_packinglist[j].id === 'string'){
                            stockout_packinglist[j].id = null;
                        }
                        if(stockout_packinglist[j].stockoutdid_link == 0 || typeof stockout_packinglist[j].stockoutdid_link === 'string'){
                            stockout_packinglist[j].stockoutdid_link = null;
                        }
                    }
                }
            }
        }

        var stockout_lot = stockout.stockout_lot;
        if(stockout_lot != null){
            for(var i = 0; i < stockout_lot.length; i++){
                if(stockout_lot[i].id == 0 || typeof stockout_lot[i].id === 'string'){
                    stockout_lot[i].id = null;
                }
            }
        }

        var stockout_product = stockout.stockout_product;
        if(stockout_product != null){
            for(var i = 0; i < stockout_product.length; i++){
                if(stockout_product[i].id == 0 || typeof stockout_product[i].id === 'string'){
                    stockout_product[i].id = null;
                }
            }
        }

        //Doi ve trang thai "Dang kiem tra"
        stockout.status = 0;
        
        params.data.push(stockout);
        GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_create', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.toast('Lưu thành công', 3000);
                        // m.redirectTo("stockout_m_main/" + response.id + "/edit");
                        m.getInfo(stockout.id);
                        viewModel.set('selectedDRecord', null);
                        viewModel.set('selectedLotRecord', null);
                        viewModel.set('selectedPklRipRecord', null);
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lỗi lập phiếu: ' + response.message, 3000);
                }
        })

        // console.log(stockout);
    },

    // sort store
    onSort: function(){
        var me = this.getView();
        var viewModel = this.getViewModel();
        var Stockout_d = viewModel.getStore('Stockout_d');
        Stockout_d.getSorters().add({
            property: 'skucode',
            direction: 'ASC'
        });

        var stockout_pklist = viewModel.getStore('stockout_pklist');
        stockout_pklist.getSorters().add({
            property: 'lotnumber',
            direction: 'ASC'
        },{
            property: 'packageid',
            direction: 'ASC'
        });

        var stockout_pklist_rip = viewModel.getStore('stockout_pklist_rip');
        stockout_pklist_rip.getSorters().add({
            property: 'lotnumber',
            direction: 'ASC'
        },{
            property: 'packageid',
            direction: 'ASC'
        });
    }
})