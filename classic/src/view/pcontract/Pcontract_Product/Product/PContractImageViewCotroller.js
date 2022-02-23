Ext.define('GSmartApp.view.PContract.PContractImageViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractImageViewCotroller',
    init: function () {
        var me = this.getView();
    },
    control: {
        '#btneditimg1': {
            change: 'onSelect'
        },
        '#btneditimg2': {
            change: 'onSelect'
        },
        '#btneditimg3': {
            change: 'onSelect'
        },
        '#btneditimg4': {
            change: 'onSelect'
        },
        '#btneditimg5': {
            change: 'onSelect'
        }
    },
    onView: function (m) {
        var me = this.getView();
        var src = "";
        switch (m.currentTarget.id) {
            case "pcontract_imgproduct1":
                src = me.down('#img1').getSrc();
                break;
            case "pcontract_imgproduct2":
                src = me.down('#img2').getSrc();
                break;
            case "pcontract_imgproduct3":
                src = me.down('#img3').getSrc();
                break;
            case "pcontract_imgproduct4":
                src = me.down('#img4').getSrc();
                break;
            case "pcontract_imgproduct5":
                src = me.down('#img5').getSrc();
                break;
            default:
                break;
        }
        me.down('#imgView').setSrc(src);
    },
    onDelete: function(e){
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
                {
                    text: 'Xóa ảnh',
                    itemId: 'btnDeleteImg',
                    iconCls: 'x-fa fas fa-trash redIcon',
                    handler: function(){
                        me.onDeleteImg(e.target.id);
                    }
                }
            ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.pageX - 10, e.pageY - 10];
        e.stopEvent();
        menu_grid.showAt(position);
    },
    onDeleteImg: function(id){
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var img = 0;

        switch (id) {
            case "pcontract_imgproduct1":
                img = 1;
                break;
            case "pcontract_imgproduct2":
                img = 2;
                break;
            case "pcontract_imgproduct3":
                img = 3;
                break;
            case "pcontract_imgproduct4":
                img = 4;
                break;
            case "pcontract_imgproduct5":
                img = 5;
                break;
            default:
                break;
        }

        var params = new Object();
        params.productid_link = viewmodel.get('productid_link');
        params.img = img;

        GSmartApp.Ajax.post('/api/v1/product/delete_img', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                       if(response.respcode == 200){
                        me.fireEvent('Reload');
                        switch (img) {
                            case 1:
                                me.down('#img1').setSrc('data:image/gif;base64,');
                                break;
                            case 2:
                                me.down('#img2').setSrc('data:image/gif;base64,');
                                break;
                            case 3:
                                me.down('#img3').setSrc('data:image/gif;base64,');
                                break;
                            case 4:
                                me.down('#img4').setSrc('data:image/gif;base64,');
                                break;
                            case 5:
                                me.down('#img5').setSrc('data:image/gif;base64,');
                                break;
                            default:
                                break;
                        }
                        me.down('#imgView').setSrc("");
                       }
                       else{
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Có lỗi trong quá trình xóa ảnh!',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                       }
                    }
                })

    },
    OpenFileDialog: function(m){
        var me = this.getView();
        var viewmodel = this.getViewModel();
        if (viewmodel.get('productid_link') == 0) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn phải tạo sản phẩm trước khi upload ảnh',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        switch (m.target.id) {
            case "pcontract_imgproduct1":
                me.down('#btneditimg1').fileInputEl.dom.click();
                break;
            case "pcontract_imgproduct2":
                me.down('#btneditimg2').fileInputEl.dom.click();
                break;
            case "pcontract_imgproduct3":
                me.down('#btneditimg3').fileInputEl.dom.click();
                break;
            case "pcontract_imgproduct4":
                me.down('#btneditimg4').fileInputEl.dom.click();
                break;
            case "pcontract_imgproduct5":
                me.down('#btneditimg5').fileInputEl.dom.click();
                break;
            default:
                break;
        }
    },
    onSelect: function (m, value, eOpts) {
        var viewmodel = this.getViewModel();
        var me = this.getView();
        var th = this;
        if (viewmodel.get('productid_link') == 0) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn phải tạo sản phẩm trước khi chọn thuộc tính',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            var viewInfo = Ext.getCmp('ProductInfoView');
            viewInfo.down('#code').focus();
            return false;
        }
        else {
            var viewmodel = this.getViewModel();
            var filename = value.replace(/C:\\fakepath\\/g, '');
            var img = 0;

            switch (m.itemId) {
                case "btneditimg1":
                    img = 1;
                    break;
                case "btneditimg2":
                    img = 2;
                    break;
                case "btneditimg3":
                    img = 3;
                    break;
                case "btneditimg4":
                    img = 4;
                    break;
                case "btneditimg5":
                    img = 5;
                    break;
                default:
                    break;
            }
            var data = new FormData();
            data.append('file', m.fileInputEl.dom.files[0]);
            data.append('id', viewmodel.get('productid_link'));
            data.append('img', img);

            GSmartApp.Ajax.postUpload('/api/v1/product/updateimg', data,
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        th.loadImg(img, filename);
                    }
                })
        }
    },
    loadImg: function (img, filename) {
        var viewmodel = this.getViewModel();
        var me = this.getView();
        var data = new Object();
        data.product_type = 10;
        data.img = img;
        var str = filename.split('.');
        data.ext = str[str.length - 1];
        data.id = viewmodel.get('productid_link');

        GSmartApp.Ajax.post('/api/v1/product/viewimg', Ext.JSON.encode(data),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    me.down('#imgView').setSrc('data:image/gif;base64,' + response.data);
                    switch (img) {
                        case 1:
                            me.down('#img1').setSrc('data:image/gif;base64,' + response.data);
                            break;
                        case 2:
                            me.down('#img2').setSrc('data:image/gif;base64,' + response.data);
                            break;
                        case 3:
                            me.down('#img3').setSrc('data:image/gif;base64,' + response.data);
                            break;
                        case 4:
                            me.down('#img4').setSrc('data:image/gif;base64,' + response.data);
                            break;
                        case 5:
                            me.down('#img5').setSrc('data:image/gif;base64,' + response.data);
                            break;
                        default:
                            break;
                    }

                    me.fireEvent('Reload');
                }
            })
    }
})