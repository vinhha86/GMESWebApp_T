Ext.define('GSmartApp.view.RFID.demoRFID.inv.ViewQrcode_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ViewQrcode_ViewModel',
    data: {
        name: '',
        code: '',
        type: '',
        epc: '',
        typeView: 0
    },
    formulas: {
        qrcode_demo: function (get) {
            var code = get('code');
            var url = "";
            if (get('typeView') == 0) {
                url = 'http://api.labelary.com/v1/printers/8dpmm/labels/3x3/0/%5Exa%5Ecfo,60%5Efo100,50%5EFDGPAY.VN%5Efs%5Ecfa,30%5Efo10,420%5Efd' + code + '%5Efs%5Efo100,100%5Ebqn,2,10%5Efdqa,' + code + '%5Efs%5Exz';
            }
            else {
                var epc = get('epc');
                // var urlbase = config.getAppBaseUrl();
                // console.log(urlbase + "/api/v1/qrcode/getqr_code_bike_number?text=");
                // console.log("http://localhost:8990/gsmartcore/api/v1/qrocde/getqr_code_bike_number?text=");
                // url = urlbase + "/api/v1/qrcode/getqr_code_bike_number?text=" + epc
                url = 'http://gpay.vn:8090/gmes/api/v1/qrocde/getqr_code_bike_number?text=' + epc;
            }
            return url;
        }
    }
});
