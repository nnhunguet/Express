var searchInput = document.getElementById('input-field');
searchInput.value = sessionStorage.getItem('draft');
searchInput.addEventListener('change', function(){
 sessionStorage.setItem('draft', searchInput.value);
});
