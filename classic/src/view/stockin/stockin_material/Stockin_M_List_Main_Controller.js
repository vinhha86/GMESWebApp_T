Ext.define('GSmartApp.view.stockin.stockin_material.Stockin_M_List_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_List_Main_Controller',
    isActivate: false,
    init: function () {
        var m = this;
        var me = this.getView();
        var viewmodel = this.getViewModel();

		var UnitStore = viewmodel.getStore('UnitStore');
		if (null!=UnitStore) UnitStore.loadStore();

        var stockintype = viewmodel.getStore('StockinTypeStore');
        if (null!=stockintype) stockintype.loadStore(1, 10);
        
        var listidtype = "3,5";
        // var listidtype = "4,8,9,11,12";
        var orgtostore = viewmodel.getStore('OrgToStore');
        if (null!=orgtostore) orgtostore.loadStore_allchildren_byorg(listidtype);

        var fromStore = viewmodel.getStore('OrgFromStore');
        if (null!=fromStore) fromStore.loadStore_byRoot(listidtype);

        var today = new Date();
		var priorDate = new Date().setDate(today.getDate()-30);
        viewmodel.set('searchObj.stockindate_from', new Date(priorDate));
        viewmodel.set('searchObj.stockindate_to', today);
		// me.down('#stockindate_from').setValue(new Date(priorDate));

        // this.onSearch();

        // nếu là pop up từ tab cân đối NPL của tab tiến độ giao hàng hoặc đơn hàng
        var isCanDoiNplPopup = viewmodel.get('isCanDoiNplPopup');
        if(isCanDoiNplPopup){
            // load store theo npl
            m.onSearch();
        }
        this.sortStore();

    },
	listen: {
        controller: {
            '*': {
				urlBack:'onSearch',
            },
            'Stockin_M_Main_Controller': {
                Reload_StockinList: 'onSearch'
            },
            '#statusComboValueTrigger': {
                click: 'onStatusComboValueTriggerClick'
            }
        }
    },    
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#btnTimKiem': {
            click: 'onSearch'
        },
        '#limitpage': {
            specialkey: 'onSpecialkey'
        },
        '#Stockin_M_List': {
            select: 'onStockinSelect',
            itemdblclick: 'onCapNhatdbl',
        },        
    },
    onStockinSelect: function (e, selected, eOpts) {
        var viewmodel = this.getViewModel();
        viewmodel.set('stockin', selected.data);
        // console.log(selected);

        // isRecordNotNguyenLieu
        var stockintypeid_link = selected.get('stockintypeid_link');
        if(stockintypeid_link >= 1 && stockintypeid_link <= 10){
            viewmodel.set('isRecordNguyenLieu', true);
        }
        if(stockintypeid_link >= 11 && stockintypeid_link <= 20){
            viewmodel.set('isRecordNguyenLieu', false);
        }
        var StockinD_Store = viewmodel.getStore('StockinD_Store');
        // StockinD_Store.setData(selected.data.stockin_d);
        StockinD_Store.loadStore_byStockinId(selected.data.id);
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
        // console.log('Searching');
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('StockinStore');
        var isAdd_Pcontract_Stockin = viewmodel.get('isAdd_Pcontract_Stockin');
        var pcontractid = viewmodel.get('pcontractid_link');

        if(isAdd_Pcontract_Stockin){ // pcontractView
            var orgid_from_link = viewmodel.get('searchObj.orgid_from_link');
            var stockindate_from = viewmodel.get('searchObj.stockindate_from');
            var stockindate_to = viewmodel.get('searchObj.stockindate_to');
            var stockintypeid_link = viewmodel.get('searchObj.stockintypeid_link');
            var stockintypeid_link_from = 1;
            var stockintypeid_link_to = 20;
            var status = [0,1,2];
            var mat_skuid_link = viewmodel.get('mat_skuid_link');
            store.loadStore_Material_pcontract(orgid_from_link, stockindate_from, stockindate_to, 
                stockintypeid_link, stockintypeid_link_from, stockintypeid_link_to, 
                status, pcontractid, null, null, mat_skuid_link);
        }
        if(!isAdd_Pcontract_Stockin){ // nhap kho view
            var orgid_from_link = viewmodel.get('searchObj.orgid_from_link');
            var stockindate_from = viewmodel.get('searchObj.stockindate_from');
            var stockindate_to = viewmodel.get('searchObj.stockindate_to');
            var stockintypeid_link = viewmodel.get('searchObj.stockintypeid_link');
            var pcontract = viewmodel.get('searchObj.pcontract');
            var product = viewmodel.get('searchObj.product');
            var stockintypeid_link_from = 1;
            var stockintypeid_link_to = 10;
            var status = [0,1,2];
            var mat_skuid_link = viewmodel.get('mat_skuid_link');
    
            store.loadStore_Material(orgid_from_link, stockindate_from, stockindate_to, 
                stockintypeid_link, stockintypeid_link_from, stockintypeid_link_to, 
                status, null, null, null, mat_skuid_link, pcontract, product);
        }
        
        var StockinD_Store = viewmodel.getStore('StockinD_Store');
        if(null!=StockinD_Store) StockinD_Store.removeAll();
    },
    onThemMoi: function(){
        this.redirectTo('stockin_m/create');
    },
    onNhapMuaMoi: function(){
        var viewmodel = this.getViewModel();
        if (viewmodel.get('isAdd_Pcontract_Stockin')){
            var form = Ext.create('Ext.window.Window', {
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Phiếu nhập kho',
                closeAction: 'destroy',
                height: Ext.getBody().getViewSize().height * .99,
                width: Ext.getBody().getViewSize().width * .95,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'Stockin_M_Edit',
                    viewModel: {
                        type: 'Stockin_M_ViewModel',
                        data: {
                            isNewStockin: true,
                            isAdd_Pcontract_Stockin: true,
                            pcontractid_link: viewmodel.get('pcontractid_link'),
                            stockintypeid_link: 1,
                        }
                    }
                }]
            });            
            form.show();

            // bắt event load lại store, LuuPhieuNhapThanhCong
            if(form.down('#Stockin_M_Edit')){
                form.down('#Stockin_M_Edit').getController().on('LuuPhieuNhapThanhCong', function () {
                    var StockinStore = viewmodel.getStore('StockinStore');
                    StockinStore.load();
                    var StockinD_Store = viewmodel.getStore('StockinD_Store');
                    StockinD_Store.removeAll();
                });
            }
            if(form.down('#Stockin_SubM_Edit')){
                form.down('#Stockin_SubM_Edit').getController().on('LuuPhieuNhapThanhCong', function () {
                    var StockinStore = viewmodel.getStore('StockinStore');
                    StockinStore.load();
                    var StockinD_Store = viewmodel.getStore('StockinD_Store');
                    StockinD_Store.removeAll();
                });
            }
        } else {
            this.redirectTo('stockin_m/1/create');
        }        
    },
    onNhapMuaMoiPhuLieu: function(){
        var viewmodel = this.getViewModel();
        if (viewmodel.get('isAdd_Pcontract_Stockin')){
            var form = Ext.create('Ext.window.Window', {
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Phiếu nhập kho',
                closeAction: 'destroy',
                height: Ext.getBody().getViewSize().height * .99,
                width: Ext.getBody().getViewSize().width * .95,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'Stockin_SubM_Edit',
                    viewModel: {
                        type: 'Stockin_SubM_Edit_ViewModel',
                        data: {
                            isNewStockin: true,
                            isAdd_Pcontract_Stockin: true,
                            pcontractid_link: viewmodel.get('pcontractid_link'),
                            stockintypeid_link: 11,
                        }
                    }
                }]
            });            
            form.show();

            // bắt event load lại store, LuuPhieuNhapThanhCong
            if(form.down('#Stockin_M_Edit')){
                form.down('#Stockin_M_Edit').getController().on('LuuPhieuNhapThanhCong', function () {
                    var StockinStore = viewmodel.getStore('StockinStore');
                    StockinStore.load();
                    var StockinD_Store = viewmodel.getStore('StockinD_Store');
                    StockinD_Store.removeAll();
                });
            }
            if(form.down('#Stockin_SubM_Edit')){
                form.down('#Stockin_SubM_Edit').getController().on('LuuPhieuNhapThanhCong', function () {
                    var StockinStore = viewmodel.getStore('StockinStore');
                    StockinStore.load();
                    var StockinD_Store = viewmodel.getStore('StockinD_Store');
                    StockinD_Store.removeAll();
                });
            }
        } 
        // else {
        //     this.redirectTo('stockin_subm/11/create');
        // }
    },
    onNhapDieuChuyen: function(){
        this.redirectTo('stockin_m/2/create');
    },
    onCapNhatdbl: function(m, record, item, index, e, eOpts){
        var viewmodel = this.getViewModel();
        var id = record.data.id;
        var stockintypeid_link = record.get('stockintypeid_link');
        var xtype_window = '';
        var viewModel_window  = '';
        if(stockintypeid_link >= 1 && stockintypeid_link <= 10){ // nguyen lieu
            xtype_window = 'Stockin_M_Edit';
            viewModel_window = 'Stockin_M_ViewModel';
        }
        if(stockintypeid_link >= 11 && stockintypeid_link <= 20){ // phu lieu
            xtype_window = 'Stockin_SubM_Edit';
            viewModel_window = 'Stockin_SubM_Edit_ViewModel';
        }
        if (viewmodel.get('isAdd_Pcontract_Stockin')){
            var form = Ext.create('Ext.window.Window', {
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Phiếu nhập kho',
                closeAction: 'destroy',
                height: Ext.getBody().getViewSize().height * .99,
                width: Ext.getBody().getViewSize().width * .95,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: xtype_window,
                    viewModel: {
                        type: viewModel_window,
                        data: {
                            isNewStockin: false,
                            isAdd_Pcontract_Stockin: true,
                            stockinid_link: id,
                            pcontractid_link: viewmodel.get('pcontractid_link'),                
                        }
                    }
                }]
            });            
            form.show();

            // bắt event load lại store, LuuPhieuNhapThanhCong
            if(form.down('#Stockin_M_Edit')){
                form.down('#Stockin_M_Edit').getController().on('LuuPhieuNhapThanhCong', function () {
                    var StockinStore = viewmodel.getStore('StockinStore');
                    StockinStore.load();
                    var StockinD_Store = viewmodel.getStore('StockinD_Store');
                    StockinD_Store.removeAll();
                });
            }
            if(form.down('#Stockin_SubM_Edit')){
                form.down('#Stockin_SubM_Edit').getController().on('LuuPhieuNhapThanhCong', function () {
                    var StockinStore = viewmodel.getStore('StockinStore');
                    StockinStore.load();
                    var StockinD_Store = viewmodel.getStore('StockinD_Store');
                    StockinD_Store.removeAll();
                });
            }
        } else {
            this.redirectTo("stockin_m/" + id + "/edit");
        }
    },
    onEdit: function(grid, rowIndex){
        var viewmodel = this.getViewModel();
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var stockintypeid_link = rec.get('stockintypeid_link');
        var xtype_window = '';
        var viewModel_window  = '';
        if(stockintypeid_link >= 1 && stockintypeid_link <= 10){ // nguyen lieu
            xtype_window = 'Stockin_M_Edit';
            viewModel_window = 'Stockin_M_ViewModel';
        }
        if(stockintypeid_link >= 11 && stockintypeid_link <= 20){ // phu lieu
            xtype_window = 'Stockin_SubM_Edit';
            viewModel_window = 'Stockin_SubM_Edit_ViewModel';
        }
        // console.log(rec);
        if (viewmodel.get('isAdd_Pcontract_Stockin')){
            var form = Ext.create('Ext.window.Window', {
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Phiếu nhập kho',
                closeAction: 'destroy',
                height: Ext.getBody().getViewSize().height * .99,
                width: Ext.getBody().getViewSize().width * .95,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: xtype_window,
                    viewModel: {
                        type: viewModel_window,
                        data: {
                            isAdd_Pcontract_Stockin: true,
                            stockinid_link: id,
                            pcontractid_link: viewmodel.get('pcontractid_link'),                   
                        }
                    }
                }]
            });            
            form.show();

            // bắt event load lại store, LuuPhieuNhapThanhCong
            if(form.down('#Stockin_M_Edit')){
                form.down('#Stockin_M_Edit').getController().on('LuuPhieuNhapThanhCong', function () {
                    var StockinStore = viewmodel.getStore('StockinStore');
                    StockinStore.load();
                    var StockinD_Store = viewmodel.getStore('StockinD_Store');
                    StockinD_Store.removeAll();
                });
            }
            if(form.down('#Stockin_SubM_Edit')){
                form.down('#Stockin_SubM_Edit').getController().on('LuuPhieuNhapThanhCong', function () {
                    var StockinStore = viewmodel.getStore('StockinStore');
                    StockinStore.load();
                    var StockinD_Store = viewmodel.getStore('StockinD_Store');
                    StockinD_Store.removeAll();
                });
            }
        } else {
            this.redirectTo("stockin_m/" + id + "/edit");
        }
    },
    onDelete: function(grid, rowIndex){
        var me = this.getView();
        var viewModel = this.getViewModel();
        
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
                                var StockinD_Store = viewModel.getStore('StockinD_Store');
                                StockinD_Store.removeAll();
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
                        }else{
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: "Xoá thất bại",
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                },
                            });
                        }
                })
                }
            }
        });
    },

    // stockin
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
    onStatusFilterKeyup:function(){
        var viewModel = this.getViewModel();
        var filterValue = viewModel.get('statusComboValue');
        var store = viewModel.getStore('StockinStore');
        var filters = store.getFilters();

        if (filterValue != null) {
            this.statusFilter = filters.add({
                id: 'statusFilter',
                property: 'status',
                value: filterValue,
                exactMatch: true,
                // anyMatch: true,
                // caseSensitive: false
            });
        }
        else if (this.statusFilter) {
            filters.remove(this.statusFilter);
            this.statusFilter = null;
        }
        // console.log('here');
        // console.log(filterValue);
    },
    onStockinTypeFilterKeyup:function(){
        var viewModel = this.getViewModel();
        var filterValue = viewModel.get('stockinTypeComboValue');
        var store = viewModel.getStore('StockinStore');
        var filters = store.getFilters();

        if (filterValue != null) {
            this.stockinTypeFilter = filters.add({
                id: 'stockinTypeFilter',
                property: 'stockintypeid_link',
                value: filterValue,
                exactMatch: true,
                // anyMatch: true,
                // caseSensitive: false
            });
        }
        else if (this.stockinTypeFilter) {
            filters.remove(this.stockinTypeFilter);
            this.stockinTypeFilter = null;
        }
    },
    onOrgFromFilterKeyup: function(){
        var viewModel = this.getViewModel();
        var filterValue = viewModel.get('orgFromFilterValue');
        var store = viewModel.getStore('StockinStore');
        var filters = store.getFilters();

        if (filterValue != null) {
            this.orgFromFilter = filters.add({
                id: 'orgFromFilter',
                property: 'orgfrom_name',
                value: filterValue,
                // exactMatch: true,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.orgFromFilter) {
            filters.remove(this.orgFromFilter);
            this.orgFromFilter = null;
        }
    },
    onOrgToFilterKeyup: function(){
        var viewModel = this.getViewModel();
        var filterValue = viewModel.get('orgToFilterValue');
        var store = viewModel.getStore('StockinStore');
        var filters = store.getFilters();

        if (filterValue != null) {
            this.orgToFilter = filters.add({
                id: 'orgToFilter',
                property: 'orgto_name',
                value: filterValue,
                // exactMatch: true,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.orgToFilter) {
            filters.remove(this.orgToFilter);
            this.orgToFilter = null;
        }
    },
    onProductStringFilterKeyup: function(){
        var viewModel = this.getViewModel();
        var filterValue = viewModel.get('productStringFilterValue');
        var store = viewModel.getStore('StockinStore');
        var filters = store.getFilters();

        if (filterValue != null) {
            this.productStringFilter = filters.add({
                id: 'productStringFilter',
                property: 'stockinProductString',
                value: filterValue,
                // exactMatch: true,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.productStringFilter) {
            filters.remove(this.productStringFilter);
            this.productStringFilter = null;
        }
    },
    onReasonFilterKeyup: function(){
        var viewModel = this.getViewModel();
        var filterValue = viewModel.get('reasonFilterValue');
        var store = viewModel.getStore('StockinStore');
        var filters = store.getFilters();

        if (filterValue != null) {
            this.reasonFilter = filters.add({
                id: 'reasonFilter',
                property: 'reason',
                value: filterValue,
                // exactMatch: true,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.reasonFilter) {
            filters.remove(this.reasonFilter);
            this.reasonFilter = null;
        }
    },

    onUsercreateFilterKeyup: function(){
        var viewModel = this.getViewModel();
        var filterValue = viewModel.get('UsercreateFilterValue');
        var store = viewModel.getStore('StockinStore');
        var filters = store.getFilters();

        if (filterValue != null) {
            this.UsercreateFilter = filters.add({
                id: 'UsercreateFilter',
                property: 'usercreate_name',
                value: filterValue,
                // exactMatch: true,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.UsercreateFilter) {
            filters.remove(this.UsercreateFilter);
            this.UsercreateFilter = null;
        }
    },

    // stockind
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
    renderUnit: function(val, meta, record, rindex, cindex, store) {
        if (null != val){
            var viewModel = this.getViewModel();
            var UnitStore = viewModel.getStore('UnitStore');
            if (null!=UnitStore){
                var objUnit = UnitStore.data.find('id', val);
                // console.log(objUnit.data);
                return objUnit.data.code;
            }
        }
    },
    onPContract_Stockin: function (pcontractid) {
        // console.log(pcontractid);
        var viewmodel = this.getViewModel();
        viewmodel.set('pcontractid_link', pcontractid);
        var store = viewmodel.getStore('StockinStore');
        var stockintypeid_link_from = 1;
        var stockintypeid_link_to = 20;
        var status = [-1,0,1,2];
        store.loadStore_Material_pcontract(null, null, null, 
            null, stockintypeid_link_from, stockintypeid_link_to,
            status, pcontractid, null, null);

        var StockinD_Store = viewmodel.getStore('StockinD_Store');
        StockinD_Store.removeAll();
    },
    sortStore: function(){
        var viewmodel = this.getViewModel();
        var StockinStore = viewmodel.getStore('StockinStore');
        StockinStore.getSorters().removeAll();
        StockinStore.getSorters().add({
            property: 'status',
            direction: 'ASC '
        },{
            property: 'stockindate',
            direction: 'DESC'
        });
    },

    //
    onStatusComboValueTriggerClick: function(){
        var viewmodel = this.getViewModel();
        var statusComboValue = viewmodel.get('statusComboValue');
        viewmodel.set('statusComboValue', null);
        this.onStatusFilterKeyup();
        // console.log(statusComboValue);
    },
    onStockinTypeComboValueTriggerClick: function(){
        var viewmodel = this.getViewModel();
        var stockinTypeComboValue = viewmodel.get('stockinTypeComboValue');
        viewmodel.set('stockinTypeComboValue', null);
        this.onStockinTypeFilterKeyup();
        // console.log(stockinTypeComboValue);
    },
})