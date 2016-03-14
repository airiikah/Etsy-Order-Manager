$(document).ready(function(){

	Date.prototype.addDays = function(days)
    {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
    }

	$('#datetimepicker1').datetimepicker({
        format: 'MM/DD',
        defaultDate: new Date().addDays(1)
    });


	

})