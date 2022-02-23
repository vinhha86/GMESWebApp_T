Ext.define('GSmartApp.view.pcontract.PContract_PO.Price.PriceDSKU.PriceDSKUDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PriceDSKUDetailController',
    init: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();

        var CurrencyStore = viewModel.getStore('CurrencyStore');
        CurrencyStore.loadStore();

        var price_d_sku_record = viewModel.get('price_d_sku_record');
        var price_d_record = viewModel.get('price_d_record');

        console.log(price_d_sku_record);
        console.log(price_d_record);

        this.loadInfo();
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onLuu'
        }
    },
    loadInfo: function(){
        var me = this.getView();
        var viewModel = this.getViewModel();
        var price_d_sku_record = viewModel.get('price_d_sku_record');
        var price_d_record = viewModel.get('price_d_record');

        var materialid_link = price_d_sku_record.get('materialid_link');

        var materialid_link_list = new Array();
        if(materialid_link != null){
            materialid_link_list.push(materialid_link);
        }

        var params = new Object();
        params.materialid_link_list = materialid_link_list;

        GSmartApp.Ajax.post('/api/v1/fabricprice/getByMaterialIdLink', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    // console.log(response);
                    viewModel.set('id', response.data.id);
                    viewModel.set('materialid_link', response.data.materialid_link);
                    viewModel.set('price_per_kg', response.data.price_per_kg);
                    viewModel.set('m_per_kg', response.data.m_per_kg);
                    viewModel.set('price_per_m', response.data.price_per_m);
                    // viewModel.set('currencyid_link', response.data.currencyid_link);
                    me.down('#currencyid_link').setValue(response.data.currencyid_link);

                } else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Lấy thông tin thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onLuu: function () {
        var m = this;
        var viewModel = this.getViewModel();
        var me = this.getView();
        var params = new Object();
        var data = new Object();
        data.id = viewModel.get('id');
        data.materialid_link = viewModel.get('materialid_link');
        data.price_per_kg = viewModel.get('price_per_kg');
        data.m_per_kg = viewModel.get('m_per_kg');
        data.price_per_m = viewModel.get('price_per_m');
        data.currencyid_link = me.down('#currencyid_link').getValue();
        params.data = data;

        GSmartApp.Ajax.post('/api/v1/fabricprice/update', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var res = Ext.decode(response.responseText);
                    if (res.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });

                        // gửi po curencyid_link, unitid_link và materialid_lonk để tính ra rate chuyển đổi
                        // lấy được response thì fireEvent rồi xử lý theo response
                        m.setPriceForPriceDSku();
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onChange: function( datefield, newValue, oldValue, eOpts){
        var enddatefield = this.lookupReference('enddate');
        enddatefield.setDisabled(false);
        enddatefield.setMinValue(newValue);
        enddatefield.setValue(newValue);
    },

    setPriceForPriceDSku: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var price_d_record = viewModel.get('price_d_record');
        var materialid_link = viewModel.get('materialid_link');

        var currencyid_link = viewModel.get('po_currencyid_link');
        var unitid_link = price_d_record.get('unitid_link');
        var materialid_link_list = new Array();
        materialid_link_list.push(materialid_link);

        var params = new Object();

        params.materialid_link_list = materialid_link_list;
        params.currencyid_link = currencyid_link;
        params.unitid_link = unitid_link;

        console.log(params);

        GSmartApp.Ajax.post('/api/v1/fabricprice/getByMaterial', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    // FabricPriceStore.load();
                    var response = Ext.decode(response.responseText);
                    // console.log(response.data);
                    m.fireEvent("updateFabricPrice", response.data);
                }
            })
    }
})