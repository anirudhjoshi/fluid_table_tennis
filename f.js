this.CanvasRenderingContext2D&&!CanvasRenderingContext2D.createImageData&&(CanvasRenderingContext2D.prototype.createImageData=function(b,a){return this.getImageData(0,0,b,a)});
function Fluid(b){function a(q,c,d){for(var a=0;a<k;a++)q[a]=q[a]+d*c[a]}function n(q,c){if(q===1){for(var d=1;d<=l;d++){c[d]=c[d+f];c[d+(o+1)*f]=c[d+o*f]}for(var a=1;d<=o;d++){c[a*f]=-c[1+a*f];c[l+1+a*f]=-c[l+a*f]}}else{if(q===2)for(d=1;d<=l;d++){c[d]=-c[d+f];c[d+(o+1)*f]=-c[d+o*f]}else for(d=1;d<=l;d++){c[d]=c[d+f];c[d+(o+1)*f]=c[d+o*f]}for(a=1;a<=o;a++){c[a*f]=c[1+a*f];c[l+1+a*f]=c[l+a*f]}}d=(o+1)*f;c[0]=0.5*(c[1]+c[f]);c[d]=0.5*(c[1+d]+c[o*f]);c[l+1]=0.5*(c[l]+c[l+1+f]);c[l+1+d]=0.5*(c[l+d]+c[l+
1+o*f])}function p(q,c,a,b,h){if(b===0&&h===1){for(h=1;h<=o;h++){var e=h*f;++e;for(var i=0;i<l;i++){c[e]=a[e];++e}}n(q,c)}else for(var u=1/h,j=0;j<C;j++){for(h=1;h<=o;h++){var g=(h-1)*f,e=h*f,p=(h+1)*f,k=c[e];++e;for(i=1;i<=l;i++)k=c[e]=(a[e]+b*(k+c[++e]+c[++g]+c[++p]))*u}n(q,c)}}function m(q){for(var c=0;c<k;c++)q[c]=q[c]*R}function g(q,c,a,b,h,e){for(var i=e*l,e=e*o,u=l+0.5,j=o+0.5,g=1;g<=o;g++)for(var k=g*f,p=1;p<=l;p++){var m=p-i*b[++k],w=g-e*h[k];m<0.5?m=0.5:m>u&&(m=u);var s=m|0,t=s+1;w<0.5?
w=0.5:w>j&&(w=j);var v=w|0,m=m-s,w=w-v,A=1-w,B=v*f,v=(v+1)*f;c[k]=(1-m)*(A*a[s+B]+w*a[s+v])+m*(A*a[t+B]+w*a[t+v])}n(q,c)}function v(a,c,d,b){for(var h=-0.5/Math.sqrt(l*o),e=1;e<=o;e++)for(var i=e*f,u=(e-1)*f,j=i-1,g=i,m=i+1,i=(e+1)*f,k=1;k<=l;k++){b[++g]=h*(a[++m]-a[++j]+c[++i]-c[++u]);d[g]=0}n(0,b);n(0,d);p(0,d,b,1,4);b=0.5*l;h=0.5*o;for(e=1;e<=o;e++){u=e*f-1;j=e*f;g=e*f+1;m=(e-1)*f;i=(e+1)*f;for(k=1;k<=l;k++){a[++j]-=b*(d[++g]-d[++u]);c[j]=c[j]-h*(d[++i]-d[++m])}}n(1,a);n(2,c)}function L(a,c,d,
b,h){this.setDensityRGB=function(e,b,h){a[e+1+(b+1)*f]=h[0];c[e+1+(b+1)*f]=h[1];d[e+1+(b+1)*f]=h[2]};this.getDensityRGB=function(e,b){return[a[e+1+(b+1)*f],c[e+1+(b+1)*f],d[e+1+(b+1)*f]]};this.setVelocity=function(a,c,q,d){b[a+1+(c+1)*f]=q;h[a+1+(c+1)*f]=d};this.setVelocityInterp=function(a,c,q,b){var d=f;rI=a+2;rJ=c+2;i1=a+2;i2=rI-i1<0?a+3:a+1;j1=c+2;j2=rJ-j1<0?c+3:c+1;diffx=1-(rI-i1);diffy=1-(rJ-j1);vx1=q*diffx*diffy;vy1=b*diffy*diffx;vx2=q*(1-diffx)*diffy;vy2=b*diffy*(1-diffx);vx3=q*diffx*(1-diffy);
vy3=b*(1-diffy)*diffx;vx4=q*(1-diffx)*(1-diffy);vy4=b*(1-diffy)*(1-diffx);if(!(i1<2||i1>f-1||j1<2||j1>d-1)){this.setVelocity(i1,j1,vx1,vy1);this.setVelocity(i2,j1,vx2,vy2);this.setVelocity(i1,j2,vx3,vy3);this.setVelocity(i2,j2,vx4,vy4)}};this.getXVelocity=function(a,c){return b[a+1+(c+1)*f]};this.getYVelocity=function(a,c){return h[a+1+(c+1)*f]};this.width=function(){return l};this.height=function(){return o}}function M(){f=l+2;k=(l+2)*(o+2);E=Array(k);F=Array(k);G=Array(k);H=Array(k);I=Array(k);
J=Array(k);A=Array(k);B=Array(k);D=Array(k);K=Array(k);for(var a=0;a<k;a++){B[a]=K[a]=A[a]=D[a]=0;E[a]=G[a]=I[a]=F[a]=H[a]=J[a]=0}}function S(a){var c=b.getContext("2d"),d=a.width(),f=a.height();a:if(!t||!(t.width==a.width()&&t.height==a.height())){t=document.createElement("canvas");t.width=a.width();t.height=a.height();var h=t.getContext("2d");try{s=h.createImageData(a.width(),a.height())}catch(e){break a}if(s){for(var h=a.width()*a.height()*4,i=3;i<h;i=i+4)s.data[i]=255;s.data[0]=256;s.data[0]>
255&&(N=true);s.data[0]=0}}if(pong.display&&pong.ball.x<d&&pong.ball.x>0&&pong.ball.y>0&&pong.ball.y<f){pong.ball.vy=pong.ball.vy+a.getYVelocity(Math.round(pong.ball.x),Math.round(pong.ball.y))/4;pong.ball.vx=pong.ball.vx+a.getXVelocity(Math.round(pong.ball.x),Math.round(pong.ball.y))/6}if(s){h=s.data;if(N)for(i=0;i<d;i++)for(var g=0;g<f;g++){var j=a.getDensity(i,g)*255/5,j=j|0;j>255&&(j=255);h[4*(g*f+i)+1]=j}else for(i=0;i<d;i++)for(g=0;g<f;g++){var j=4*(g*f+i),n=a.getDensityRGB(i,g);h[j+0]=Math.round(n[0]*
255/5);h[j+1]=Math.round(n[1]*255/5);h[j+2]=Math.round(n[2]*255/5)}c.putImageData(s,0,0)}else for(i=0;i<d;i++)for(g=0;g<f;g++){j=a.getDensity(i,g)/5;c.setFillColor(0,j,0,1);c.fillRect(i,g,1,1)}}function T(a){var c=b.getContext("2d");c.save();c.lineWidth=1;var d=b.width/a.width(),f=b.height/a.height();c.fillStyle="black";c.fillRect(0,0,b.width,b.height);c.strokeStyle="rgb(0,255,0)";c.beginPath();for(var g=0;g<a.width();g++)for(var e=0;e<a.height();e++){c.moveTo(g*d+0.5*d,e*f+0.5*f);c.lineTo((g+0.5+
10*a.getXVelocity(g,e))*d,(e+0.5+10*a.getYVelocity(g,e))*f)}c.stroke();c.restore()}var R=0.99,O=function(){};this.update=function(){for(var b=F,c=H,d=J,r=B,h=K,e=0;e<k;e++)b[e]=c[e]=d[e]=0;O(new L(b,c,d,r,h));b=A;c=D;d=B;r=K;h=P;a(b,d,h);a(c,r,h);for(var e=d,d=b,b=e,e=r,r=c,c=e,e=b,i=d,u=c,j=r,s=1;s<=o;s++){var t=s*f;++t;for(var C=0;C<l;C++){e[t]=i[t];u[t]=j[t];++t}}n(1,e);n(2,u);v(b,c,d,r);e=d;d=b;b=e;e=r;r=c;c=e;g(1,b,d,d,r,h);g(2,c,r,d,r,h);v(b,c,d,r);if(B){b=F;c=H;d=J;r=E;h=G;e=I;i=A;u=D;j=P;
m(r);m(h);m(e);a(r,b,j);a(h,c,j);a(e,d,j);p(0,b,r,0,1);p(0,c,h,0,1);p(0,d,e,0,1);g(0,r,b,i,u,j);g(0,h,c,i,u,j);g(0,e,d,i,u,j)}Q(new L(E,G,I,A,D))};this.setDisplayFunction=function(a){Q=a};this.iterations=function(){return C};this.setIterations=function(a){a>0&&a<=100&&(C=a)};this.setUICallback=function(a){O=a};var C=10,P=0.1,E,F,G,H,I,J,A,B,D,K,l,o,f,k,Q;this.reset=M;this.fieldRes=96;this.setResolution=function(a,c){var b=c*a;this.fieldRes=a;if(b>0&&b<1E6&&(c!=l||a!=o)){l=c;o=a;M();return true}return false};
var t,s,N=false,b=document.getElementById("canvas");this.toggleDisplayFunction=function(a,c){if(c){a.width=displaySize;a.height=displaySize;return T}a.width=this.fieldRes;a.height=this.fieldRes;return S}};function Pong(b){this.canvas=b;this.ctx=this.canvas.getContext("2d");this.theta=0;this.speed_increase=0.7;this.speed=1;this.display=!0;b=function(){this.life=5;this.push=!0;this.suck=!1;this.stream=[0,0,0];this.multiplayer=!1;this.height=this.width=this.y=this.x=0;this.color="red";this.yo=this.xo=this.ay=this.ax=this.vy=this.vx=0;this.out=!1;this.radius=0;this.speed=1};this.ball=new b;this.ai=new b;this.player=new b;this.updatePlayer=function(){this.player.vy+=this.player.ay;this.keyMap.up.on&&(this.player.ay=
-this.speed_increase,this.player.vy<-this.speed&&(this.player.vy=-this.speed));this.player.push=this.keyMap.right.on?!0:!1;this.player.suck=this.keyMap.left.on?!0:!1;this.keyMap.down.on&&(this.player.ay=this.speed_increase,this.player.vy>this.speed&&(this.player.vy=this.speed));if(!this.keyMap.down.on&&!this.keyMap.up.on||this.keyMap.down.on&&this.keyMap.up.on)this.player.ay=0,this.player.vy=0;if(0>this.player.y&&0>this.player.vy||this.player.y+this.player.height>this.ctx.canvas.height&&0<this.player.vy)this.player.ay=
0,this.player.vy=0;this.player.y+=this.player.vy};this.updateAi=function(){var a=0;if(this.ai.multiplayer){this.ai.vy+=this.ai.ay;this.keyMap.up2.on&&(this.ai.ay=-this.speed_increase,this.ai.vy<-this.speed&&(this.ai.vy=-this.speed));this.ai.push=this.keyMap.left2.on?!0:!1;this.ai.suck=this.keyMap.right2.on?!0:!1;this.keyMap.down2.on&&(this.ai.ay=this.speed_increase,this.ai.vy>this.speed&&(this.ai.vy=this.speed));if(!this.keyMap.down2.on&&!this.keyMap.up2.on||this.keyMap.down2.on&&this.keyMap.up2.on)this.ai.ay=
0,this.ai.vy=0;if(0>this.ai.y&&0>this.ai.vy||this.ai.y+this.ai.height>this.ctx.canvas.height&&0<this.ai.vy)this.ai.ay=0,this.ai.vy=0;this.ai.y+=this.ai.vy}else a=this.ai.y+this.ai.height/2,0>this.ball.vx?a<this.ctx.canvas.height/2-this.ctx.canvas.height/10?this.ai.y+=this.speed:a>this.ctx.canvas.height/2+this.ctx.canvas.height/10&&(this.ai.y-=this.speed):0<this.ball.vx&&2<Math.abs(this.ball.y-a)&&(this.ball.y<a?this.ai.y-=this.speed/1.2:this.ball.y>a&&(this.ai.y+=this.speed/1.2))};this.updateBall=
function(){Math.abs(this.ball.x-this.player.x)<Math.abs(this.ball.vx)&&(this.player.y<this.ball.y+0.1*this.player.height&&this.ball.y<this.player.y+1.1*this.player.height)&&(this.theta=(this.player.y+this.player.height/2-this.ball.y)/(this.player.height/2),this.ball.vx=this.ball.speed*Math.cos(this.theta),this.ball.vy=-this.ball.speed*Math.sin(this.theta));Math.abs(this.ball.x-this.ai.x)<Math.abs(this.ball.vx)&&(this.ai.y<this.ball.y+this.ai.height&&this.ball.y<this.ai.y+this.ai.height)&&(this.theta=
(this.ai.y+this.ai.height/2-this.ball.y)/(this.ai.height/2),this.ball.vx=-this.ball.speed*Math.cos(this.theta),this.ball.vy=-this.ball.speed*Math.sin(this.theta));if(0>this.ball.y+this.ball.vy&&0>this.ball.vy||this.ball.y+this.ball.radius+this.ball.vy>this.ctx.canvas.height&&0<this.ball.vy)this.ball.vy=-this.ball.vy;if(0>this.ball.x&&0>this.ball.vx||this.ball.x>this.ctx.canvas.width&&0<this.ball.vx)if(0>this.ball.x&&(this.player.life-=1),this.ball.x>this.ctx.canvas.width&&(this.ai.life-=1),this.ball.xo=
this.ball.x,this.ball.yo=this.ball.y,this.ball.out=!0,this.ball.x=(this.ctx.canvas.width-this.ball.radius)/2,this.ball.y=this.ctx.canvas.height/2,this.theta=2*Math.random()*Math.PI,this.theta>Math.PI/4&&this.theta<3*Math.PI/4&&(this.theta=1===Math.round(Math.random())?Math.PI/4:3*Math.PI/4),this.theta>Math.PI+Math.PI/4&&this.theta<3*Math.PI/4+Math.PI&&(this.theta=1===Math.round(Math.random())?Math.PI/4+Math.PI:3*Math.PI/4+Math.PI),this.ball.vx=this.ball.speed*Math.cos(this.theta),this.ball.vy=this.ball.speed*
Math.sin(this.theta),1===Math.round(Math.random()))this.ball.vy=-this.ball.vy;this.ball.x+=this.ball.vx;this.ball.y+=this.ball.vy};this.distance=function(a,b){return Math.sqrt(Math.pow(b.x-a.x,2)+Math.pow(b.y-a.y,2))};this.update=function(){this.display?(this.updatePlayer(),this.updateAi(),this.updateBall()):(this.player.push=!0,this.ai.push=!0)};this.clear=function(){this.ctx.save();this.ctx.setTransform(1,0,0,1,0,0);this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);this.ctx.restore()};
this.drawRectangle=function(a,b,p,m,g){this.ctx.fillStyle=g instanceof Array?"rgb("+Math.floor(g[0])+","+Math.floor(g[1])+","+Math.floor(g[2])+")":g;this.ctx.fillRect(a,b,p,m)};this.drawPlayer=function(a){this.drawRectangle(a.x,a.y,a.width,a.height,a.color)};this.drawBall=function(a){this.ctx.beginPath();this.ctx.lineWidth=0.5;this.ctx.fillStyle="black";this.ctx.strokeStyle="white";this.ctx.arc(a.x,a.y,a.radius,0,2*Math.PI,!1);this.ctx.fill();this.ctx.stroke()};this.render=function(){this.display&&
(this.drawPlayer(this.player),this.drawPlayer(this.ai),this.drawBall(this.ball))};this.loop=function(){this.update();this.render()};this.init=function(){var a=this.ctx.canvas.width/75,b=this.ctx.canvas.height/6,p=this.ctx.canvas.width,m=this.ctx.canvas.height;this.player.life=5;this.ai.life=5;this.ai.width=a;this.ai.height=b;this.ai.x=p-this.ai.width;this.ai.y=m/2;this.player.width=a;this.player.height=b;this.player.y=m/2;this.ball.radius=2*a;this.theta=Math.PI;this.theta>Math.PI/4&&this.theta<3*
Math.PI/4&&(this.theta=1===Math.round(Math.random())?Math.PI/4:3*Math.PI/4);this.theta>Math.PI+Math.PI/4&&this.theta<3*Math.PI/4+Math.PI&&(this.theta=1===Math.round(Math.random())?Math.PI/4+Math.PI:3*Math.PI/4+Math.PI);this.ball.vx=this.ball.speed*Math.cos(this.theta);this.ball.vy=this.ball.speed*Math.sin(this.theta);this.ball.x=this.ctx.canvas.width/2;this.ball.y=this.ctx.canvas.height/2};this.keyMap={left:{code:65,on:!1},up:{code:87,on:!1},right:{code:68,on:!1},down:{code:83,on:!1},left2:{code:74,
on:!1},up2:{code:73,on:!1},right2:{code:76,on:!1},down2:{code:75,on:!1}}};function Colors(){function b(a){return a>6/29?Math.pow(a,3):3*Math.pow(6/29,2)*(a-4/29)}this.distanceRotators=[0,201,401];this.colors=[[0,0,0],[0,0,0],[0,0,0]];this.white=[0.9642,1,0.8249];this.L=75;this.rotate=function(){for(var a=0;3>a;a++){var n=this.colors,p=a,m=this.L,g;g=this.distanceRotators[a];g=0<=g&&200>=g?[200-(100+g),100]:200<g&&400>=g?[-100+(g-200),100-(g-200)]:400<g&&600>=g?[100,-100+(g-400)]:void 0;var v=this.white;x=255*v[0]*b(1/116*(m+16)+0.002*g[0]);y=255*v[1]*b(1/116*(m+16));z=
255*v[2]*b(1/116*(m+16)+0.005*g[1]);n[p]=[x,y,z];this.distanceRotators[a]++;600<this.distanceRotators[a]&&(this.distanceRotators[a]=0)}}};var FPS=60,running=!1,canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d");function multiplayer(){pong.ai.multiplayer?(pong.ai.multiplayer=!1,pong.ai.push=!0,document.getElementById("multiplayer").innerHTML="Begin Multiplayer"):(pong.ai.multiplayer=!0,document.getElementById("multiplayer").innerHTML="Begin Single Player");restart()}
function restart(){suck_counter_2=suck_counter_1=100;prev_ai_life=prev_player_life=5;counter.coul_incr=0;field.reset();pong.display=!1;pong.init();pong.clear();counter.run_coul=!0}var field,pong,colors,counter,ball_counter=0,suck_counter_1=100,suck_counter_2=100,fps=0,suck_on=!1,ball_caught=!1,suck_on2=!1,ball_caught2=!1,prev_player_life=5,prev_ai_life=5,ai_switch="AI",player_switch="HUMAN",not=document.getElementById("notifications");
function notify(){pong.ai.multiplayer?(ai_switch="PLAYER 2",player_switch="PLAYER 1"):(ai_switch="AI",player_switch="HUMAN");pong.player.life<prev_player_life&&(not.innerHTML=ai_switch+" SCORES "+(5-pong.player.life)+"!",prev_player_life=pong.player.life);pong.ai.life<prev_ai_life&&(not.innerHTML=player_switch+" SCORES "+(5-pong.ai.life)+"!",prev_ai_life=pong.ai.life);0==pong.player.life&&(not.innerHTML=ai_switch+" WINS!",restart());0==pong.ai.life&&(not.innerHTML=player_switch+" WINS!",restart())}
function prepareFrame(b){60==fps&&(fps=0);fps++;colors.rotate();pong.player.color=colors.colors[0];pong.ai.color=colors.colors[1];pong.ball.color=colors.colors[2];b.setDensityRGB(Math.floor(pong.ball.x+pong.ball.radius/2),Math.floor(pong.ball.y+pong.ball.radius/2),pong.ball.color);pong.player.push&&(b.setVelocity(Math.floor(pong.player.x+pong.player.width/2),Math.floor(pong.player.y+pong.player.height/2),50,0),b.setDensityRGB(Math.floor(pong.player.x+pong.player.width/2),Math.floor(pong.player.y+
pong.player.height/2),pong.player.color));if(pong.ball.out){if(pong.ball.xo>canvas.width/2)var a=canvas.width-1,n=-1;else n=1,a=0;b.setDensityRGB(a,Math.floor(pong.ball.yo+pong.ball.radius/2),pong.ball.color);b.setVelocity(a,Math.floor(pong.ball.yo+pong.ball.radius/2),500*n,0);ball_counter++;12==ball_counter&&(pong.ball.out=!1,ball_counter=0)}pong.player.suck&&(!suck_on&&30<suck_counter_1&&(suck_on=!0),suck_on&&(a=pong.distance(pong.player,pong.ball),20>Math.abs(a)&&(ball_caught=!0,pong.ball.x=pong.player.x+
10+Math.random(),pong.ball.y=pong.player.y+pong.player.height/2+Math.random(),pong.ball.vx=0,pong.ball.vy=0,suck_counter_1--,0==suck_counter_1&&(b.setVelocity(0,Math.floor(pong.player.y+pong.player.height/2),5E3,0),b.setDensityRGB(0,Math.floor(pong.player.y+pong.player.height/2),pong.player.color),ball_caught=suck_on=!1))));suck_on&&(!pong.player.suck&&ball_caught)&&(b.setVelocity(0,Math.floor(pong.player.y+pong.player.height/2),5E3,0),b.setDensityRGB(0,Math.floor(pong.player.y+pong.player.height/
2),pong.player.color),ball_caught=suck_on=!1);100>suck_counter_1&&1==fps%10&&(suck_counter_1+=2);pong.ai.push&&(b.setVelocity(Math.floor(pong.ai.x+pong.ai.width/2),Math.floor(pong.ai.y+pong.ai.height/2),-50,0),b.setDensityRGB(Math.floor(pong.ai.x+pong.ai.width/2),Math.floor(pong.ai.y+pong.ai.height/2),pong.ai.color));!pong.ai.multiplayer&&90<=suck_counter_2&&(pong.ai.suck=!0);pong.ai.suck&&(!suck_on2&&30<suck_counter_2&&(suck_on2=!0),suck_on2&&(a=pong.distance(pong.ai,pong.ball),n=20,pong.ai.multiplayer||
(n=0),Math.abs(a)<n&&(ball_caught2=!0,pong.ball.x=pong.ai.x-10+Math.random(),pong.ball.y=pong.ai.y+pong.ai.height/2+Math.random(),pong.ball.vx=0,pong.ball.vy=0,suck_counter_2--,a=0,pong.ai.multiplayer||(a=80),suck_counter_2<=a&&(pong.ai.multiplayer?b.setVelocity(Math.floor(pong.ai.x+pong.ai.width/2),Math.floor(pong.ai.y+pong.ai.height/2),-5E3,0):b.setVelocity(Math.floor(pong.ai.x+pong.ai.width/2),Math.floor(pong.ai.y+pong.ai.height/2),-2500,0),b.setDensityRGB(Math.floor(pong.ai.x+pong.ai.width/2),
Math.floor(pong.ai.y+pong.ai.height/2),pong.ai.color),suck_on2=!1,ball_caught2=pong.ai.suck=!1))));suck_on2&&(!pong.ai.suck&&ball_caught2)&&(b.setVelocity(Math.floor(pong.ai.x+pong.ai.width/2),Math.floor(pong.ai.y+pong.ai.height/2),-5E3,0),b.setDensityRGB(Math.floor(pong.ai.x+pong.ai.width/2),Math.floor(pong.ai.y+pong.ai.height/2),pong.ai.color),ball_caught2=suck_on2=!1);100>suck_counter_2&&1==fps%10&&(suck_counter_2+=2)}function drawPowerBar(b,a,n,p,m){ctx.fillStyle=b;ctx.fillRect(a,n,p,m)}
function drawSuck(){drawPowerBar("black",0,1,canvas.width,4);drawPowerBar(arrayToRGBA(pong.ai.color),1,2,(canvas.width/2-2)*suck_counter_1/100,2);drawPowerBar(arrayToRGBA(pong.player.color),canvas.width/2+canvas.width/2*(1-suck_counter_2/100),2,(canvas.width/2-1)*suck_counter_2/100,2)}
function drawLives(){drawPowerBar("black",0,canvas.height-5,canvas.width,4);drawPowerBar(arrayToRGBA(pong.ai.color),canvas.width/2+canvas.width/2*(1-pong.ai.life/5),canvas.height-4,(canvas.width/2-1)*pong.ai.life/5,2);drawPowerBar(arrayToRGBA(pong.player.color),1,canvas.height-4,(canvas.width/2-2)*pong.player.life/5,2)}function switchAnimation(){running?(running=!1,document.getElementById("switch").innerHTML="Unpause"):(running=!0,document.getElementById("switch").innerHTML="Pause")}
function startAnimation(){running=!0}window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(b){window.setTimeout(b,1E3/FPS)}}();(function animloop(){requestAnimFrame(animloop);updateFrame()})();
function Counter(){this.coul_incr=this.coul=0;this.symbols=[3,2,1,"GO!"];this.run_coul=this.coul_switch=!0;this.cout_color=[];this.count_down=function(){this.coul++;0==this.cout_color.length&&(this.cout_color=pong.ai.color);60==this.coul&&(this.cout_color=0==this.coul_incr%2?pong.player.color:pong.ai.color,this.coul=0,this.coul_incr++);if(4==this.coul_incr)this.coul_incr=0,this.run_coul=!1,field.reset(),pong.display=!0,pong.player.suck=!1,pong.init(),pong.clear();else{var b=canvas.width/2-8,a=canvas.width/
2+16;3==this.coul_incr&&(b-=20);ctx.font="bold 34px Arial";ctx.fillStyle="black";ctx.fillText(this.symbols[this.coul_incr],b-1,a+2);ctx.fillStyle=arrayToRGBA(this.cout_color);ctx.font="bold 32px Arial";ctx.fillText(this.symbols[this.coul_incr],b,a)}}}function arrayToRGBA(b){return"rgb("+Math.floor(b[0])+","+Math.floor(b[1])+","+Math.floor(b[2])+")"}function updateFrame(){running&&(field.update(),pong.loop(),notify(),drawSuck(),drawLives(),counter.run_coul&&counter.count_down())}
function updateRes(){canvas.width=96;canvas.height=96;field.setResolution(96,96);pong.display=!1;pong.init()}function key_check(b,a,n){for(var p in a)if(a.hasOwnProperty(p)&&b.keyCode===a[p].code){a[p].on=n;break}}var keyDown=function(b){key_check(b,pong.keyMap,!0)},keyUp=function(b){key_check(b,pong.keyMap,!1)};
function begin(){field=new Fluid(canvas);field.setUICallback(prepareFrame);field.setDisplayFunction(field.toggleDisplayFunction(canvas,0));pong=new Pong(canvas);colors=new Colors;counter=new Counter;window.addEventListener("keydown",keyDown,!1);window.addEventListener("keyup",keyUp,!1);updateRes();startAnimation()}begin();