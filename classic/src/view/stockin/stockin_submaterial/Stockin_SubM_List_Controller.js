Ext.define('GSmartApp.view.stockin.stockin_submaterial.Stockin_SubM_List_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_SubM_List_Controller',
    isActivate: false,
    init: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();

        var StockinTypeStore = viewModel.getStore('StockinTypeStore');
        StockinTypeStore.loadStore(11, 20);
        
        var listidtypefrom = "5,19";
        var OrgFromStore = viewModel.getStore('OrgFromStore');
        OrgFromStore.loadStoreByOrgTypeString(listidtypefrom);

        var OrgToStore = viewModel.getStore('OrgToStore');
        var listidtypeto = "19";
		OrgToStore.loadStore_allchildren_byorg(listidtypeto);

        var today = new Date();
		var priorDate = new Date().setDate(today.getDate()-30);
        viewModel.set('searchObj.stockindate_from', new Date(priorDate));
        
        this.onSearch();
    },
	listen: {
        controller: {
            '*': {
				
            },
            'Stockin_SubM_Main_Controller': {
                Reload_Stockin_SubM_List: 'onSearch'
            }
        }
    },    
    control: {
        '#Stockin_SubM_List': {
            select: 'onStockinSelect',
            itemdblclick: 'onCapNhatdbl'
        },
        '#btnNhapMuaMoi':{
            click: 'onNhapMuaMoi'
        },
        '#btnNhapDieuChuyen':{
            click: 'onNhapDieuChuyen'
        },
        '#btnTimKiem': {
            click: 'onSearch'
        },
    },
    onSearch: function () {
        var me = this.getView();
        var t = this;

        var viewModel = this.getViewModel();
        var searchObj = viewModel.get('searchObj');
        var store = viewModel.getStore('StockinStore');

        var orgid_from_link = searchObj.orgid_from_link;
        var stockindate_from = searchObj.stockindate_from;
        var stockindate_to = searchObj.stockindate_to;
        var stockintypeid_link = searchObj.stockintypeid_link;
        var stockintypeid_link_from = 11;
        var stockintypeid_link_to = 20;
        var status = [0,1,2];

        // store.loadStore_Product(orgid_from_link, stockindate_from, stockindate_to, 
        //     stockintypeid_link, stockintypeid_link_from, stockintypeid_link_to,
        //     status, null, null);

        store.loadStore_Material(orgid_from_link, stockindate_from, stockindate_to, 
            stockintypeid_link, stockintypeid_link_from, stockintypeid_link_to, 
            status, null, null, null, null, null, null);
    },
    onThemMoi: function(){
        this.redirectTo('stockin_subm/create');
    },
    onCapNhatdbl: function(m, record, item, index, e, eOpts){
        var id = record.data.id;
        this.redirectTo("stockin_subm/" + id + "/edit");
    },
    onEdit: function(grid, rowIndex){
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        this.redirectTo("stockin_subm/" + id + "/edit");
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
                        var response = Ext.decode(response.responseText);
                        if (success) {
                            if (response.respcode == 200) {
                                grid.getStore().remove(rec);
                            }else{
                                Ext.Msg.show({
                                    title: 'Thông báo',
                                    msg: response.message,
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    },
                                });
                            }
                        }
                })
                }
            }
        });
    },

    onStockincodeFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('stockincodeFilter'),
            store = this.getViewModel().getStore('StockinStore'),
            filters = store.getFilters();

        if (filterField.value) {
            this.stockincodeFilter = filters.add({
                id: 'stockincodeFilter',
                property: 'stockincode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.stockincodeFilter) {
            filters.remove(this.stockincodeFilter);
            this.stockincodeFilter = null;
        }
    },
    onInvoice_numberFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('invoice_numberFilter'),
            store = this.getViewModel().getStore('StockinStore'),
            filters = store.getFilters();

        if (filterField.value) {
            this.invoice_numberFilter = filters.add({
                id: 'invoice_numberFilter',
                property: 'invoice_number',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.invoice_numberFilter) {
            filters.remove(this.invoice_numberFilter);
            this.invoice_numberFilter = null;
        }
    },

    onNhapMuaMoi: function(){
        this.redirectTo("stockin_subm/11/create");
    },
    onNhapDieuChuyen: function(){
        this.redirectTo("stockin_subm/12/create");
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    },

    onStockinSelect: function (e, selected, eOpts) {
        var viewmodel = this.getViewModel();
        var StockinD_Store = viewmodel.getStore('StockinD_Store');
        StockinD_Store.setData(selected.data.stockin_d);
        console.log(selected.data.stockin_d);
    },
})