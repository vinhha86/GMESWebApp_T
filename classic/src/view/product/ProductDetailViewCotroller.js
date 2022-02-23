Ext.define('GSmartApp.view.product.ProductDetailViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProductDetailViewCotroller',
    IdProduct: 0,
    init: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        //neu la mo len tu form tin kiem
        if(viewmodel.get('isWindow')){
            me.onLoadData(viewmodel.get('product.id'), null);
        }
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData'
            }
        }
    },
    control: {
        '#btnQuayLai': {
            click: 'onQuayLai'
        },
        '#btnNPL': {
            click: 'onViewNPL'
        },
        '#btnLuu': {
            click: 'onLuu'
        },
        '#btnThoat' : {
            click: 'onThoat'
        }
    },
    onThoat: function(){
        var me= this.getView();
        me.up('window').close();
    },
    CheckValidate: function(){
        var viewmodel = this.getViewModel();
        var mes = '';

        if(viewmodel.get('product.code') == '' || viewmodel.get('product.code') == null){
            mes ="Bạn chưa nhập mã sản phẩm";
            return mes;
        }
        else if(viewmodel.get('product.name') == '' || viewmodel.get('product.name') == null){
            mes ="Bạn chưa nhập tên sản phẩm";
            return mes;
        }
        else if(viewmodel.get('product.buyercode') == '' || viewmodel.get('product.buyercode') == null){
            mes ="Bạn chưa nhập mã Buyer";
            return mes;
        }
        else if(viewmodel.get('product.buyername') == '' || viewmodel.get('product.buyername') == null){
            mes ="Bạn chưa nhập tên Buyer";
            return mes;
        }
        return mes;
    },
    onLuu: function () {
        var m = this;

        var me = this.getView();
        var viewModel = this.getViewModel();
        // main.setLoading("Đang lưu dữ liệu");

        var params = new Object();
        var data = new Object();
        data = viewModel.get('product');
        data.producttypeid_link = 10;
        data.id = m.IdProduct;
        data.status = 1;
        data.usercreateid_link = 0;
        data.timecreate = '';

        //Lay ten san pham = ten Buyer SP
        data.name = data.buyername;

        delete data.designerName;
        delete data.productAttribute;

        params.data = data;
        params.msgtype = "PRODUCT_CREATE";
        params.message = "Tạo sản phẩm";

        GSmartApp.Ajax.post('/api/v1/product/createproduct', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.MessageBox.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function(){
                                if(!viewModel.get('isWindow'))
                                    m.redirectTo("lsproduct/" + response.id + "/edit");
                                else
                                {
                                    //Tạo event để form gọi lên hứng khi thêm sản phẩm thành công với trường hợp tạo sản phẩm trong đơn hàng
                                    m.getView().fireEvent("CreateProduct", response.product);
                                    viewModel.set('product', response.product);
                                    m.onLoadData(response.product.id);
                                }
                            }
                        });

                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                        me.down('#code').focus();
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
                me.setLoading(false);
            })
    },
    onQuayLai: function () {
        this.redirectTo('lsproduct');
    },
    onLoadData: function (id, type) {
        this.IdProduct = id;

        viewInfo = Ext.getCmp('ProductInfoView');
        viewInfo.IdProduct = id;
        viewInfo.getController().loadInfo(id);

        viewAttribute = Ext.getCmp('ProductAttributeView');
        viewAttribute.IdProduct = id;

        imgView = Ext.getCmp('ProductImageView');
        imgView.IdProduct = id;
        
        var storeAtt = this.getViewModel().getStore('ProductAttributeValueStore');
        var storeSKU = this.getViewModel().getStore('SKUStore');
        if (id != 0) {
            storeAtt.loadStore(id);
            storeSKU.loadStore(id);
            storeSKU.sort([
                {property :'color_name', direction: 'ASC'},
                {property :'sort_size', direction: 'ASC'}
            ]);
        }
        else {
            storeAtt.removeAll();
            storeSKU.removeAll();
        }
    },
    onViewNPL: function(){
        var me = this.getView();
        var t = this;
        var viewmodel = this.getViewModel();
        var data = viewmodel.get('product');

        var form = Ext.create('Ext.window.Window', {
            height: 600,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Định mức nguyên phụ liệu "sản phẩm ' + data.name +'"',
            closeAction: 'destroy',
            width: 1100,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'ProductBOMMainView',
                IdProduct: t.IdProduct
            }]
        });
        form.show();
    }
})