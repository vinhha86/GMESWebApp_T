Ext.define('GSmartApp.view.RFID.demoRFID.inv.encode_detail_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.encode_detail_ViewModel',
    requires: ['GSmartApp.store.demo.device_demo_store'],
    stores: {
        device_store: {
            type: 'device_demo_store'
        }
    },
    data: {
        encode: {
            qty: 1,
            name: '',
            code: '',
            lot: '',
            exp: ''
        },
        type: {
            en_name: false,
            en_code: false,
            en_lot: false,
            en_exp: false,
            en_qty: false,
            id: 0
        },
        // 1.Chi in -- 2 Chi ma hoa -- 3 Ca in va ma hoa
        type_print: {

        }
    },
    formulas: {
        textbtn: function (get) {
            switch (get('type_print')) {
                case 1:
                    return "In nhãn";
                case 2:
                    return "Mã hóa";
                default:
                    return "In nhãn và Mã hóa"

            }
        }
    }
});
