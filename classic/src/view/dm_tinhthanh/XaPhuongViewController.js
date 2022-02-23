Ext.define('GSmartApp.view.dm_tinhthanh.XaPhuongViewController',{
    extend:'Ext.app.ViewController',
    alias:'controller.XaPhuongViewController',

    init: function(view){
      
    },
    control:{
        '#onThem':{
            click : 'ThemXa'
        }
    },
    ThemXa:function(){
        var me = this;
        var viewmodel = this.getViewModel();
        //kiểm tra chọn tỉnh thành
        if(viewmodel.get('Huyen.id') == null){
            Ext.MessageBox.show({
                title:'Thông báo',
                msg:'Bạn chưa chọn quận huyện !',
                buttons:Ext.MessageBox.YES,
                buttonText:{
                    yes:'Đóng'
                }
            });
            return ;
        }

        var viewmodel = this.getViewModel();
        var Xa = new Object();
        var params = new Object();
        Xa.name= viewmodel.get('Xa.name');
        Xa.code = viewmodel.get('Xa.code');
        Xa.status = 1;
        Xa.is_manufacturer = 0;
        Xa.parentid_link =viewmodel.get('Huyen.id');
        Xa.orgtypeid_link=27;

        params.data = Xa;
        if(Xa.name == null ||Xa.name.trim() == ''||Xa.code == null||Xa.code.trim() == ''){
            viewmodel.set('Xa.name', null);
            viewmodel.set('Xa.code', null);

            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Phải điền đấy đủ thông tin xã phường!",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            })
        }else{
            //kiểm tra xã đã tồn tại chưa nếu đúng thì được thêm 
            var kt = me.Check_Validate( Xa.code,"");
            if (kt) {
                this.Them_DB(params);
            }
        }
    },
    //kiểm tra mã xã bị đã tồn tại chưa nếu có rồi thì trả về false
    Check_Validate: function (code,id) {
        var viewmodel = this.getViewModel();
        var store = this.getViewModel().getStore('org_xa_store');
    
        for (var i = 0; i < store.data.length; i++) {
            var data = store.data.items[i].data;
            //kiểm tra mã tỉnh không chứ id truyền vào
            if (data.code == code && data.id!=id) {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Mã xã :" + code + " đã tồn tại ở dòng " + (i + 1),
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                
                //load xã
                var xa_store = viewmodel.getStore('org_xa_store');
                var huyen_id = viewmodel.get('Huyen.id');
                var xa_type_code = 27;
                xa_store.getbyParentandType(huyen_id,xa_type_code);

                return false;
            }
        }
        return true;
    },

    //thêm vào DB
    Them_DB: function(params){
        var viewmodel = this.getViewModel();
        GSmartApp.Ajax.post('/api/v1/org/create', Ext.JSON.encode(params),
        function (success, response,options){
            if(success){
                var response=Ext.decode(response.responseText);
                if (response.respcode == 200){
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Thêm thành công",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        },

                    });
                    viewmodel.set('Xa.name',null);
                    viewmodel.set('Xa.code',null);
                    //load xã
                    var xa_store = viewmodel.getStore('org_xa_store');
                    var huyen_id = viewmodel.get('Huyen.id');
                    var xa_type_code = 27;
                    xa_store.getbyParentandType(huyen_id,xa_type_code);
       
                }
            }
            else{
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Thêm thất bại",
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    },

                })
            }
        }
        )
    },
    //sửa
    onEdit: function(editor, context, e){
        var me = this;
        var viewmodel = this.getViewModel();
        var Xa = new Object();
        var params = new Object();
        Xa.name=context.record.data.name;
        Xa.code = context.record.data.code;
        Xa.status = 1;
        Xa.is_manufacturer = 0;
        Xa.parentid_link =viewmodel.get('Huyen.id');
        Xa.orgtypeid_link=27;
        Xa.id=context.record.data.id;

        params.data = Xa;
              //kiểm tra nếu dữ liệu khác lúc ban đầu thì thêm
            if (context.value != context.originalValue  ) {
                //kiểm tra xem sửa ở trường nào để gán lại
                if (context.field == "code") {
                    params.data.code = context.value;       
                } else {
                    if (context.field == "name") params.data.name = context.value;
                }
                 //kiểm tra nếu trùng thì không được sửa 
                 var kt = me.Check_Validate(context.value,context.record.data.id);
                 if (kt) {
                    me.Them_DB(params);
                 }
            }
    },
    //xóa
    onXoa: function (grid, rowIndex) {
        var viewmodel = this.getViewModel();
        var params = new Object();
        var rec = grid.getStore().getAt(rowIndex);

        params.id = rec.id;
        Ext.MessageBox.show({
            title: 'Thông báo',
            msg: 'Bạn có muốn xóa không? ',
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    //  gọi api xóa
                    GSmartApp.Ajax.post('/api/v1/org/delete', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                var response = Ext.decode(response.responseText)
                                if (response.respcode == 200) {
                                    Ext.MessageBox.show({
                                        title: "Thông báo",
                                        msg: "Xóa thành công",
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng',
                                        },
                                    })
                                    //load xã
                                    var xa_store = viewmodel.getStore('org_xa_store');
                                    var huyen_id = viewmodel.get('Huyen.id');
                                    var xa_type_code = 27;
                                    xa_store.getbyParentandType(huyen_id,xa_type_code);
                                }
                            } else {
                                Ext.MessageBox.show({
                                    title: "Thông báo",
                                    msg: "Xóa thất bại",
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    },
                                })
                            }
                        }
                    )
                }
            }
        })
    },

    //filter - lọc
    onTenXa_filter:function(){
        var filterField = this.lookupReference('TenXa_filter');
        filters=this.getView().store.getFilters();
        if(filterField.value){
            this.nameFilter = filters.add({
                id:'nameFilter',
                property: 'name',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            })
        }
        else if (this.nameFilter) {
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    },
    onMaXa_filter:function(){
        filterField = this.lookupReference('MaXa_filter');
        filters = this.getView().store.getFilters();
        if(filterField.value){
            this.codeFilter = filters.add({
                id:'codeFilter',
                property:'code',
                value: filterField.value,
                anyMatch:true,
                caseSensitive:false
            });
        }else if(this.codeFilter){
            filters.remove(this.codeFilter);
            this.codeFilter=null;
        }
    }
})