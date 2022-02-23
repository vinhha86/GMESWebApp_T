Ext.define('GSmartApp.view.sku.SkuSearchSelectAttributeValueCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SkuSearchSelectAttributeValueCotroller',
    init: function () {
        var me = this.getView();
        var skuAtributeValueStore = this.getViewModel().getStore('SkuAtributeValueStore');
        skuAtributeValueStore.loadByAttrId(me.IdAttribute);
        // for(var i=0; i<skuAtributeValueStore.getCount();i++){
        //     me.getSelectionModel().select(i, true, false);
        // }
    },
    control: {
        '#btnAddAttributeValue': {
            click: 'onBtnAddAttributeValue'
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onLuu'
        }
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onLuu: function () {
        var me = this.getView();

        var select = me.getSelectionModel().getSelection();
        var selectedValue = '';
        var selectedIds = '';
        for (var i = 0; i < select.length; i++) {
            var data = select[i].data;
            if (selectedValue == ''){
                selectedValue = data.value;
                selectedIds = data.id;
            }
            else {
                selectedValue = selectedValue + '; ' + data.value;
                selectedIds = selectedIds + ';' + data.id;
            }
        }
        
        me.fireEvent("SelectValue", selectedIds, selectedValue);
    },

    onBtnAddAttributeValue: function(){
        // console.log('here yet');
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var IdAttribute = viewModel.get('IdAttribute');
        // console.log(IdAttribute);
        // console.log(IdProduct);

        var value = me.down('#txtAttributeValueAdd').getValue();
        if(value == null || value == '' || value.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Giá trị thuộc tính không được để trống',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            me.down('#txtAttributeValueAdd').focus();
            return;
        }

        // var check = this.checkValidate(value);
        // if (!check) return;

        var data = new Object();
        data.id = 0;
        data.value = value;
        data.attributeid_link = IdAttribute;

        var params = new Object();
        params.msgtype = "ATTRIBUTEVALUE_CREATE";
        params.message = "Tạo giá trị thuộc tính";
        params.data = data;

        me.setLoading("Đang lưu dữ liệu");

        GSmartApp.Ajax.post('/api/v1/attributevalue/attributevalue_create_quick', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    if(response.message == 'Giá trị thuộc tính đã tồn tại'){
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }else{
                        var SkuAtributeValueStore = me.getViewModel().getStore('SkuAtributeValueStore');
                        SkuAtributeValueStore.load();
                        me.down('#txtAttributeValueAdd').setValue('');
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
                me.setLoading(false);
            })
    },
    onEnterAddAttributeValue: function(textfield, e, eOpts){
        var m = this;
        if(e.getKey() == e.ENTER) {
            m.onBtnAddAttributeValue();
        }
    }
})