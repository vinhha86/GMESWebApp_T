Ext.define('GSmartApp.view.stock.stock_material_list.StockMaterialListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockMaterialListController',
    init: function () {
        this.onloadPage();
    },
    control: {
        '#btnChuyenKhoang': {
            // click: 'onBtnChuyenKhoang',
            click: 'onBtnChuyenKhoangClick',
        },
    },
    onloadPage: function(){
        var viewModel = this.getViewModel();
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        WarehouseStore.getSorters().add({
            property: 'skuCode',
            direction: 'ASC'
        },{
            property: 'contractcode',
            direction: 'ASC'
        },{
            property: 'lotnumber',
            direction: 'ASC'
        },{
            property: 'packageid',
            direction: 'ASC'
        });
    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },
    renderCount: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;"> Tổng: ' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onBtnChuyenKhoang: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        var selectionModel = me.getSelectionModel();
        var selection = selectionModel.getSelection();

        if(selection.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn cần chọn cây vải',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }else{
            m.showStockListWindow(selection);
        }
        // console.log(selectionModel.getSelection());    
    },
    showStockListWindow: function(selection){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Danh sách khoang',
            closeAction: 'destroy',
            height: 500,
            width: 340,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'StockMenuWindow',
                viewModel: {
                    data: {
                        selection: selection
                    }
                }
            }]
        });
        form.show();

        form.down('StockMenuWindow').getController().on('SelectStock', function (selectedStock) {
            // console.log(selection);
            // console.log(selectedStock);

            var selectionList = new Array();
            for(var i = 0; i < selection.length; i++) {
                selectionList.push(selection[i].data);
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
                        }else{
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: "Lưu chuyển khoang thất bại",
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng'
                                }
                            });
                        }
                    } else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: "Lưu chuyển khoang thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }
                })
            form.close();
        });
    },

    //
    onBtnChuyenKhoangClick: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var objStock = viewModel.get('objStock');
        var record = viewModel.get('record');
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        var selectionModel = me.getSelectionModel();
        var selection = selectionModel.getSelection();

        //
        // console.log(record); return;
        // console.log(selection); return;
        
        if(selection.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn cần chọn cây vải',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
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
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Cần điền đủ thông tin dãy, tầng, khoang hoặc bỏ trống tất cả',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        
        var selectionList = new Array();
        for(var i = 0; i < selection.length; i++) {
            selectionList.push(selection[i].data);
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

        me.setLoading("Đang lưu dữ liệu");

        GSmartApp.Ajax.postJitin('/api/v1/stock/change_stock', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: "Lưu chuyển khoang thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        var WarehouseStore = viewModel.getStore('WarehouseStore');
                        WarehouseStore.load();
                        var StockTreeStore = viewModel.getStore('StockTreeStore');
                        StockTreeStore.load();
                    }else{
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: "Lưu chuyển khoang thất bại: " + response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: "Lưu chuyển khoang thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onFilterValueMaNPLKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('WarehouseStore');
        var filterField = this.lookupReference('ValueFilterFieldMaNPL'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldMaNPL = filters.add({
                id: 'ValueFilterFieldMaNPL',
                property: 'skuCode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldMaNPL) {
            filters.remove(this.ValueFilterFieldMaNPL);
            this.ValueFilterFieldMaNPL = null;
        }
    },
    onFilterValueColorKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('WarehouseStore');
        var filterField = this.lookupReference('ValueFilterFieldColor'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldColor = filters.add({
                id: 'ValueFilterFieldColor',
                property: 'colorname',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldColor) {
            filters.remove(this.ValueFilterFieldColor);
            this.ValueFilterFieldColor = null;
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
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldLot) {
            filters.remove(this.ValueFilterFieldLot);
            this.ValueFilterFieldLot = null;
        }
    },
    onFilterValueProductKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('WarehouseStore');
        var filterField = this.lookupReference('ValueFilterFieldProduct'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldProduct = filters.add({
                id: 'ValueFilterFieldProduct',
                property: 'stockinProductString',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldProduct) {
            filters.remove(this.ValueFilterFieldProduct);
            this.ValueFilterFieldProduct = null;
        }
    },
})