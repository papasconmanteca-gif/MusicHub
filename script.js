const artists = [
  {id:"duki",name:"Duki",country:"Argentina",genre:"Trap",initials:"D",colors:"linear-gradient(135deg,#ff4f9a,#4a1b53)",bio:"Una de las figuras más reconocidas de la escena urbana argentina.",spotify:"https://open.spotify.com/search/Duki",youtube:"https://www.youtube.com/results?search_query=Duki+canal+oficial",instagram:"https://www.instagram.com/dukissj/",albums:["Desde el fin del mundo","Antes de Ameri"]},
  {id:"emilia",name:"Emilia",country:"Argentina",genre:"Pop",initials:"E",colors:"linear-gradient(135deg,#ff79b7,#7539a6)",bio:"Artista pop argentina con una propuesta visual y sonora propia.",spotify:"https://open.spotify.com/search/Emilia",youtube:"https://www.youtube.com/results?search_query=Emilia+Mernes+canal+oficial",instagram:"https://www.instagram.com/emiliamernes/",albums:[".mp3"]},
  {id:"badbunny",name:"Bad Bunny",country:"Puerto Rico",genre:"Reggaetón",initials:"BB",colors:"linear-gradient(135deg,#ff9f43,#d83c52)",bio:"Artista puertorriqueño que mezcla reggaetón, trap y otros estilos.",spotify:"https://open.spotify.com/search/Bad%20Bunny",youtube:"https://www.youtube.com/results?search_query=Bad+Bunny+canal+oficial",instagram:"https://www.instagram.com/badbunnypr/",albums:["Un Verano Sin Ti","Nadie Sabe Lo Que Va a Pasar Mañana"]},
  {id:"taylor",name:"Taylor Swift",country:"Estados Unidos",genre:"Pop",initials:"TS",colors:"linear-gradient(135deg,#7d7cff,#252c63)",bio:"Cantautora conocida por sus historias personales y sus cambios de estilo.",spotify:"https://open.spotify.com/search/Taylor%20Swift",youtube:"https://www.youtube.com/results?search_query=Taylor+Swift+official",instagram:"https://www.instagram.com/taylorswift/",albums:["1989","Midnights"]},
  {id:"airbag",name:"Airbag",country:"Argentina",genre:"Rock",initials:"A",colors:"linear-gradient(135deg,#ff6b4a,#642b3e)",bio:"Banda argentina de rock con una trayectoria marcada por sus shows en vivo.",spotify:"https://open.spotify.com/search/Airbag",youtube:"https://www.youtube.com/results?search_query=Airbag+canal+oficial",instagram:"https://www.instagram.com/airbag.oficial/",albums:["Al parecer todo ha sido una trampa"]},
  {id:"tini",name:"Tini",country:"Argentina",genre:"Electropop",initials:"T",colors:"linear-gradient(135deg,#47c9c4,#3357a8)",bio:"Cantante argentina que combina pop, ritmos urbanos y sonidos electrónicos.",spotify:"https://open.spotify.com/search/TINI",youtube:"https://www.youtube.com/results?search_query=TINI+canal+oficial",instagram:"https://www.instagram.com/tinistoessel/",albums:["Cupido","Un mechón de pelo"]}
];
const grid=document.querySelector("#artistGrid");
const search=document.querySelector("#searchInput");
const filter=document.querySelector("#genreFilter");
const count=document.querySelector("#resultCount");
const empty=document.querySelector("#emptyState");
const dialog=document.querySelector("#artistDialog");
const dialogContent=document.querySelector("#dialogContent");
function safeText(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function render(){
  const q=search.value.trim().toLocaleLowerCase("es");
  const genre=filter.value;
  const visible=artists.filter(a=>(!genre||a.genre===genre)&&[a.name,a.country,a.genre].some(v=>v.toLocaleLowerCase("es").includes(q)));
  count.textContent=`${visible.length} ${visible.length===1?"artista":"artistas"}`;
  empty.hidden=visible.length!==0;
  grid.innerHTML=visible.map(a=>`<article class="artist-card">
    <div class="artist-cover" style="--cover:${a.colors}"><span class="cover-tag">${safeText(a.genre)}</span><span class="artist-initial">${safeText(a.initials)}</span></div>
    <div class="artist-info"><div class="artist-title-row"><h3>${safeText(a.name)}</h3></div>
    <p class="artist-meta">📍 ${safeText(a.country)} · ${safeText(a.genre)}</p>
    <p class="artist-bio">${safeText(a.bio)}</p>
    <div class="card-actions"><button class="outline-button" data-profile="${a.id}">Ver perfil</button><a class="spotify-button" href="${a.spotify}" target="_blank" rel="noopener noreferrer" aria-label="Buscar ${safeText(a.name)} en Spotify">● Spotify</a></div></div></article>`).join("");
}
function showProfile(id){
 const a=artists.find(x=>x.id===id); if(!a)return;
 dialogContent.innerHTML=`<div class="dialog-hero" style="background:${a.colors}">${safeText(a.initials)}</div><p class="eyebrow">PERFIL DEL ARTISTA</p><h2>${safeText(a.name)}</h2><p class="artist-meta">📍 ${safeText(a.country)} · ${safeText(a.genre)}</p><p class="dialog-bio">${safeText(a.bio)}</p><h3>Álbumes destacados</h3><p>${a.albums.map(safeText).join(" · ")}</p><div class="dialog-links"><a class="spotify-button" href="${a.spotify}" target="_blank" rel="noopener noreferrer">● Buscar en Spotify</a><a class="outline-button" href="${a.youtube}" target="_blank" rel="noopener noreferrer">YouTube</a><a class="outline-button" href="${a.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a></div>`;
 dialog.showModal();
}
grid.addEventListener("click",e=>{const b=e.target.closest("[data-profile]");if(b)showProfile(b.dataset.profile)});
search.addEventListener("input",render);filter.addEventListener("change",render);
document.querySelectorAll("[data-genre]").forEach(b=>b.addEventListener("click",()=>{filter.value=b.dataset.genre;render();document.querySelector("#artistas").scrollIntoView({behavior:"smooth"})}));
document.querySelector("#themeToggle").addEventListener("click",()=>{document.body.classList.toggle("light-theme");const light=document.body.classList.contains("light-theme");document.querySelector("#themeToggle").textContent=light?"☀":"☾";document.querySelector("#themeToggle").setAttribute("aria-label",light?"Cambiar a modo oscuro":"Cambiar a modo claro")});
document.querySelector("#dialogClose").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});
document.querySelector("#year").textContent=new Date().getFullYear();
render();