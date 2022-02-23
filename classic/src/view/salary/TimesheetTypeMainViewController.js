Ext.define('GSmartApp.view.salary.TimesheetShiftTypeMainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimesheetShiftTypeMainViewController',

    init:function(view){
        
    },
    control:{
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
    },

    onloadAfter:function(is_ca_an){
        var viewmodel = this.getViewModel();
        var orgid_link = viewmodel.get('selected_orgid');
        var TimesheetShiftTypeStore = viewmodel.getStore('TimesheetShiftTypeOrgStore');
        TimesheetShiftTypeStore.loadStorebyOrgid_link(orgid_link, is_ca_an);
    },
    onCapNhat:function(grid, rowIndex, colIndex){
        var viewmodel = this.getViewModel();
        var orgid_link = viewmodel.get('selected_orgid');
        var rec = grid.getStore().getAt(rowIndex);
        this.itemDetail(rec.data,orgid_link);
    },
   
    itemDetail: function(data,orgid_link){
        console.log(data);
        var me =this;
        var id = data.id;
        var name = data.name;
        var datefrom = data.datefrom;
        var dateto = data.dateto;
        var checkboxfrom = data.checkboxfrom;
        var checkboxto = data.checkboxto;
        var timesheet_shift_type_id_link = data.timesheet_shift_type_id_link;
        var is_ca_an = data.is_ca_an

        var title = '';
        if(is_ca_an){
            title = 'Thông tin ca ăn';
        }else{
            title = 'Thông tin ca làm việc';
        }

        var viewmodel = this.getViewModel();
        //var me = this.getView();
        var form = Ext.create('Ext.window.Window', {
            height: 230,
            width: 400,
            closable: true,
            title: title,
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
                xtype: 'TimesheetShiftTypeAddView',
                viewModel: {
                    type: 'Salary_MainView_Model',
                    data:{
                        TimeShift:{
                            name:name,
                            timesheet_shift_type_id_link:timesheet_shift_type_id_link
                        },
                            id:id,
                            timefrom: datefrom,
                            timeto: dateto,
                            checkboxfrom: checkboxfrom,
                            checkboxto: checkboxto,
                            orgid_link:orgid_link,
                            is_ca_an: is_ca_an,
                    }
                },
            }]
        });
        form.show();
        form.down('#TimesheetShiftTypeAddView').on("updatethanhcong", function () {
            console.log('tat')
            form.close();
           //load lai
           me.onloadAfter(is_ca_an);
        })
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        var params = new Object();
        params.id = rec.data.id;
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
        var me = this.getView();
        GSmartApp.Ajax.post('/api/v1/timesheetshifttypeorg/delete', Ext.JSON.encode(params),
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

                    var store = me.getStore();
                    store.load();
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
    
    onThemMoi:function(){
        var viewmodel = this.getViewModel();
        var orgid_link = viewmodel.get('selected_orgid');
        this.Showinfo(null,orgid_link);
    },
    Showinfo:function(rec,orgid_link){
        var me =this;
      
        var form = Ext.create('Ext.window.Window', {
            height: 230,
            width: 400,
            closable: true,
            title: rec == null ? 'Thêm mới ca làm việc' : 'Cập nhật ca mới làm việc',
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
                xtype: 'TimesheetShiftTypeAddView',
                viewModel: {
                    type: 'Salary_MainView_Model',
                    
                    data:{
                        Tid: 0,
                        name: null,
                        timefrom: null,
                        timeto: null,
                        checkboxfrom: -1,
                        checkboxto: -1,
                        orgid_link:orgid_link,
                        is_ca_an: false
                        } 
                },
            }]
        });
        form.show();
        form.down('#TimesheetShiftTypeAddView').on("thanhcong", function () {
            form.close();
            //load lai
            me.onloadAfter(false);
        })
    },
})