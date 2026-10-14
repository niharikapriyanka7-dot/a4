(function(){
  var b=document.querySelector('.burger'),n=document.getElementById('nav');
  if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});
  function $(i){return document.getElementById(i);}
  var td=$('today');if(td){try{td.textContent=new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'});}catch(e){}}
  // 1. Glossary search
  var gd=$('gdata'),G=gd?JSON.parse(gd.textContent):[],gq=$('gl-q'),L='';
  function gl(){if(!gq)return;var q=gq.value.trim().toLowerCase(),r=G.filter(function(x){return (!L||x.t.charAt(0).toUpperCase()===L)&&(!q||x.t.toLowerCase().indexOf(q)>-1||x.d.toLowerCase().indexOf(q)>-1);});
    $('gl-c').textContent=r.length+' of '+G.length+' terms';
    $('gl-l').innerHTML=r.length?r.map(function(x){return '<li><b>'+x.t+'</b><small>'+x.d+'</small></li>';}).join(''):'<li><small>No matching terms yet. Try another word, or suggest one via our contact page.</small></li>';}
  if(gq){gq.addEventListener('input',gl);document.querySelectorAll('.letters button').forEach(function(btn){btn.addEventListener('click',function(){L=btn.dataset.l;document.querySelectorAll('.letters button').forEach(function(x){x.setAttribute('aria-pressed',x===btn?'true':'false');});gl();});});gl();}
  // 2. Style quiz
  var ST={classic:['Classic','You love polished, timeless pieces: crisp shirts, tailored trousers, a trench and loafers. Invest your attention in fit and fabric, and add one modern detail to keep things fresh.'],
    minimal:['Minimalist','Clean lines, neutral colours and no fuss. Build around excellent basics and play with texture and proportion rather than prints.'],
    romantic:['Romantic','Soft fabrics, gentle colours and feminine details like ruffles, lace and florals. Balance with one structured piece, such as a denim jacket or loafers.'],
    boho:['Bohemian','Relaxed layers, earthy tones and handmade details. Flowing dresses, suede and embroidery suit you; a neat belt or boot keeps the look grounded.'],
    edgy:['Edgy','Bold, confident and a little rebellious: leather, black, boots and hardware. Mix in one soft or unexpected piece for contrast.'],
    sporty:['Sporty','Comfort first, always ready to move. Clean trainers, hoodies and technical fabrics; elevate with a tailored coat or crisp shirt.']};
  var A={},qz=$('qz');
  function quiz(){var keys=Object.keys(A),cnt={};keys.forEach(function(k){cnt[A[k]]=(cnt[A[k]]||0)+1;});
    if(keys.length<5){$('qz-r').textContent=(5-keys.length)+' to go';$('qz-d').textContent='Answer all five questions to see your style.';}
    else{var best=Object.keys(cnt).sort(function(a,b){return cnt[b]-cnt[a];})[0];$('qz-r').textContent=ST[best][0];$('qz-d').textContent=ST[best][1];}
    $('qz-b').innerHTML=Object.keys(ST).map(function(k){var v=cnt[k]||0;return '<div class="bar"><span>'+ST[k][0]+'</span><i><span style="width:'+(v*20)+'%"></span></i><b>'+v+'</b></div>';}).join('');}
  if(qz){qz.querySelectorAll('.opts').forEach(function(g){g.querySelectorAll('button').forEach(function(btn){btn.addEventListener('click',function(){A[g.dataset.q]=btn.dataset.v;g.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===btn?'true':'false');});quiz();});});});quiz();}
  // 3. Silhouettes
  var SL={aline:['A-line','Fitted at the waist and gradually widening to the hem, like a capital A. One of the most universally comfortable shapes.','Easy to move in and forgiving through the hips.','Pair with a tucked-in fitted top or a cropped knit to show off the waist.'],
    pencil:['Pencil','Slim and straight from hip to hem, usually ending around the knee.','Polished and structured; often includes a back slit for walking.','Pair with a loose blouse or soft knit for balance, and flats or block heels.'],
    fit:['Fit and flare','Close-fitting through the bodice and waist, then flaring out from the hips.','Playful and feminine, with plenty of movement.','Keep the top simple; add a cropped jacket or cardigan for cooler days.'],
    shift:['Shift','A simple, straight shape that hangs from the shoulders with little or no waist shaping.','Relaxed, modern and comfortable in warm weather.','Add a belt to define the waist, or keep it loose with clean sandals or trainers.'],
    wide:['Wide-leg','Trousers that fall straight and wide from the hip to the hem.','Fluid and elegant, with a long, lean line.','Pair with a fitted top or a tucked knit, and a little heel or chunky sole.'],
    oversized:['Oversized','Deliberately roomy cut with dropped shoulders and extra length.','Relaxed and contemporary; comfortable layered over other pieces.','Balance with slim trousers, a short skirt or bare legs so you don&#8217;t disappear.']};
  var sl=document.querySelectorAll('#sl figure');
  function sil(k){var S=SL[k];$('sl-h').textContent=S[0];$('sl-d').innerHTML=S[1];$('sl-p').innerHTML='&ldquo;'+S[2]+'&rdquo;';$('sl-t').innerHTML='<b>Pair it with:</b> '+S[3];
    sl.forEach(function(f){f.setAttribute('aria-pressed',f.dataset.s===k?'true':'false');});}
  if(sl.length){sl.forEach(function(f){f.addEventListener('click',function(){sil(f.dataset.s);});f.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();sil(f.dataset.s);}});});sil('aline');}
  // contact & cookies
  var cf=$('cform');
  if(cf)cf.addEventListener('submit',function(ev){ev.preventDefault();if(cf.website.value)return;if(!cf.checkValidity()){cf.reportValidity();return;}
    var body='Name: '+cf.name.value+'\nEmail: '+cf.email.value+'\nTopic: '+cf.topic.value+'\n\n'+cf.message.value;
    window.location.href='mailto:'+cf.dataset.to+'?subject='+encodeURIComponent('Website enquiry: '+cf.topic.value)+'&body='+encodeURIComponent(body);
    var s=$('fm');s.hidden=false;s.textContent='Your email app should now open with your message ready to send. If it doesn’t, please email us directly at '+cf.dataset.to+'.';});
  var c=$('cookie'),v=null;try{v=localStorage.getItem('fj_cookie');}catch(e){}
  if(c&&!v)c.classList.add('show');
  document.querySelectorAll('[data-cookie]').forEach(function(x){x.addEventListener('click',function(){try{localStorage.setItem('fj_cookie',x.dataset.cookie);}catch(e){}c.classList.remove('show');});});
  var y=$('year');if(y)y.textContent=new Date().getFullYear();
})();
