Ext.define('GSmartApp.view.dm_loainghiviec.TimeSheetAbsenceTypeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimeSheetAbsenceTypeViewController',

    init: function (view) {
        var viewmodel = view.getViewModel();
        var device_typeStore = viewmodel.getStore('TimeSheetAbsenceTypeStore');
        device_typeStore.loadStore();
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        }
    },
    onThemMoi: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        var absence = new Object();
        absence.name = viewmodel.get('absence.name');
        absence.percent = viewmodel.get('absence.percent');

        params.data = absence;
        if (isNaN(absence.percent)) {
            viewmodel.set('absence.name', null);
            viewmodel.set('absence.percent', null);
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Số % lương được hưởng phải là số",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },

            });
            return;
        }
        if (absence.name == null || absence.name.trim() == '' || absence.percent == null || absence.percent.trim() == '') {
            viewmodel.set('absence.name', null);
            viewmodel.set('absence.percent', null);
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Thông tin loại nghỉ việc phải điền đấy đủ",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },

            })
        } else {
            //kiểm tra tên loại nghỉ việc đã tồn tại chưa nếu đúng thì được thêm 
            var kt = me.CheckValidate(absence.name, "");
            if (kt) {
                this.Them_DB(params);
            }
        }
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
                if (context.field == "percent") {
                    //kiểm tra trường số % hưởng lương phải là số
                    if (isNaN(context.value)) {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: "Số % lương được hưởng phải là số",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },

                        });
                        //load
                        var viewmodel = this.getViewModel();
                        var device_typeStore = viewmodel.getStore('TimeSheetAbsenceTypeStore');
                        device_typeStore.loadStore();
                        return;
                    }
                }
                params.data.percent = context.value;
            }
            //kiểm tra nếu trùng thì không được sửa 
            var kt = me.CheckValidate(context.value, context.record.data.id);
            if (kt) {
                me.Them_DB(params);
            }
        }

    },
    Them_DB(params) {
        var viewmodel = this.getViewModel();
        GSmartApp.Ajax.post('/api/v1/timesheetabsence/add_timesheetabsencetype', Ext.JSON.encode(params),
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
                        viewmodel.set('absence.name', null);
                        viewmodel.set('absence.percent', null);
                        //load
                        var device_typeStore = viewmodel.getStore('TimeSheetAbsenceTypeStore');
                        device_typeStore.loadStore();
                    }
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

            })
    },
    onXoa: function (grid, rowIndex) {
        var viewmodel = this.getViewModel();
        var rec = grid.getStore().getAt(rowIndex);
        var params = new Object();
        params.data = rec.data;

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa: "' + rec.data.name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            //chọn button có
            fn: function (btn) {
                if (btn === 'yes') {

                    GSmartApp.Ajax.post('/api/v1/timesheetabsence/delete_timesheetabsencetype', Ext.JSON.encode(params),
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
                                var device_typeStore = viewmodel.getStore('TimeSheetAbsenceTypeStore');
                                device_typeStore.loadStore();
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
                        })

                }
            }
        })
    },
    CheckValidate: function (name, id) {
     
        var store = this.getViewModel().getStore('TimeSheetAbsenceTypeStore');

        for (var i = 0; i < store.data.length; i++) {
            var data = store.data.items[i].data;
            //kiểm tra loại nghỉ việc không chứ id truyền vào 
            if ((data.name == name || data.name.toLowerCase() == name.toLowerCase()) && data.id != id) {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Tên loại nghỉ việc :" + name + " đã tồn tại ở dòng " + (i + 1),
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                //load lai
                var viewmodel = this.getViewModel();
                var device_typeStore = viewmodel.getStore('TimeSheetAbsenceTypeStore');
                device_typeStore.loadStore();
                return false;
            }
        }
        return true;
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
    onPercentFilter: function () {
        let filterField = this.lookupReference('PercentFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.percentFilter = filters.add({
                id: 'percentFilter',
                property: 'percent',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.percentFilter) {
            filters.remove(this.percentFilter);
            this.percentFilter = null;
        }
    }
})