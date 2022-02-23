Ext.define('GSmartApp.view.personel.BaoCaoBaoAn.TongHopBaoAnViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TongHopBaoAnViewController',
    init: function () {
    },
    control: {

    },
    listen: {
        store: {
            'BaoAnStore': {
                'LoadTongHopBaoAnSuccess': 'onLoadTongHopBaoAnSuccess'
            }
        }
    },
    onLoadTongHopBaoAnSuccess: function () {
        var grid = this.getView();
        grid.setLoading(false);
    }
})