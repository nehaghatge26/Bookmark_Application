//Listen for form submit
document.getElementById('Myform').addEventListener('submit',saveBookmark);
//Save Bookmark
function saveBookmark(e){
	//Get Form Values
	var siteName = document.getElementById('siteName').value;
	var siteURL = document.getElementById('siteURL').value;

	if(!formValidations(siteName,siteURL)){
		return false;
	}
	function formValidations(siteName,siteURL){
		if(!siteName || !siteURL){
		alert("Please fill in the details");
		return false;
	}
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteURL.match(regex)){
		alert("Please use a valid URL");
		return false;
		}	
	return true;

}
	var Bookmark={
		name:siteName,
		url:siteURL

	}
	//local storage test
	if(localStorage.getItem('bookmarks')==null){
		//init array
		var bookmarks=[];
		bookmarks.push(Bookmark);
		// alert(JSON.stringify(Bookmark));
		// alert(JSON.stringify(bookmarks));
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	}
	else{
		 bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(Bookmark);
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}

	document.getElementById('Myform').reset();
	fetchBookmark();
	//form prevention method in jS and prevent form from submitting
	e.preventDefault();
}

function deleteBookmark(url){
var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));	
for(var i=0;i<bookmarks.length;i++){
	if(bookmarks[i].url == url)
		bookmarks.splice(i,1);
	}
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	fetchBookmark();
}
function fetchBookmark(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));	
	var bookmarkResults = document.getElementById('BookmarkResults');
	bookmarkResults.innerHTML='';
	for(var i=0;i<bookmarks.length;i++){
		var name=bookmarks[i].name;
		var url =bookmarks[i].url;

		bookmarkResults.innerHTML += '<div class="well" ' +
									'<h3>'+name +
									'<a class="btn btn-default" href="+url+" target="_blank">Visit</a> ' +
									'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +									'</h3> ' +
									'</div>';
	}
}

