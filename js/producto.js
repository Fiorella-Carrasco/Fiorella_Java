//galeria
document.querySelectorAll('.cajaImagenes img').forEach(Image =>{
    Image.onclick = () => {
        document.querySelector('.popupImagen').style.display = 'block';
        document.querySelector('.popupImagen img').src = Image.getAttribute('src');

    }
})

document.querySelector('.popupImagen span').onclick = () =>{
    document.querySelector('.popupImagen').style.display = 'none';
}