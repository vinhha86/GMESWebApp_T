Ext.define('GSmartApp.view.stock.stock_material.StockMaterialList_MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.StockMaterialList_MainController',
	init: function () {

	},
	control: {
        '#btnChuyenKhoang':{
            // tap: 'onBtnChuyenKhoang', // stocktree
            tap: 'onBtnChuyenKhoangTap',
        },
        '#btnBack':{
            tap: 'onbtnBack',
        },
        '#btnHome':{
            tap: 'onBtnHomeTap',
        },
	},
    onBtnHomeTap: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        m.fireEvent('close-gohome');
    },
    onbtnBack:function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        m.fireEvent('close');
    },
    onBtnChuyenKhoangTap: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var objStock = viewModel.get('objStock');
        var record = viewModel.get('record');
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        var StockMaterialList = me.down('#StockMaterialList');
        var selectable = StockMaterialList.getSelectable();
        var selection = selectable.getSelection().getSelected();

        //
        // console.log(record); return;

        //
        if(selection.length == 0){
            Ext.toast('Bạn cần chọn cây vải', 2000);
            return;
        }
        
        //
        var count = 0;
        if(objStock.row !== null && objStock.row !== ''){
            count++;
        }
        if(objStock.space !== null && objStock.space !== ''){
            count++;
        }
        if(objStock.floor !== null && objStock.floor !== ''){
            count++;
        }
        if(count>0 && count<3){
            Ext.toast('Cần điền đủ thông tin dãy, tầng, khoang hoặc bỏ trống tất cả', 2000);
            return;
        }

        //
        var selectionList = new Array();
        for(var i = 0; i < selection.items.length; i++) {
            selectionList.push(selection.items[i].data);
        }

        var stockTreeObj = new Object();
        // stockTreeObj.floorid = selectedStock.floorid;
        // stockTreeObj.orgid_link = record.orgid_link;
        // stockTreeObj.rowid_link = selectedStock.rowid_link;
        // stockTreeObj.spacename = selectedStock.spacename;

        var params = new Object();
        params.selection = selectionList;
        params.selectedStock = stockTreeObj;
        params.orgid_link = record.get('orgid_link');
        if(count == 3){
            params.row = objStock.row;
            params.space = objStock.space;
            params.floor = objStock.floor;
        }

        GSmartApp.Ajax.postJitin('/api/v1/stock/change_stock', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.respcode == 200) {
                        var WarehouseStore = viewModel.getStore('WarehouseStore');
                        WarehouseStore.load();
                        m.fireEvent('reloadStore');
                    }else{
                        Ext.toast("Lưu chuyển khoang thất bại: " + response.message, 2000);
                    }
                } else {
                    Ext.toast("Lưu chuyển khoang thất bại", 2000);
                }
            })
    },

    onBtnChuyenKhoang: function(){ // stocktree
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        var StockMaterialList = me.down('#StockMaterialList');
        var selectable = StockMaterialList.getSelectable();
        var selection = selectable.getSelection().getSelected();

        if(selection.length == 0){
            Ext.toast('Bạn cần chọn cây vải', 2000);
            return;
        }else{
            m.showStockListWindow(selection);
        }
    },
    showStockListWindow: function(selection){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var dialog = Ext.create({
            xtype: 'dialog',
            // id: 'StockMenuWindow_Main_dialog',
            itemId: 'StockMenuWindow_Main_dialog',
            title: 'DS khoang',
            width: '100%',
            height: '100%',
            zIndex: 2,
            // maxWidth: 300,
            // maxHeight: 600,
            header: true,
            closable: true,
            closeAction: 'destroy',
            maximizable: false,
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
                xtype: 'StockMenuWindow_Main',
                // xtype: 'StockMaterialList',
                viewModel: {
                    data: {
                        // selection: selection
                    }
                }
            }],
        });
        dialog.show();

        dialog.down('#StockMenuWindow_Main').getController().on('SelectStock', function (selectedStock) {
            // console.log(selection);
            // console.log(selectedStock);
            var selectionList = new Array();
            for(var i = 0; i < selection.items.length; i++) {
                selectionList.push(selection.items[i].data);
            }

            var stockTreeObj = new Object();
            stockTreeObj.floorid = selectedStock.floorid;
            stockTreeObj.name = selectedStock.name;
            stockTreeObj.orgid_link = selectedStock.orgid_link;
            stockTreeObj.rowid_link = selectedStock.rowid_link;
            stockTreeObj.spaceepc = selectedStock.spaceepc;
            stockTreeObj.spacename = selectedStock.spacename;

            var params = new Object();
            params.selection = selectionList;
            params.selectedStock = stockTreeObj;

            GSmartApp.Ajax.postJitin('/api/v1/stock/change_stock', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            var WarehouseStore = viewModel.getStore('WarehouseStore');
                            WarehouseStore.load();
                            dialog.close();
                        }else{
                            Ext.toast("Lưu chuyển khoang thất bại", 2000);
                        }
                    } else {
                        Ext.toast("Lưu chuyển khoang thất bại", 2000);
                    }
                })
        });
    },
    filterWarehouseStore: function(){
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('WarehouseStore');

        var maHangFilter = viewModel.get('maHangFilter');
        var donHangFilter = viewModel.get('donHangFilter') == null ? '' : viewModel.get('donHangFilter').toLowerCase();
        var materialListFilter = viewModel.get('materialListFilter') == null ? '' : viewModel.get('materialListFilter').toLowerCase(); // filter field

        store.clearFilter();
        store.filterBy(function(rec) { //toLowerCase() // includes()
            var isOK = true;
            var contractcode = rec.get('contractcode') == null ? '' : rec.get('contractcode').toLowerCase();
            if(
                !contractcode.includes(donHangFilter)
            ){
                isOK = false;
                return isOK;
            }
            if(maHangFilter != null && rec.get('skuid_link') != maHangFilter){
                isOK = false;
                return isOK;
            }

            if(
                !rec.get('skuCode').toLowerCase().includes(materialListFilter) &&
                // !rec.get('colorname').toLowerCase().includes(materialListFilter) &&
                !rec.get('lotnumber').toLowerCase().includes(materialListFilter) &&
                // !rec.get('invoice').toLowerCase().includes(materialListFilter) &&
                !rec.get('contractcode').toLowerCase().includes(materialListFilter)
                // !Ext.Date.format(rec.get('timecreate'),'d/m/y').toLowerCase().includes(materialListFilter)
            ){
                isOK = false;
                return isOK;
            }

            return isOK;
        });
    }
})