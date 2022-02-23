Ext.define('GSmartApp.view.attribute.attributeValueController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.attributeValueViewController',
    oldValue: '', // Lưu giá trị cũ trước khi sửa . Nếu giá trị mới không validate thì trả về giá trị cũ
    idAttribute: 0,
    init: function () {
        var me = this.getView();
    },
    control: {
        '#btnThemMoi': {
            // click: 'onThemMoi',
            click: 'onBtnAddAttributeValue'
        },
        '#btnSort': {
            click: 'onSort'
        },
        '#btnSortDesc': {
            click: 'onSortDesc'
        },
        '#btnXoa': {
            click: 'onXoa'
        },
        '#txtValue': {
            focus: 'onfocus',
            focusleave: 'onfocusleave'
        },
        '#txtDescription': {
            focus: 'onfocusDescription',
            focusleave: 'onfocusleaveDescription'
        },
        '#txtThemMoi': {
            keydown: 'onKeyUp'
        }
    },
    onKeyUp: function (m, e, eOpts) {
       
    },
    load_AttributeValue: function (id) {
        this.idAttribute = id;
        var store = this.getViewModel().getStore('AttributeValueStore');
        store.loadStore(id);
    },
    ThemMoi_CapNhat: function (params) {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        GSmartApp.Ajax.post('/api/v1/attributevalue/attributevalue_create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var store = me.getViewModel().getStore('AttributeValueStore');
                    if (params.data.id == 0) {
                        me.down('#txtThemMoi').reset();
                        me.down('#txtThemMoi').focus();
                    }
                    store.loadStore(params.data.attributeid_link);
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
    onThemMoi: function () {
        var me = this.getView();
        if (me.down('#txtThemMoi').getValue() == "") {
            Ext.Msg.alert(GSmartApp.Locales.title_thongbao[App.Locales.currentLocale], App.Locales.error_trongdauvao[App.Locales.currentLocale]);
        }
        else {
            var check = this.checkValidate(me.down('#txtThemMoi').getValue());
            if (!check) return;

            var data = new Object();
            data.id = 0;
            data.orgid_link = 0;
            data.value = me.down('#txtThemMoi').getValue();
            data.attributeid_link = this.idAttribute;
            data.description = "";
            data.categoryid_link = 0;
            data.usercreateid_link = 0;
            data.timecreate = "";
            data.isproduct = false;
            data.ismaterial = false;
            data.issewingtrims = false;
            data.ispackingtrims = false;

            var params = new Object();
            params.msgtype = "ATTRIBUTEVALUE_CREATE";
            params.message = "Tạo giá trị thuộc tính";
            params.data = data;

            me.setLoading("Đang lưu dữ liệu");
            this.ThemMoi_CapNhat(params);
        }
    },
    onXoaAtt: function (grid, rowIndex, colIndex) {
        var me = this.getView();
        var rec = grid.getStore().getAt(rowIndex);
        
        if (rec.get('isdefault')) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn không được xóa giá trị mặc định',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else{
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn có chắc chắn xóa giá trị thuộc tính ' + rec.data.value + '?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                buttonText: {
                    yes: 'Có',
                    no: 'Không'
                },
                fn: function (btn) {
                    if (btn === 'yes') {
                        me.setLoading("Đang xóa dữ liệu");
                        var params = new Object();
                        params.id = rec.data.id;
    
                        GSmartApp.Ajax.post('/api/v1/attributevalue/attributevalue_delete', Ext.JSON.encode(params),
                            function (success, response, options) {
                                if (success) {
                                    var store = me.getViewModel().getStore('AttributeValueStore');
                                    store.remove(rec);
                                    if (rec.removedFrom == store.data.length) {
                                        me.getSelectionModel().select(store.data.length - 1);
                                    } else {
                                        me.getSelectionModel().select(rec.removedFrom);
                                    }
                                } else {
                                    Ext.Msg.show({
                                        title: 'Thông báo',
                                        msg: 'Xóa thất bại',
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
        }

        
    },
    onXoa: function () {
        var me = this.getView();
        var select = me.getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn thông tin để xóa",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn có chắc chắn xóa giá trị thuộc tính ' + select[0].data.value + '?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                buttonText: {
                    yes: 'Có',
                    no: 'Không'
                },
                fn: function (btn) {
                    if (btn === 'yes') {
                        me.setLoading("Đang xóa dữ liệu");
                        var params = new Object();
                        params.id = select[0].data.id;

                        GSmartApp.Ajax.post('/api/v1/attributevalue/attributevalue_delete', Ext.JSON.encode(params),
                            function (success, response, options) {
                                if (success) {
                                    var store = me.getViewModel().getStore('AttributeValueStore');
                                    store.remove(select);
                                    if (select[0].removedFrom == store.data.length) {
                                        me.getSelectionModel().select(store.data.length - 1);
                                    } else {
                                        me.getSelectionModel().select(select[0].removedFrom);
                                    }
                                } else {
                                    Ext.Msg.show({
                                        title: 'Thông báo',
                                        msg: 'Xóa thất bại',
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
        }
    },
    onfocus: function (m, event, eOpts) {
        this.oldValue = m.getValue();
    },
    onfocusleave: function (m, event, eOpts) {
        if (m.getValue() == "") {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn không được bỏ trống giá trị thuộc tính",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
                fn: function () {
                    m.setValue(this.oldValue);
                }
            });
        }
        else {
            if (m.getValue() == this.oldValue) return;

            var check = this.checkValidate(m.getValue());
            if (!check) {
                m.setValue(this.oldValue);
                return;
            }

            var select = this.getView().getSelectionModel().getSelection();
            var data = new Object();
            data = select[0].data;
            // data.id = select[0].data.id;
            data.orgid_link = 0;
            data.attributeid_link = this.idAttribute;
            data.value = m.getValue();
            // data.description = "";
            data.categoryid_link = 0;
            data.usercreateid_link = 0;
            data.timecreate = "";

            var params = new Object();
            params.msgtype = "ATTRIBUTEVALUE_UPDATE";
            params.message = "Cập nhật giá trị thuộc tính";
            params.data = data;

            this.getView().setLoading("Đang lưu dữ liệu");
            this.ThemMoi_CapNhat(params);
        }
    },
    checkValidate: function (name) {
        var store = this.getViewModel().getStore('AttributeValueStore');
        for (var i = 0; i < store.data.length; i++) {
            var data = store.data.items[i].data;
            if (data.name == name) {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Dữ liệu đã tồn tại ở dòng " + (i + 1),
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });

                return false;
            }
        }
        return true;
    },
    onfocusDescription: function (m, event, eOpts) {
        this.oldDescription = m.getValue();
    },
    onfocusleaveDescription: function (m, event, eOpts) {
        if (m.getValue() == this.oldDescription) return;

        var select = this.getView().getSelectionModel().getSelection();
        var data = new Object();
        data = select[0].data;
        // data.id = select[0].data.id;
        data.orgid_link = 0;
        data.attributeid_link = this.idAttribute;
        // data.value = m.getValue();
        data.description = m.getValue();
        data.categoryid_link = 0;
        data.usercreateid_link = 0;
        data.timecreate = "";

        var params = new Object();
        params.msgtype = "ATTRIBUTEVALUE_UPDATE";
        params.message = "Cập nhật mô tả thuộc tính";
        params.data = data;

        this.getView().setLoading("Đang lưu dữ liệu");
        this.ThemMoi_CapNhat(params);
    
    },
    onDrop: function(node, data, dropRec, dropPosition){
        var store = this.getViewModel().getStore('AttributeValueStore');
        var arrData = [];
        // store.each(function(rec,ind){
        //     rec.set('sortvalue',ind+1);
            
        //     arrData.push(rec.data);
        // });
        store.each(function(rec,ind){
            var temp = new Object();
            temp.id = rec.get('id');
            temp.sortvalue = ind+1;
            arrData.push(temp);
        });

        var params = new Object();
        params.msgtype = "ATTRIBUTEVALUE_REORDER";
        params.message = "Sap xep thuoc tinh";
        params.data = arrData;

        GSmartApp.Ajax.post('/api/v1/attributevalue/attributevalue_reorder', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    // store.reload();
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
    onSort: function (){
        var store = this.getViewModel().getStore('AttributeValueStore');
        store.sort('value','ASC');

        var arrData = [];

        store.each(function(rec,ind){
            var temp = new Object();
            temp.id = rec.get('id');
            temp.sortvalue = ind+1;
            arrData.push(temp);
        });
        store.sorters.clear();

        var params = new Object();
        params.msgtype = "ATTRIBUTEVALUE_REORDER";
        params.message = "Sap xep thuoc tinh";
        params.data = arrData;

        GSmartApp.Ajax.post('/api/v1/attributevalue/attributevalue_reorder', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    store.load();
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    store.load();
                }
            })
    },
    onSortDesc: function (){
        var store = this.getViewModel().getStore('AttributeValueStore');
        store.sort('value','DESC');

        var arrData = [];

        store.each(function(rec,ind){
            var temp = new Object();
            temp.id = rec.get('id');
            temp.sortvalue = ind+1;
            arrData.push(temp);
        });
        store.sorters.clear();

        var params = new Object();
        params.msgtype = "ATTRIBUTEVALUE_REORDER";
        params.message = "Sap xep thuoc tinh";
        params.data = arrData;

        GSmartApp.Ajax.post('/api/v1/attributevalue/attributevalue_reorder', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    store.load();
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    store.load();
                }
            })
    },
    onBtnAddAttributeValue: function(){
        // console.log('here yet');
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var IdAttribute = viewModel.get('IdAttribute');
        // console.log(IdAttribute);
        // console.log(IdProduct);

        var value = me.down('#txtThemMoi').getValue();
        if(value == null || value == '' || value.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Giá trị thuộc tính không được để trống',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            me.down('#txtThemMoi').focus();
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
                        var AttributeValueStore = me.getViewModel().getStore('AttributeValueStore');
                        AttributeValueStore.load();
                        me.down('#txtThemMoi').setValue('');
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