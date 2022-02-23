Ext.define('GSmartApp.store.POrder', {
    extend: 'Ext.data.Store',

    alias: 'store.porder',

    model: 'GSmartApp.model.POrder',

    data: { items: [
        { id: '1', ordercode: "45S2226", orderdate: "01/10/2019", productid_link: "1", totalorder: "100", golivedate: "25/10/2019", golivedesc: "25/10/2019", balancerate: "0.6", usercreateid_link: "1", timecreate: "25/10/2019 10:20"},
        { id: '2', ordercode: "48C4753", orderdate: "01/10/2019", productid_link: "1", totalorder: "100", golivedate: "10/10/2019", golivedesc: "25/10/2019", balancerate: "0.3", usercreateid_link: "1", timecreate: "25/10/2019 10:20"},
        { id: '3', ordercode: "18B7640", orderdate: "01/10/2019", productid_link: "1", totalorder: "100", golivedate: "10/10/2019", golivedesc: "25/10/2019", balancerate: "1", usercreateid_link: "1", timecreate: "25/10/2019 10:20"},
        { id: '4', ordercode: "39B7567", orderdate: "01/10/2019", productid_link: "1", totalorder: "100", golivedate: "10/10/2019", golivedesc: "25/10/2019",balancerate: "0.8", usercreateid_link: "1", timecreate: "25/10/2019 10:20"}
    ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
