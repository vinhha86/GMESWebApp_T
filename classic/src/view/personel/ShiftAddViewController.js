Ext.define('GSmartApp.view.personel.ShiftAddViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ShiftAddViewController',
    init: function (view) {
        var viewmodel= view.getViewModel();
        console.log(viewmodel.get('orgid_link'));
        var id_donvi = viewmodel.get('orgid_link');
        var TimesheetShiftTypeStore = viewmodel.getStore('TimesheetShiftTypeStore');
        TimesheetShiftTypeStore.loadStoreShiftbyOrgid_link(id_donvi);
    },
    control: {
        '#Exit': {
            click: 'onClick'
        },
        '#Luu': {
            click: 'onLuu'
        },
    },
    onClick: function (m, e, eOpts) {
        this.getView().up('window').close();
    },
    onLuu:function(){
        var grid = this.getView();
        var form = this.getView();
        var viewmodel = this.getViewModel();
        var timesheet_absence_type_id_link= viewmodel.get('Shift.id');
        var selected =viewmodel.get('select');
       // var orgmanageid_link=selected[0].data.orgmanagerid_link;
        
        var data = [];
        for(var i = 0; i< selected.length ; i++){
            data.push(selected[i].data)
        }
        console.log(data)
        var params = new Object();
        params.data = data;
        params.timesheet_absence_type_id_link =timesheet_absence_type_id_link;
      //  params.orgmanageid_link =orgmanageid_link;
        grid.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.post('/api/v1/personnel/addshift_personnel', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: "Lưu thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        form.fireEvent('Thanhcong');
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    }
})