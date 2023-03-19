
// Dropdown Menu
var dropdown = document.querySelectorAll('.dropdown');
var dropdownArray = Array.prototype.slice.call(dropdown,0);
dropdownArray.forEach(function(el){
	var button = el.querySelector('button[data-toggle="dropdown"]'),
			menu = el.querySelector('.dropdown-menu')
		//	arrow = button.querySelector('img.icon-arrow');

	button.onclick = function(event) {
		if(!menu.hasClass('show')) {
			menu.classList.add('show');
			menu.classList.remove('hide');
		//	arrow.classList.add('open');
			//arrow.classList.remove('close');
			event.preventDefault();
		}
		else {
			menu.classList.remove('show');
			menu.classList.add('hide');
			//arrow.classList.remove('open');
		//	arrow.classList.add('close');
			event.preventDefault();
		}
	};
})

Element.prototype.hasClass = function(className) {
    return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
};

function searchBar() {
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let section = document.getElementsByClassName('section');
       let url = document.getElementsByClassName('url');
      
    for (i = 0; i < section.length; i++) { 
        if (!section[i].innerHTML.toLowerCase().includes(input)) {
            section[i].style.display="none";
        }
        else {
            section[i].style.display="list-item";                 
        }
    }
	   for (i = 0; i < url.length; i++) { 
        if (!url[i].innerHTML.toLowerCase().includes(input)) {
            url[i].style.display="none";
        }
        else {
            url[i].style.display="list-item";                 
        }
		 }
}