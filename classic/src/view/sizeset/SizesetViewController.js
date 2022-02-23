Ext.define('GSmartApp.view.sizeset.SizesetViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SizesetViewController',
    isActivate: false,
    init: function () {
        this.onloadPage();
    },
    control: {
        '#btnThemMoi': {
            click: 'onLuu'
        },
        '#SizesetView': {
            activate: 'onActivate',
            // itemdblclick: 'onitemdblclick',
            itemclick: 'onItemClick',
            celldblclick: 'onCellDblclick',
        }
    },
    Luu_CapNhat: function (record) {
        // console.log(record);
        var params = new Object();
        var data = new Object();
        data.id = record.data.id;
        data.orgrootid_link = record.data.orgrootid_link;
        data.name = record.data.name;
        data.comment = record.data.comment;
        data.usercreatedid_link = record.data.usercreatedid_link;
        data.timecreate = record.data.timecreate;
        data.sortvalue = record.data.sortvalue;
        params.data = data;
        let me = this.getView();
        GSmartApp.Ajax.post('/api/v1/sizeset/createsizeset', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    let store = me.getViewModel().getStore('SizesetStore');
                    me.IdSizeset = 0;
                    me.down('#txtname').reset();
                    me.down('#txtcomment').reset();
                    me.down('#txtname').focus();
                    store.loadStore();
                } else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Lưu thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
     },
    onLuu: function(){
        let me = this.getView();
        if (me.down('#txtname').getValue() == "") {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa nhập tên dải size",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            me.down('#txtname').focus();
            return;
        }
        else {
            let check = this.checkValidate(me.down('#txtname').getValue());
            if(!check) {
                me.down('#txtname').focus();
                return;
            }

            let data = new Object();
            data.id = me.IdSizeset;
            data.orgrootid_link = 0;
            data.name = me.down('#txtname').getValue();
            data.comment = me.down('#txtcomment').getValue();

            let params = new Object();
            params.data = data;

            me.setLoading("Đang lưu dữ liệu");
            this.Luu_CapNhat(params);
        }
    },
    onActivate: function () {
        let me = this;
        if (me.isActivate) {
            this.onloadPage();
        }
        me.isActivate = true;
    },
    onloadPage: function () {
        let me = this.getView();
        let t = this;

        let viewmodel = this.getViewModel();
        let storeSizeset = viewmodel.getStore('SizesetStore');
        storeSizeset.loadStore();
        // let storeAttributeValue = viewmodel.getStore('AttributeValueStore');
        // storeAttributeValue.loadStore(30);

    },

    // action column delete
    onXoa: function (grid, rowIndex, colIndex) {
        let me = this;
        let rec = grid.getStore().getAt(rowIndex);
        let id = rec.get('id');
        let name = rec.get('name');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa dải size "' + name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Xoa(id, rec);
                }
            }
        });
    },
    Xoa: function (id, rec) {
        let me = this.getView();
        me.setLoading("Đang xóa dữ liệu");
        let params = new Object();
        params.id = id;

        GSmartApp.Ajax.post('/api/v1/sizeset/deletesizeset', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Xóa thành công",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });

                    let store = me.getStore();
                    store.remove(rec);
                } else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Xóa thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
            me.IdSizeset = 0;
            me.down('#txtname').reset();
            me.down('#txtcomment').reset();
            me.down('#txtname').focus();
    },

    // Name filter
    onSizesetNameFilterKeyup:function(){
        let grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('sizesetNameFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.nameFilter = filters.add({
                id: 'nameFilter',
                property: 'name',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.nameFilter) {
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    },
    
    // Create new window
    onCellDblclick: function( thisCell, td, cellIndex, record, tr, rowIndex, e, eOpts){
        console.log(record);
        if(cellIndex == 4){
            let form = Ext.create('Ext.window.Window', {
                height: 400,
                closable: true,
                title: 'Thuộc tính : Cỡ',
                resizable: false,
                modal: true,
                border: false,
                closeAction: 'destroy',
                width: 400,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    border: false,
                    xtype: 'SizesetSelectAttributeView',
                    IdSizeset: record.id,
                    IdAttribute: 30
                }]
            });
            form.show();
        }
    },

    // Edit row
    checkValidate: function(name){
        let store = this.getViewModel().getStore('SizesetStore');
        for(let i=0; i< store.data.length;i++){
            let data = store.data.items[i].data;
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
    onNameFocus: function(textField, event, eOpts ){
        
    },
    onNameChange: function(textField, newValue, oldValue, eOpts){
        let viewModel = this.getViewModel();
        viewModel.set('newName', newValue);
    },
    onNameFocusLeave: function(textField, event, eOpts){
        let me = this.getView();
        let viewModel = this.getViewModel();
        let newName = viewModel.get('newName');
        let oldName = viewModel.get('oldName');

        if(newName==oldName){
            return;
        }

        let check = this.checkValidate(newName);
        if(!check || newName=='') {
            textField.setValue(oldName);
            textField.focus();
            return;
        }

        let data = new Object();
        data = viewModel.get('currentRec');
        data.name=newName;

        let params = new Object();
        params.data = data;

        me.setLoading("Đang lưu dữ liệu");
        this.Luu_CapNhat(params);
    },
    onCommentFocus: function(){

    },
    onCommentChange: function(textField, newValue, oldValue, eOpts){
        let viewModel = this.getViewModel();
        viewModel.set('newComment', newValue);
    },
    onCommentFocusLeave: function(){
        let me = this.getView();
        let viewModel = this.getViewModel();
        let newComment = viewModel.get('newComment');
        let oldComment = viewModel.get('oldComment');

        if(newComment==oldComment){
            return;
        }

        let data = new Object();
        data = viewModel.get('currentRec');
        data.comment=newComment;

        let params = new Object();
        params.data = data;

        me.setLoading("Đang lưu dữ liệu");
        this.Luu_CapNhat(params);
    },
    onItemClick: function(thisItem, record, item, index, e, eOpts){
        // console.log(record);
        let viewModel = this.getViewModel();
        viewModel.set('currentRec', record.data);
        viewModel.set('oldName', record.data.name);
        viewModel.set('newName', record.data.name);
        viewModel.set('oldComment', record.data.comment);
        viewModel.set('newComment', record.data.comment);
    },
    onDrop: function(node, data, dropRec, dropPosition){

        var store = this.getViewModel().getStore('SizesetStore');
        var arrData = [];
        store.each(function(rec,ind){
            var record = new Object();
            record.id = rec.data.id;
            record.sortvalue = ind+1;
            arrData.push(record);
        });

        var params = new Object();
        params.msgtype = "SIZESET_REORDER";
        params.message = "Sap xep SizeSet";
        params.data = arrData;

        GSmartApp.Ajax.post('/api/v1/sizeset/sizeset_reorder', Ext.JSON.encode(params),
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
    }

})