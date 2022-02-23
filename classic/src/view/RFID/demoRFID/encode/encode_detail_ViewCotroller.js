Ext.define('GSmartApp.view.RFID.demoRFID.encode.encode_detail_ViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.encode_detail_ViewCotroller',
    init: function () {
        var viewmodel = this.getViewModel();
        var deviceStore = viewmodel.getStore('device_store');
        deviceStore.loadStore();

        var data_print = viewmodel.get('encode');
        var ExpDate = data_print.exp;
        console.log(ExpDate);
        if(ExpDate!=null && ExpDate != '') {
            data_print.exp = ExpDate.getDate() + "/" + (ExpDate.getMonth() + 1) + "/" + ExpDate.getFullYear();
        }
        
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnPrint': {
            click: 'onPrint'
        },
        '#cmbDevice': {
            select: 'onSelectDevice'
        }
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onSelectDevice: function (cmb, rec) {
        var viewmodel = this.getViewModel();
        viewmodel.set('deviceid', rec.get('deviceid'));
    },
    onPrint: function () {
        var viewmodel = this.getViewModel();
        var data_print = viewmodel.get('encode'); //data chua du lieu de in len nhan
        var type_print = viewmodel.get("type_print"); // 1.CHi in 2 chi ma hoa 3.Ca in va ma hoa
        var deviceid = viewmodel.get('deviceid');
        if (deviceid == null) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn thiết bị",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
            return
        }
        console.log(data_print);
        console.log(type_print);
        console.log(deviceid);
        //code from here
        if(type_print==1 || type_print == 2) {
        } else if(type_print==3) {
            //Encode Workstation
        } else {
            //Show qrcode 
        }
    }
})