Ext.define('GSmartApp.view.dashboard_khotp.Dashboard_KhoTP_POLine_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Dashboard_KhoTP_POLine_Controller',
    init: function () {
        this.loadBuyer();
        this.loadShipmode();
        this.loadPO_HavetoShip();
    },
    control: {
        '#Dashboard_KhoTP_POLine_List': {
            itemclick: 'onSelectProduct'
        },
        '#btnStockoutOrder_Create': {
            click: 'onStockoutOrder_Create'
        },
        '#btnTimKiem': {
            click: 'loadPO_HavetoShip'
        }
    },
    loadBuyer: function(){
        var viewmodel = this.getViewModel();
        var EndBuyer = viewmodel.getStore('EndBuyer');
        EndBuyer.loadStore(12);
    },
    loadShipmode: function(){
        var viewmodel = this.getViewModel();
        var ShipModeStore = viewmodel.getStore('ShipModeStore');
        if (null != ShipModeStore) {
            ShipModeStore.loadStore();
            ShipModeStore.getSorters().add('name');
        }
    },
    loadPO_HavetoShip: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POLineStore');
        store.getpo_havetoship(viewmodel.get('shipdate_from'), viewmodel.get('shipdate_to'), viewmodel.get('orgbuyerid_link'));
    },
    onSelectProduct: function (t, record, index, eOpts) {
        var m = this;
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var storeSku = viewmodel.getStore('PContractSKUStore');
        var pcontract_poid_link = record.data.id;
        storeSku.load_by_pcontract_po_avail(pcontract_poid_link, 1);

        var storePo_Orgs = viewmodel.getStore('POLine_Orgs_Store');
        storePo_Orgs.loadStore_Preview_ByPO(pcontract_poid_link);

        // console.log(record);
        var pcontract_poid = record.data.id;
        viewmodel.set('porderGrant', null);
        m.getPorderGrantInfo(pcontract_poid);
    },
    onStockoutOrder_Create: function(){
        //Lấy danh sách các PO Line được chọn --> Gửi lên để tạo Stockout_order
        var me = this.getView();
        var th = this;

        me.setLoading(true);
        var poLinesView = me.down('#Dashboard_KhoTP_POLine_List');

        var data = '';
        var select = poLinesView.getSelectionModel().getSelection();

        if (select.length == 0) {
            me.setLoading(false);
            return;
        }
        for (var i = 0; i < select.length; i++) {
            data = data + select[i].data.id + ';';
            // data.push(select[i].data);
        }
        console.log(data);

        var params = new Object();
        params.list_po = data;

        GSmartApp.Ajax.post('/api/v1/stockoutorder/create_from_po', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    // console.log(response);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Tạo lệnh xuất kho thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        //Refresh lại danh sách PO Line
                        th.loadPO_HavetoShip();
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    // console.log(response);
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
    },
    renderShipping: function (val, metaData, record, rindex, cindex, store) {
        metaData.tdCls = 'po_linekh';
        if (null != val) {
            var viewmodel = this.getViewModel();
            var ShipModeStore = viewmodel.getStore('ShipModeStore');
            if (null != ShipModeStore) {
                var objUnit = ShipModeStore.data.find('id', val);
                // console.log(objUnit.data);
                return objUnit.data.name;
            }
        }
    },
    renderSum: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onFilterPOKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('POLineStore');
        var filterField = this.lookupReference('filterPO'),
            filters = store.getFilters();

        if (filterField.value) {
            this.filterPO = filters.add({
                id: 'filterPO',
                property: 'po_buyer',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.filterPO) {
            filters.remove(this.filterPO);
            this.filterPO = null;
        }
    },
    onFilterMaSPKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('POLineStore');
        var filterField = this.lookupReference('filterMaSP'),
            filters = store.getFilters();

        if (filterField.value) {
            this.filterPO = filters.add({
                id: 'filterMaSP',
                property: 'productbuyercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.filterPO) {
            filters.remove(this.filterPO);
            this.filterPO = null;
        }
    },
    onMenuShow: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var viewModel = this.getViewModel();
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: viewModel,
            items: [
                {
                    text: 'Cân đối nguyên phụ liệu',
                    itemId: 'btnBalance_MaSP',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-balance-scale blueIcon',
                    handler: function () {
                        var record = this.parentMenu.record;
                        // me.onEdit(record);
                        // console.log(record);
                        me.porderGrantSkuPlan();
                    },
                    bind: {
                        disabled: '{isbtnBalance_MaSP_disabled}'
                    },
                },
                {
                    text: 'Tiến độ sản xuất',
                    itemId: 'btnProcessing_MaSP',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-trash greenIcon',
                    handler: function () {
                        var record = this.parentMenu.record;
                        // me.onXoa(record);
                        // console.log(record);
                        me.bieuDo_TienDo();
                    },
                    bind: {
                        disabled: '{isbtnBalance_MaSP_disabled}'
                    },
                }
            ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX() - 10, e.getY() - 10];
        e.stopEvent();
        menu_grid.record = record;
        menu_grid.showAt(position);
        common.Check_Menu_Permission(menu_grid);
    },

    getPorderGrantInfo: function(pcontract_poid){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var params = new Object();
        params.pcontract_poid_link = pcontract_poid;
        GSmartApp.Ajax.post('/api/v1/porder_grant/getByPcontractPo', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        console.log(response);
                        viewModel.set('porderGrant', response.data);
                        // viewModel.set('porderGrant', response);
                    }
                } else {
                    viewModel.set('porderGrant', null);
                }
            })
    },

    bieuDo_TienDo: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var porderGrant = viewModel.get('porderGrant');
        var porderid_link = porderGrant == null ? null : porderGrant.porderid_link;;

        if(porderid_link != null){
            // var sourceView = 'Dashboard_KhoTP_POLine_Main';

            var form = Ext.create('Ext.window.Window', {
                // height: '90%',
                // width: '95%',
                height: 450,
                width: 700,
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Tiến độ lệnh sản xuất',
                closeAction: 'destroy',
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'Dashboard_KhoTP_BieuDo_Main',
                    viewModel: {
                        data: {
                            porder_id: porderid_link,
                        }
                    }
                }]
            });
            form.show();

            // form.down('#Dashboard_KhoTP_BieuDo_Main').getController().on('Thoat', function () {
            //     form.close();
            // })
        }
    },
    porderGrantSkuPlan: function (eventRecord) {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var porderGrant = viewModel.get('porderGrant');
        var porder_grantid_link = porderGrant == null ? null : porderGrant.id;
        // var porder_grantid_link = porderGrant == null ? null : porderGrant.get('id');

        if(porder_grantid_link != null){
            var sourceView = 'Dashboard_KhoTP_POLine_Main';

            var form = Ext.create('Ext.window.Window', {
                height: '90%',
                width: '95%',
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Kế hoạch vào chuyền',
                closeAction: 'destroy',
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'POrder_Grant_SKU_Plan_Main_View',
                    viewModel: {
                        data: {
                            sourceView: sourceView,
                            eventRecord: porderGrant,
                            porder_grantid_link: porder_grantid_link
                        }
                    }
                }]
            });
            form.show();

            form.down('#POrder_Grant_SKU_Plan_Main_View').getController().on('Thoat', function (productivity) {
                form.close();
            })
        }
    },
});
