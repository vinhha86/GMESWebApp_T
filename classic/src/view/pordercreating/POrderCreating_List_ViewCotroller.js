Ext.define('GSmartApp.view.pordercreating.POrderCreating_List_ViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderCreating_List_ViewCotroller',
    isActivate: false,
    init: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractStore');
        store.loadStore_ByPage(25, 1, "", "", 0, 0, 0);
    },
    control: {
        '#PContractMainView': {
            activate: 'onActivate'
        },
        '#orgcustomerid_link': {
            select: 'onloadPage'
        },
        '#branchid_link': {
            select: 'onloadPage'
        }, 
        '#seasonid_link': {
            select: 'onloadPage'
        },
        '#btnTimKiem': {
            click: 'onloadPage'
        },
        '#cust_contractcode': {
            specialkey: 'onSpecialkey'
        },
        '#contractcode': {
            specialkey: 'onSpecialkey'
        },
        '#limitpage': {
            specialkey: 'onSpecialkey'
        },
    },
    onActivate: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        var KHStore = viewmodel.getStore('CustomerStore');
        KHStore.loadStore(10, true);

        var BranchStore = viewmodel.getStore('BranchStore');
        var SeasonStore = viewmodel.getStore('SeasonStore');
        BranchStore.loadStore(true);
        SeasonStore.loadStore(true);

        if (me.isActivate) {
            me.onloadPage();
        }
        me.isActivate = true;


    },
    onSpecialkey: function (field, e) {
        var me = this;
        if (field.itemId == "limitpage") {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('PContractStore');
            store.currentPage = 1;
        }
        if (e.getKey() == e.ENTER) {
            me.onloadPage();
        }
    },
    onloadPage: function () {
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractStore');

        var limit = me.down('#limitpage').getValue();
        var cust_contractcode = me.down('#cust_contractcode').getValue();
        var contractcode = me.down('#contractcode').getValue();
        var orgcustomerid_link = me.down('#orgcustomerid_link').getValue();
        var branchid_link = me.down('#branchid_link').getValue();
        var seasonid_link = me.down('#seasonid_link').getValue();
        var page = store.currentPage;

        if (limit == null) {
            limit = 25;
        }

        if (page == null) {
            page = 1;
        }

        if (cust_contractcode == null) {
            cust_contractcode = "";
        }

        if (contractcode == null) {
            contractcode = "";
        }

        if (orgcustomerid_link == null) {
            orgcustomerid_link = 0;
        }

        if (branchid_link == null) {
            branchid_link = 0;
        }

        if (seasonid_link == null) {
            seasonid_link = 0;
        }

        store.loadStore_ByPage(limit, page, cust_contractcode, contractcode, orgcustomerid_link,
            branchid_link, seasonid_link);
    },
    onCreatePOrder: function(grid, rowIndex, colIndex){
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        this.redirectTo("lsporder_creating/" + id + "/edit");
    }
})