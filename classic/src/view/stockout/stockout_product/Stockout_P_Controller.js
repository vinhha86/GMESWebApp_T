Ext.define('GSmartApp.view.stockout.Stockout_P_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_P_Controller',
    init: function() {
        

    },
    // onActivate: function () {
    //     this.onSearch();
    // },
	listen: {
        controller: {
            '*': {
				urlBack:'onSearch',
            }
        }
    },        
    control:{
        '#Stockout_P_List_Main': {
            afterrender: 'onAfterrender'
        },
        '#stockout_p_list': {
            select: 'onStockoutSelect',
            itemdblclick: 'onCapNhat'
        },
        '#btnThemMoi_ByPOLine':{
            click: 'onStockoutNew_ByPOLine'
        },
        '#btnThemMoi_Move':{
            click: 'onStockoutNew_Move'
        },
        '#limitpage': {
            specialkey: 'onSpecialkey'
        }
    },
    onAfterrender: function(){
        var me = this.getView();
        var StockoutType = this.getViewModel().getStore('StockoutTypeStore');
        StockoutType.loadStore();

        var listidtype = "4,8,9,11,12";
        var fromStore = this.getViewModel().getStore('OrgFromStore');
        fromStore.loadStore_allchildren_byorg(listidtype);
 
        var orgtostore = this.getViewModel().getStore('OrgToStore');
        orgtostore.loadStore_byRoot(listidtype);
        
        var StockoutType = this.getViewModel().getStore('StockoutTypeStore');
        StockoutType.loadStore(21, 30);
        
        // var store_stockout = this.getViewModel().getStore('Stockout');
        // if (store_stockout) {
        //     var page = store_stockout.currentPage;
        //     if (page == null) {
        //         page = 1;
        //     }
        //     store_stockout.loadByDate_Product(0,'', new Date(),new Date(), page, 25, 0 ,0);
        // }  

        var today = new Date();
		var priorDate = new Date().setDate(today.getDate()-30);
		me.down('#stockoutdate_from').setValue(new Date(priorDate));

        this.onSearch();
    },
    onStockoutSelect: function (e, selected, eOpts) {
        var viewmodel = this.getViewModel();
        viewmodel.set('stockout', selected.data);
        var StockoutD_Store = viewmodel.getStore('StockoutD_Store');
        // StockinD_Store.setData(selected.data.stockin_d);
        StockoutD_Store.loadByStockoutID(selected.data.id);
    },
    onSpecialkey: function (field, e) {
        var me = this;
        if (field.itemId == "limitpage") {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('Stockout');
            store.currentPage = 1;
        }
        if (e.getKey() == e.ENTER) {
            me.onSearch();
        }
    },
    onSearch: function(){
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Stockout');

        var limit = me.down('#limitpage').getValue();
        var stockouttypeid = me.down('#stockouttypeid').getValue();
        var stockindate_from = me.down('#stockoutdate_from').getValue();
        var stockindate_to = me.down('#stockoutdate_to').getValue();
        var OrgToStore = me.down('#OrgToStore').getValue();
        // var OrgFromStore = me.down('#OrgFromStore').getValue();
        var stockoutcode = '';

        var page = store.currentPage;

        if (limit == null) {
            limit = 25;
        }

        if (page == null) {
            page = 1;
        }
        store.loadByDate_Product(stockouttypeid, stockoutcode, stockindate_from, stockindate_to, page, limit,null,OrgToStore);
    },
    renderCell: function(value, record) {
        if (null == value) value = 0;
        return '<div style="font-size: 11px;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    },
	renderCount: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
	},
    onStockoutEdit: function(grid, rowIndex, colIndex){
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        this.redirectTo("stockout_p_main/"+id+"/edit");
    },
    onCapNhat: function(m, record, item, index, e, eOpts){
        var id = record.data.id;
        this.redirectTo("stockout_p_main/" + id + "/edit");
    },
    onStockoutItemDelete: function(grid, rowIndex, colIndex){
        var me = this.getView();
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var name = rec.get('stockoutcode');

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa phiếu xuất '+name+'?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.setLoading("Đang xóa dữ liệu");
                    var params = new Object();
                    params.id = id;
                    params.status = 1;

                    GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_deleteid', Ext.JSON.encode(params),
                    function (success, response, options) {
                        me.setLoading(false);
                        if (success) {
                            var response = Ext.decode(response.responseText);
                            if (response.respcode == 200) {
                                Ext.MessageBox.show({
                                    title: "Thông báo",
                                    msg: "Xóa thành công",
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                                grid.getStore().remove(rec);
                            }else{
                                Ext.MessageBox.show({
                                    title: "Thông báo",
                                    msg: response.msg,
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
                        }else{
                            if(response != null){
                                var response = Ext.decode(response.responseText);
                                Ext.MessageBox.show({
                                    title: "Thông báo",
                                    msg: response.message,
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }

                        }
                    })
                }
            }
        });
    },
    onStockoutNew: function(){
        this.redirectTo("stockout_p_main/create");
    },
    onStockoutNew_ByPOLine: function(){
        this.redirectTo("stockout_p_main/21/create");
    },
    onStockoutNew_Move: function(){
        this.redirectTo("stockout_p_main/22/create");
    }
});
