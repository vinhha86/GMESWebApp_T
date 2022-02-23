Ext.define('GSmartApp.view.devices.ThietBiChiTietViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.ThietBiChiTietViewController',

  init: function (view) {

  },
  control: {
    '#Luu': {
      click: 'btnLuuTB'
    },
    '#ThemMoi': {
      click: 'btnThemMoi'
    }
  },
  btnThemMoi: function () {

    var viewmodel = this.getViewModel();
    viewmodel.set('thongtin_chitiet.code', null);
    viewmodel.set('thongtin_chitiet.name', null);
    viewmodel.set('thongtin_chitiet.type', null);
    viewmodel.set('thongtin_chitiet.id', null);
    viewmodel.set('thongtin_chitiet.org_governid_link', null);
    viewmodel.set('thongtin_chitiet.status', null);
  },
  btnLuuTB: function () {
    var me =this;
    var viewmodel = this.getViewModel();

    var params = new Object();
    var ThietBi = new Object();
    ThietBi.code = viewmodel.get('thongtin_chitiet.code');
    ThietBi.name = viewmodel.get('thongtin_chitiet.name');
    ThietBi.type = viewmodel.get('thongtin_chitiet.type');
    ThietBi.org_governid_link = viewmodel.get('thongtin_chitiet.org_governid_link');
    ThietBi.id = viewmodel.get('thongtin_chitiet.id');
    if (viewmodel.get('thongtin_chitiet.status') == null || viewmodel.get('thongtin_chitiet.status') == ""){
      ThietBi.status = 0 ;
    }else{
      ThietBi.status = viewmodel.get('thongtin_chitiet.status');
    }
   
    //kiểm tra tên thiết bị đã tồn tại chưa nếu đúng thì được thêm 
    var kt = me.CheckValidate(ThietBi.code,ThietBi.id);
    if (kt) {
     // var ArrayThietBi = [];
      //ArrayThietBi.push(ThietBi)
      params.data = ThietBi;
     
      GSmartApp.Ajax.postJitin('/api/v1/device/device_create', Ext.JSON.encode(params),
        function (success, response, options) {
          if (success) {
            var response = Ext.decode(response.responseText);
            if (response.respcode == 200) {
              Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Lưu thành công',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                  yes: 'Đóng',
                }
              });
              //load lai 
              viewmodel.set('thongtin_chitiet.id',response.id);
              //gán code cũ thành code vừa lưu thành công
              viewmodel.set('code_old',viewmodel.get('thongtin_chitiet.code'))
              var ds_thietbi_tore = viewmodel.getStore('ds_thietbi_store');

              //giữ giá trị hiển thị vừa tìm kiếm sau khi sửa 
              var params = new Object();
             params.org_governid_link = viewmodel.get('timkiem.org_governid_link') == "" ? null : viewmodel.get('timkiem.org_governid_link');
             params.search = viewmodel.get('timkiem.name_code') == "" ? null : viewmodel.get('timkiem.name_code');
             params.type=viewmodel.get('timkiem.type');
              ds_thietbi_tore.load_device_active(params);
            }
  
          } else {
            Ext.Msg.show({
              title: 'Thông báo',
              msg: 'Lưu thất bại',
              buttons: Ext.MessageBox.YES,
              buttonText: {
                yes: 'Đóng',
              }
            });
          }
        })
  }
  },
  //kiểm tra mã thiết bị đã tồn tại chưa ?nếu có rồi thì trả về false
  CheckValidate: function (code, id) {
    var viewmodel = this.getViewModel();
    var store = this.getViewModel().getStore('ds_thietbi_store');
    //
    for (var i = 0; i < store.data.length; i++) {
      var data = store.data.items[i].data;
      //kiểm tra mã thiết bị không chứ id truyền vào
      if (data.code == code && data.id != id) {
        Ext.MessageBox.show({
          title: "Thông báo",
          msg: "Mã thiết bị :" + code + " đã tồn tại ở số thứ :" + (i + 1),
          buttons: Ext.MessageBox.YES,
          buttonText: {
            yes: 'Đóng',
          }
        });
        viewmodel.set('thongtin_chitiet.code',viewmodel.get('code_old'))
        return false;
      }
    }
    return true;
  },
})