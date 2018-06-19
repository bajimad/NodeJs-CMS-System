const moment =require('moment');

module.exports ={
    
    formatDate: (date, format) => {
        return moment(date).format(format);
    },
    checkedIfIsEqual: (val1, val2) => {
        return val1 == val2 ? 'checked' : '';
    },
    selectedIfIsEqual: (val1, val2) => {

        return val1 == val2 ? 'selected' : '';
    },
    paginate: (options) => {
        
        

    }

};