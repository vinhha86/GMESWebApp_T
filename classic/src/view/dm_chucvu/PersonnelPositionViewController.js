Ext.define('GSmartApp.view.dm_chucvu.PersonnelPositionViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PersonnelPositionViewController',

    init: function (view) {
        var viewmodel = view.getViewModel();
        var personnel_position_store = viewmodel.getStore('personnel_position_store');
        personnel_position_store.loadStore();
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
        var Personnel_Position = new Object();
        Personnel_Position.name = viewmodel.get('personnelPos.name');
        Personnel_Position.name_en = viewmodel.get('personnelPos.name_en');
        Personnel_Position.code = viewmodel.get('personnelPos.code');
        Personnel_Position.id=null;
        params.data = Personnel_Position;
        var Personnel_Position_Name = viewmodel.get('personnelPos.name');
        var Personnel_Position_Code = viewmodel.get('personnelPos.code');
        
        if(!Personnel_Position_Name || !Personnel_Position_Name.trim() ||!Personnel_Position_Code ||!Personnel_Position_Code.trim()){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Tên chức vụ hoặc mã chức vụ không được để trống !",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
        }else {
            me.Them_DB(params);
        }
    },
    /**
     * Thêm vào DB 
     */
    Them_DB:function(params){
        var viewmodel = this.getViewModel();
        GSmartApp.Ajax.post('/api/v1/personnel_position/create', Ext.JSON.encode(params),
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
                    viewmodel.set('personnelPos.name', null);
                    viewmodel.set('personnelPos.name_en', null);
                    viewmodel.set('personnelPos.code', null);
                    //load
                    var personnel_position_store = viewmodel.getStore('personnel_position_store');
                    personnel_position_store.loadStore();
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

     /**
     * 
     *Sua
     */
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
        params.data = rec.data;

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa tên chức vụ  "' + rec.data.name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            //chọn button có
            fn: function (btn) {
                if (btn === 'yes') {

                    GSmartApp.Ajax.post('/api/v1/personnel_position/delete', Ext.JSON.encode(params),
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
                                var personnel_position_store = viewmodel.getStore('personnel_position_store');
                                personnel_position_store.loadStore();
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
     onPersonnel_Position_NameFilter: function(){
        var filterField=this.lookupReference('Personnel_Position_NameFilter');
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
    onPersonnel_Position_NameEnFilter: function(){
        var filterField=this.lookupReference('Personnel_Position_NameEnFilter');
        filters=this.getView().store.getFilters();

        if(filterField.value){
            this.name_enFilter=filters.add({
                id:'name_enFilter',
                property:'name_en',
                value:filterField.value,
                anyMatch:true,
                caseSensitive:false
            });
        }else if(this.name_enFilter){
            filters.remove(this.name_enFilter);
            this.name_enFilter = null;
        }
    },
    onPersonnel_Position_CodeFilter: function(){
        var filterField=this.lookupReference('Personnel_Position_CodeFilter');
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
    }
})