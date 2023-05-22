var websiteName = document.getElementById('websiteName')
var urlPath = document.getElementById('urlPath')
var addBtn = document.getElementById('addBtn')
var invaledUrl = document.getElementById('invaledUrl')
var updateBtn = document.getElementById('updateBtn')

var websites = [] // The Array

if (localStorage.getItem("websites") != null)
{
  websites = JSON.parse (localStorage.getItem("websites"));
  dispalywebSites(websites)
}

function addWebsite ()
{
  if(validateUrl() == true)
  {
  var webSite ={
    siteName : websiteName.value,
    urlPath : urlPath.value
  }
  
    // to Inserts new elements at the start of an array 
    websites.unshift(webSite)

    // to save websites in local Storage 
    localStorage.setItem("websites", JSON.stringify(websites))

    // to display websites in the table
    dispalywebSites(websites)
    clearform()
  }
  else
  {
    invaledUrl.classList.remove('d-none')
  }

  }

urlPath.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("addBtn").click();
  }
});

websiteName.addEventListener("keypress", function(event) {
if (event.key === "Enter") {
  event.preventDefault();
  document.getElementById("websiteName").click();
}
});

function removeError()
{
  invaledUrl.classList.add('d-none')
}

function clearform()
{
  //to clear input again!
  websiteName.value =''
  urlPath.value =''
}

function dispalywebSites(websites){
  var container=``
for (var i = 0; i < websites.length; i++) {
container += `
<tr class="table-rowo fs-1">
  <td width="40px">${[i+1]}</td>
  <td>${websites[i].siteName}</td>
  <td>${websites[i].urlPath}</td>
  <td>
  <div class="dropdown">
    <button class="btn text-white fs-3 " type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <i class="dots fa-solid fa-ellipsis"></i>
    </button>
    <ul class="dropdown-menu ">
      <li><button onclick="deleteWbsite(${i})" class=" w-100"> <a class="delete dropdown-item " href="#"><i class="fa-sharp fa-solid fa-trash"></i> Delete </a></button></li>
      <li><button class=" w-100"><a class="visit dropdown-item" href="https://www.${websites[i].urlPath}" target="_blank"><i class="fa-solid fa-globe"></i> Visit</a></button></li>
    </ul>
  </div>
  </td>
</tr>`
}

document.getElementById('tableBody').innerHTML = container;
}

function removeInvalid () 
{

}

function deleteWbsite(i){
  websites.splice(i,1)
  localStorage.setItem("websites", JSON.stringify(websites))
  dispalywebSites(websites)
}

function clearAll(){
  websites.splice(0, )
  localStorage.setItem("websites", JSON.stringify(websites))
  dispalywebSites(websites)
}


function searchwebsites (term)
{
  var matchedwebsites = [];
  for (var i = 0; i < websites.length ; i++) {
    if(websites[i].siteName.toLowerCase().includes(term.toLowerCase())==true)
    {
        matchedwebsites.push( websites[i]);
    }
  }
  dispalywebSites (matchedwebsites)
}

function setFormForUpdate ()
{
  addBtn.classList.add('d-none')
  updateBtn.classList.remove("d-none")
}

function validateUrl ()
{
  var regex = /((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi
  return regex.test(urlPath.value);
}