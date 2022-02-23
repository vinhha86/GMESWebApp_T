Ext.define('GSmartApp.view.Schedule.Plan.FilterBar_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FilterBar_Controller',
    init: function () {
        var viewmodel = this.getViewModel();

        var VendorStore = viewmodel.getStore('Vender');
        var EndBuyerStore = viewmodel.getStore('EndBuyer');

        VendorStore.loadStore(11, false);
        EndBuyerStore.loadStore(12, false);
        common.Check_Object_Permission();
    },
    control: {
        '#checkYCSX': {
            change: 'onSearch'
        },
        '#hideView': {
            click: 'onHideView'
        }
    },
    onHideView: function () {
        var grid = this.getView();
        var main = grid.up('Schedule_Plan_Porder_MainView');
        main.getLayout().setActiveItem(1);
    },
    onZoomIn: function () {
        var viewmodel = this.getViewModel();
        var panel_plan = Ext.getCmp('treeplan');
        panel_plan.zoomIn();
        panel_plan.setStartDate(viewmodel.get('schedule.startDate'));
        panel_plan.setEndDate(viewmodel.get('schedule.endDate'));
    },
    onCollapse: function () {
        var panel_orderungranted = Ext.getCmp('Schedule_plan_POrderUnGranted');
        // var plugin
    },
    onZoomOut: function () {
        var viewmodel = this.getViewModel();
        var panel_plan = Ext.getCmp('treeplan');
        panel_plan.zoomOut();
        panel_plan.setStartDate(viewmodel.get('schedule.startDate'));
        panel_plan.setEndDate(viewmodel.get('schedule.endDate'));
    },
    onGrantToOrgTap: function () {
        var viewmodel = this.getViewModel();
        var panel_orderungranted = Ext.getCmp('Schedule_plan_POrderUnGranted');
        var panel_guessview = Ext.getCmp('Schedule_plan_Schedule_plan_GuestView');
        if (null != panel_orderungranted) {
            if (panel_orderungranted.getHidden()) {
                var store = viewmodel.getStore('POrderUnGranted');
                var golive_from = viewmodel.get('schedule.startDate');
                var golive_to = viewmodel.get('schedule.endDate');
                store.loadFree_bygolivedate(golive_from, golive_to);

                var store_req = viewmodel.getStore('Porder_Req_Store');
                store_req.load_byOrg();

                var Porder_Req_Granted_Store = viewmodel.getStore('Porder_Req_Granted_Store');
                Porder_Req_Granted_Store.load_reqGranted();

                panel_orderungranted.setHidden(false);
                panel_guessview.setHidden(true);
            }
            else {
                panel_orderungranted.setHidden(true);
            }
        }
    },
    setHiddenAllTab: function () {
        var tabs = Ext.getCmp('Schedule_plan_POrderUnGranted');
        for (var i = 0; i < tabs.items.length; i++) {
            var item = tabs.items[i];
            item.tab.hide();
        }
    },
    onLenhThayDoi: function () {
        var viewmodel = this.getViewModel();
        var panel_orderungranted = Ext.getCmp('Schedule_plan_POrderUnGranted');
        var panel_guessview = Ext.getCmp('Schedule_plan_Schedule_plan_GuestView');
        var tab = panel_orderungranted.child('#PorderChange_Productivity');
        tab.tab.show();
        panel_orderungranted.setActiveTab(tab);

        var Porder_Req_Granted_Store = viewmodel.getStore('POrder_Change_Store');
        Porder_Req_Granted_Store.Load_Grant_Change();

        if (null != panel_orderungranted) {
            if (panel_orderungranted.getHidden()) {

                panel_orderungranted.setHidden(false);
                panel_guessview.setHidden(true);
            }
            else {
                tab.tab.hide();
                panel_orderungranted.setHidden(true);
            }
        }
    },
    onLenhThucTe: function () {
        var viewmodel = this.getViewModel();
        var panel_orderungranted = Ext.getCmp('Schedule_plan_POrderUnGranted');
        var panel_guessview = Ext.getCmp('Schedule_plan_Schedule_plan_GuestView');
        var tab = panel_orderungranted.child('#POLineView_khsx');
        tab.tab.show();
        panel_orderungranted.setActiveTab(tab);

        var POLineStore = viewmodel.getStore('POLineStore');
        // Porder_Req_Granted_Store.Load_Grant_Change();

        if (null != panel_orderungranted) {
            if (panel_orderungranted.getHidden()) {

                panel_orderungranted.setHidden(false);
                panel_guessview.setHidden(true);
            }
            else {
                tab.tab.hide();
                panel_orderungranted.setHidden(true);
            }
        }
    },
    onDaXepKeHoach: function () {
        var viewmodel = this.getViewModel();
        var panel_orderungranted = Ext.getCmp('Schedule_plan_POrderUnGranted');
        var panel_guessview = Ext.getCmp('Schedule_plan_Schedule_plan_GuestView');
        var tab = panel_orderungranted.child('#Porder_Req_Granted');
        tab.tab.show();
        panel_orderungranted.setActiveTab(tab);

        var Porder_Req_Granted_Store = viewmodel.getStore('Porder_Req_Granted_Store');
        Porder_Req_Granted_Store.load_reqGranted();

        if (null != panel_orderungranted) {
            if (panel_orderungranted.getHidden()) {

                panel_orderungranted.setHidden(false);
                panel_guessview.setHidden(true);
            }
            else {
                // tab.tab.hide();
                // panel_orderungranted.setHidden(true);
            }
        }
    },
    onLenhChuaPhanChuyen: function () {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var panel_orderungranted = Ext.getCmp('Schedule_plan_POrderUnGranted');
        var panel_guessview = Ext.getCmp('Schedule_plan_Schedule_plan_GuestView');
        var tab = panel_orderungranted.child('#POrderUnGranted');
        tab.tab.show();
        panel_orderungranted.setActiveTab(tab);
        panel_orderungranted.setLoading("Đang tải dữ liệu");

        var store = viewmodel.getStore('POrderUnGranted');
        var golive_from = viewmodel.get('schedule.startDate');
        var golive_to = viewmodel.get('schedule.endDate');
        store.loadFree_groupby_product(golive_from, golive_to, function (records, operation, success) {
            panel_orderungranted.setLoading(false);
        });

        if (null != panel_orderungranted) {
            if (panel_orderungranted.getHidden()) {


                panel_orderungranted.setHidden(false);
                panel_guessview.setHidden(true);
            }
            else {
                // tab.tab.hide();
                // panel_orderungranted.setHidden(true);
            }
        }
    },
    onYeuCauXepKeHoach: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        var panel_orderungranted = Ext.getCmp('Schedule_plan_POrderUnGranted');
        var panel_guessview = Ext.getCmp('Schedule_plan_Schedule_plan_GuestView');
        var tab = panel_orderungranted.child('#Porder_Req');
        tab.tab.show();
        panel_orderungranted.setActiveTab(tab);

        // var store_req = viewmodel.getStore('Porder_Req_Store');
        // store_req.load_byOrg();

        if (null != panel_orderungranted) {
            if (panel_orderungranted.getHidden()) {
                panel_orderungranted.setHidden(false);
                panel_guessview.setHidden(true);
            }
            else {
                // panel_orderungranted.setHidden(true);
            }
        }
    },
    onYeuCauXepKeHoach_ChaoGia: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        var panel_orderungranted = Ext.getCmp('Schedule_plan_POrderUnGranted');
        var panel_guessview = Ext.getCmp('Schedule_plan_Schedule_plan_GuestView');
        var tab = panel_orderungranted.child('#Schedule_POrderReq_View');
        tab.tab.show();
        panel_orderungranted.setActiveTab(tab);
        // tab.setLoading("Đang tải dữ liệu");
        // var store_req = viewmodel.getStore('PContractrPoductPOStore');
        // store_req.getOffers_byOrg_noLoad();
        // store_req.load({
        //     scope: this,
        //     callback: function(){
        //         tab.setLoading(false);
        //     }
        // })

        if (null != panel_orderungranted) {
            if (panel_orderungranted.getHidden()) {
                panel_orderungranted.setHidden(false);
                panel_guessview.setHidden(true);
            }
        }
    },
    onGuessView: function () {
        var panel_guessview = Ext.getCmp('Schedule_plan_Schedule_plan_GuestView');
        var panel_orderungranted = Ext.getCmp('Schedule_plan_POrderUnGranted');
        if (null != panel_guessview) {
            if (panel_guessview.getHidden()) {
                panel_guessview.setHidden(false);
                panel_orderungranted.setHidden(true);

                var crud = panel_guessview.down('#treeplanguest').getCrudManager();
                crud.load();
            }
            else
                panel_guessview.setHidden(true);
        }
    },
    onExport: function () {
        var me = Ext.getCmp('treeplan');
        me.print();
    },
    onSearch: function () {
        var sch = Ext.getCmp('treeplan');
        var crud = sch.getCrudManager();

        var viewmodel = this.getViewModel();
        sch.setStartDate(viewmodel.get('schedule.startDate'));
        var end = viewmodel.get('schedule.endDate');

        sch.setEndDate(Sch.util.Date.add(end, 'd', 1));

        var params = new Object();
        params.listid = viewmodel.get('schedule.listid');
        params.startDate = viewmodel.get('schedule.startDate');
        params.endDate = viewmodel.get('schedule.endDate');
        params.PO_code = viewmodel.get('schedule.PO');
        params.product_buyercode = viewmodel.get('schedule.product_buyercode');
        params.contractcode = viewmodel.get('schedule.contractcode');
        params.Buyer = viewmodel.get('schedule.buyer');
        params.Vendor = viewmodel.get('schedule.vendor');
        params.isReqPorder = viewmodel.get('schedule.isReqPorder');
        params.isAllgrant = viewmodel.get('schedule.isAllgrant');

        crud.transport.load.requestConfig.params = params;
        crud.load();
    },
    onShowKHGH: function () {
        var panel_po = Ext.getCmp('PContract_PO_Edit');
        var west_cmp = panel_po.down('#panel_cmp');
        west_cmp.setHidden(true);
        var west_salaryfund = panel_po.down('#panel_salaryfund');
        west_salaryfund.setHidden(true);

        var west_po = panel_po.down('#panel_po');
        west_po.setHidden(!west_po.getHidden());
    },
    onShowCMP: function () {
        var panel_po = Ext.getCmp('PContract_PO_Edit');
        var west_po = panel_po.down('#panel_po');
        west_po.setHidden(true);
        var west_salaryfund = panel_po.down('#panel_salaryfund');
        west_salaryfund.setHidden(true);

        var west_cmp = panel_po.down('#panel_cmp');
        west_cmp.setHidden(!west_cmp.getHidden());
    },
    onShowSalaryFund: function () {
        var panel_po = Ext.getCmp('PContract_PO_Edit');
        var west_po = panel_po.down('#panel_po');
        west_po.setHidden(true);
        var west_cmp = panel_po.down('#panel_cmp');
        west_cmp.setHidden(true);

        var west_salaryfund = panel_po.down('#panel_salaryfund');
        west_salaryfund.setHidden(!west_salaryfund.getHidden());
    }
})