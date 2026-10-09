const page=document.body.dataset.page;
const isBooking=document.body.dataset.variant!=='prezentacni';
document.querySelectorAll('a[href^="#"]').forEach(a=>{
 const id=a.getAttribute('href').slice(1);
 if(!isBooking&&id==='objednani'){a.href='kontakt.html';return;}
 if(id==='o-nas'){a.href=page==='domu'?'#o-nas':'index.html#o-nas';return;}
 a.href=id==='domu'?'index.html':id+'.html';
});
if(isBooking)document.querySelectorAll('[data-book]').forEach(button=>button.onclick=()=>{const selected=document.getElementById('service').value;location.href='objednani.html?sluzba='+encodeURIComponent(selected)});
if(isBooking&&page==='objednani'){
 const copy=document.querySelector('#objednani .copy');
 const form=document.getElementById('booking-form');
 if(copy&&form&&form.parentElement!==copy)copy.append(form);
 copy?.querySelector('a.button[href="objednani.html"]')?.remove();
 const selected=new URLSearchParams(location.search).get('sluzba');
 const service=document.getElementById('service');
 if(service&&selected&&services.some(([name])=>name===selected))service.value=selected;
}
