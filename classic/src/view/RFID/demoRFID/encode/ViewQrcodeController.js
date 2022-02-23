Ext.define('GSmartApp.view.RFID.demoRFID.encode.ViewQrcodeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ViewQrcodeController',
    init: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        if (viewmodel.get('typeView') == 0)
            me.generateEpcInQrcode();
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        }
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    generateEpcInQrcode: function () {
        var viewmodel = this.getViewModel();
        var epc = "";

        var params = new Object();
        params.code = viewmodel.get('code');
        params.name = viewmodel.get('name');
        params.type = viewmodel.get('type');
        var url = 'demorfid/genepc';

        GSmartApp.Ajax.post_demo(url, Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        epc = response.epc;
                        console.log('epc' + epc);
                    }
                    viewmodel.set('code', epc);
                }
            })

    }
})