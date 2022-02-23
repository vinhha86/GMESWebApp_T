Ext.define('GSmartApp.view.stockin.stockin_submaterial.Stockin_SubM_List_D_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_SubM_List_D_Controller',
    isActivate: false,
    init: function () {
        var viewModel = this.getViewModel();
		var UnitStore = viewModel.getStore('UnitStore');
		UnitStore.loadStore();
    },
	listen: {
        controller: {
            '*': {
				
            }
        }
    },    
    control: {
        
    },
    onSearch: function () {
        console.log('Searching');
        var me = this.getView();
        var t = this;

        var viewModel = this.getViewModel();
        var store = viewModel.getStore('StockinStore');

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

    onFilterValueMaNPLKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('StockinD_Store');
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
    onFilterValueTenNPLKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('StockinD_Store');
        var filterField = this.lookupReference('ValueFilterFieldTenNPL'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldTenNPL = filters.add({
                id: 'ValueFilterFieldTenNPL',
                property: 'skuname',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldTenNPL) {
            filters.remove(this.ValueFilterFieldTenNPL);
            this.ValueFilterFieldTenNPL = null;
        }
    },

    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    },
    renderUnit: function (val, meta, record, rindex, cindex, store) {
		if (null != val) {
			var viewModel = this.getViewModel();
			var UnitStore = viewModel.getStore('UnitStore');
			if (null != UnitStore) {
				var objUnit = UnitStore.data.find('id', val);
				// console.log(objUnit.data);
				return objUnit.data.code;
			}
		}
	},
})