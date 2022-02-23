Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_StockoutOrder_Edit.POrder_Grant_Plan_StockoutOrder_Edit_DateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Grant_Plan_StockoutOrder_Edit_DateController',
    init: function () {
        
    },
    listen: {

    },
    control: {
        '#POrder_Grant_Plan_StockoutOrder_Edit_Date': {
            afterrender: 'onAfterrender'
        },
        // '#btnThoat': {
        //     click: 'onThoat'
        // },
        '#btnSelect': {
            click: 'onSelect'
        },
    },
    // onThoat: function(){
    //     this.fireEvent('Thoat');
    // },
    onSelect: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var DateStore = viewModel.getStore('DateStore');
        var select = me.getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Bạn phải chọn ít nhất một ngày",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }else{
            m.selectDate(select);
        }
    },
    selectDate: function(select){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        // var pordergrant = viewModel.get('pordergrant');
        // var pordergrantid_link = pordergrant.get('id');
        var pordergrantid_link = viewModel.get('pordergrantid_link');
        
        // console.log(select);
        // console.log(pordergrantid_link);
        // return;

        // this.fireEvent('createStockoutOrder_popup', select, pordergrantid_link);
        var date_list = new Array();
        for(var i=0; i<select.length; i++){
            date_list.push(select[i].get('date'));
        }
        m.loadBalanceInfo(date_list);
    },
    loadBalanceInfo: function(date_list){
        // load danh sách vải dựa theo ngày chọn, pordergrant
        // dựa theo số lượng sản phẩm tính ra số m yêu cầu
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();
        var stockout_order = viewModel.get('stockout_order');
        var id = stockout_order == null ? null : stockout_order.id;

        var pordergrantid_link = viewModel.get('pordergrantid_link');

        me.setLoading(true);
        var params = new Object();
        params.date_list = date_list;
        params.pordergrantid_link = pordergrantid_link;
        params.balance_limit = 1;

        GSmartApp.Ajax.post('/api/v1/balance/cal_balance_bypordergrant_date', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        // console.log(response);
                        var responseData = response.data;
                        if(id == null){
                            m.setDStoreDataNew(responseData, date_list);
                        }else{
                            m.setDStoreDataOld(responseData);
                        }
                        // console.log(responseData);
                    }
                }
            }
        )
    },
    setDStoreDataOld: function(responseData){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        var Stockout_order_d_store = viewModel.getStore('Stockout_order_d_store');
        var items = Stockout_order_d_store.getData().items;
        
        console.log(responseData);
        console.log(items);

        for(var i = 0; i < items.length; i++) {
            var material_skuid_link = items[i].get('material_skuid_link');
            for(var j = 0; j < responseData.length; j++) {
                var mat_skuid_link = responseData[j].mat_skuid_link;
                if(mat_skuid_link == material_skuid_link){
                    items[i].set('totalmet', responseData[j].mat_sku_demand);
                    items[i].set('totalyds', responseData[j].mat_sku_demand * 1.094);
                }
            }
        }

        // Stockout_order_d_store.removeAll();
        // Stockout_order_d_store.insert(0, storeData);
        Stockout_order_d_store.commitChanges();
    },
    setDStoreDataNew: function(responseData, date_list){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        var date = m.getEarliestDate(date_list);
        var dateXuat = new Date().setDate(date.getDate()-2);
        var dateTo = new Date().setDate(date.getDate()-3);

        var dateXuat = new Date(date.getFullYear(), date.getMonth(), date.getDate()-2, 0, 0, 0, 0);
        var dateTo = new Date(date.getFullYear(), date.getMonth(), date.getDate()-3, 0, 0, 0, 0);

        // console.log(date);
        // console.log(dateXuat);
        // console.log(dateTo);

        // dateXuat = new Date(dateXuat);
        // dateTo = new Date(dateTo);
        // console.log(dateXuat);
        // console.log(dateTo);

        var storeData = new Array();
        for(var i = 0; i < responseData.length; i++) {
            var responseObj = responseData[i];
            var storeObj = new Object();
            storeObj.id = null;
            storeObj.stockoutorderid_link = null;
            storeObj.material_skuid_link = responseObj.mat_skuid_link;
            storeObj.colorid_link = responseObj.mat_sku_color_id;
            storeObj.unitid_link = 1;
            storeObj.totalpackage = 0;
            storeObj.totalmet = responseObj.mat_sku_demand == null ? 0 : responseObj.mat_sku_demand;
            storeObj.totalyds = storeObj.totalmet * 1.094;
            storeObj.skucode = responseObj.mat_sku_code;
            storeObj.skuname = responseObj.mat_sku_name;
            storeObj.sku_product_desc = responseObj.mat_sku_desc;
            storeObj.coKho = responseObj.mat_sku_size_name;
            storeObj.color_name = responseObj.mat_sku_color_name;
            storeObj.date_to_vai_yc = dateTo;
            storeObj.date_xuat_yc = dateXuat;
            storeData.push(storeObj);
        }

        var Stockout_order_d_store = viewModel.getStore('Stockout_order_d_store');
        Stockout_order_d_store.removeAll();
        Stockout_order_d_store.insert(0, storeData);
        Stockout_order_d_store.commitChanges();
    },
    getEarliestDate: function(date_list){ // console.log(date_list);
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        // var date_list = viewModel.get('date_list');
        // console.log(date_list);
        var date = date_list[0];
        for(var i=0;i<date_list.length;i++){
            if(date > date_list[i]){
                date = date_list[i];
            }
        }
        // console.log(new Date(date));
        return new Date(date);
    },

    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        
        // var pordergrant = viewModel.get('pordergrant');
        // var porder_grantid_link = pordergrant.get('id');

        var eventRecord = viewModel.get('eventRecord');
        var porder_grantid_link = viewModel.get('pordergrantid_link');
        // console.log(eventRecord);
        if(eventRecord != null){
            var startDate = eventRecord.get('StartDate');
            var endDate = eventRecord.get('EndDate');
            m.loadDateList(porder_grantid_link, startDate, endDate);
        }else{
            me.setLoading(true);
            var params = new Object();
            params.idPorderGrant = porder_grantid_link;
            GSmartApp.Ajax.post('/api/v1/porder_grant/findone', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        console.log(response);
                        var start_date_plan = response.data.start_date_plan;
                        var finish_date_plan = response.data.finish_date_plan;
                        m.loadDateList(porder_grantid_link, start_date_plan, finish_date_plan);
                    }
                }
            })
        }

    },
    loadDateList: function(porder_grantid_link, startDate, endDate){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        if(startDate == null || endDate == null){
            console.log('startDate || endDate == null');
            return;
        }

        me.setLoading(true);
        var params = new Object();
        params.porder_grantid_link = porder_grantid_link;
        params.dateFrom = startDate;
        params.dateTo = endDate;

        GSmartApp.Ajax.post('/api/v1/porder_grant_sku_plan/getDateFor_KeHoachVaoChuyen_ChuaYeuCau', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var data = new Array();
                        // console.log(response);
                        for(var i = 0; i<response.data.length; i++){
                            var dateObj = new Object();
                            dateObj.date = response.data[i];
                            data.push(dateObj);
                        }
                        var DateStore = viewModel.getStore('DateStore');
                        DateStore.insert(0,data);
                    }
                }
            })
    },
    // onDelete:function(){
    //     var m = this;
    //     var me = this.getView();
    //     var viewModel = this.getViewModel();
    //     var PackingListStore = viewModel.getStore('PackingListStore');
    //     var select = me.getSelectionModel().getSelection();
    //     if (select.length == 0) {
    //         Ext.Msg.show({
    //             title: "Thông báo",
    //             msg: "Phải chọn ít nhất một cây vải",
    //             buttons: Ext.MessageBox.YES,
    //             buttonText: {
    //                 yes: 'Đóng',
    //             }
    //         });
    //         return;
    //     }else{
    //         Ext.Msg.show({
    //             title: "Thông báo",
    //             msg: "Bạn có chắc chắn xóa?",
    //             buttons: Ext.MessageBox.YESNO,
    //             buttonText: {
    //                 yes: 'Có',
    //                 no: 'Không'
    //             },
    //             fn: function (btn) {
    //                 if (btn === 'yes') {
    //                     m.delete(select);
    //                 }
    //             }
    //         });
    //     }
    //     // console.log(select);
    //     // this.fireEvent("ThemNPL", select, pcontractid_link, productid_link);
    //     // this.onThoat();
    // },
    // delete: function(select){
    //     var m = this;
    //     var me = this.getView();
    //     var viewModel = this.getViewModel();
    //     var PackingListStore = viewModel.getStore('PackingListStore');
    //     var stockout = viewModel.get('stockout');

    //     PackingListStore.remove(select);
        
    //     var stockout_d = stockout.stockout_d;
    //     for(var i=0; i<stockout_d.length; i++){
    //         var stockout_packinglist = stockout_d[i].stockout_packinglist;
    //         for(var j=0; j<select.length; j++){
    //             for(var k=0; k<stockout_packinglist.length; k++){
    //                 if(stockout_packinglist[k].epc == select[j].get('epc')){
    //                     // remove from stockout
    //                     stockout_packinglist.splice(k, 1);
    //                     k--;
    //                 }
    //             }
    //         }
    //     }

    //     stockout = m.recalculate(stockout);
    //     viewModel.set('stockout', stockout);
    //     this.fireEvent('DeletePkl', stockout);

    //     // console.log(select);
    //     // console.log(stockout);
    // },
})