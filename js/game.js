!function e(t,o,a){function n(s,r){if(!o[s]){if(!t[s]){var d="function"==typeof require&&require;if(!r&&d)return d(s,!0);if(i)return i(s,!0);throw new Error("Cannot find module '"+s+"'")}var l=o[s]={exports:{}};t[s][0].call(l.exports,function(e){var o=t[s][1][e];return n(o?o:e)},l,l.exports,e,t,o,a)}return o[s].exports}for(var i="function"==typeof require&&require,s=0;s<a.length;s++)n(a[s]);return n}({1:[function(e,t){(function(e){!function(e){function o(){try{return d in e&&e[d]}catch(t){return!1}}function a(e){return function(){var t=Array.prototype.slice.call(arguments,0);t.unshift(i),l.appendChild(i),i.addBehavior("#default#userData"),i.load(d);var o=e.apply(s,t);return l.removeChild(i),o}}function n(e){return e.replace(c,"___")}var i,s={},r=e.document,d="localStorage";if(s.disabled=!1,s.set=function(){},s.get=function(){},s.remove=function(){},s.clear=function(){},s.transact=function(e,t,o){var a=s.get(e);null==o&&(o=t,t=null),"undefined"==typeof a&&(a=t||{}),o(a),s.set(e,a)},s.getAll=function(){},s.forEach=function(){},s.serialize=function(e){return JSON.stringify(e)},s.deserialize=function(e){if("string"!=typeof e)return void 0;try{return JSON.parse(e)}catch(t){return e||void 0}},o())i=e[d],s.set=function(e,t){return void 0===t?s.remove(e):(i.setItem(e,s.serialize(t)),t)},s.get=function(e){return s.deserialize(i.getItem(e))},s.remove=function(e){i.removeItem(e)},s.clear=function(){i.clear()},s.getAll=function(){var e={};return s.forEach(function(t,o){e[t]=o}),e},s.forEach=function(e){for(var t=0;t<i.length;t++){var o=i.key(t);e(o,s.get(o))}};else if(r.documentElement.addBehavior){var l,p;try{p=new ActiveXObject("htmlfile"),p.open(),p.write('<script>document.w=window</script><iframe src="/favicon.ico"></iframe>'),p.close(),l=p.w.frames[0].document,i=l.createElement("div")}catch(g){i=r.createElement("div"),l=r.body}var c=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g");s.set=a(function(e,t,o){return t=n(t),void 0===o?s.remove(t):(e.setAttribute(t,s.serialize(o)),e.save(d),o)}),s.get=a(function(e,t){return t=n(t),s.deserialize(e.getAttribute(t))}),s.remove=a(function(e,t){t=n(t),e.removeAttribute(t),e.save(d)}),s.clear=a(function(e){var t=e.XMLDocument.documentElement.attributes;e.load(d);for(var o,a=0;o=t[a];a++)e.removeAttribute(o.name);e.save(d)}),s.getAll=function(){var e={};return s.forEach(function(t,o){e[t]=o}),e},s.forEach=a(function(e,t){for(var o,a=e.XMLDocument.documentElement.attributes,n=0;o=a[n];++n)t(o.name,s.deserialize(e.getAttribute(o.name)))})}try{var f="__storejs__";s.set(f,f),s.get(f)!=f&&(s.disabled=!0),s.remove(f)}catch(g){s.disabled=!0}s.enabled=!s.disabled,"undefined"!=typeof t&&t.exports?t.exports=s:"function"==typeof define&&define.amd?define(s):e.store=s}(this.window||e)}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(e){var t=e("./states/preloader"),o=e("./states/main_menu"),a=e("./states/game"),n=e("./states/shop");window.init=function(){var e=new Phaser.Game(320,480,Phaser.AUTO,"");e.state.add("preloader",t,!0),e.state.add("main_menu",o),e.state.add("game",a),e.state.add("shop",n)}},{"./states/game":4,"./states/main_menu":7,"./states/preloader":9,"./states/shop":12}],3:[function(e,t){var o=e("store"),a=e("../../static/items");t.exports=function(){var e=this.game;this.storage=Object.create(null);var t,n=this.storage,i=o.get("inventory");n.pipePadding=500,n.score=0,n.pipesPassed=0,n.goldChance=e.rnd.integerInRange(8,16);var s=e.add.audio("boop");s.addMarker("0",0,.7),s.addMarker("1",1.2,.7),s.addMarker("2",2.4,.7),s.addMarker("3",3.6,.7),s.addMarker("4",4.8,.7),s.addMarker("5",6,.7),s.addMarker("6",7.2,.7);var r=e.add.audio("glide");r.addMarker("glidetastic1",0,1.5,8),r.addMarker("glidetastic2",1.7,1.4,8),r.addMarker("golden_glide1",3.4,1.6,8),r.addMarker("golden_glide2",5.5,1.3,8),r.addMarker("glidetacular1",7.7,1.7,8),r.addMarker("glidetacular2",9.9,1.4,8),o.get("current_level")>4&&!o.get("first_gold")&&(n.goldChance=1),e.add.sprite(120,250,"trees"),e.add.sprite(-50,250,"trees");var d=function(t){t.x>0||(t.x=n.pipePadding,t.height=e.rnd.integerInRange(50,200),t.scored=!1)},l=function(t){if(!(t.x>0)){var o=n.pipes.getAt(t.bodyPipe);t.x=o.x-13,t.y=o.y-o.height-65,n.pipesPassed%n.goldChance!==0||t.gold?t.gold&&(t.loadTexture("pipe_top"),o.loadTexture("pipe_body"),t.gold=!1,o.gold=!1):(n.goGold=!0,t.loadTexture("pipe_top_gold"),o.loadTexture("pipe_body_gold"),n.goldChance=e.rnd.integerInRange(8,16),t.gold=!0,o.gold=!0)}},p=function(e){if(!(e.x>0)){var t=n.pipes.getAt(e.opposite);e.x=n.pipePadding,e.height=405-t.height-210}},g=function(e){if(!(e.x>0)){var t=n.pipes.getAt(e.bodyPipe);e.x=t.x-13,e.y=t.y+t.height,n.goGold&&!e.gold?(e.loadTexture("pipe_top_gold"),t.loadTexture("pipe_body_gold"),e.gold=!0,t.gold=!0,n.goGold=!1):e.gold&&(e.gold=!1,t.gold=!1,e.loadTexture("pipe_top"),t.loadTexture("pipe_body"))}};n.createPipeSet=function(t){var o=n.pipes.create(t,405,"pipe_body");o.anchor.setTo(0,1),o.height=e.rnd.integerInRange(50,200),o.bodyBottom=!0;var a=n.pipes.create(o.x-13,o.y-o.height-65,"pipe_top");a.head=!0,a.body.setPolygon(13,0,13,-21,6,-24,1,-30,0,-53,16,-61,39,-66,83,-65,105,-59,115,-54,115,-25,107,-21,107,0),a.body.translate(0,66),a.bodyPipe=n.pipes.getIndex(o),o.events.onOutOfBounds.add(d),a.events.onOutOfBounds.add(l);var i=n.pipes.create(t,0,"pipe_body");i.anchor.setTo(0,0),i.height=405-o.height-210,i.bodyTop=!0,i.opposite=n.pipes.getIndex(o);var s=n.pipes.create(i.x-13,i.y+i.height,"pipe_top");s.head=!0,s.body.setPolygon(13,0,13,-21,6,-24,1,-30,0,-53,16,-61,39,-66,83,-65,105,-59,115,-54,115,-25,107,-21,107,0),s.body.translate(0,66),s.anchor.setTo(0,.5),s.scale.y=-1,s.bodyPipe=n.pipes.getIndex(i),i.events.onOutOfBounds.add(p),s.events.onOutOfBounds.add(g)},n.pipes=e.add.group();for(var c=1;3>c;c++){var f=300*c+300;n.createPipeSet(f,c)}n.y=0,n.cats=e.add.group(),n.cat=n.cats.create(30,176,"kitty");var u=n.cat;u.anchor=new Phaser.Point(.5,.5),u.body.collideWorldBounds=!0,u.body.setPolygon(88,-64,85,-65,85,-69,91,-69,94,-67,94,-63,92,-61,84,-60,83,-55,96,-56,101,-54,104,-56,108,-56,108,-38,106,-32,104,-31,103,-24,100,-24,99,-27,90,-27,90,-24,87,-23,86,-27,77,-33,76,-56,80,-56,80,-60,70,-61,68,-63,68,-66,72,-69,84,-70,84,-68,82,-68,83,-66,79,-66,76,-64),u.body.translate(0,115),u.animations.add("glide"),u.animations.play("glide",30,!0);var h=e.add.tween(u).to({y:186},400,Phaser.Easing.Circular.InOut,!0,0,Number.MAX_VALUE,!0),v=e.add.sprite(35,85,"tap_to_fly"),y=e.add.text(0,30,"Level "+o.get("current_level"),{font:"32px Boogaloo",fill:"#ffffff",stroke:"#000000",strokeThickness:5});y.x=Math.floor(e.world.centerX-y.width/2);var m,_=function(){m&&m.isRunning&&m.stop(),m&&m._chainedTweens[0].isRunning&&m._chainedTweens[0].stop();var o=""+e.rnd.integerInRange(0,7);if(s.play(o),u.body.velocity.y=-300,m=e.add.tween(u).to({angle:-15},200,Phaser.Easing.Linear.None,!0).to({angle:0},200,Phaser.Easing.Linear.None,!0),t&&"function"===t.affect.how&&!t.affect.once)if("string"==typeof t.affect.thing)"storage"===t.affect.thing?t.affect.change(n,e):t.affect.change(n[t.affect.thing],e);else if("object"==typeof t.affect.thing){for(var a=[],i=0;i<t.affect.thing.length;i++)a[t.affect.thing[i]]=n[t.affect.thing[i]];t.affect.change(a,e)}},b=function(){if(u.body.acceleration.y=800,n.pipes.setAll("body.velocity.x",-200),e.input.onDown.add(_),e.tweens.remove(h),v.destroy(),P.destroy(),I&&(I.visible=!1),N&&(N.visible=!1),A.visible=!0,y.visible=!1,1===o.get("current_level"))return void n.createPopup("Hey! Welcome to Glidey\nCat. My name's Dew. I\nused to run this show,\nbefore that damn cat came\nin. Now I'm your tour guide!");var a=""+e.rnd.integerInRange(0,7);if(s.play(a),u.body.velocity.y=-300,m=e.add.tween(u).to({angle:-15},200,Phaser.Easing.Linear.None,!0).to({angle:0},200,Phaser.Easing.Linear.None,!0),t){var r=i[t.name];if(1===r?delete i[t.name]:(r-=1,i[t.name]=r),o.set("inventory",i),"attributes"===t.affect.how)for(var d in t.affect.change)n[t.affect.thing][d]=t.affect.change[d];else if("function"===t.affect.how&&t.affect.once)if("string"==typeof t.affect.thing)"storage"===t.affect.thing?t.affect.change(n,e):t.affect.change(n[t.affect.thing],e);else if("object"==typeof t.affect.thing){for(var l=[],p=0;p<t.affect.thing.length;p++)l[t.affect.thing[p]]=n[t.affect.thing[p]];t.affect.change(l,e)}}},w=function(e){e.x>0||(e.x=0===n.ground.getIndex(e)?n.ground.getAt(1).x+500:n.ground.getAt(0).x+500)};n.ground=e.add.group();for(var c=0;2>c;c++){var x=n.ground.create(500*c,400,"ground");x.body.immovable=!0,x.events.onOutOfBounds.add(w)}n.ground.setAll("body.velocity.x",-200);var k,P=e.add.button(Math.floor(e.world.centerX-113),380,"start_level",b,this,1,0,1),T=function(){u.animations.stop("glide"),k=u.body.velocity.clone(),u.body.velocity=0,n.pipes.setAll("body.velocity.x",0),n.ground.setAll("body.velocity.x",0),e.input.onDown.remove(_)},E=function(){u.animations.play("glide",30,!0),u.body.velocity=k,n.pipes.setAll("body.velocity.x",-200),n.ground.setAll("body.velocity.x",-200),e.input.onDown.add(_);var t=""+e.rnd.integerInRange(0,7);s.play(t),u.body.velocity.y=-300,m=e.add.tween(u).to({angle:-15},200,Phaser.Easing.Linear.None,!0).to({angle:0},200,Phaser.Easing.Linear.None,!0)};n.createPopup=function(t,o){var a=e.add.button(e.world.centerX-133,600,"notice"),i=e.add.tween(a).to({y:e.world.centerY-146},700,Phaser.Easing.Back.Out,!0),s=e.add.text(0,420,"Tap the box to continue.",{font:"32px Boogaloo",fill:"#ffffff",stroke:"#000000",strokeThickness:5});s.inputEnabled=!0,s.alpha=0,s.x=Math.floor(e.world.centerX-s.width/2),e.add.tween(s).to({alpha:1},300,Phaser.Easing.Linear.None,!0,750);var r=e.add.text(0,180,t,{font:"24px Boogaloo",fill:"#ffffff",stroke:"#000000",strokeThickness:5,align:"center"});r.x=Math.floor(e.world.centerX-r.width/2),r.alpha=0,e.add.tween(r).to({alpha:1},300,Phaser.Easing.Linear.None,!0,750),i.onComplete.add(function(){a.onInputUp.add(d)}),n.ended||T();var d=function(){a.destroy(),s.destroy(),r.destroy(),e.input.onDown.remove(d),n.ended||E(),o&&o()}};var A=n.scoreText=e.add.text(0,50,"0",{font:"48px Boogaloo",fill:"#ffffff",stroke:"#000000",strokeThickness:5});A.x=Math.floor(e.world.centerX-A.width/2),A.visible=!1;var L=Object.keys(i).length;if(0!==L){var I=e.add.group(),N=e.add.group(),B=-1,f=0,M=280;for(var O in i){B++,0!==B&&(f+=68),B%4===0&&0!==B&&(f=0,M+=60);var X=e.add.button(f,M,"item_"+O,function(){t=a[this.name],t.name=this.name,I.setAll("scale",{x:.5,y:.5}),this.scale={x:.75,y:.75}});X.anchor.setTo(.5,.5),X.name=O,I.add(X),X.scale.setTo(.5,.5);var C=e.add.text(f+10,M+10,""+i[O],{font:"14px Boogaloo",fill:"#ffffff",stroke:"#000000",strokeThickness:5});N.add(C)}I.x=60,N.x=60}n.hitCheck=function(){return!n.ended},n.onHit=function(t,a){var i=e.rnd.integerInRange(1,3);r.play(a.gold?"golden_glide"+i:"glidetacular"+i);{var s=!1,d=e.world;e.add.tween(d).to({angle:2},35,Phaser.Easing.Linear.None,!0).to({angle:0},35,Phaser.Easing.Linear.None,!0).to({angle:-2},35,Phaser.Easing.Linear.None,!0).to({angle:0},35,Phaser.Easing.Linear.None,!0)}m&&m._chainedTweens[0].isRunning&&m._chainedTweens[0].stop(),m&&m.isRunning&&m.stop(),e.add.tween(u).to({angle:90},200,Phaser.Easing.Linear.None,!0),n.pipes.setAll("body.velocity.x",0),n.ground.setAll("body.velocity.x",0),e.input.onDown.remove(_),n.ended=!0,n.score>o.get("high_score")&&(o.set("high_score",n.score),s=!0);var l=o.get("current_level")+1;if(o.set("current_level",l),a.gold){var p=o.get("gold")+1;o.set("gold",p)}else{var p=o.get("gold")+n.pipesPassed;o.set("gold",p)}var g=function(){var t=e.add.sprite(e.world.centerX-133,600,"done_bg"),a=e.add.tween(t).to({y:e.world.centerY-212},700,Phaser.Easing.Back.Out,!0,220),i=e.add.text(110,100,"Score: "+n.score,{font:"30px Boogaloo",fill:"#ffffff",stroke:"#000000",strokeThickness:5});i.alpha=0,e.add.tween(i).to({alpha:1},300,Phaser.Easing.Linear.None,!0,960);var s=e.add.text(110,140,"High Score: "+o.get("high_score"),{font:"30px Boogaloo",fill:"#ffffff",stroke:"#000000",strokeThickness:5});s.alpha=0,e.add.tween(s).to({alpha:1},300,Phaser.Easing.Linear.None,!0,960);var r=e.add.text(140,205,"Gold: "+o.get("gold"),{font:"30px Boogaloo",fill:"#ffffff",stroke:"#000000",strokeThickness:5});r.alpha=0,e.add.tween(r).to({alpha:1},300,Phaser.Easing.Linear.None,!0,960);var d=function(){e.sound.pauseAll(),e.state.start("shop")},l=e.add.button(e.world.centerX-113,280,"over_shop_button",null,this,1,0,1);l.alpha=0,e.add.tween(l).to({alpha:1},300,Phaser.Easing.Linear.None,!0,960);var p=function(){var t=o.get("gold");if(0===t)n.createPopup("Not enough gold, bro!");else{t--,o.set("gold",t);var a=o.get("current_level");a--,o.set("current_level",a),e.state.start("game")}},g=e.add.button(e.world.centerX-113,335,"replay_button",null,this,1,0,1);g.alpha=0,e.add.tween(g).to({alpha:1},300,Phaser.Easing.Linear.None,!0,960);var c=function(){e.state.start("game")},f=e.add.button(e.world.centerX-113,390,"next_level_button",null,this,1,0,1);f.alpha=0,e.add.tween(f).to({alpha:1},300,Phaser.Easing.Linear.None,!0,960),a.onComplete.add(function(){f.onInputUp.add(c),g.onInputUp.add(p),l.onInputUp.add(d)})};n.showGoldPopup?(n.showGoldPopup=!1,n.createPopup("I forgot to mention.\nWhen I said one gold, I meant\nliterally just one gold.\nInstead of your usual one gold\nper pipe, you get just one.\nBut... it's free gold!",g)):g()},n.updateScore=function(){var t=e.rnd.integerInRange(1,3);n.score+=1,n.pipesPassed+=1,A.content=n.score,A.x=Math.floor(e.world.centerX-A.width/2),n.pipesPassed%3===0&&r.play("glidetastic"+t),e.sound.play("ding")}}},{"../../static/items":13,store:1}],4:[function(e,t){var o=function(t){this.game=t,this.create=e("./create"),this.update=e("./update")};t.exports=o},{"./create":3,"./update":5}],5:[function(e,t){var o=e("store");t.exports=function(){var e=this.game,t=this.storage,a=t.cats;e.physics.overlap(a,t.ground,t.onHit,t.hitCheck),e.physics.overlap(a,t.pipes,t.onHit,t.hitCheck),t.pipes.forEach(function(a){if(a.bodyBottom&&a.x<25&&!a.scored){var n=o.get("total_pipes");n++,o.set("total_pipes",n),1===n&&t.createPopup("Wow!\nYou scored your first point!\nGood job!\nEvery point you score gives\nyou one gold."),t.updateScore(),a.scored=!0;var i=o.get("first_gold");a.gold&&!i&&(t.createPopup("Whoa! A gold pipe!\n These pipes give you one gold\nwhen you hit them.\nLet's try it now!"),o.set("first_gold",!0),t.showGoldPopup=!0),a.gold&&(t.goldChance=e.rnd.integerInRange(8,12))}})}},{store:1}],6:[function(e,t){var o=window.store=e("store");t.exports=function(){var e=this.game,t=e.add.audio("menu_music",1,!0);t.play("",0,1,!0),e.add.sprite(120,250,"trees"),e.add.sprite(-50,250,"trees"),e.add.sprite(0,400,"ground");var a=o.get("mute");e.sound.mute=a;var n=function(){a?(a=!1,o.set("mute",!1),i.frame=0,e.sound.mute=!1):(a=!0,o.set("mute",!0),i.frame=1,e.sound.mute=!0)},i=e.add.button(10,20,"mute",n);i.frame=a?1:0;var s=e.add.sprite(e.world.centerX-153,-100,"title"),r=e.add.text(500,120,"IT'S TOTALLY ORIGINAL!",{font:"20px Boogaloo",fill:"#ffffff",stroke:"#000000",strokeThickness:5});e.add.tween(s).to({y:50},1200,Phaser.Easing.Bounce.Out,!0,300),e.add.tween(r).to({x:120},500,Phaser.Easing.Linear.None,!0,1500);var d=e.add.sprite(70,150,"kitty");d.animations.add("glide"),d.animations.play("glide",30,!0),e.add.tween(d).to({y:160},400,Phaser.Easing.Circular.InOut,!0,0,Number.MAX_VALUE,!0);var l=function(){e.state.start("game"),t.stop();var o=e.add.audio("game_music",.5,!0);o.play("",0,.4,!0)},p=e.add.button(e.world.centerX-100,275,"play_button",l,this,1,0,2);p.scale.setTo(.75,.75);var g=function(){e.state.start("shop"),t.stop()},c=e.add.button(e.world.centerX-100,375,"shop_button",g,this,1,0,2);c.scale.setTo(.75,.75)}},{store:1}],7:[function(e,t){var o=function(t){this.game=t,this.create=e("./create")};t.exports=o},{"./create":6}],8:[function(e,t){var o=e("store");t.exports=function(){var e=this.game;"undefined"==typeof o.get("inventory")&&o.set("inventory",{}),"undefined"==typeof o.get("mute")&&o.set("mute",!1),"undefined"==typeof o.get("high_score")&&o.set("high_score",0),"undefined"==typeof o.get("gold")&&o.set("gold",0),"undefined"==typeof o.get("current_level")&&o.set("current_level",1),"undefined"==typeof o.get("total_pipes")&&o.set("total_pipes",0),"undefined"==typeof o.get("first_gold")&&o.set("first_gold",!1),e.state.start("main_menu")}},{store:1}],9:[function(e,t){var o=function(t){this.game=t,this.preload=e("./preload"),this.create=e("./create")};t.exports=o},{"./create":8,"./preload":10}],10:[function(e,t){t.exports=function(){var e=this.game;e.stage.backgroundColor="#15d8ea",e.add.text(20,70,"Loading...",{font:"48px Boogaloo",fill:"#ffffff",stroke:"#000000",strokeThickness:5});var t=e.add.text(20,130,"0%",{font:"48px Boogaloo",fill:"#ffffff",stroke:"#000000",strokeThickness:5});e.load.onFileComplete.add(function(e){t.content=e+"%"},this),e.load.image("ground","assets/ground.png"),e.load.image("trees","assets/trees.png"),e.load.image("pipe_body","assets/pipe_body.png"),e.load.image("pipe_body_gold","assets/gold_pipe_body.png"),e.load.image("pipe_top","assets/pipe_head.png"),e.load.image("pipe_top_gold","assets/gold_pipe_head.png"),e.load.image("title","assets/title.png"),e.load.image("tap_to_fly","assets/tap_to_glide.png"),e.load.image("done_bg","assets/done_bg.png"),e.load.image("notice","assets/notice.png"),e.load.image("reset","assets/reset.png"),e.load.image("shop_bg","assets/shop_bg.png"),e.load.image("item_grow","assets/item_grow.png"),e.load.image("item_explode","assets/item_explode.png"),e.load.image("item_invisipipes","assets/item_invisipipes.png"),e.load.image("item_upsidedown","assets/item_upsidedown.png"),e.load.image("item_speed","assets/item_speed.png"),e.load.image("item_padding","assets/item_padding.png"),e.load.image("not_enough","assets/not_enough.png"),e.load.spritesheet("play_button","assets/play_button.png",266,105),e.load.spritesheet("shop_button","assets/shop_button.png",266,105),e.load.spritesheet("next_level_button","assets/nextlevel_button.png",226,43),e.load.spritesheet("replay_button","assets/replay_button.png",226,43),e.load.spritesheet("over_shop_button","assets/over_shop_button.png",226,43),e.load.spritesheet("kitty","assets/kitty.png",136,115,20),e.load.spritesheet("shop_arrow","assets/shop_arrow.png",36,61),e.load.spritesheet("buy_button","assets/buy_button.png",139,43),e.load.spritesheet("shop_play_button","assets/shop_play_button.png",89,43),e.load.spritesheet("shop_menu_button","assets/shop_menu_button.png",89,43),e.load.spritesheet("start_level","assets/start_level.png",226,80),e.load.spritesheet("mute","assets/mute.png",30,34),e.load.audio("ding",["assets/ding.mp3","assets/ding.ogg"]),e.load.audio("glide",["assets/GLIDE.mp3","assets/GLIDE.ogg"]),e.load.audio("menu_music",["assets/menu.mp3","assets/menu.ogg"]),e.load.audio("game_music",["assets/game_music.mp3","assets/game_music.ogg"]),e.load.audio("shop_music",["assets/shop_music.mp3","assets/shop_music.ogg"]),e.load.audio("boop",["assets/boop.mp3","assets/boop.ogg"]),e.load.audio("boom",["assets/boom.mp3","assets/boom.ogg"])}},{}],11:[function(e,t){var o=e("store"),a=e("../../static/items");t.exports=function(){var e,t,n=this.game,i=0,s=n.add.audio("shop_music",1,!0);s.play("",0,1,!0);var r=(n.add.sprite(0,0,"shop_bg"),function(){n.state.start("game"),s.stop();var e=n.add.audio("game_music",.5,!0);e.play("",0,.4,!0)}),d=(n.add.button(225,10,"shop_play_button",r,this,1,0,1),function(){n.state.start("main_menu"),s.stop()}),l=(n.add.button(5,10,"shop_menu_button",d,this,1,0,1),n.add.group()),p=Object.keys(a).length;for(var g in a){var c=a[g];c.name=g;var f=l.create(500,85,"item_"+g);f.name=g}var u,h,v,y,m,_=function(){var e=o.get("gold"),a=o.get("inventory");e-=t.price,"undefined"==typeof a[t.name]?a[t.name]=1:a[t.name]+=1,o.set("inventory",a),o.set("gold",e),b(!0)},b=function(e){var a=o.get("gold");if(u&&u.destroy(),u=n.add.text(0,230,t.title,{font:"30px Boogaloo",fill:"#ffffff",stroke:"#000000",strokeThickness:5,align:"center"}),u.x=Math.floor(n.world.centerX-u.width/2),h&&h.destroy(),h=n.add.text(0,300,t.description,{font:"22px Boogaloo",fill:"#ffffff",stroke:"#000000",strokeThickness:5,align:"center"}),h.x=Math.floor(n.world.centerX-h.width/2),v&&v.destroy(),v=n.add.text(10,400,"Price: "+t.price+" gold",{font:"22px Boogaloo",fill:"#ffffff",stroke:"#000000",strokeThickness:5}),y&&y.destroy(),y=n.add.text(10,430,"You have: "+o.get("gold")+" gold",{font:"22px Boogaloo",fill:"#ffffff",stroke:"#000000",strokeThickness:5}),m&&m.destroy(),m=a<t.price?n.add.sprite(170,420,"not_enough"):n.add.button(170,420,"buy_button",_,this,1,0,1),e){var e=n.add.text(0,120,"BOUGHT!",{font:"36px Boogaloo",fill:"#ffffff",stroke:"#000000",strokeThickness:5});e.x=Math.floor(n.world.centerX-e.width/2),e.alpha=0;{n.add.tween(e).to({alpha:1},200,Phaser.Easing.Linear.None,!0).to({alpha:0},200,Phaser.Easing.Linear.None,!0,1e3)}}},w=l.getAt(0);w.x=n.world.centerX-58,e=w,t=a[e.name],b();var x=function(){var o=i+1;i=o+1>p?0:o;var s=l.getAt(i);s.x=500,n.add.tween(e).to({x:-500},500,Phaser.Easing.Linear.None,!0),n.add.tween(s).to({x:n.world.centerX-58},500,Phaser.Easing.Linear.None,!0),e=s,t=a[e.name],b()},k=function(){var o=i-1;i=o+1===0?p-1:o;var s=l.getAt(i);s.x=-500,n.add.tween(e).to({x:500},500,Phaser.Easing.Linear.None,!0),n.add.tween(s).to({x:n.world.centerX-58},500,Phaser.Easing.Linear.None,!0),e=s,t=a[e.name],b()},P=(n.add.button(270,110,"shop_arrow",x,this,1,0,1),n.add.button(50,110,"shop_arrow",k,this,1,0,1));P.scale.x=-1}},{"../../static/items":13,store:1}],12:[function(e,t){var o=function(t){this.game=t,this.create=e("./create")};t.exports=o},{"./create":11}],13:[function(e,t){t.exports={upsidedown:{title:"taC yedilG",description:"Now the fun is upside\ndown more times fun!",price:3,affect:{thing:"cat",how:"attributes",change:{scale:{x:-1,y:-1},x:70,y:216}}},grow:{title:"Glidey Grow",description:"Those pipes stand no chance against\nyou when you're this big!",price:4,affect:{thing:"cat",how:"attributes",change:{scale:{x:2,y:2}}}},padding:{title:"Friendly Pipes",description:"The pipes are closer than usual,\nsince they want to bond!",price:6,affect:{thing:"storage",how:"function",once:!0,change:function(e){e.pipePadding=100}}},speed:{title:"Sonic Boom",description:"It's no use without this power up!\nGotta go fast!",price:8,affect:{thing:["pipes","ground"],how:"function",once:!0,change:function(e){e.pipes.setAll("body.velocity.x",-500),e.ground.setAll("body.velocity.x",-500)}}},explode:{title:"Kitty Kaboom",description:"The world stands no chance\nagainst your mighty explosions!",price:10,affect:{thing:"cats",how:"function",once:!1,change:function(e,t){var o=e.getAt(0),a=t.add.tween(o).to({x:130},100,Phaser.Easing.Linear.None,!0);a.onComplete.add(function(){var a=t.add.audio("boom",3);a.play("",.7);var n=e.create(o.x,o.y,"kitty");n.anchor=new Phaser.Point(.5,.5);var i=e.create(o.x,o.y,"kitty");i.anchor=new Phaser.Point(.5,.5);var s=e.create(o.x,o.y,"kitty");s.anchor=new Phaser.Point(.5,.5);var r=e.create(o.x,o.y,"kitty");r.anchor=new Phaser.Point(.5,.5),n.body.velocity.setTo(600,600),i.body.velocity.setTo(600,-600),s.body.velocity.setTo(-600,600),r.body.velocity.setTo(-600,-600)})}}},invisipipes:{title:"Invisipipes",description:"What pipes?\nThis power up hides every pipe in sight!",price:12,affect:{thing:"pipes",how:"function",once:!0,change:function(e){e.setAll("alpha",0)}}}}},{}]},{},[2]);