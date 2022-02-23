Ext.define('GSmartApp.view.handover.HandoverPackToStock_List_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverPackToStock_List_Controller',
    isActivate: false,
    init: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();

        var stockintype = viewModel.getStore('StockinTypeStore');
        stockintype.loadStore(21, 21);
        
        var listidtype_to = "8";
        var OrgToStore = this.getViewModel().getStore('OrgToStore');
        // OrgToStore.loadStore_allchildren_byorg(listidtype_to);
        OrgToStore.loadStore(8, false);

        var listidtype_from = "9";
        var OrgFromStore = this.getViewModel().getStore('OrgFromStore');
        // OrgFromStore.loadStore_allchildren_byorg(listidtype_from);
        OrgFromStore.loadStore(9, false);

        var today = new Date();
		var priorDate = new Date().setDate(today.getDate()-30);
		me.down('#stockindate_from').setValue(new Date(priorDate));
    },
	listen: {
        controller: {
            '*': {
				urlBack:'onSearch',
            }
        }
    },    
    control: {
        '#HandoverPackToStock_List': {
            itemdblclick: 'onCapNhatdbl'
        },        
        // '#btnThemMoi_ByPOLine':{
        //     click: 'onStockinNew_ByPOLine'
        // },
        // '#btnThemMoi_Move':{
        //     click: 'onStockinNew_Move'
        // },
        '#btnThemMoi': {
            click: 'onBtnThemMoi'
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
            var viewModel = this.getViewModel();
            var store = viewModel.getStore('StockinStore');
            store.currentPage = 1;
        }
        if (e.getKey() == e.ENTER) {
            me.onSearch();
        }
    },
    onSearch: function () {
        var me = this.getView();
        var t = this;

        var viewModel = this.getViewModel();
        var store = viewModel.getStore('StockinStore');

        var orgid_from_link = me.down('#OrgFromStore').getValue();
        var stockindate_from = me.down('#stockindate_from').getValue();
        var stockindate_to = me.down('#stockindate_to').getValue();
        var stockintypeid_link = 21;
        var stockintypeid_link_from = 21;
        var stockintypeid_link_to = 21;
        var status = [-1,0,1,2];
        store.loadStore_Product(
            orgid_from_link, stockindate_from, stockindate_to, 
            stockintypeid_link, stockintypeid_link_from, stockintypeid_link_to,
            status, null, null);
    },
    onThemMoi: function(){
        this.redirectTo('handover_pack_tostock/create');
    },
    onCapNhatdbl: function(m, record, item, index, e, eOpts){
        var id = record.data.id;
        this.redirectTo("handover_pack_tostock/" + id + "/edit");
    },
    onEdit: function(grid, rowIndex){
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        this.redirectTo("handover_pack_tostock/" + id + "/edit");
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
                    GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_deleteid', Ext.JSON.encode(params),
                    function (success, response, options) {
                        me.setLoading(false);
                        if (success) {
                            var response = Ext.decode(response.responseText);
                            if (response.respcode == 200) {
                                grid.getStore().remove(rec);
                            }else{
                                Ext.MessageBox.show({
                                    title: "Thông báo",
                                    msg: 'Lỗi xoá phiếu: ' + response.message,
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
    onBtnThemMoi: function(){
        this.redirectTo("handover_pack_tostock/21/create");
    },
    onStockinNew_ByPOLine: function(){
        this.redirectTo("handover_pack_tostock/21/create");
    },
    onStockinNew_Move: function(){
        this.redirectTo("handover_pack_tostock/22/create");
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    },
})