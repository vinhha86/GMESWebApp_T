Ext.define('GSmartApp.view.dm_tinhthanh.TinhViewController',{
    extend:'Ext.app.ViewController',
    alias:'controller.TinhViewController',

    init: function(view){
      
    },
    control:{
        '#Them':{
            click:'ThemTinh',
        },
        '#TinhView':{
            itemclick:'ChonTinh'
        }
    },

    ChonTinh: function(m,record){
        var viewmodel = this.getViewModel();

        if(viewmodel.get('old') != record.data.id ){
        //load xa phuong
        var xa_store = viewmodel.getStore('org_xa_store');
        xa_store.removeAll();
        }
      
        viewmodel.set('Tinh.title',record.data.name);
        viewmodel.set('Tinh.id',record.data.id);
        viewmodel.set('Huyen.id',null)
        viewmodel.set('old',record.data.id)

        //load quan huyen
        var huyen_store = viewmodel.getStore('org_huyen_store');
        var tinh_id = record.data.id;
        var huyen_type_code = 26;
        huyen_store.getbyParentandType(tinh_id,huyen_type_code);
    
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
                    viewmodel.set('Tinh.name',null);
                    viewmodel.set('Tinh.code',null);
                    //load tỉnh
                    var tinh_store = viewmodel.getStore('org_tinh_store');
                    var tinh_type_code = 25;
                    tinh_store.GetOrg_By_type(tinh_type_code);

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

    onXoa: function (grid, rowIndex) {
        var viewmodel = this.getViewModel();

        //kiểm tra xem tỉnh đấy đã có huyện chưa?
        var params = new Object();
        params.parentid_link=grid.getStore().getAt(rowIndex).id;
        params.listtype=26;
        GSmartApp.Ajax.post('/api/v1/org/getchilbytype', Ext.JSON.encode(params),
        function (success, response, options) {
            if (success) {
                var response = Ext.decode(response.responseText)
                if (response.data.length != 0) {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Đang có dữ liệu huyện không được xóa",
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

        var params = new Object();
        var rec = grid.getStore().getAt(rowIndex);
        console.log(rec);
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
                                    //load laij
                                    var tinh_store = viewmodel.getStore('org_tinh_store');
                                    var tinh_type_code = 25;
                                    tinh_store.GetOrg_By_type(tinh_type_code);
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
    //kiểm tra mã tỉnh bị đã tồn tại chưa nếu có rồi thì trả về false
    Check_Validate: function (code,id) {
        var store = this.getViewModel().getStore('org_tinh_store');
        
        for (var i = 0; i < store.data.length; i++) {
            var data = store.data.items[i].data;
            //kiểm tra mã tỉnh không chứ id truyền vào
            if (data.code == code && data.id!=id) {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Mã tỉnh :" + code + " đã tồn tại ở dòng " + (i + 1),
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                //load lại
                var viewmodel = this.getViewModel();
                var tinh_store = viewmodel.getStore('org_tinh_store');
                var tinh_type_code = 25;
                tinh_store.GetOrg_By_type(tinh_type_code);

                return false;
            }
        }
        return true;
    },
    //kiểm tra nhập đầy đủ thông tin
    ThemTinh: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        var Tinh = new Object();
        var params = new Object();
        Tinh.name= viewmodel.get('Tinh.name');
        Tinh.code = viewmodel.get('Tinh.code');
        Tinh.status = 1;
        Tinh.is_manufacturer = 0;
        Tinh.parentid_link =null;
        Tinh.orgtypeid_link=25;

        params.data = Tinh;
     

        if (Tinh.name == null ||Tinh.name.trim() == ''||Tinh.code == null||Tinh.code.trim() == '') {
            viewmodel.set('Tinh.name', null);
            viewmodel.set('Tinh.code', null);
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Phải điền đấy đủ thông tin tỉnh",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },

            })
        } else {
            //kiểm tra tỉnh đã tồn tại chưa nếu đúng thì được thêm 
            var kt = me.Check_Validate( Tinh.code,"");
            if (kt) {
                this.Them_DB(params);
            }

        }
    },
    onEdit: function(editor, context, e){
        var me = this;
        var viewmodel = me.getViewModel();
        var Tinh = new Object();
        var params = new Object();
        Tinh.name=context.record.data.name;
        Tinh.code = context.record.data.code;
        Tinh.status = 1;
        Tinh.is_manufacturer = 0;
        Tinh.parentid_link =null;
        Tinh.orgtypeid_link=25;
        Tinh.id=context.record.data.id;

        params.data = Tinh;
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
                     me.ChonTinh("",params);
                 }
            }
    },
    //filter - lọc
    onTenTinh_filter:function(){
        var filterField = this.lookupReference('TenTinh_filter');
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
    onMaTinh_filter:function(){
        filterField = this.lookupReference('MaTinh_filter');
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