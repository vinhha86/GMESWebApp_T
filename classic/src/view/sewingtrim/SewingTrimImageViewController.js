Ext.define('GSmartApp.view.sewingtrim.SewingTrimImageViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SewingTrimImageViewController',
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
    OpenFileDialog: function(m){
        var me = this.getView();
        if (me.IdProduct == 0) {
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
            case "imgsewtrim1":
                me.down('#btneditimg1').fileInputEl.dom.click();
                break;
            case "imgsewtrim2":
                me.down('#btneditimg2').fileInputEl.dom.click();
                break;
            case "imgsewtrim3":
                me.down('#btneditimg3').fileInputEl.dom.click();
                break;
            case "imgsewtrim4":
                me.down('#btneditimg4').fileInputEl.dom.click();
                break;
            case "imgsewtrim5":
                me.down('#btneditimg5').fileInputEl.dom.click();
                break;
            default:
                break;
        }
    },
    onSelect: function (m, value, eOpts) {
        var me = this.getView();
        var th = this;
        if (me.IdProduct == 0) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn phải tạo phụ liệu may trước khi chọn thuộc tính',
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
            data.append('id', me.IdProduct);
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
        var me = this.getView();
        var data = new Object();
        data.product_type = 30;
        data.img = img;
        var str = filename.split('.');
        data.ext = str[str.length - 1];
        data.id = me.IdProduct;

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
                }
            })
    },
    onView: function (m) {
        var me = this.getView();
        var src = "";
        switch (m.currentTarget.id) {
            case "imgsewtrim1":
                src = me.down('#img1').getSrc();
                break;
            case "imgsewtrim2":
                src = me.down('#img2').getSrc();
                break;
            case "imgsewtrim3":
                src = me.down('#img3').getSrc();
                break;
            case "imgsewtrim4":
                src = me.down('#img4').getSrc();
                break;
            case "imgsewtrim5":
                src = me.down('#img5').getSrc();
                break;
            default:
                break;
        }
        me.down('#imgView').setSrc(src);
    }
})