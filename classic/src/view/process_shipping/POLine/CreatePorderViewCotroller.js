Ext.define('GSmartApp.view.process_shipping.POLine.CreatePorderViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CreatePorderViewCotroller',
    init: function () {
        var me = this;
        var viewmodel = this.getViewModel();

        var listidtype = "13";
        var OrgStore = viewmodel.getStore('OrgStore');
        OrgStore.loadStore_allchildren_byorg(listidtype);

        // me.loadInfo();
    },
    control: {
        '#cmbOrg': {
            select: 'onSelectDV'
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#date_startdate': {
            collapse: 'onDateChange'
        },
        '#date_enddate': {
            collapse: 'onDateChange'
        },
        '#duration': {
            specialkey: 'onSpecialkey',

        },
        '#productivity': {
            specialkey: 'onSpecialkey',
            focusleave: 'onFocusleave'
        },
        '#btnChon': {
            click: 'onChon'
        }
    },
    onChon: function () {
        var params = new Object();
        var viewmodel = this.getViewModel();
        var view = this.getView();

        params.startdate = viewmodel.get('startdate');
        params.enddate = viewmodel.get('enddate');
        params.quantity = viewmodel.get('quantity');
        params.duration = viewmodel.get('duration');
        params.productivity = viewmodel.get('productivity');
        params.orgid_link = viewmodel.get('orgid_link');
        params.orggrantid_link = viewmodel.get('orggrantid_link');
        params.pcontract_poid_link = viewmodel.get('pcontract_poid_link');
        params.productid_link = viewmodel.get('productid_link');

        GSmartApp.Ajax.post('/api/v1/schedule/create_porder_and_grant', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        view.fireEvent('Create', response.data, viewmodel.get('orgid_link'), viewmodel.get('orggrantid_link'));
                    }
                }
            })
    },
    onFocusleave: function () {
        var me = this;
        me.onProductivityChange();
    },
    onSpecialkey: function (field, e) {
        var me = this;
        if (e.getKey() == e.ENTER || e.getKey() == 9) {
            if (field.itemId == "duration") {
                me.onDurationChange();
            }
            else if (field.itemId == "productivity") {
                me.onProductivityChange();
            }
        }
    },
    onDurationChange: function () {
        var grid = this.getView();
        grid.setLoading('Đang tải dữ liệu');

        var viewmodel = this.getViewModel();
        var params = new Object();
        params.startdate = viewmodel.get('startdate');
        params.duration = viewmodel.get('duration');
        params.quantity = viewmodel.get('quantity');

        GSmartApp.Ajax.post('/api/v1/schedule/duration_change', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        viewmodel.set('enddate', response.enddate);
                        viewmodel.set('productivity', response.productivity);
                    }
                }
            })
    },
    onProductivityChange: function () {
        var grid = this.getView();
        grid.setLoading('Đang tải dữ liệu');

        var viewmodel = this.getViewModel();
        var params = new Object();
        params.startdate = viewmodel.get('startdate');
        params.productivity = viewmodel.get('productivity');
        params.quantity = viewmodel.get('quantity');

        GSmartApp.Ajax.post('/api/v1/schedule/productivity_change', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        viewmodel.set('enddate', response.enddate);
                        viewmodel.set('duration', response.duration);
                    }
                }
            })
    },
    onDateChange: function (field, value, eOpts) {
        var grid = this.getView();
        grid.setLoading('Đang tải dữ liệu');

        var viewmodel = this.getViewModel();
        var params = new Object();
        params.startdate = viewmodel.get('startdate');
        params.enddate = viewmodel.get('enddate');
        params.quantity = viewmodel.get('quantity');

        GSmartApp.Ajax.post('/api/v1/schedule/get_duration_and_productivity', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        viewmodel.set('duration', response.duration);
                        viewmodel.set('productivity', response.productivity);
                    }
                }
            })
    },
    onSelectDV: function (cmb, record, e) {
        var viewmodel = this.getViewModel();

        var grantStore = viewmodel.getStore('OrgGrantStore');
        var parentid_link = record.get('id');
        grantStore.getbyParentandType(parentid_link, "14");
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    loadInfo: function () {
        var grid = this.getView();
        grid.setLoading('Đang tải dữ liệu');

        var viewmodel = this.getViewModel();
        var params = new Object();
        params.startdate = viewmodel.get('startdate');
        params.enddate = viewmodel.get('enddate');
        params.quantity = viewmodel.get('quantity');

        GSmartApp.Ajax.post('/api/v1/schedule/get_duration_and_productivity', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        viewmodel.set('duration', response.duration);
                        viewmodel.set('productivity', response.productivity);
                    }
                }
            })
    }
})