Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_InfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_InfoController',
    onShipDateChange: function (newValue, oldValue, eOpts) {
        this.recalProductionDays();
    },
    onMatDateChange: function (newValue, oldValue, eOpts) {
        this.recalProductionDate();
    },
    onProductionDateChange: function (newValue, oldValue, eOpts) {
        this.recalProductionDays();
    },
    recalProductionDate: function () {
        var me = this;
        var grid = this.getView();
        grid.setLoading('Đang xử lý!');
        var viewmodel = this.getViewModel();
        var po_data = viewmodel.get('po');
        var matdate = Ext.Date.parse(po_data.matdate, 'c');
        if (null == matdate) matdate = new Date(po_data.matdate);
        // var dt = Ext.Date.subtract(new Date(po_data.matdate), Ext.Date.DAY, -7);
        // var dt = Ext.Date.subtract(Ext.Date.parse(po_data.matdate, 'c'), Ext.Date.DAY, -7);
        // var dt = Ext.Date.subtract(matdate, Ext.Date.DAY, -7);
        // viewmodel.set('po.productiondate',dt);

        // var productiondate = Ext.Date.parse(po_data.productiondate, 'c');
        // if (null == productiondate) productiondate = new Date(po_data.productiondate);
        var shipdate = Ext.Date.parse(po_data.shipdate, 'c');
        if (null == shipdate) shipdate = new Date(po_data.shipdate);

        var params = new Object();
        params.MatDate = matdate;
        params.EndDate = shipdate;

        GSmartApp.Ajax.post('/api/v1/schedule/get_duration_from_matdate', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);

                    if (response.respcode == 200) {
                        grid.setLoading(false);
                        viewmodel.set('po.productiondays', response.duration);
                        viewmodel.set('po.productiondate', response.production_date);
                        me.onProductivityChange();
                    }
                }
            })
    },
    recalProductionDays: function () {
        var me = this;
        var grid = this.getView();
        grid.setLoading('Đang xử lý!');
        var viewmodel = this.getViewModel();
        var po_data = viewmodel.get('po');

        var productiondate = Ext.Date.parse(po_data.productiondate, 'c');
        if (null == productiondate) productiondate = new Date(po_data.productiondate);
        // console.log(productiondate);
        var shipdate = Ext.Date.parse(po_data.shipdate, 'c');
        if (null == shipdate) shipdate = new Date(po_data.shipdate);

        var params = new Object();
        params.StartDate = productiondate;
        params.EndDate = shipdate;

        GSmartApp.Ajax.post('/api/v1/schedule/get_duration', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    grid.setLoading(false);
                    var response = Ext.decode(response.responseText);

                    if (response.respcode == 200) {
                        viewmodel.set('po.productiondays', response.duration);
                        me.onProductivityChange();
                    }
                }
            })
    },
    onPOBuyerChange: function () {
        var viewmodel = this.getViewModel();
        var po_vendor = viewmodel.get('po.po_vendor') == null ? "" : viewmodel.get('po.po_vendor');
        if (po_vendor == "") {
            viewmodel.set('po.po_vendor', viewmodel.get('po.po_buyer'));
        }
    },
    onProductivityChange: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('po.po_quantity', viewmodel.get('pcontract_po_productivity.amount'));
        var po_data = viewmodel.get('po');
        var po_productivity = viewmodel.get('pcontract_po_productivity');

        if (null != po_productivity) {
            var po_quantity = po_data.po_quantity == null ? 0 : parseFloat(po_data.po_quantity.toString().replace(/,/gi, ''));
            var productivity = po_productivity.plan_productivity == null ? 0 : parseFloat(po_productivity.plan_productivity.toString().replace(/,/gi, ''));
            var productiondays = po_data.productiondays == null ? 0 : po_data.productiondays;

            if (productiondays <= 0 || productivity == 0) {
                viewmodel.set('pcontract_po_productivity.plan_linerequired', 0);
            }
            else {
                //Tinh so ngay can san xuat
                if (null != productivity && productivity != 0) {
                    var productiondays_ns = Math.round(po_quantity / productivity);
                    viewmodel.set('pcontract_po_productivity.productiondays_ns', productiondays_ns);
                } else {
                    viewmodel.set('pcontract_po_productivity.productiondays_ns', 0);
                }

                if (productiondays_ns < productiondays) {
                    viewmodel.set('pcontract_po_productivity.plan_linerequired', 1);
                } else {
                    if (null != productiondays && productiondays != 0)
                        viewmodel.set('pcontract_po_productivity.plan_linerequired', Math.round((productiondays_ns / productiondays) * 10) / 10);
                    else
                        viewmodel.set('pcontract_po_productivity.plan_linerequired', 0);
                }

                // var plan_linerequired = Math.round(((po_quantity/productiondays)/productivity) * 10) / 10;
                // viewmodel.set('pcontract_po_productivity.plan_linerequired', plan_linerequired);
            }

            //Cap nhat lai trong po
            var productid_link = viewmodel.get('product_selected_id_link');
            var data = new Object();

            var productStore = viewmodel.getStore('ProductStore');

            for (var i = 0; i < po_data.pcontract_po_productivity.length; i++) {
                data = po_data.pcontract_po_productivity[i];
                var rec = productStore.findRecord('id', data.productid_link);
                console.log(productStore);
                if (data.productid_link == productid_link) {
                    data.plan_linerequired = viewmodel.get('pcontract_po_productivity.plan_linerequired');
                    data.plan_productivity = productivity;
                    data.productiondays_ns = viewmodel.get('pcontract_po_productivity.productiondays_ns');
                }
                data.amount = po_quantity * (rec.data.pairamount == null ? 1 : rec.data.pairamount);
            }

            //them moi thi them vao trong po
            if (po_data.pcontract_po_productivity.length == 0) {
                for (var i = 0; i < productStore.data.length; i++) {
                    var rec = productStore.data.items[i].data;
                    var data = new Object();
                    if (rec.productid_link == productid_link) {
                        data.plan_productivity = productivity;
                        data.plan_linerequired = viewmodel.get('pcontract_po_productivity.plan_linerequired');
                        data.productiondays_ns = viewmodel.get('pcontract_po_productivity.productiondays_ns');
                    }

                    data.productid_link = rec.id;
                    data.amount = po_quantity * (rec.pairamount == null ? 1 : rec.pairamount);

                    po_data.pcontract_po_productivity.push(data);
                }

            }
        }
    },
    onPOQuantityChange: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        var po_data = viewmodel.get('po');
        // var pcontract_po_productivity = viewmodel.get('pcontract_po_productivity');
        viewmodel.set('po.po_quantity', viewmodel.get('pcontract_po_productivity.amount'));
        //Update gia tri SizesetALl tai tat ca cac san pham
        var priceStore = viewmodel.getStore('PriceStore');
        if (priceStore != null) {
            priceStore.clearFilter();
            filters = priceStore.getFilters();
            filters.add({
                // id: 'porderFilter',
                property: 'sizesetid_link',
                operator: '=',
                value: 1,
                anyMatch: true,
                caseSensitive: false
            });
            for (var k = 0; k < priceStore.data.length; k++) {
                var price_root = priceStore.data.items[k].data;
                price_root.quantity = po_data.po_quantity == null ? 0 : parseFloat(po_data.po_quantity.toString().replace(/,/gi, ''));
            }
            priceStore.clearFilter();
            priceStore.filter('productid_link', viewmodel.get('product_selected_id_link'));
        }

        var porderReqStore = viewmodel.getStore('porderReqStore');
        if (porderReqStore != null) {
            porderReqStore.setGroupField("");
            var po_quantity = po_data.po_quantity == null ? 0 : parseFloat(po_data.po_quantity.toString().replace(/,/gi, ''));

            porderReqStore.each(function (record) {
                var amount_inset = (record.get('amount_inset') == 0 || record.get('amount_inset') == null) ? 1 : record.get('amount_inset');

                var amount_req = po_quantity * amount_inset;
                var info = record.get('product_code') + " (" + Ext.util.Format.number(amount_req, '0,000') + ")";
                record.set('productinfo', info);
            });
            porderReqStore.setGroupField('productinfo');
        }
        me.onProductivityChange();
    },
    onSewTarget_PercentChange: function () {

        var viewmodel = this.getViewModel();
        var po_data = viewmodel.get('po');
        if (null == po_data.exchangerate) po_data.exchangerate = 0;
        if (null == po_data.sewtarget_percent) po_data.sewtarget_percent = 20;
        po_data.exchangerate = parseFloat(po_data.exchangerate.toString().replace(/,/gi, ''));

        var po_price_data = viewmodel.get('po_price');
        if (null != po_data && null != po_price_data)
            if (null != po_price_data.price_cmp && null != po_data.exchangerate && null != po_data.sewtarget_percent) {
                po_price_data.price_sewingtarget = Math.round((po_price_data.price_cmp * po_data.exchangerate) * po_data.sewtarget_percent / 100);
                viewmodel.set('po_price', po_price_data);

                //Update gia tri Sew target tai tat ca cac san pham
                var priceStore = viewmodel.getStore('PriceStore');
                priceStore.clearFilter();
                for (var k = 0; k < priceStore.data.length; k++) {
                    var price_data = priceStore.data.items[k].data;
                    price_data.price_sewingtarget = Math.round((price_data.price_cmp * po_data.exchangerate) * po_data.sewtarget_percent / 100);
                }

                priceStore.filter('productid_link', viewmodel.get('product_selected_id_link'));
            }
    },
    onIs_Tbd_Change: function (e, newValue, oldValue, eOpts) {
        var viewmodel = this.getViewModel();
        if (newValue) {
            viewmodel.set('po.po_buyer', 'TBD');
            viewmodel.set('po.po_vendor', 'TBD');
            viewmodel.set('isPO_BuyerDisable', true);
            viewmodel.set('isPO_VendorDisable', true);
        } else {
            viewmodel.set('po.po_buyer', '');
            viewmodel.set('po.po_vendor', '');
            viewmodel.set('isPO_BuyerDisable', false);
            viewmodel.set('isPO_VendorDisable', false);
        }
    }
})