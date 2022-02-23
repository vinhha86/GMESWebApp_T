Ext.define('GSmartApp.view.contractbuyer.ContractBuyerViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ContractBuyerViewModel',
    requires: ['GSmartApp.store.contractbuyer.ContractBuyerStore'],
    stores: {
        ContractBuyerStore: {
            type: 'ContractBuyerStore'
        },
        EndBuyer: {
            type: 'ListOrgStore'
        },
        Vendor: {
            type: 'ListOrgStore'
        },
        ContractBuyerYearsStore: {
            type: 'ContractBuyerStore'
        },
    },
    data: {
        id: 0,
        contract_code: '',
        currentRec: {
            file_contract_name: ''
        }
    },
    formulas: {
        title: function (get) {
            if (get('id') == 0) {
                return 'Thêm mới hợp đồng gia công'
            }
            else {
                return 'Thông tin hợp đồng gia công ' + this.get('contract_code');
            }
        }
    }
})