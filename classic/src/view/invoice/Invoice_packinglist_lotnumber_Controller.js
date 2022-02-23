Ext.define('GSmartApp.view.invoice.Invoice_packinglist_lotnumber_Controller', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.Invoice_packinglist_lotnumber_Controller',
  init: function () {
    var viewModel = this.getViewModel();
    var LotStore = viewModel.getStore('LotStore');
    LotStore.getSorters().add('lotnumber');
  },
  control: {
    '#lotnumber': {
      specialkey: 'onSpecialkey'
    },
    '#sizenumber': {
      specialkey: 'onSpecialkey'
    },
    '#btnThemLot': {
      click: 'CreateLotNumber'
    },
    '#Invoice_packinglist_lotnumber': {
      select: 'onSelectlot'
    }
  },
  renderSum: function (value) {
    if (null == value) value = 0;
    return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
  },
  renderCount: function (value) {
    if (null == value) value = 0;
    return '<div style="font-weight: bold; color:darkred;"> Tổng: ' + Ext.util.Format.number(value, '0,000') + '</div>';
  },
  onSpecialkey: function (field, e) {
    var me = this.getView();
    
    if (e.getKey() == e.ENTER) {
      if (field.itemId == "lotnumber") {
        me.down('#sizenumber').focus();
      }
      else if (field.itemId == "sizenumber") {
        this.CreateLotNumber();
      }
    }
  },

  CreateLotNumber: function(){
    var me = this.getView();
    var mes = "";
    var item = "";

    var viewmodel = this.getViewModel();
    if(viewmodel.get('lotnumber.lot') == ""){
      mes = "Bạn chưa nhập số lot";
      item = "#lotnumber";
    }
    else if(viewmodel.get('lotnumber.size') == ""){
      mes = "Bạn chưa nhập khổ vải";
      item = "#sizenumber";
    }

    if(mes != ""){
      Ext.Msg.show({
        title: 'Thông báo',
        msg: mes,
        buttons: Ext.MessageBox.YES,
        buttonText: {
            yes: 'Đóng',
        },
        fn: function(){
          me.down(item).focus();
        }
    });
    }
    else {
      var data = new Object();
      data.lotnumber = viewmodel.get('lotnumber.lot');
      data.sizenumber = viewmodel.get('lotnumber.size');

      var store = viewmodel.getStore('LotStore');
      store.insert(0, data);

      viewmodel.set('lotnumber.lot', '');
      viewmodel.set('lotnumber.size', '');

      me.getSelectionModel().select(0);
      me.down('#lotnumber').focus();
    }
  },
  // onSelectlot: function(grid, record, item, index, e, eOpts){
  //   var viewmodel = this.getViewModel();
  //   viewmodel.set('packinglist.lotnumber', record.get('lotnumber'));
  //   viewmodel.set('packinglist.sizenumber', record.get('sizenumber'));

  //   var store = viewmodel.getStore('PackingListStore');

  //   var invoicedid_link = viewmodel.get('packinglist.invoicedid_link');
  //   var lotnumber = record.get('lotnumber');

  //   if(isNaN(invoicedid_link)){
  //     // not existed in db
      
  //   }else{
  //     // existed in db
  //     store.loadStore_bylotnumber(invoicedid_link, lotnumber);
  //   }
  // },
  onSelectlot: function(grid, record, item, index, e, eOpts){
    var viewModel = this.getViewModel();
    var lotnumber = record.get('lotnumber');
    var sizenumber = record.get('sizenumber');
    viewModel.set('packinglist.lotnumber', lotnumber);
    viewModel.set('packinglist.sizenumber', sizenumber);

    var PackingListStore = viewModel.getStore('PackingListStore');
    
    var invoiceDRec = viewModel.get('invoiceDRec');
    var pklist = invoiceDRec.get('packinglist');
    if(pklist == null){
      pklist = new Array();
    }

    // console.log(pklist);
    var pklistStoreArray = new Array();
    for(var i=0; i < pklist.length; i++){
      if(pklist[i].sizenumber == sizenumber && pklist[i].lotnumber == lotnumber){
        pklistStoreArray.push(pklist[i]);
      }
    }
    PackingListStore.setData(pklistStoreArray);
  }
})