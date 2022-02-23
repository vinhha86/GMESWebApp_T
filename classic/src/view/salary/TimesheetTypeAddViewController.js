Ext.define('GSmartApp.view.salary.TimesheetShiftTypeAddViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimesheetShiftTypeAddViewController',

    init:function(view){
        this.onload();
        var viewModel = this.getViewModel();
        var id = viewModel.get('id');
        if(id != null || id != 0){
            var name = viewModel.get('name');
            var timefrom = viewModel.get('timefrom');
            var timeto = viewModel.get('timeto');
            var checkboxfrom = viewModel.get('checkboxfrom');
            var checkboxto = viewModel.get('checkboxto');
            // var is_ca_an = viewModel.get('is_ca_an');

            var timefromfield = this.lookup('timefrom');
            var timetofield = this.lookup('timeto');
            var checkboxfromfield = this.lookup('checkboxfrom');
            var checkboxtofield = this.lookup('checkboxto');
            var checkboxcaanfield = this.lookup('checkboxcaan');

            console.log(timefrom);
            console.log(timeto);

            timefromfield.setValue(timefrom);
            timetofield.setValue(timeto);
            checkboxfromfield.setValue(checkboxfrom);
            checkboxtofield.setValue(checkboxto);
            // checkboxcaanfield.setValue(is_ca_an);
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
    // onChange: function (t, newValue, oldValue, eOpts){
    //     console.log(newValue);
    // },
    onload: function () {
        var viewmodel = this.getViewModel();
        // var is_ca_an = viewmodel.get('is_ca_an');
        var id = viewmodel.get('orgid_link')
        var TimesheetShiftTypeStore = viewmodel.getStore('TimesheetShiftTypeStore');
        TimesheetShiftTypeStore.loadStorebyOrgid_link(id);
        // var TimesheetShiftTypeStore = viewmodel.getStore('TimesheetShiftTypeStore');
        // TimesheetShiftTypeStore.loadStore();
      //  loadStore
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onLuu: function () {
        var viewModel = this.getViewModel();
        var form = this.getView();
        var name_id = viewModel.get('TimeShift.name');
        var timesheet_shift_type_id_link =null;
        if(typeof(name_id)==='number'){
            timesheet_shift_type_id_link = name_id;
        }else{
            timesheet_shift_type_id_link = viewModel.get('TimeShift.timesheet_shift_type_id_link')
        }
        var orgid_link = viewModel.get('orgid_link');
        var orgid = viewModel.get('TimeShift.orgid_link');

        var id = viewModel.get('id');
        var timefrom = this.lookup('timefrom');
        var timeto = this.lookup('timeto');
        var checkboxfrom = this.lookup('checkboxfrom');
        var checkboxto = this.lookup('checkboxto');
        // var checkboxcaanfield = this.lookup('checkboxcaan');
        
        var params = new Object();
        params.id = id;
        params.timesheet_shift_type_id_link = timesheet_shift_type_id_link;
        params.timefrom = timefrom.getValue();
        params.timeto = timeto.getValue();
        params.checkboxfrom = checkboxfrom.getValue();
        params.checkboxto = checkboxto.getValue();
        // params.is_ca_an = checkboxcaanfield.getValue();
        params.orgid_link = orgid == null ? orgid_link : orgid;

        console.log(params);
        if(!params.orgid_link){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn chưa chọn đơn vị',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }else{
                GSmartApp.Ajax.post('/api/v1/timesheetshifttypeorg/create', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var res = Ext.decode(response.responseText);
                        if (res.respcode == 200) {
    
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: 'Lưu thành công',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                            if(!id){
                                form.fireEvent("thanhcong");
                            }else{
                                form.fireEvent("updatethanhcong");
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
            }
    },
})