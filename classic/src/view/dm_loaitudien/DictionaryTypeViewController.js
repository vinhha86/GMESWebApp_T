Ext.define('GSmartApp.view.dm_loaitudien.DictionaryTypeViewController',{
    extend:'Ext.app.ViewController',
    alias:'controller.DictionaryTypeViewController',
    
    init:function(view){
        var viewmodel = view.getViewModel();
        var DictionaryType_Store= viewmodel.getStore('DictionaryType_Store');
        DictionaryType_Store.loadStore();
    },
    control:{
        '#onThemMoi':{
            click:'ThemMoi'
        }
    },
    ThemMoi:function(){
        var me =this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        var DictionaryType = new Object();
        DictionaryType.name = viewmodel.get('dictionary.name');
        DictionaryType.id=null;

        params.data = DictionaryType

        DictionaryType_Name = viewmodel.get('dictionary.name');
        
        if(!DictionaryType_Name || !DictionaryType_Name.trim() ){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Tên loại từ điển không được để trống !",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },

            });
           
        }else{
            me.Them_DB(params);
        }
    },

    /**
     * Thêm vào DB
     * @param {*} params 
     */
    Them_DB:function(params){
        var viewmodel = this.getViewModel();

        GSmartApp.Ajax.post('/api/v1/dictionary_type/create', Ext.JSON.encode(params),
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
                    viewmodel.set('dictionary.name', null);
                    //load
                    var DictionaryType_Store= viewmodel.getStore('DictionaryType_Store');
                     DictionaryType_Store.loadStore();
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
     * sửa
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
     * Xóa
     */
     onXoa: function (grid, rowIndex) {
        var viewmodel = this.getViewModel();
        var rec = grid.getStore().getAt(rowIndex);
        var params = new Object();
        params.data = rec.data;

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa tên loại từ điển  "' + rec.data.name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            //chọn button có
            fn: function (btn) {
                if (btn === 'yes') {

                    GSmartApp.Ajax.post('/api/v1/dictionary_type/delete', Ext.JSON.encode(params),
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
                                var DictionaryType_Store= viewmodel.getStore('DictionaryType_Store');
                                DictionaryType_Store.loadStore();
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

    ondictionary_typeFilter: function(){
        var filterField=this.lookupReference('dictionary_typeFilter');
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