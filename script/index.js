const inputText = document.getElementById('inputText');
const searchBtn = document.getElementById('search');
const suggestions = document.getElementById('suggestions');

inputText.onkeyup = function(){

	var name = inputText.value;

	if(name==''){
		suggestions.innerHTML = null;
	}
	else{
		fetch('https://superheroapi.com/api.php/2913692822012773/search/'+name)
		.then(response => response.json())
		.then(data => suggest(data,name))
		.catch(err => console.log(err));
	}
}


function suggest(data,name){

	console.log(data);
	
	if(name!=inputText.value)
		return;

	if(data.response==='error'){
		suggestions.innerHTML = '<div style="margin-top:40px; color:white;">Try a different name!</div>';
	}

	else{

		suggestions.innerHTML = null;
		
		for(let i=0; i<data.results.length && i<10; i++){

			var item = document.createElement('div');
			item.classList.add('suggestion-item');
			item.innerHTML = data.results[i].name;
			item.setAttribute('superheroId',data.results[i].id);
			suggestions.appendChild(item);
		}

		suggestions.onclick = function(event){

			var id = event.target.getAttribute('superheroId');
			if(id===null)
				return;
			window.open("superhero.html?id="+id,"_self");
		}
	}

}



