Ext.define('GSmartApp.view.dm_capbac.CapBacViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CapBacViewController',

    init:function(view){
        console.log('vao day')
        var viewmodel = view.getViewModel();
        var LaborlevelStore = viewmodel.getStore('LaborlevelStore');
        LaborlevelStore.loadStore();
    },
    control: {
        '#btnThemMoi': {
            click: 'ThemMoi',
        }
    },
     /**
     * Thêm mới
     */
      ThemMoi:function(){
        var me =this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        var Laborlevel = new Object();
        Laborlevel.name = viewmodel.get('laborlevel.name');
        Laborlevel.comment = viewmodel.get('laborlevel.comment');
        Laborlevel.code = viewmodel.get('laborlevel.code');
        Laborlevel.rate = viewmodel.get('laborlevel.rate');
        Laborlevel.id=null;
        params.data = Laborlevel;
        var Laborlevel_Name = viewmodel.get('laborlevel.name');
        var Laborlevel_Code = viewmodel.get('laborlevel.code');
        
        if(!Laborlevel_Name || !Laborlevel_Name.trim() ||!Laborlevel_Code ||!Laborlevel_Code.trim()){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Tên cấp bậc hoặc mã cấp bậc không được để trống !",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
        }else {
            console.log(params);
            me.Them_DB(params);
        }
    },
     /**
     * Thêm vào DB 
     */
      Them_DB:function(params){
        var viewmodel = this.getViewModel();
        GSmartApp.Ajax.post('/api/v1/laborlevel/createLaborLevel', Ext.JSON.encode(params),
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
                    viewmodel.set('laborlevel.name', null);
                    viewmodel.set('laborlevel.comment', null);
                    viewmodel.set('laborlevel.code', null);
                    viewmodel.set('laborlevel.rate', null);
                    //load
                    var LaborlevelStore = viewmodel.getStore('LaborlevelStore');
                    LaborlevelStore.loadStore();
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
     /**
     * xoa
     */
      onXoa: function (grid, rowIndex) {
        var viewmodel = this.getViewModel();
        console.log(rec);
        var rec = grid.getStore().getAt(rowIndex);
        var params = new Object();
        params.id = rec.data.id;
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa tên cấp bậc  "' + rec.data.name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            //chọn button có
            fn: function (btn) {
                if (btn === 'yes') {

                    GSmartApp.Ajax.post('/api/v1/laborlevel/deleteLaborLevel', Ext.JSON.encode(params),
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
                                var LaborlevelStore = viewmodel.getStore('LaborlevelStore');
                                LaborlevelStore.loadStore();
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
    /**
     * filter
     */
     onPersonnel_Level_NameFilter: function(){
        var filterField=this.lookupReference('Personnel_Level_NameFilter');
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
    },
    onPersonnel_Level_CodeFilter: function(){
        var filterField=this.lookupReference('Personnel_Level_CodeFilter');
        filters=this.getView().store.getFilters();

        if(filterField.value){
            this.codeFilter=filters.add({
                id:'codeFilter',
                property:'code',
                value:filterField.value,
                anyMatch:true,
                caseSensitive:false
            });
        }else if(this.codeFilter){
            filters.remove(this.codeFilter);
            this.codeFilter = null;
        }
    },
})