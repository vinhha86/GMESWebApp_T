Ext.define('GSmartApp.view.pcontract.FOBPricePODetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FOBPricePODetailController',
    init: function(){
        var viewModel = this.getViewModel();
        var FOBPricePODetailStore  =  viewModel.getStore('FOBPricePODetailStore');
        // console.log(viewModel);
        var pcontract_poid_link = viewModel.get('record.id');
        console.log(pcontract_poid_link);
        // console.log(viewModel.get('record.data.id'));
        FOBPricePODetailStore.loadStore(pcontract_poid_link);
        FOBPricePODetailStore.getSorters().add('sizesetSortValue');
        FOBPricePODetailStore.getSorters().add('fobprice_name');

        var UnitStore = viewModel.getStore('UnitStore');
        UnitStore.loadStore();
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnAddFOB': {
            click: 'onAddFOB'
        }
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onAddFOB: function(){
        var viewModel = this.getViewModel();
        var pcontract_poid_link = viewModel.get('record.id');

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Danh sách giá',
            closeAction: 'destroy',
            height: 400,
            width: 400,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_FOB_Price'
            }]
        });
        form.show();

        form.down('#PContract_FOB_Price').getController().on('SelectPrice', function (select) {
            console.log(pcontract_poid_link);
            var params = new Object();
            var data = new Array();
            for(var i=0;i<select.length;i++){
                var id = select[i].data.id;
                if(id != 1){
                    data.push(select[i].data);
                }
                console.log(id);
            }

            params.data = data;
            params.pcontract_poid_link = pcontract_poid_link;

            GSmartApp.Ajax.post('/api/v1/pcontract_price_d/createPContractPriceD', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var FOBPricePODetailStore  =  viewModel.getStore('FOBPricePODetailStore');
                        FOBPricePODetailStore.load();
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Lưu thông tin thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Lưu thông tin thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })

            form.close();
        })
    },
    onPriceDItemEdit: function (editor, context, eOpts){
        // console.log('on edit price d');
        var viewModel = this.getViewModel();
        var FOBPricePODetailStore = viewModel.getStore('FOBPricePODetailStore');
        var priceD_data = context.record.data;
        // console.log(priceD_data);
        // console.log(context);

        if(context.value == "" || context.value == context.originalValue || isNaN(context.value)){
            FOBPricePODetailStore.rejectChanges(); //commitChanges()
            return;
        }

        if(context.field == 'quota' && (priceD_data.unitprice != null || priceD_data.unitprice != "")){
            priceD_data.price = Ext.Number.roundToPrecision(priceD_data.quota*priceD_data.unitprice,3);
        }
        if(context.field == 'unitprice' && (priceD_data.quota != null || priceD_data.quota != "")){
            priceD_data.price = Ext.Number.roundToPrecision(priceD_data.quota*priceD_data.unitprice,3);
        }

        console.log(priceD_data);
        this.updatePriceD(priceD_data);
        // FOBPricePODetailStore.commitChanges();
    },
    onPriceDItemBeforeEdit: function(editor, context, eOpts){
        // console.log('on before edit price d');
        // console.log(context);
    },
    updatePriceD: function(data){
        var viewModel = this.getViewModel();
        var FOBPricePODetailStore = viewModel.getStore('FOBPricePODetailStore');

        var params = new Object();
        params.data = data;

        GSmartApp.Ajax.post('/api/v1/pcontract_price_d/updatePContractPriceD', Ext.JSON.encode(params),
        function (success, response, options) {
            if (success) {
                var response = Ext.decode(response.responseText);
                if (response.respcode == 200) {
                    FOBPricePODetailStore.commitChanges();
                }
                else {
                    Ext.Msg.show({
                        title: 'Lưu thông tin thất bại',
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    FOBPricePODetailStore.rejectChanges();
                }

            } else {
                Ext.Msg.show({
                    title: 'Lưu thông tin thất bại',
                    msg: null,
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                FOBPricePODetailStore.rejectChanges();
            }
        })
    },
    renderUnit: function(val, meta, record, rindex, cindex, store) {
        if (null != val){
            var viewModel = this.getViewModel();
            var UnitStore = viewModel.getStore('UnitStore');
            if (null!=UnitStore){
                var objUnit = UnitStore.data.find('id', val);
                // console.log(objUnit.data);
                return objUnit.data.code;
            }
        }
     },
})