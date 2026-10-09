const galleryDialog=document.querySelector('.gallery-dialog');
if(galleryDialog){
document.querySelectorAll('.gallery-open').forEach(link=>link.addEventListener('click',event=>{if(typeof galleryDialog.showModal!=='function')return;event.preventDefault();const picture=galleryDialog.querySelector('img');picture.src=link.href;picture.alt=link.querySelector('img').alt;galleryDialog.querySelector('p').textContent=link.dataset.caption;galleryDialog.showModal();}));
galleryDialog.querySelector('.gallery-close').addEventListener('click',()=>galleryDialog.close());
galleryDialog.addEventListener('click',event=>{if(event.target===galleryDialog){const r=galleryDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)galleryDialog.close();}});
}
