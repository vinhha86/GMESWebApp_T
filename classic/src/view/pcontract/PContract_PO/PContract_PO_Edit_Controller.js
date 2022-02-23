Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_Controller',
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onSave'
        },
        '#btnLuuTroLy': {
            click: 'onSave'
        },
        '#btnSave_pcontractPO': {
            click: 'onSave'
        },
        '#cboProduct': {
            select: 'onProductSelect'
        },
        '#btnProductInfoCopy': {
            click: 'onProductInfoCopy'
        }
    },
    listen: {
        controller: {
            'PContract_PO_Edit_PriceController': {
                'Reload': 'onReload'
            }
        }
    },
    init: function () {
        var viewmodel = this.getViewModel();
        var ctrportfromto = Ext.getCmp('PContract_PO_Edit_Info_PortFromTo');
        if (ctrportfromto) {
            ctrportfromto.setHidden(true);
        }

        var CurrencyStore = viewmodel.getStore('CurrencyStore');
        CurrencyStore.loadStore();
        var PackingTypeStore = viewmodel.getStore('PackingTypeStore');
        PackingTypeStore.loadStore();
        var QCOrgStore = viewmodel.getStore('QCOrgStore');
        QCOrgStore.GetOrgByTypeId(16);
        var ShipModeStore = viewmodel.getStore('ShipModeStore');
        ShipModeStore.loadStore();
        ShipModeStore.getSorters().add('name');

        var productStore = viewmodel.getStore('ProductStore');
        var productpairid_link = viewmodel.get('productpairid_link');
        var pcontractid_link = viewmodel.get('pcontractid_link');
        productStore.loadStore_bypairid_Async(productpairid_link, pcontractid_link);

        productStore.load({
            scope: this,
            callback: function (records, operation, success) {
                if (success) {
                    var productStore = viewmodel.getStore('ProductStore');
                    this.enablePrice(productStore.getAt(0));

                    if (viewmodel.get('id') > 0) {
                        this.getInfo(viewmodel.get('id'));
                    } else {
                        this.getInfo(null);
                    }
                }
            }
        });

        //them phan quyen
        var grid = this.getView();
        common.Check_Object_Permission();
        common.Check_Menu_Permission(grid);
    },

    onReload: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        me.getInfo(viewmodel.get('id'));
    },
    getInfo: function (id) {
        var m = this;
        var me = this.getView();
        var viewmodel = this.getViewModel();
        if (null != id) {
            var params = new Object();
            params.id = id;
            GSmartApp.Ajax.post('/api/v1/pcontract_po/getone', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);

                        if (response.respcode == 200) {
                            viewmodel.set('po', response.data);
                            if (response.data.exchangerate == null || response.data.currencyid_link == 0) {
                                m.setDefaultCurrency(); // để mặc định là usd
                            }

                            //Dat gia tri mac dinh = 20% cho Sew Target
                            if (null == viewmodel.get('po.sewtarget_percent')) viewmodel.set('po.sewtarget_percent', 20);

                            //Chuyen packing notice ve array
                            var packing_str = response.data.packingnotice;
                            if (packing_str != null) {
                                var packing_arr = packing_str.split(';');
                                viewmodel.set('po.packingnotice', packing_arr);
                            }

                            var productid_link = viewmodel.get('product_selected_id_link');
                            var data = new Object();

                            for (var i = 0; i < response.data.pcontract_po_productivity.length; i++) {
                                if (response.data.pcontract_po_productivity[i].productid_link == productid_link) {
                                    data = response.data.pcontract_po_productivity[i];

                                    break;
                                }
                            }

                            viewmodel.set('pcontract_po_productivity', data)

                            var store = viewmodel.getStore('PriceStore');
                            store.clearFilter();
                            store.removeAll();
                            store.insert(0, response.data.pcontract_price);
                            store.filter('productid_link', productid_link);
                            me.down('#PContract_PO_Edit_Sizeset').getSelectionModel().select(0);

                            //Lay danh sach POrder_Req
                            // var porderReqStore = viewmodel.getStore('porderReqStore');
                            // porderReqStore.loadByPO(viewmodel.get('po.id'));

                            // an nut paste thong tin vi la chao gia da toa
                            viewmodel.set('obj_paste_btn_hidden', true);
                        }
                    }
                })
        } else {

            var new_po = new GSmartApp.model.pcontract.PContractPO();
            new_po.data.id = null;
            new_po.data.po_quantity = null;
            new_po.data.pcontract_po_productivity = [];
            new_po.data.pcontractid_link = viewmodel.get('pcontractid_link');
            new_po.data.productid_link = viewmodel.get('productpairid_link');
            new_po.data.sewtarget_percent = 20;
            new_po.set('isauto_calculate', true);
            viewmodel.set('po', new_po.data);
            m.setDefaultCurrency(); // để mặc định là usd

            var params = new Object();
            GSmartApp.Ajax.post('/api/v1/fobprice/getAllDefault', Ext.JSON.encode(params),
                function (success, response, options) {
                    var response = Ext.decode(response.responseText);
                    if (success) {

                        //Them sizeset all cho tat ca cac san pham
                        var productStore = viewmodel.getStore('ProductStore');
                        var priceStore = viewmodel.getStore('PriceStore');
                        for (var k = 0; k < productStore.data.length; k++) {
                            var p_data = productStore.data.items[k].data;
                            var newSizeset = new Object();
                            var pcontract_price_d = [];
                            //Mac dinh them Giá CMP
                            var newPriceD = new Object({
                                id: null,
                                isfob: false,
                                fobprice_name: 'Giá CMP',
                                fobpriceid_link: 1,
                                price: 0,
                                cost: 0,
                                productid_link: p_data.id
                            })
                            pcontract_price_d.push(newPriceD);

                            // Thêm các giá có isdefault = true
                            // var params = new Object();
                            // GSmartApp.Ajax.post('/api/v1/fobprice/getAllDefault', Ext.JSON.encode(params),
                            //     function (success, response, options) {
                            //         var response = Ext.decode(response.responseText);
                            //         if (success) {
                            // console.log(response);
                            var priceDefaultData = response.data;
                            for (var i = 0; i < priceDefaultData.length; i++) {
                                var newPriceD_Default = new Object({
                                    id: null,
                                    isfob: true,
                                    fobprice_name: priceDefaultData[i].name,
                                    fobpriceid_link: priceDefaultData[i].id,
                                    price: 0,
                                    cost: 0,
                                    productid_link: p_data.id
                                })
                                pcontract_price_d.push(newPriceD_Default);
                            }

                            //     }
                            // })

                            var newSizeset = new Object();
                            newSizeset.pcontractid_link = new_po.data.pcontractid_link;
                            newSizeset.pcontract_poid_link = new_po.data.id;
                            newSizeset.productid_link = p_data.id;
                            newSizeset.sizesetid_link = 1;
                            newSizeset.sortvalue = 1;
                            newSizeset.sizesetname = 'ALL';
                            newSizeset.price_cmp = null;
                            newSizeset.price_fob = null;
                            newSizeset.price_sewingcost = null;
                            newSizeset.price_sewingtarget = null;
                            newSizeset.salaryfund = null;
                            newSizeset.totalprice = null;
                            newSizeset.pcontract_price_d = pcontract_price_d;
                            priceStore.insert(0, newSizeset);
                        }
                    }
                })
        }
    },
    setDefaultCurrency: function () {
        var viewmodel = this.getViewModel();

        var params = new Object();
        params.id = 1;
        GSmartApp.Ajax.post('/api/v1/currency/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        viewmodel.set('po.currencyid_link', response.data.id);
                        viewmodel.set('po.exchangerate', response.data.exchangerate);
                    }
                }
            })

    },
    onThoat: function () {
        // this.getView().up('window').close();
        this.fireEvent('Thoat');
    },
    CheckValidate: function () {
        var viewmodel = this.getViewModel();
        var mes = "";
        // if(viewmodel.get('plan.comment') == "" || viewmodel.get('plan.comment') == null){
        //     mes = "Bạn chưa nhập ghi chú";
        //     return mes;
        // }
        return mes;
    },
    onSave: function () {
        var grid = this.getView();
        var me = this;
        var viewmodel = this.getViewModel();
        var priceStore = viewmodel.getStore('PriceStore');
        var porderReqStore = viewmodel.getStore('porderReqStore');

        //Xoa filter trc khi day len server
        priceStore.clearFilter();

        //Chuyen thanh dang array de dua vào po object
        var arrPrice = [];
        priceStore.each(function (record) {
            record.data.id = null;
            for (i = 0; i < record.data.pcontract_price_d.length; i++) {
                record.data.pcontract_price_d[i].id = null;
                var pcontract_price_d_sku = record.data.pcontract_price_d[i].pcontract_price_d_sku;
                if (pcontract_price_d_sku != null) {
                    for (j = 0; j < pcontract_price_d_sku.length; j++) {
                        pcontract_price_d_sku[j].id = null;
                    }
                }
            }
            arrPrice.push(record.data);
        });
        viewmodel.set('po.pcontract_price', arrPrice);

        //Khoi phuc filter
        priceStore.filter('productid_link', viewmodel.get('product_selected_id_link'));

        //Call API
        var mes = me.CheckValidate();
        if (mes == "") {
            var params = new Object();
            var packing_arr = viewmodel.get('po.packingnotice');
            packing_arr = packing_arr == null ? "" : packing_arr;
            var packingnotice = '';
            for (i = 0; i < packing_arr.length; i++) {
                if (packing_arr[i] == "") continue;
                packingnotice = packingnotice + packing_arr[i];
                if (i < packing_arr.length - 1) packingnotice = packingnotice + ';';
            }
            viewmodel.set('po.packingnotice', packingnotice);
            params.data = viewmodel.get('po');
            params.data.po_quantity = viewmodel.get('po.po_quantity') == null ? 0 : parseFloat(viewmodel.get('po.po_quantity').toString().replace(/,/gi, ''));
            params.data.exchangerate = viewmodel.get('po.exchangerate') == null ? 0 : parseFloat(viewmodel.get('po.exchangerate').toString().replace(/,/gi, ''));
            params.data.plan_productivity = viewmodel.get('po.plan_productivity') == null ? 0 : parseFloat(viewmodel.get('po.plan_productivity').toString().replace(/,/gi, ''));
            //Thiet lap loai chao gia (mac dinh = 0 - CMP)
            params.data.po_typeid_link = viewmodel.get('po_typeid_link');
            //Set trang thai cho PO
            // if (viewmodel.get('isSizeset_CheckOK') == false || viewmodel.get('isPorderReq_CheckOK') == false)
            //     params.data.status = -2
            // else
            //     params.data.status = -1

            var arrPOrders = [];
            // porderStore.each(function (record) {
            //     //Neu la lenh moi (sencha tu sinh id) --> set = null
            //     if(!Ext.isNumber(record.data.id)) record.data.id = null;
            //     arrPOrders.push(record.data);
            // });

            porderReqStore.each(function (record) {
                //Neu la lenh moi (sencha tu sinh id) --> set = null
                if (!Ext.isNumber(record.data.id)) record.data.id = null;
                // var porder = new Object();
                // porder.granttoorgid_link = record.data.granttoorgid_link;
                // porder.totalorder = record.data.totalorder;
                delete record.data.product;

                arrPOrders.push(record.data);
            });
            params.po_orders = arrPOrders;

            // params.list_price = me.getListPrice();
            params.pcontractid_link = viewmodel.get('pcontractid_link');
            // console.log(params);
            // console.log(Ext.JSON.encode(params));
            // return;

            grid.setLoading('Đang lưu dữ liệu');
            GSmartApp.Ajax.post('/api/v1/pcontract_po/create', Ext.JSON.encode(params),
                function (success, response, options) {

                    grid.setLoading(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);

                        if (response.respcode == 200) {
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: 'Lưu thành công',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng'
                                },
                                fn: function () {
                                    me.getInfo(response.id);
                                }
                            });
                        }
                    } else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                })
        }
        else {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: mes,
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }

    },
    onProductSelect: function (sender, record) {
        this.enablePrice(record);
    },

    enablePrice: function (record) {
        var viewPrice = Ext.getCmp('PContract_PO_Edit_Price');
        var viewPriceSumUp = Ext.getCmp('PContract_PO_Edit_PriceSumUp');
        var viewSizeset = Ext.getCmp('PContract_PO_Edit_Sizeset');


        var viewmodel = this.getViewModel();
        var po = viewmodel.get('po');
        viewmodel.set('product_selected_id_link', record.get('id'));
        viewmodel.set('product_selected_typeid_link', record.get('product_type'));
        // console.log(viewmodel.get('productpairid_link'));
        var productStore = viewmodel.getStore('ProductStore');

        if (record.get('product_type') == 5) {
            viewPrice.setDisabled(false);
            viewmodel.set('isSewPriceReadonly', false);
            viewmodel.set('isEditQuantity', false);
        }
        else {
            viewPrice.setDisabled(false);
            viewmodel.set('isSewPriceReadonly', false);
            if (productStore.data.items.length > 1)
                viewmodel.set('isEditQuantity', false);
            else
                viewmodel.set('isEditQuantity', true);
        }

        var priceStore = viewmodel.getStore('PriceStore');
        priceStore.clearFilter();
        priceStore.filter('productid_link', viewmodel.get('product_selected_id_link'));
        // priceStore.filters.remove('granttoorgid_link');
        viewSizeset.getView().select(0);

        //load lai nang suat theo san pham
        var productid_link = viewmodel.get('product_selected_id_link');

        var data = new Object();
        if (po.pcontract_po_productivity != null) {

            for (var i = 0; i < po.pcontract_po_productivity.length; i++) {
                if (po.pcontract_po_productivity[i].productid_link == productid_link) {
                    data = po.pcontract_po_productivity[i];
                    break;
                }
            }
            viewmodel.set('pcontract_po_productivity', data);
        }

        // neu la bo thi an nut paste thong tin
        if (viewmodel.get('product_selected_typeid_link') == 5) {
            viewmodel.set('obj_paste_btn_hidden', true);
        }
    },
    // onSewCostChange: function (sender, newValue, oldValue, eOpts) {
    //     var viewmodel = this.getViewModel();
    //     var po_data = viewmodel.get('po');
    //     var viewSizeset = Ext.getCmp('PContract_PO_Edit_Sizeset');
    //     if (null != viewSizeset.getView().selection){
    //         var price_data = viewSizeset.getView().selection.data;
    //         //Tinh Salary Fund
    //         price_data.salaryfund = price_data.price_sewingcost*price_data.quantity;
    //         viewmodel.set('po_price',price_data);

    //         this.calRootPairProductPrice(price_data.sizesetid_link);    
    //     }
    // },
    // //Cong don cho bo san pham
    // calRootPairProductPrice: function(sizesetid_link){
    //     var viewmodel = this.getViewModel();
    //     if (viewmodel.get('isproductpair') == 1){
    //         var priceStore = viewmodel.getStore('PriceStore');
    //         filters = priceStore.getFilters();

    //         filters.add({
    //             // id: 'porderFilter',
    //             property: 'productid_link',
    //             operator: '!=',
    //             value: viewmodel.get('productpairid_link'),
    //             anyMatch: true,
    //             caseSensitive: false
    //         });
    //         filters.add({
    //             // id: 'porderFilter',
    //             property: 'sizesetid_link',
    //             operator: '=',
    //             value: sizesetid_link,
    //             anyMatch: true,
    //             caseSensitive: false
    //         });

    //         var sum_price_cmp = priceStore.sum('price_cmp');
    //         var sum_price_fob = priceStore.sum('price_fob');
    //         var sum_price_sewingtarget = priceStore.sum('price_sewingtarget');
    //         var sum_price_sewingcost = priceStore.sum('price_sewingcost');
    //         var sum_totalprice = priceStore.sum('totalprice');
    //         var sum_salaryfund = priceStore.sum('salaryfund');

    //         priceStore.clearFilter();
    //         filters.add({
    //             // id: 'porderFilter',
    //             property: 'productid_link',
    //             operator: '=',
    //             value: viewmodel.get('productpairid_link'),
    //             anyMatch: true,
    //             caseSensitive: false
    //         });
    //         filters.add({
    //             // id: 'porderFilter',
    //             property: 'sizesetid_link',
    //             operator: '=',
    //             value: sizesetid_link,
    //             anyMatch: true,
    //             caseSensitive: false
    //         });
    //         for(var k =0; k<priceStore.data.length; k++){
    //             var price_root = priceStore.data.items[k].data;
    //             price_root.price_cmp = sum_price_cmp;
    //             price_root.price_fob = sum_price_fob;
    //             price_root.price_sewingtarget = sum_price_sewingtarget;
    //             price_root.price_sewingcost = sum_price_sewingcost;
    //             price_root.totalprice = sum_totalprice;
    //             price_root.salaryfund = sum_salaryfund;
    //         };  
    //         priceStore.clearFilter();
    //         priceStore.filter('productid_link',viewmodel.get('product_selected_id_link'));
    //     }
    // },
    onProductInfoCopy: function () {
        // console.log('copy product');
        var me = this;
        var viewModel = this.getViewModel();
        var productid_link = viewModel.get('product_selected_id_link'); // sp dang chon
        var product_typeid_link = viewModel.get('product_selected_typeid_link'); // sp don hay bo

        // check sp la don hay bo
        // console.log('product id: ' + productid_link);
        // console.log('product type id: ' + product_typeid_link);

        if (product_typeid_link == 5) { // sp bo
            // console.log('đã chọn sp bộ');
            Ext.toast('Thất bại. Sản phẩm đang chọn là bộ');
        } else if (product_typeid_link == 10) { // sp don
            // console.log('đã chọn sp đơn');
            var obj_copy = new Object();
            // copy thong tin po, pcontract_po_productivity
            var po = viewModel.get('po');
            var pcontract_po_productivity = viewModel.get('pcontract_po_productivity');
            obj_copy.po = po;
            obj_copy.productid_link = productid_link;
            obj_copy.pcontract_po_productivity = pcontract_po_productivity;
            // console.log(pcontract_po_productivity);
            // console.log(obj_copy.pcontract_po_productivity);

            // copy thong tin porder_req
            var porderReqStore = viewModel.getStore('porderReqStore');
            // var ProductStore = viewModel.getStore('ProductStore');

            porderReqStoreDataItems = porderReqStore.getData().items;
            var porderReqStoreData = new Array();
            for (var i = 0; i < porderReqStoreDataItems.length; i++) {
                porderReqStoreData.push(porderReqStoreDataItems[i].data);
            }
            obj_copy.porderReqStoreData = porderReqStoreData;

            // copy thong tin sizeset price
            var PriceStore = viewModel.getStore('PriceStore');

            PriceStoreDataItems = PriceStore.getData().items;
            var PriceStoreData = new Array();
            for (var i = 0; i < PriceStoreDataItems.length; i++) {
                PriceStoreData.push(PriceStoreDataItems[i].data);
            }
            obj_copy.PriceStoreData = PriceStoreData;

            // //Lay thong tin nang suat
            // obj_copy.pcontract_po_productivity = viewModel.get('pcontract_po_productivity');
            // luu thong tin copy
            viewModel.set('obj_copy', obj_copy);
            me.fireEvent('CopyPoInfo', obj_copy); // luu vao viewmodel o ngoai de co data khi dong cua so nay va mo cua so khac
            Ext.toast('Data copied');
        }
    },
    onProductInfoPaste: function () {
        // console.log('paste product');
        var viewModel = this.getViewModel();
        var id = viewModel.get('id');
        // console.log(id);
        var productid_link = viewModel.get('product_selected_id_link'); // sp dang chon
        var product_typeid_link = viewModel.get('product_selected_typeid_link'); // sp don hay bo
        var obj_copy = viewModel.get('obj_copy');

        // console.log('paste obj_copy: ');
        // console.log(obj_copy);
        // if(obj_copy.pcontract_po_productivity != null){
        //     console.log(obj_copy.pcontract_po_productivity);
        // }else{
        //     console.log('obj_copy.pcontract_po_productivity is null');
        // }

        if (id != null && id != 0) {
            Ext.toast('Thất bại. Không phải chào giá mới');
        } else if (obj_copy == null) {
            Ext.toast('Thất bại. Chưa copy thông tin');
        } else if (product_typeid_link == 5) { // sp bo
            Ext.toast('Thất bại. Sản phẩm đang chọn là bộ');
        } else if (product_typeid_link == 10) { // sp don
            // set thong tin cho pcontract po info
            if (obj_copy.po != null) {
                viewModel.set('po.packingnotice', obj_copy.po.packingnotice);
                viewModel.set('po.is_tbd', obj_copy.po.is_tbd);
                viewModel.set('po.sewtarget_percent', obj_copy.po.sewtarget_percent);
                viewModel.set('po.po_buyer', obj_copy.po.po_buyer);
                viewModel.set('po.po_quantity', obj_copy.po.po_quantity);
                viewModel.set('po.qcorgname', obj_copy.po.qcorgname);
                viewModel.set('po.shipmodeid_link', obj_copy.po.shipmodeid_link);
                viewModel.set('po.po_vendor', obj_copy.po.po_vendor);
                viewModel.set('po.shipdate', obj_copy.po.shipdate);
                viewModel.set('po.matdate', obj_copy.po.matdate);
                viewModel.set('po.productiondate', obj_copy.po.productiondate);
                viewModel.set('po.productiondays', obj_copy.po.productiondays);
                viewModel.set('po.portfromid_link', obj_copy.po.portfromid_link);
                viewModel.set('po.porttoid_link', obj_copy.po.porttoid_link);
                viewModel.set('po.comment', obj_copy.po.comment);
            }

            var ProductStore = viewModel.getStore('ProductStore');
            var product = ProductStore.getById(productid_link).data;

            if (obj_copy.pcontract_po_productivity != null) {
                var pcontract_po_productivity = obj_copy.pcontract_po_productivity;
                pcontract_po_productivity.id = null;
                pcontract_po_productivity.pcontract_poid_link = null;
                pcontract_po_productivity.orgrootid_link = null;
                pcontract_po_productivity.productid_link = productid_link;
                var newPcontract_po_productivity = new Array();
                newPcontract_po_productivity.push(pcontract_po_productivity);

                viewModel.set('po.pcontract_po_productivity', newPcontract_po_productivity);
                viewModel.set('pcontract_po_productivity.plan_productivity', obj_copy.pcontract_po_productivity.plan_productivity);
                viewModel.set('pcontract_po_productivity.plan_linerequired', obj_copy.pcontract_po_productivity.plan_linerequired);
                viewModel.set('pcontract_po_productivity.amount', obj_copy.pcontract_po_productivity.amount);
                viewModel.set('pcontract_po_productivity.productiondays_ns', obj_copy.pcontract_po_productivity.productiondays_ns);
            }

            // set thong tin cho porder req
            var porderReqStore = viewModel.getStore('porderReqStore');

            var porderReqStoreData = obj_copy.porderReqStoreData;
            for (var i = 0; i < porderReqStoreData.length; i++) {
                var porderReq = porderReqStoreData[i];
                porderReq.id = null;
                porderReq.pcontractid_link = viewModel.get('po.pcontractid_link');
                porderReq.pcontract_poid_link = viewModel.get('po.id');
                porderReq.productid_link = productid_link;
                porderReq.product_code = product.code;
                porderReq.amount_inset = product.pairamount == null ? 1 : product.pairamount;
                porderReq.productinfo = product.code + " (" + Ext.util.Format.number(obj_copy.po.po_quantity * porderReq.amount_inset, '0,000') + ")";
            }
            // console.log(porderReqStoreData);
            porderReqStore.removeAll();
            porderReqStore.add(porderReqStoreData);

            // set thong tin cho price
            var PriceStore = viewModel.getStore('PriceStore');

            var PriceStoreData = obj_copy.PriceStoreData;
            var PriceStoreDataToAdd = new Array();

            for (var i = 0; i < PriceStoreData.length; i++) {
                var PriceStoreItem = PriceStoreData[i];
                PriceStoreItem.productid_link = productid_link;
                for (var j = 0; j < PriceStoreItem.pcontract_price_d.length; j++) {
                    PriceStoreItem.pcontract_price_d[j].productid_link = productid_link;
                }

                // var item = new Object();
                // item.pcontract_price_d = PriceStoreItem.pcontract_price_d;
                // item.productid_link = PriceStoreItem.productid_link;
                // item.sizesetid_link = PriceStoreItem.sizesetid_link;
                // item.price_cmp = PriceStoreItem.price_cmp;
                // item.price_fob = PriceStoreItem.price_fob;
                // item.price_sewingcost = PriceStoreItem.price_sewingcost;
                // item.price_sewingtarget = PriceStoreItem.price_sewingtarget;
                // item.price_vendortarget = PriceStoreItem.price_vendortarget;
                // item.totalprice = PriceStoreItem.totalprice;
                // item.salaryfund = PriceStoreItem.salaryfund;
                // item.quantity = PriceStoreItem.quantity;
                // item.is_fix = PriceStoreItem.is_fix;

                // PriceStoreDataToAdd.push(item);
            }
            // console.log(PriceStoreData);
            PriceStore.removeAll();
            PriceStore.add(PriceStoreData);

            Ext.toast('Data pasted');
        }
    },
    onShowKHGH: function () {
        var me = this.getView();
        var panel_po = me.down('#panel_po');
        var panel_cmp = me.down('#panel_cmp');
        var panel_salaryfund = me.down('#panel_salaryfund');
        var panel_schedule = me.down('#panel_schedule');

        panel_po.setHidden(false);
        panel_salaryfund.setHidden(true);
        panel_cmp.setHidden(true);
        panel_schedule.setHidden(true);
    },
    onShowCMP: function () {
        var me = this.getView();
        var panel_po = me.down('#panel_po');
        var panel_cmp = me.down('#panel_cmp');
        var panel_salaryfund = me.down('#panel_salaryfund');
        var panel_schedule = me.down('#panel_schedule');

        panel_po.setHidden(true);
        panel_salaryfund.setHidden(true);
        panel_cmp.setHidden(false);
        panel_schedule.setHidden(true);
    },
    onShowSalaryFund: function () {
        var me = this.getView();
        var panel_po = me.down('#panel_po');
        var panel_cmp = me.down('#panel_cmp');
        var panel_salaryfund = me.down('#panel_salaryfund');
        var panel_schedule = me.down('#panel_schedule');

        panel_po.setHidden(true);
        panel_salaryfund.setHidden(false);
        panel_cmp.setHidden(true);
        panel_schedule.setHidden(true);
    },
    onShowSchedule: function () {
        var me = this.getView();
        var panel_po = me.down('#panel_po');
        var panel_cmp = me.down('#panel_cmp');
        var panel_salaryfund = me.down('#panel_salaryfund');
        var panel_schedule = me.down('#panel_schedule');

        panel_po.setHidden(true);
        panel_salaryfund.setHidden(true);
        panel_cmp.setHidden(true);
        panel_schedule.setHidden(false);
    }
})