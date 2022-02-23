Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_StockoutOrder_Edit_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Grant_Plan_StockoutOrder_Edit_ViewController',
    init: function () {
        
    },
    control: {
        '#POrder_Grant_Plan_StockoutOrder_Edit_View': {
            afterrender: 'onAfterrender'
        },
        '#btnThoat': {
            click: 'onThoat',
        },
        '#btnCreate': {
            click: 'onCreate',
        },
        '#btnSave': {
            click: 'onSave',
        },
        '#btnAdd': {
            click: 'onAddWarehouse',
        },
        '#btnRemove': {
            click: 'onRemovePkl',
        },
        '#btnTest': {
            click: 'onTest',
        },
    },
    onTest: function(){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        var date_list = viewModel.get('date_list');
        var pordergrantid_link = viewModel.get('pordergrantid_link');
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        var Stockout_order_pkl_Store = viewModel.getStore('Stockout_order_pkl_Store');

        console.log(WarehouseStore.getData().items);
        console.log(Stockout_order_pkl_Store.getData().items);
        
        // console.log(date_list);
        // console.log(pordergrantid_link);
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    onCreate: function(){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();
        var eventRecord = viewModel.get('eventRecord');
        var pordergrantid_link = viewModel.get('pordergrantid_link');

        var Stockout_order_d_store = viewModel.getStore('Stockout_order_d_store');
        var Stockout_order_d_store_items = Stockout_order_d_store.getData().items;

        // console.log(Stockout_order_d_store_items);
        var Stockout_order_list = new Array();
        for(var i=0; i < Stockout_order_d_store_items.length;i++){
            var stockout_order = new Object();
            stockout_order.id = null
            stockout_order.date_to_vai_yc = Stockout_order_d_store_items[i].get('date_to_vai_yc');
            stockout_order.date_xuat_yc = Stockout_order_d_store_items[i].get('date_xuat_yc');
            stockout_order.orderdate = new Date();
            stockout_order.stockouttypeid_link = 1;
            // stockout_order.orgid_from_link
            // stockout_order.orgid_to_link
            stockout_order.unitid_link = 1;
            // stockout_order.pcontractid_link
            stockout_order.stockout_order_d = new Array();
            stockout_order.stockout_order_d.push(Stockout_order_d_store_items[i].data);
            Stockout_order_list.push(stockout_order);
        }

        if(Stockout_order_list.length == 0){
            return;
        }

        var params = new Object();
        params.data = Stockout_order_list;
        params.pordergrantid_link = pordergrantid_link;

        // console.log(eventRecord);
        // console.log(Stockout_order_list);
        // console.log(pordergrantid_link);
        // return;

        GSmartApp.Ajax.post('/api/v1/stockoutorder/create_YeuCauXuat', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Tạo lệnh xuất thành công",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    m.fireEvent('createStockoutOrder');
                } else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Tạo lệnh xuất thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onSave: function(){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        var stockout_order = viewModel.get('stockout_order');
        var stockout_order_d = stockout_order.stockout_order_d;
        stockout_order.date_to_vai_yc = stockout_order_d[0].date_to_vai_yc;
        stockout_order.date_xuat_yc = stockout_order_d[0].date_xuat_yc;
        // console.log(stockout_order);

        var Stockout_order_list = new Array();
        Stockout_order_list.push(stockout_order);
        var params = new Object();
        params.data = Stockout_order_list;

        GSmartApp.Ajax.post('/api/v1/stockoutorder/save_YeuCauXuat', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Lưu lệnh xuất thành công",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    m.fireEvent('saveStockoutOrder');
                } else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Lưu lệnh xuất thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        var id = viewModel.get('id');
        var eventRecord = viewModel.get('eventRecord');
        var date_list = viewModel.get('date_list');
        var pordergrantid_link = viewModel.get('pordergrantid_link');

        // if(id != null && id != 0){
        //     // console.log(id);
        //     // console.log(pordergrantid_link);
        //     // console.log(eventRecord);
        //     m.loadInfo();
        // }
    },
    // loadInfo: function(){
    //     var m = this;
    //     var me = this.getView();
    //     var viewModel = m.getViewModel();

    //     var id = viewModel.get('id');
    //     var eventRecord = viewModel.get('eventRecord');
    //     var pordergrantid_link = viewModel.get('pordergrantid_link');

    //     var params = new Object();
    //     params.id = id;

    //     GSmartApp.Ajax.post('/api/v1/stockoutorder/getby_id', Ext.JSON.encode(params),
    //         function (success, response, options) {
    //             if (success) {
    //                 var response = Ext.decode(response.responseText);
    //                 console.log(response);
    //                 // console.log(response.data);
    //                 // Ext.Msg.show({
    //                 //     title: "Thông báo",
    //                 //     msg: "Lưu thành công",
    //                 //     buttons: Ext.MessageBox.YES,
    //                 //     buttonText: {
    //                 //         yes: 'Đóng',
    //                 //     }
    //                 // });
    //                 // m.fireEvent('createStockoutOrder');
    //             } else {
    //                 Ext.Msg.show({
    //                     title: "Thông báo",
    //                     msg: "Lấy thông tin thất bại",
    //                     buttons: Ext.MessageBox.YES,
    //                     buttonText: {
    //                         yes: 'Đóng',
    //                     }
    //                 });
    //             }
    //         })
    // },
    onAddWarehouse: function(){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        var Warehouse_View = me.down('#POrder_Grant_Plan_StockoutOrder_Edit_Pkl_Warehouse');
        var Pkl_View = me.down('#POrder_Grant_Plan_StockoutOrder_Edit_Pkl');

        var warehouse_selection = Warehouse_View.getSelectionModel().getSelection();
        // console.log(warehouse_selection);

        // add vao danh sach pkl, remove o danh sach warehouse
        
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        var Stockout_order_pkl_Store = viewModel.getStore('Stockout_order_pkl_Store');

        // console.log(WarehouseStore.getData().items);
        // console.log(Stockout_order_pkl_Store.getData().items);

        var newPkl_list = new Array();
        for(var i=0;i<warehouse_selection.length;i++){
            var warehouse_obj = warehouse_selection[i];
            var newPkl = new Object();
            newPkl.id = null;
            newPkl.stockoutorderid_link = null;
            newPkl.stockoutorderdid_link = null;
            newPkl.spaceString = warehouse_obj.get('spaceString');
            newPkl.lotnumber = warehouse_obj.get('lotnumber');
            newPkl.packageid = warehouse_obj.get('packageid');
            newPkl.epc = warehouse_obj.get('epc');
            newPkl.skuid_link = warehouse_obj.get('skuid_link');
            newPkl.colorid_link = warehouse_obj.get('colorid_link');
            newPkl.width = warehouse_obj.get('width_met');
            newPkl.width_met = warehouse_obj.get('width_met');
            newPkl.width_met_check = 0;
            newPkl.width_yds = warehouse_obj.get('width_yds');
            newPkl.width_yds_check = 0;
            newPkl.met = warehouse_obj.get('met');
            newPkl.metorigin = warehouse_obj.get('met');
            newPkl.metcheck = 0;
            newPkl.ydsorigin = warehouse_obj.get('yds');
            newPkl.ydscheck = 0;
            newPkl.netweight = warehouse_obj.get('netweight');
            newPkl.grossweight = warehouse_obj.get('grossweight');
            newPkl.grossweight_lbs = warehouse_obj.get('grossweight_lbs');
            newPkl.spaceepc_link = warehouse_obj.get('spaceepc_link');
            newPkl.status = 1;
            newPkl.warehouseStatusString = warehouse_obj.get('warehouseStatusString');
            newPkl.date_check = warehouse_obj.get('date_check');
            newPkl_list.push(newPkl);
        }
        WarehouseStore.remove(warehouse_selection);
        WarehouseStore.commitChanges();
        Stockout_order_pkl_Store.insert(0, newPkl_list);
        Stockout_order_pkl_Store.commitChanges();

        // sua thong tin vao stockout_order_d_selected_record
        var stockout_order_pkl_items = Stockout_order_pkl_Store.getData().items;
        var stockout_order_pkl = new Array();
        for(var i=0;i<stockout_order_pkl_items.length;i++){
            stockout_order_pkl.push(stockout_order_pkl_items[i].data);
        }

        var stockout_order_d_selected_record = viewModel.get('stockout_order_d_selected_record');
        stockout_order_d_selected_record.set('stockout_order_pkl', stockout_order_pkl);
        // console.log(stockout_order_d_selected_record); // stockout_order_pkl
        
    },
    onRemovePkl: function(){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        var Warehouse_View = me.down('#POrder_Grant_Plan_StockoutOrder_Edit_Pkl_Warehouse');
        var Pkl_View = me.down('#POrder_Grant_Plan_StockoutOrder_Edit_Pkl');

        // var warehouse_selection = Warehouse_View.getSelectionModel().getSelection();
        // console.log(warehouse_selection);
        var pkl_selection = Pkl_View.getSelectionModel().getSelection();
        // console.log(pkl_selection);

        // add vao danh sach pkl, remove o danh sach warehouse
        
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        var Stockout_order_pkl_Store = viewModel.getStore('Stockout_order_pkl_Store');

        // console.log(WarehouseStore.getData().items);
        // console.log(Stockout_order_pkl_Store.getData().items);
        // return;

        var newWarehouse_list = new Array();
        for(var i=0;i<pkl_selection.length;i++){
            var pkl_obj = pkl_selection[i];
            var newWarehouse = new Object();
            newWarehouse.id = null;
            newWarehouse.spaceString = pkl_obj.get('spaceString');
            newWarehouse.lotnumber = pkl_obj.get('lotnumber');
            newWarehouse.packageid = pkl_obj.get('packageid');
            newWarehouse.epc = pkl_obj.get('epc');
            newWarehouse.skuid_link = pkl_obj.get('skuid_link');
            newWarehouse.colorid_link = pkl_obj.get('colorid_link');
            newWarehouse.width_met = pkl_obj.get('width_met');
            newWarehouse.width_yds = pkl_obj.get('width_yds');
            newWarehouse.met = pkl_obj.get('metorigin');
            newWarehouse.yds = pkl_obj.get('ydsorigin');
            newWarehouse.netweight = pkl_obj.get('netweight');
            newWarehouse.grossweight = pkl_obj.get('grossweight');
            newWarehouse.grossweight_lbs = pkl_obj.get('grossweight_lbs');
            newWarehouse.spaceepc_link = pkl_obj.get('spaceepc_link');
            newWarehouse.warehouseStatusString = pkl_obj.get('warehouseStatusString');
            newWarehouse.date_check = pkl_obj.get('date_check');
            newWarehouse.status = 1;
            newWarehouse_list.push(newWarehouse);
        }
        Stockout_order_pkl_Store.remove(pkl_selection);
        Stockout_order_pkl_Store.commitChanges();
        WarehouseStore.insert(0, newWarehouse_list);
        WarehouseStore.commitChanges();

        // sua thong tin vao stockout_order_d_selected_record
        var stockout_order_pkl_items = Stockout_order_pkl_Store.getData().items;
        var stockout_order_pkl = new Array();
        for(var i=0;i<stockout_order_pkl_items.length;i++){
            stockout_order_pkl.push(stockout_order_pkl_items[i].data);
        }
        var stockout_order_d_selected_record = viewModel.get('stockout_order_d_selected_record');
        stockout_order_d_selected_record.set('stockout_order_pkl', stockout_order_pkl);
    },
})