Ext.define('GSmartApp.view.dm_loainhanvien.PersonnelTypeViewController',{
    extend:'Ext.app.ViewController',
    alias:'controller.PersonnelTypeViewController',

    init: function(view){
        var viewmodel = view.getViewModel();
        var device_typeStore = viewmodel.getStore('Personnel_Type');
        device_typeStore.loadStore();
    },
    control:{
        '#btnThemMoi':{
            click:'ThemMoi'
        }
    },
    ThemMoi:function(){
        var me =this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        var PersonnelType = new Object();
        PersonnelType.name = viewmodel.get('personnel_type.name');
        PersonnelType.id=null;
        params.data = PersonnelType;
        var personnel_type_name = viewmodel.get('personnel_type.name');
        
        if(!personnel_type_name || !personnel_type_name.trim() ){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Tên loại nhân viên không được để trống !",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },

            });
           
        }else{
            me.Them_DB(params);
        }
    },
    Them_DB:function(params){
        var viewmodel = this.getViewModel();
        GSmartApp.Ajax.post('/api/v1/personnel_type/create', Ext.JSON.encode(params),
        function (success, response, options) {
            if (success) {
                var response = Ext.decode(response.responseText);
                if (response.respcode == 200) {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Thêm thành công",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        },
                    })
                    viewmodel.set('personnel_type.name', null);
                    //load
                    var device_typeStore = viewmodel.getStore('Personnel_Type');
                    device_typeStore.loadStore();
                }
            } else {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Thêm thất bại",
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
            me.Them_DB(params);
        }
    },
    onXoa: function (grid, rowIndex) {
        var viewmodel = this.getViewModel();
        console.log(rec);
        var rec = grid.getStore().getAt(rowIndex);
        var params = new Object();
        params.data = rec.data;

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa tên loại nhân viên  "' + rec.data.name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            //chọn button có
            fn: function (btn) {
                if (btn === 'yes') {

                    GSmartApp.Ajax.post('/api/v1/personnel_type/delete', Ext.JSON.encode(params),
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

                                //load lại trang
                                var device_typeStore = viewmodel.getStore('Personnel_Type');
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
    onpersonnel_typeFilter: function(){
        var filterField=this.lookupReference('personnel_typeFilter');
        filters=this.getView().store.getFilters();

        if(filterField.value){
            this.nameFilter=filters.add({
                id:'nameFilter',
                property:'name',
                value:filterField.value,
                anyMatch:true,
                caseSensitive:false
            });
        }else if(this.nameFilter){
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    }
})