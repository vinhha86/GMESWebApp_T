Ext.define('GSmartApp.view.dm_donvi.OrgTypeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.OrgTypeViewController',

    init: function (view) {
        var viewmodel = view.getViewModel();
        var orgtype_Store = viewmodel.getStore('orgtype_store');
        orgtype_Store.loadStore();
    },
    control: {
        '#btnThemMoi': {
            click: 'ThemMoi',
        }
    },

    ThemMoi:function(){
        var me =this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        var OrgType = new Object();
        OrgType.name = viewmodel.get('org.name');
        OrgType.name_en = viewmodel.get('org.name_en');
        OrgType.id=null;
        params.data = OrgType;
        var org_type_name = viewmodel.get('org.name');
        
        if(!org_type_name || !org_type_name.trim() ){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Tên loại đơn vị không được để trống !",
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
        GSmartApp.Ajax.post('/api/v1/orgtype/create', Ext.JSON.encode(params),
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
                    viewmodel.set('org.name', null);
                    viewmodel.set('org.name_en', null);
                    //load
                    var orgtype_Store = viewmodel.getStore('orgtype_store');
                    orgtype_Store.loadStore();
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
            msg: 'Bạn có chắc chắn xóa tên loại đơn vị  "' + rec.data.name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            //chọn button có
            fn: function (btn) {
                if (btn === 'yes') {

                    GSmartApp.Ajax.post('/api/v1/orgtype/delete', Ext.JSON.encode(params),
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
                                var orgtype_Store = viewmodel.getStore('orgtype_store');
                                orgtype_Store.loadStore();
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
     onOrgTypeNameFilter: function(){
        var filterField=this.lookupReference('OrgTypeNameFilter');
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
    onOrgTypeName_enFilter: function(){
        var filterField=this.lookupReference('OrgTypeName_enFilter');
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
    }

})