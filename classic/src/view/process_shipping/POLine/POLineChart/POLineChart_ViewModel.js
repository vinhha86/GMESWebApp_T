Ext.define('GSmartApp.view.process_shipping.POLine.POLineChart.POLineChart_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.POLineChart_ViewModel',
    stores:{
        POrderLineChart: {
            type: 'POrderLineChart'
        }
    },
    data: {
        po: null,
        dataIndex: null,
    },
    formulas: {
        isamountinputHidden: function (get) {
            var dataIndex = get('dataIndex');
            if(dataIndex == null){
                return true;
            }
            if(dataIndex == 'amountinputsum'){
                return false;
            }
            return true;
        },
        isamountoutputHidden: function (get) {
            var dataIndex = get('dataIndex');
            if(dataIndex == null){
                return true;
            }
            if(dataIndex == 'amountoutputsum'){
                return false;
            }
            return true;
        },
        isamountpackedHidden: function (get) {
            var dataIndex = get('dataIndex');
            if(dataIndex == null){
                return true;
            }
            if(dataIndex == 'amountpackedsum'){
                return false;
            }
            return true;
        },
        isamountpackstockedHidden: function (get) {
            var dataIndex = get('dataIndex');
            if(dataIndex == null){
                return true;
            }
            if(dataIndex == 'amountpackstockedsum'){
                return false;
            }
            return true;
        },
        isamountstockedHidden: function (get) {
            var dataIndex = get('dataIndex');
            if(dataIndex == null){
                return true;
            }
            if(dataIndex == 'amountstockedsum'){
                return false;
            }
            return true;
        },
        isamountgiaohangHidden: function (get) {
            var dataIndex = get('dataIndex');
            if(dataIndex == null){
                return true;
            }
            if(dataIndex == 'amountgiaohang'){
                return false;
            }
            return true;
        },
    }
});
