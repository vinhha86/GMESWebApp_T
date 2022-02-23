Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_Edit_Controller',
	init: function() {
        var viewModel = this.getViewModel();
        var orgstore = this.getViewModel().getStore('OrgStore');
		orgstore.loadStore(5);

		var userStore = this.getViewModel().getStore('UserStore');
		userStore.loadStore();

		var listidtype = "13,3";

		var orgtostore = this.getViewModel().getStore('OrgToStore');
		orgtostore.loadStore_allchildren_byorg(listidtype);

		var stockintype = this.getViewModel().getStore('StockinTypeStore');
		stockintype.loadStore(1, 10);

    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData',
                newdata: 'onNewData',
				// urlBack:'onUrlBack'
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
        '#btnPrint':{
            tap: 'onPrint'
        },
        '#btnLuu':{
            tap: 'onSave'
        },
        // '#btnShowToken':{
        //     tap: 'onBtnShowToken'
        // },
        // '#btnDeleteToken':{
        //     tap: 'onBtnDeleteToken'
        // },
        '#TabView':{
            activeItemchange: 'onTabViewActiveItemchange'
        },
    },
    // config.setToken(null);
    onBtnShowToken: function(){
        console.log(config.getToken());
        console.log(GSmartApp.util.State.get('session'));
    },
    onBtnDeleteToken: function(){
        config.setToken(null);
        GSmartApp.util.State.set('session', null);
        console.log(config.getToken());
        console.log(GSmartApp.util.State.get('session'));
    },
    onTabViewActiveItemchange: function(sender, value, oldValue, eOpts){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockinid_link = viewModel.get('stockin.id');
        var lot_stockindId = viewModel.get('lot_stockindId');
        var pkl_stockindId = viewModel.get('pkl_stockindId');
        var cbbox_lotnumber_value = viewModel.get('cbbox_lotnumber_value'); // console.log(cbbox_lotnumber_value);
        var pklRecheck_stockindId = viewModel.get('pklRecheck_stockindId');

        switch(value.title){
            case 'DS vải':
                var selectedDRecord = viewModel.get('selectedDRecord');
                var Stockin_d_Store = viewModel.getStore('Stockin_d_Store');
                // Stockin_d_Store.loadStore_byStockinId(stockinid_link);
                // Stockin_d_Store.removeAll();
                Stockin_d_Store.loadStore_byStockinId_async(stockinid_link);
                Stockin_d_Store.load({
                    scope: this,
                    callback: function(records, operation, success) {
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
                break;
            case 'Kiểm lot':
                // console.log(cbbox_lotnumber_value);
                if(lot_stockindId != null){
                    var selectedLotRecord = viewModel.get('selectedLotRecord');
                    var StockinLotStore = viewModel.getStore('StockinLotStore');
                    // StockinLotStore.removeAll();
                    StockinLotStore.loadStore_byStockinDId_async(lot_stockindId);
                    StockinLotStore.load({
                        scope: this,
                        callback: function(records, operation, success) {
                            if(!success){
                                // this.fireEvent('logout');
                            } else {
                                // me.down('#Stockin_M_Edit_Lot').refresh(); console.log('here');
                                if(cbbox_lotnumber_value != null){
                                    // var stockinlotid_link = selectedLotRecord.get('id');
                                    var storeItems = StockinLotStore.getData().items;
                                    for(var i=0; i<storeItems.length; i++){
                                        var item = storeItems[i];
                                        // if(item.get('id') == stockinlotid_link){
                                        if(item.get('lot_number') == cbbox_lotnumber_value){
                                            var grid = m.getView().down('#Stockin_M_Edit_Lot');
                                            grid.getSelectable().select(item);
                                            viewModel.set('selectedLotRecord', item);
                                        }
                                    }
                                }
                            }
                        }
                    });

                    var cbbox_lot_stockindId = m.getView().down('#cbbox_lot_stockindId');
                    cbbox_lot_stockindId.setValue(lot_stockindId);
                }
                break;
            case 'Kiểm cây':
                if(pkl_stockindId != null){
                    me.down('#cbbox_pkl_stockindId').setValue(pkl_stockindId);
                }
                if(pkl_stockindId != null && cbbox_lotnumber_value != null){
                    var selectedPklRecord = viewModel.get('selectedPklRecord');
                    var StockinPklStore = viewModel.getStore('StockinPklStore');
                    StockinPklStore.loadStore_byStockinDIdAndGreaterThanStatus_async(pkl_stockindId, cbbox_lotnumber_value, -1);
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

                                // if(cbbox_lotnumber_value != null){
                                //     me.down('#cbbox_lotnumber').setValue(cbbox_lotnumber_value);
                                // }
                            }
                        }
                    });

                    if(cbbox_lotnumber_value != null){
                        me.down('#cbbox_lotnumber').setValue(cbbox_lotnumber_value);
                    }
                }
                break;
            case 'Kiểm 10%':
                if(pklRecheck_stockindId != null){
                    me.down('#cbbox_pklRecheck_stockindId').setValue(pklRecheck_stockindId);
                }
                if(pklRecheck_stockindId != null && cbbox_lotnumber_value != null){
                    var selectedPklRecheckRecord = viewModel.get('selectedPklRecheckRecord');
                    var StockinPklRecheckStore = viewModel.getStore('StockinPklRecheckStore');
                    StockinPklRecheckStore.loadStore_byStockinDIdAndEqualStatus_async(pklRecheck_stockindId, cbbox_lotnumber_value, 2);
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

                                // if(cbbox_lotnumber_value != null){
                                //     me.down('#cbbox_lotnumber_recheck').setValue(cbbox_lotnumber_value);
                                // }
                            }
                        }
                    });
                    
                    if(cbbox_lotnumber_value != null){
                        me.down('#cbbox_lotnumber_recheck').setValue(cbbox_lotnumber_value);
                    }
                }
                break;
            case 'DS SP':
                var StockinProduct_Store = viewModel.getStore('StockinProduct_Store');
                StockinProduct_Store.loadStore_byStockinId(stockinid_link);
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

        viewModel.set('stockin.stockindate',new Date());
        viewModel.set('stockin.usercreateid_link', session.user);
        viewModel.set('listepc', new Map());
        viewModel.set('stockin.orgid_to_link', session.orgid_link)
        viewModel.set('stockin.stockintypeid_link', id);
        viewModel.set('stockin.status', -1);

        // set store org from
        if(id == 1) {// mua moi va cap bu thi là nha cung cap
            var orgfromstore = viewModel.getStore('OrgFromStore');
            orgfromstore.loadStore(5, false);
        }else{
            var listidtype = "13,4,8,9";
            var orgfromstore = viewModel.getStore('OrgFromStore');
            orgfromstore.loadStore_byRoot(listidtype);
        }

        console.log(viewModel.get('stockin'));
    },
    onLoadData:function(id,type){
        // console.log('onLoadData: ' + id + ' ' + type);
        var viewModel = this.getViewModel();

        this.getInfo(id);
        // load store các tab
        var Stockin_d_Store = viewModel.getStore('Stockin_d_Store');
        Stockin_d_Store.loadStore_byStockinId(id);
        // var StockinLotStore = viewModel.getStore('StockinLotStore');
        // StockinLotStore.loadStore_byStockinId(id);
    },
    onBackPage: function(){
        // console.log('onBackPage');
        this.redirectTo('stockin_m');
    },
    getInfo: function(id){
        var me = this;
        var viewModel = this.getViewModel();

        var params = new Object();
        params.id = id ;
        GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_getbyid',Ext.JSON.encode(params),
		function(success,response,options ) {
            var response = Ext.decode(response.responseText);
            if(response.respcode == 200) {
                // console.log(response.data);
                var data = response.data;
                data = me.setStockinData(data);
                viewModel.set('stockin', data);
                
                // set store org from
                if(data.stockintypeid_link == 1) {// mua moi va cap bu thi là nha cung cap
                    var orgfromstore = viewModel.getStore('OrgFromStore');
                    orgfromstore.loadStore(5, false);
                }else{
                    var listidtype = "13,4,8,9";
                    var orgfromstore = viewModel.getStore('OrgFromStore');
                    orgfromstore.loadStore_byRoot(listidtype);
                }

                setTimeout(function(){
                    me.onSort();
                }, 50);
            }
		})
    },
    setStockinData: function(stockin){
        if(stockin.unitid_link == null) {
            stockin.unitid_link = 1;
            stockin.unitName = 'MÉT';
        }
        return stockin;
    },
    setStorePklAndPklReCheck: function(stockin){
        var me = this;
        var viewModel = this.getViewModel();
        var data = stockin;
        var viewPkl = this.getView().down('#Stockin_M_Edit_Pkl');
        var storePkl = viewPkl.getStore();
        var viewPklRecheck = this.getView().down('#Stockin_M_Edit_Pkl_Recheck');
        var storePklRecheck = viewPklRecheck.getStore();
        // set pklist store (hiển thị tất cả pkl của các stockin D)
        var storePackinglistArr = new Array();
        var storePackinglistArrStatusLessThan1 = new Array();
        var storePackinglistArrAll = new Array();
        for(var i = 0; i<data.stockin_d.length; i++){
            var stockin_d = data.stockin_d[i];
            var stockin_packinglist = stockin_d.stockin_packinglist == null ? [] : stockin_d.stockin_packinglist;
            for(var j = 0; j<stockin_packinglist.length; j++){
                // console.log(stockin_packinglist[j]);
                storePackinglistArrAll.push(stockin_packinglist[j]);
                // Khi nào api update lưu được status pkl != -1 thì xoá điều kiện or thứ 2 đi
                if(stockin_packinglist[j].status >= 1 || stockin_packinglist[j].status < 1){
                    storePackinglistArr.push(stockin_packinglist[j]);
                }else{
                    storePackinglistArrStatusLessThan1.push(stockin_packinglist[j]);
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

        // set pklist recheck store (hiển thị tất cả pkl của các stockin D co status = 1)
        var storePackinglistRecheckArr = new Array();
        for(var i = 0; i<storePackinglistArr.length; i++){
            if(storePackinglistArr[i].status == 2){
                storePackinglistRecheckArr.push(storePackinglistArr[i]);
            }
        }
        viewModel.set('storePackinglistRecheckArr', storePackinglistRecheckArr);
        // storePklRecheck.setData([]);
        storePklRecheck.removeAll();
        storePklRecheck.insert(0, storePackinglistRecheckArr);

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
    
    
    onSave: function(){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.data = [];
        var stockin = viewModel.get('stockin');

        var stockin_d = stockin.stockin_d;
        if(stockin_d != null){
            for(var i = 0; i < stockin_d.length; i++){
                if(stockin_d[i].id == 0 || typeof stockin_d[i].id === 'string'){
                    stockin_d[i].id = null;
                }

                var stockin_packinglist = stockin_d[i].stockin_packinglist;
                if(stockin_packinglist != null){
                    for(var j = 0; j < stockin_packinglist.length; j++){
                        if(stockin_packinglist[j].id == 0 || typeof stockin_packinglist[j].id === 'string'){
                            stockin_packinglist[j].id = null;
                        }
                        if(stockin_packinglist[j].stockindid_link == 0 || typeof stockin_packinglist[j].stockindid_link === 'string'){
                            stockin_packinglist[j].stockindid_link = null;
                        }
                    }
                }
            }
        }

        var stockin_product = stockin.stockin_product;
        if(stockin_product != null){
            for(var i = 0; i < stockin_product.length; i++){
                if(stockin_product[i].id == 0 || typeof stockin_product[i].id === 'string'){
                    stockin_product[i].id = null;
                }
            }
        }

        //Doi ve trang thai "Dang kiem tra"
        stockin.status = 0;
        
        params.data.push(stockin);
        GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_create', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.toast('Lưu thành công', 3000);
                        // m.redirectTo("stockin_m_main/" + response.id + "/edit");
                        m.getInfo(stockin.id);
                        viewModel.set('selectedDRecord', null);
                        viewModel.set('selectedLotRecord', null);
                        viewModel.set('selectedPklRecheckRecord', null);
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lỗi lập phiếu: ' + response.message, 3000);
                }
        })

        // console.log(stockin);
    },

    // sort store
    onSort: function(){
        var me = this.getView();
        var viewModel = this.getViewModel();
        var Stockin_d_Store = viewModel.getStore('Stockin_d_Store');
        Stockin_d_Store.getSorters().add({
            property: 'skucode',
            direction: 'ASC'
        });

        var StockinLotStore = viewModel.getStore('StockinLotStore');
        StockinLotStore.getSorters().add({
            property: 'lot_number',
            direction: 'ASC'
        });

        var StockinPklStore = viewModel.getStore('StockinPklStore');
        StockinPklStore.getSorters().add({
            property: 'lotnumber',
            direction: 'ASC'
        },{
            property: 'packageid',
            direction: 'ASC'
        });

        var StockinPklRecheckStore = viewModel.getStore('StockinPklRecheckStore');
        StockinPklRecheckStore.getSorters().add({
            property: 'lotnumber',
            direction: 'ASC'
        },{
            property: 'packageid',
            direction: 'ASC'
        });
    }
})