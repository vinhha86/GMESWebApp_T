Ext.define('GSmartApp.view.RFID.demoRFID.encode.encode_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.encode_ViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        var storeType = viewmodel.getStore('StoreType');
        storeType.loadStore();
    },
    control: {
        '#btnIn': {
            click: 'onPrint'
        },
        '#btnEncode': {
            click: 'onEncode'
        },
        '#btnInEncode': {
            click: 'onEncodeAndPrint'
        },
        '#cmbLoaiKho': {
            select: 'onSelectLoaiKho'
        },
        '#btnViewQrcode': {
            click: 'onShowQrcode'
        }
    },
    CheckValidate: function () {
        var viewmodel = this.getViewModel();
        var form = this.getView();
        var type = viewmodel.get('type');
        var encode = viewmodel.get('encode');

        var mes = "";
        if (type.en_name && encode.name == '') {
            mes = "Bạn chưa nhập tên nhãn";
        }
        else if (type.en_code && encode.code == '') {
            mes = "Bạn chưa nhập mã";
        }
        else if (type.en_lot && encode.lot == '') {
            mes = "Bạn chưa nhập lot";
        }
        else if (type.en_exp && encode.exp == '') {
            mes = "Bạn chưa nhập ngày hết hạn";
        }
        else if (type.id == 0) {
            mes = "Bạn chưa chọn loại kho";
        }

        return mes;
    },
    onEncodeAndPrint: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        var mes = me.CheckValidate();
        if (mes == "") {
            var form = Ext.create('Ext.window.Window', {
                height: 200,
                width: 500,
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'In nhãn và Mã hóa',
                closeAction: 'destroy',
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'encode_detail_View',
                    viewModel: {
                        data: {
                            type_print: 3,
                            encode: viewmodel.get('encode')
                        }
                    }
                }]
            });

            form.show();
        }
        else {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: mes,
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
    },
    onEncode: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        var mes = me.CheckValidate();
        if (mes == "") {
            var form = Ext.create('Ext.window.Window', {
                height: 200,
                width: 500,
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Mã hóa',
                closeAction: 'destroy',
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'encode_detail_View',
                    viewModel: {
                        data: {
                            type_print: 2,
                            encode: viewmodel.get('encode')
                        }
                    }
                }]
            });

            form.show();
        }
        else {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: mes,
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
    },
    onPrint: function () {
        var me = this;
        var mes = me.CheckValidate();
        var viewmodel = this.getViewModel();
        if (mes == "") {
            var form = Ext.create('Ext.window.Window', {
                height: 200,
                width: 500,
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'In nhãn',
                closeAction: 'destroy',
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'encode_detail_View',
                    viewModel: {
                        data: {
                            type_print: 1,
                            encode: viewmodel.get('encode')
                        }
                    }
                }]
            });

            form.show();
        }
        else {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: mes,
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
    },
    onShowQrcode: function () {
        var viewmodel = this.getViewModel();
        if (viewmodel.get('encode.code') != '') {
            var form = Ext.create('Ext.window.Window', {
                height: 270,
                width: 230,
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'QR Code',
                closeAction: 'destroy',
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'ViewQrcode',
                    viewModel: {
                        data: {
                            code: viewmodel.get('encode.code'),
                            name: viewmodel.get('encode.name'),
                            type: viewmodel.get('type.id')
                        }
                    }
                }]
            });

            form.show();
        }
        else {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa nhập code",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
    },
    onSelectLoaiKho: function (cmb, rec, e) {
        var viewmodel = this.getViewModel();
        viewmodel.set('type', rec.data);
    }
})