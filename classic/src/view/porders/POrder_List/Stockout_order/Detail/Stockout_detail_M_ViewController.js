Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detai.Stockout_detail_M_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_detail_M_ViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        var order = viewmodel.get('order');

        var orgFromStore = viewmodel.getStore('OrgFromStore');

        var OrgToStore = viewmodel.getStore('OrgToStore');
        if (order.stockouttypeid_link == 1) {
            OrgToStore.GetOrg_By_type(17);
            orgFromStore.GetOrg_By_type(3);
        }
        else {
            orgFromStore.GetOrg_By_type(19);
            OrgToStore.GetOrg_By_type(14);
        }

        var userStore = viewmodel.getStore('UserStore');
        userStore.loadUserbyOrg(-1);

        if (order.id == null) {
            var sesion = GSmartApp.util.State.get('session');
            viewmodel.set('order.timecreate', new Date());
            viewmodel.set('order.orderdate', new Date());
            viewmodel.set('order.usercreateid_link', sesion.id);
            viewmodel.set('order.unitid_link', 1); //1 = met; 3 = yard
        }

        var UnitStore = viewmodel.getStore('UnitStore');
        UnitStore.loadStore();
    },
    control: {
        '#cmbDonViTinh': {
            select: 'onSelectDVT'
        }
    },
    onSelectDVT: function (cmb, rec, e) {
        var viewmodel = this.getViewModel();
        var store_d = viewmodel.getStore('Stockout_order_d_Store');
        for (var i = 0; i < store_d.data.length; i++) {
            var data = store_d.data.items[i];
            data.set('unitid_link', rec.get('id'));
            data.set('unitName', rec.get('name'));
        }
    }
})