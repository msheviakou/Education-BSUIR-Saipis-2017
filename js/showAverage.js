define(function(){
	return function(){
	  	var salary=0;
		$("#surnames option").each(function(){
			if (localStorage.getItem(this.text)!=null){
				salary +=+ localStorage.getItem(this.text);		
			}
		})
		salary/=5;
		alert("Средняя зарплата по отделу: " + salary);
	}
});