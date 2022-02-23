Ext.define('GSmartApp.view.fabricprice.FabricPriceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FabricPriceController',
    isActivate: false,
    init: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var FabricPriceStore = viewModel.getStore('FabricPriceStore');
        FabricPriceStore.getSorters().add('color_name');
        FabricPriceStore.getSorters().add('size_name');
        FabricPriceStore.loadStore();

        var CurrencyStore = viewModel.getStore('CurrencyStore');
        CurrencyStore.loadStore();
    },
    control: {
        '#FabricPrice': {
            // activate: 'onActivate',
            // itemdblclick: 'onitemdblclick',
        },
        '#btnThemMoi': {
            click: 'onBtnThemMoi'
        },
        // '#limitpage': {
        //     specialkey: 'onSpecialkey'
        // },
    },
    // thêm mới
    onBtnThemMoi: function(){
        var me = this.getView();
        var viewModel = this.getViewModel();
        var FabricPriceStore = viewModel.getStore('FabricPriceStore');

        var form = Ext.create({
            xtype: 'skusearchwindow',
            width: 1200,
            height: 500,       
            reference: 'skusearchwindow',
            closeAction: 'destroy',
            viewModel: {
                data: {
                    sourceview: 'FabricPrice',
                    searchtype: 5,
                    // pcontractid_link: viewModel.get('PContract.id'),
                    // productid_link_notsearch: productid_link,
                    isAddNPL: true,
                    isHiddenSkuSearchCriteria_Attr_actioncolumn: true,
                    isHiddenSkuSearchCriteria_Attr_btnThemMoi: true
                }
            }
        });
        form.show();

        form.getController().on('AddMaterialIdLinkFabricPrice', function (records) {
            // console.log(records);
            me.setLoading(true);

            var data = new Array();
            for(var i = 0; i < records.length; i++){
                if(records[i].data.id != null){
                    data.push(records[i].data.id);
                }
            }

            var params = new Object();
            params.data = data;

            GSmartApp.Ajax.post('/api/v1/fabricprice/create', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        FabricPriceStore.load();
                    } else {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: "Thêm giá vải thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                    me.setLoading(false);
                })
            
            form.close();
        })
    },
    // delete
    onFabricPrice_Delete: function(grid, rowIndex, colIndex){
        var me = this.getView();
        var viewModel = this.getViewModel();
        var FabricPriceStore = viewModel.getStore('FabricPriceStore');

        Ext.Msg.show({
            title: "Thông báo",
            msg: 'Bạn có chắc chắn muốn xóa giá vải này?',
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function(btn){
                if(btn==='yes'){
                    me.setLoading(true);
                    var objDel = grid.getStore().getAt(rowIndex);
                    // grid.getStore().remove(objDel);
                    var id = objDel.get('id');
                    
                    var params = new Object();
                    var data = new Array();
                    data.push(id);
                    params.data = data;

                    GSmartApp.Ajax.post('/api/v1/fabricprice/delete', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                FabricPriceStore.load();
                            } else {
                                Ext.MessageBox.show({
                                    title: "Thông báo",
                                    msg: "Xoá giá vải thất bại",
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
                            me.setLoading(false);
                        })

                }
            }
        });
    },
    // update
    onFabricPriceItemBeforeEdit:function(){},
    onFabricPriceItemEdit:function(editor, context){
        // console.log(context);
        var viewModel = this.getViewModel();
        var FabricPriceStore = viewModel.getStore('FabricPriceStore');

        if(context.value == "" || context.value == context.originalValue || isNaN(context.value)){
            FabricPriceStore.rejectChanges(); //commitChanges()
            return;
        }

        // var amount = 0;
        // var unitprice = 0;

        // if(context.record.get('amount') != null && !isNaN(context.record.get('amount'))){
        //     amount = context.record.get('amount');
        // }
        // if(context.record.get('unitprice') != null && !isNaN(context.record.get('unitprice'))){
        //     unitprice = context.record.get('unitprice');
        // }
        // context.record.set('totalprice', amount*unitprice);
        // Price_D_SKUStore.commitChanges(); //commitChanges()

        this.saveFabricPrice(context);
    },
    saveFabricPrice: function(context){
        // console.log(context);
        var me = this.getView();
        var viewModel = this.getViewModel();
        var FabricPriceStore = viewModel.getStore('FabricPriceStore');

        var contextRec = context.record; // rec
        var contextField = context.field; // property

        // giá trị các trường
        var price_per_kg = contextRec.get('price_per_kg');
        var m_per_kg = contextRec.get('m_per_kg');
        var price_per_m = contextRec.get('price_per_m');

        switch(contextField){
            case 'price_per_kg':
                if(m_per_kg != null && m_per_kg != 0){
                    var resultVal = Math.round((price_per_kg / m_per_kg) * 1000) / 1000;
                    contextRec.set('price_per_m', resultVal);
                }
                break;
            case 'm_per_kg':
                if(m_per_kg != null && m_per_kg != 0){
                    if(price_per_kg!=null && (price_per_m == null || price_per_m == 0)){
                        var resultVal = Math.round((price_per_kg / m_per_kg) * 1000) / 1000;
                        contextRec.set('price_per_m', resultVal);
                    }
                }
                if(m_per_kg != null && m_per_kg != 0){
                    if(price_per_m!=null && (price_per_kg == null || price_per_kg == 0)){
                        var resultVal = Math.round((price_per_m * m_per_kg) * 1000) / 1000;
                        contextRec.set('price_per_kg', resultVal);
                    }
                }
                break;
            case 'price_per_m':
                if(m_per_kg != null && m_per_kg != 0){
                    var resultVal = Math.round((price_per_m * m_per_kg) * 1000) / 1000;
                    contextRec.set('price_per_kg', resultVal);
                }
                break;
        }

        // id, materialid_link, price_per_kg, m_per_kg, price_per_m, currencyid_link
        var data = new Object();
        data.id = contextRec.get('id');
        data.materialid_link = contextRec.get('materialid_link');
        data.price_per_kg = contextRec.get('price_per_kg');
        data.m_per_kg = contextRec.get('m_per_kg');
        data.price_per_m = contextRec.get('price_per_m');
        data.currencyid_link = contextRec.get('currencyid_link');

        var params = new Object();
        params.data = data;

        me.setLoading("Đang lưu dữ liệu");

        GSmartApp.Ajax.post('/api/v1/fabricprice/update', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    FabricPriceStore.load();
                } else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Lưu thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    FabricPriceStore.rejectChanges();
                }
                me.setLoading(false);
            })
    },
    renderCurrency: function(val, meta, record, rindex, cindex, store) {
        if (null != val){
            var viewModel = this.getViewModel();
            var CurrencyStore = viewModel.getStore('CurrencyStore');
            if (null!=CurrencyStore){
                var objUnit = CurrencyStore.data.find('id', val);
                // console.log(objUnit.data);
                return objUnit.data.code;
            }
        }
    },

    onMaterialCodeFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('materialCodeFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.materialCodeFilter = filters.add({
                id: 'materialCodeFilter',
                property: 'materialCode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.materialCodeFilter) {
            filters.remove(this.materialCodeFilter);
            this.materialCodeFilter = null;
        }
    },
    onColorNameFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('colorNameFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.colorNameFilter = filters.add({
                id: 'colorNameFilter',
                property: 'color_name',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.colorNameFilter) {
            filters.remove(this.colorNameFilter);
            this.colorNameFilter = null;
        }
    },
    onSizeNameFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('sizeNameFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.sizeNameFilter = filters.add({
                id: 'sizeNameFilter',
                property: 'size_name',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.sizeNameFilter) {
            filters.remove(this.sizeNameFilter);
            this.sizeNameFilter = null;
        }
    }

})