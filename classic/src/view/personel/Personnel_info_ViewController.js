Ext.define('GSmartApp.view.personel.Personnel_info_ViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.Personnel_info_ViewController',
  init: function () {
    var viewmodel = this.getViewModel();
    viewmodel.set('person.countryid_link', "Việt Nam");
    var TypeStore = viewmodel.getStore('PersonnelTypeStore');
    TypeStore.loadStore();

    var OrgManagerStore = viewmodel.getStore('OrgManagerStore');
    var listid = '1,13';
    OrgManagerStore.loadStore(13,false);

    var OrgCountryStore = viewmodel.getStore('OrgCountryStore');
    OrgCountryStore.loadStore(24, false);
    //store chức vụ
    var Personnel_Position_Store = viewmodel.getStore('Personnel_Position_Store');
    Personnel_Position_Store.loadStore();
    //store cấp bậc
    var LaborStore = viewmodel.getStore('LaborStore');
    LaborStore.loadStore();
    if (viewmodel.get('personnel.id') != null) {
      this.loadImage(viewmodel.get('personnel.id'));
    }
    //lấy giá trị 
    viewmodel.set('Tinh.old', viewmodel.get('personnel.provinceid_link'));
    viewmodel.set('Huyen.old', viewmodel.get('personnel.districtid_link'));
    viewmodel.set('Xa.old', viewmodel.get('personnel.communeid_link'));
    viewmodel.set('Thon.old', viewmodel.get('personnel.village'));
    //trạng thái đi làm - 
    viewmodel.set('TrangThai.old', viewmodel.get('personnel.status'));
    viewmodel.set('NghiViec.old', viewmodel.get('personnel.date_endworking'));
    viewmodel.set('NgayVaoCty.old', viewmodel.get('personnel.date_startworking'));
    viewmodel.set('TGCongTac.old', viewmodel.get('personnel.time_work'));

  },
  control: {
    '#cmbDonViQuanLy': {
      change: 'onSelectDVQL'
    },
    '#cmbQuocTich': {
      change: 'onSelectQuocTich'
    },
    '#cmbThanhPho': {
      change: 'onChangeThanhPho'
    },
    '#cmbQuanHuyen': {
      change: 'onSelectQuanHuyen'
    },
    '#cmbXa': {
      change: 'onXa'
    },
    '#btnUploadImage': {
      click: 'onUploadImage'
    },
    '#btnFile': {
      change: 'onSelect'
    },
    '#checkmoto': {
      change: 'onCheckMotoBike'
    },
    '#NgaySinh': {
      change: 'onNgaySinh'
    },
    '#NgayVaoCty': {
      change: 'onTG_LamCty'
    },
    '#NgayNghiViec': {
      change: 'onTG_NghiCty',
    },
    '#TrangThai': {
      change: 'onTrangThai'
    }
  },

  /**
   * 
   *thời gian công tác theo thời gian vào công ty làm việc
   */
  onTG_LamCty: function (combo, newvalue, oldValue, e) {
    var viewmodel = this.getViewModel();
    //nếu ngày vào công ty trống =>thời gian làm tại công ty trống
    if (!newvalue) {
      viewmodel.set('personnel.time_work', null);
    } else {
      //nếu trạng thái là đi làm
      if (viewmodel.get('personnel.status') == 0) {
        var now = new Date();
        var time = now - newvalue;
        var time_work = ((((time / 1000) / 60) / 60) / 24) / 30;
        var viewmodel = this.getViewModel();
        viewmodel.set('personnel.time_work', time_work.toFixed(1))
      } else {
        //trạng thái là nghỉ việc
        var date_endworking = viewmodel.get('personnel.date_endworking');
        var value = new Date(date_endworking);
        var time = value - newvalue;
        var time_work = ((((time / 1000) / 60) / 60) / 24) / 30;
        viewmodel.set('personnel.time_work', time_work.toFixed(1))

      }
    }
  },

  /**
   *   thời gian công tác theo thời gian vào làm - ngày nghỉ việc tại  cty
   */
  onTG_NghiCty: function (combo, newvalue, oldValue, e) {
    // var me = this.getView();
    var viewmodel = this.getViewModel();

    //ngày vào công ty
    var date_startworking = viewmodel.get('personnel.date_startworking');
    var value = new Date(date_startworking)
    if (viewmodel.get('personnel.status') == 1) {
      //nếu ngày vào trống => thời gian làm tại công ty trống
      if (!date_startworking && !newvalue || !date_startworking || !newvalue) {
        viewmodel.set('personnel.time_work', null)
      } else {
        var time = newvalue - value;
        var time_work = ((((time / 1000) / 60) / 60) / 24) / 30;
        var viewmodel = this.getViewModel();
        viewmodel.set('personnel.time_work', time_work.toFixed(1))
      }
    }

    // đổi trạng thái
    // console.log(newvalue);
    if(newvalue == null){
      viewmodel.set('personnel.status', 0);
    }else{
      viewmodel.set('personnel.status', 1);
    }

  },
  /**
   Thay đổi trạng thái
   */
  onTrangThai: function (combo, newvalue, oldValue, e) {
    var me = this;
    var viewmodel = this.getViewModel();

    //trạng thái thay đổi khác với trạng thái ban đầu
    if (newvalue != viewmodel.get('TrangThai.old')) {
      //đi làm
      if (newvalue == 0) {
        //  viewmodel.set('personnel.date_endworking', null);
        var date_startworking = viewmodel.get('personnel.date_startworking');
        if (date_startworking) {
          var value = new Date(date_startworking)
          me.onTG_LamCty("", value);
        }
      }
      //nghỉ việc
      if (newvalue == 1) {
        var date_endworking = viewmodel.get('personnel.date_endworking');
        if (date_endworking) {
          var value = new Date(date_endworking)
          me.onTG_NghiCty("", value);
        }
      }
    }
    //trạng thái ban đầu
    else {
      if (newvalue == 0) {
        //viewmodel.set('personnel.date_endworking', null);
        //viewmodel.set('personnel.date_startworking', viewmodel.get('NgayVaoCty.old'));

        var date_startworking = viewmodel.get('personnel.date_startworking');
        if (date_startworking) {
          var value = new Date(date_startworking)
          me.onTG_LamCty("", value);
        }
      } else {
        viewmodel.set('personnel.date_endworking', viewmodel.get('NghiViec.old'));
        viewmodel.set('personnel.date_startworking', viewmodel.get('NgayVaoCty.old'));
      }

    }
  },
  onNgaySinh: function (combo, newvalue, oldValue, e) {
    var now = new Date();
    var time = now - newvalue;
    var tuoi = ((((time / 1000) / 60) / 60) / 24) / 360;

    var viewmodel = this.getViewModel();
    viewmodel.set('personnel.age', tuoi.toFixed(2))

  },
  onCheckMotoBike: function (chk, newVal, oldVal, e) {
    var viewmodel = this.getViewModel();
    if ((viewmodel.get('isActive')))
      viewmodel.set('personnel.bike_number', "");
    viewmodel.set('isActive', true)
  },
  onUploadImage: function () {
    var me = this.getView();
    var viewmodel = this.getViewModel();
    console.log(viewmodel);
    if (viewmodel.get('personnel.id') == null) {
      Ext.Msg.show({
        title: "Thông báo",
        msg: 'Bạn phải lưu thông tin nhân viên trước khi tải ảnh nhân viên!',
        buttons: Ext.MessageBox.YES,
        buttonText: {
          yes: 'Đóng',
        }
      });
      return;
    }

    me.down('#btnFile').fileInputEl.dom.click();
  },
  loadImage: function (id) {
    var viewmodel = this.getViewModel();
    var params = new Object();
    params.id = id;

    GSmartApp.Ajax.post('/api/v1/personnel/viewimage', Ext.JSON.encode(params),
      function (success, response, options) {
        if (success) {
          var response = Ext.decode(response.responseText);
          if (response.respcode == 200) {
            viewmodel.set('personnel.image', response.data);
          }
        }
      })
  },
  onSelect: function (m, value, eOpts) {
    var me = this.getView();
    var viewmodel = this.getViewModel();
    var data = new FormData();
    data.append('file', m.fileInputEl.dom.files[0]);
    data.append('id', viewmodel.get('personnel.id'));

    GSmartApp.Ajax.postUpload('/api/v1/personnel/upload_img', data,
      function (success, response, options) {
        if (success) {
          var response = Ext.decode(response.responseText);
          me.down('#img').setSrc('data:image/gif;base64,' + response.data);
        }
      })
  },
  onSelectDVQL: function (combo, newvalue, oldvalue, e) {
    var viewmodel = this.getViewModel();

    var OrgStore = viewmodel.getStore('OrgStore');
    var listid = '';
    if (newvalue == 1) {
      listid = "1";
    }
    else {
      listid = '22,14,8,9,17,19,20,21,22,23,28,29,30,31,32,33,34,35,36,37,38,39,221';
    }
    console.log(newvalue);
    OrgStore.getbyParentandType(newvalue, listid);
  },
  onSelectQuocTich: function (combo, newvalue, oldValue, e) {
    var viewmodel = this.getViewModel();
    var OrgProvinceStore = viewmodel.getStore('OrgProvinceStore');

    if (!newvalue) {
      viewmodel.set('personnel.provinceid_link', null);
      OrgProvinceStore.removeAll();

    } else {
      viewmodel.set('personnel.provinceid_link', viewmodel.get('Tinh.old'));

      var listid = '25';
      //lấy danh sách thành phố
      OrgProvinceStore.GetOrg_By_type(listid)
    }

  },
  onChangeThanhPho: function (combo, newvalue, oldValue, e) {
    var viewmodel = this.getViewModel();
    var OrgDistrictStore = viewmodel.getStore('OrgDistrictStore');

    var listid = '26';
    var Tinh_id = newvalue;

    //thay đổi tỉnh 
    //nếu tỉnh khác dữ liệu ban đầu thì set huyện,xã = null
    //nếu tỉnh giống ban đầu thì set giá trị huyện, xã về như ban đầu.
    if (viewmodel.get('Tinh.old') != null && viewmodel.get('Tinh.old') != newvalue) {
      viewmodel.set('personnel.districtid_link', null);
      OrgDistrictStore.removeAll();
    } else {
      viewmodel.set('personnel.districtid_link', viewmodel.get('Huyen.old'));
    }

    //lấy danh sách các huyện theo id tỉnh
    OrgDistrictStore.getbyParentandType(Tinh_id, listid);

  },
  onSelectQuanHuyen: function (combo, newvalue, oldValue, e) {
    var viewmodel = this.getViewModel();
    var OrgCommuneStore = viewmodel.getStore('OrgCommuneStore');
    var listid = '27';
    var Huyen_id = newvalue;


    if (viewmodel.get('Huyen.old') != null && viewmodel.get('Huyen.old') != newvalue) {
      viewmodel.set('personnel.communeid_link', null);
      OrgCommuneStore.removeAll();

    } else {
      viewmodel.set('personnel.communeid_link', viewmodel.get('Xa.old'));
    }

    //lây danh sách xã theo id huyện
    OrgCommuneStore.getbyParentandType(Huyen_id, listid);

  },
  onXa: function (combo, newvalue, oldValue, e) {

    var viewmodel = this.getViewModel();
    if (newvalue == null) {
      viewmodel.set('personnel.village', null);
    } else {
      viewmodel.set('personnel.village', viewmodel.get('Thon.old'));
    }
  }
})