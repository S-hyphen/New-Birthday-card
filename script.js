const showImageButton=document.getElementById('Showpicturebutton')
const myImage=document.getElementById('Birthday')
showImageButton.addEventListener('click',()=>{
    myImage.classList.toggle('hidden');
    myImage.classList.toggle('visible');
});