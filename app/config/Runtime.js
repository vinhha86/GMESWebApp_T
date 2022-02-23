/* global Ext */
/* global l10n */
/* global config */

Ext.define('GSmartApp.config.Runtime', {
    alternateClassName: [
        'config'
    ],
    singleton: true,
    config: {
        basePath: {
            dictionary: 'resources/dictionary.json'
        },
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        appBaseUrl: 'http://localhost:8990/gsmartcore',
        appBaseUrl_Jitin: 'http://localhost:8991/jitin',
        // appBaseUrl_demo: 'http://localhost:9091/',

        // appBaseUrl: 'http://172.20.10.2:8990/gsmartcore',
        // appBaseUrl_Jitin: 'http://172.20.10.2:8991/jitin',

        // appBaseUrl: 'http://27.71.231.154:8080/gmesdha',
        // appBaseUrl_Jitin: 'http://27.71.231.154:8080/jitindha',
        back: 'http://27.71.231.154:8081/oauth/',

        // appBaseUrl: 'http://gpay.vn:8090/gmes',
        // appBaseUrl_Jitin: 'http://gpay.vn:8090/jitin',
        appBaseUrl_demo: 'http://gpay.vn:9091/',
        // back: 'http://gpay.vn:8181/oauth/',

        //local
        // qrcode_personel_url: 'http://localhost:8990/gsmartcore/api/v1/qrocde/getqr_code_personel?text=',
        // qrcode_bike_number_url: 'http://localhost:8990/gsmartcore/api/v1/qrocde/getqr_code_bike_number?text=',
        // image_person: 'http://localhost:8990/gsmartcore/api/v1/qrocde/getimage_person?id=',
        // Logo: 'http://localhost:8990/gsmartcore/api/v1/qrocde/getlogo',


        //rfid demo
        qr_demo: 'http://localhost:8990/gsmartcore/api/v1/qrocde/getqr_demo?code=',

        //gpay
        qrcode_personel_url: 'http://gpay.vn:8090/gmes/api/v1/qrocde/getqr_code_personel?text=',
        qrcode_bike_number_url: 'http://gpay.vn:8090/gmes/api/v1/qrocde/getqr_code_bike_number?text=',
        image_person: 'http://gpay.vn:8090/gmes/api/v1/qrocde/getimage_person?id=',
        Logo: 'http://gpay.vn:8090/gmes/api/v1/qrocde/getlogo',

        // //dha
        // qrcode_personel_url: 'http://27.71.231.154:8080/gmesdha/api/v1/qrocde/getqr_code_personel?text=',
        // qrcode_bike_number_url: 'http://27.71.231.154:8080/gmesdha/api/v1/qrocde/getqr_code_bike_number?text=',
        // image_person: 'http://27.71.231.154:8080/gmesdha/api/v1/qrocde/getimage_person?id=',
        // Logo: 'http://27.71.231.154:8080/gmesdha/api/v1/qrocde/getlogo',
        // back: 'http://localhost:8181/oauth/',
        token: null,
        enableSSO: false,
        warmUpTime: 300000,
        dictionary: null,
        fname: null,
        avatar: null,
        pageSize: 25,
        //RFID config
        print_material_label: false,
        print_rfid_enable: true,
        // MQTT config
        deviceid: 'devsim-0002',
        termid: 'term-0004',
        clientid: 'thieutv#devops01',
        host: 'gpay.vn',
        port: 8083,
        porderTaskRunner: null
    },
    constructor: function (config) {
        this.initConfig(config);
        return this;
    }
});
