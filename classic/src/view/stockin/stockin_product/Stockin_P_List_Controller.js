Ext.define('GSmartApp.view.stockin.Stockin_P_List_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_P_List_Controller',
    isActivate: false,
    init: function () {
        // var me = this.getView();
        // var viewmodel = this.getViewModel();

        // var stockintype = viewmodel.getStore('StockinTypeStore');
        // stockintype.loadStore(21, 30);
        
        // var listidtype = "4,8,9,11,12";
        // var orgtostore = this.getViewModel().getStore('OrgToStore');
        // orgtostore.loadStore_allchildren_byorg(listidtype);

        // var fromStore = this.getViewModel().getStore('OrgFromStore');
        // fromStore.loadStore_byRoot(listidtype);

        // // var store = viewmodel.getStore('StockinStore');
        // // store.loadStore(0, null, new Date(), 0, 0, 25, 1);
        // var today = new Date();
		// var priorDate = new Date().setDate(today.getDate()-30);
		// me.down('#stockindate_from').setValue(new Date(priorDate));
        // // this.onSearch();
    },
	listen: {
        controller: {
            '*': {
				urlBack:'onSearch',
            }
        }
    },    
    control: {
        '#StockIn_P_List': {
            itemdblclick: 'onCapNhatdbl'
        },
        '#btnThemMoi_ByPOLine':{
            click: 'onStockinNew_ByPOLine'
        },
        '#btnThemMoi_Move':{
            click: 'onStockinNew_Move'
        },
        '#btnTimKiem': {
            click: 'onSearch'
        },
        '#limitpage': {
            specialkey: 'onSpecialkey'
        }
    },
    onActivate: function () {
        this.onSearch();
    },
    onSpecialkey: function (field, e) {
        var me = this;
        if (field.itemId == "limitpage") {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('StockinStore');
            store.currentPage = 1;
        }
        if (e.getKey() == e.ENTER) {
            me.onSearch();
        }
    },
    onSearch: function () {
        console.log('Searching');
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('StockinStore');

        // var limit = me.down('#limitpage').getValue();
        var orgid_from_link = me.down('#OrgFromStore').getValue();
        var stockindate_from = me.down('#stockindate_from').getValue();
        var stockindate_to = me.down('#stockindate_to').getValue();
        var stockintypeid_link = me.down('#stockintypeid_link').getValue();
        var stockintypeid_link_from = 21;
        var stockintypeid_link_to = 30;
        var status = [-1,0,1,2];
        // var page = store.currentPage;

        // if (limit == null) {
        //     limit = 25;
        // }

        // if (page == null) {
        //     page = 1;
        // }
        store.loadStore_Product(orgid_from_link, stockindate_from, stockindate_to, 
            stockintypeid_link, stockintypeid_link_from, stockintypeid_link_to,
            status, null, null);
    },
    onThemMoi: function(){
        this.redirectTo('stockin_p_main/create');
    },
    onCapNhatdbl: function(m, record, item, index, e, eOpts){
        var id = record.data.id;
        this.redirectTo("stockin_p_main/" + id + "/edit");
    },
    onEdit: function(grid, rowIndex){
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        this.redirectTo("stockin_p_main/" + id + "/edit");
    },
    onDelete: function(grid, rowIndex){
        var me = this.getView();
        
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var name = rec.get('stockincode');

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa phiếu nhập "' + name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.setLoading("Đang xóa");
                    var params = new Object();
                    params.id = id;
                    GSmartApp.Ajax.post('/api/v1/stockin/stockin_deleteid', Ext.JSON.encode(params),
                    function (success, response, options) {
                        if (success) {
                            me.setLoading(false);
                            var response = Ext.decode(response.responseText);
                            if (response.respcode == 200) {
                                grid.getStore().remove(rec);
                            }
                        }
                })
                }
            }
        });
    },
    onStockinNew_ByPOLine: function(){
        this.redirectTo("stockin_p_main/21/create");
    },
    onStockinNew_Move: function(){
        this.redirectTo("stockin_p_main/22/create");
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    },
})