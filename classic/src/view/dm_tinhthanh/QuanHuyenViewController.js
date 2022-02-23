Ext.define('GSmartApp.view.dm_tinhthanh.QuanHuyenViewController',{
    extend:'Ext.app.ViewController',
    alias:'controller.QuanHuyenViewController',

    init: function(view){
      
    },
    control:{
        '#onThem':{
            click:'ThemHuyen'
        },
        '#QuanHuyenView':{
            itemclick:'ChonQuanHuyen'
        }
    },
    ChonQuanHuyen:function(m,record){
        var viewmodel = this.getViewModel();
        viewmodel.set('Huyen.title',record.data.name);
        viewmodel.set('Huyen.id',record.data.id);
       
        //load xa phuong
        var xa_store = viewmodel.getStore('org_xa_store');
        var huyen_id = record.data.id;
        var xa_type_code = 27;
        xa_store.getbyParentandType(huyen_id,xa_type_code);
    
    },
    ThemHuyen: function(){
        var me = this;
        var viewmodel = this.getViewModel();
        //kiểm tra chọn tỉnh thành
        if(viewmodel.get('Tinh.id') == null){
            Ext.MessageBox.show({
                title:'Thông báo',
                msg:'Bạn chưa chọn tỉnh thành !',
                buttons:Ext.MessageBox.YES,
                buttonText:{
                    yes:'Đóng'
                }
            });
            return ;
        }
        
        var viewmodel = this.getViewModel();
        var Huyen = new Object();
        var params = new Object();
        Huyen.name= viewmodel.get('Huyen.name');
        Huyen.code = viewmodel.get('Huyen.code');
        Huyen.status = 1;
        Huyen.is_manufacturer = 0;
        Huyen.parentid_link =viewmodel.get('Tinh.id');
        Huyen.orgtypeid_link=26;

        params.data = Huyen;
        if(Huyen.name == null ||Huyen.name.trim() == ''||Huyen.code == null||Huyen.code.trim() == ''){
            viewmodel.set('Huyen.name', null);
            viewmodel.set('Huyen.code', null);

            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Phải điền đấy đủ thông tin huyện!",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            })
        }else{
            //kiểm tra huyện đã tồn tại chưa nếu đúng thì được thêm 
            var kt = me.Check_Validate( Huyen.code,"");
            if (kt) {
                this.Them_DB(params);
            }
        }
    },
    //kiểm tra mã huyện bị đã tồn tại chưa nếu có rồi thì trả về false
    Check_Validate: function (code,id) {
        var viewmodel = this.getViewModel();
        var store = this.getViewModel().getStore('org_huyen_store');
    
        for (var i = 0; i < store.data.length; i++) {
            var data = store.data.items[i].data;
            //kiểm tra mã tỉnh không chứ id truyền vào
            if (data.code == code && data.id!=id) {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Mã huyện :" + code + " đã tồn tại ở dòng " + (i + 1),
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                
                //load quan huyen
                var huyen_store = viewmodel.getStore('org_huyen_store');
                var tinh_id = viewmodel.get('Tinh.id');
                var huyen_type_code = 26;
                huyen_store.getbyParentandType(tinh_id,huyen_type_code);

                return false;
            }
        }
        return true;
    },
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
                    viewmodel.set('Huyen.name',null);
                    viewmodel.set('Huyen.code',null);
                    //load quan huyen
                    var huyen_store = viewmodel.getStore('org_huyen_store');
                    var tinh_id = viewmodel.get('Tinh.id');
                    var huyen_type_code = 26;
                    huyen_store.getbyParentandType(tinh_id,huyen_type_code);
       
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
        var Huyen = new Object();
        var params = new Object();
        Huyen.name=context.record.data.name;
        Huyen.code = context.record.data.code;
        Huyen.status = 1;
        Huyen.is_manufacturer = 0;
        Huyen.parentid_link =viewmodel.get('Tinh.id');
        Huyen.orgtypeid_link=26;
        Huyen.id=context.record.data.id;

        params.data = Huyen;
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
                    //gán giá sang title
                    me.ChonQuanHuyen("",params);
                 }
            }
    },
    //xóa
    onXoa: function (grid, rowIndex) {
        var viewmodel = this.getViewModel();
        var params = new Object();
        var rec = grid.getStore().getAt(rowIndex);

        //kiểm tra có tồn tại xã trong huyện không?
     
        var params = new Object();
        params.parentid_link=grid.getStore().getAt(rowIndex).id;
        params.listtype=27;
        GSmartApp.Ajax.post('/api/v1/org/getchilbytype', Ext.JSON.encode(params),
        function (success, response, options) {
            if (success) {
                var response = Ext.decode(response.responseText)
                if (response.data.length != 0) {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Đang có dữ liệu xã không được xóa",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        },
                    })
                    return ;
                }
            } 
        }
        )

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
                                   //load quan huyen
                                    var huyen_store = viewmodel.getStore('org_huyen_store');
                                    var tinh_id = viewmodel.get('Tinh.id');
                                    var huyen_type_code = 26;
                                    huyen_store.getbyParentandType(tinh_id,huyen_type_code);
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
    onTenHuyen_filter:function(){
        var filterField = this.lookupReference('TenHuyen_filter');
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
    onMaHuyen_filter:function(){
        filterField = this.lookupReference('MaHuyen_filter');
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