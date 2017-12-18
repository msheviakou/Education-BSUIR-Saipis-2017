//Подгрузка из txt файла и html страницы
function getInfoAboutRM() {
	document.getElementById('fileText').innerHTML = "";
	$("#fileButton").bind("click", function() {
		$.ajax({
	        url : '../resources/Information.txt',
	        dataType: "text",
	        success : function (data) {
	        	if (data=="") {
	        		$("#fileText").html('<h3>Файл пуст!</h3>'); 
	        		setInterval(function(){$("#fileText").toggle();},600);
	        	}
	        	else {
		            $("#fileText").html(data);
		        }
	        }
		});
	})

	$("#htmlButton").bind("mouseenter", function() {
		$("#nameRM").load("../html/download.html" + " h1");
		$("#descriptionRM").load("../html/download.html" + " h2");
	})

	$("#htmlButton").bind("focus", function() {
		setInterval(function(){$("#nameRM").toggle();},600);
  		if ($("[value=loadMore]").attr("disabled")) { 
			$("[value=loadMore]").removeAttr('disabled'); 
		} else 
		$("[value=loadMore]").prop("disabled", true); 
	})
}

//Подгрузка главного тренера
function getCoach(){
	var request = new XMLHttpRequest(); //Объект XMLHttpRequest дает возможность из JavaScript делать HTTP-запросы к серверу без перезагрузки страницы
	request.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var parser = new DOMParser();
 			var xmlDoc = parser.parseFromString(this.responseText,"text/xml");
 			var elem = xmlDoc.getElementById('coach');
			$(".mainCoach").html(elem.innerHTML);

 			var obj = {position : 'Главный тренер', nameCoach : 'Зинедин Зидан'}
 			$.get('../templates/template.html', function(templates){
				var template = $(templates).filter('#idTemplate2').html(); //Применение шаблона #idTemplate2
				$('#infoCoach').append(Mustache.render(template, obj));
			});
		}
	}
	request.open("GET", "../html/download.html", true);
	request.send();
}

//Подгрузка json и формирование таблицы
function jsonLoad() {
	document.getElementById('soccerUniform').innerHTML = "";
	var firstCharacteristic;
	var secondCharacteristic;
	$.getJSON('../json/uniform.json', function(data) {
		$('#soccerUniform').append('<thead><tr><th>Тип</th><th>Модель</th><th colspan="2">Собственные характеристики</th></tr></thead>');
		for (var i = 0; i < data.part.length; i++){
			for (var j = 0; j < data.part[i].characteristics.length; j++){
				if (data.part[i].type == 'Шорты' || data.part[i].type == 'Майка') {
					firstCharacteristic = data.part[i].characteristics[j].colors;
					secondCharacteristic = data.part[i].characteristics[j].quality;
				} else if (data.part[i].type == 'Бутсы') {
					firstCharacteristic = data.part[i].characteristics[j].thorns;
					secondCharacteristic = data.part[i].characteristics[j].sizeUniform;
				} else {
					firstCharacteristic = data.part[i].characteristics[j].color;
					secondCharacteristic = data.part[i].characteristics[j].sizeUniform;
				}
				$('#soccerUniform').append('<tr><th>' + data.part[i].type + '</th><th>' + data.part[i].model + '</th><th>' + firstCharacteristic + '</th><th>' + secondCharacteristic + '</th></tr>'); 
			}
		}
	});
}

//Вывод фамилии и имени сотрудников
function displayEmployees() {
	$('#surnames').html('');
	$(function(){
		$.getJSON('../json/employees.json', function(data) {
            for(var i=0;i<data.employees.length;i++){     
            	$('#surnames').append('<option>' + data.employees[i].surname + ' ' + data.employees[i].name +'</option>');
            }
	    });
	});
}

//Вывод в нумерованный список
function showInfo(name){
	$("#infoEmployees").html('');
	$(function(){
	    $.getJSON('../json/employees.json', function(data) {
            for(var i=0;i<data.employees.length;i++){       
            	var nameSurname = data.employees[i].surname + ' ' + data.employees[i].name;
            	sal = localStorage.getItem(nameSurname);
                if (nameSurname == name) {
                	if (localStorage.getItem(name)!=null){
            			$.get('../templates/template.html', function(templates){
            				var template = $(templates).filter('#idTemplate').html(); //Применение шаблона #idTemplate
            				$('#infoEmployees').append(Mustache.render(template, data.employees[i]));
            				$('#infoEmployees').append("<li>" + localStorage.getItem(name) + "$</li>");
            			});
            			return;
            		}
            		else{
            			alert("Не введена информация о данном сотруднике!");
            		}
            	}
            }
	    });
	});
}

//Подсчёт зарплаты каждого сотрудника
function showSalary(name,rate,exp,breach,cs){
	require(['rateCount'], function(rateCount){
		var salary = rateCount(rate);

		require(['expCount'], function(expCount){
			salary *= expCount(exp);

			require(['breachCount'], function(breachCount){
				salary *= breachCount(breach);

				require(['countChilds'], function(countChilds){
					if (countChilds(cs) == 0) return;
					else salary *= countChilds(cs);
					salary = Math.round(salary);

					localStorage.setItem(name, salary);
					alert("Заработная плата данного сотрудника: " + salary);
					$.ajax({
						type: 'POST',
						url: '/add',
						data : {
							'name' : name,
							'salary' : salary
						}
					});
    			});
			});
		});
	});
}

//Средняя зарплата по отделу
function showAverage(){
	require(['showAverage', 'jquery'], function(showAverage, $){
		showAverage();
	});	
}
