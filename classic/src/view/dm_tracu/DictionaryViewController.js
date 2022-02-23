Ext.define('GSmartApp.view.dm_tracuu.DictionaryViewController',{
    extend:'Ext.app.ViewController',
    alias:'controller.DictionaryViewController',
    
    init:function(view){
        var viewmodel = view.getViewModel();
        var DictionaryType_Store= viewmodel.getStore('DictionaryType_Store');
        DictionaryType_Store.loadStore();

        var Dictionary_Store= viewmodel.getStore('Dictionary_Store');
        Dictionary_Store.loadStore();
    },
    control:{
        '#onThemMoi':{
            click:'ThemMoi'
        },
    },

    ThemMoi:function(){
        var me =this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        var Dictionary = new Object();
        Dictionary.question = viewmodel.get('dictionary.question');
        Dictionary.answer = viewmodel.get('dictionary.answer');
        Dictionary.dictionary_typeid_link=viewmodel.get('dictionary.dictionary_typeid_link');
        Dictionary.id=null;

        params.data = Dictionary

        Dictionary_Question = viewmodel.get('dictionary.question');
        Dictionary_Answer = viewmodel.get('dictionary.answer');
        Dictionary_Type = viewmodel.get('dictionary.dictionary_typeid_link');
        
        if(!Dictionary_Question || !Dictionary_Question.trim() || !Dictionary_Answer ||!Dictionary_Answer.trim() || !Dictionary_Type ){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Phải điền đấy đủ thông tin không được để trống !",
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

        GSmartApp.Ajax.post('/api/v1/dictionary/create', Ext.JSON.encode(params),
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
                    viewmodel.set('dictionary.question', null);
                    viewmodel.set('dictionary.answer', null);
                    viewmodel.set('dictionary.dictionary_typeid_link', null);
                    //load
                    var Dictionary_Store= viewmodel.getStore('Dictionary_Store');
                    Dictionary_Store.loadStore();
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
     * Xoa
     */
    onEdit: function (editor, context, e) {
        var me = this;
        var params = new Object();
        params.data = context.record.data;
   //kiểm tra nếu dữ liệu khác lúc ban đầu thì thêm
   if (context.value != context.originalValue  ) {
    //kiểm tra xem sửa ở trường nào để gán lại
    if (context.field == "question") {
        params.data.question = context.value;       
    } else {
        if (context.field == "answer") params.data.answer = context.value;
    }
    if(context.field== "name"){
        params.data.dictionary_typeid_link=context.record.data.name;
    }
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
            msg: 'Bạn có chắc chắn xóa câu hỏi  "' + rec.data.question + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
        //    chọn button có
            fn: function (btn) {
                if (btn === 'yes') {
                    GSmartApp.Ajax.post('/api/v1/dictionary/delete', Ext.JSON.encode(params),
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
                                var Dictionary_Store= viewmodel.getStore('Dictionary_Store');
                                Dictionary_Store.loadStore();
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
     * Loc - filter
     */
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
    },
    onquestionFilter: function(){
        var filterField=this.lookupReference('questionFilter');
        filters=this.getView().store.getFilters();

        if(filterField.value){
            this.nameFilter=filters.add({
                id:'questionFilter',
                property:'question',
                value:filterField.value,
                anyMatch:true,
                caseSensitive:false
            });
        }else if(this.nameFilter){
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    },
    onanswerFilter: function(){
        var filterField=this.lookupReference('answerFilter');
        filters=this.getView().store.getFilters();

        if(filterField.value){
            this.nameFilter=filters.add({
                id:'answerFilter',
                property:'answer',
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