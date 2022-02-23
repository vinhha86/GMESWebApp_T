Ext.define('GSmartApp.view.attribute.attributeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.attributeController',
    oldValue: '', // Lưu giá trị cũ trước khi sửa . Nếu giá trị mới không validate thì trả về giá trị cũ
    init: function () {
        // var me = this.getView();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('AttributeStore');
        store.getSorters().remove('name');
        // store.loadStore(); 
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#btnXoa': {
            click: 'onXoa'
        },
        '#txtName': {
            focus: 'onfocus',
            focusleave: 'onfocusleave'
        },
        '#AttributeView': {
            activate: 'onActivate',
            select: 'onitemclick'
        },
        '#checkSP':{
            checkchange: 'oncheckchange'
        },
        '#checkNL':{
            checkchange: 'oncheckchange'
        },
        '#checkPLMay':{
            checkchange: 'oncheckchange'
        },
        '#checkPLHT':{
            checkchange: 'oncheckchange'
        },
        '#checkthread' : {
            checkchange: 'oncheckchange'
        },
        '#btnSort': {
            click: 'onSort'
        },
        '#btnSortDesc': {
            click: 'onSortDesc'
        },
    },
    onActivate: function(){
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('AttributeStore');
        store.loadStore();
    },
    ThemMoi_CapNhat: function (params) {
        var me = this.getView();

        GSmartApp.Ajax.post('/api/v1/attribute/attribute_create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var store = me.getViewModel().getStore('AttributeStore');
                    if (params.data.id == 0) {                        
                        me.down('#txtThemMoi').reset();
                    }
                    store.loadStore();
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Thêm mới thất bại',
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
            Ext.Msg.alert(GSmartApp.Locales.title_thongbao[App.Locales.currentLocale], GSmartApp.Locales.error_trongdauvao[GSmartApp.Locales.currentLocale]);
        }
        else {
            var check = this.checkValidate(me.down('#txtThemMoi').getValue());
            if(!check) {
                me.down('#txtThemMoi').focus();
                return;
            }

            var data = new Object();
            data.id = 0;
            data.orgid_link = 0;
            data.name = me.down('#txtThemMoi').getValue();
            data.description = "";
            data.categoryid_link = 0;
            data.usercreateid_link = 0;
            data.timecreate = "";

            var params = new Object();
            params.msgtype = "ATTRIBUTE_CREATE";
            params.message = "Tạo thuộc tính";
            params.data = data;

            me.setLoading("Đang lưu dữ liệu");
            this.ThemMoi_CapNhat(params);
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
                msg: 'Bạn có chắc chắn xóa thuộc tính ' + select[0].data.name + '?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                buttonText: {
                    yes: 'Có',
                    no: 'Không'
                },
                fn: function (btn) {
                    if (btn === 'yes') {
                        var list = [3, 4, 30, 36];
                        if(list.includes(select[0].data.id)){
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: "Không thể xóa những thuộc tính dùng để sinh mã SKU cho sản phẩm và Nguyên phụ liệu",
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng'
                                }
                            });
                        }
                        else {
                            me.setLoading("Đang xóa dữ liệu");
                            var params = new Object();
                            params.id = select[0].data.id;
    
                            GSmartApp.Ajax.post('/api/v1/attribute/attribute_delete', Ext.JSON.encode(params),
                                function (success, response, options) {
                                    if (success) {
                                        var store = me.getViewModel().getStore('AttributeStore');
                                        store.remove(select);
                                        if(select[0].removedFrom == store.data.length){
                                            me.getSelectionModel().select(store.data.length - 1);
                                        }else{
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
                msg: "Bạn không được bỏ trống tên thuộc tính",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            m.setValue(this.oldValue);
        }
        else {
            if(m.getValue() == this.oldValue) return;

            var check = this.checkValidate(m.getValue());
            if(!check){
                m.setValue(this.oldValue);
                return;
            }

            var select = this.getView().getSelectionModel().getSelection();
            select[0].data.name = m.getValue();
            var params = new Object();
            params.msgtype = "ATTRIBUTE_CREATE";
            params.message = "Tạo thuộc tính";
            params.data = select[0].data;

            this.getView().setLoading("Đang lưu dữ liệu");
            this.ThemMoi_CapNhat(params);
        }
    },
    oncheckchange: function (m, rowIndex, checked, record, e, eOpts) {
        this.getView().getSelectionModel().select(record);
            var params = new Object();
            params.msgtype = "ATTRIBUTE_CREATE";
            params.message = "Tạo thuộc tính";
            params.data = record.data;

            this.getView().setLoading("Đang lưu dữ liệu");
            this.ThemMoi_CapNhat(params);
    },
    onitemclick: function (m, record, item, index, e) {
        var me = this.getView();
        var valueView = Ext.getCmp('attributeValueView');
        valueView.getController().load_AttributeValue(record.data.id);
        valueView.getViewModel().set('IdAttribute', record.data.id);
        if(record.data.id == 30 || record.data.id == 3) // size set, age
            valueView.getViewModel().set('isABCsortHidden', true);
        else
            valueView.getViewModel().set('isABCsortHidden', false);
    },
    checkValidate: function(name){
        var store = this.getViewModel().getStore('AttributeStore');
        for(var i=0; i< store.data.length;i++){
            var data = store.data.items[i].data;
            if(data.name == name){
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Dữ liệu đã tồn tại ở dòng "+ (i+1),
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
    onDrop: function(node, data, dropRec, dropPosition){
        var store = this.getViewModel().getStore('AttributeStore');
        var arrData = [];
        store.each(function(rec,ind){
            var temp = new Object();
            temp.id = rec.get('id');
            temp.sortvalue = ind+1;
            arrData.push(temp);
        });

        var params = new Object();
        params.msgtype = "ATTRIBUTE_REORDER";
        params.message = "Sap xep thuoc tinh";
        params.data = arrData;

        GSmartApp.Ajax.post('/api/v1/attribute/attribute_reorder', Ext.JSON.encode(params),
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
        var store = this.getViewModel().getStore('AttributeStore');
        store.sort('name','ASC');

        var arrData = [];

        store.each(function(rec,ind){
            var temp = new Object();
            temp.id = rec.get('id');
            temp.sortvalue = ind+1;
            arrData.push(temp);
        });
        store.sorters.clear();

        var params = new Object();
        params.msgtype = "ATTRIBUTE_REORDER";
        params.message = "Sap xep thuoc tinh";
        params.data = arrData;

        GSmartApp.Ajax.post('/api/v1/attribute/attribute_reorder', Ext.JSON.encode(params),
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
        var store = this.getViewModel().getStore('AttributeStore');
        store.sort('name','DESC');

        var arrData = [];

        store.each(function(rec,ind){
            var temp = new Object();
            temp.id = rec.get('id');
            temp.sortvalue = ind+1;
            arrData.push(temp);
        });
        store.sorters.clear();

        var params = new Object();
        params.msgtype = "ATTRIBUTE_REORDER";
        params.message = "Sap xep thuoc tinh";
        params.data = arrData;

        GSmartApp.Ajax.post('/api/v1/attribute/attribute_reorder', Ext.JSON.encode(params),
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
})