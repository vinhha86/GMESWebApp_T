Ext.define('GSmartApp.view.devices.DS_ThietBiViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DS_ThietBiViewController',

    init: function (view) {
        var viewmodel = view.getViewModel();
        var ds_thietbi_tore = viewmodel.getStore('ds_thietbi_store');
        ds_thietbi_tore.load_device_active();
        
        var loai_thietbi_tore = viewmodel.getStore('loai_thietbi_store');
        loai_thietbi_tore.loadStore();

        var OrgToStore = viewmodel.getStore('ds_cuahang_kho_store');
        var listidtype = "8,4";
        OrgToStore.loadStore_allchildren_byorg(listidtype);

    },
})