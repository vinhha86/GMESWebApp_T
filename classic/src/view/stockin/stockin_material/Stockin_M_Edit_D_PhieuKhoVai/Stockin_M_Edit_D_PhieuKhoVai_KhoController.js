Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit_d_phieukhovai.Stockin_M_Edit_D_PhieuKhoVai_KhoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_Edit_D_PhieuKhoVai_KhoController',
    init: function () {
    },
    control: {
      '#Stockin_M_Edit_D_PhieuKhoVai_Kho': {
        select: 'onSelectKho'
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
    onSelectKho: function(grid, record, item, index, e, eOpts){
        var me = this.getView()
        var m = this;
        var viewModel = this.getViewModel();
        var StockinPklStore = viewModel.getStore('StockinPklStore');
        var pklist = record.get('pklist');
        StockinPklStore.setData([]);
        StockinPklStore.insert(0, pklist);
        // console.log(record);
    }
})