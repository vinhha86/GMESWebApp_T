Ext.define('GSmartApp.view.holiday.HolidayViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HolidayViewController',
    isActivate: false,
    init: function () {
        this.onloadPage();
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#btnXoa': {
            click: 'onXoaNhieu'
        },
        '#btnClone': {
            click: 'onClone'
        },
        '#HolidayView': {
            itemclick: 'onItemClick'
        }
    },
    onThemMoi: function(){
        let viewModel = this.getViewModel();
        let me = this.getView();
        let form = Ext.create('Ext.window.Window', {
            height: 250,
            width: 600,
            closable: true,
            title: 'Thêm mới ngày nghỉ',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'HolidayFormView'
            }]
        });
        form.show();
    },
    onloadPage: function () {
        let me = this.getView();
        let t = this;

        let viewmodel = this.getViewModel();
        let storeHoliday = viewmodel.getStore('HolidayStore');
        storeHoliday.loadStoreByYear(new Date().getFullYear());
        storeHoliday.sort('day', 'DESC');

        let storeHolidayYears = viewmodel.getStore('HolidayYearStore');
        storeHolidayYears.loadStore();
    },
    onChange: function( cbbox, newValue, oldValue, eOpts ) {
        // console.log(newValue);
        let viewmodel = this.getViewModel();
        let storeHoliday = viewmodel.getStore('HolidayStore');
        if(newValue == 'Tất cả')
            storeHoliday.loadStore();
        else
            storeHoliday.loadStoreByYear(newValue);
        storeHoliday.sort('day', 'DESC');
    },
    onXoa: function (grid, rowIndex, colIndex) {
        let me = this;
        let rec = grid.getStore().getAt(rowIndex);
        let data = [];
        data.push(rec.data);
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
                    me.Xoa(data);
                }
            }
        });
    },
    Xoa: function (data) {
        let me = this.getView();
        me.setLoading("Đang xóa dữ liệu");
        let params = new Object();
        params.data = data;

        GSmartApp.Ajax.post('/api/v1/holiday/delete', Ext.JSON.encode(params),
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
                    store.load();
                    me.getViewModel().getStore('HolidayYearStore').load();
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
    },
    onXoaNhieu: function(){
        let m = this.getView();
        let me = this;
        let data = [];
        let select = m.getSelectionModel().getSelection();
        if(select.length == 0){
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Phải chọn ít nhất một ngày nghỉ",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        for (let i = 0; i < select.length; i++) {
            data.push({'id': select[i].data.id});
        }
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
                    me.Xoa(data);
                }
            }
        });
    },
    onClone: function(){
        let m = this.getView();
        let me = this;
        let data = this.lookupReference('yearsCboBox').getValue();
        if(data == 'Tất cả'){
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Bạn cần phải chọn năm",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn muốn tạo mới ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Clone(data);
                }
            }
        });
    },
    Clone: function(data){
        let me = this.getView();
        me.setLoading("Đang tạo mới dữ liệu");
        let params = new Object();
        params.year = data;

        GSmartApp.Ajax.post('/api/v1/holiday/clone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Tạo mới thành công",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });

                    let store = me.getStore();
                    store.load();
                } else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Tạo mới thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
    },
    onDateFocus: function(dateField, event, eOpts){
        // show picker
        let picker = dateField.getPicker();
        picker.monthYearFormat = 'm-yy';
        dateField.expand();
    },
    onDateChange: function(dateField, newValue, oldValue, eOpts){
        // set date to data.day
        let view = this.getView();
        let viewModel = this.getViewModel();
        let data = viewModel.get('data');
        data.day = newValue;
        viewModel.set('isChanged', true);
        // console.log(oldValue);
        // console.log(newValue);
    },
    onDateToFocus: function(dateField, event, eOpts){
        // show picker
        let picker = dateField.getPicker();
        picker.monthYearFormat = 'm-yy';
        dateField.expand();
    },
    onDateToChange: function(dateField, newValue, oldValue, eOpts){
        // set date to data.day
        let view = this.getView();
        let viewModel = this.getViewModel();
        let data = viewModel.get('data');
        data.dayto = newValue;
        viewModel.set('isChanged', true);
        // console.log(oldValue);
        // console.log(newValue);
    },
    onCommentChange: function(textField, newValue, oldValue, eOpts ){
        let view = this.getView();
        let viewModel = this.getViewModel();
        let data = viewModel.get('data');
        data.comment = newValue;
        viewModel.set('isChanged', true);
        // console.log(oldValue);
        // console.log(newValue);
    },
    onFocusLeave: function(){
        // save to db
        let me = this.getView();
        let viewModel = this.getViewModel();

        if(!viewModel.get('isChanged')) return;
        else{
            let params = new Object();
            let data = viewModel.get('data');

            // console.log(data.day);
            // console.log(data.day.getTime());
            let time, timeto;
            if(data.day == null){
                time = data.dayto.getTime();
            }else{
                time = data.day.getTime();
            }
            if(data.dayto == null){
                timeto = data.day.getTime();
            }else{
                timeto = data.dayto.getTime();
            }
            params.data = data;
            params.time = time;
            params.timeto = timeto;
            ////////////////////////////////////////////

            params.msgtype = "HOLIDAY_CREATE";
            params.message = "Lưu ngày nghỉ lễ";

            GSmartApp.Ajax.post('/api/v1/holiday/save', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        let res = Ext.decode(response.responseText);
                        if (res.respcode == 200) {
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: 'Lưu thành công',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                            mainView = Ext.getCmp('HolidayView');
                            mainView.getStore().load();
                            mainView.getViewModel().getStore('HolidayYearStore').load();
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
    onItemClick: function(thisItem, record, item, index, e, eOpts){
        let view = this.getView();
        let viewModel = this.getViewModel();
        viewModel.set('data', record.data);
        viewModel.set('isChanged', false);
    },

    //////////////////////////////// SECOND

    // onPopupWindowClicked: function(){
    //     let window = Ext.create('Ext.window.Window', {
    //         title: 'Demo',
    //         width: '90%',
    //         height: 600,
    //         layout: 'fit',
    //         items: {  // Let's put an empty grid in just to illustrate fit layout
    //             xtype: 'ProductionLineBalance',
    //             border: false
    //         }
    //     });
    //     window.show();
    // }

})