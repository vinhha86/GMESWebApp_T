Ext.define('GSmartApp.view.timesheetshifttype.TimesheetShiftTypeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimesheetShiftTypeViewController',
    init: function () {
        this.onloadPage();
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
       
    },
    onThemMoi: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        var shift = new Object();
        shift.name = viewmodel.get('shift.name');
        shift.code = viewmodel.get('shift.code');
        shift.is_ca_an = viewmodel.get('shift.is_ca_an');

        params.data = shift;
 
        if (shift.name == null || shift.name.trim() == '' || shift.code == null || shift.code.trim() == '') {
            viewmodel.set('shift.name', null);
            viewmodel.set('shift.code', null);
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Thông tin ca làm việc phải điền đấy đủ",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            })
        } else {
            //kiểm tra tên loại nghỉ việc đã tồn tại chưa nếu đúng thì được thêm 
            var kt = me.CheckValidate( shift.name,shift.code, "");
            if (kt) {
                this.Them_DB(params);
            }
        }
    },
    Them_DB(params) {
        var me = this;
        var viewmodel = this.getViewModel();
        var TimesheetShiftTypeStore = viewmodel.getStore('TimesheetShiftTypeStore');
        GSmartApp.Ajax.post('/api/v1/timesheetshifttype/add_timesheetshifttype', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: "Lưu thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },

                        })
                        viewmodel.set('shift.name', null);
                        viewmodel.set('shift.code', null);
                        viewmodel.set('shift.is_ca_an', null);
                        //load
                       me.onloadPage();
                    }
                } else {
                    TimesheetShiftTypeStore.rejectChanges();
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Lưu thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }

            })
    },

    onEdit: function (editor, context, e) {
        var me = this;
        var params = new Object();
        params.data = context.record.data;

        //kiểm tra nếu dữ liệu khác lúc ban đầu thì thêm
        if (context.value != context.originalValue) {
            //kiểm tra xem sửa ở trường nào để gán lại
            if (context.field == "name") {
                params.data.name = context.value;
            } else {
                if (context.field == "code") {
                    params.data.code = context.value;
                }
            }
            //kiểm tra nếu trùng thì không được sửa 
            var kt = me.CheckValidate( params.data.name,  params.data.code,context.record.data.id);
            if (kt) {
                me.Them_DB(params);
            }
        }

    },
    onloadPage: function () {
        var viewmodel = this.getViewModel();
        var TimesheetShiftTypeStore = viewmodel.getStore('TimesheetShiftTypeStore');
        TimesheetShiftTypeStore.loadStore();
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        var params = new Object();
        params.data = rec.data;
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Xoa(params);
                }
            }
        });
    },
    Xoa: function (params) {
        var me = this;

        GSmartApp.Ajax.post('/api/v1/timesheetshifttype/delete_timesheetshifttype', Ext.JSON.encode(params),
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
                    //load
                    me.onloadPage();
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
            })
    },
    CheckValidate: function (name,code, id) {
        var me =this;
        var store = this.getViewModel().getStore('TimesheetShiftTypeStore');

        for (var i = 0; i < store.data.length; i++) {
            var data = store.data.items[i].data;
            //kiểm tra tên ca làm việc không chứ id truyền vào 
            if ((data.name == name || data.name.toLowerCase() == name.toLowerCase()) && data.id != id) {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Ca làm việc :" + name + " đã tồn tại ở dòng " + (i + 1),
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                me.onloadPage();
                return false;
            }
            //kiểm tra mã ca làm việc không chứ id truyền vào 
            if ((data.code == code || data.code.toLowerCase() == code.toLowerCase()) && data.id != id) {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Mã ca làm việc :" + code + " đã tồn tại ở dòng " + (i + 1),
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                me.onloadPage();
                return false;
            }
        }
        return true;
    },
    onCheckcolumnCheckChange: function(checkcolumn, rowIndex, checked, record, eOpts){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        
        var params = new Object();
        var data = record.data;
        params.data = data;
        this.Them_DB(params);
    },
    //lọc - filter
    onNameFilter: function () {
        let filterField = this.lookupReference('NameFilter'),
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
    onCodeFilter: function () {
        let filterField = this.lookupReference('CodeFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.codeFilter = filters.add({
                id: 'codeFilter',
                property: 'code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.codeFilter) {
            filters.remove(this.codeFilter);
            this.codeFilter = null;
        }
    }
})