Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pklist.Stockout_Pklist_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_Pklist_Main_Controller',
    init: function () {
        
    },
    listen: {

    },
    control: {
        '#Stockout_Pklist_Main': {
            afterrender: 'onAfterrender',
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnSelect': {
            click: 'onBeforeSelect',
            // click: 'onSelect',
        },
        '#btnInfo': {
            click: 'onInfo'
        },
        '#btnThemMatTem': {
            click: 'onThemMatTem'
        },
    },
    onInfo: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var skuid_link = viewModel.get('skuid_link');
        var stockout = viewModel.get('stockout');
        var stockoutDRec = viewModel.get('stockoutDRec');

        console.log(stockout);
        console.log(skuid_link);
        console.log(stockoutDRec);
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },

    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var skuid_link = viewModel.get('skuid_link');
        var stockout = viewModel.get('stockout');
        var stockoutDRec = viewModel.get('stockoutDRec');

        var pcontractid_link = stockout.pcontractid_link;
        var productid_link = stockout.productid_link;
        var orgid_from_link = stockout.orgid_from_link;
        if(orgid_from_link == null){
            return;
        }

        var mainView = Ext.getCmp('Stockout_Pklist_Main');
        if(mainView) mainView.setLoading(true);

        if(stockout.stockouttypeid_link == 1){ // xuat cat
            var params = new Object();
            params.stockid_link = orgid_from_link ;
            params.skuid_link = skuid_link ;
            params.pcontractid_link = pcontractid_link ;
            params.productid_link = productid_link ;

            GSmartApp.Ajax.postJitin('/api/v1/warehouse/getMaterialListBySku',Ext.JSON.encode(params),
            function(success,response,options ) {
                if(mainView) mainView.setLoading(false);
                var response = Ext.decode(response.responseText);
                if(response.respcode == 200) {
                    // console.log(response);
                    var data = response.data;
                    var storeData = new Array();
                    storeData = data;

                    viewModel.set('storeData', storeData);

                    var WarehouseStore = viewModel.getStore('WarehouseStore');
                    WarehouseStore.insert(0, storeData);
                    WarehouseStore.setGroupField('nhomCayVai');
                    WarehouseStore.getSorters().add({
                        property: 'spaceString',
                        direction: 'ASC'
                    },{
                        property: 'lotnumber',
                        direction: 'ASC'
                    },{
                        property: 'packageid',
                        direction: 'ASC'
                    });
                    //
                    m.removeSelectedEpc();
                }
            })
        }
        if(stockout.stockouttypeid_link == 2){  // xuat dieu chuyen
            var params = new Object();
            params.stockid_link = orgid_from_link ;
            params.skuid_link = skuid_link ;
            params.pcontractid_link = pcontractid_link ;
            params.productid_link = productid_link ;

            GSmartApp.Ajax.postJitin('/api/v1/warehouse/getMaterialListBySku_xuatDieuChuyen',Ext.JSON.encode(params),
            function(success,response,options ) {
                if(mainView) mainView.setLoading(false);
                var response = Ext.decode(response.responseText);
                if(response.respcode == 200) {
                    // console.log(response);
                    var data = response.data;
                    var storeData = new Array();
                    // storeData = m.setStoreData(data);
                    storeData = data;

                    viewModel.set('storeData', storeData);

                    var WarehouseStore = viewModel.getStore('WarehouseStore');
                    WarehouseStore.insert(0, storeData);
                    WarehouseStore.setGroupField('nhomCayVai');
                    WarehouseStore.getSorters().add({
                        property: 'spaceString',
                        direction: 'ASC'
                    },{
                        property: 'lotnumber',
                        direction: 'ASC'
                    },{
                        property: 'packageid',
                        direction: 'ASC'
                    });
                    //
                    m.removeSelectedEpc();
                }
            })
        }

        // filter
        
        
    },
    removeSelectedEpc: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var skuid_link = viewModel.get('skuid_link');
        var stockout = viewModel.get('stockout');
        var stockoutDRec = viewModel.get('stockoutDRec');

        // console.log(stockout);
        var listSelectedEpc = new Array();
        var stockout_d = stockout.stockout_d;
        for(var i=0; i<stockout_d.length; i++){
            var stockout_packinglist = stockout_d[i].stockout_packinglist;
            for(var j=0; j<stockout_packinglist.length; j++){
                stockout_packinglist_obj = stockout_packinglist[j];
                var epc = stockout_packinglist_obj.epc;
                if(epc != null && epc != ''){
                    listSelectedEpc.push(epc);
                }
            }
        }

        var WarehouseStore = viewModel.getStore('WarehouseStore');
        var items = WarehouseStore.getData().items;
        var listToRemoved = new Array();
        // console.log(items);
        // console.log(listSelectedEpc);
        for(var i=0; i<items.length; i++){
            for(var j=0; j<listSelectedEpc.length; j++){
                if(items[i].get('epc') == listSelectedEpc[j]){
                    listToRemoved.push(items[i]);
                }
            }
        }
        WarehouseStore.remove(listToRemoved);
        WarehouseStore.commitChanges();
    },
    
    // onAfterrender: function(){
    //     var m = this;
    //     var me = this.getView();
    //     var viewModel = this.getViewModel();
    //     var skuid_link = viewModel.get('skuid_link');
    //     var stockout = viewModel.get('stockout');
    //     var stockoutDRec = viewModel.get('stockoutDRec');

    //     var pcontractid_link = stockout.pcontractid_link;
    //     var orgid_from_link = stockout.orgid_from_link;
    //     if(orgid_from_link == null){
    //         return;
    //     }

    //     var mainView = Ext.getCmp('Stockout_Pklist_Main');
    //     if(mainView) mainView.setLoading(true);

    //     var params = new Object();
    //     params.stockid_link = orgid_from_link ;
    //     params.skuid_link = skuid_link ;
    //     params.pcontractid_link = pcontractid_link ;

    //     GSmartApp.Ajax.postJitin('/api/v1/warehouse/getMaterialListBySku',Ext.JSON.encode(params),
	// 	function(success,response,options ) {
    //         if(mainView) mainView.setLoading(false);
    //         var response = Ext.decode(response.responseText);
    //         if(response.respcode == 200) {
	// 			// console.log(response);
    //             var data = response.data;
    //             var storeData = new Array();
    //             storeData = m.setStoreData(data);

    //             viewModel.set('storeData', storeData);

    //             var StockStore = viewModel.getStore('StockStore');
    //             StockStore.insert(0, storeData);
    //             StockStore.getSorters().add({
    //                 property: 'spaceString',
    //                 direction: 'ASC'
    //             });
                
    //             // console.log(storeData);
    //         }
	// 	})
    // },
    setStoreData: function(data){
        var spaceArr = new Array();

        for(var i = 0; i < data.length; i++){
            var spaceString = data[i].spaceString;

            var isNotContain = true;
            for(var j = 0; j < spaceArr.length; j++){
                if(spaceArr[j].spaceString == spaceString){
                    isNotContain = false;
                    spaceArr[j].warehouseList.push(data[i]);
                    break;
                }
            }

            if(isNotContain){
                var newSpaceObj = new Object();
                newSpaceObj.spaceString = spaceString;
                newSpaceObj.warehouseList = new Array();
                newSpaceObj.warehouseList.push(data[i]);
                spaceArr.push(newSpaceObj);
            }
        }

        return spaceArr;
    },
    onItemclick: function(thisView, record, item, index, e, eOpts){
        // console.log(record);
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var pcontractid_link = record.get('id');
        var productid_link = viewModel.get('productid_link');
        viewModel.set('pcontractid_link', pcontractid_link);

        var StockoutD_Store = viewModel.getStore('StockoutD_Store');

        var mainView = Ext.getCmp('Stockout_Pcontract_Main_View');
        if(mainView) mainView.setLoading(true);

        var params = new Object();
        params.pcontractid_link = pcontractid_link ;
        params.productid_link = productid_link ;
        GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/getbom_by_product_multithread',Ext.JSON.encode(params),
		function(success,response,options ) {
            if(mainView) mainView.setLoading(false);
            var response = Ext.decode(response.responseText);
            if(response.respcode == 200) {
				// console.log(response.data);
                var dataMaterial = new Array();
                for(var i = 0; i < response.data.length; i++){
                    var product_type = response.data[i].product_type;
                    if(product_type == '20'){
                        var isNotContain = true;
                        for(var j = 0; j < dataMaterial.length; j++){
                            if(dataMaterial[j].materialid_link == response.data[i].materialid_link){
                                isNotContain = false;
                            }
                        }
                        if(isNotContain){
                            dataMaterial.push(response.data[i]);
                        }
                    }
                }
                StockoutD_Store.removeAll();
                StockoutD_Store.insert(0, dataMaterial);
            }
		})
    },

    onBeforeSelect: function(){
        // kiểm tra các cây vải đã nằm trong phiếu xuất khác chưa, nếu có -> thông báo
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        var WarehouseStoreData = WarehouseStore.getData();
        var allRecords = (WarehouseStore.getData().getSource() || WarehouseStore.getData()).getRange();

        var listCayVaiThem = new Array();

        // var items = WarehouseStoreData.items;
        var items = allRecords;

        // console.log(items);

        var totalcay = 0;
        var totaldai = 0;
        var totaldaiyard = 0;
        var totalkg = 0;
        var totallbs = 0;
        for(var i=0; i<items.length; i++){
            var cayVai = items[i].data;
            if(cayVai.isChecked){
                totalcay++;
                totaldai+= cayVai.met == null ? 0 : cayVai.met;
                totaldaiyard+= cayVai.yds == null ? 0 : cayVai.yds;
                totalkg+= cayVai.grossweight == null ? 0 : cayVai.grossweight;
                totallbs+= cayVai.grossweight_lbs == null ? 0 : cayVai.grossweight_lbs;
                listCayVaiThem.push(cayVai);
            }
        }

        me.setLoading(true);
        // console.log(listCayVaiThem);
        var params = new Object();
        params.data = listCayVaiThem;
        params.stockoutid_link = isNaN(stockout.id) ? null : stockout.id;

        GSmartApp.Ajax.postJitin('/api/v1/warehouse/check_warehouse_in_stockout', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                var response = Ext.decode(response.responseText);
                if (success) {
                    if(response.respcode == 200){
                        // console.log(response);
                        if(response.message == ""){
                            m.onSelect();
                        }else{
                            var returnMessage = '';
                            var myArray = response.message.split("%seperator%");
                            for(var i = 0; i < myArray.length; i++){
                                if(myArray[i] != ''){
                                    returnMessage += myArray[i] + '<br />';
                                }
                            }
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: returnMessage,
                                buttons: Ext.MessageBox.YESNO,
                                buttonText: {
                                    yes: 'Thêm',
                                    no: 'Thoát',
                                },
                                fn: function (btn) {
                                    if (btn === 'yes') {
                                        m.onSelect();
                                    }
                                }
                            });
                        }
                    }else{
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lấy thông tin thất bại: bạn hãy kiểm tra lại kết nối mạng',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lấy thông tin thất bại: bạn hãy kiểm tra lại kết nối mạng',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onSelect: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        var WarehouseStoreData = WarehouseStore.getData();
        var allRecords = (WarehouseStore.getData().getSource() || WarehouseStore.getData()).getRange();

        var listCayVaiThem = new Array();

        // var items = WarehouseStoreData.items;
        var items = allRecords;

        // console.log(items);

        var totalcay = 0;
        var totaldai = 0;
        var totaldaiyard = 0;
        var totalkg = 0;
        var totallbs = 0;
        for(var i=0; i<items.length; i++){
            var cayVai = items[i].data;
            if(cayVai.isChecked){
                totalcay++;
                totaldai+= cayVai.met == null ? 0 : cayVai.met;
                totaldaiyard+= cayVai.yds == null ? 0 : cayVai.yds;
                totalkg+= cayVai.grossweight == null ? 0 : cayVai.grossweight;
                totallbs+= cayVai.grossweight_lbs == null ? 0 : cayVai.grossweight_lbs;
                listCayVaiThem.push(cayVai);
            }
        }

        m.fireEvent('ThemCayVai', listCayVaiThem, totalcay, totaldai, totaldaiyard, totalkg, totallbs);
    },
    onThemMatTem: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var skuid_link = viewModel.get('skuid_link');
        var stockout = viewModel.get('stockout');
        var stockoutDRec = viewModel.get('stockoutDRec');

        var stockoutid_link = stockout.id;
        var stockoutdid_link = stockoutDRec.get('id');

        if(stockoutid_link == 0 || stockoutid_link == null){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: 'Bạn cần phải lưu phiếu xuất kho',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        if(stockoutdid_link == 0 || stockoutdid_link == null || isNaN(stockoutdid_link)){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: 'Bạn cần phải lưu phiếu xuất kho',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

        var form = Ext.create('Ext.window.Window', {
            // height: '90%',
            // width: 1200,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thêm cây vải mất tem',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Stockout_Pklist_Add_NoLabelPkl_View',
                viewModel: {
                    data: {
                        skuid_link: skuid_link,
                        stockout: stockout,
                        stockoutDRec: stockoutDRec
                    }
                }					
            }],
        });
        form.show();

        form.down('#Stockout_Pklist_Add_NoLabelPkl_View').getController().on('Thoat', function () {
            form.close();
        })

        form.down('#Stockout_Pklist_Add_NoLabelPkl_View').getController().on('themMatTem', function () {
            m.fireEvent('themMatTem');
            form.close();
        })

        // m.fireEvent('ThemCayVaiMatTem', cayVaiThem );
    }

})