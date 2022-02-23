
Ext.define("GSmartApp.extend.new_numberfield", {
    extend:'Ext.form.field.Number',
    alias: "widget.new_numberfield",
    xtype: 'new_numberfield',
    value: '0.000',
    defaultValue: '0.000',
    setValue : function(v){
        v = typeof v == 'number' ? v : String(v).replace(this.decimalSeparator, ".");
        v = isNaN(v) ? '' : String(v).replace(".", this.decimalSeparator);
        v = isNaN(v) ? '' : this.fixPrecision(String(v).replace(".", this.decimalSeparator));
        return Ext.form.NumberField.superclass.setRawValue.call(this, v);
        }, 
    onSpinUp: function() {
            var me = this;
            if (!me.readOnly) {
                var val = parseFloat(me.step); 
                if(me.getValue() !== '') {
                    val = parseFloat(me.getValue()); 
                    me.setValue((val + parseFloat(me.step)));
                }   
            }   
        },
    fixPrecision : function(value) {            
            var nan = isNaN(value);
            if(!this.allowDecimals || this.decimalPrecision == -1 || nan || !value){
                var val = (nan || value == null) ? '0.000' : value
               return val;
            }
            return parseFloat(value).toFixed(this.decimalPrecision);
        }
});