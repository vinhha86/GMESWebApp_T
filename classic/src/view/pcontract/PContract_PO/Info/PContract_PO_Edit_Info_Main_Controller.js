Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Info_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_Info_Main_Controller',
    init: function () {
        //check quyen 
        common.Check_Object_Permission();

        var main = this.getView();
        var viewmodel = this.getViewModel();
        var ctrsewtarget = Ext.getCmp('PContract_PO_Edit_Info_sewtarget_percent');
        var ctrsewtarget_hidden = Ext.getCmp('PContract_PO_Edit_Info_sewtarget_hidepanel');
        var ctrporderreqdel = Ext.getCmp('PContract_PO_Edit_Porder_Req_deletebutton');
        var ctrportfromto = Ext.getCmp('PContract_PO_Edit_Info_PortFromTo');
        var porder_req_view = main.down('#PContract_PO_Edit_Porder_Req');
        var productStore = viewmodel.getStore('ProductStore');
        var productpairid_link = viewmodel.get('productpairid_link');
        var productid_link = viewmodel.get('productid_link');
        if (productpairid_link > 0) {
            productStore.loadStore_bypairid_Async(productpairid_link, viewmodel.get('pcontractid_link'));
            productStore.load();
        }
        else {
            productStore.loadStore_bypairid_Async(productid_link, viewmodel.get('pcontractid_link'));
            productStore.load();
        }

        var ShipModeStore = viewmodel.getStore('ShipModeStore');
        ShipModeStore.loadStore();
        ShipModeStore.getSorters().add('name');

        var QCOrgStore = viewmodel.getStore('QCOrgStore');
        QCOrgStore.GetOrgByTypeId(16);
        var PackingTypeStore = viewmodel.getStore('PackingTypeStore');
        PackingTypeStore.loadStore();
        var PortStore = viewmodel.getStore('PortStore');
        PortStore.loadStore(null, null);

        //An hien don vi
        porder_req_view.setHidden(viewmodel.get('isHidden_req'));

        //An/hien Sewtarget_percent
        if (viewmodel.get('isedit')) {
            if (null != ctrsewtarget && null != ctrsewtarget_hidden && null != ctrporderreqdel) {
                ctrsewtarget.setHidden(true);
                ctrsewtarget_hidden.setHidden(false);
                ctrporderreqdel.setHidden(true);
            }
        } else {
            if (null != ctrsewtarget && null != ctrsewtarget_hidden && null != ctrporderreqdel) {
                ctrsewtarget.setHidden(false);
                ctrsewtarget_hidden.setHidden(true);
                ctrporderreqdel.setHidden(false);
            }
        }


        if (viewmodel.get('id') > 0) {
            this.getInfo(viewmodel.get('id'));

        } else {
            this.getInfo(null);
        }
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onSave'
        },
        '#btnLuuPOLine': {
            click: 'onSave'
        }
    },
    getInfo: function (id) {
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

                            //Chuyen packing notice ve array
                            var packing_str = response.data.packingnotice;
                            var packing_arr = packing_str == null ? "" : packing_str.split(';');
                            viewmodel.set('po.packingnotice', packing_arr);

                            //Lay danh sach POrder_Req
                            var porderReqStore = viewmodel.getStore('porderReqStore');
                            porderReqStore.loadByPO(id);

                            // //Lay danh sach ke hoach giao hang
                            // var POShippingStore = viewmodel.getStore('POShippingStore');
                            // POShippingStore.loadStore_bypo(id);
                            // console.log(POShippingStore);

                            // Lay productivity
                            var productid_link = viewmodel.get('productid_link');
                            var pcontract_po_productivity = new Object();

                            for (var i = 0; i < response.data.pcontract_po_productivity.length; i++) {
                                if (response.data.pcontract_po_productivity[i].productid_link == productid_link) {
                                    pcontract_po_productivity = response.data.pcontract_po_productivity[i];
                                    break;
                                }
                            }
                            // pcontract_po_productivity

                            viewmodel.set('pcontract_po_productivity', pcontract_po_productivity);
                        }
                    }
                })
        }
    },
    onThoat: function () {
        var viewmodel = this.getViewModel();
        this.fireEvent('Thoat', viewmodel.get('pcontract_po_productivity'));
    },
    onSave: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        var mes = "";

        // if(viewmodel.get('po.parentpoid_link') == null){
        //     mes = "Bạn chưa chọn chào giá !";
        // }

        if (mes == "") {
            var params = new Object();

            var packing_arr = viewmodel.get('po.packingnotice') == null ? [] : viewmodel.get('po.packingnotice');
            var packingnotice = '';
            for (i = 0; i < packing_arr.length; i++) {
                packingnotice = packingnotice + packing_arr[i];
                if (i < packing_arr.length - 1) packingnotice = packingnotice + ';';
            }
            viewmodel.set('po.packingnotice', packingnotice);

            params.data = viewmodel.get('po');

            params.data.po_quantity = viewmodel.get('po.po_quantity') == null ? 0 : parseFloat(viewmodel.get('po.po_quantity').toString().replace(/,/gi, ''));
            params.data.exchangerate = viewmodel.get('po.exchangerate') == null ? 0 : parseFloat(viewmodel.get('po.exchangerate').toString().replace(/,/gi, ''));
            params.data.plan_productivity = viewmodel.get('po.plan_productivity') == null ? 0 : parseFloat(viewmodel.get('po.plan_productivity').toString().replace(/,/gi, ''));

            if (params.data.pcontract_po_productivity != null) {
                for (var i = 0; i < params.data.pcontract_po_productivity.length; i++) {
                    var plan_productivity = viewmodel.get('pcontract_po_productivity').plan_productivity;
                    var plan_linerequired = viewmodel.get('pcontract_po_productivity').plan_linerequired;
                    var productiondays_ns = viewmodel.get('pcontract_po_productivity').productiondays_ns;

                    params.data.pcontract_po_productivity[i].plan_productivity = parseFloat(("0" + plan_productivity).replace(/,/gi, ''));
                    params.data.pcontract_po_productivity[i].plan_linerequired = parseFloat(("0" + plan_linerequired).replace(/,/gi, ''));
                    params.data.pcontract_po_productivity[i].productiondays_ns = parseFloat(("0" + productiondays_ns).replace(/,/gi, ''));
                }
            }
            var arrPOrders = [];
            var porderReqStore = viewmodel.getStore('porderReqStore');
            porderReqStore.each(function (record) {
                //Neu la lenh moi (sencha tu sinh id) --> set = null
                if (!Ext.isNumber(record.data.id)) record.data.id = null;

                //Neu la Sub-PO moi
                if (null == params.data.id) record.data.id = null;
                delete record.data.product;
                arrPOrders.push(record.data);
            });
            params.po_orders = arrPOrders;

            GSmartApp.Ajax.post('/api/v1/pcontract_po/update', Ext.JSON.encode(params),
                function (success, response, options) {
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
                                    me.fireEvent('LuuThanhCong');
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

    }
})