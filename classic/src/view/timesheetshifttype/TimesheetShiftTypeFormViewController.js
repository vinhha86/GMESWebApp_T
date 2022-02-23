Ext.define('GSmartApp.view.timesheetshifttype.TimesheetShiftTypeFormViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimesheetShiftTypeFormViewController',
    init: function () {
        var viewModel = this.getViewModel();
        var id = viewModel.get('id');
        if(id != null || id != 0){
            var name = viewModel.get('name');
            var timefrom = viewModel.get('timefrom');
            var timeto = viewModel.get('timeto');
            var checkboxfrom = viewModel.get('checkboxfrom');
            var checkboxto = viewModel.get('checkboxto');

            var timefromfield = this.lookup('timefrom');
            var timetofield = this.lookup('timeto');
            var checkboxfromfield = this.lookup('checkboxfrom');
            var checkboxtofield = this.lookup('checkboxto');

            console.log(timefrom);
            console.log(timeto);

            timefromfield.setValue(timefrom);
            timetofield.setValue(timeto);
            checkboxfromfield.setValue(checkboxfrom);
            checkboxtofield.setValue(checkboxto);
        }
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onLuu'
        }
    },
    onChange: function (t, newValue, oldValue, eOpts){
        console.log(newValue);
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onLuu: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();

        var id = viewModel.get('id');
        var name = viewModel.get('name');
        var timefrom = this.lookup('timefrom');
        var timeto = this.lookup('timeto');
        var checkboxfrom = this.lookup('checkboxfrom');
        var checkboxto = this.lookup('checkboxto');

        var params = new Object();
        params.id = id;
        params.name = name;
        params.timefrom = timefrom.getValue();
        params.timeto = timeto.getValue();
        params.checkboxfrom = checkboxfrom.getValue();
        params.checkboxto = checkboxto.getValue();

        params.msgtype = "TIMESHEET_SHIFT_TYPE_CREATE";
        params.message = "Tạo ca làm việc";

        // console.log(params);

        GSmartApp.Ajax.post('/api/v1/timesheetshifttype/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var res = Ext.decode(response.responseText);
                    if (res.respcode == 200) {
                        if(res.message == 'Tên ca làm việc đã tồn tại'){
                            // Tên ca làm việc đã tồn tại
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: res.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }else{
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: 'Lưu thành công',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                            var mainView = Ext.getCmp('TimesheetShiftTypeView');
                            mainView.getStore().load();
                            me.up('window').close();
                        }
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
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
            })
    },
})