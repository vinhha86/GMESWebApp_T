Ext.define('GSmartApp.view.process_shipping.POLine.CreateManyPorderViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CreateManyPorderViewCotroller',
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
        '#btnChon': {
            click: 'onChon'
        }
    },
    onChon: function () {
        var view = this.getView();
        var params = new Object();
        var viewmodel = this.getViewModel();
        params.productivity = viewmodel.get('productivity');
        params.orgid_link = viewmodel.get('orgid_link');
        params.orggrantid_link = viewmodel.get('orggrantid_link');
        params.colorid_link = viewmodel.get('colorid_link') == null ? 0 : viewmodel.get('colorid_link');
        params.sizesetid_link = viewmodel.get('sizesetid_link') == null ? 0 : viewmodel.get('sizesetid_link');
        params.isMerger = viewmodel.get('isMerger');

        var list = [];
        for (var i = 0; i < viewmodel.get('list_po').length; i++) {
            var rec = viewmodel.get('list_po')[i].data;
            list.push(rec);
        }
        params.list_pcontract_po = list;

        GSmartApp.Ajax.post('/api/v1/schedule/create_many_porder_and_grant', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        view.fireEvent('Create', response.data, viewmodel.get('orgid_link'), viewmodel.get('orggrantid_link'), response.remove);
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
    }
})