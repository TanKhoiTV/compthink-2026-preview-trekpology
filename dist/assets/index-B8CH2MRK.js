(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=function(e,t,n,r){function i(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||=Promise)(function(n,a){function o(e){try{c(r.next(e))}catch(e){a(e)}}function s(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){e.done?n(e.value):i(e.value).then(o,s)}c((r=r.apply(e,t||[])).next())})},t=`travel_board_auth_user`,n={isReady:!1,user:null};function r(){try{let e=localStorage.getItem(t);if(!e)return null;let n=JSON.parse(e);return!n||!n.username?null:n}catch{return null}}function i(e){localStorage.setItem(t,JSON.stringify(e))}function a(e,t){let n=e.trim();return{id:n.toLowerCase(),username:n,displayName:t?.trim()||n}}function o(t){return e(this,void 0,void 0,function*(){let e=t.username.trim();if(!e)throw Error(`Nhập username trước.`);if(!t.password)throw Error(`Nhập password trước.`);let r=a(e);return n.user=r,n.isReady=!0,i(r),r})}function s(t){return e(this,void 0,void 0,function*(){let e=t.username.trim();if(!e)throw Error(`Nhập username trước.`);if(!t.password||t.password.length<6)throw Error(`Password cần ít nhất 6 ký tự.`);let r=a(e,t.displayName);return n.user=r,n.isReady=!0,i(r),r})}function c(){n.user=null,n.isReady=!0,d.roomId=null,d.playerId=null,d.roomState=null,localStorage.removeItem(t),h()}var l=io(`http://localhost:3001`),u=`travel_board_online_session`,d={roomId:null,playerId:null,roomState:null};function f(){localStorage.removeItem(u)}f();function p(e){!d.roomId||!d.playerId||(localStorage.removeItem(u),sessionStorage.setItem(u,JSON.stringify({roomId:d.roomId,playerId:d.playerId,playerName:e??d.roomState?.players[d.playerId]?.name??`Player`})))}function m(){let e=sessionStorage.getItem(u);if(!e)return null;try{return JSON.parse(e)}catch{return sessionStorage.removeItem(u),null}}function h(){sessionStorage.removeItem(u),localStorage.removeItem(u),d.roomId=null,d.playerId=null,d.roomState=null}function ee(e,t){n.user=r(),n.isReady=!0,window.setTimeout(e,0),l.on(`connect`,()=>{let e=m();e&&l.emit(`room:reconnect`,e)}),l.on(`room:joined`,t=>{d.roomId=t.roomId,d.playerId=t.playerId,d.roomState=t.state,p(t.state.players[t.playerId]?.name),console.log(`Joined room:`,t.roomId,`as`,t.playerId),e()}),l.on(`room:state`,t=>{d.roomState=t,e()}),l.on(`game:error`,e=>{t?.(e.message),alert(e.message)}),l.on(`connect_error`,()=>{console.warn(`Không kết nối được socket server. Kiểm tra server port 3001.`)}),l.on(`room:left`,()=>{h(),e()})}function g(e,t){l.connected||l.connect(),l.emit(`room:create`,{playerName:e,isTutorial:t===!0})}function _(e,t){l.connected||l.connect(),l.emit(`room:join`,{roomId:e,playerName:t})}function te(e,t,n){l.emit(`room:reconnect`,{roomId:e,playerId:t,playerName:n})}function ne(e){!d.roomId||!d.playerId||l.emit(`room:setReady`,{roomId:d.roomId,playerId:d.playerId,isReady:e})}function re(){d.roomId&&l.emit(`tutorial:pauseReplay`,{roomId:d.roomId})}function ie(){d.roomId&&l.emit(`tutorial:resumeReplay`,{roomId:d.roomId})}function ae(){if(!d.roomId||!d.playerId){h();return}l.emit(`room:leave`,{roomId:d.roomId,playerId:d.playerId}),h()}function oe(){!d.roomId||!d.playerId||l.emit(`game:start`,{roomId:d.roomId,playerId:d.playerId})}function se(e){!d.roomId||!d.playerId||l.emit(`draft:selectCard`,{roomId:d.roomId,playerId:d.playerId,cardId:e})}function ce(){!d.roomId||!d.playerId||l.emit(`draft:confirmPick`,{roomId:d.roomId,playerId:d.playerId})}function le(){if(!d.roomId||!d.playerId)throw Error(`Chưa vào phòng online.`);if(!l.connected)throw Error(`Mất kết nối server. Hãy chạy server port 3001 rồi reload trang.`);let e=m();e&&te(e.roomId,e.playerId,e.playerName),l.emit(`planning:confirm`,{roomId:d.roomId,playerId:d.playerId})}function ue(e){!d.roomId||!d.playerId||l.emit(`planning:placeCard`,Object.assign({roomId:d.roomId,playerId:d.playerId},e))}function de(e){!d.roomId||!d.playerId||l.emit(`planning:discardCard`,Object.assign({roomId:d.roomId,playerId:d.playerId},e))}function fe(e={}){!d.roomId||!d.playerId||l.emit(`planning:payDebt`,Object.assign({roomId:d.roomId,playerId:d.playerId},e))}function pe(e){!d.roomId||!d.playerId||l.emit(`planning:returnBoardCard`,Object.assign({roomId:d.roomId,playerId:d.playerId},e))}function me(e,t=``){return`<div class="map-card-col ${t}">${e}</div>`}function he(){let e=n.user;return`
    <div class="map-selection-screen">
      <header class="hub-topbar">
        <div class="hub-topbar__logo">TREKPOLOGY</div>
        <nav class="hub-topbar__nav">
          <button onclick="window.gotoDashboard()">← Quay lại Trang Chủ</button>
        </nav>
        <div class="hub-topbar__user">${e?.displayName||e?.username||`Nhà Lữ Hành`}</div>
      </header>

      <div class="map-selection__container">
        <div class="map-selection__header">
          <h2>Chọn Điểm Đến</h2>
          <p>Hành trình tiếp theo của bạn sẽ bắt đầu từ đâu?</p>
        </div>

        <div class="map-grid">

          ${me(`
            <div class="map-card map-card--active">
              <div class="map-card__bg" style="background-image: url('./assets/saigon.jpg')"></div>
              <div class="map-card__overlay"></div>
              <div class="map-card__content">
                <span class="map-card__badge">Đã Mở Khoá</span>
                <div class="map-card__info">
                  <h3 class="map-card__title">SÀI GÒN</h3>
                  <p class="map-card__desc">Thành phố không ngủ, trung tâm kinh tế và văn hoá sôi động bậc nhất.</p>
                </div>
                <div class="map-card__actions">
                  <button class="map-card__btn map-card__btn--primary" onclick="window.gotoOnlineLobby()">Tìm Trận</button>
                  <button class="map-card__btn map-card__btn--secondary" onclick="window.gotoOnlineLobby()">Tạo Phòng</button>
                </div>
              </div>
            </div>
          `)}

          ${me(`
            <div class="map-card map-card--locked">
              <div class="map-card__bg" style="background-image: url('./assets/danang.jpg')"></div>
              <div class="map-card__overlay"></div>
              <div class="map-card__content">
                <span class="map-card__badge map-card__badge--locked">Sắp ra mắt</span>
                <div class="map-card__info">
                  <h3 class="map-card__title">ĐÀ NẴNG</h3>
                  <p class="map-card__desc">Thành phố đáng sống với những cây cầu độc đáo và bờ biển quyến rũ.</p>
                </div>
              </div>
            </div>
          `)}

          ${me(`
            <div class="map-card map-card--locked">
              <div class="map-card__bg" style="background-image: url('./assets/hanoi.jpeg')"></div>
              <div class="map-card__overlay"></div>
              <div class="map-card__content">
                <span class="map-card__badge map-card__badge--locked">Sắp ra mắt</span>
                <div class="map-card__info">
                  <h3 class="map-card__title">HÀ NỘI</h3>
                  <p class="map-card__desc">Thủ đô ngàn năm văn hiến, phố cổ thâm trầm và những gánh hàng hoa.</p>
                </div>
              </div>
            </div>
          `)}

          ${me(`
            <div class="map-card map-card--locked">
              <div class="map-card__bg" style="background-image: url('https://images.unsplash.com/photo-1599839619722-39751411ea63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"></div>
              <div class="map-card__overlay"></div>
              <div class="map-card__content">
                <span class="map-card__badge map-card__badge--locked">Sắp ra mắt</span>
                <div class="map-card__info">
                  <h3 class="map-card__title">ĐÀ LẠT</h3>
                  <p class="map-card__desc">Thành phố sương mù lãng mạn, rừng thông reo và thời tiết se lạnh quanh năm.</p>
                </div>
              </div>
            </div>
          `)}

        </div>
      </div>
    </div>
  `}var ge=function(e,t,n,r){function i(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||=Promise)(function(n,a){function o(e){try{c(r.next(e))}catch(e){a(e)}}function s(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){e.done?n(e.value):i(e.value).then(o,s)}c((r=r.apply(e,t||[])).next())})},_e=`./assets/videos/one-minute-in-vietnam.mp4`,ve=`trek.hubHeroMuted`,ye=null;function be(){if(ye){try{ye.pause(),ye.muted=!0,ye.removeAttribute(`src`),ye.load()}catch{}ye=null}}function xe(){be();let e=document.getElementById(`hub-hero-media`),t=document.getElementById(`hub-hero-video`),n=document.getElementById(`hub-hero-video-hitarea`),r=document.getElementById(`hub-hero-video-mute`),i=document.getElementById(`hub-hero-video-volume`);if(!e||!t||!n||!r||!i)return;ye=t,t.playsInline=!0,t.volume=parseFloat(i.value)||.85;let a=()=>{if(e.classList.toggle(`hub-hero__media--paused`,t.paused),r.classList.toggle(`hub-hero__video-mute--muted`,t.muted||t.volume===0),r.classList.toggle(`hub-hero__video-mute--unmuted`,!t.muted&&t.volume>0),r.setAttribute(`aria-label`,t.muted||t.volume===0?`Bật tiếng video`:`Tắt tiếng video`),r.setAttribute(`aria-pressed`,t.muted||t.volume===0?`true`:`false`),i.value=t.volume.toString(),t.paused){n.setAttribute(`aria-label`,`Tiếp tục video`);return}n.setAttribute(`aria-label`,`Tạm dừng video`)},o=()=>ge(this,void 0,void 0,function*(){t.muted=localStorage.getItem(ve)===`true`;try{yield t.play(),a();return}catch{t.muted=!0;try{yield t.play()}catch{}a()}});r.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation(),t.muted?(t.muted=!1,t.volume===0&&(t.volume=.5)):t.muted=!0,localStorage.setItem(ve,String(t.muted)),t.paused||t.play(),a()}),n.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation(),t.paused?t.play():t.pause(),a()}),t.addEventListener(`play`,a),t.addEventListener(`pause`,a),t.addEventListener(`volumechange`,a),i.addEventListener(`input`,e=>{e.stopPropagation();let n=parseFloat(i.value);t.volume=n,n>0&&(t.muted=!1)}),o(),t.readyState<HTMLMediaElement.HAVE_CURRENT_DATA&&t.addEventListener(`loadeddata`,()=>{o()},{once:!0})}function Se(){return`
    <div class="hub-hero__media" id="hub-hero-media">
      <div class="hub-hero__video-fallback" aria-hidden="true">
        <div class="hero-placeholder-pattern"></div>
      </div>
      <video
        id="hub-hero-video"
        class="hub-hero__video"
        autoplay
        loop
        playsinline
        preload="auto"
      >
        <source src="${_e}" type="video/mp4" />
      </video>
      <div class="hub-hero__scrim" aria-hidden="true"></div>
      <button
        type="button"
        class="hub-hero__hitarea"
        id="hub-hero-video-hitarea"
        aria-label="Điều khiển video nền"
      ></button>
      <div class="hub-hero__audio-controls">
        <input 
          type="range" 
          class="hub-hero__video-volume" 
          id="hub-hero-video-volume" 
          min="0" max="1" step="0.01" value="0.85"
          aria-label="Âm lượng video"
        />
        <button
          type="button"
          class="hub-hero__video-mute hub-hero__video-mute--muted"
          id="hub-hero-video-mute"
          aria-label="Bật tiếng video"
          aria-pressed="true"
        >
          <svg class="hub-hero__video-mute-icon hub-hero__video-mute-icon--off" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              fill="currentColor"
              d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"
            />
          </svg>
          <svg class="hub-hero__video-mute-icon hub-hero__video-mute-icon--on" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              fill="currentColor"
              d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
            />
          </svg>
        </button>
      </div>
    </div>
  `}function Ce(){return`
    <section class="hub-auth" id="hub-auth">
      <div class="hub-auth__header">
        <span class="hub-auth__eyebrow">TÀI KHOẢN</span>
        <h3 class="hub-auth__title">Bắt đầu hành trình</h3>
        <p class="hub-auth__lead">Đăng nhập hoặc tạo tài khoản để tạo phòng, join bạn bè và lưu tiến trình.</p>
      </div>

      <div class="hub-auth__tabs" role="tablist">
        <button
          type="button"
          class="hub-auth__tab is-active"
          data-hub-auth-tab="login"
          onclick="window.switchHubAuthTab('login')"
        >
          Đăng nhập
        </button>
        <button
          type="button"
          class="hub-auth__tab"
          data-hub-auth-tab="register"
          onclick="window.switchHubAuthTab('register')"
        >
          Đăng ký
        </button>
      </div>

      <div class="hub-auth__panels">
        <form id="hub-auth-login-form" class="hub-auth__panel is-active" data-hub-auth-panel="login">
          <label>
            Username
            <input id="hub-auth-login-username" autocomplete="username" placeholder="an" />
          </label>
          <label>
            Password
            <input id="hub-auth-login-password" autocomplete="current-password" type="password" placeholder="••••••" />
          </label>
          <button type="submit">Đăng nhập</button>
        </form>

        <form id="hub-auth-register-form" class="hub-auth__panel" data-hub-auth-panel="register">
          <label>
            Tên hiển thị
            <input id="hub-auth-register-display-name" placeholder="An" maxlength="18" />
          </label>
          <label>
            Username
            <input id="hub-auth-register-username" autocomplete="username" placeholder="an" />
          </label>
          <label>
            Password
            <input id="hub-auth-register-password" autocomplete="new-password" type="password" placeholder="ít nhất 6 ký tự" />
          </label>
          <button type="submit">Tạo tài khoản</button>
        </form>
      </div>

      <div id="hub-auth-status" class="hub-auth__status" aria-live="polite"></div>
    </section>
  `}function we(){return`
    <section class="hub-explore">
      <h3 class="side-title">Góc Khám Phá</h3>

      <div class="news-item">
        <span class="news-badge news-badge--new">MỚI</span>
        <h4>Trekpology Alpha 1.0</h4>
        <p>Phiên bản đầu tiên ra mắt với bản đồ Sài Gòn — hơn 60 địa điểm đang chờ bạn khám phá.</p>
      </div>

      <div class="news-item">
        <span class="news-badge news-badge--culture">VĂN HOÁ</span>
        <h4>Chùa Bà Thiên Hậu</h4>
        <p>Ngôi chùa hơn 300 năm tuổi tại Chợ Lớn — biểu tượng văn hoá người Hoa giữa lòng Sài Gòn.</p>
      </div>

      <div class="news-item">
        <span class="news-badge news-badge--food">ẨM THỰC</span>
        <h4>Bánh Mì Sài Gòn</h4>
        <p>Ổ bánh mì đặc trưng với nhân phong phú — đại diện ẩm thực đường phố nổi tiếng toàn cầu.</p>
      </div>

      <div class="news-item">
        <span class="news-badge news-badge--nature">THIÊN NHIÊN</span>
        <h4>Cần Giờ Mangrove</h4>
        <p>Khu rừng ngập mặn lớn nhất Đông Nam Á nằm ngay cửa ngõ Sài Gòn — Di sản Sinh quyển UNESCO.</p>
      </div>

      <div class="news-item">
        <span class="news-badge news-badge--heritage">DI SẢN</span>
        <h4>Bưu Điện Trung Tâm</h4>
        <p>Công trình kiến trúc thực dân Pháp thế kỷ 19, do Gustave Eiffel thiết kế — biểu tượng Sài Gòn.</p>
      </div>
    </section>
  `}function Te(e,t){return e?`
    <div class="hub-topbar__account">
      <span class="hub-topbar__user">${t}</span>
      <button
        type="button"
        class="hub-topbar__logout"
        onclick="event.stopPropagation(); window.logoutFromAuthScreen()"
        title="Đăng xuất"
      >
        Thoát
      </button>
    </div>
  `:`
      <button
        type="button"
        class="hub-topbar__guest"
        onclick="window.focusHubAuthPanel()"
      >
        Đăng nhập
      </button>
    `}function Ee(e=!1){let t=n.user,r=!!t,i=t?.displayName||t?.username||`Nhà Lữ Hành`;return`
    <div class="dashboard-hub ${e?`dashboard-hub--loading`:``}">
      <!-- Modal: Về Chúng Tôi -->
      <div class="hub-modal" id="modal-about" onclick="if(event.target===this)this.classList.remove('hub-modal--open')">
        <div class="hub-modal__box">
          <button class="hub-modal__close" onclick="document.getElementById('modal-about').classList.remove('hub-modal--open')">✕</button>
          <h2>Về Chúng Tôi</h2>
          <div class="hub-modal__content">
            <p><strong>TREKPOLOGY</strong> là tựa game thẻ bài chiến lược lấy cảm hứng từ vẻ đẹp văn hoá và thiên nhiên Việt Nam.</p>
            <p>Chúng tôi tin rằng du lịch không chỉ là di chuyển — mà là khám phá, học hỏi và kết nối. Mỗi thẻ bài là một câu chuyện thật từ đất nước Việt Nam.</p>
            <h3>🔮 Sắp ra mắt</h3>
            <p>Đà Lạt • Hội An • Hạ Long • Hà Nội</p>
            <p style="margin-top:16px; font-size:12px; opacity:0.6">Phiên bản Alpha 1.0 — 2025</p>
          </div>
        </div>
      </div>

      <!-- Topbar -->
      <header class="hub-topbar">
        <div class="hub-topbar__logo">TREKPOLOGY</div>
        <nav class="hub-topbar__nav">
          <button type="button" data-tutorial-open>Hướng Dẫn Chơi</button>
          <button onclick="document.getElementById('modal-about').classList.add('hub-modal--open')">Về Chúng Tôi</button>
        </nav>
        ${Te(r,i)}
      </header>

      <!-- Body: 2 cột -->
      <div class="hub-body">

        <!-- Cột trái: Hero -->
        <div class="hub-hero">
          ${Se()}

          <div class="hub-hero__overlay">
            <div class="hub-hero__content">
              <p class="hero-eyebrow">GAME THẺ BÀI CHIẾN LƯỢC</p>
              <h1 class="hero-title">Khám Phá<br/>Việt Nam</h1>
              <p class="hero-sub">Xây dựng hành trình, thu thập địa điểm,<br/>trở thành nhà lữ hành xuất sắc nhất.</p>
              <button class="btn-play" onclick="window.gotoMapSelection()">
                ▶ &nbsp;BẮT ĐẦU HÀNH TRÌNH
              </button>
              ${r?``:`<p class="hero-auth-hint">Đăng nhập ở panel bên phải để vào phòng online.</p>`}
            </div>
          </div>
        </div>

        <!-- Cột phải: Auth hoặc Góc Khám Phá -->
        <aside class="hub-side">
          <div class="hub-side__inner">
            ${r?we():Ce()}
          </div>
        </aside>

      </div>
    </div>
  `}var De=5e3;function Oe(e,t={}){var n;if(!e.length)return(n=t.onFinish)==null||n.call(t),{stop(){}};let r=window.matchMedia?.call(window,`(prefers-reduced-motion: reduce)`).matches,i=0,a=0,o=0,s=!1,c=document.createElement(`div`);c.className=`sl-layer`,c.style.zIndex=String(De);let l=[`top`,`right`,`bottom`,`left`].map(e=>{let t=document.createElement(`div`);return t.className=`sl-mask sl-mask--${e}`,c.appendChild(t),t}),u=document.createElement(`div`);u.className=`sl-ring`+(r?` sl-ring--static`:``),c.appendChild(u);let d=document.createElement(`div`);d.className=`sl-pulse`+(r?` sl-pulse--static`:``),d.innerHTML=`<span class="sl-pulse__ring"></span>`,c.appendChild(d);let f=document.createElement(`div`);f.className=`sl-tip`,f.setAttribute(`role`,`dialog`),f.setAttribute(`aria-live`,`polite`),c.appendChild(f),document.body.appendChild(c),document.body.classList.add(`sl-open`),f.addEventListener(`click`,e=>{var n;let r=e.target.closest(`[data-sl]`);if(r){if(e.preventDefault(),r.dataset.sl===`skip`)return ae(`skip`);if(r.dataset.sl===`results`){ae(`skip`),(n=t.onShowResults)==null||n.call(t);return}if(r.dataset.sl===`next`)return te();if(r.dataset.sl===`prev`)return ne()}});function p(e){return typeof e.target==`string`?document.querySelector(e.target):e.target()}let m=``;function h(){let t=e[i];if(t.noSpotlight){if(m===`nospot`)return;m=`nospot`,c.classList.add(`sl-nospot`);let e=f.getBoundingClientRect(),t=Math.max(12,window.innerHeight-e.height-72);f.style.transform=`translate(16px, ${Math.round(t)}px)`,f.dataset.placement=`corner`;return}c.classList.remove(`sl-nospot`);let n=p(t);if(!n)return;let r=t.padding??8,a=n.getBoundingClientRect(),o=Math.max(0,a.left-r),s=Math.max(0,a.top-r),h=a.width+r*2,g=a.height+r*2,_=window.innerWidth,te=window.innerHeight,ne=`${i}|${Math.round(o)}|${Math.round(s)}|${Math.round(h)}|${Math.round(g)}|${_}|${te}`;ne!==m&&(m=ne,ke(l[0],0,0,_,s),ke(l[1],o+h,s,Math.max(0,_-(o+h)),g),ke(l[2],0,s+g,_,Math.max(0,te-(s+g))),ke(l[3],0,s,o,g),ke(u,o,s,h,g),ke(d,o,s,h,g),ee(t,o,s,h,g,_,te))}function ee(e,t,n,r,i,a,o){let s=f.getBoundingClientRect(),c=e.placement??`auto`;c===`auto`&&(c=n+i+14+s.height<=o?`bottom`:`top`);let l,u;c===`bottom`||c===`top`?(l=Ae(t+r/2-s.width/2,12,a-s.width-12),u=c===`bottom`?n+i+14:n-s.height-14):(u=Ae(n+i/2-s.height/2,12,o-s.height-12),l=c===`right`?t+r+14:t-s.width-14),f.style.transform=`translate(${Math.round(l)}px, ${Math.round(u)}px)`,f.dataset.placement=c}function g(){let n=e[i],a=typeof n.advance==`object`,o=i===e.length-1;f.innerHTML=`
      <div class="sl-tip__skiprow">
        ${n.allowSkipResults===!0&&t.onShowResults?`<button type="button" class="sl-tip__results" data-sl="results">⏭ Bỏ qua, xem kết quả</button>`:``}
        <button type="button" class="sl-tip__skip" data-sl="skip">Bỏ qua hướng dẫn</button>
      </div>
      <p class="sl-tip__count">Bước ${i+1}/${e.length}</p>
      <h3 class="sl-tip__title">${je(n.title)}</h3>
      <p class="sl-tip__body">${je(n.body)}</p>
      <div class="sl-tip__dots">
        ${e.map((e,t)=>`<span class="sl-dot ${t===i?`is-active`:``}"></span>`).join(``)}
      </div>
      <div class="sl-tip__actions">
        ${i>0?`<button type="button" class="sl-btn sl-btn--ghost" data-sl="prev">Quay lại</button>`:`<span></span>`}
        ${a?`<span class="sl-tip__hint">⌛ ${je(n.primaryLabel??`Hãy thao tác để tiếp tục…`)}</span>`:`<button type="button" class="sl-btn sl-btn--primary" data-sl="next">${je(n.primaryLabel??(o?`Hoàn tất`:`Tiếp theo`))}</button>`}
      </div>
    `,r||(f.classList.remove(`sl-tip--enter`),f.offsetWidth,f.classList.add(`sl-tip--enter`))}function _(n){if(s)return;window.clearInterval(o),i=n;let r=e[i];if(typeof r.advance==`object`&&r.advance.waitUntil())return te();let a=Date.now()+(t.targetTimeoutMs??8e3),l=()=>{s||(p(r)?(c.classList.toggle(`sl-passive`,r.passive===!0),g(),h(),c.classList.add(`sl-ready`),typeof r.advance==`object`&&(o=window.setInterval(()=>{r.advance.waitUntil()&&(window.clearInterval(o),te())},200))):Date.now()<a?window.setTimeout(l,120):te())};l()}function te(){var t,n;if((n=(t=e[i])?.onAdvance)==null||n.call(t),i>=e.length-1)return ae(`finish`);_(i+1)}function ne(){i>0&&_(i-1)}function re(){s||(h(),a=requestAnimationFrame(re))}let ie=e=>{e.key===`Escape`&&ae(`skip`)};function ae(e=`finish`){var n,r;s||(s=!0,cancelAnimationFrame(a),window.clearInterval(o),document.removeEventListener(`keydown`,ie),c.remove(),document.body.classList.remove(`sl-open`),e===`skip`?(n=t.onSkip)==null||n.call(t):(r=t.onFinish)==null||r.call(t))}return document.addEventListener(`keydown`,ie),_(0),a=requestAnimationFrame(re),{stop:ae}}function ke(e,t,n,r,i){e.style.transform=`translate(${Math.round(t)}px, ${Math.round(n)}px)`,e.style.width=`${Math.round(r)}px`,e.style.height=`${Math.round(i)}px`}function Ae(e,t,n){return Math.max(t,Math.min(e,n))}function je(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function Me(e,t){let n=Math.max(1,t),r=e*5/n,i=.92+e%7/7*.16;return Math.round(r*i)}function Ne(e){return[`🥇`,`🥈`,`🥉`,`4️⃣`][e]??`${e+1}`}function Pe(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function Fe(e,t,n){let r=e.map(e=>Object.assign(Object.assign({},e),{final:Me(e.score,t)})).sort((e,t)=>t.final-e.final),i=r.find(e=>e.isSelf),a=r.findIndex(e=>e.isSelf),o=document.createElement(`div`);o.className=`tour-result-layer`,o.innerHTML=`
    <div class="tour-result">
      <p class="tour-result__eyebrow">Tổng kết hành trình (mô phỏng)</p>
      <h2 class="tour-result__title">Kết quả 5 ngày</h2>
      <ol class="tour-result__board">
        ${r.map((e,t)=>`
          <li class="tour-result__row ${e.isSelf?`is-self`:``}" style="--i:${t}">
            <span class="tour-result__medal">${Ne(t)}</span>
            <span class="tour-result__name">${Pe(e.name)}${e.isBot?` 🤖`:``}${e.isSelf?` (Bạn)`:``}</span>
            <span class="tour-result__score">${e.final} <small>VP</small></span>
          </li>`).join(``)}
      </ol>
      <p class="tour-result__verdict">
        ${a===0?`🎉 Bạn dẫn đầu hành trình! Tuyệt vời.`:`Bạn xếp hạng ${a+1}/4 với ${i?.final??0} VP. Chơi thật để leo top nhé!`}
      </p>
      <button type="button" class="tour-result__home" data-result-home>Về trang chủ</button>
    </div>
  `,document.body.appendChild(o),document.body.classList.add(`tour-result-open`),requestAnimationFrame(()=>o.classList.add(`is-in`));let s=()=>{o.remove(),document.body.classList.remove(`tour-result-open`),n()};o.addEventListener(`click`,e=>{e.target.closest(`[data-result-home]`)&&(e.preventDefault(),s())})}var Ie=`trek_onboarding_seen_v1`,Le=!1,Re=null;function ze(){return Le}function Be(){try{return localStorage.getItem(Ie)===`1`}catch{return!1}}function Ve(){try{localStorage.setItem(Ie,`1`)}catch{}}function He(e){return!!document.querySelector(e)}function Ue(e){return[{id:`auth`,target:`#hub-auth`,title:`Bắt đầu hành trình tại đây`,body:`Đăng ký tài khoản mới hoặc đăng nhập để tạo phòng, mời bạn bè cùng chơi và lưu tiến trình của bạn.`,placement:`left`,advance:{waitUntil:()=>e.isLoggedIn()},primaryLabel:`Đăng nhập để tiếp tục…`},{id:`start`,target:`.btn-play`,title:`Vào hành trình`,body:`Tuyệt! Giờ bấm “Bắt Đầu Hành Trình” để chọn điểm đến cho chuyến đi.`,advance:{waitUntil:()=>He(`.map-selection-screen`)},primaryLabel:`Bấm Bắt Đầu Hành Trình…`},{id:`map`,target:`.map-card--active`,title:`Chọn điểm đến`,body:`Sài Gòn đã mở khoá. Bấm “Tạo Phòng” ngay trên thẻ này để lập một phòng chơi.`,advance:{waitUntil:()=>He(`.online-entry-screen`)},primaryLabel:`Bấm Tạo Phòng…`},{id:`createRoom`,target:`button[onclick*="createRoomFromLobby"]`,title:`Tạo phòng`,body:`Tạo một phòng mới — bạn sẽ là chủ phòng (P1) và có mã phòng để mời bạn bè vào cùng.`,advance:{waitUntil:()=>He(`button[onclick*="toggleReadyFromLobby"]`)},primaryLabel:`Bấm Tạo phòng…`},{id:`ready`,target:`button[onclick*="toggleReadyFromLobby"]`,title:`Sẵn sàng vào trận`,body:`Bấm “Sẵn sàng”. Các ghế trống sẽ được điền bằng bot để bạn vào trận ngay.`,placement:`top`,advance:{waitUntil:()=>He(`button[onclick*="startOnlineGame"]:not([disabled])`)},primaryLabel:`Bấm Sẵn sàng…`},{id:`start`,target:`button[onclick*="startOnlineGame"]`,title:`Bắt đầu trận`,body:`Mọi người đã sẵn sàng. Bấm “Bắt đầu” để khởi động trận đấu.`,placement:`top`,advance:{waitUntil:()=>e.getPhase()===`draft`},primaryLabel:`Bấm Bắt đầu…`},{id:`intro-food`,target:()=>document.querySelector(`.draft-center-card [data-card-tag="food"]`)?.closest(`.draft-center-card-wrapper`)??null,title:`🍜 Thẻ Ẩm thực`,body:`Trong nhóm bài này có nhiều LOẠI thẻ. Đây là thẻ Ẩm thực — món ăn, quán xá. Đặt 2 lá Ẩm thực cùng ngày → combo +5 VP!`,placement:`auto`,padding:4,passive:!0,allowSkipResults:!0,advance:`next`,primaryLabel:`Tiếp →`},{id:`intro-culture`,target:()=>document.querySelector(`.draft-center-card [data-card-tag="culture"]`)?.closest(`.draft-center-card-wrapper`)??null,title:`🏛️ Thẻ Văn hóa`,body:`Thẻ Văn hóa — chùa chiền, bảo tàng, di tích. Combo mạnh hơn: 2 lá Văn hóa cùng ngày = +8 VP!`,placement:`auto`,padding:4,passive:!0,allowSkipResults:!0,advance:`next`,primaryLabel:`Tiếp →`},{id:`intro-action`,target:()=>document.querySelector(`.draft-center-card [data-card-tag="action"]`)?.closest(`.draft-center-card-wrapper`)??null,title:`🧭 Thẻ Khám phá`,body:`Thẻ Khám phá — hoạt động, trải nghiệm. Combo cao nhất: 2 lá Khám phá cùng ngày = +10 VP!`,placement:`auto`,padding:4,passive:!0,allowSkipResults:!0,advance:`next`,primaryLabel:`Đã hiểu! →`},{id:`draft-pick`,target:`.draft-center-overlay`,title:`Giờ tới lượt bạn chọn`,body:`Bấm nút “CHỌN” trên một thẻ bạn thích để chọn nó.`,placement:`auto`,padding:6,passive:!0,allowSkipResults:!0,advance:{waitUntil:()=>e.getDraftSelected()},primaryLabel:`Bấm CHỌN trên một thẻ…`},{id:`draft-confirm`,target:`button[onclick*="confirmDraftPick"]`,title:`Kết thúc lượt`,body:`Đã chọn thẻ? Bấm “Kết thúc lượt” để xác nhận lá đầu tiên.`,placement:`left`,passive:!0,allowSkipResults:!0,advance:{waitUntil:()=>e.getDraftPickedCount()>=1},primaryLabel:`Bấm Kết thúc lượt…`},{id:`draft-free`,target:`body`,title:`Bạn đã biết cách Draft! 👍`,body:`Giờ tự chọn nốt các thẻ cho những vòng còn lại. Khi đủ thẻ, game sẽ tự chuyển sang xếp lịch trình.`,noSpotlight:!0,allowSkipResults:!0,advance:{waitUntil:()=>e.getPhase()===`planning`},primaryLabel:`Đang chờ bạn chọn xong…`},{id:`place-hand`,target:`.player-hand`,title:`Bài trên tay`,body:`Đây là những thẻ bạn vừa chọn ở phần Draft. Giờ ta xếp chúng lên lịch trình.`,placement:`top`,padding:6,passive:!0,allowSkipResults:!0,advance:`next`,primaryLabel:`Tiếp →`},{id:`intro-combo`,target:`.board-grid`,title:`💥 Combo thưởng điểm!`,body:`Xếp các thẻ trong CÙNG một ngày để ăn combo bonus, ví dụ: 2 thẻ cùng chủ đề (🍜🏛️🧭), ghép cặp chủ đề (Ẩm thực + Văn hóa), 2 thẻ Ngoài trời, lấp đủ khung giờ, có lịch Sáng/Khuya… Combo CHỒNG combo — xếp càng khéo, điểm càng cao!`,placement:`auto`,padding:6,passive:!0,allowSkipResults:!0,advance:`next`,primaryLabel:`Hiểu rồi, xếp thôi! →`},{id:`place-board`,target:`.board-grid`,title:`Xếp lên lịch trình`,body:`Giờ bấm chọn một thẻ trên tay, rồi bấm vào ô trống trên bàn để đặt. Thử ghép thẻ cùng chủ đề để ăn combo!`,placement:`auto`,padding:6,passive:!0,allowSkipResults:!0,advance:{waitUntil:()=>e.getSelfPlacedCount()>=1},primaryLabel:`Đặt một thẻ lên bàn…`},{id:`place-free`,target:`body`,title:`Tuyệt! Bạn đã biết cách xếp 🎉`,body:`Xếp thêm thẻ tùy thích. Khi xong, bấm nút “Xác nhận” (góc phải) để chốt ngày và xem chấm điểm.`,noSpotlight:!0,allowSkipResults:!0,advance:{waitUntil:()=>e.getPhase()===`simulation`},primaryLabel:`Đang chờ bạn xếp xong…`},{id:`scan-watch`,target:`body`,title:`⏳ Đang chấm điểm…`,body:`Dòng quét đang chạy qua từng khung giờ để cộng điểm. Theo dõi nhé — sắp có điều bất ngờ!`,noSpotlight:!0,allowSkipResults:!0,advance:{waitUntil:()=>e.isReplayPausedForEvent()||e.getPhase()===`result`},primaryLabel:`Đang quét…`},{id:`intro-event`,target:`.score-ticket.is-active`,title:`🎲 Sự kiện ngẫu nhiên!`,body:`Dừng lại đây! Mỗi địa điểm có thể gặp sự kiện bất ngờ: 🏷 Khuyến mãi (+VP), 🚦 Kẹt xe (−thể lực), ⛈ Mưa giông (−VP) — cộng/trừ thẳng vào điểm ngày. Bấm Tiếp để chạy nốt.`,placement:`auto`,padding:6,passive:!0,allowSkipResults:!0,advance:`next`,primaryLabel:`Tiếp tục chấm điểm →`,onAdvance:()=>e.resumeReplay()},{id:`finale`,target:`.board-grid, #app`,title:`Bạn đã nắm cách chơi! 🎉`,body:`Bạn vừa đi qua Draft → Xếp lịch → Chấm điểm. Bấm để xem nhanh kết quả của cả hành trình 5 ngày (mô phỏng).`,placement:`auto`,passive:!0,advance:`next`,primaryLabel:`Xem kết quả cuối →`}]}function We(e){return Le||Be()?Le:e.isLoggedIn()?!1:(Ze(e),!0)}function Ge(e){document.addEventListener(`click`,t=>{var n;((n=t.target)?.closest)?.call(n,`[data-tutorial-open]`)&&(t.preventDefault(),Ze(e()))})}var Ke=[`cinematic`,`draft`,`planning`,`simulation`,`result`],qe=null,Je=0;function Ye(){window.clearInterval(Je),Je=0,qe?.remove(),qe=null}function Xe(e,t){Ye();let n=()=>{let n=e.getPhase(),r=!!(n&&Ke.includes(n));if(r&&!qe){let e=document.createElement(`button`);e.type=`button`,e.className=`tour-skip-fab`,e.textContent=`⏭ Bỏ qua phần chơi · Xem kết quả`,e.addEventListener(`click`,t),document.body.appendChild(e),qe=e}else!r&&qe&&(qe.remove(),qe=null)};n(),Je=window.setInterval(n,800)}function Ze(e){if(Le&&Re)return Re;Le=!0;let t=()=>{Le=!1,Re=null,Ve(),e.resumeReplay()},n=()=>{Ye(),e.resumeReplay(),Re?.stop(`skip`),t();let n=e.getPlayers();n.length>0&&Fe(n,e.getDayIndex()+1,e.gotoHome)};return Re=Oe(Ue(e),{onFinish:n,onShowResults:n,onSkip:t,targetTimeoutMs:15e3}),Xe(e,n),Re}var Qe=[{card_id:`SG_FOOD_002`,name:`Ăn Vặt Hồ Con Rùa`,description:`Tụ điểm hóng gió lý tưởng nhưng khói bụi giao thông là điều không thể tránh khỏi.`,image_url:`./assets/cards/saigon/food/sg_food_002.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:5,location:{lat:10.7828,lng:106.6955,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍽️`},{card_id:`SG_FOOD_005`,name:`Súp Cua Chợ Tân Định`,description:`Chén súp nóng hổi, đặc ruột cạnh ngôi chợ hồng biểu tượng. Cứu đói nhanh gọn cho hành trình dài.`,image_url:`./assets/cards/saigon/food/sg_food_005.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:5,location:{lat:10.7895,lng:106.6881,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍽️`},{card_id:`SG_FOOD_006`,name:`Bánh Mì Huỳnh Hoa`,description:`Ổ bánh mì nặng trịch pate, ăn một nửa cũng đủ no. Đổi lại, bạn phải kiên nhẫn xếp hàng mua mang đi.`,image_url:`./assets/cards/saigon/food/sg_food_006.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:2,la:0},base_vp:10,location:{lat:10.7715,lng:106.6931,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🥖`},{card_id:`SG_FOOD_010`,name:`Cơm Tấm Ba Ghiền`,description:`Miếng sườn nướng than to bằng cái đĩa. Trải nghiệm no nê.`,image_url:`./assets/cards/saigon/food/sg_food_010.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`INDOOR`],cost:{xu:2,la:1},base_vp:15,location:{lat:10.7951,lng:106.6781,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🍚`},{card_id:`SG_FOOD_013`,name:`Chè Hà Ký Chợ Lớn`,description:`Chè trứng gà trà, chè mè đen trứ danh. Điểm chốt ngọt ngào sau chuyến khám phá văn hóa phố Tàu.`,image_url:`./assets/cards/saigon/food/sg_food_013.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`INDOOR`],cost:{xu:2,la:0},base_vp:10,location:{lat:10.7516,lng:106.6622,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🍽️`},{card_id:`SG_FOOD_016`,name:`Quán Bụi - Hương Vị Quê Nhà`,description:`Những món ăn thuần Việt được nâng tầm tinh tế. Không gian hoài cổ với chén sành, đũa tre, mang lại lượng điểm ổn định giữa lòng Quận 1.`,image_url:`./assets/cards/saigon/food/sg_food_016.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`INDOOR`],cost:{xu:3,la:0},base_vp:18,location:{lat:10.7831,lng:106.7025,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`EPIC`,icon:`🍽️`},{card_id:`SG_FOOD_031`,name:`Bánh bèo Bà Năm Nữ`,description:`Bánh bèo Bà Năm Nữ đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_031.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.8069,lng:106.6222,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍽️`},{card_id:`SG_FOOD_032`,name:`Bánh canh cua 87 Trần Khắc Chân`,description:`Bánh canh cua 87 Trần Khắc Chân đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_032.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.794716,lng:106.690836,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍽️`},{card_id:`SG_FOOD_033`,name:`Bánh mì chảo Hòa Mã`,description:`Bánh mì chảo Hòa Mã đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_033.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7717,lng:106.6849,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍜`},{card_id:`SG_FOOD_034`,name:`Bánh mì trắng Sài Gòn`,description:`Bánh mì trắng Sài Gòn đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_034.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7699,lng:106.6905,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍜`},{card_id:`SG_FOOD_035`,name:`Bánh tráng kẹp Dì Hoa`,description:`Bánh tráng kẹp Dì Hoa đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_035.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7359,lng:106.7056,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍽️`},{card_id:`SG_FOOD_036`,name:`Bánh đúc nóng Phan Đăng Lưu`,description:`Bánh đúc nóng Phan Đăng Lưu đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_036.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.8004,lng:106.683,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍽️`},{card_id:`SG_FOOD_037`,name:`Bò Nướng Lá Lốt Mỡ Chài Đường Ray`,description:`Bò Nướng Lá Lốt Mỡ Chài Đường Ray đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_037.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7982,lng:106.6759,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍽️`},{card_id:`SG_FOOD_038`,name:`Bò tơ Nhân Phát`,description:`Bò tơ Nhân Phát đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_038.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:3,la:0},base_vp:18,location:{lat:10.7382,lng:106.7047,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`EPIC`,icon:`🍽️`},{card_id:`SG_FOOD_039`,name:`Bún bò chả ghẹ 7 Ghiền`,description:`Bún bò chả ghẹ 7 Ghiền đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_039.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.8369,lng:106.6595,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍜`},{card_id:`SG_FOOD_040`,name:`Bún Bò Nga Bùi`,description:`Bún Bò Nga Bùi đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_040.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7792,lng:106.6655,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍜`},{card_id:`SG_FOOD_041`,name:`Bún mắm Cô Ba`,description:`Bún mắm Cô Ba đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_041.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.839,lng:106.628,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍜`},{card_id:`SG_FOOD_042`,name:`Bún Mọc Ròm Mập`,description:`Bún Mọc Ròm Mập đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_042.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7706,lng:106.6839,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍜`},{card_id:`SG_FOOD_043`,name:`Bún Riêu Gánh - Chợ Bến Thành`,description:`Bún Riêu Gánh - Chợ Bến Thành đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_043.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7735,lng:106.6994,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍜`},{card_id:`SG_FOOD_044`,name:`Bún thịt nướng Hoàng Văn`,description:`Bún thịt nướng Hoàng Văn đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_044.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7849,lng:106.6622,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍜`},{card_id:`SG_FOOD_045`,name:`Bún đậu mắm tôm Mạc Văn Khoa`,description:`Bún đậu mắm tôm Mạc Văn Khoa đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_045.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.79065,lng:106.69069,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍜`},{card_id:`SG_FOOD_046`,name:`Canh Bún Mẹ Tôi`,description:`Canh Bún Mẹ Tôi đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_046.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7921,lng:106.675,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍜`},{card_id:`SG_FOOD_047`,name:`Cháo Lòng Bà Năm`,description:`Cháo Lòng Bà Năm đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_047.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.741,lng:106.713,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍽️`},{card_id:`SG_FOOD_048`,name:`Cháo sườn Chú Chen`,description:`Cháo sườn Chú Chen đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_048.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7644,lng:106.6904,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍽️`},{card_id:`SG_FOOD_049`,name:`Cháo trắng Hàng Xanh`,description:`Cháo trắng Hàng Xanh đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_049.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.8017,lng:106.713,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍽️`},{card_id:`SG_FOOD_050`,name:`Chè Hiển Khánh`,description:`Chè Hiển Khánh đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_050.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7712,lng:106.68,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍨`},{card_id:`SG_FOOD_051`,name:`Cơm Gà Xối Mỡ Su Su`,description:`Cơm Gà Xối Mỡ Su Su đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_051.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7643,lng:106.6889,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍚`},{card_id:`SG_FOOD_052`,name:`Cơm Niêu Sài Gòn`,description:`Cơm Niêu Sài Gòn đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_052.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`INDOOR`],cost:{xu:2,la:1},base_vp:15,location:{lat:10.7763,lng:106.6895,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🍚`},{card_id:`SG_FOOD_053`,name:`Cơm quê Mười Khó`,description:`Cơm quê Mười Khó đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_053.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:2,la:1},base_vp:15,location:{lat:10.7848,lng:106.6883,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🍚`},{card_id:`SG_FOOD_054`,name:`Cơm Tấm Chị Năm`,description:`Cơm Tấm Chị Năm đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_054.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7932,lng:106.6548,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍚`},{card_id:`SG_FOOD_055`,name:`Cơm tấm Phúc Lộc Thọ`,description:`Cơm tấm Phúc Lộc Thọ đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_055.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7626,lng:106.6656,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍚`},{card_id:`SG_FOOD_056`,name:`Dê Cua 245`,description:`Dê Cua 245 đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_056.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7908,lng:106.6947,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍽️`},{card_id:`SG_FOOD_057`,name:`Gà nướng Anh Tư`,description:`Gà nướng Anh Tư đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_057.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.8172,lng:106.698,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍽️`},{card_id:`SG_FOOD_058`,name:`Gỏi khô bò công viên Lê Văn Tám`,description:`Gỏi khô bò công viên Lê Văn Tám đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_058.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7891,lng:106.6918,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍽️`},{card_id:`SG_FOOD_059`,name:`Há Cảo Phánh`,description:`Há Cảo Phánh đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_059.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7535,lng:106.668,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍽️`},{card_id:`SG_FOOD_060`,name:`Hủ Tiếu Hồng Phát`,description:`Hủ Tiếu Hồng Phát đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_060.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.771,lng:106.6867,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍜`},{card_id:`SG_FOOD_061`,name:`Hủ tiếu mực Ông Già Cali`,description:`Hủ tiếu mực Ông Già Cali đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_061.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7696,lng:106.69,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍜`},{card_id:`SG_FOOD_062`,name:`Lam Pizza`,description:`Lam Pizza đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_062.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`INDOOR`],cost:{xu:2,la:1},base_vp:15,location:{lat:10.7837,lng:106.6765,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🍽️`},{card_id:`SG_FOOD_063`,name:`Lin Food & Beer`,description:`Lin Food & Beer là điểm dừng ẩm thực phù hợp để nạp năng lượng giữa hành trình Sài Gòn. Chi phí không quá nhẹ, nhưng đổi lại người chơi có một lượt ăn uống ổn định và nhiều điểm trải nghiệm.`,image_url:`./assets/cards/saigon/food/sg_food_063.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`INDOOR`],cost:{xu:3,la:0},base_vp:18,location:{lat:10.7555,lng:106.632,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`EPIC`,icon:`🍽️`},{card_id:`SG_FOOD_064`,name:`Lẩu Bò Cô Thảo`,description:`Lẩu Bò Cô Thảo đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_064.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:2,la:1},base_vp:15,location:{lat:10.7657,lng:106.6722,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🍲`},{card_id:`SG_FOOD_065`,name:`Lẩu mắm Cô Út`,description:`Lẩu mắm Cô Út đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_065.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:2,la:1},base_vp:15,location:{lat:10.8012,lng:106.6583,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🍲`},{card_id:`SG_FOOD_066`,name:`Mì Quảng Dì Bảy`,description:`Mì Quảng Dì Bảy đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_066.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.8065,lng:106.6248,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍜`},{card_id:`SG_FOOD_067`,name:`Nhà hàng nướng BBQ Plan-K Thảo Điền`,description:`Nhà hàng nướng BBQ Plan-K Thảo Điền là điểm dừng ẩm thực phù hợp để nạp năng lượng giữa hành trình Sài Gòn. Chi phí không quá nhẹ, nhưng đổi lại người chơi có một lượt ăn uống ổn định và nhiều điểm trải nghiệm.`,image_url:`./assets/cards/saigon/food/sg_food_067.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`INDOOR`],cost:{xu:3,la:0},base_vp:18,location:{lat:10.8045,lng:106.7326,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`EPIC`,icon:`🍽️`},{card_id:`SG_FOOD_068`,name:`Phá lấu Rubi`,description:`Phá lấu Rubi đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_068.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7929,lng:106.6505,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍽️`},{card_id:`SG_FOOD_069`,name:`Phở Kiêm`,description:`Phở Kiêm đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_069.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.8396,lng:106.6661,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍜`},{card_id:`SG_FOOD_070`,name:`Phở miến gà Kỳ Đồng`,description:`Phở miến gà Kỳ Đồng đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_070.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7807,lng:106.6812,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍜`},{card_id:`SG_FOOD_071`,name:`Quán Mì Cay Khuya`,description:`Quán Mì Cay Khuya là điểm dừng ẩm thực phù hợp để nạp năng lượng giữa hành trình Sài Gòn. Chi phí không quá nhẹ, nhưng đổi lại người chơi có một lượt ăn uống ổn định và nhiều điểm trải nghiệm.`,image_url:`./assets/cards/saigon/food/sg_food_071.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`INDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7646,lng:106.689,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍜`},{card_id:`SG_FOOD_072`,name:`Quán ăn chay Phương Mai`,description:`Quán ăn chay Phương Mai là điểm dừng ẩm thực phù hợp để nạp năng lượng giữa hành trình Sài Gòn. Chi phí không quá nhẹ, nhưng đổi lại người chơi có một lượt ăn uống ổn định và nhiều điểm trải nghiệm.`,image_url:`./assets/cards/saigon/food/sg_food_072.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`INDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7899,lng:106.6924,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍽️`},{card_id:`SG_FOOD_073`,name:`Quán ăn Hữu Nghị`,description:`Quán ăn Hữu Nghị là điểm dừng ẩm thực phù hợp để nạp năng lượng giữa hành trình Sài Gòn. Chi phí không quá nhẹ, nhưng đổi lại người chơi có một lượt ăn uống ổn định và nhiều điểm trải nghiệm.`,image_url:`./assets/cards/saigon/food/sg_food_073.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`INDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.892,lng:106.5945,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍽️`},{card_id:`SG_FOOD_074`,name:`Quán ăn Ngõ 8`,description:`Quán ăn Ngõ 8 là điểm dừng ẩm thực phù hợp để nạp năng lượng giữa hành trình Sài Gòn. Chi phí không quá nhẹ, nhưng đổi lại người chơi có một lượt ăn uống ổn định và nhiều điểm trải nghiệm.`,image_url:`./assets/cards/saigon/food/sg_food_074.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`INDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7958,lng:106.691,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍽️`},{card_id:`SG_FOOD_075`,name:`Súp cua Hằng`,description:`Súp cua Hằng đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_075.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7591,lng:106.7045,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍽️`},{card_id:`SG_FOOD_076`,name:`Sủi cảo Thiên Thiên`,description:`Sủi cảo Thiên Thiên đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_076.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7508,lng:106.6564,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍽️`},{card_id:`SG_FOOD_077`,name:`Thiêm Huy Mì Gia`,description:`Thiêm Huy Mì Gia đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_077.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`INDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7545,lng:106.664,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍜`},{card_id:`SG_FOOD_078`,name:`Xôi Cadé`,description:`Xôi Cadé đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_078.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:8,location:{lat:10.7542,lng:106.6652,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`COMMON`,icon:`🍨`},{card_id:`SG_FOOD_079`,name:`Ẩm thực sân vườn Mái Lá`,description:`Ẩm thực sân vườn Mái Lá đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_079.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:3,la:0},base_vp:18,location:{lat:10.7447,lng:106.7135,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`EPIC`,icon:`🍽️`},{card_id:`SG_FOOD_080`,name:`Ốc nhớ Sài Gòn`,description:`Ốc nhớ Sài Gòn đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_080.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:2,la:1},base_vp:15,location:{lat:10.7703,lng:106.6465,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🦪`},{card_id:`SG_FOOD_081`,name:`Ốc Tô 224b Xóm Chiếu`,description:`Ốc Tô 224b Xóm Chiếu đại diện cho nhịp ăn uống đường phố quen thuộc của Sài Gòn. Lượt ghé này rẻ, nhanh, dễ chen vào lịch trình và giúp người chơi gom thêm điểm ẩm thực.`,image_url:`./assets/cards/saigon/food/sg_food_081.jpg`,phase_pool:`SAIGON`,tags:[`FOOD`,`OUTDOOR`],cost:{xu:2,la:1},base_vp:15,location:{lat:10.7593,lng:106.7055,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🦪`}],$e=[{card_id:`SG_ACT_001`,name:`Thảo Cầm Viên Sài Gòn`,description:`Lạc bước giữa không gian xanh mát của khu bảo tồn động thực vật lâu đời nhất thành phố. Khuôn viên rộng lớn sẽ ngốn của bạn không ít mồ hôi và sức lực.`,image_url:`./assets/cards/saigon/action/sg_act_001.jpg`,phase_pool:`SAIGON`,tags:[`ACTION`,`OUTDOOR`],cost:{xu:1,la:2},base_vp:15,location:{lat:10.7873344,lng:106.7050566,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`EPIC`,icon:`🎒`},{card_id:`SG_ACT_002`,name:`Phố Tây Bùi Viện`,description:`Nhịp sống cuồng nhiệt không ngủ. Bạn vui hết nấc trong tiếng nhạc xập xình, nhưng việc chen lấn giữa biển người sẽ vắt kiệt thể lực của bạn.`,image_url:`./assets/cards/saigon/action/sg_act_002.jpg`,phase_pool:`SAIGON`,tags:[`ACTION`,`OUTDOOR`],cost:{xu:2,la:2},base_vp:22,location:{lat:10.7674,lng:106.694,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`EPIC`,icon:`🎒`},{card_id:`SG_ACT_004`,name:`Công viên nước Đầm Sen`,description:`Vẫy vùng trong làn nước mát lạnh và thử sức với các ống trượt cảm giác mạnh. Một ngày vui chơi tơi bời nhưng cũng đốt cháy toàn bộ năng lượng.`,image_url:`./assets/cards/saigon/action/sg_act_004.jpg`,phase_pool:`SAIGON`,tags:[`ACTION`,`OUTDOOR`],cost:{xu:2,la:2},base_vp:22,location:{lat:10.7688947,lng:106.6359939,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`EPIC`,icon:`🌳`},{card_id:`SG_ACT_010`,name:`Công viên văn hóa Suối Tiên`,description:`Khu vui chơi giải trí khổng lồ mang đậm màu sắc văn hóa dân tộc. Đi bộ qua các đền đài và tham gia vô vàn trò chơi sẽ rút cạn sức lực của bạn.`,image_url:`./assets/cards/saigon/action/sg_act_010.jpg`,phase_pool:`SAIGON`,tags:[`ACTION`,`OUTDOOR`],cost:{xu:2,la:3},base_vp:25,location:{lat:10.8661863,lng:106.8031678,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`LEGENDARY`,icon:`🌳`},{card_id:`SG_ACT_011`,name:`Khu căn cứ Vàm Sát Đảo Khỉ`,description:`Hành trình mạo hiểm tiến sâu vào khu dự trữ sinh quyển ngập mặn. Thách thức lớn về cả khoảng cách di chuyển lẫn sức chịu đựng trước thiên nhiên hoang dã.`,image_url:`./assets/cards/saigon/action/sg_act_011.jpg`,phase_pool:`SAIGON`,tags:[`ACTION`,`OUTDOOR`],cost:{xu:3,la:3},base_vp:35,location:{lat:10.4094821,lng:106.888644,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`LEGENDARY`,icon:`🎒`},{card_id:`SG_ACT_012`,name:`Phố đi bộ Nguyễn Huệ`,description:`Tản bộ thong dong trên con phố hiện đại bậc nhất nhộn nhịp người qua lại. Khá dễ chịu vào buổi tối nhưng sẽ rút sức bạn nhanh chóng nếu ghé qua vào buổi trưa.`,image_url:`./assets/cards/saigon/action/sg_act_012.jpg`,phase_pool:`SAIGON`,tags:[`ACTION`,`OUTDOOR`],cost:{xu:0,la:1},base_vp:10,location:{lat:10.7740664,lng:106.7036542,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🎒`},{card_id:`SG_ACT_018`,name:`Công viên Tao Đàn`,description:`Lá phổi xanh của thành phố ngập tràn bóng cây cổ thụ. Dạo bước trên những con đường rợp bóng mát là cách tuyệt vời để thư giãn đôi chân mỏi mệt.`,image_url:`./assets/cards/saigon/action/sg_act_018.jpg`,phase_pool:`SAIGON`,tags:[`ACTION`,`OUTDOOR`],cost:{xu:0,la:1},base_vp:8,location:{lat:10.7755796,lng:106.6920797,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🌳`},{card_id:`SG_ACT_020`,name:`Trải nghiệm Saigon Waterbus`,description:`Lướt trên mặt sóng ngắm nhìn toàn cảnh đường chân trời hiện đại dọc hai bờ sông. Trải nghiệm ngắm cảnh thư thái tuyệt vời mà không đòi hỏi nhiều sự vận động.`,image_url:`./assets/cards/saigon/action/sg_act_020.jpg`,phase_pool:`SAIGON`,tags:[`ACTION`,`OUTDOOR`],cost:{xu:1,la:0},base_vp:12,location:{lat:10.773403,lng:106.705552,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🎒`},{card_id:`SG_ACT_021`,name:`Bột chiên Đức Hoa`,description:`Bột chiên Đức Hoa là điểm khám phá ngoài trời giúp hành trình có thêm nhịp di chuyển, ngắm cảnh và tương tác với không gian đô thị Sài Gòn. Người chơi cần cân bằng thể lực để tận dụng tốt lượt này.`,image_url:`./assets/cards/saigon/action/sg_act_021.jpg`,phase_pool:`SAIGON`,tags:[`ACTION`,`OUTDOOR`],cost:{xu:0,la:1},base_vp:8,location:{lat:10.7612,lng:106.6679,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🧭`},{card_id:`SG_ACT_022`,name:`Công viên 23 tháng 9`,description:`Công viên 23 tháng 9 là điểm khám phá ngoài trời giúp hành trình có thêm nhịp di chuyển, ngắm cảnh và tương tác với không gian đô thị Sài Gòn. Người chơi cần cân bằng thể lực để tận dụng tốt lượt này.`,image_url:`./assets/cards/saigon/action/sg_act_022.jpg`,phase_pool:`SAIGON`,tags:[`ACTION`,`OUTDOOR`],cost:{xu:0,la:1},base_vp:8,location:{lat:10.7691,lng:106.6907,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🌳`},{card_id:`SG_ACT_023`,name:`Công viên Gia Định`,description:`Công viên Gia Định là điểm khám phá ngoài trời giúp hành trình có thêm nhịp di chuyển, ngắm cảnh và tương tác với không gian đô thị Sài Gòn. Người chơi cần cân bằng thể lực để tận dụng tốt lượt này.`,image_url:`./assets/cards/saigon/action/sg_act_023.jpg`,phase_pool:`SAIGON`,tags:[`ACTION`,`OUTDOOR`],cost:{xu:0,la:1},base_vp:8,location:{lat:10.81396,lng:106.67826,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🌳`},{card_id:`SG_ACT_024`,name:`Công viên Grand Park`,description:`Công viên Grand Park là điểm khám phá ngoài trời giúp hành trình có thêm nhịp di chuyển, ngắm cảnh và tương tác với không gian đô thị Sài Gòn. Người chơi cần cân bằng thể lực để tận dụng tốt lượt này.`,image_url:`./assets/cards/saigon/action/sg_act_024.jpg`,phase_pool:`SAIGON`,tags:[`ACTION`,`OUTDOOR`],cost:{xu:0,la:1},base_vp:8,location:{lat:10.839,lng:106.8335,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🌳`},{card_id:`SG_ACT_025`,name:`Công viên Hồ Bán Nguyệt`,description:`Công viên Hồ Bán Nguyệt là điểm khám phá ngoài trời giúp hành trình có thêm nhịp di chuyển, ngắm cảnh và tương tác với không gian đô thị Sài Gòn. Người chơi cần cân bằng thể lực để tận dụng tốt lượt này.`,image_url:`./assets/cards/saigon/action/sg_act_025.jpg`,phase_pool:`SAIGON`,tags:[`ACTION`,`OUTDOOR`],cost:{xu:0,la:1},base_vp:8,location:{lat:10.7297,lng:106.7186,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🌳`},{card_id:`SG_ACT_026`,name:`Công viên Thỏ Trắng`,description:`Công viên Thỏ Trắng là điểm khám phá ngoài trời giúp hành trình có thêm nhịp di chuyển, ngắm cảnh và tương tác với không gian đô thị Sài Gòn. Người chơi cần cân bằng thể lực để tận dụng tốt lượt này.`,image_url:`./assets/cards/saigon/action/sg_act_026.jpg`,phase_pool:`SAIGON`,tags:[`ACTION`,`OUTDOOR`],cost:{xu:0,la:1},base_vp:8,location:{lat:10.7824,lng:106.6685,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🌳`},{card_id:`SG_ACT_027`,name:`Cầu Mống`,description:`Cầu Mống là điểm khám phá ngoài trời giúp hành trình có thêm nhịp di chuyển, ngắm cảnh và tương tác với không gian đô thị Sài Gòn. Người chơi cần cân bằng thể lực để tận dụng tốt lượt này.`,image_url:`./assets/cards/saigon/action/sg_act_027.jpg`,phase_pool:`SAIGON`,tags:[`ACTION`,`OUTDOOR`],cost:{xu:1,la:1},base_vp:12,location:{lat:10.7687,lng:106.7036,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🌉`},{card_id:`SG_ACT_028`,name:`Cầu Phú Mỹ`,description:`Cầu Phú Mỹ là điểm khám phá ngoài trời giúp hành trình có thêm nhịp di chuyển, ngắm cảnh và tương tác với không gian đô thị Sài Gòn. Người chơi cần cân bằng thể lực để tận dụng tốt lượt này.`,image_url:`./assets/cards/saigon/action/sg_act_028.jpg`,phase_pool:`SAIGON`,tags:[`ACTION`,`OUTDOOR`],cost:{xu:2,la:2},base_vp:22,location:{lat:10.7342,lng:106.7484,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`EPIC`,icon:`🌉`},{card_id:`SG_ACT_029`,name:`Cầu Ánh Sao`,description:`Cầu Ánh Sao là điểm khám phá ngoài trời giúp hành trình có thêm nhịp di chuyển, ngắm cảnh và tương tác với không gian đô thị Sài Gòn. Người chơi cần cân bằng thể lực để tận dụng tốt lượt này.`,image_url:`./assets/cards/saigon/action/sg_act_029.jpg`,phase_pool:`SAIGON`,tags:[`ACTION`,`OUTDOOR`],cost:{xu:1,la:1},base_vp:12,location:{lat:10.7288,lng:106.7185,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🌉`},{card_id:`SG_ACT_030`,name:`Hồ Đá Thủ Đức`,description:`Hồ Đá Thủ Đức là điểm khám phá ngoài trời giúp hành trình có thêm nhịp di chuyển, ngắm cảnh và tương tác với không gian đô thị Sài Gòn. Người chơi cần cân bằng thể lực để tận dụng tốt lượt này.`,image_url:`./assets/cards/saigon/action/sg_act_030.jpg`,phase_pool:`SAIGON`,tags:[`ACTION`,`OUTDOOR`],cost:{xu:0,la:1},base_vp:8,location:{lat:10.8839,lng:106.8,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🧭`},{card_id:`SG_ACT_031`,name:`Khu du lịch Bình Quới`,description:`Khu du lịch Bình Quới là điểm khám phá ngoài trời giúp hành trình có thêm nhịp di chuyển, ngắm cảnh và tương tác với không gian đô thị Sài Gòn. Người chơi cần cân bằng thể lực để tận dụng tốt lượt này.`,image_url:`./assets/cards/saigon/action/sg_act_031.jpg`,phase_pool:`SAIGON`,tags:[`ACTION`,`OUTDOOR`],cost:{xu:2,la:2},base_vp:22,location:{lat:10.8337,lng:106.7332,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`EPIC`,icon:`🧭`},{card_id:`SG_ACT_032`,name:`Khu du lịch Đại Nam`,description:`Khu du lịch Đại Nam là điểm khám phá ngoài trời giúp hành trình có thêm nhịp di chuyển, ngắm cảnh và tương tác với không gian đô thị Sài Gòn. Người chơi cần cân bằng thể lực để tận dụng tốt lượt này.`,image_url:`./assets/cards/saigon/action/sg_act_032.jpg`,phase_pool:`SAIGON`,tags:[`ACTION`,`OUTDOOR`],cost:{xu:3,la:3},base_vp:30,location:{lat:11.0557,lng:106.6649,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`LEGENDARY`,icon:`🧭`},{card_id:`SG_ACT_033`,name:`Landmark 81`,description:`Landmark 81 là điểm khám phá ngoài trời giúp hành trình có thêm nhịp di chuyển, ngắm cảnh và tương tác với không gian đô thị Sài Gòn. Người chơi cần cân bằng thể lực để tận dụng tốt lượt này.`,image_url:`./assets/cards/saigon/action/sg_act_033.jpg`,phase_pool:`SAIGON`,tags:[`ACTION`,`OUTDOOR`],cost:{xu:2,la:2},base_vp:22,location:{lat:10.7944,lng:106.7217,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`EPIC`,icon:`🏙️`},{card_id:`SG_ACT_034`,name:`Nóc hầm Thủ Thiêm`,description:`Nóc hầm Thủ Thiêm là điểm khám phá ngoài trời giúp hành trình có thêm nhịp di chuyển, ngắm cảnh và tương tác với không gian đô thị Sài Gòn. Người chơi cần cân bằng thể lực để tận dụng tốt lượt này.`,image_url:`./assets/cards/saigon/action/sg_act_034.jpg`,phase_pool:`SAIGON`,tags:[`ACTION`,`OUTDOOR`],cost:{xu:1,la:1},base_vp:12,location:{lat:10.772,lng:106.7141,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🌉`},{card_id:`SG_ACT_035`,name:`Tháp Bitexco`,description:`Tháp Bitexco là điểm khám phá ngoài trời giúp hành trình có thêm nhịp di chuyển, ngắm cảnh và tương tác với không gian đô thị Sài Gòn. Người chơi cần cân bằng thể lực để tận dụng tốt lượt này.`,image_url:`./assets/cards/saigon/action/sg_act_035.jpg`,phase_pool:`SAIGON`,tags:[`ACTION`,`OUTDOOR`],cost:{xu:2,la:2},base_vp:22,location:{lat:10.7717,lng:106.7044,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`EPIC`,icon:`🏙️`}],et=[{card_id:`SG_CULT_001`,name:`Dinh Độc Lập`,description:`Chứng nhân lịch sử với kiến trúc độc bản. Khám phá các sảnh đường khổng lồ và đường hầm bí mật sẽ tiêu tốn không ít thể lực của bạn.`,image_url:`./assets/cards/saigon/culture/sg_cult_001.jpg`,phase_pool:`SAIGON`,tags:[`CULTURE`,`INDOOR`,`OUTDOOR`],cost:{xu:3,la:1},base_vp:22,location:{lat:10.7769942,lng:106.6953021,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`EPIC`,icon:`🏯`},{card_id:`SG_CULT_002`,name:`Bưu điện trung tâm Sài Gòn`,description:`Mái vòm thép vĩ đại mang đậm dấu ấn hoài niệm. Gửi một tấm bưu thiếp và tận hưởng không gian kiến trúc Pháp an toàn, mát mẻ.`,image_url:`./assets/cards/saigon/culture/sg_cult_002.jpg`,phase_pool:`SAIGON`,tags:[`CULTURE`,`INDOOR`],cost:{xu:1,la:0},base_vp:10,location:{lat:10.7799129,lng:106.699902,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🏯`},{card_id:`SG_CULT_003`,name:`Nhà thờ Đức Bà Sài Gòn`,description:`Biểu tượng tôn giáo với gạch nung đỏ rực. Chiêm ngưỡng vẻ đẹp cổ kính từ bên ngoài và lắng nghe tiếng chuông ngân vang giữa phố thị.`,image_url:`./assets/cards/saigon/culture/sg_cult_003.jpg`,phase_pool:`SAIGON`,tags:[`CULTURE`,`OUTDOOR`],cost:{xu:0,la:1},base_vp:8,location:{lat:10.7797855,lng:106.6990189,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`⛪`},{card_id:`SG_CULT_004`,name:`Bảo tàng Chứng tích Chiến tranh`,description:`Trải nghiệm lịch sử sâu sắc và nặng nề. Những tư liệu chân thực khiến bạn tĩnh lặng và tiêu hao đáng kể năng lượng tinh thần.`,image_url:`./assets/cards/saigon/culture/sg_cult_004.jpg`,phase_pool:`SAIGON`,tags:[`CULTURE`,`INDOOR`],cost:{xu:2,la:1},base_vp:15,location:{lat:10.7795106,lng:106.6920916,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🏛️`},{card_id:`SG_CULT_005`,name:`Bảo tàng Lịch sử Thành phố Hồ Chí Minh`,description:`Kho tàng di sản ngàn năm của dân tộc. Đi bộ mải miết qua các gian trưng bày rộng lớn đòi hỏi sự bền bỉ của đôi chân.`,image_url:`./assets/cards/saigon/culture/sg_cult_005.jpg`,phase_pool:`SAIGON`,tags:[`CULTURE`,`INDOOR`],cost:{xu:2,la:1},base_vp:15,location:{lat:10.788075,lng:106.7047291,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🏛️`},{card_id:`SG_CULT_006`,name:`Bảo tàng Mỹ thuật Thành phố Hồ Chí Minh`,description:`Tòa dinh thự 99 cửa với hành lang ngập nắng. Trạm dừng chân nghệ thuật tuyệt đẹp để cho ra đời những bức ảnh lưu niệm ấn tượng.`,image_url:`./assets/cards/saigon/culture/sg_cult_006.jpg`,phase_pool:`SAIGON`,tags:[`CULTURE`,`INDOOR`],cost:{xu:2,la:0},base_vp:15,location:{lat:10.7699472,lng:106.6992162,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🏛️`},{card_id:`SG_CULT_007`,name:`Nhà hát Thành phố Hồ Chí Minh`,description:`Thưởng thức nghệ thuật thính phòng trong một công trình tráng lệ. Một buổi tối đắt đỏ nhưng mang lại trải nghiệm văn hóa đẳng cấp.`,image_url:`./assets/cards/saigon/culture/sg_cult_007.jpg`,phase_pool:`SAIGON`,tags:[`CULTURE`,`INDOOR`,`OUTDOOR`],cost:{xu:5,la:0},base_vp:35,location:{lat:10.7766128,lng:106.7031715,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`LEGENDARY`,icon:`🏯`},{card_id:`SG_CULT_009`,name:`Chùa Ngọc Hoàng`,description:`Ngôi chùa cổ linh thiêng ngập trong khói nhang. Nơi du khách tìm kiếm sự bình an và tĩnh lặng giữa nhịp sống hối hả.`,image_url:`./assets/cards/saigon/culture/sg_cult_009.jpg`,phase_pool:`SAIGON`,tags:[`CULTURE`,`INDOOR`],cost:{xu:1,la:0},base_vp:12,location:{lat:10.7919963,lng:106.6981791,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🛕`},{card_id:`SG_CULT_010`,name:`Miếu Bà Thiên Hậu - Hội Quán Tuệ Thành`,description:`Tuyệt tác kiến trúc của người Hoa tại Chợ Lớn. Khói nhang vòng cuộn tỏa mang theo những lời cầu nguyện bình an che chở bạn khỏi muộn phiền.`,image_url:`./assets/cards/saigon/culture/sg_cult_010.jpg`,phase_pool:`SAIGON`,tags:[`CULTURE`,`INDOOR`],cost:{xu:1,la:0},base_vp:12,location:{lat:10.7532496,lng:106.6611735,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🛕`},{card_id:`SG_CULT_015`,name:`Bến Nhà Rồng - Bảo tàng Hồ Chí Minh`,description:`Tòa nhà mang kiến trúc Á-Âu bên bờ sông lộng gió. Không gian lịch sử hào hùng cùng tầm nhìn thoáng đãng ra dòng sông rộng lớn.`,image_url:`./assets/cards/saigon/culture/sg_cult_015.jpg`,phase_pool:`SAIGON`,tags:[`CULTURE`,`INDOOR`,`OUTDOOR`],cost:{xu:3,la:1},base_vp:20,location:{lat:10.7682488,lng:106.7068028,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`EPIC`,icon:`🏛️`},{card_id:`SG_CULT_017`,name:`Địa Đạo Củ Chi - Bến Dược`,description:`Hành trình luồn lách dưới lòng đất hẹp. Một thử thách sinh tồn vắt kiệt thể lực và tốn kém thời gian đi lại, nhưng trải nghiệm lịch sử mang lại thực sự vô giá.`,image_url:`./assets/cards/saigon/culture/sg_cult_017.jpg`,phase_pool:`SAIGON`,tags:[`CULTURE`,`OUTDOOR`],cost:{xu:4,la:3},base_vp:40,location:{lat:11.1463927,lng:106.45944,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`LEGENDARY`,icon:`🏯`},{card_id:`SG_CULT_018`,name:`Chiến khu Rừng Sác`,description:`Khám phá căn cứ địa giữa rừng ngập mặn Cần Giờ. Hành trình lội rừng vất vả và chặng đường dài sẽ thử thách sức chịu đựng của bạn.`,image_url:`./assets/cards/saigon/culture/sg_cult_018.jpg`,phase_pool:`SAIGON`,tags:[`CULTURE`,`OUTDOOR`],cost:{xu:4,la:2},base_vp:35,location:{lat:10.4155579,lng:106.8818514,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`LEGENDARY`,icon:`🏯`},{card_id:`SG_CULT_019`,name:`Chùa Bửu Long`,description:`Lộng lẫy như một cung điện Thái Lan thu nhỏ ẩn mình ở vùng ven thành phố. Bạn sẽ mất kha khá thời gian và sức lực để đến được đây, nhưng khung cảnh thì hoàn toàn xứng đáng.`,image_url:`./assets/cards/saigon/culture/sg_cult_019.jpg`,phase_pool:`SAIGON`,tags:[`CULTURE`,`OUTDOOR`],cost:{xu:2,la:2},base_vp:25,location:{lat:10.8788722,lng:106.8350287,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`EPIC`,icon:`🛕`},{card_id:`SG_CULT_020`,name:`Khu Tưởng niệm Liệt sĩ Ngã ba Giồng`,description:`Di tích lịch sử oai hùng nằm lặng lẽ ở ngoại ô Hóc Môn. Một chuyến đi dài về vùng ven sẽ thử thách tính kiên nhẫn và sức bền của bất kỳ đôi chân nào.`,image_url:`./assets/cards/saigon/culture/sg_cult_020.jpg`,phase_pool:`SAIGON`,tags:[`CULTURE`,`OUTDOOR`],cost:{xu:1,la:2},base_vp:25,location:{lat:10.868225,lng:106.5585429,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`EPIC`,icon:`🏯`},{card_id:`SG_CULT_024`,name:`Bảo tàng Phụ nữ Nam bộ`,description:`Tìm hiểu về vẻ đẹp và sự kiên cường của người phụ nữ Nam Bộ. Một không gian mang tính giáo dục và là trạm dừng chân an toàn khỏi thời tiết khắc nghiệt.`,image_url:`./assets/cards/saigon/culture/sg_cult_024.jpg`,phase_pool:`SAIGON`,tags:[`CULTURE`,`INDOOR`],cost:{xu:1,la:0},base_vp:10,location:{lat:10.7836813,lng:106.6876327,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🏛️`},{card_id:`SG_CULT_030`,name:`Bảo tàng TP.HCM (Dinh Gia Long)`,description:`Khám phá câu chuyện phát triển của thành phố trong tòa dinh thự cổ kính. Cầu thang gỗ và những hành lang rộng mở đem đến sự thư thái tuyệt đối.`,image_url:`./assets/cards/saigon/culture/sg_cult_030.jpg`,phase_pool:`SAIGON`,tags:[`CULTURE`,`INDOOR`],cost:{xu:2,la:0},base_vp:15,location:{lat:10.7758,lng:106.6997,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🏛️`},{card_id:`SG_CULT_033`,name:`Bảo tàng Y học Cổ truyền Việt Nam (FITO Museum)`,description:`Một bảo tàng tư nhân độc đáo với kiến trúc gỗ chạm khắc tinh xảo. Đắt tiền, nhưng trải nghiệm không gian y học cổ truyền dịu mát là vô giá.`,image_url:`./assets/cards/saigon/culture/sg_cult_033.jpg`,phase_pool:`SAIGON`,tags:[`CULTURE`,`INDOOR`],cost:{xu:3,la:0},base_vp:18,location:{lat:10.7766,lng:106.6738,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`EPIC`,icon:`🏛️`},{card_id:`SG_CULT_036`,name:`Tu viện Khánh An`,description:`Góc Nhật Bản thu nhỏ với những mảng màu nâu trầm và mái ngói uốn lượn. Nằm khá xa trung tâm thành phố, đòi hỏi bạn phải có một lịch trình di chuyển thật khéo léo.`,image_url:`./assets/cards/saigon/culture/sg_cult_036.jpg`,phase_pool:`SAIGON`,tags:[`CULTURE`,`INDOOR`,`OUTDOOR`],cost:{xu:2,la:1},base_vp:20,location:{lat:10.8705,lng:106.6713,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`EPIC`,icon:`🏯`},{card_id:`SG_CULT_037`,name:`Chợ Bến Thành`,description:`Chợ Bến Thành là mốc văn hóa - lịch sử đáng chú ý trong bản đồ Sài Gòn. Ghé qua nơi này giúp hành trình có thêm chiều sâu và lượng điểm ổn định.`,image_url:`./assets/cards/saigon/culture/sg_cult_037.jpg`,phase_pool:`SAIGON`,tags:[`CULTURE`,`OUTDOOR`],cost:{xu:1,la:1},base_vp:12,location:{lat:10.772,lng:106.6983,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🛍️`},{card_id:`SG_CULT_038`,name:`Nhà thờ Chợ Quán`,description:`Nhà thờ Chợ Quán mang lại một khoảng lặng tín ngưỡng giữa đô thị đông đúc. Điểm đến này không quá tốn xu, nhưng đòi hỏi người chơi sắp xếp nhịp di chuyển hợp lý.`,image_url:`./assets/cards/saigon/culture/sg_cult_038.jpg`,phase_pool:`SAIGON`,tags:[`CULTURE`,`OUTDOOR`],cost:{xu:1,la:1},base_vp:12,location:{lat:10.7525,lng:106.6718,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`⛪`},{card_id:`SG_CULT_039`,name:`Nhà thờ Hạnh Thông Tây`,description:`Nhà thờ Hạnh Thông Tây mang lại một khoảng lặng tín ngưỡng giữa đô thị đông đúc. Điểm đến này không quá tốn xu, nhưng đòi hỏi người chơi sắp xếp nhịp di chuyển hợp lý.`,image_url:`./assets/cards/saigon/culture/sg_cult_039.jpg`,phase_pool:`SAIGON`,tags:[`CULTURE`,`OUTDOOR`],cost:{xu:1,la:1},base_vp:12,location:{lat:10.8335,lng:106.6589,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`⛪`},{card_id:`SG_CULT_040`,name:`Tịnh xá Ngọc Phương`,description:`Tịnh xá Ngọc Phương mang lại một khoảng lặng tín ngưỡng giữa đô thị đông đúc. Điểm đến này không quá tốn xu, nhưng đòi hỏi người chơi sắp xếp nhịp di chuyển hợp lý.`,image_url:`./assets/cards/saigon/culture/sg_cult_040.jpg`,phase_pool:`SAIGON`,tags:[`CULTURE`,`OUTDOOR`],cost:{xu:1,la:1},base_vp:12,location:{lat:10.8183,lng:106.695,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🏯`},{card_id:`SG_CULT_041`,name:`Đình Bình Đông`,description:`Đình Bình Đông mang lại một khoảng lặng tín ngưỡng giữa đô thị đông đúc. Điểm đến này không quá tốn xu, nhưng đòi hỏi người chơi sắp xếp nhịp di chuyển hợp lý.`,image_url:`./assets/cards/saigon/culture/sg_cult_041.jpg`,phase_pool:`SAIGON`,tags:[`CULTURE`,`OUTDOOR`],cost:{xu:1,la:1},base_vp:12,location:{lat:10.7452,lng:106.6362,is_virtual:!1,label:`Sài Gòn`},on_play_effect:{has_effect:!1,effect_type:`NONE`,effect_value:0},rarity:`UNCOMMON`,icon:`🏯`}],tt=[{card_id:`SG_UTIL_001`,name:`Trụ ATM`,description:`Ngân sách cạn kiệt, bạn rảo bộ tìm bốt ATM để tiếp tế đạn dược. Mỏi chân đôi chút nhưng ví tiền lại rủng rỉnh.`,image_url:`./assets/cards/saigon/utility/sg_util_001.jpg`,phase_pool:`SAIGON`,tags:[`UTILITY`,`INDOOR`],cost:{xu:0,la:1},base_vp:0,location:{lat:10.7715,lng:106.6931,is_virtual:!0,label:`Sài Gòn`},on_play_effect:{has_effect:!0,effect_type:`RECOVER_XU`,effect_value:2},rarity:`UNCOMMON`,icon:`💰`},{card_id:`SG_UTIL_002`,name:`Trụ ATM`,description:`Ngân sách cạn kiệt, bạn rảo bộ tìm bốt ATM để tiếp tế đạn dược. Mỏi chân đôi chút nhưng ví tiền lại rủng rỉnh.`,image_url:`./assets/cards/saigon/utility/sg_util_002.jpg`,phase_pool:`SAIGON`,tags:[`UTILITY`,`INDOOR`],cost:{xu:0,la:1},base_vp:0,location:{lat:10.7715,lng:106.6931,is_virtual:!0,label:`Sài Gòn`},on_play_effect:{has_effect:!0,effect_type:`RECOVER_XU`,effect_value:2},rarity:`UNCOMMON`,icon:`💰`},{card_id:`SG_UTIL_003`,name:`Voucher Xe Công Nghệ`,description:`Chớp được mã gọi xe giá hời trên ứng dụng. Ngồi ô tô máy lạnh cho phép bạn nhảy cóc đến bất cứ đâu mà không lo mỏi chân.`,image_url:`./assets/cards/saigon/utility/sg_util_003.jpg`,phase_pool:`SAIGON`,tags:[`UTILITY`,`INDOOR`],cost:{xu:1,la:0},base_vp:0,location:{lat:10.7715,lng:106.6931,is_virtual:!0,label:`Sài Gòn`},on_play_effect:{has_effect:!0,effect_type:`IGNORE_DISTANCE_NEXT`,effect_value:1},rarity:`COMMON`,icon:`🎟️`},{card_id:`SG_UTIL_004`,name:`Voucher Xe Công Nghệ`,description:`Chớp được mã gọi xe giá hời trên ứng dụng. Ngồi ô tô máy lạnh cho phép bạn nhảy cóc đến bất cứ đâu mà không lo mỏi chân.`,image_url:`./assets/cards/saigon/utility/sg_util_004.jpg`,phase_pool:`SAIGON`,tags:[`UTILITY`,`INDOOR`],cost:{xu:1,la:0},base_vp:0,location:{lat:10.7715,lng:106.6931,is_virtual:!0,label:`Sài Gòn`},on_play_effect:{has_effect:!0,effect_type:`IGNORE_DISTANCE_NEXT`,effect_value:1},rarity:`COMMON`,icon:`🎟️`},{card_id:`SG_UTIL_005`,name:`Voucher Giảm Giá`,description:`Thu thập được một mã khuyến mãi chớp nhoáng. Thẻ này sẽ giúp bạn giảm đáng kể chi phí cho hoạt động đắt đỏ tiếp theo.`,image_url:`./assets/cards/saigon/utility/sg_util_005.jpg`,phase_pool:`SAIGON`,tags:[`UTILITY`,`INDOOR`,`OUTDOOR`],cost:{xu:0,la:0},base_vp:0,location:{lat:10.7715,lng:106.6931,is_virtual:!0,label:`Sài Gòn`},on_play_effect:{has_effect:!0,effect_type:`DISCOUNT_XU_NEXT`,effect_value:2},rarity:`COMMON`,icon:`🎟️`},{card_id:`SG_UTIL_006`,name:`Voucher Giảm Giá`,description:`Thu thập được một mã khuyến mãi chớp nhoáng. Thẻ này sẽ giúp bạn giảm đáng kể chi phí cho hoạt động đắt đỏ tiếp theo.`,image_url:`./assets/cards/saigon/utility/sg_util_006.jpg`,phase_pool:`SAIGON`,tags:[`UTILITY`,`INDOOR`,`OUTDOOR`],cost:{xu:0,la:0},base_vp:0,location:{lat:10.7715,lng:106.6931,is_virtual:!0,label:`Sài Gòn`},on_play_effect:{has_effect:!0,effect_type:`DISCOUNT_XU_NEXT`,effect_value:2},rarity:`COMMON`,icon:`🎟️`},{card_id:`SG_UTIL_007`,name:`Xe Đạp Công Cộng`,description:`Quét mã thuê một chiếc xe đạp để băng qua dòng xe kẹt cứng. Né được thuật toán trừ điểm khoảng cách nhưng bạn sẽ toát mồ hôi hột.`,image_url:`./assets/cards/saigon/utility/sg_util_007.jpg`,phase_pool:`SAIGON`,tags:[`UTILITY`,`OUTDOOR`],cost:{xu:0,la:2},base_vp:0,location:{lat:10.7715,lng:106.6931,is_virtual:!0,label:`Sài Gòn`},on_play_effect:{has_effect:!0,effect_type:`IGNORE_DISTANCE_NEXT`,effect_value:1},rarity:`EPIC`,icon:`🚲`},{card_id:`SG_UTIL_008`,name:`Xe Đạp Công Cộng`,description:`Quét mã thuê một chiếc xe đạp để băng qua dòng xe kẹt cứng. Né được thuật toán trừ điểm khoảng cách nhưng bạn sẽ toát mồ hôi hột.`,image_url:`./assets/cards/saigon/utility/sg_util_008.jpg`,phase_pool:`SAIGON`,tags:[`UTILITY`,`OUTDOOR`],cost:{xu:0,la:2},base_vp:0,location:{lat:10.7715,lng:106.6931,is_virtual:!0,label:`Sài Gòn`},on_play_effect:{has_effect:!0,effect_type:`IGNORE_DISTANCE_NEXT`,effect_value:1},rarity:`EPIC`,icon:`🚲`},{card_id:`SG_UTIL_009`,name:`Tiệm Massage Chân`,description:`Ngâm chân thảo mộc và ấn huyệt chuyên sâu. Một khoản đầu tư xứng đáng để đôi chân được hồi sinh sau chuỗi ngày cuốc bộ rã rời.`,image_url:`./assets/cards/saigon/utility/sg_util_009.jpg`,phase_pool:`SAIGON`,tags:[`UTILITY`,`INDOOR`],cost:{xu:2,la:0},base_vp:0,location:{lat:10.7715,lng:106.6931,is_virtual:!0,label:`Sài Gòn`},on_play_effect:{has_effect:!0,effect_type:`RECOVER_LA`,effect_value:3},rarity:`UNCOMMON`,icon:`💆`},{card_id:`SG_UTIL_010`,name:`Tiệm Massage Chân`,description:`Ngâm chân thảo mộc và ấn huyệt chuyên sâu. Một khoản đầu tư xứng đáng để đôi chân được hồi sinh sau chuỗi ngày cuốc bộ rã rời.`,image_url:`./assets/cards/saigon/utility/sg_util_010.jpg`,phase_pool:`SAIGON`,tags:[`UTILITY`,`INDOOR`],cost:{xu:2,la:0},base_vp:0,location:{lat:10.7715,lng:106.6931,is_virtual:!0,label:`Sài Gòn`},on_play_effect:{has_effect:!0,effect_type:`RECOVER_LA`,effect_value:3},rarity:`UNCOMMON`,icon:`💆`},{card_id:`SG_UTIL_011`,name:`Cửa Hàng Tiện Lợi 24/7`,description:`Đẩy cửa bước vào, luồng khí lạnh phả vào mặt lập tức xua tan cái nóng. Mua tạm chai nước suối và đứng hưởng sái điều hòa.`,image_url:`./assets/cards/saigon/utility/sg_util_011.jpg`,phase_pool:`SAIGON`,tags:[`UTILITY`,`INDOOR`],cost:{xu:0,la:0},base_vp:0,location:{lat:10.7715,lng:106.6931,is_virtual:!0,label:`Sài Gòn`},on_play_effect:{has_effect:!0,effect_type:`RECOVER_LA`,effect_value:1},rarity:`COMMON`,icon:`💆`},{card_id:`SG_UTIL_012`,name:`Cửa Hàng Tiện Lợi 24/7`,description:`Đẩy cửa bước vào, luồng khí lạnh phả vào mặt lập tức xua tan cái nóng. Mua tạm chai nước suối và đứng hưởng sái điều hòa.`,image_url:`./assets/cards/saigon/utility/sg_util_012.jpg`,phase_pool:`SAIGON`,tags:[`UTILITY`,`INDOOR`],cost:{xu:0,la:0},base_vp:0,location:{lat:10.7715,lng:106.6931,is_virtual:!0,label:`Sài Gòn`},on_play_effect:{has_effect:!0,effect_type:`RECOVER_LA`,effect_value:1},rarity:`COMMON`,icon:`💆`},{card_id:`SG_UTIL_013`,name:`Tiệm Gội Đầu Dưỡng Sinh`,description:`Đắm chìm trong hương sả chanh và những động tác xoa bóp điêu luyện. Trải nghiệm thư giãn đặc sản này giúp bạn rũ bỏ mọi mệt mỏi.`,image_url:`./assets/cards/saigon/utility/sg_util_013.jpg`,phase_pool:`SAIGON`,tags:[`UTILITY`,`INDOOR`],cost:{xu:1,la:0},base_vp:0,location:{lat:10.7715,lng:106.6931,is_virtual:!0,label:`Sài Gòn`},on_play_effect:{has_effect:!0,effect_type:`RECOVER_LA`,effect_value:2},rarity:`COMMON`,icon:`💆`},{card_id:`SG_UTIL_014`,name:`Tiệm Gội Đầu Dưỡng Sinh`,description:`Đắm chìm trong hương sả chanh và những động tác xoa bóp điêu luyện. Trải nghiệm thư giãn đặc sản này giúp bạn rũ bỏ mọi mệt mỏi.`,image_url:`./assets/cards/saigon/utility/sg_util_014.jpg`,phase_pool:`SAIGON`,tags:[`UTILITY`,`INDOOR`],cost:{xu:1,la:0},base_vp:0,location:{lat:10.7715,lng:106.6931,is_virtual:!0,label:`Sài Gòn`},on_play_effect:{has_effect:!0,effect_type:`RECOVER_LA`,effect_value:2},rarity:`COMMON`,icon:`💆`},{card_id:`SG_UTIL_015`,name:`Thuê Thợ Ảnh Dạo`,description:`Bắt gặp một thợ nháy dạo chuyên nghiệp, bạn chi tiền để có bộ ảnh sống ảo chất lượng. Nhân đôi giá trị kỷ niệm cho điểm đến kế tiếp.`,image_url:`./assets/cards/saigon/utility/sg_util_015.jpg`,phase_pool:`SAIGON`,tags:[`UTILITY`,`OUTDOOR`],cost:{xu:2,la:0},base_vp:0,location:{lat:10.7715,lng:106.6931,is_virtual:!0,label:`Sài Gòn`},on_play_effect:{has_effect:!0,effect_type:`DOUBLE_VP_NEXT`,effect_value:1},rarity:`UNCOMMON`,icon:`📷`}],nt=[...Qe,...$e,...et,...tt];console.log(`[DATA CHECK] cards.phase1.ts loaded`),console.log(`[DATA CHECK] total cards:`,nt.length),console.log(`[DATA CHECK] tag counts:`,nt.reduce((e,t)=>{let n=t.tags?.[0]??`UNKNOWN`;return e[n]=(e[n]??0)+1,e},{})),console.log(`[DATA CHECK] first 10 cards:`,nt.slice(0,10));function rt(e){return e.includes(`FOOD`)?`FOOD`:e.includes(`CULTURE`)?`CULTURE`:e.includes(`ACTION`)?`ACTION`:e.includes(`UTILITY`)?`UTILITY`:e[0]??`FOOD`}function it(e){return`./assets/cards/${e.phase_pool?.toLowerCase()??`saigon`}/${{FOOD:`food`,CULTURE:`culture`,ACTION:`action`,UTILITY:`utility`}[rt(e.tags)]??`food`}/${e.card_id.toLowerCase()+`.jpg`}`}function at(e){switch(e){case`FOOD`:return`Ẩm thực`;case`CULTURE`:return`Văn hóa`;case`ACTION`:return`Khám phá`;case`UTILITY`:return`Tiện ích`;case`OUTDOOR`:return`Ngoài trời`;case`INDOOR`:return`Trong nhà`;default:return`Khác`}}function ot(e){switch(e){case`COMMON`:return`★`;case`UNCOMMON`:return`★★`;case`EPIC`:return`★★★★`;case`LEGENDARY`:return`★★★★★`;default:return`★`}}function st(e){switch(e){case`COMMON`:return`common`;case`UNCOMMON`:return`uncommon`;case`EPIC`:return`epic`;case`LEGENDARY`:return`legendary`;default:return`common`}}function ct(e){if(e.on_play_effect.has_effect){if(e.on_play_effect.effect_type===`RECOVER_LA`)return`Khi đặt xuống: hồi ${e.on_play_effect.effect_value} thể lực`;if(e.on_play_effect.effect_type===`RECOVER_XU`)return`Khi đặt xuống: hồi ${e.on_play_effect.effect_value} xu`;if(e.on_play_effect.effect_type===`GAIN_VP`)return`Khi đặt xuống: +${e.on_play_effect.effect_value} VP`}return e.tags.includes(`FOOD`)?`Nếu có 2 lá Ẩm thực: +5 VP`:e.tags.includes(`CULTURE`)?`Nếu có 2 lá Văn hóa: +8 VP`:e.tags.includes(`ACTION`)?`Nếu đặt sau lá Khám phá: +10 VP`:`Không có hiệu ứng đặc biệt`}function lt(e){let t=e.trim(),n={"Cà Phê Bệt Nhà Thờ Đức Bà":`Cà Phê Bệt`,"Bánh Tráng Nướng Hồ Con Rùa":`Bánh Tráng`,"Cà Phê Vợt Cheo Leo":`Cà Phê Vợt`,"Phá Lấu Bò Cô Oanh":`Phá Lấu`,"Súp Cua Chợ Tân Định":`Súp Cua`,"Bánh Mì Huỳnh Hoa":`Bánh Mì`,"Phố Ẩm Thực Hồ Thị Kỷ":`Hồ Thị Kỷ`,"Cà Phê Chung Cư 42 Nguyễn Huệ":`Cà Phê 42`,"Phố Sủi Cảo Hà Tôn Quyền":`Sủi Cảo`,"Cơm Tấm Ba Ghiền":`Cơm Tấm`,"Phố Ốc Vĩnh Khánh":`Ốc Vĩnh Khánh`,"Bánh Xèo Đinh Công Tráng":`Bánh Xèo`,"Chè Hà Ký Chợ Lớn":`Chè Hà Ký`,"Phở Hòa Pasteur":`Phở Hòa`,"Lẩu Cá Kèo Bà Huyện Thanh Quan":`Lẩu Cá Kèo`,"Dimsum Tiến Phát":`Dimsum`,"Nhà Hàng Chay Hum":`Chay Hum`,"Ăn Tối Du Thuyền Sông Sài Gòn":`Du Thuyền Tối`,"Tầng 79 Landmark 81":`Landmark 81`,"Cơm Quê Dượng Bầu":`Dượng Bầu`,"Du Thuyền Hạ Long":`Du Thuyền`,"Chợ Đêm Đà Lạt":`Chợ Đêm`};if(n[t])return n[t];if(t.length<=14)return t;let r=t.split(/\s+/);return r.length<=3?t:r.slice(0,3).join(` `)}function ut(e){let t=e.trim(),n={"Quận 1 - Công viên 30/4":`Q.1`,"Quận 3 - Vòng xoay Công trường Quốc Tế":`Q.3`,"Quận 3 - Giáp ranh Quận 10":`Q.3`,"Quận 4 - Đường Tôn Đản":`Q.4`,"Quận 1 - Chợ Tân Định":`Q.1`,"Quận 1 - Đường Lê Thị Riêng":`Q.1`,"Quận 10 - Chợ Hoa":`Q.10`,"Quận 1 - Phố đi bộ Nguyễn Huệ":`Q.1`,"Quận 11 - Khu Chợ Lớn":`Q.11`,"Phú Nhuận - Cư xá Nguyễn Văn Trỗi":`Phú Nhuận`,"Quận 4 - Bờ kè":`Q.4`,"Quận 1 - Gần chợ Tân Định":`Q.1`,"Quận 5 - Châu Văn Liêm":`Q.5`,"Quận 3 - Đường Pasteur":`Q.3`,"Quận 3 - Bà Huyện Thanh Quan":`Q.3`,"Quận 5 - Khu Chợ Lớn":`Q.5`,"Quận 3 - Võ Văn Tần":`Q.3`,"Quận 4 - Bến cảng Nhà Rồng":`Q.4`,"Bình Thạnh - Vinhomes Central Park":`Bình Thạnh`,"Khu vực trung tâm":`Trung tâm`,"Sài Gòn":`Sài Gòn`,"Hà Nội":`Hà Nội`,"Đà Lạt":`Đà Lạt`,"Đà Nẵng":`Đà Nẵng`,"Quảng Ninh":`Quảng Ninh`};if(n[t])return n[t];if(t.length<=12)return t;if(t.includes(`Quận`)){let e=t.match(/Quận\s*\d+/i);if(e)return e[0].replace(`Quận`,`Q.`)}return t.slice(0,12).trim()+`...`}function dt(e){let t=rt(e.tags),n=e.location.label??e.phase_pool;return{id:e.card_id,name:e.name,shortName:lt(e.name),city:n,shortCity:ut(n),image:it(e),rarity:st(e.rarity),rarityLabel:ot(e.rarity),vp:e.base_vp,coin:e.cost.xu,stamina:e.cost.la,tag:t.toLowerCase(),tagLabel:at(t),tags:e.tags,onPlayEffect:e.on_play_effect,icon:e.icon,description:e.description,bonusText:ct(e)}}var ft=1500;function pt(e){return 55*(Math.max(1,Math.min(7,e))-1)+600+250}var mt=[1,2,3,4,5],ht=[`Sáng`,`Trưa`,`Chiều`,`Tối`,`Khuya`];function gt(){return ht.map(()=>mt.map(()=>null))}function _t(e,t){let n=[];for(let r=0;r<ht.length;r+=1){let i=e[r]?.[t]??null;i&&n.push(i)}return n}function vt(e,t,n){return e[t]?.[n]??null}function yt(e){return e.tags&&e.tags.length>0?e.tags.map(e=>e.toUpperCase()):[e.tag.toUpperCase()]}function bt(e,t){return e.filter(e=>yt(e).includes(t)).length}function xt(){return 1}function St(e,t=xt()){return e[t]}function Ct(e){return e.length===0?null:e[Math.floor(Math.random()*e.length)]}function wt(e){let t=e.map(e=>[...e.pool]);return e.map((n,r)=>{let i=(r-1+e.length)%e.length;return Object.assign(Object.assign({},n),{pool:t[i]})})}var Tt=[[`FOOD`,`CULTURE`,7,`Ẩm thực + Văn hóa`],[`ACTION`,`OUTDOOR`,8,`Khám phá Tự nhiên`],[`UTILITY`,`INDOOR`,5,`Nghỉ ngơi Thông minh`],[`FOOD`,`ACTION`,6,`Ẩm thực Năng động`],[`CULTURE`,`ACTION`,9,`Văn hóa + Khám phá`],[`UTILITY`,`CULTURE`,4,`Tiện nghi Đầy đủ`]];function Et(e){let t=e.filter(e=>e!=null);if(t.length===0)return{bonus:0,lines:[]};let n=e=>t.filter(t=>t.tags.includes(e)),r=e=>n(e).length,i=0,a=[],o=(e,t)=>{i+=e,a.push(`${t}: +${e} VP`)},s=r(`FOOD`),c=r(`CULTURE`),l=r(`ACTION`);s>=2&&o(5,`Combo Ẩm thực x${s}`),c>=2&&o(8,`Combo Văn hóa x${c}`),l>=2&&o(10,`Chuỗi Khám phá x${l}`);let u=r(`INDOOR`),d=r(`OUTDOOR`);u>=2&&o(5,`Trong Nhà x${u}`),d>=2&&o(6,`Ngoài Trời x${d}`),u>=1&&d>=1&&o(4,`Cân Bằng (trong + ngoài)`);for(let[e,t,n,i]of Tt)r(e)>=1&&r(t)>=1&&o(n,i);e[0]&&o(3,`Bình Minh (có lịch sáng)`),e[4]&&o(5,`Cú Đêm (có lịch khuya)`),t.length>=4&&o(7,`Tận Dụng (4+ khung giờ)`);let f=t.reduce((e,t)=>e+(t.coin??0),0),p=t.reduce((e,t)=>e+(t.stamina??0),0);return f<=2&&o(6,`Tiết Kiệm (ít Xu)`),p<=1&&o(5,`Khỏe Khoắn (ít Thể lực)`),f+p>=8&&o(12,`Liều Mạng (chi đậm)`),{bonus:i,lines:a}}function Dt(e){return{tags:e.tags&&e.tags.length>0?e.tags.map(e=>e.toUpperCase()):[String(e.tag).toUpperCase()],coin:e.coin??0,stamina:e.stamina??0}}function Ot({placedCards:e,getBoardDisplayName:t,dayCells:n}){let r=e.reduce((e,t)=>e+t.vp,0),i=e.reduce((e,t)=>e+t.coin,0),a=e.reduce((e,t)=>e+t.stamina,0),o=[],s=0,c=Et(n??e.map(e=>Dt(e)));s+=c.bonus;for(let e of c.lines)o.push(e);for(let n of e){let e=n.onPlayEffect;e?.has_effect&&e.effect_type===`GAIN_VP`&&(s+=e.effect_value,o.push(`${t(n)}: +${e.effect_value} VP`))}return o.length===0&&o.push(`Chưa có bonus nào được kích hoạt`),{baseVP:r,bonusVP:s,totalVP:r+s,spentCoin:i,spentStamina:a,usedSlots:e.length,lines:o}}function kt(e){return e?.boardTokenType??null}function At(e){return kt(e)===`debt`}function jt(e){return kt(e)===`lock`}function Mt(e){return e?.debtAmount??0}function Nt({boardSlots:e,currentDayIndex:t,dayLabel:n,rows:r,getCardTagKeys:i,countCardsWithTag:a,getCurrentDayPlacedCards:o,forceTutorialEvent:s}){let c=[],l=t,u=!1,d={dayIndex:l,label:n,vp:0,steps:0},f=o(l),p=null;for(let t=0;t<r.length;t+=1){let o=e[t]?.[l]??null,m=r[t];if(!o){c.push({id:`empty_${l}_${t}`,dayIndex:l,rowIndex:t,dayLabel:n,timeLabel:m,title:`Không có hoạt động`,subtitle:`Không có hoạt động, xem như thời gian nghỉ / di chuyển.`,vpDelta:0,coinDelta:0,staminaDelta:0,isEmpty:!0});continue}if(At(o)){d.vp+=-20,d.steps+=1,c.push({id:o.id,dayIndex:l,rowIndex:t,dayLabel:n,timeLabel:m,title:`Token nợ`,subtitle:`Nợ tiền ${Mt(o)} xu`,vpDelta:-20,coinDelta:0,staminaDelta:0,isDebtPenalty:!0,isBoardToken:!0});continue}if(jt(o)){c.push({id:o.id,dayIndex:l,rowIndex:t,dayLabel:n,timeLabel:m,title:`Bị khóa`,subtitle:`Kiệt sức, không thể xếp hoạt động.`,vpDelta:0,coinDelta:0,staminaDelta:0,isBoardToken:!0});continue}let h=i(o),ee=``;h.includes(`FOOD`)&&a(f,`FOOD`)>=2?ee=`Combo Ẩm thực đang kích hoạt`:h.includes(`CULTURE`)&&a(f,`CULTURE`)>=2?ee=`Combo Văn hóa đang kích hoạt`:h.includes(`ACTION`)&&a(f,`ACTION`)>=2&&(ee=`Chuỗi Khám phá đang kích hoạt`);let g=It(o,l,t),_=(p?zt(p,o,l,t):null)??g;s&&!u&&!_&&(u=!0,_={type:`promo`,text:`Khuyến mãi: +10 VP`,vpDelta:10,staminaDelta:0,isBad:!1});let te=_?.vpDelta??0,ne=_?.staminaDelta??0,re=o.vp+te;d.vp+=re,d.steps+=1,c.push({id:o.id,dayIndex:l,rowIndex:t,dayLabel:n,timeLabel:m,title:o.name,subtitle:`${o.city} • ${o.tagLabel}`,vpDelta:re,coinDelta:-o.coin,staminaDelta:-o.stamina+ne,comboText:ee,eventText:_?.text,eventType:_?.type,eventVpDelta:te,eventStaminaDelta:ne,distanceKm:_?.distanceKm,isBadEvent:_?.isBad===!0}),p=o}return{steps:c,daySummaries:[d]}}function Pt({boardSlots:e,currentDayIndex:t,dayLabel:n,rows:r,getBoardDisplayName:i,getCardTagKeys:a,countCardsWithTag:o,getCurrentDayPlacedCards:s,forceTutorialEvent:c}){let l=e.map(e=>{let n=e[t]??null;return n?{tags:n.tags&&n.tags.length>0?n.tags.map(e=>e.toUpperCase()):[String(n.tag).toUpperCase()],coin:n.coin??0,stamina:n.stamina??0}:null}),u=Ot({placedCards:s(),getBoardDisplayName:i,dayCells:l}),d=[],f=[],{steps:p,daySummaries:m}=Nt({boardSlots:e,currentDayIndex:t,dayLabel:n,rows:r,getCardTagKeys:a,countCardsWithTag:o,getCurrentDayPlacedCards:s,forceTutorialEvent:c}),h=p.reduce((e,t)=>t.isDebtPenalty?e+Math.abs(t.vpDelta):e,0),ee=p.reduce((e,t)=>t.eventType===`promo`||t.eventType===`storm`?e+(t.eventVpDelta??0):e,0),g=p.reduce((e,t)=>t.eventType===`distance`?e+Math.abs(t.eventVpDelta??0):e,0);u.usedSlots===0&&d.push(`Chưa có thẻ nào trên lịch trình.`),u.usedSlots>0&&u.bonusVP===0&&d.push(`Lịch trình chưa kích hoạt combo nào.`);for(let n=0;n<e.length;n+=1)e[n].filter((e,n)=>n===t).filter(e=>e!==null).length>=4&&d.push(`${r[n]} có lịch dày, nên chừa ô nghỉ/di chuyển.`);d.length===0&&d.push(`Lịch trình hiện tại ổn để mô phỏng MVP.`);for(let e of p)e.eventText&&f.push(`${e.timeLabel}: ${e.eventText}`);f.length===0&&f.push(`Không có event phát sinh trong ngày này.`);let _=p.reduce((e,t)=>e+t.vpDelta,0)+u.bonusVP;return Object.assign(Object.assign({},u),{debtPenalty:h,eventModifier:ee,distancePenalty:g,finalVP:_,warnings:d,events:f,replaySteps:p,daySummaries:m,lines:[...u.lines,`Debt penalty: -${h} VP`,`Event modifier: ${ee>=0?`+`:``}${ee} VP`,`Distance penalty: -${g} VP`,`Final VP: ${_}`]})}function Ft(e){let t=2166136261;for(let n=0;n<e.length;n+=1)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return(t>>>0)/4294967295}function It(e,t,n){if(Ft(`${e.id}|${t}|${n}|scan-event`)>=.15)return null;let r=Ft(`${e.id}|${t}|${n}|event-type`);return r<1/3?{type:`promo`,text:`Khuyến mãi: +10 VP`,vpDelta:10,staminaDelta:0,isBad:!1}:r<2/3?{type:`traffic`,text:`Kẹt xe: -8 thể lực`,vpDelta:0,staminaDelta:-8,isBad:!0}:{type:`storm`,text:`Mưa giông: -10 VP`,vpDelta:-10,staminaDelta:0,isBad:!0}}function Lt(e){let t=e;return typeof t.lat==`number`&&typeof t.lng==`number`?{lat:t.lat,lng:t.lng}:t.location&&typeof t.location==`object`&&typeof t.location.lat==`number`&&typeof t.location.lng==`number`?{lat:t.location.lat,lng:t.location.lng}:null}function Rt(e,t,n,r){let i=Lt(e),a=Lt(t);return i&&a?Bt(i,a):e.city===t.city?4+Math.round(Ft(`${e.id}|${t.id}|same-city|${n}|${r}`)*12):22+Math.round(Ft(`${e.id}|${t.id}|distance`)*18)}function zt(e,t,n,r){let i=Rt(e,t,n,r);return i<=20?null:{type:`distance`,text:`Khoảng cách > 20km`,vpDelta:-30,staminaDelta:0,distanceKm:i,isBad:!0}}function Bt(e,t){let n=Vt(t.lat-e.lat),r=Vt(t.lng-e.lng),i=Vt(e.lat),a=Vt(t.lat),o=Math.sin(n/2)**2+Math.cos(i)*Math.cos(a)*Math.sin(r/2)**2;return Math.round(6371*2*Math.atan2(Math.sqrt(o),Math.sqrt(1-o)))}function Vt(e){return e*Math.PI/180}function Ht({cards:e,fallbackCards:t,handSize:n}){return e.length>=n?e:[...e,...t.slice(0,n-e.length)]}function Ut(e){let t=[...e];for(let e=t.length-1;e>0;--e){let n=Math.floor(Math.random()*(e+1)),r=t[e];t[e]=t[n],t[n]=r}return t}function Wt({deck:e,playerHand:t,shuffleCards:n}){return t.length===0?{deck:e,playerHand:t}:{deck:n([...e,...t]),playerHand:[]}}function Gt({totals:e,startingCoin:t,startingStamina:n}){return{coin:Math.max(0,t-e.coin),stamina:Math.max(0,n-e.stamina)}}function Kt({card:e,remaining:t}){let n=Math.max(0,e.coin-t.coin),r=Math.max(0,e.stamina-t.stamina);return{canAfford:n===0&&r===0,missingCoin:n,missingStamina:r}}function qt(e){let t=[];return e.missingCoin>0&&t.push(`thiếu ${e.missingCoin} xu`),e.missingStamina>0&&t.push(`thiếu ${e.missingStamina} thể lực`),t.length===0?`Đủ tài nguyên để đặt lá này`:`Không đủ tài nguyên: ${t.join(`, `)}`}var Jt={deal:`assets/sounds/card-deal.mp3`,returnDeck:`assets/sounds/card-return-deck.mp3`,cardSelect:`assets/sounds/card-select.mp3`,cardPlace:`assets/sounds/card-place.mp3`,button:`assets/sounds/ui-click.mp3`,scanCell:`assets/sounds/scan-cell.mp3`,scanBad:`assets/sounds/scan-bad.mp3`,eventTraffic:`assets/sounds/event-traffic.mp3`,eventDistance:`assets/sounds/event-distance.mp3`,eventStorm:`assets/sounds/event-storm.mp3`,eventPromo:`assets/sounds/event-promo.mp3`},Yt=null,Xt=!1,Zt=0,Qt=0,$t=0,en=0,tn={},nn={},rn={};function an(){let e=window.AudioContext??window.webkitAudioContext;return e?(Yt||=new e,Yt):null}function on(e){if(!tn[e]){let t=new Audio(Jt[e]);t.preload=`auto`,t.crossOrigin=`anonymous`,t.volume={deal:.78,returnDeck:.68,cardSelect:.82,cardPlace:.76,button:.6,scanCell:.62,scanBad:.72,eventTraffic:.62,eventDistance:.72,eventStorm:.7,eventPromo:.74}[e],t.playbackRate={deal:1.08,returnDeck:1,cardSelect:1.08,cardPlace:.95,button:1.05,scanCell:1.14,scanBad:.96,eventTraffic:1.06,eventDistance:1.02,eventStorm:1,eventPromo:1.08}[e],tn[e]=t}return tn[e]}function sn(){let e=an();e?.state===`suspended`&&e.resume(),on(`deal`).load(),on(`returnDeck`).load(),on(`cardSelect`).load(),on(`cardPlace`).load(),on(`button`).load(),on(`scanCell`).load(),on(`scanBad`).load(),on(`eventTraffic`).load(),on(`eventDistance`).load(),on(`eventStorm`).load(),on(`eventPromo`).load(),Xt=!0}function cn(e,t){var n;if(!Xt)return;t?.exclusive&&((n=nn[e])==null||n.pause(),nn[e]=void 0,rn[e]!==void 0&&(window.clearTimeout(rn[e]),rn[e]=void 0));let r=on(e),i=r.cloneNode(!0);i.volume=t?.volume??r.volume,i.playbackRate=t?.playbackRate??r.playbackRate,i.currentTime=t?.startTime??0,t?.exclusive&&(nn[e]=i),i.play().catch(()=>{}),t?.durationMs!==void 0&&(rn[e]=window.setTimeout(()=>{i.pause(),nn[e]=void 0,rn[e]=void 0},t.durationMs))}function ln(e,t){let n=e.createGain();return n.gain.setValueAtTime(Math.max(1e-4,t),e.currentTime),n.connect(e.destination),n}function un(e,t,n=1){let r=e.sampleRate,i=Math.max(1,Math.floor(r*t)),a=e.createBuffer(1,i,r),o=a.getChannelData(0),s=0,c=0;for(let e=0;e<i;e+=1){let t=e/i,r=Math.min(1,t/.045),a=(1-t)**2.05,l=Math.random()*2-1;s=(s+.035*l)/1.035,Math.random()>.985?c=(Math.random()*2-1)*.65*n:c*=.82,o[e]=(l*.55+s*5.8+c*.42)*r*a}return a}function dn(e){let t=an();if(!t||!Xt)return;let n=e.duration??.11,r=e.startDelay??0,i=e.volume??.06,a=t.currentTime+r,o=t.createBufferSource(),s=t.createBiquadFilter(),c=t.createBiquadFilter(),l=t.createBiquadFilter(),u=ln(t,i),d=t.createStereoPanner?.call(t);o.buffer=un(t,n,e.roughness??1),o.playbackRate.setValueAtTime(e.playbackRate??1,a),s.type=`highpass`,s.frequency.setValueAtTime(e.highpass??240,a),s.Q.setValueAtTime(.55,a),l.type=`bandpass`,l.frequency.setValueAtTime(e.bandpass??1800,a),l.Q.setValueAtTime(.85,a),c.type=`lowpass`,c.frequency.setValueAtTime(e.lowpass??4200,a),c.Q.setValueAtTime(.6,a),u.gain.setValueAtTime(1e-4,a),u.gain.linearRampToValueAtTime(i,a+n*.12),u.gain.exponentialRampToValueAtTime(1e-4,a+n),o.connect(s),s.connect(l),l.connect(c),d?(d.pan.setValueAtTime(e.pan??0,a),c.connect(d),d.connect(u)):c.connect(u),o.start(a),o.stop(a+n+.02)}function fn(e=0,t=.05){dn({duration:.045,volume:t,startDelay:e,highpass:55,bandpass:260,lowpass:900,playbackRate:.72,roughness:.55})}function v(e){let t=performance.now();if(e===`button`){if(t-Zt<35)return;Zt=t,cn(`button`,{volume:.72,playbackRate:1.06,startTime:0,durationMs:260,exclusive:!0});return}if(e===`cardSelect`){if(t-Qt<80)return;Qt=t,cn(`cardSelect`,{volume:.84,playbackRate:1.06,startTime:.02});return}if(e===`cardPlace`){cn(`cardPlace`,{volume:.86,playbackRate:.98,startTime:.01,durationMs:420,exclusive:!0});return}if(e===`deal`){if(t-$t<430)return;$t=t,cn(`deal`,{volume:.82,playbackRate:1.12,startTime:.08});return}if(e===`returnDeck`){if(t-en<850)return;en=t,cn(`returnDeck`,{volume:.72,playbackRate:1.02,startTime:.02,durationMs:520,exclusive:!0});return}if(e===`scanCell`){cn(`scanCell`,{volume:.62,playbackRate:1.14,startTime:0,durationMs:260,exclusive:!0});return}if(e===`scanBad`){cn(`scanBad`,{volume:.76,playbackRate:.96,startTime:0,durationMs:420,exclusive:!0});return}if(e===`eventTraffic`){cn(`eventTraffic`,{volume:.62,playbackRate:1.06,startTime:0,durationMs:980,exclusive:!0});return}if(e===`eventDistance`){cn(`eventDistance`,{volume:.72,playbackRate:1.02,startTime:0,durationMs:650,exclusive:!0});return}if(e===`eventStorm`){cn(`eventStorm`,{volume:.7,playbackRate:1,startTime:0,durationMs:1120,exclusive:!0});return}if(e===`eventPromo`){cn(`eventPromo`,{volume:.74,playbackRate:1.08,startTime:0,durationMs:820,exclusive:!0});return}e===`reject`&&(dn({duration:.06,volume:.055,highpass:90,bandpass:420,lowpass:1100,playbackRate:.7,roughness:.8}),fn(.05,.045))}function pn(){document.addEventListener(`pointerdown`,e=>{sn();let t=e.target;if(!t)return;let n=!!t.closest(`[data-hand-card-id], [data-draft-card-id], .hand-card, .daily-draft-card`),r=t.closest(`.board-mini`);if(!n){if(r){v(`cardSelect`);return}v(`button`)}},!0)}var mn=function(e,t,n,r){function i(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||=Promise)(function(n,a){function o(e){try{c(r.next(e))}catch(e){a(e)}}function s(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){e.done?n(e.value):i(e.value).then(o,s)}c((r=r.apply(e,t||[])).next())})},hn=`travel_board_certificate_history`;function gn(e){return e.trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu,`-`).replace(/^-+|-+$/g,``).slice(0,64)||`lich-trinh`}function _n(){let e=V(),t=Di(),n=Ai(),r=new Date().toISOString(),i=mt.map((t,n)=>({day:t,label:`Ngày ${t}`,slots:ht.map((t,r)=>{let i=e[r]?.[n]??null;return{timeLabel:t,card:i?{id:i.id,name:i.name,city:i.city,tag:i.tag,tagLabel:i.tagLabel,vp:i.vp,coin:i.coin,stamina:i.stamina,description:i.description}:null}})}));return{version:1,createdAt:r,playerName:mr(),phaseNumber:Fr,currentDay:mt[b],score:{baseVP:t.baseVP,bonusVP:t.bonusVP,totalVP:R?.finalVP??t.totalVP,accumulatedVP:Ir},resources:{spentCoin:t.spentCoin,spentStamina:t.spentStamina,remainingCoin:n.coin,remainingStamina:n.stamina,usedSlots:t.usedSlots},timeline:i}}function vn(){return`${hn}:${d.roomId??`local`}:${d.playerId??`p1`}`}function yn(){try{let e=localStorage.getItem(vn());if(!e)return[];let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function bn(e){localStorage.setItem(vn(),JSON.stringify(e))}function xn(e){if(e.length===0)return`Chưa có dữ liệu`;let t=new Map;for(let n of e){let e=n.tag||`unknown`,r=t.get(e)??{label:n.tagLabel||n.tag||`Khác`,count:0};r.count+=1,t.set(e,r)}let n=[...t.values()].sort((e,t)=>t.count-e.count);return n.length>=2&&n[0].count===n[1].count?`Kết hợp`:n[0]?.label??`Kết hợp`}function Sn(e=Fr){let t=V(),n=mt.map((e,n)=>({day:e,label:`Ngày ${e}`,slots:ht.map((e,r)=>{let i=t[r]?.[n]??null;return{timeLabel:e,card:i?{id:i.id,name:i.name,city:i.city,tag:i.tag,tagLabel:i.tagLabel,vp:i.vp,coin:i.coin,stamina:i.stamina,description:i.description}:null}})})),r=[];for(let e of n)for(let t of e.slots)t.card&&r.push(t.card);let i=n.filter(e=>e.slots.some(e=>e.card!==null)).length,a=r.length;return{phaseNumber:e,phaseScore:r.reduce((e,t)=>e+t.vp,0),completedDays:i,completedSlots:a,styleLabel:xn(r),days:n,updatedAt:new Date().toISOString()}}function Cn(){if(!y()||!d.roomState||d.roomState.phase===`lobby`||d.roomState.phase===`draft`)return;let e=Sn(Fr);if(e.completedSlots<=0)return;let t=yn().filter(t=>t.phaseNumber!==e.phaseNumber);t.push(e),t.sort((e,t)=>e.phaseNumber-t.phaseNumber),bn(t)}function wn(){Cn();let e=yn(),t=Sn(Fr),n=e.filter(e=>e.phaseNumber!==t.phaseNumber);t.completedSlots>0&&n.push(t),n.sort((e,t)=>e.phaseNumber-t.phaseNumber);let r=[1,2,3].map(e=>n.find(t=>t.phaseNumber===e)??{phaseNumber:e,phaseScore:0,completedDays:0,completedSlots:0,styleLabel:`Chưa hoàn thành`,days:mt.map(e=>({day:e,label:`Ngày ${e}`,slots:ht.map(e=>({timeLabel:e,card:null}))})),updatedAt:new Date().toISOString()}),i=r.reduce((e,t)=>e+t.phaseScore,0),a=r.filter(e=>e.completedSlots>0).length,o=r.reduce((e,t)=>e+t.completedSlots,0),s=r.reduce((e,t)=>e+t.completedDays,0);return{version:1,exportedAt:new Date().toISOString(),playerName:mr(),roomId:d.roomId??`LOCAL`,totalScore:i,completedPhaseCount:a,completedDays:s,completedSlots:o,phases:r}}function Tn(){let e=wn(),t=JSON.stringify(e).replace(/</g,`\\u003c`);return`<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Chứng nhận hành trình - ${e.playerName}</title>
  <style>
    :root {
      --ink: #4e3325;
      --muted: rgba(78, 51, 37, 0.68);
      --gold: #d99a2b;
      --gold-dark: #9b641f;
      --paper: #fff7e8;
      --paper-2: #f3e3c6;
      --violet: #7c3aed;
      --green: #4f7d2b;
      --blue: #2563eb;
    }

    * {
      box-sizing: border-box;
      text-rendering: optimizeLegibility;
    }

    html {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      margin: 0;
      min-height: 100vh;
      background:
        radial-gradient(circle at 50% 0%, rgba(255,255,255,.92), transparent 38%),
        linear-gradient(180deg, #efe1c8, #d7bd8d);
      color: var(--ink);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, "Helvetica Neue", sans-serif;
      display: grid;
      place-items: center;
      padding: 22px;
    }

    button {
      font: inherit;
    }

    .certificate {
      width: min(980px, 100%);
      background:
        radial-gradient(circle at 15% 8%, rgba(255,255,255,.9), transparent 26%),
        radial-gradient(circle at 85% 92%, rgba(255,255,255,.55), transparent 30%),
        linear-gradient(180deg, #fff8ea, #f3dfb8);
      border: 3px double rgba(168, 111, 31, .72);
      border-radius: 28px;
      box-shadow:
        0 28px 80px rgba(82, 49, 19, .24),
        inset 0 0 0 10px rgba(255,255,255,.32);
      padding: 34px;
      position: relative;
      overflow: hidden;
    }

    .certificate::before,
    .certificate::after {
      content: "";
      position: absolute;
      width: 360px;
      height: 360px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(217,154,43,.12), transparent 68%);
      pointer-events: none;
    }

    .certificate::before {
      left: -170px;
      top: -170px;
    }

    .certificate::after {
      right: -170px;
      bottom: -170px;
    }

    .toolbar {
      position: sticky;
      top: 0;
      z-index: 4;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-bottom: 12px;
      font-family: system-ui, sans-serif;
    }

    .toolbar button {
      cursor: pointer;
      border: 0;
      border-radius: 999px;
      padding: 10px 14px;
      color: white;
      background: linear-gradient(135deg, #8b5cf6, #6d28d9);
      font-weight: 800;
      box-shadow: 0 10px 18px rgba(109, 40, 217, .22);
    }

    .header {
      position: relative;
      z-index: 1;
      text-align: center;
    }

    .compass {
      width: 54px;
      height: 54px;
      margin: 0 auto 8px;
      display: grid;
      place-items: center;
      border: 2px solid rgba(155, 100, 31, .36);
      border-radius: 50%;
      color: var(--gold-dark);
      font-size: 30px;
      background: rgba(255,255,255,.36);
    }

    .header h1 {
      margin: 0;
      font-family: "Segoe UI", Arial, "Helvetica Neue", sans-serif;
      font-size: clamp(34px, 5vw, 58px);
      font-weight: 900;
      letter-spacing: .02em;
      text-transform: uppercase;
      text-shadow: 0 2px 0 rgba(255,255,255,.65);
    }

    .subtitle {
      margin-top: 8px;
      color: var(--gold-dark);
      font-size: 20px;
    }

    .player {
      margin-top: 22px;
      font-family: "Segoe UI", Arial, "Helvetica Neue", sans-serif;
      font-size: clamp(34px, 4.4vw, 54px);
      font-weight: 900;
      line-height: 1.15;
    }

    .score-panel {
      width: min(620px, 100%);
      margin: 20px auto 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 18px;
      border: 2px solid rgba(188, 129, 48, .52);
      border-radius: 22px;
      padding: 14px 24px;
      background: rgba(255,255,255,.42);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.78), 0 10px 22px rgba(111, 69, 24, .08);
    }

    .score-panel span {
      font-size: 21px;
      font-weight: 800;
    }

    .score-panel strong {
      color: #d97706;
      font-size: clamp(52px, 7vw, 86px);
      line-height: .9;
    }

    .hint {
      margin: 0;
      color: var(--muted);
      font-size: 16px;
    }

    .phase-tabs {
      margin: 28px 0 18px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      position: relative;
      z-index: 1;
    }

    .phase-tab {
      cursor: pointer;
      border: 2px solid rgba(182, 126, 47, .36);
      border-radius: 20px;
      background: rgba(255,255,255,.44);
      padding: 14px;
      color: var(--ink);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.74);
      transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease;
    }

    .phase-tab:hover,
    .phase-tab.is-active {
      transform: translateY(-2px);
      border-color: rgba(124, 58, 237, .5);
      box-shadow: 0 12px 22px rgba(87, 49, 20, .12), inset 0 1px 0 rgba(255,255,255,.8);
    }

    .phase-tab h2 {
      margin: 0 0 8px;
      color: var(--phase-color);
      font-size: 22px;
    }

    .phase-tab p {
      margin: 6px 0;
      color: var(--muted);
      font-size: 15px;
    }

    .phase-tab strong {
      color: var(--phase-color);
      font-size: 22px;
    }

    .timeline {
      position: relative;
      z-index: 1;
      border: 2px solid rgba(174, 116, 39, .32);
      border-radius: 24px;
      padding: 20px;
      background: rgba(255,255,255,.38);
    }

    .timeline-head {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 16px;
    }

    .timeline-head h3 {
      margin: 0;
      font-size: 28px;
    }

    .timeline-head span {
      color: var(--muted);
      font-size: 15px;
    }

    .days {
      display: grid;
      gap: 14px;
    }

    .day-card {
      border: 1px solid rgba(174, 116, 39, .28);
      border-radius: 18px;
      background: rgba(255, 251, 239, .78);
      padding: 14px;
    }

    .day-card h4 {
      margin: 0 0 10px;
      color: var(--phase-color);
      font-size: 20px;
    }

    .slots {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
    }

    .slot {
      min-height: 116px;
      border: 1px dashed rgba(160, 115, 66, .46);
      border-radius: 14px;
      padding: 10px;
      background: rgba(255,255,255,.45);
    }

    .slot em {
      display: block;
      color: var(--gold-dark);
      font-style: normal;
      font-weight: 900;
      margin-bottom: 6px;
    }

    .slot strong {
      display: block;
      min-height: 34px;
      font-size: 15px;
      line-height: 1.12;
    }

    .slot span {
      color: #15803d;
      display: block;
      font-weight: 900;
      margin-top: 7px;
    }

    .slot small {
      color: var(--muted);
      display: block;
      margin-top: 4px;
      line-height: 1.25;
    }

    .empty {
      opacity: .58;
    }

    .badges {
      margin-top: 18px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      position: relative;
      z-index: 1;
    }

    .badge {
      border: 1px solid rgba(174, 116, 39, .28);
      border-radius: 999px;
      background: rgba(255,255,255,.42);
      padding: 12px;
      text-align: center;
      color: var(--ink);
      font-weight: 800;
    }

    .footer {
      margin-top: 24px;
      text-align: center;
      color: var(--muted);
      font-size: 15px;
      position: relative;
      z-index: 1;
    }

    .signature {
      display: block;
      margin-top: 6px;
      color: var(--ink);
      font-size: 28px;
      font-style: italic;
    }

    @media print {
      body {
        background: white;
        padding: 0;
      }

      .toolbar {
        display: none;
      }

      .certificate {
        box-shadow: none;
        border-radius: 0;
        width: 100%;
      }
    }

    @media (max-width: 760px) {
      .certificate {
        padding: 22px;
      }

      .phase-tabs,
      .badges {
        grid-template-columns: 1fr;
      }

      .slots {
        grid-template-columns: 1fr;
      }

      .score-panel {
        flex-direction: column;
        gap: 4px;
      }
    }
  </style>
</head>
<body>
  <main class="certificate">
    <div class="toolbar">
      <button onclick="window.print()">In / Lưu PDF</button>
    </div>

    <section class="header">
      <div class="compass">✦</div>
      <h1>Chứng nhận hành trình</h1>
      <div class="subtitle">Tổng kết 3 phase</div>
      <div class="player" id="playerName"></div>

      <div class="score-panel">
        <span>TỔNG ĐIỂM</span>
        <strong id="totalScore"></strong>
        <span>VP</span>
      </div>

      <p class="hint">Bấm vào từng phase để xem chi tiết hành trình ngày 1 → 5.</p>
    </section>

    <section class="phase-tabs" id="phaseTabs"></section>

    <section class="timeline" id="timeline"></section>

    <section class="badges">
      <div class="badge">🍽️ Ẩm thực nổi bật</div>
      <div class="badge">📅 Lịch trình hiệu quả</div>
      <div class="badge">🏔️ Khám phá bền bỉ</div>
      <div class="badge">🏆 Hoàn thành 3 phase</div>
    </section>

    <footer class="footer">
      <div id="exportDate"></div>
      <span class="signature">Travel Board Online</span>
    </footer>
  </main>

  <script>
    const certificateData = ${t};
    let activePhaseNumber = certificateData.phases.find((phase) => phase.completedSlots > 0)?.phaseNumber ?? 1;

    function escapeHtml(value) {
      return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    function getPhaseColor(phaseNumber) {
      if (phaseNumber === 1) return "#4f7d2b";
      if (phaseNumber === 2) return "#2563eb";
      return "#7c3aed";
    }

    function renderPhaseTabs() {
      const root = document.querySelector("#phaseTabs");

      root.innerHTML = certificateData.phases.map((phase) => {
        const isActive = phase.phaseNumber === activePhaseNumber;
        const color = getPhaseColor(phase.phaseNumber);

        return \`
          <button class="phase-tab \${isActive ? "is-active" : ""}" style="--phase-color: \${color}" onclick="selectPhase(\${phase.phaseNumber})">
            <h2>PHASE \${phase.phaseNumber}</h2>
            <p>Điểm: <strong>\${phase.phaseScore} VP</strong></p>
            <p>Ngày hoàn thành: \${phase.completedDays}/5</p>
            <p>Phong cách: \${escapeHtml(phase.styleLabel)}</p>
          </button>
        \`;
      }).join("");
    }

    function renderTimeline() {
      const phase = certificateData.phases.find((item) => item.phaseNumber === activePhaseNumber) ?? certificateData.phases[0];
      const root = document.querySelector("#timeline");
      const color = getPhaseColor(phase.phaseNumber);

      root.style.setProperty("--phase-color", color);

      root.innerHTML = \`
        <div class="timeline-head">
          <div>
            <h3>Chi tiết Phase \${phase.phaseNumber}</h3>
            <span>\${phase.completedSlots} slot • \${phase.completedDays}/5 ngày • \${phase.phaseScore} VP</span>
          </div>
        </div>

        <div class="days">
          \${phase.days.map((day) => {
            const hasAnyCard = day.slots.some((slot) => slot.card);

            return \`
              <article class="day-card \${hasAnyCard ? "" : "empty"}">
                <h4>\${escapeHtml(day.label)}</h4>
                <div class="slots">
                  \${day.slots.map((slot) => {
                    if (!slot.card) {
                      return \`
                        <div class="slot empty">
                          <em>\${escapeHtml(slot.timeLabel)}</em>
                          <strong>Nghỉ / Di chuyển</strong>
                          <small>Chưa có hoạt động</small>
                        </div>
                      \`;
                    }

                    return \`
                      <div class="slot">
                        <em>\${escapeHtml(slot.timeLabel)}</em>
                        <strong>\${escapeHtml(slot.card.name)}</strong>
                        <small>\${escapeHtml(slot.card.city || "Không rõ khu vực")}</small>
                        <span>+\${slot.card.vp} VP</span>
                        <small>\${escapeHtml(slot.card.tagLabel || slot.card.tag)}</small>
                      </div>
                    \`;
                  }).join("")}
                </div>
              </article>
            \`;
          }).join("")}
        </div>
      \`;
    }

    function selectPhase(phaseNumber) {
      activePhaseNumber = phaseNumber;
      renderPhaseTabs();
      renderTimeline();
    }

    document.querySelector("#playerName").textContent = certificateData.playerName;
    document.querySelector("#totalScore").textContent = certificateData.totalScore;
    document.querySelector("#exportDate").textContent = "Ngày xuất: " + new Date(certificateData.exportedAt).toLocaleDateString("vi-VN");
    renderPhaseTabs();
    renderTimeline();
  <\/script>
</body>
</html>`}function En(){On(`${gn(`${wn().playerName}-chung-nhan-hanh-trinh-3-phase`)}.html`,Tn(),`text/html;charset=utf-8`)}function Dn(){let e=_n(),t=[];t.push(`LỮ KHÁCH BÀN CỜ - LỊCH TRÌNH DU LỊCH`),t.push(`Người chơi: ${e.playerName}`),t.push(`Phase: ${e.phaseNumber}`),t.push(`Ngày xuất: ${new Date(e.createdAt).toLocaleString(`vi-VN`)}`),t.push(``),t.push(`TỔNG KẾT`),t.push(`- Điểm ngày: ${e.score.totalVP} VP`),t.push(`- Tổng phase hiện tại: ${e.score.accumulatedVP} VP`),t.push(`- Xu đã dùng: ${e.resources.spentCoin}`),t.push(`- Thể lực đã dùng: ${e.resources.spentStamina}`),t.push(`- Slot đã dùng: ${e.resources.usedSlots}/25`),t.push(``);for(let n of e.timeline)if(n.slots.some(e=>e.card!==null)){t.push(n.label.toUpperCase());for(let e of n.slots){if(!e.card){t.push(`- ${e.timeLabel}: Nghỉ / Di chuyển`);continue}t.push(`- ${e.timeLabel}: ${e.card.name} (${e.card.city||`Không rõ khu vực`})`),t.push(`  Tag: ${e.card.tagLabel||e.card.tag} • VP: ${e.card.vp} • Xu: ${e.card.coin} • Thể lực: ${e.card.stamina}`),e.card.description&&t.push(`  Ghi chú: ${e.card.description}`)}t.push(``)}return t.join(`
`)}function On(e,t,n){let r=new Blob([t],{type:n}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=e,document.body.appendChild(a),a.click(),a.remove(),URL.revokeObjectURL(i)}function kn(e){let t=_n(),n=gn(`${t.playerName}-phase-${t.phaseNumber}-lich-trinh`);if(e===`json`){On(`${n}.json`,JSON.stringify(t,null,2),`application/json;charset=utf-8`);return}On(`${n}.txt`,Dn(),`text/plain;charset=utf-8`)}function An(){return mn(this,void 0,void 0,function*(){let e=Dn();try{yield navigator.clipboard.writeText(e),alert(`Đã copy lịch trình vào clipboard.`)}catch{prompt(`Copy lịch trình:`,e)}})}var jn=function(e,t,n,r){function i(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||=Promise)(function(n,a){function o(e){try{c(r.next(e))}catch(e){a(e)}}function s(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){e.done?n(e.value):i(e.value).then(o,s)}c((r=r.apply(e,t||[])).next())})},Mn=document.getElementById(`app`),Nn=7,Pn=5,Fn=[{id:`p2`,rank:3,name:`Cường`,score:180,coin:890,stamina:20,usedSlots:3},{id:`p1`,rank:1,name:`An`,score:0,coin:30,stamina:15,usedSlots:0,active:!0}],In=[{id:`p3`,rank:3,name:`Minh`,score:190,coin:720,stamina:15,usedSlots:3},{id:`p4`,rank:3,name:`Khánh`,score:240,coin:720,stamina:15,usedSlots:3}],Ln={coffee:`https://images.unsplash.com/photo-1517701550927-30cf4ba1f0d5?auto=format&fit=crop&w=1000&q=80`,bridge:`https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80`,sea:`https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80`,food:`https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80`,market:`https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1000&q=80`,night:`https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=80`,temple:`https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80`};Ln.coffee,Ln.bridge,Ln.sea,Ln.food,Ln.night;var Rn=new Map(nt.map(e=>[e.card_id,e.image_url]));function zn(e){return Rn.get(e.id)||(e.image&&!/(^|\/)images\/phase1\//i.test(e.image)?e.image:Ln.food)}function Bn(e){return Array.from(new Set([zn(e),Ln.food])).map(e=>`url('${e}')`).join(`, `)}function Vn(e){return e.image&&e.image.trim().length>0?e:Object.assign(Object.assign({},e),{image:Ln.food})}function Hn(e){let t=new Set;for(let n of e){t.add($i(n));let e=new Image;e.src=zn(n)}for(let e of t){let t=new Image;t.src=e}}function Un(){let e=[];for(let t of T)e.push(...t.pool),e.push(...t.picked);Hn(e)}function Wn(){return Ht({cards:nt.map(dt).map(Vn),fallbackCards:[],handSize:5})}function Gn(e){return Ut(e)}function Kn(){let e=Wt({deck:Ur,playerHand:S,shuffleCards:Gn});Ur=e.deck,S=e.playerHand}function qn(){return`Ngày ${mt[b]}`}function Jn(){return`Phase ${Fr}`}function y(){return!!(d.roomId&&d.playerId&&d.roomState)}function Yn(){return d.roomState?.phase===`gameover`}function Xn(){let e=d.roomState;return e?jr.map(t=>{let n=e.players[t];return{playerId:t,name:n.name,score:n.score,coin:n.coin,stamina:n.stamina,usedSlots:n.usedSlots,isConnected:n.isConnected}}).sort((e,t)=>t.score===e.score?t.coin===e.coin?t.stamina-e.stamina:t.coin-e.coin:t.score-e.score):[]}function Zn(){return d.roomState?.self??null}function Qn(){return Zn()?.draftPool??null}function $n(){if(!y())return null;let e=Qn();if(D&&!$){let t=rl??J;return t&&t.length>0?t:t??e}return(C||al)&&J&&J.length>0||J&&J.length>0?J:e&&e.length>0?(J=[...e],J):J??e}function er(e){return(e??[]).map(e=>e.id).join(`,`)}function tr(){let e=Qn();J=e?[...e]:null,Y=null}function nr(e=`visible-sync`){if(!y())return!1;let t=d.roomState;if(!t||t.phase!==`draft`)return!1;let n=Qn();if(!n||n.length===0)return!1;let r=J??rl??Y,i=!!r&&r.length>0,a=X>0&&Date.now()>X+180,o=C||al||D||Date.now()<X;return i&&!(a&&o)&&!o?!1:(xl(),yl(),J=[...n],rl=null,Y=null,Z=null,Q=null,D=!1,C=!1,dl=!1,fl=!1,X=0,E=t.self.selectedDraftCardId??null,Kc=``,console.debug(`[DRAFT SYNC] recovered draft pool after tab visible: ${e}`,{poolSize:n.length,timer:t.timer,round:t.draftRound}),!0)}function rr(){document.visibilityState===`visible`&&nr(`visibility/focus`)&&q()}function ir(){return D&&!$}function ar(){if(y()){let e=J??Y??Qn()??[];return Math.max(1,e.length)}let e=ja();if(e.length>0)return e.length;let t=H()?.pool??[];return Math.max(1,t.length)}function or(){return pt(ar())}function sr(){if(tl=null,Y?.length)il=0,J=[...Y],Y=null;else{if(il<40){il+=1,tl=window.setTimeout(sr,100);return}tr()}rl=null,Z=null,Q=null,D=!1,Pa(),C=!0,E=d.roomState?.self.selectedDraftCardId??null;let e=pt(Math.max(1,J?.length??0));al=!0,X=Date.now()+e,Kc=``,q(),bl(e),tl=window.setTimeout(()=>{ts()},e)}function cr(e,t){if(!($||!w)&&e.length!==0){if(D){t?.length&&(Y=[...t]);return}xl(),il=0,rl=[...e],t?.length&&(Y=[...t]),E=null,Q=null,Pa(),dl=!1,fl=!0,C=!1,D=!0,tl=window.setTimeout(()=>{sr()},ft)}}function lr(){return Zn()?.hand??null}function ur(){return Zn()?.selectedDraftCardId??null}function dr(){return ur()??E}function fr(){return!w||_l()||D||!y()||d.roomState?.self?.draftPickConfirmed!==!0?!1:jr.filter(e=>d.roomState?.players[e]?.isConnected).length>1}function pr(e){return!e||!d.roomState?null:d.roomState.players[e]??null}function mr(){return pr(d.playerId??`p1`)?.name??`Player`}function hr(){return`${Jn()} • ${qn()}`.toUpperCase()}function gr(){let e=d.playerId;return!e||!d.roomState?null:d.roomState.players[e]??null}function _r(){let e=d.roomState;return e?jr.map(t=>e.players[t]).filter(e=>e.isConnected):[]}function vr(){let e=d.roomState;if(!e||e.phase!==`lobby`||d.playerId!==`p1`)return!1;let t=_r();return t.length>0&&t.every(e=>e.isReady)}function yr(){let e=m();return`
    <main class="online-entry-screen">
      <section class="online-entry-card">
        <div class="online-entry-card__brand">
          <span>TREKPOLOGY</span>
          <h1>Online Room</h1>
          <p>Tạo phòng, mời bạn bè bằng mã phòng, rồi bắt đầu khi mọi người sẵn sàng.</p>
          <p class="online-entry-card__welcome">
            Xin chào, <strong>${n.user?.displayName??n.user?.username??`Nhà Lữ Hành`}</strong>
          </p>
          <button
            type="button"
            class="online-entry-card__back"
            onclick="event.stopPropagation(); window.gotoDashboard()"
          >
            ← Quay lại trang chủ
          </button>
        </div>

        <div class="online-entry-grid">
          <form class="online-entry-form" onsubmit="event.preventDefault(); event.stopPropagation(); window.createRoomFromLobby()">
            <h2>Tạo phòng</h2>
            <label>
              Tên của bạn
              <input id="lobby-create-name" value="${n.user?.displayName??`An`}" maxlength="18" />
            </label>
            <button
              type="button"
              onclick="event.preventDefault(); event.stopPropagation(); window.createRoomFromLobby()"
            >
              Tạo phòng
            </button>
          </form>

          <form class="online-entry-form" onsubmit="event.preventDefault(); event.stopPropagation(); window.joinRoomFromLobby()">
            <h2>Vào phòng</h2>
            <label>
              Tên của bạn
              <input id="lobby-join-name" value="${n.user?.displayName??`Player`}" maxlength="18" />
            </label>
            <label>
              Room code
              <input id="lobby-room-code" placeholder="ABC123" maxlength="8" />
            </label>
            <button
              type="button"
              onclick="event.preventDefault(); event.stopPropagation(); window.joinRoomFromLobby()"
            >
              Join phòng
            </button>
            <p class="online-entry-form__note">Slot offline đã có chủ chỉ có thể quay lại bằng Reconnect, không join lại bằng code.</p>
          </form>
        </div>

        ${e?`
              <div class="online-entry-card__resume">
                <div>
                  <strong>Phiên cũ</strong>
                  <span>Room ${e.roomId} • ${e.playerId} • ${e.playerName}</span>
                </div>
                <button onclick="event.stopPropagation(); reconnectSavedRoomFromLobby()">Reconnect</button>
                <button class="online-entry-card__ghost" onclick="event.stopPropagation(); clearSavedRoomFromLobby()">Xóa lưu</button>
              </div>
            `:``}
      </section>
    </main>
  `}function br(){let e=d.roomState,t=gr(),n=d.playerId===`p1`,r=vr();if(!e||e.phase!==`lobby`)return``;let i=jr.map(t=>{let n=e.players[t],r=t===d.playerId,i=n.isConnected?`is-connected`:n.hasJoined?`is-offline`:`is-empty`,a=n.isConnected?n.isReady?`READY`:`WAIT`:n.hasJoined?`OFFLINE`:`-`,o=n.isConnected||n.hasJoined?n.name:`Đang chờ...`;return`
        <div class="online-lobby-player ${i} ${r?`is-self`:``}">
          <div class="online-lobby-player__slot">${t.toUpperCase()}</div>
          <div class="online-lobby-player__info">
            <strong>${o}</strong>
            <span>${n.isConnected?n.isReady?`Sẵn sàng`:`Chưa sẵn sàng`:n.hasJoined?`Đã offline • giữ slot`:`Trống`}</span>
          </div>
          <div class="online-lobby-player__status ${n.isReady?`is-ready`:``} ${n.hasJoined&&!n.isConnected?`is-offline`:``}">${a}</div>
        </div>
      `}).join(``);return`
    <main class="online-lobby-screen">
      <section class="online-lobby-card">
        <div class="online-lobby-card__header">
          <div>
            <span>ONLINE ROOM</span>
            <h1>${e.roomId}</h1>
            <p>Bạn là ${d.playerId?.toUpperCase()} • ${t?.name??`Player`}</p>
          </div>

          <div class="online-lobby-card__header-actions">
            <button class="online-lobby-card__copy" onclick="event.stopPropagation(); copyRoomCodeFromLobby()">Copy code</button>
            <button class="online-lobby-card__leave" onclick="event.stopPropagation(); leaveRoomFromLobby()">Thoát phòng</button>
          </div>
        </div>

        <div class="online-lobby-card__players">
          ${i}
        </div>

        <div class="online-lobby-card__actions">
          <button
            class="online-lobby-card__ready ${t?.isReady?`is-ready`:``}"
            onclick="event.stopPropagation(); toggleReadyFromLobby()"
          >
            ${t?.isReady?`Hủy sẵn sàng`:`Sẵn sàng`}
          </button>

          <button
            class="online-lobby-card__start"
            ${n&&r?``:`disabled`}
            onclick="event.stopPropagation(); startOnlineGame()"
            title="${n?`Cần tất cả người chơi connected sẵn sàng.`:`Chỉ host P1 được bắt đầu.`}"
          >
            Bắt đầu
          </button>
        </div>

        <div class="online-lobby-card__hint">
          Host là P1. Tất cả người chơi đang trong phòng cần bấm Sẵn sàng trước khi bắt đầu.
        </div>
      </section>
    </main>
  `}function xr(e){return pr(e)?.board??null}function Sr(){return d.playerId??`p1`}function Cr(e){return!e||!d.roomState?null:d.roomState.players[e]?.score??null}function wr(){return Cr(d.playerId??`p1`)}function Tr(e){let t=Zn();return[...J??[],...Y??[],...t?.draftPool??[],...t?.pickedDraftCards??[],...t?.hand??[],...S,...Ar].find(t=>t.id===e)??null}function Er(e){let t=Tr(e.cardId);if(t&&(e.type===void 0||e.type===`card`))return t;if(e.type===`debt`)return Object.assign(Object.assign({},Ui({rowIndex:0,colIndex:0,amount:e.debtAmount??0,sourceCardName:e.sourceCardName??e.name??`Lá đã vay`,lockedReason:e.lockedReason})),{id:e.cardId});if(e.type===`lock`)return Object.assign(Object.assign({},Wi({rowIndex:0,colIndex:0,sourceCardName:e.sourceCardName??e.name??`Lá đã vay thể lực`})),{id:e.cardId});let n=e.name??e.cardId,r=e.tag||`food`;return{id:e.cardId,name:n,shortName:n,city:``,shortCity:``,image:e.image??Ln.food,rarity:`common`,rarityLabel:`★`,vp:e.vp,coin:e.coin??0,stamina:e.stamina??0,tag:r,tagLabel:r,tags:[r.toUpperCase()],icon:e.icon,description:``,bonusText:``}}function Dr(e){let t=xr(e);return t?t.map(e=>e.map(e=>e?Er(e):null)):null}function Or(){let e=d.roomState;if(!e)return;Bo(),Fr=e.phaseNumber??Fr,b=Math.max(0,Math.min(4,e.dayIndex));let t=e.players[d.playerId??`p1`];t&&(Ir=t.score),Cn(),w=e.phase===`draft`,L=e.phase===`simulation`||e.phase===`result`||e.phase===`gameover`,B=e.phase===`result`||e.phase===`gameover`,Yr=e.draftRound,Wr=e.timer,ri=e.timer,y()&&(mo(),qo(),pi());let n=e.self.draftPool??[],r=er(n),i=J!==null&&J.length>0;if(y()){let t=e.phase===`draft`&&qc!==`draft`,a=e.self.pickedDraftCards?.length??0,o=a>sl,s=e.draftRound>$c;if(t){xl(),Pa(),Z=null,Q=null,rl=null,tr();let t=document.visibilityState!==`visible`||e.timer<89;if(dl=!t,fl=!1,C=!t,D=!1,ml=!1,t)al=!1,X=0,tl=null;else{let e=pt(Math.max(1,n.length));tl=window.setTimeout(()=>{ts()},e)}}else if(e.phase===`draft`&&qc===`draft`&&(o||s)){if(D&&!$)n.length>0&&(Y=[...n]),o&&!ol&&(Z=null,Q=null);else if(!$){let e=J??rl??(n.length>0?[...n]:null);e?.length?cr(e,n):i||tr()}}else(e.phase===`draft`&&n.length>0&&(!J||J.length===0)||e.phase===`draft`&&!i)&&tr();e.phase===`planning`&&qc===`draft`&&J!==null&&J.length>0&&!$&&pl===null&&(xl(),$=!0,w=!0,L=!1,D=!0,C=!1,fl=!0,dl=!1,pl=window.setTimeout(()=>{$=!1,D=!1,J=null,Y=null,pl=null,Kc=``,ns()},1550)),e.phase!==`draft`&&!$&&(xl(),J=null,rl=null,Y=null,dl=!1,fl=!1,C=!1,D=!1),a>sl&&!ol&&!D&&(Z=null,Q=null),sl=a,qc=e.phase,$c=e.draftRound,el=r}if(y()&&e.phase===`planning`&&qc===`draft`&&!$&&!ml){ns();return}if(e.phase===`planning`&&!$){let e=lr();e&&(S=[...e]),Na()}if(e.phase===`draft`&&(S=[],ol||(E=e.self.selectedDraftCardId,e.self.selectedDraftCardId&&!Z&&!_l()&&(Z=e.self.selectedDraftCardId)),!_l()&&!ol&&(ko(),Ao(),xo())),e.phase===`simulation`||e.phase===`result`){if(y()&&!nl){hs();return}R||(R=Ei(),z=0)}else R=null,z=0,B=!1,nl=!1,Br=!1}function kr(e=b){return _t(V(),e)}var Ar=Wn(),jr=[`p1`,`p2`,`p3`,`p4`];function Mr(){return{p1:gt(),p2:gt(),p3:gt(),p4:gt()}}function Nr(){return{p1:new Set,p2:new Set,p3:new Set,p4:new Set}}function Pr(){if(y()){let e=Dr(Sr());if(e)return e}return Xr.p1}var Fr=1,b=0,Ir=0,Lr={coin:0,stamina:0},x={coin:0,stamina:0},Rr=0,zr=!1,Br=!1,Vr=null,Hr=null,Ur=Gn(Ar),S=[],C=!1,w=!0,T=[],E=null,Wr=90,Gr=null,D=!1,O=!1,k=!1,Kr=null,qr=null,Jr=null,Yr=1,Xr=Mr(),Zr={p1:new Set,p2:new Set,p3:new Set,p4:new Set},Qr=null,A=null,j=null,M=null,$r=null,ei=null,ti=null,N=null,P=null,F=null,ni=null,I=!1,L=!1,R=null,ri=15,ii=null,z=0,ai=null,B=!1,oi=!1;function V(){return Pr()}function si(){return jr.filter(e=>e!==`p1`)}function ci(e,t=b){for(let n=0;n<e.length;n+=1)if(e[n]?.[t]===null)return{rowIndex:n,colIndex:t};for(let t=0;t<e.length;t+=1)for(let n=0;n<e[t].length;n+=1)if(e[t][n]===null)return{rowIndex:t,colIndex:n};return null}function li(e,t,n){return Object.assign(Object.assign({},e),{id:`${e.id}_${t}_${b}_${n}_${Date.now()}`})}function ui(e){let t=T[{p1:1,p2:0,p3:2,p4:3}[e]]?.picked??[];return t.length>0?t:Ar}function di(e,t,n){let r=Xr[e],i=ci(r,b);i&&(r[i.rowIndex][i.colIndex]=li(t,e,n))}function fi(e){let t=0,n=Xr[e];for(let e=0;e<n.length;e+=1)n[e]?.[b]!==null&&(t+=1);return t}function pi(){Qr!==null&&(window.clearInterval(Qr),Qr=null)}function mi(){return si().some(e=>fi(e)<3)}function hi(){if(y()){pi();return}if(w||L||C){pi();return}let e=si(),t=e.filter(e=>fi(e)<3);if(t.length===0){for(let t of e)Zr[t].add(b);pi();return}let n=t[Math.floor(Math.random()*t.length)],r=ui(n),i=fi(n),a=r[i%Math.max(1,r.length)]??Ar[0];if(!a){pi();return}di(n,a,i),W()}function gi(){pi(),!y()&&(w||L||C||mi()&&(Qr=window.setInterval(()=>{hi()},1100)))}function _i(e){y()||si().forEach((t,n)=>{fi(t)>=3||di(t,e,n)})}function vi(e){let t=0;for(let n of Xr[e])for(let e of n)e&&(t+=1);return t}function yi(e,t){return $r!==null&&$r.rowIndex===e&&$r.colIndex===t}function bi(){return Ot({placedCards:kr(),getBoardDisplayName:Li})}function xi(){ai!==null&&(window.clearInterval(ai),ai=null)}function Si(){return!R||R.replaySteps.length===0?null:R.replaySteps[Math.min(z,R.replaySteps.length-1)]}function Ci(e){if(!e)return!1;let t=e;return t.isBadEvent===!0||t.isNegativeEvent===!0||t.eventType===`traffic`||t.eventType===`storm`||t.eventType===`distance`}function wi(e){return e?.eventType?e.eventType===`promo`?`eventPromo`:e.eventType===`traffic`?`eventTraffic`:e.eventType===`storm`?`eventStorm`:e.eventType===`distance`?`eventDistance`:null:null}function Ti(){let e=Si();e&&v(wi(e)??(Ci(e)?`scanBad`:`scanCell`))}function Ei(){return Pt({boardSlots:V(),currentDayIndex:b,dayLabel:qn(),rows:ht,getBoardDisplayName:Li,getCardTagKeys:yt,countCardsWithTag:bt,getCurrentDayPlacedCards:kr,forceTutorialEvent:d.roomState?.isTutorial===!0&&b===0})}function Di(){return R?{baseVP:R.baseVP,bonusVP:R.bonusVP,totalVP:R.finalVP,spentCoin:R.spentCoin,spentStamina:R.spentStamina+ss(R),usedSlots:R.usedSlots,lines:R.lines}:bi()}function Oi(){let e=R?Di():bi();return{vp:Ir,coin:e.spentCoin,stamina:e.spentStamina,usedSlots:e.usedSlots}}function ki(){let e=Oi();return Fn.map(t=>{if(!t.active)return Object.assign(Object.assign({},t),{usedSlots:t.id?vi(t.id):t.usedSlots});let n=Ai();return Object.assign(Object.assign({},t),{score:e.vp,coin:Math.max(0,n.coin),stamina:Math.max(0,n.stamina),usedSlots:e.usedSlots})})}function Ai(){if(y()){let e=gr();if(e)return{coin:e.coin,stamina:e.stamina}}let e=Gt({totals:Oi(),startingCoin:30,startingStamina:15});return{coin:e.coin+Lr.coin+x.coin,stamina:e.stamina+Lr.stamina+x.stamina}}function ji(e){return Kt({card:e,remaining:Ai()})}function Mi(e){return qt(ji(e))}function Ni(e,t,n,r){let i=e.trim().length;return i>=r?`${t} ${t}--xs`:i>=n?`${t} ${t}--sm`:t}function Pi(e){return Ni(e,`framed-card-face__name`,16,23)}function Fi(e){return Ni(e,`board-mini__name`,12,18)}function Ii(e){return Ni(e,`board-mini__city`,12,21)}function Li(e){return e.shortName?.trim()||e.name}function Ri(e){return e.shortCity?.trim()||e.city}function zi(e){return e?.boardTokenType??null}function Bi(e){return zi(e)===`debt`}function Vi(e){return zi(e)===`lock`}function Hi(e,t){return(V()[e]?.[t]??null)===null}function Ui(e){return{id:`debt_token_${e.rowIndex}_${e.colIndex}_${Date.now()}`,name:e.lockedReason?`Nợ + Kiệt sức`:`Token Nợ`,shortName:e.lockedReason?`Nợ + Kiệt sức`:`Token Nợ`,city:`Trả ${e.amount} xu`,shortCity:`Trả ${e.amount} xu`,image:Ln.food,rarity:`common`,rarityLabel:`!`,vp:0,coin:0,stamina:0,tag:`utility`,tagLabel:`Nợ`,tags:[`UTILITY`],icon:`💸`,description:`Bấm để trả ${e.amount} xu. Nếu không trả trước khi hết ngày sẽ bị -20 VP.`,bonusText:`Không trả nợ: -20 VP`,boardTokenType:`debt`,debtAmount:e.amount,lockedReason:e.lockedReason,sourceCardName:e.sourceCardName}}function Wi(e){return{id:`exhaust_lock_${e.rowIndex}_${e.colIndex}_${Date.now()}`,name:`Bị khóa`,shortName:`Bị khóa`,city:`Kiệt sức`,shortCity:`Kiệt sức`,image:Ln.food,rarity:`common`,rarityLabel:`!`,vp:0,coin:0,stamina:0,tag:`utility`,tagLabel:`Khóa`,tags:[`UTILITY`],icon:`🔒`,description:`Ô này bị khóa vì đã vay thể lực ở ${e.sourceCardName}.`,bonusText:`Không thể xếp bài vào ô này.`,boardTokenType:`lock`,lockedReason:`Kiệt sức`,sourceCardName:e.sourceCardName}}function Gi(e,t){return e<ht.length-1?{rowIndex:e+1,colIndex:t}:t<4?{rowIndex:0,colIndex:t+1}:null}function Ki(e){if(e.coinDebt>0&&(Rr+=e.coinDebt),e.staminaDebt<=0)return;let t=Gi(e.rowIndex,e.colIndex);t&&V()[t.rowIndex]?.[t.colIndex]===null&&(V()[t.rowIndex][t.colIndex]=Wi({rowIndex:t.rowIndex,colIndex:t.colIndex,sourceCardName:e.card.name}))}function qi(e,t,n){let r=n.debtAmount??0,i=Ai();if(!(r<=0)){if(i.coin<r){alert(`Không đủ xu để trả nợ. Cần ${r} xu.`);return}x=Object.assign(Object.assign({},x),{coin:x.coin-r}),V()[e][t]=null,v(`eventPromo`),W()}}function Ji(e,t,n){if(t!==b){P=n,F={rowIndex:e,colIndex:t},W();return}if(y()){fe({rowIndex:e,colIndex:t});return}qi(e,t,n)}function Yi(e,t,n){let r=Gi(e,t);if(!r)return;let i=V()[r.rowIndex]?.[r.colIndex]??null;i&&i.boardTokenType===`lock`&&i.sourceCardName===n.name&&(V()[r.rowIndex][r.colIndex]=null)}function Xi(e){return Ni(e,`framed-card-face__name`,18,25)}var Zi={action:`action`,experience:`action`,culture:`culture`,food:`food`,utility:`utility`};function Qi(e){return Zi[(e.tag||e.tags?.[0]||`food`).toLowerCase()]??`food`}function $i(e){return`./assets/cardFrames/${Qi(e)}.png`}function ea(e){let t=new Set((e.tags??[]).map(e=>e.toUpperCase())),n=[];return t.has(`INDOOR`)&&n.push(`Trong nhà`),t.has(`OUTDOOR`)&&n.push(`Ngoài trời`),n.join(` / `)}function ta(e,t){let n=t===`focused`?Xi(e.name):Pi(e.name),r=t===`focused`?`<h2 class="${n}"><span>${e.name}</span></h2>`:`<h3 class="${n}"><span>${e.name}</span></h3>`,i=Qi(e),a=ea(e);return`
    <div class="framed-card-face framed-card-face--${t} framed-card-face--frame-${i}">
      <div
        class="framed-card-face__photo"
        style="background-image: ${Bn(e)}"
        role="img"
        aria-label="${e.name}"
      ></div>

      <img
        class="framed-card-face__frame"
        src="${$i(e)}"
        alt=""
        aria-hidden="true"
        draggable="false"
      />

      ${r}
      <div class="framed-card-face__vp">${e.vp}</div>
      ${a?`<div class="framed-card-face__pill framed-card-face__pill--environment">${a}</div>`:``}
      <div class="framed-card-face__pill framed-card-face__pill--rarity">${e.rarityLabel}</div>
      <div class="framed-card-face__cost framed-card-face__cost--coin">${e.coin}</div>
      <div class="framed-card-face__cost framed-card-face__cost--stamina">${e.stamina}</div>
      <div class="framed-card-face__description">${e.description}</div>
    </div>
  `}function na(e){if(!e)return null;if(y()){let t=Qn()?.find(t=>t.id===e)??null;if(t)return t;let n=lr()?.find(t=>t.id===e)??null;if(n)return n}if(w){let t=H()?.pool.find(t=>t.id===e)??null;if(t)return t}return S.find(t=>t.id===e)??null}function ra(e,t){return vt(V(),e,t)}function ia(e){let t=kr(),n=yt(e);return n.includes(`FOOD`)&&bt(t,`FOOD`)>=2||n.includes(`CULTURE`)&&bt(t,`CULTURE`)>=2||n.includes(`ACTION`)&&bt(t,`ACTION`)>=2?!0:e.onPlayEffect?.has_effect===!0&&e.onPlayEffect.effect_type===`GAIN_VP`}function aa(e){return e.replace(/<[^>]*>/g,` `).replace(/\s+/g,` `).trim()}function oa(e){let t=e.onPlayEffect,n=yt(e).includes(`UTILITY`)||String(e.tag||``).toLowerCase()===`utility`||aa(e.tagLabel||``).toLowerCase().includes(`tiện ích`),r=aa([e.name,e.shortName||``,e.description||``,e.bonusText||``,e.tagLabel||``].join(` `)).toLowerCase(),i=Number(t?.effect_value??0),a=r.match(/(?:\+|nhận|hoi|hồi|cộng|thêm)\s*(\d+)/i),o=a?Number(a[1]):1,s=i>0?i:o;if(t?.has_effect){if(t.effect_type===`RECOVER_XU`)return{type:`coin`,value:s,label:`+${s} Xu`,icon:`🪙`};if(t.effect_type===`RECOVER_LA`)return{type:`stamina`,value:s,label:`+${s} Thể lực`,icon:`⚡`};if(t.effect_type===`GAIN_VP`)return{type:`vp`,value:s,label:`+${s} VP`,icon:`★`}}return n?r.includes(`xu`)||r.includes(`tiền`)||r.includes(`coin`)||r.includes(`gold`)?{type:`coin`,value:s,label:`+${s} Xu`,icon:`🪙`}:r.includes(`thể lực`)||r.includes(`the luc`)||r.includes(`năng lượng`)||r.includes(`nang luong`)||r.includes(`stamina`)||r.includes(`nl`)?{type:`stamina`,value:s,label:`+${s} Thể lực`,icon:`⚡`}:(r.includes(`vp`)||r.includes(`điểm`)||r.includes(`diem`),{type:`vp`,value:s,label:`+${s} VP`,icon:`★`}):null}function sa(e){let t=Date.now();ei=Object.assign(Object.assign({},e),{id:t}),ti=e.type,window.setTimeout(()=>{ei?.id===t&&(ei=null),ti===e.type&&(ti=null),W()},1050)}function ca(e,t,n){let r=oa(e);return r?(r.type===`coin`?(x=Object.assign(Object.assign({},x),{coin:x.coin+r.value}),v(`eventPromo`)):r.type===`stamina`?(x=Object.assign(Object.assign({},x),{stamina:x.stamina+r.value}),v(`eventPromo`)):r.type===`vp`&&(Ir+=r.value,v(`eventPromo`)),sa({rowIndex:t,colIndex:n,type:r.type,value:r.value}),!0):!1}function la(e,t){if(!ei||ei.rowIndex!==e||ei.colIndex!==t)return``;let{type:n,value:r}=ei;return`
    <div class="utility-effect-pop utility-effect-pop--${n}" aria-hidden="true">
      <div class="utility-effect-pop__burst"></div>
      <div class="utility-effect-pop__icon">${n===`coin`?`🪙`:n===`stamina`?`⚡`:`★`}</div>
      <div class="utility-effect-pop__label">${n===`coin`?`+${r} Xu`:n===`stamina`?`+${r} Thể lực`:`+${r} VP`}</div>
      <div class="utility-effect-pop__spark utility-effect-pop__spark--1"></div>
      <div class="utility-effect-pop__spark utility-effect-pop__spark--2"></div>
      <div class="utility-effect-pop__spark utility-effect-pop__spark--3"></div>
    </div>
  `}function ua(e,t){let n=Li(e),r=Ri(e),i=Fi(n);Ii(r);let a=ia(e),o=e;if(o.boardTokenType===`debt`)return`
      <article
        class="board-mini board-mini--token board-mini--debt"
        title="Bấm để trả ${o.debtAmount??0} xu"
      >
        <div class="board-mini-token__icon">💸</div>
        <strong>Nợ tiền ${o.debtAmount??0} xu</strong>
      </article>
    `;if(o.boardTokenType===`lock`)return`
      <article
        class="board-mini board-mini--token board-mini--lock"
        title="Ô bị khóa vì kiệt sức"
      >
        <div class="board-mini-token__icon">🔒</div>
        <strong>Bị khóa kiệt sức</strong>
      </article>
    `;let s=t?.eventType?`board-mini--event-${t.eventType}`:``,c=t?.eventType===`promo`?`✨`:t?.eventType===`traffic`?`🚧`:t?.eventType===`storm`?`⛈️`:t?.eventType===`distance`?`⚠️`:``,l=t?.eventType===`promo`?`+${t.eventVpDelta??0} VP Event`:t?.eventType===`traffic`?`${t.eventStaminaDelta??0} Thể lực`:t?.eventType===`storm`?`${t.eventVpDelta??0} VP Event`:t?.eventType===`distance`?`Khoảng cách > 20km`:``;return`
    <article
      class="board-mini board-mini--${e.rarity} ${a?`board-mini--bonus-active`:``} ${s}"
      title="${e.name} - ${e.city}${t?.eventText?` • ${t.eventText}`:``}"
    >
      ${t?.eventType?`
            <div class="board-mini__event-pill">${l}</div>
            <div class="board-mini__event-icon">${c}</div>
            ${t.eventType===`distance`?``:t.eventText?`<div class="board-mini__event-note">${t.eventText}</div>`:``}
          `:``}

      <div
        class="board-mini__image"
        style="background-image: ${Bn(e)}"
      ></div>

      <div class="board-mini__tag board-mini__tag--${e.tag}">
        ${e.tagLabel}
      </div>

      <div class="board-mini__info">
        <h3 class="${i}">${n}</h3>
        <div class="board-mini__vp">★ ${e.vp}</div>
      </div>
    </article>
  `}function da(e,t,n=!1){let r=w&&!n&&e.id===Z,i=!w&&e.id===A,a=ji(e).canAfford?Mi(e):`Thiếu tài nguyên: đặt lá này sẽ tạo nợ / kiệt sức.`;return`
    <article
      class="hand-card hand-card--${e.rarity} ${n?``:`hand-card--fan-${t+1}`} ${i?`hand-card--selected`:``} ${r?`hand-card--draft-selected`:``} "
      data-hand-card-id="${e.id}"
      data-card-tag="${e.tag}"
      title="${a}"
      onpointerdown="${w?``:`event.stopPropagation(); startHandPointerDrag(event, '${e.id}')`}"
      onclick="${w?``:`event.stopPropagation(); window['selectHandCard']('${e.id}')`}"
    >
      ${i?`<button
              class="hand-card__close"
              onclick="event.stopPropagation(); clearSelectedHandCard()"
              title="Hủy chọn"
            >×</button>`:``}

      ${ta(e,`hand`)}
    </article>
  `}function fa(e){return`
    <div class="focused-card-overlay" onclick="closeFocusedHandCard()">
      <div class="focused-card-backdrop-glow"></div>

      <article
        class="focused-card focused-card--${e.rarity}"
        onclick="event.stopPropagation()"
      >
        <button
          class="focused-card__close"
          onclick="event.stopPropagation(); closeFocusedHandCard()"
          title="Đóng"
        >×</button>

        ${ta(e,`focused`)}

        ${F?`
              <button
                class="focused-card__return-button"
                onclick="event.stopPropagation(); returnFocusedBoardCardToHand()"
                title="Rút lá này từ board về tay"
              >
                ↩ Rút về tay
              </button>
            `:``}
      </article>
    </div>
  `}function pa(){let e=H()?.pool??[],t=go();return`
    <div class="draft-hand-meta">
      <div class="draft-hand-meta__info">
        <span>Vòng ${Yr}/5</span>
        <strong>${t?Li(t):`Bấm 1 lá để chọn`}</strong>
        <em>
          ${C?`Đang phát bài vào tay...`:D?`Đang chuyền bài còn lại vào lượt kế tiếp...`:t?`Đã chọn. Hết giờ mới chuyền bài.`:e.length>0?`Bấm để chọn, giữ 0.5s để xem lớn.`:`Đang chuẩn bị bài...`}
        </em>
      </div>

      <div class="draft-hand-meta__wait">
        <span>Chờ hết giờ</span>
      </div>
    </div>
  `}function ma(){return y()?Zn()?.pickedDraftCards?.length??0:H()?.picked?.length??0}function ha(){return y()?Zn()?.pickedDraftCards??[]:H()?.picked??[]}function ga(e){return(y()?$n()??[]:H()?.pool??[]).find(t=>t.id===e)??null}function _a(){let e=ha(),t=Z;if(!t||e.some(e=>e.id===t))return e;let n=ga(t);return n?[...e,n]:e}function va(){return _a().length}var ya={1:[{rotate:0,ty:-6}],2:[{rotate:-16,ty:-4},{rotate:16,ty:-4}],3:[{rotate:-18,ty:-5},{rotate:0,ty:-10},{rotate:18,ty:-5}],4:[{rotate:-20,ty:-3},{rotate:-8,ty:-8},{rotate:8,ty:-8},{rotate:20,ty:-3}],5:[{rotate:-18,ty:-2},{rotate:-9,ty:-7},{rotate:0,ty:-11},{rotate:9,ty:-7},{rotate:18,ty:-2}]};function ba(){let e=document.documentElement,t=parseFloat(getComputedStyle(e).getPropertyValue(`--hand-card-w`))||158,n=parseFloat(getComputedStyle(e).getPropertyValue(`--hand-card-h`))||218;return{handCardW:t,handCardH:n,cardW:t*.84,cardH:n*.84,stepX:t*.46}}function xa(e,t){return ya[e]?.[t-1]??{rotate:0,ty:0}}function Sa(e,t){let n=document.querySelector(`.player-hand__cards--draft`);if(!n||e<1||t<1||t>e)return null;let r=xa(e,t),{cardW:i,cardH:a,stepX:o}=ba(),s=n.getBoundingClientRect(),c=i+(e-1)*o,l=s.left+(s.width-c)/2+(t-1)*o,u=s.bottom-a-4+r.ty;return new DOMRect(l,u,i,a)}function Ca(e){let t=e.className.match(/hand-card--picked-slot-(\d)/),n=e.closest(`[class*='picked-count-']`)?.className.match(/picked-count-(\d)/);return!t||!n?null:{count:parseInt(n[1],10),slotIndex:parseInt(t[1],10)}}function wa(){let e=va(),t=e,n=Sa(e,t);return n?{rect:n,rotate:xa(e,t).rotate}:null}function Ta(e){let t=Ca(e);if(!t)return null;let n=Sa(t.count,t.slotIndex);return n?{rect:n,rotate:xa(t.count,t.slotIndex).rotate}:null}function Ea(e){return document.querySelector(`.draft-center-card[data-draft-card-id="${e}"]`)?.closest(`.draft-center-card-wrapper`)??null}function Da(e){var t;Z=null,E===e&&(E=null),(t=Ea(e))==null||t.classList.remove(`draft-center-card-wrapper--flown-to-hand`),Ao(),ko(),Ma()}function Oa(e,t,n){let r=n?.isPending?` hand-card--picked-pending`:``,i=n?.hiddenForMeasure?` hand-card--picked-pending-hidden`:``;return`
    <article
      class="hand-card hand-card--${e.rarity} hand-card--picked-draft hand-card--picked-slot-${t+1}${r}${i}"
      data-draft-hand-card-id="${e.id}"
    >
      ${ta(e,`hand`)}
    </article>
  `}function ka(e){let t=new Set(ha().map(e=>e.id));return _a().map((n,r)=>Oa(n,r,{isPending:n.id===Z&&!t.has(n.id),hiddenForMeasure:e?.hiddenPendingMeasure&&n.id===Z})).join(``)}function Aa(){return!w||$?!1:ir()&&(rl??J)?.length||D&&Jr?.length?!0:!(ma()>=Pn)}function ja(){return y()?ir()?rl??J??[]:$n()??[]:D&&Jr?Jr:H()?.pool??[]}function Ma(){if(!w)return;let e=document.querySelector(`.deck-pile-panel__draft-confirm`);e&&(e.disabled=!((Z||E)&&!ol&&!D&&!_l()&&!k))}function Na(){if(!Po())return;let e=document.querySelector(`.deck-pile-panel__planning-confirm`);if(!e)return;let t=Vo();e.disabled=t,e.textContent=t?`Đã xác nhận`:`Xác nhận`;let n=document.querySelector(`.deck-pile-panel__planning-status`);n&&(n.textContent=Ho())}function Pa(){qr!==null&&(window.clearTimeout(qr),qr=null),O=!1,k=!1,Kr=null}function Fa(){return k||ol||D||$}function Ia(){if(!w||!Aa()||D||$)return``;let e=O?`Mở pool`:`Thu gọn`;return`
    <button
      type="button"
      class="deck-pile-panel__pool-toggle"
      onclick="event.stopPropagation(); toggleDraftPoolCollapse()"
      ${Fa()?`disabled`:``}
      title="${O?`Hiện lại pool chọn bài`:`Thu gọn pool để xem bàn cờ`}"
    >
      ${e}
    </button>
  `}function La(){let e=document.querySelector(`.deck-pile-panel__pool-toggle`);e&&(e.textContent=O?`Mở pool`:`Thu gọn`,e.disabled=Fa(),e.title=O?`Hiện lại pool chọn bài`:`Thu gọn pool để xem bàn cờ`)}function Ra(){return document.querySelector(`.draft-center-overlay:not(.draft-center-overlay--returning)`)}function za(e){var t;let n=Ra(),r=document.querySelector(`.deck-card-stack`);if(!n||!r)return!1;let i=Array.from(n.querySelectorAll(`.draft-center-card-wrapper:not(.draft-center-card-wrapper--flown-to-hand)`));if(i.length===0)return!1;n.classList.remove(`draft-center-overlay--collapsed`,`draft-center-overlay--collapsing`,`draft-center-overlay--expanding`,`pass-active`);let a=n.getBoundingClientRect(),o=r.getBoundingClientRect();return Zo(i,a.left+a.width*.5,a.top+a.height*.38,o.left+o.width*.34,o.top+o.height*.54),(t=r.closest(`.deck-pile-panel`))==null||t.classList.add(`deck-receiving`),n.classList.add(e===`collapse`?`draft-center-overlay--collapsing`:`draft-center-overlay--expanding`,`pass-active`),!0}function Ba(){var e;qr=null,k=!1,Kr=null,O=!0;let t=Ra();t?.classList.remove(`draft-center-overlay--collapsing`,`pass-active`),t?.classList.add(`draft-center-overlay--collapsed`),(e=document.querySelector(`.deck-pile-panel`))==null||e.classList.remove(`deck-receiving`),La(),Ma()}function Va(){var e;qr=null,k=!1,Kr=null,O=!1,Ra()?.classList.remove(`draft-center-overlay--expanding`,`draft-center-overlay--collapsed`,`pass-active`),(e=document.querySelector(`.deck-pile-panel`))==null||e.classList.remove(`deck-receiving`),La(),Ma()}function Ha(){Fa()||O||(k=!0,Kr=`collapse`,La(),Ma(),v(`returnDeck`),window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{za(`collapse`)||Ba()})}),qr=window.setTimeout(()=>{Ba()},ll))}function Ua(){Fa()||!O||(O=!1,k=!0,Kr=`expand`,Ra()?.classList.remove(`draft-center-overlay--collapsed`),La(),Ma(),v(`cardSelect`),window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{za(`expand`)||Va()})}),qr=window.setTimeout(()=>{Va()},ll))}function Wa(){!w||!Aa()||Fa()||(O?Ua():Ha())}function Ga(){return $&&D}function Ka(){let e=$n()??[],t=new Set((Zn()?.pickedDraftCards??[]).map(e=>e.id));return e.filter(e=>!t.has(e.id))}function qa(){let e=d.roomState?.draftTimerHold??0;if(y()){let t=Qn(),n=X>0&&Date.now()>X+180;if(t?.length&&n)return e>0}return al||C||D||e>0||Date.now()<X}function Ja(){return qa()?`Chia bài`:`${Wr}s`}function Ya(){let e=document.querySelector(`.player-hand__meta`);!e||!w||(e.textContent=qa()?`Đang chia bài...`:`Còn ${Ja()} • ${D?`Đang chuyền bài...`:`bấm 1 lá để chọn`}`,e.classList.toggle(`player-hand__meta--danger`,Xa()))}function Xa(){return!qa()&&Wr<=3}function Za(){if(!w||!Aa())return``;let e=ja();if(e.length===0)return`
      <div class="draft-center-overlay">
        <p style="color:#fff5d1; font-size:1.2rem;">Đang chuẩn bị bài...</p>
      </div>
    `;let t=e.slice(0,4),n=e.slice(4),r=(e,t)=>e.map((e,n)=>{let r=t+n,i=t+n+1,a=wo(e.id),o=D||O||k?``:`
          <button class="draft-center-btn" data-draft-card-id="${e.id}">
            CHỌN
          </button>
        `;return`
        <div class="draft-center-card-wrapper draft-center-card-wrapper--slot-${i} ${a?`draft-center-card-wrapper--flown-to-hand`:``}" style="--draft-deal-delay: ${(i-1)*55}ms">
          <div class="draft-center-card" data-draft-card-id="${e.id}">
            ${da(e,r,!0)}
          </div>
          ${o}
        </div>
      `}).join(``);return`
    <div class="draft-center-overlay ${[D&&!$?`draft-center-overlay--passing`:``,al||C?`draft-center-overlay--dealing`:``,O&&!k?`draft-center-overlay--collapsed`:``,Kr===`collapse`?`draft-center-overlay--collapsing`:``,Kr===`expand`?`draft-center-overlay--expanding`:``].filter(Boolean).join(` `)}">
      <div class="draft-center-container">
        <div class="draft-center-row" style="display: flex; flex-direction: row; gap: 12px; justify-content: center;">${r(t,0)}</div>
        <div class="draft-center-row" style="display: flex; flex-direction: row; gap: 12px; justify-content: center;">${r(n,4)}</div>
      </div>
      ${fr()?`<div class="draft-center-wait-banner">Đang chờ đối thủ...</div>`:``}
    </div>
  `}function Qa(){return Ga()?`
    <div class="draft-center-overlay draft-center-overlay--returning">
      <div class="draft-center-container draft-center-container--return">
        ${Ka().map((e,t)=>`
        <div class="draft-center-card-wrapper draft-center-card-wrapper--return draft-center-card-wrapper--return-${t+1}">
          <div class="draft-center-card">
            ${da(e,t,!0)}
          </div>
        </div>
      `).join(``)}
      </div>
    </div>
  `:``}function $a(e){return(T[{p1:1,p2:0,p3:2,p4:3}[e]]?.picked??[]).map(e=>e.icon)}function eo(e){return!!(e&&e!==`p1`&&w)}function to(e){let t=xr(e);if(!t)return Array.from({length:25}).map(()=>`<div class="opponent-cell">+</div>`).join(``);let n=[];for(let e of t)for(let t of e){if(!t){n.push(`<div class="opponent-cell">+</div>`);continue}n.push(`
        <div
          class="opponent-cell opponent-cell--filled opponent-cell--${t.tag}"
          title="${t.cardId} • ${t.tag} • ${t.vp} VP"
        >
          ${t.icon}
        </div>
      `)}return n.join(``)}function no(e){if(!e)return Array.from({length:25}).map(()=>`<div class="opponent-cell">+</div>`).join(``);if(d.roomState)return to(e);let t=Xr[e],n=eo(e)?$a(e):[],r=[],i=0;for(let e of t)for(let t of e){let e=n[i]??``;if(!t){r.push(`
          <div
            class="opponent-cell ${e?`opponent-cell--draft-preview`:``}"
            title="${e?`Người chơi này đã chọn 1 lá trong phase draft`:``}"
          >
            ${e||`+`}
          </div>
        `),i+=1;continue}r.push(`
        <div
          class="opponent-cell opponent-cell--filled opponent-cell--${t.tag}"
          title="${t.name} • ${t.tagLabel} • ${t.vp} VP"
        >
          ${t.icon}
        </div>
      `),i+=1}return r.join(``)}function ro(e){let t=pr(e.id),n=t?Object.assign(Object.assign({},e),{name:t.name,score:t.score,coin:t.coin,stamina:t.stamina,usedSlots:t.usedSlots}):e,r=t?.isConnected===!1?` side-player--offline`:``;return`
    <section class="side-player ${n.active?`side-player--active`:``}${r}">
      <div class="side-player__top">
        <div class="side-player__identity">
          <span class="rank">#${n.rank}</span>
          <h3>${n.name}</h3>
        </div>

        <div class="side-player__score">
          ${n.score}
          ${t?.hasJoined&&t?.isConnected===!1?`<span class="side-player__offline-badge">OFFLINE</span>`:``}
        </div>
      </div>

      <div class="side-player__resources">
        <span>🪙 ${n.coin}</span>
        <span class="separator">|</span>
        <span>⚡ ${n.stamina}</span>
        <span class="slot-count">${n.usedSlots}/25</span>
      </div>

      <div class="opponent-board">
        ${no(n.id)}
      </div>
    </section>
  `}function H(){return St(T,xt())}function ao(){return!y()}function oo(e){let t=String(e.id??e.card_id??``).toUpperCase();if(t.includes(`_CULT_`)||t.startsWith(`SG_CULT`))return`CULTURE`;if(t.includes(`_ACT_`)||t.startsWith(`SG_ACT`))return`ACTION`;if(t.includes(`_UTIL_`)||t.startsWith(`SG_UTIL`))return`UTILITY`;if(t.includes(`_FOOD_`)||t.startsWith(`SG_FOOD`))return`FOOD`;let n=(e.tags??[]).map(e=>String(e).toUpperCase());if(n.includes(`CULTURE`))return`CULTURE`;if(n.includes(`ACTION`))return`ACTION`;if(n.includes(`UTILITY`))return`UTILITY`;if(n.includes(`FOOD`))return`FOOD`;let r=String(e.tag??``).toUpperCase();return r===`CULTURE`?`CULTURE`:r===`ACTION`?`ACTION`:r===`UTILITY`?`UTILITY`:r===`FOOD`?`FOOD`:`UNKNOWN`}function so(e){let t=[...e];for(let e=t.length-1;e>0;--e){let n=Math.floor(Math.random()*(e+1)),r=t[e];t[e]=t[n],t[n]=r}return t}function co(e){return e.reduce((e,t)=>{let n=oo(t);return e[n]=(e[n]??0)+1,e},{})}function lo(e,t,n,r,i){if(n.length>=i)return;let a=e.get(t);if(!a||a.length===0)return;let o=a.shift();!o||r.has(o.id)||(n.push(o),r.add(o.id))}function uo(e){let t=[`FOOD`,`CULTURE`,`ACTION`,`UTILITY`,`FOOD`,`CULTURE`,`ACTION`];if(e<=t.length)return so(t.slice(0,e));let n=[...t],r=[`FOOD`,`CULTURE`,`ACTION`,`UTILITY`];for(;n.length<e;)n.push(r[n.length%r.length]);return so(n)}function fo(e){if(e<=0||Ur.length===0)return[];let t=Gn(Ur),n=new Map;for(let e of t){let t=oo(e),r=n.get(t)??[];r.push(e),n.set(t,r)}for(let[e,t]of n.entries())n.set(e,so(t));let r=[],i=new Set,a=uo(e);for(let t of a)lo(n,t,r,i,e);let o=so([`CULTURE`,`ACTION`,`UTILITY`,`FOOD`,`UNKNOWN`]);for(;r.length<e;){let t=!1;for(let a of o){let o=r.length;if(lo(n,a,r,i,e),r.length>o&&(t=!0),r.length>=e)break}if(!t)break}return Ur=t.filter(e=>!i.has(e.id)),console.log(`[Draft] deck tag counts before draw:`,co(t)),console.log(`[Draft] single-player pool:`,r.map(e=>`${e.id}:${oo(e)}`)),console.log(`[Draft] single-player pool tag counts:`,co(r)),r}function po(){if(!ao())return;let e=xt(),t=H();if(!t)return;t.pool.length>0&&(Ur=Gn([...Ur,...t.pool]));let n=fo(Math.max(Nn-t.picked.length,Nn-Pn+1));T=T.map((t,r)=>r===e?Object.assign(Object.assign({},t),{pool:n}):t)}function mo(){Gr!==null&&(window.clearInterval(Gr),Gr=null)}function ho(){mo(),!y()&&(!w||D||(Gr=window.setInterval(()=>{if(--Wr,Wr<=0){Wr=0,bo();return}if(k){Ya();return}W()},1e3)))}function go(){if(y()){let e=$n(),t=dr();return!e||!t?null:e.find(e=>e.id===t)??null}let e=H();return!e||!E?null:e.pool.find(e=>e.id===E)??null}function _o(){T=wt(T)}function vo(){mo(),Xo();let e=H(),t=T.reduce((e,t)=>(e.push(...t.pool),e),[]);t.length>0&&(Ur=Gn([...Ur,...t])),S=e?e.picked.slice(0,Pn):[],w=!1,D=!1,E=null,Wr=0,C=!0,W(),is()}function yo(e){if(!w||D)return;let t=xt(),n=[];if(ao()){let r=H();if(!r||r.pool.length===0){vo();return}let i=r.pool.find(t=>t.id===e)??Ct(r.pool);if(!i){vo();return}n.push({playerIndex:t,pickedCard:i}),Jr=[...r.pool],T=T.map((e,n)=>n===t?Object.assign(Object.assign({},e),{picked:[...e.picked,i],pool:e.pool.filter(e=>e.id!==i.id)}):e),E=null,Z=null,Q=null,D=!0,mo(),W(),Qo(),window.setTimeout(()=>{Jr=null;let e=H();if(!e||e.picked.length>=Pn){D=!1,vo();return}po(),Un(),Yr+=1,Wr=90,D=!1,rs()},ft);return}let r=H();Jr=r?[...r.pool]:null,T=T.map((r,i)=>{if(r.pool.length===0)return r;let a=i===t?r.pool.find(t=>t.id===e)??Ct(r.pool):Ct(r.pool);return a?(n.push({playerIndex:i,pickedCard:a}),Object.assign(Object.assign({},r),{picked:[...r.picked,a],pool:r.pool.filter(e=>e.id!==a.id)})):r}),E=null,Z=null,Q=null,D=!0,mo(),W(),Qo(),window.setTimeout(()=>{Jr=null;let e=H();if(!e||e.picked.length>=Pn){D=!1,vo();return}_o(),Un(),Yr+=1,Wr=90,D=!1,rs()},ft)}function bo(){let e=H();if(!e||e.picked.length>=Pn){vo();return}yo(E??null)}function xo(){Ao();let e=go(),t=document.querySelector(`.draft-hand-meta__info strong`);t&&(t.textContent=e?Li(e):`Bấm 1 lá để chọn`);let n=document.querySelector(`.draft-hand-meta__info em`);n&&(n.textContent=e?`Đã chọn. Bấm lại lá đó để hủy chọn.`:`Bấm để chọn, giữ 0.5s để xem lớn.`);let r=document.querySelector(`.draft-center-wait-banner`);r&&(r.style.display=fr()?``:`none`),Ma()}function So(){let e=document.querySelector(`.draft-pick-fly-layer`);return e||(e=document.createElement(`div`),e.className=`draft-pick-fly-layer`,document.body.appendChild(e)),e}function Co(e){return Math.max(.85,Math.min(1.2,e))}function wo(e){return _l()?e===Z||e===Q:e===Z||e===Q?!0:D||$?ha().some(t=>t.id===e):!1}function To(e,t,n,r,i){let a=So(),{cardW:o,cardH:s}=ba(),c=i?.flyWidth??o,l=i?.flyHeight??s,u=e.left+e.width/2,d=e.top+e.height/2,f=t.left+t.width/2,p=t.top+t.height/2,m=i?.scaleStart??1,h=i?.rotateStart??0,ee=i?.rotateEnd??0,g=document.createElement(`div`);return g.className=`draft-pick-fly-card`,i?.direction===`to-pool`&&g.classList.add(`draft-pick-fly-card--to-pool`),g.style.left=`${u-c/2}px`,g.style.top=`${d-l/2}px`,g.style.width=`${c}px`,g.style.height=`${l}px`,g.style.setProperty(`--fly-dx`,`${f-u}px`),g.style.setProperty(`--fly-dy`,`${p-d}px`),g.style.setProperty(`--fly-scale-start`,String(m)),g.style.setProperty(`--fly-scale-end`,String(r)),g.style.setProperty(`--fly-rotate-start`,`${h}deg`),g.style.setProperty(`--fly-rotate-end`,`${ee}deg`),g.innerHTML=n,a.appendChild(g),g.offsetHeight,g.classList.add(`draft-pick-fly-card--animating`),new Promise(e=>{let t=!1,n=()=>{t||(t=!0,g.remove(),a.childElementCount===0&&a.remove(),e())};g.addEventListener(`animationend`,n,{once:!0}),window.setTimeout(n,cl+100)})}function Eo(e){return jn(this,void 0,void 0,function*(){if(!ga(e)){Da(e);return}let t=Ea(e),n=t?.querySelector(`.hand-card`),r=n?.getBoundingClientRect(),i=n?.outerHTML;if(!r||!i||!n||!t||r.width<=0||r.height<=0){Da(e);return}Z=e,t.classList.add(`draft-center-card-wrapper--flown-to-hand`),Ao(),ko({hiddenPendingMeasure:!0}),yield new Promise(e=>{window.requestAnimationFrame(()=>window.requestAnimationFrame(()=>e()))});let a=wa();if(!a){Da(e);return}let o=Co(r.width/ba().cardW);yield To(r,a.rect,i,ul,{direction:`to-hand`,scaleStart:o,rotateStart:0,rotateEnd:a.rotate,flyWidth:ba().cardW,flyHeight:ba().cardH}),ko()})}function Do(e){return jn(this,void 0,void 0,function*(){let t=document.querySelector(`[data-draft-hand-card-id="${e}"]`),n=t?.outerHTML,r=t?Ta(t):null,i=r?.rect??t?.getBoundingClientRect();if(!i||!n||!t||i.width<=0||i.height<=0)return;t.classList.add(`hand-card--picked-pending-hidden`),Q=e,Ao();let a=Ea(e),o=(a?.querySelector(`.hand-card`))?.getBoundingClientRect()??a?.getBoundingClientRect();if(!o){Z=null,Q=null,ko(),Ao();return}let{cardW:s,cardH:c}=ba(),l=Co(o.width/s);try{yield To(i,o,n,l,{direction:`to-pool`,scaleStart:ul,rotateStart:r?.rotate??0,rotateEnd:0,flyWidth:s,flyHeight:c})}finally{Z=null,Q=null,ko(),Ao()}})}function Oo(e,t){return jn(this,void 0,void 0,function*(){let n=document.querySelector(`[data-draft-hand-card-id="${e}"]`),r=n?Ta(n):null,i=r?.rect??n?.getBoundingClientRect(),a=n?.outerHTML,o=Ea(t)?.querySelector(`.hand-card`),s=o?.getBoundingClientRect(),c=o?.outerHTML,l=Ea(e)?.querySelector(`.hand-card`),u=l?.getBoundingClientRect(),d=l?.outerHTML;if(!i||!a||!s||!c||!u||!d||!n||i.width<=0||s.width<=0||u.width<=0)return;n.classList.add(`hand-card--picked-pending-hidden`),Z=t,Q=e,Ao(),ko({hiddenPendingMeasure:!0}),yield new Promise(e=>{window.requestAnimationFrame(()=>window.requestAnimationFrame(()=>e()))});let f=wa();if(!f){n.classList.remove(`hand-card--picked-pending-hidden`),Z=e,Q=null,Ao(),ko();return}let{cardW:p,cardH:m}=ba(),h=Co(u.width/p),ee=Co(s.width/p);try{yield Promise.all([To(i,u,a,h,{direction:`to-pool`,scaleStart:ul,rotateStart:r?.rotate??0,rotateEnd:0,flyWidth:p,flyHeight:m}),To(s,f.rect,c,ul,{scaleStart:ee,rotateStart:0,rotateEnd:f.rotate,flyWidth:p,flyHeight:m})])}finally{Q=null,ko(),Ao()}})}function ko(e){let t=document.querySelector(`.player-hand__cards--draft`);t&&(t.className=`player-hand__cards player-hand__cards--draft player-hand__cards--picked player-hand__cards--picked-count-${va()}`,t.innerHTML=ka(e))}function Ao(){document.querySelectorAll(`.draft-center-card-wrapper`).forEach(e=>{let t=e.querySelector(`.draft-center-card[data-draft-card-id]`),n=t?.dataset.draftCardId;if(!n)return;e.classList.remove(`draft-center-card-wrapper--selected`),e.classList.toggle(`draft-center-card-wrapper--flown-to-hand`,wo(n)),t.style.removeProperty(`z-index`),t.style.removeProperty(`isolation`);let r=t.querySelector(`.hand-card`);r?.classList.remove(`hand-card--draft-selected`),r?.style.removeProperty(`z-index`),r?.style.removeProperty(`position`);let i=e.querySelector(`.draft-center-btn`);i&&(i.textContent=`CHỌN`,i.classList.remove(`daily-draft-card--selected`),i.style.removeProperty(`z-index`),i.style.removeProperty(`isolation`))})}function jo(e,t,n){return jn(this,void 0,void 0,function*(){ol=!0;let r=!1;try{t?e?e!==t&&(yield Oo(e,t),r=Z===t):(yield Eo(t),r=Z===t):e&&(yield Do(e),r=!0),r&&ko(),xo(),y()&&se(n)}finally{ol=!1,Ma(),La()}})}function Mo(e){if(!w||ol||D||_l()||O||k||I&&(I=!1,N||P||F))return;let t=Z,n=E===e?null:e;v(`cardSelect`),E=n,N=null,P=null,F=null,n&&!t&&(Z=n,Ao(),ko({hiddenPendingMeasure:!0}),Ma()),jo(t,n,e)}function No(){if(!w||ol||D||!(Z||E))return;let e=E??Z;if(e){if(y()){ce();return}yo(e)}}function Po(){return y()&&d.roomState?.phase===`planning`}function Fo(){let e=d.playerId,t=d.roomState;if(!e||!t)return``;let n=(t.self.hand??[]).map(e=>e.id).join(`,`),r=t.dayIndex;return`${r}|${n}|${(t.players[e]?.board??[]).map(e=>e[r]).map(e=>e?.cardId??`-`).join(`,`)}`}function Io(){Jc=!1,Yc=``,Qc=0,Zc!==null&&(window.clearTimeout(Zc),Zc=null)}function Lo(){let e=d.roomState;if(!e)return{total:0,confirmed:0};let t=jr.filter(t=>{let n=e.players[t];return n?.isConnected===!0&&n?.hasJoined===!0}),n=t.filter(t=>e.players[t]?.planningConfirmed===!0).length;return{total:t.length,confirmed:n}}function Ro(){let e=d.playerId,t=d.roomState;return!e||!t?!1:t.phase===`simulation`||t.phase===`result`?!0:t.players[e]?.planningConfirmed===!0}function zo(){if(Zc===null&&!(!Jc||!Po())){if(Ro()){Io();return}Zc=window.setTimeout(()=>{if(Zc=null,!Jc||!Po()||Ro()){Io(),Na();return}if(Qc+=1,Qc>8){Na();return}try{le()}catch{Io(),Na();return}zo()},2e3)}}function Bo(){let e=d.roomState,t=d.playerId;if(!e||!t){Io();return}if(e.phase!==`planning`){Io(),Xc=null;return}if(Xc!==null&&Xc!==e.dayIndex&&Io(),Xc=e.dayIndex,e.players[t]?.planningConfirmed===!0){Io();return}Jc&&zo(),Jc&&Yc!==Fo()&&Io()}function Vo(){let e=d.playerId,t=d.roomState;return!e||!t?.players[e]?!1:t.players[e].planningConfirmed===!0?!0:Jc&&Yc!==``&&Yc===Fo()}function Ho(){let e=d.roomState,t=Lo();if(e?.phase===`simulation`)return`Đang quét...`;if(t.total<=0)return``;let n=e?.players[d.playerId??`p1`]?.planningConfirmed===!0;return Vo()&&!n?Qc>8?t.total<=1?`Không kết nối server • chạy: cd TREKPOLOGY/server && npm start`:`Không nhận phản hồi server • thử reload trang`:t.total<=1?`Đã xác nhận • đang chạy lịch trình...`:t.total>1?`Đã xác nhận • chờ ${Math.max(0,t.total-t.confirmed-1)} người (${t.confirmed+1}/${t.total})`:`Đã xác nhận • đang đồng bộ server...`:t.confirmed>=t.total?`Đủ người xác nhận • đang quét...`:Vo()?`Đã xác nhận • chờ ${t.total-t.confirmed} người (${t.confirmed}/${t.total})`:t.total>1?`Cần tất cả online xác nhận (${t.confirmed}/${t.total})`:``}function Uo(){if(Po()&&!Vo()){Jc=!0,Yc=Fo(),Qc=0;try{le()}catch(e){Io();let t=e instanceof Error?e.message:`Không gửi được xác nhận.`;alert(t),Na();return}Na(),zo()}}function Wo(e){if(!(w||L||C)){if(I){I=!1;return}v(`cardSelect`),A=A===e?null:e,j=null,N=null,P=null,F=null,q()}}function Go(){w||(A=null,j=null,N=null,P=null,F=null,W())}function Ko(e){let t=Math.max(0,e),n=Math.floor(t/60),r=t%60;return`${n}:${r<10?`0${r}`:`${r}`}`}function qo(){ii!==null&&(window.clearInterval(ii),ii=null)}function Jo(){qo(),!y()&&(L||w||(ii=window.setInterval(()=>{if(--ri,ri<=0){ri=0,qo(),ls();return}W()},1e3)))}function Yo(){Vr!==null&&(window.clearTimeout(Vr),Vr=null)}function Xo(){Hr!==null&&(window.clearTimeout(Hr),Hr=null)}function Zo(e,t,n,r,i){e.forEach((a,o)=>{let s=a.getBoundingClientRect(),c=s.left+s.width*.5,l=s.top+s.height*.5,u=o-(e.length-1)/2,d=t-c+u*5,f=n-l+Math.abs(u)*3,p=r-c+u*2,m=i-l+u*2,h=d+(p-d)*.34,ee=Math.min(f,m)-150-Math.abs(u)*7,g=d+(p-d)*.72,_=Math.min(f,m)-185-Math.abs(u)*5;a.style.setProperty(`--gather-x`,`${d}px`),a.style.setProperty(`--gather-y`,`${f}px`),a.style.setProperty(`--gather-r`,`${u*4}deg`),a.style.setProperty(`--arc1-x`,`${h}px`),a.style.setProperty(`--arc1-y`,`${ee}px`),a.style.setProperty(`--arc2-x`,`${g}px`),a.style.setProperty(`--arc2-y`,`${_}px`),a.style.setProperty(`--deck-in-x`,`${p}px`),a.style.setProperty(`--deck-in-y`,`${m}px`),a.style.setProperty(`--deck-r`,`${-6+u*3}deg`)})}function Qo(){v(`returnDeck`),window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{var e;let t=document.querySelector(`.draft-center-overlay--passing:not(.draft-center-overlay--returning)`)??document.querySelector(`.draft-center-overlay:not(.draft-center-overlay--returning)`),n=document.querySelector(`.deck-card-stack`);if(!t||!n)return;let r=Array.from(t.querySelectorAll(`.draft-center-card-wrapper:not(.draft-center-card-wrapper--flown-to-hand)`));if(r.length===0)return;t.classList.add(`draft-center-overlay--passing`);let i=t.getBoundingClientRect(),a=n.getBoundingClientRect();Zo(r,i.left+i.width*.5,i.top+i.height*.38,a.left+a.width*.34,a.top+a.height*.54),(e=n.closest(`.deck-pile-panel`))==null||e.classList.add(`deck-receiving`),t.classList.add(`pass-active`)})})}function $o(){v(`returnDeck`),window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{var e;let t=document.querySelector(`.draft-center-overlay--returning`),n=document.querySelector(`.deck-card-stack`);if(!t||!n)return;let r=Array.from(t.querySelectorAll(`.draft-center-card-wrapper--return`)),i=t.getBoundingClientRect(),a=n.getBoundingClientRect();Zo(r,i.left+i.width*.5,i.top+i.height*.38,a.left+a.width*.34,a.top+a.height*.54),(e=n.closest(`.deck-pile-panel`))==null||e.classList.add(`deck-receiving`),t.classList.add(`pass-active`)})})}function es(){C=!1,Hr=null,yl(),X=0;let e=document.querySelector(`.player-hand`);e?.classList.remove(`player-hand--dealing`,`is-dealing`,`deal-active`);let t=e?.querySelector(`.player-hand__meta`);t&&(t.textContent=qa()?`Đang chia bài...`:`Còn ${Ja()} • bấm 1 lá để chọn`);let n=e?.querySelector(`.draft-hand-meta__info em`);n&&(n.textContent=`Nếu không chọn, hết giờ sẽ chọn ngẫu nhiên.`),ho(),La()}function ts(){C=!1,tl=null,yl(),X=0;let e=document.querySelector(`.player-hand`);e?.classList.remove(`player-hand--dealing`,`is-dealing`,`deal-active`);let t=e?.querySelector(`.player-hand__meta`);t&&(t.textContent=qa()?`Đang chia bài...`:`Còn ${Ja()} • bấm 1 lá để chọn`);let n=e?.querySelector(`.draft-hand-meta__info em`);n&&(n.textContent=`Bấm để chọn, giữ 0.5s để xem lớn.`),xo(),Ma(),La()}function ns(){let e=lr();e&&(S=[...e]),w=!1,L=!1,D=!1,C=!0,ml=!0,v(`deal`),q(),Kc=Sl(),window.requestAnimationFrame(()=>{document.querySelector(`.player-hand:not(.player-hand--draft)`)?.classList.add(`planning-deal-active`)}),window.setTimeout(()=>{C=!1;let e=document.querySelector(`.player-hand`);e?.classList.remove(`player-hand--dealing`,`is-dealing`,`deal-active`,`planning-deal-active`);let t=e?.querySelector(`.player-hand__meta`);t&&(t.textContent=`Giữ 0.5s để xem lớn`)},1760)}function rs(){mo(),Xo(),Pa(),C=!0,E=null,W();let e=or();bl(e),Hr=window.setTimeout(()=>{es()},e)}function is(){Xo(),Hr=window.setTimeout(()=>{C=!1,Hr=null;let e=document.querySelector(`.player-hand`);e?.classList.remove(`player-hand--dealing`,`is-dealing`,`deal-active`);let t=e?.querySelector(`.player-hand__meta`);t&&(t.textContent=`Giữ 0.5s để xem lớn`),Jo(),!w&&!L&&(gi(),window.setTimeout(()=>{hi()},250))},1320)}function as(){Yo(),Xo(),xi(),qo(),pi(),Kn(),b>=4?(!zr&&Rr>0&&(Ir-=Rr*10,zr=!0),Fr+=1,b=0,Xr=Mr(),Zr=Nr(),Ur=Gn(Ar),Lr={coin:0,stamina:0},x={coin:0,stamina:0},Rr=0,zr=!1):b+=1,L=!1,R=null,z=0,B=!1,Br=!1,ri=15,A=null,j=null,N=null,P=null,F=null,$r=null,I=!1}function os(e){return e?e.replaySteps.reduce((e,t)=>({coin:e.coin,stamina:e.stamina+(t.eventStaminaDelta??0)}),{coin:0,stamina:0}):{coin:0,stamina:0}}function ss(e){let t=os(e);return Math.abs(Math.min(0,t.stamina))}function cs(){if(!R||Br)return;let e=os(R);Ir+=R.finalVP,x={coin:x.coin+e.coin,stamina:x.stamina+e.stamina},Br=!0}function ls(){U(),ec(),pi(),A=null,j=null,N=null,P=null,F=null,I=!1,R=Ei(),z=0,B=!1,L=!0,Ti(),qo(),xi(),ai=window.setInterval(()=>{if(R){if(z>=R.replaySteps.length-1){z=R.replaySteps.length-1,B=!0,cs(),xi(),W(),Yo(),Vr=window.setTimeout(()=>{as()},1800);return}z+=1,Ti(),W()}},850),W()}var us=-1,ds=!1;function fs(){return ds}function ps(){ds&&(ds=!1,ie(),ms())}function ms(){xi(),ai=window.setInterval(()=>{if(R){if(z>=R.replaySteps.length-1){z=R.replaySteps.length-1,B=!0,xi(),q();return}if(z+=1,Ti(),z===us&&!ds){ds=!0,re(),xi(),q();return}q()}},850)}function hs(){if(U(),ec(),pi(),qo(),xi(),A=null,j=null,N=null,P=null,F=null,I=!1,R=Ei(),z=0,B=!1,L=!0,nl=!0,ds=!1,us=d.roomState?.isTutorial===!0&&b===0?R.replaySteps.findIndex(e=>!!e.eventType):-1,Ti(),us===0){ds=!0,re(),q();return}ms(),q()}function gs(){pi(),L=!1,R=null,z=0,B=!1,Br=!1,ri=15,Yo(),Xo(),C=!1,xi(),A=null,j=null,N=null,P=null,F=null,I=!1,W(),Jo()}function _s(){let e=Di(),t=d.roomState?.phase===`lobby`||d.roomState?.phase===`cinematic`,n=wr()??(R?Ts():Ir),r=hr();return`
    <section class="score-breakdown score-breakdown--status" title="${r}">
      <div class="score-breakdown__header score-breakdown__capsule score-breakdown__capsule--score">
        <span>ĐIỂM</span>
        <strong>${n}</strong>
      </div>

      <div class="score-breakdown__details score-breakdown__capsule score-breakdown__capsule--phase">
        <span>PHASE</span>
        <strong>${r}</strong>
      </div>

      <div class="score-breakdown__item score-breakdown__capsule score-breakdown__capsule--slots">
        <span>SLOT</span>
        <strong>${e.usedSlots}/5</strong>
      </div>

      ${t?`
            <div class="score-breakdown__lobby-actions">
              <button
                class="online-start-button"
                onclick="event.stopPropagation(); startOnlineGame()"
                title="Bắt đầu trò chơi cho toàn bộ người chơi trong phòng."
              >
                ▶ Bắt đầu trò chơi
              </button>
            </div>
          `:``}

      ${R?`
            <button
              class="score-breakdown__timer score-breakdown__timer--reset"
              onclick="event.stopPropagation(); resetSimulation()"
              title="Prototype: mở khóa để test lại lượt"
            >
              ↺ Test lại
            </button>
          `:w?`
              <div
                class="score-breakdown__timer ${Xa()?`score-breakdown__timer--danger`:``}"
                title="Thời gian chọn bài trong phase chia bài."
              >
                <span>DRAFT</span>
                <strong>${Ja()}</strong>
              </div>
            `:`
              <div
                class="score-breakdown__timer ${ri<=10?`score-breakdown__timer--danger`:``}"
                title="Đồng hồ đếm ngược. Hết giờ hệ thống tự mô phỏng."
              >
                <span>TIME</span>
                <strong>${Ko(ri)}</strong>
              </div>
            `}
    </section>
  `}function vs(){if(L||R||Yn())return``;let e=Ai();return`
    <div class="resource-orbs" aria-label="Tài nguyên hiện tại">
      <div class="resource-orb resource-orb--coin ${ti===`coin`?`resource-orb--effect-pulse`:``}" title="Xu hiện có">
        <div class="resource-orb__frame">
          <div class="resource-orb__icon resource-orb__icon--coin">💰</div>
          <div class="resource-orb__value">${e.coin}</div>
        </div>
        <div class="resource-orb__label">TIỀN</div>
      </div>

      <div class="resource-orb-cluster resource-orb-cluster--stamina">
        <div class="resource-orb resource-orb--stamina ${ti===`stamina`?`resource-orb--effect-pulse`:``}" title="Thể lực hiện có">
          <div class="resource-orb__frame">
            <div class="resource-orb__icon resource-orb__icon--stamina">🏃</div>
            <div class="resource-orb__value">${e.stamina}</div>
          </div>
          <div class="resource-orb__label">THỂ LỰC</div>
        </div>
      </div>
    </div>
  `}function ys(){if(!Yn())return``;let e=Xn(),t=d.playerId;return`
    <section class="final-ranking-panel">
      <div class="final-ranking-panel__header">
        <span>KẾT THÚC PHASE</span>
        <h2>Bảng xếp hạng cuối cùng</h2>
        <p>Hết 5 ngày. BXH sẽ tự đóng sau ${d.roomState?.timer??10}s để qua Phase ${Fr+1}.</p>
      </div>

      <div class="final-ranking-panel__list">
        ${e.map((e,n)=>`
              <div class="final-ranking-row ${e.playerId===t?`final-ranking-row--self`:``}">
                <div class="final-ranking-row__rank">#${n+1}</div>

                <div class="final-ranking-row__name">
                  <strong>${e.name}</strong>
                  <span>${e.playerId}${e.isConnected?``:` • offline`}</span>
                </div>

                <div class="final-ranking-row__score">${e.score} VP</div>

                <div class="final-ranking-row__meta">
                  <span>🪙 ${e.coin}</span>
                  <span>⚡ ${e.stamina}</span>
                  <span>${e.usedSlots}/25</span>
                </div>
              </div>
            `).join(``)}
      </div>

      ${bs(`travel-export-panel--final`)}

      <div class="final-ranking-panel__footer">
        ${Fr>=3?`Đã kết thúc Phase 3. Đây là kết quả cuối của game.`:`Đang chuẩn bị chuyển sang Phase ${Fr+1}...`}
      </div>
    </section>
  `}function bs(e=``){return`
    <div class="flow-export travel-export-panel ${e}">
      <span>Xuất lịch trình</span>
      <p>Xuất board hiện tại thành lịch trình du lịch để lưu hoặc chia sẻ.</p>
      <div class="flow-export__actions">
        <button onclick="event.stopPropagation(); downloadTravelCertificateHtml()">Certificate</button>
        <button onclick="event.stopPropagation(); copyTravelTimeline()">Copy text</button>
      </div>
    </div>
  `}function xs(e){return e>0?`+${e} VP`:e<0?`${e} VP`:`0 VP`}function Ss(){return R?R.replaySteps.slice(0,z+1).reduce((e,t)=>e+t.vpDelta,0):0}function Cs(){return R&&Br?Ir-R.finalVP:Ir}function ws(){return R?Cs()+(B?R.finalVP:Ss()):Ir}function Ts(){return R?B?Ir:Cs():Ir}function Es(){let e=document.querySelector(`.ticket-scan-strip`),t=document.querySelector(`.ticket-scan-track`);if(!e||!t)return;let n=t.querySelectorAll(`.score-ticket`);if(n.length===0)return;let r=n[Math.max(0,Math.min(z,n.length-1))];if(!r)return;let i=Math.round(e.clientWidth*.2),a=Math.round(i-r.offsetLeft);t.style.setProperty(`transition`,`none`,`important`),t.style.transform=`translateX(${a}px)`,t.offsetWidth,t.style.removeProperty(`transition`)}function Ds(){if(!R)return``;let e=R,t=Si(),n=Math.max(1,e.replaySteps.length),r=Math.min(z+1,n),i=B?e.finalVP:Ss(),a=e=>e===`storm`?`⛈`:e===`traffic`?`🚦`:e===`distance`?`🧭`:e===`promo`?`🏷`:`✦`,o=e=>e.eventText?e.eventText:e.eventType===`storm`?`Mưa giông`:e.eventType===`traffic`?`Kẹt xe`:e.eventType===`distance`?`Xa tuyến`:e.eventType===`promo`?`Ưu đãi`:``;return`
    <section class="ticket-scan-overlay" onclick="event.stopPropagation()">
      <div class="ticket-scan-overlay__scrim"></div>

      <div class="ticket-scan-overlay__header">
        <span>ĐANG QUÉT TÍNH ĐIỂM</span>
        <strong>${Jn()} • ${qn()}</strong>
        <em>${t?`Đang tính: ${t.timeLabel}`:`Đang chuẩn bị...`}</em>
      </div>

      <div class="ticket-scan-strip">
        <div class="ticket-scan-strip__backdrop"></div>

        <div
          class="ticket-scan-track"
          data-scan-index="${z}"
          style="--scan-index: ${z};"
        >
          ${e.replaySteps.map((t,r)=>{let i=r===n-1,s=!B&&i&&r===z,c=!B&&r===z&&!s,l=B||r<z||s,u=!B&&r>z,d=o(t),f=!!(t.eventType||t.eventText);return`
                <article
                  class="score-ticket ${c?`is-active`:``} ${l?`is-torn`:``} ${u?`is-future`:``} ${t.isEmpty?`is-empty`:``} ${f?`has-event`:``} ${t.eventType?`score-ticket--event-${t.eventType}`:``}"
                >
                  <div class="score-ticket__perforation score-ticket__perforation--left"></div>
                  <div class="score-ticket__perforation score-ticket__perforation--right"></div>

                  <div class="score-ticket__head">
                    <span>${t.timeLabel}</span>
                    <strong>${t.vpDelta>=0?`+`:``}${t.vpDelta} VP</strong>
                  </div>

                  <div class="score-ticket__body">
                    <h4>${t.title}</h4>
                    <p>${t.subtitle}</p>
                  </div>

                  <div class="score-ticket__stats">
                    <span class="${t.coinDelta>0?`is-cost`:``}">Xu ${t.coinDelta}</span>
                    <span class="${t.staminaDelta>0?`is-cost`:``}">Lực ${t.staminaDelta}</span>
                  </div>

                  ${t.comboText?`<div class="score-ticket__combo">COMBO</div>`:``}

                  ${f?`
                        <div class="score-ticket__stamp">
                          <b>${a(t.eventType)}</b>
                          <span>${d}</span>
                        </div>
                      `:``}

                  <div class="score-ticket__tear-mark"></div>
                </article>

                ${r<e.replaySteps.length-1?`<div class="score-ticket-connector ${r<z?`is-passed`:``}"></div>`:``}
              `}).join(``)}
        </div>
      </div>

      <div class="ticket-scan-overlay__footer">
        <div>
          <span>Tiến trình</span>
          <strong>${r}/${n}</strong>
        </div>

        <div>
          <span>Điểm ngày</span>
          <strong>${xs(i)}</strong>
        </div>

        <div>
          <span>Tổng phase</span>
          <strong>${Ts()} VP</strong>
        </div>

        ${B?`
              <div class="ticket-scan-overlay__complete">
                <span>Hoàn tất</span>
                <strong>${Cs()} → ${ws()} VP</strong>
              </div>
            `:``}
      </div>
    </section>
  `}function Os(e,t){if(!R)return null;let n=R.replaySteps.findIndex(n=>n.rowIndex===e&&n.dayIndex===t);return n<0||n>z?null:R.replaySteps[n]??null}function ks(e,t){if(!R||t!==b)return``;let n=Si(),r=n?.rowIndex===e&&n?.dayIndex===t,i=R.replaySteps.findIndex(n=>n.rowIndex===e&&n.dayIndex===t),a=i>=0?R.replaySteps[i]:null,o=i>=0&&i<z,s=a?.eventType&&i<=z?`board-cell--event-${a.eventType}`:``;return r?`board-cell--replay-current ${s}`.trim():o?`board-cell--replay-done ${s}`.trim():`board-cell--replay-pending`}var As=!1,js=``;function Ms(){if(y()){let e=gr();return Math.max(0,e?.coinDebt??0)}return Math.max(0,Rr)}function Ns(){Ms()<=0||(As=!0,js=``,q())}function Ps(){As=!1,js=``,q()}function Fs(){if(Ms()<=0){Ps();return}if(y()){fe(),Ps();return}let e=Ai(),t=Math.min(e.coin,Rr);if(t<=0){js=`Bạn chưa có xu để trả nợ lúc này.`,q();return}if(Rr=Math.max(0,Rr-t),x=Object.assign(Object.assign({},x),{coin:x.coin-t}),js=Rr>0?`Đã trả ${t} xu. Hiện còn nợ ${Rr} xu.`:`Đã trả hết nợ (${t} xu).`,v(`eventPromo`),Rr<=0){Ps();return}q()}function Is(){return`
    <svg class="player-effect-seal__icon-svg" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path class="player-effect-seal__icon-solid" d="M30.8 10.2c.8-1.5 2.9-1.5 3.7 0l2.2 4.1c.3.5.8.9 1.4 1l4.8 1c1.8.4 2.3 2.6.9 3.7l-3.3 2.7c-.5.4-.8 1-.8 1.6l.1 1.8c4.4 1.8 7.5 5.9 7.5 10.7c0 6.4-5.1 11.5-11.5 11.5h-7.6c-6.8 0-12.4-5.5-12.4-12.3c0-4.8 2.8-8.9 6.9-10.8l.1-.9c.1-.7-.2-1.3-.7-1.8l-3-2.5c-1.4-1.2-.8-3.4 1-3.8l4.4-.9c.6-.1 1.1-.5 1.4-1l2.3-4.1Z"/>
      <path class="player-effect-seal__icon-cut" d="M34.8 29.6l-3.2 5l3.5 3.2l-2.5 4.6l4.1 3.6"/>
      <text class="player-effect-seal__icon-mark" x="31.9" y="38.6" text-anchor="middle">$</text>
    </svg>
  `}function Ls(){if(!As)return``;let e=Ms(),t=Ai().coin,n=e*10;return`
    <div
      class="effect-token-modal-backdrop"
      onclick="event.stopPropagation(); window.closeDebtTokenModal()"
    >
      <section
        class="effect-token-modal effect-token-modal--debt"
        onclick="event.stopPropagation()"
      >
        <button
          type="button"
          class="effect-token-modal__close"
          onclick="event.stopPropagation(); window.closeDebtTokenModal()"
          aria-label="Đóng cửa sổ token nợ"
          title="Đóng"
        >
          ✕
        </button>

        <div class="effect-token-modal__header">
          <div class="effect-token-modal__seal-preview">
            <span class="player-effect-seal player-effect-seal--debt player-effect-seal--preview">
              <span class="player-effect-seal__surface">
                <span class="player-effect-seal__ring"></span>
                <span class="player-effect-seal__glyph player-effect-seal__glyph--debt" aria-hidden="true">${Is()}</span>
              </span>

              <span class="player-effect-seal__count">${e}</span>
            </span>
          </div>

          <div class="effect-token-modal__title-wrap">
            <span class="effect-token-modal__eyebrow">TOKEN NỢ</span>
            <h3>Nợ ${e} xu</h3>
            <p>Cuối game nếu chưa trả: <strong>-${n} VP</strong></p>
          </div>
        </div>

        <div class="effect-token-modal__body">
          <div class="effect-token-modal__info">
            <div>
              <span>Hiện đang nợ</span>
              <strong>${e} xu</strong>
            </div>
            <div>
              <span>Xu hiện có</span>
              <strong>${t} xu</strong>
            </div>
          </div>

          <p class="effect-token-modal__desc">
            Bấm trả nợ để thanh toán số xu hiện đang nợ. Nếu kết thúc game mà vẫn còn nợ,
            bạn sẽ bị trừ tổng cộng <strong>-${n} VP</strong>.
          </p>

          ${js?`<div class="effect-token-modal__notice">${js}</div>`:``}
        </div>

        <div class="effect-token-modal__footer">
          <button
            type="button"
            class="effect-token-modal__ghost"
            onclick="event.stopPropagation(); window.closeDebtTokenModal()"
          >
            Đóng
          </button>

          <button
            type="button"
            class="effect-token-modal__primary ${t<=0?`is-disabled`:``}"
            onclick="event.stopPropagation(); window.payCoinDebtFromModal()"
          >
            Trả nợ
          </button>
        </div>
      </section>
    </div>
  `}function Rs(){let e=[],t=Ms();return t>0&&e.push(`
      <button
        type="button"
        class="player-effect-seal player-effect-seal--debt"
        onclick="event.stopPropagation(); window.openDebtTokenModal()"
        aria-label="Token nợ: ${t} xu"
      >
        <span class="player-effect-seal__surface">
          <span class="player-effect-seal__ring"></span>

          <span class="player-effect-seal__glyph player-effect-seal__glyph--debt" aria-hidden="true">${Is()}</span>
        </span>

        <span class="player-effect-seal__count">${t}</span>
        <span class="player-effect-seal__hover-label">TOKEN NỢ</span>
      </button>
    `),e.length?`
    <div class="player-effect-dock">
      ${e.join(``)}
    </div>
  `:``}function zs(){y()||Ur.length;let e=(y()?lr():null)?.length??S.length,t=!!(Z||E)&&!ol&&!D&&!_l()&&!k,n=Po(),r=Vo(),i=d.roomState?.phase,a=w&&i===`draft`,o=n&&i===`planning`,s=o?Ho():``,c=o?`
      <div class="deck-pile-panel__planning-actions">
        <button
          type="button"
          class="deck-pile-panel__planning-confirm"
          onclick="event.stopPropagation(); confirmPlanningPick()"
          ${r?`disabled`:``}
        >
          ${r?`Đã xác nhận`:`Xác nhận`}
        </button>
        ${s?`<div class="deck-pile-panel__planning-status">${s}</div>`:``}
      </div>
    `:``,l=(a?`
      <button
        type="button"
        class="deck-pile-panel__draft-confirm"
        onclick="event.stopPropagation(); confirmDraftPick()"
        ${t?``:`disabled`}
      >
        Kết thúc lượt
      </button>
    `:``)||c,u=Rs(),f=Ia(),p=a||o||u.length>0?`
      <div class="deck-pile-panel__header">
        <div class="deck-pile-panel__header-left">${f}${u}</div>
        <div class="deck-pile-panel__header-right">${l}</div>
      </div>
    `:``;return`
    <section
      class="deck-pile-panel${w?` deck-pile-panel--draft`:``}"
      data-discard-drop-zone="true"
      title="Kéo thả lá bài trên tay vào đây để discard và nhận lại Xu/Thể lực bằng chi phí của lá."
    >
      ${p}

      <div class="deck-pile-panel__visual">
        <div class="deck-card-stack">
          <div class="deck-card-stack__card deck-card-stack__card--layer-3"></div>
          <div class="deck-card-stack__card deck-card-stack__card--layer-2"></div>
          <div class="deck-card-stack__card deck-card-stack__card--layer-1"></div>

          <div class="deck-card-stack__card deck-card-stack__card--back">
            <div class="deck-card-stack__back-frame">
              <div class="deck-card-stack__corner deck-card-stack__corner--tl">✦</div>
              <div class="deck-card-stack__corner deck-card-stack__corner--tr">✦</div>
              <div class="deck-card-stack__corner deck-card-stack__corner--bl">✦</div>
              <div class="deck-card-stack__corner deck-card-stack__corner--br">✦</div>

              <div class="deck-card-stack__crest">
                <div class="deck-card-stack__crest-ring"></div>
                <div class="deck-card-stack__crest-core">🧭</div>
              </div>

              <div class="deck-card-stack__brand">
                <span class="deck-card-stack__brand-top">LỮ KHÁCH</span>
                <strong class="deck-card-stack__brand-main">BÀN CỜ</strong>
                <em class="deck-card-stack__brand-sub">TRAVEL DECK</em>
              </div>

              <div class="deck-card-stack__route">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="deck-pile-panel__info">
        <div>
          <span>Trên tay</span>
          <strong>${e}</strong>
        </div>

        <div>
          <span>Đã xếp ngày</span>
          <strong>${kr().length}</strong>
        </div>
      </div>
    </section>
  `}function Bs(){let e=na(N)??P;return`
    <main class="arena ${Yn()?`arena--gameover`:``} ${L?`arena--scanning`:``}">
      <div class="arena__top arena__top--with-score">
        <div class="arena__title-block">
          <div class="blue-line"></div>

          <div>
            <h1>${mr()}</h1>
          </div>
        </div>

        ${_s()}
      </div>


      ${vs()}

      <div class="arena__main">
        <div class="board-block">
          <div class="days-header">
            ${mt.map((e,t)=>`<div class="day-pill ${t===b?`day-pill--current`:``} ${t<b?`day-pill--done`:``}">NGÀY ${e}</div>`).join(``)}
          </div>

          <section class="board-grid">
            ${ht.map((e,t)=>`
                  <div class="time-label">${e}</div>

                  ${mt.map((e,n)=>{let r=ra(t,n),i=n===b,a=!w&&!L&&!C&&i&&A!==null&&r===null;return r?`
                        <div
                          class="board-cell board-cell--occupied board-cell--clickable ${ks(t,n)} ${yi(t,n)?`board-cell--just-placed`:``}"
                          data-board-drop-cell="true"
                          data-row-index="${t}"
                          data-col-index="${n}"
                          onclick="event.stopPropagation(); handleBoardCellClick(${t}, ${n})"
                          title="Ô đã có bài - bấm để xem lớn"
                        >
                          ${ua(r,Os(t,n))}
                            ${la(t,n)}
                        </div>
                      `:`
                          <div
                            class="board-cell board-cell--empty ${ks(t,n)} ${L?`board-cell--locked-mode`:``} ${!i&&!L?`board-cell--not-current-day`:``} ${a?`board-cell--placeable`:``}"
                            data-board-drop-cell="true"
                            data-row-index="${t}"
                            data-col-index="${n}"
                            onclick="event.stopPropagation(); handleBoardCellClick(${t}, ${n})"
                            title="${i?a?`Thả lá đang kéo vào ô ngày hiện tại`:`Chỉ xếp bài cho ngày hiện tại`:`Không phải ngày hiện tại`}"
                          >
                            <span class="empty-plus">+</span>
                            ${la(t,n)}
                          </div>
                        `}).join(``)}
                `).join(``)}
          </section>
          ${Za()}${Qa()}
        </div>

        ${Yn()?ys():w?``:Ds()}

        ${L?``:`
              <section
          class="player-hand ${w?`player-hand--draft`:``} ${!w&&C?`player-hand--dealing is-dealing`:``}"
          onclick="${w?``:`clearSelectedHandCard()`}"
        >
          <div class="player-hand__top">
            <div class="player-hand__title">
              <span class="hand-badge">${w?`DRAFT`:`HAND`}</span>
              <h2>
                ${w?`Chọn bài ngày ${mt[b]}`:`Bài ngày ${mt[b]}`}
              </h2>
            </div>

            <div class="player-hand__meta ${w&&Xa()?`player-hand__meta--danger`:``}">
              ${w?qa()?`Đang chia bài...`:`Còn ${Wr}s • ${D?`Đang chuyền bài...`:`bấm 1 lá để chọn`}`:C?`Đang chia bài...`:`Giữ 0.5s để xem lớn`}
            </div>
          </div>

          ${w?pa():``}

          <div class="player-hand__cards ${w?`player-hand__cards--draft player-hand__cards--picked player-hand__cards--picked-count-${va()}`:``}">
            ${w?ka():S.map((e,t)=>da(e,t)).join(``)}
          </div>
        </section>
            `}
      </div>

      ${e?fa(e):``}
    </main>
  `}function U(){ni!==null&&(window.clearTimeout(ni),ni=null)}var Vs=-1,Hs=-1;function Us(e,t,n){let r=document.querySelector(e);if(!r)return;let i=document.createElement(`div`);i.className=`floating-text floating-text--${n}`,i.textContent=`${t>0?`+`:``}${t}`,r.appendChild(i),r.classList.remove(`resource-pulse`),r.clientWidth,r.classList.add(`resource-pulse`),setTimeout(()=>i.remove(),1200)}function W(){let e=document.querySelector(`.arena`);e&&(e.outerHTML=Bs(),_l()&&window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{vl()})}),requestAnimationFrame(()=>{let e=Ai();Vs!==-1&&e.coin!==Vs&&Us(`.resource-orb--coin .resource-orb__frame`,e.coin-Vs,`coin`),Hs!==-1&&e.stamina!==Hs&&Us(`.resource-orb--stamina .resource-orb__frame`,e.stamina-Hs,`stamina`),Vs=e.coin,Hs=e.stamina}))}function Ws(e,t,n){if(L||C||n!==b||!Hi(t,n))return;let r=S.findIndex(t=>t.id===e);if(r===-1)return;let i=S[r];if(y()){v(`cardPlace`);let e=oa(i);e&&sa({rowIndex:t,colIndex:n,type:e.type,value:e.value}),ue({cardId:i.id,rowIndex:t,colIndex:n,tag:i.tag,icon:i.icon,vp:i.vp,coin:i.coin,stamina:i.stamina,name:i.name}),A=null,j=null,N=null,P=null,F=null,I=!1,e&&W();return}let a=Ai(),o=Math.max(0,i.coin-a.coin),s=Math.max(0,i.stamina-a.stamina);v(`cardPlace`),S.splice(r,1),ca(i,t,n)||(V()[t][n]=i,Ki({rowIndex:t,colIndex:n,card:i,coinDebt:o,staminaDebt:s})),ue({cardId:i.id,rowIndex:t,colIndex:n,tag:i.tag,icon:i.icon,vp:i.vp,coin:i.coin,stamina:i.stamina,image:i.image,name:i.name}),_i(i),A=null,j=null,N=null,P=null,F=null,I=!1,$r={rowIndex:t,colIndex:n},W(),window.setTimeout(()=>{$r?.rowIndex===t&&$r?.colIndex===n&&($r=null,W())},420)}function Gs(e,t){A&&Ws(A,e,t)}function Ks(){if(L||!F)return;let{rowIndex:e,colIndex:t}=F;if(t!==b)return;let n=V()[e]?.[t];if(!(!n||Bi(n)||Vi(n))){if(y()){pe({rowIndex:e,colIndex:t}),N=null,P=null,F=null,$r=null,A=null,I=!1;return}for(V()[e][t]=null,Yi(e,t,n),S.unshift(n);S.length>5;){let e=S.pop();e&&Ur.unshift(e)}N=null,P=null,F=null,$r=null,A=null,I=!1,W()}}function qs(e){if(!M||M.isDragging)return;U(),N=null,P=null,F=null,I=!1;let{source:t}=M,n=t.getBoundingClientRect(),r=t.cloneNode(!0);r.classList.add(`hand-card--drag-clone`),r.classList.remove(`hand-card--selected`),r.style.width=`${n.width}px`,r.style.height=`${n.height}px`,r.style.left=`${n.left}px`,r.style.top=`${n.top}px`,r.style.transform=`none`,r.style.pointerEvents=`none`,document.body.appendChild(r),t.classList.add(`hand-card--drag-source-hidden`),M.clone=r,M.offsetX=e.clientX-n.left,M.offsetY=e.clientY-n.top,M.isDragging=!0,j=M.id,A=M.id,Js(e)}function Js(e){M?.clone&&(M.clone.style.left=`${e.clientX-M.offsetX}px`,M.clone.style.top=`${e.clientY-M.offsetY}px`)}function Ys(e){return document.elementFromPoint(e.clientX,e.clientY)?.closest(`[data-board-drop-cell='true']`)}function Xs(e){return document.elementFromPoint(e.clientX,e.clientY)?.closest(`[data-discard-drop-zone='true']`)}function Zs(){document.querySelectorAll(`.deck-pile-panel--discard-hover`).forEach(e=>{e.classList.remove(`deck-pile-panel--discard-hover`),delete e.dataset.discardCoin,delete e.dataset.discardStamina})}function Qs(){return!w&&!L&&!C}function $s(e){if(!Qs())return;let t=S.findIndex(t=>t.id===e);if(t===-1)return;let n=S[t];if(v(`returnDeck`),y()){let e=d.roomState,t=d.playerId;if(e&&t){let r=e.self.hand.findIndex(e=>e.id===n.id);r>=0&&e.self.hand.splice(r,1);let i=e.players[t];i&&(i.coin+=n.coin,i.stamina+=n.stamina),S=[...e.self.hand]}de({cardId:n.id,coin:n.coin,stamina:n.stamina,name:n.name}),A=null,j=null,N=null,P=null,F=null,I=!1,q();return}S.splice(t,1),Lr={coin:Lr.coin+n.coin,stamina:Lr.stamina+n.stamina},A=null,j=null,N=null,P=null,F=null,I=!1,W()}function ec(){var e;oc(),Zs(),M?.source&&M.source.classList.remove(`hand-card--drag-source-hidden`),(e=M?.clone)==null||e.remove(),M=null,j=null,document.querySelectorAll(`.board-cell--placeable`).forEach(e=>e.classList.remove(`board-cell--placeable`))}function tc(e){if(!M)return;let t=e.clientX-M.startX,n=e.clientY-M.startY,r=Math.hypot(t,n);if(!M.isDragging&&r>=8&&(U(),qs(e)),!M?.isDragging)return;e.preventDefault(),Js(e),oc(),Zs();let i=Xs(e);if(i&&Qs()){let e=na(j);i.classList.add(`deck-pile-panel--discard-hover`),i.dataset.discardCoin=String(e?.coin??0),i.dataset.discardStamina=String(e?.stamina??0);return}let a=Ys(e);if(!a)return;let o=Number(a.dataset.rowIndex),s=Number(a.dataset.colIndex),c=na(j);Number.isInteger(o)&&Number.isInteger(s)&&Hi(o,s)&&c?a.classList.add(`board-cell--drag-hover`):a.classList.add(`board-cell--drag-invalid`)}function nc(e){document.removeEventListener(`pointermove`,tc),document.removeEventListener(`pointerup`,nc),document.removeEventListener(`pointercancel`,rc);let t=M,n=t?.isDragging===!0;if(U(),t){if(n){let n=Ys(e),r=Xs(e),i=Number(n?.dataset.rowIndex),a=Number(n?.dataset.colIndex),o=t.id;ec(),I=!0,window.setTimeout(()=>{I=!1},0);let s=na(o);if(r&&s&&Qs()){$s(o);return}if(n&&Number.isInteger(i)&&Number.isInteger(a)&&Hi(i,a)&&s){Ws(o,i,a);return}n&&Number.isInteger(i)&&Number.isInteger(a)?ic(i,a):ic(),A=null,W();return}ec()}}function rc(){document.removeEventListener(`pointermove`,tc),document.removeEventListener(`pointerup`,nc),document.removeEventListener(`pointercancel`,rc),U(),ec(),A=null,I=!1,W()}function ic(e,t){v(`reject`);let n=e!==void 0&&t!==void 0?document.querySelector(`[data-row-index="${e}"][data-col-index="${t}"]`):document.querySelector(`.arena`);n?.classList.add(`resource-rejected-feedback`),window.setTimeout(()=>{n?.classList.remove(`resource-rejected-feedback`)},380)}function ac(e){return e.dataTransfer?.getData(`text/plain`)||j}function oc(){document.querySelectorAll(`.board-cell--drag-hover, .board-cell--drag-invalid`).forEach(e=>{e.classList.remove(`board-cell--drag-hover`),e.classList.remove(`board-cell--drag-invalid`)})}window.startDragHandCard=(e,t)=>{var n;U(),j=t,A=t,N=null,P=null,F=null,I=!0,(n=e.dataTransfer)==null||n.setData(`text/plain`,t),e.dataTransfer&&(e.dataTransfer.effectAllowed=`move`)},window.endDragHandCard=()=>{U(),oc(),j=null,window.setTimeout(()=>{I=!1},0)},window.handleBoardCellDragOver=(e,t,n)=>{!j||V()[t][n]!==null||(e.dataTransfer&&(e.dataTransfer.dropEffect=`move`),e.currentTarget?.classList.add(`board-cell--drag-hover`))},window.handleBoardCellDragLeave=e=>{e.currentTarget?.classList.remove(`board-cell--drag-hover`)},window.dropHandCardOnBoard=(e,t,n)=>{U(),oc();let r=ac(e);if(j=null,!r)return;let i=na(r);if(!Hi(t,n)||!i){ic(t,n);return}Ws(r,t,n)},window.startHandPointerDrag=(e,t)=>{if(C||L||e.button!==0||!na(t))return;ec();let n=e.currentTarget;n&&(M={id:t,source:n,clone:null,startX:e.clientX,startY:e.clientY,offsetX:0,offsetY:0,isDragging:!1},document.addEventListener(`pointermove`,tc),document.addEventListener(`pointerup`,nc),document.addEventListener(`pointercancel`,rc),document.querySelectorAll(`.board-cell`).forEach(e=>{let t=parseInt(e.getAttribute(`data-row-index`)||`-1`),n=parseInt(e.getAttribute(`data-col-index`)||`-1`);t>=0&&n>=0&&Hi(t,n)&&e.classList.add(`board-cell--placeable`)}))},window.openDebtTokenModal=()=>{Ns()},window.closeDebtTokenModal=()=>{Ps()},window.payCoinDebtFromModal=()=>{Fs()},window.selectDraftCard=Mo,window.confirmDraftPick=No,globalThis.confirmDraftPick=No,window.confirmPlanningPick=Uo,globalThis.confirmPlanningPick=Uo,window.toggleDraftPoolCollapse=Wa,globalThis.toggleDraftPoolCollapse=Wa,window.startHoldHandCard=e=>{D||C||(U(),ni=window.setTimeout(()=>{N=e,P=null,F=null,I=!0,U(),W()},500))},window.cancelHoldHandCard=()=>{U()},window.clearSelectedHandCard=()=>{U(),A!==null&&(A=null,W())},window.handleBoardCellClick=(e,t)=>{U();let n=ra(e,t);if(n){if(Bi(n)){if(!w&&!C&&t===b&&A){Gs(e,t);return}Ji(e,t,n);return}ec(),N=null,P=n,F={rowIndex:e,colIndex:t},A=null,I=!1,W();return}!w&&!C&&t===b&&Gs(e,t)},window.focusBoardCard=(e,t)=>{let n=ra(e,t);n&&(N=null,P=n,F={rowIndex:e,colIndex:t},A=null,I=!1,W())},window.runSimulation=()=>{ls()},window.resetSimulation=()=>{gs()},window.returnFocusedBoardCardToHand=()=>{Ks()},window.closeFocusedHandCard=()=>{U(),N=null,P=null,F=null,j=null,I=!1,W()};function sc(e){let t={p1:1,p2:3,p3:3,p4:3};return[...Fn,...In].find(t=>t.id===e)??{id:e,rank:t[e],name:e.toUpperCase(),score:0,coin:30,stamina:15,usedSlots:0}}function cc(){let e=d.playerId;return!e||!d.roomState?[]:jr.filter(t=>t===e?!1:d.roomState?.players[t]?.isConnected===!0).map(e=>{let t=sc(e),n=d.roomState?.players[e];return Object.assign(Object.assign({},t),{name:n?.name??t.name,score:n?.score??t.score,coin:n?.coin??t.coin,stamina:n?.stamina??t.stamina,usedSlots:n?.usedSlots??t.usedSlots,active:!1})})}function lc(){return y()?cc().slice(0,2):ki()}function uc(){return y()?cc().slice(2):[In[0]]}function dc(){let e=d.roomState;return e?jr.map(t=>{let n=e.players[t];return{playerId:t,name:n?.name??t.toUpperCase(),score:n?.score??0,coin:n?.coin??30,stamina:n?.stamina??15,usedSlots:n?.usedSlots??0,isConnected:n?.isConnected??!1,hasJoined:n?.hasJoined??!1}}).filter(e=>e.hasJoined||e.isConnected).sort((e,t)=>t.score===e.score?t.usedSlots===e.usedSlots?e.playerId.localeCompare(t.playerId):t.usedSlots-e.usedSlots:t.score-e.score):[]}function fc(){if(!oi||!y())return``;let e=dc(),t=d.playerId;return`
    <div class="mid-ranking-backdrop" onclick="event.stopPropagation(); closeMidGameRanking()">
      <section class="mid-ranking-modal" onclick="event.stopPropagation()">
        <div class="mid-ranking-modal__header">
          <div>
            <span>BẢNG XẾP HẠNG GIỮA TRẬN</span>
            <h2>${hr()}</h2>
            <p>Cập nhật sau mỗi ngày khi server cộng điểm simulation xong.</p>
          </div>

          <button
            class="mid-ranking-modal__close"
            onclick="event.stopPropagation(); closeMidGameRanking()"
            title="Đóng bảng xếp hạng"
          >
            ✕
          </button>
        </div>

        <div class="mid-ranking-modal__list">
          ${e.length>0?e.map((e,n)=>`
                      <div class="mid-ranking-row ${e.playerId===t?`mid-ranking-row--self`:``}">
                        <div class="mid-ranking-row__rank">#${n+1}</div>

                        <div class="mid-ranking-row__player">
                          <strong>${e.name}</strong>
                          <span>${e.playerId}${e.isConnected?``:` • offline`}</span>
                        </div>

                        <div class="mid-ranking-row__score">${e.score} VP</div>

                        <div class="mid-ranking-row__meta">
                          <span>🪙 ${e.coin}</span>
                          <span>⚡ ${e.stamina}</span>
                          <span>${e.usedSlots}/25</span>
                        </div>
                      </div>
                    `).join(``):`<div class="mid-ranking-empty">Chưa có người chơi trong phòng.</div>`}
        </div>

        <div class="mid-ranking-modal__footer">
          Điểm chỉ thay đổi sau khi kết thúc quét điểm từng ngày.
        </div>
      </section>
    </div>
  `}var pc=`assets/sounds/in-game-background.mp3`,mc=`travelDeck.inGameMusicMuted`,hc=`travelDeck.inGameMusicVolume`,gc=.5,_c=null,vc=localStorage.getItem(mc),yc=Number(localStorage.getItem(hc)),G=vc===`true`,K=yc;(!Number.isFinite(K)||K<=0)&&(K=gc,localStorage.setItem(hc,String(K)),vc===null&&localStorage.setItem(mc,`false`));function bc(e){return Math.max(0,Math.min(1,e))}function xc(){if(!_c){let e=new Audio(pc);e.loop=!0,e.preload=`auto`,e.volume=bc(K),e.muted=G,_c=e}return _c}function Sc(){return y()&&d.roomState?.phase!==`lobby`}function Cc(){be(),document.querySelectorAll(`audio, video`).forEach(e=>{if(e===_c)return;let t=e;try{t.pause(),t.muted=!0,(t.id===`hub-hero-video`||t.classList.contains(`hub-hero__video`))&&(t.currentTime=0)}catch{}})}function wc(){let e=xc();if(e.volume=bc(K),e.muted=G,!Sc()){e.pause();return}if(Cc(),G||K<=0){e.pause();return}e.play().catch(()=>{})}function Tc(){let e=document.querySelector(`[data-in-game-music-toggle]`),t=document.querySelector(`[data-in-game-music-value]`),n=document.querySelector(`[data-in-game-music-slider]`);e&&(e.classList.toggle(`is-muted`,G||K<=0),e.textContent=G||K<=0?`🔇`:`🔊`,e.title=G?`Bật nhạc nền`:`Tắt nhạc nền`),t&&(t.textContent=`${Math.round(bc(K)*100)}%`),n&&(n.value=String(Math.round(bc(K)*100)))}function Ec(){G=!G,localStorage.setItem(mc,String(G)),!G&&K<=0&&(K=gc,localStorage.setItem(hc,String(K))),wc(),Tc()}function Dc(e){let t=typeof e==`number`?e:Number(e);Number.isFinite(t)&&(K=bc(t>1?t/100:t),G=K<=0,localStorage.setItem(hc,String(K)),localStorage.setItem(mc,String(G)),wc(),Tc())}function Oc(){let e=Math.round(bc(K)*100),t=G||e<=0;return`
    <div class="online-room-menu__music" title="Nhạc nền trong trận">
      <button
        type="button"
        class="online-room-menu__music-toggle ${t?`is-muted`:``}"
        data-in-game-music-toggle
        onclick="event.stopPropagation(); window.toggleInGameBackgroundMusic()"
        title="${t?`Bật nhạc nền`:`Tắt nhạc nền`}"
      >
        ${t?`🔇`:`🔊`}
      </button>

      <div class="online-room-menu__music-body">
        <div class="online-room-menu__music-head">
          <span>Nhạc nền</span>
          <strong data-in-game-music-value>${e}%</strong>
        </div>

        <input
          data-in-game-music-slider
          class="online-room-menu__music-slider"
          type="range"
          min="0"
          max="100"
          step="1"
          value="${e}"
          oninput="event.stopPropagation(); window.setInGameBackgroundMusicVolume(event.target.value)"
          onchange="event.stopPropagation(); window.setInGameBackgroundMusicVolume(event.target.value)"
        />
      </div>
    </div>
  `}function kc(){let e=()=>{wc()};document.addEventListener(`pointerdown`,e,{passive:!0}),document.addEventListener(`keydown`,e)}window.toggleInGameBackgroundMusic=Ec,window.setInGameBackgroundMusicVolume=Dc;function Ac(){return!y()||d.roomState?.phase===`lobby`?``:`
    <div class="online-room-menu" onclick="event.stopPropagation()">
      <input id="online-room-menu-toggle" class="online-room-menu__toggle-input" type="checkbox" />

      <label
        class="online-room-menu__button"
        for="online-room-menu-toggle"
        title="Mở menu phòng"
      >
        ☰
      </label>

      <div class="online-room-menu__panel">
        <div class="online-room-menu__text">
          <strong>Menu phòng</strong>
          <span>Room ${d.roomId??`-`}</span>
        </div>

        ${Oc()}

        <button
          class="online-room-menu__ranking"
          onclick="event.stopPropagation(); openMidGameRanking()"
          title="Xem bảng xếp hạng giữa trận"
        >
          BXH
        </button>

        <div class="online-room-menu__export" title="Xuất chứng nhận hành trình">
          <span>Xuất</span>
          <button onclick="event.stopPropagation(); downloadTravelCertificateHtml()">Certificate</button>
        </div>

        <button
          class="online-room-menu__leave"
          onclick="event.stopPropagation(); leaveRoomFromLobby()"
          title="Thoát khỏi phòng online"
        >
          ✕
        </button>
      </div>
    </div>
  `}function jc(e){return Array.from({length:Math.max(0,e)},()=>`<section class="side-player side-player--empty-spacer" aria-hidden="true"></section>`).join(``)}var Mc=`dashboard`,Nc=new URL(`/assets/chuyencanh-Dd-smCGn.mp4`,``+import.meta.url).href,Pc=null;function Fc(e){if(e!==`dashboard`&&Cc(),!document.startViewTransition){Mc=e,q();return}document.startViewTransition(()=>{Mc=e,q()})}var Ic=!1;window.gotoMapSelection=()=>{if(Ic)return;if(!n.user){window.focusHubAuthPanel(),El(`Đăng nhập hoặc đăng ký để bắt đầu hành trình.`);return}Ic=!0;let e=document.createElement(`video`);e.src=Nc,e.muted=!0,e.playsInline=!0,e.style.cssText=[`position:fixed`,`inset:0`,`width:100%`,`height:100%`,`object-fit:cover`,`z-index:9999`,`pointer-events:auto`,`opacity:0`,`transition:opacity 0.4s ease`].join(`;`),document.body.appendChild(e);let t=!1,r=null,i=n=>{t||(t=!0,Ic=!1,r!==null&&(window.clearTimeout(r),r=null),e.removeEventListener(`timeupdate`,o),e.removeEventListener(`error`,a),e.remove(),n?(Pc=e,e.style.cssText=[`position:absolute`,`inset:0`,`width:100%`,`height:100%`,`object-fit:cover`,`z-index:0`,`pointer-events:none`,`opacity:1`].join(`;`)):(e.pause(),Pc=null),Mc=`map_selection`,q(),requestAnimationFrame(()=>{document.querySelectorAll(`.map-card-col`).forEach((e,t)=>{setTimeout(()=>e.classList.add(`map-card-col--slide-in`),200+t*140)})}))},a=()=>{console.warn(`Map transition video could not be loaded; continuing without it.`),i(!1)};function o(){if(e.currentTime>=3.5){i(!0);return}e.duration&&e.currentTime>=e.duration-.5&&(e.currentTime=5)}e.addEventListener(`timeupdate`,o),e.addEventListener(`error`,a,{once:!0}),e.playbackRate=1.75,e.play().catch(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{e.style.opacity=`1`})}),r=window.setTimeout(()=>{i(e.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA)},6e3)},window.gotoOnlineLobby=()=>{if(!n.user){window.focusHubAuthPanel(),El(`Đăng nhập hoặc đăng ký để bắt đầu hành trình.`);return}Fc(`lobby`)},window.gotoDashboard=()=>{Pc&&=(Pc.pause(),Pc.remove(),null),Fc(`dashboard`)},window.switchHubAuthTab=e=>{document.querySelectorAll(`[data-hub-auth-tab]`).forEach(t=>{t.classList.toggle(`is-active`,t.dataset.hubAuthTab===e)}),document.querySelectorAll(`[data-hub-auth-panel]`).forEach(t=>{t.classList.toggle(`is-active`,t.dataset.hubAuthPanel===e)})},window.focusHubAuthPanel=()=>{let e=document.getElementById(`hub-auth`);if(!e){Mc=`dashboard`,q(),window.requestAnimationFrame(()=>{window.focusHubAuthPanel()});return}e.scrollIntoView({behavior:`smooth`,block:`start`}),e.classList.remove(`hub-auth--pulse`),window.requestAnimationFrame(()=>{e.classList.add(`hub-auth--pulse`)}),e.querySelector(`input`)?.focus()},window.startOfflineGame=()=>{alert(`Chế độ chơi offline (Bot) đang được phát triển!`)};function Lc(){return`<div class="saigon-collage-bg" aria-hidden="true"></div>`}var Rc=null,zc=!1;function Bc(){console.log(`TRIGGERING CINEMATIC TRANSITION!`),zc=!0;let e=document.createElement(`div`);e.id=`cinematic-blocker`,e.style.cssText=`position:fixed;inset:0;z-index:99999999;cursor:wait;`,e.addEventListener(`mousedown`,e=>{e.preventDefault(),e.stopPropagation()}),e.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation()}),e.addEventListener(`touchstart`,e=>{e.preventDefault(),e.stopPropagation()},{passive:!1}),document.body.appendChild(e);let t=document.querySelector(`.online-lobby-card`);t&&t.classList.add(`is-exiting`);let n=document.getElementById(`cinematic-transition-video`),r=document.getElementById(`white-flash-overlay`);if(!n||!r){console.warn(`Missing video or overlay for cinematic transition.`),zc=!1,q();return}setTimeout(()=>{n.style.display=`block`,n.style.pointerEvents=`none`,n.currentTime=0,n.play().catch(e=>{console.warn(`Video play failed with sound, attempting muted.`,e),n.muted=!0,n.play().catch(e=>{console.error(`Video play failed completely.`,e)})}),n.onpause=()=>{zc&&(console.warn(`Video paused unexpectedly, resuming...`),n.play().catch(e=>console.error(e)))};let e=()=>{if(!zc)return;zc=!1,r.style.display=`block`,r.style.opacity=`1`,n.style.display=`none`,n.ontimeupdate=null;let e=document.getElementById(`cinematic-blocker`);e&&e.remove(),q();let t=document.querySelector(`.game-shell`);t&&t.classList.add(`is-zooming-in`),setTimeout(()=>{r.style.opacity=`0`,setTimeout(()=>{r.style.display=`none`,t&&t.classList.remove(`is-zooming-in`)},1500)},50)};n.onended=e,n.ontimeupdate=()=>{n.duration&&n.currentTime>=n.duration-.2&&e()},setTimeout(()=>{zc&&(console.warn(`Cinematic transition video timeout fallback.`),e())},2e4)},400)}function Vc(){let e=document.querySelector(`.game-shell`);e&&delete e.dataset.saigonHover}function Hc(e){return`${e}`}function Uc(){if(!n.isReady)return Hc(Ee(!0));if(!y())return!n.user||Mc===`dashboard`?(Mc=`dashboard`,Hc(Ee())):Hc(Mc===`map_selection`?he():yr());if(d.roomState?.phase===`lobby`)return Hc(br());let e=lc(),t=uc();return Hc(`
    <div class="game-shell">
      ${Lc()}
      ${Ac()}
      ${fc()}
      ${Ls()}

      <aside class="players-column players-column--left">
        ${e.map(ro).join(``)}
        ${jc(2-e.length)}
      </aside>

      ${Bs()}

      <aside class="players-column players-column--right">
        ${t.map(ro).join(``)}
        ${jc(1-t.length)}
        ${zs()}
      </aside>
    </div>
  `)}window.rerenderGameShell=q;function Wc(){!y()||d.roomState?.phase===`lobby`?Mn.style.setProperty(`background`,`url('./assets/backgrounds/lobby-background.jpg') center/cover no-repeat #0c0b11`,`important`):Mn.style.removeProperty(`background`)}function Gc(){return{isLoggedIn:()=>!!n.user,getPhase:()=>d.roomState?.phase??null,getSelfPlacedCount:()=>{let e=d.playerId,t=e?d.roomState?.players?.[e]?.board:null;return t?t.reduce((e,t)=>e+t.filter(e=>e!=null).length,0):0},getDraftSelected:()=>!!d.roomState?.self?.selectedDraftCardId,getDraftPickedCount:()=>d.roomState?.self?.pickedDraftCards?.length??0,getDayIndex:()=>d.roomState?.dayIndex??0,getPlayers:()=>{let e=d.roomState?.players,t=d.playerId;if(!e)return[];let n=[`p1`,`p2`,`p3`,`p4`],r=[];for(let i of n){let n=e[i];n&&r.push({name:n.name,score:n.score??n.vp??0,isBot:n.isBot===!0,isSelf:i===t})}return r},gotoHome:()=>{var e,t;ae(),(t=(e=window).gotoDashboard)==null||t.call(e)},isReplayPausedForEvent:()=>fs(),resumeReplay:()=>ps()}}function q(){if(Cc(),We(Gc()),Mn.innerHTML=Uc(),Wc(),Vc(),wc(),xe(),Es(),Mc===`map_selection`&&Pc){let e=document.querySelector(`.map-selection-screen`);e&&e.firstChild&&e.insertBefore(Pc,e.firstChild)}_l()&&window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{vl()})})}var Kc=``,qc=null,Jc=!1,Yc=``,Xc=null,Zc=null,Qc=0,$c=0,el=``,tl=null,nl=!1,J=null,rl=null,Y=null,il=0,al=!1,X=0,ol=!1,Z=null,Q=null,sl=0,cl=750,ll=1350,ul=.84,dl=!1,fl=!1,$=!1,pl=null,ml=!1,hl=null,gl=0;function _l(){return al||C||Date.now()<X}function vl(){let e=document.querySelector(`.draft-center-overlay`);if(!e)return!1;e.classList.remove(`draft-center-overlay--dealing`);let t=e.querySelectorAll(`.draft-center-card-wrapper`);return t.forEach(e=>{let t=e;t.classList.remove(`draft-center-card-wrapper--flown-to-hand`),t.style.animation=`none`}),e.offsetWidth,t.forEach(e=>{e.style.removeProperty(`animation`)}),e.classList.add(`draft-center-overlay--dealing`),!0}function yl(){var e;gl+=1,hl!==null&&(window.clearTimeout(hl),hl=null),al=!1,(e=document.querySelector(`.draft-center-overlay`))==null||e.classList.remove(`draft-center-overlay--dealing`)}function bl(e=or()){hl!==null&&(window.clearTimeout(hl),hl=null);let t=++gl;al=!0,X=Date.now()+e,v(`deal`);let n=()=>{t===gl&&vl()};window.requestAnimationFrame(()=>{window.requestAnimationFrame(n)}),hl=window.setTimeout(()=>{var e;t===gl&&(hl=null,al=!1,(e=document.querySelector(`.draft-center-overlay`))==null||e.classList.remove(`draft-center-overlay--dealing`))},e)}function xl(){tl!==null&&(window.clearTimeout(tl),tl=null),pl!==null&&(window.clearTimeout(pl),pl=null),yl()}function Sl(){let e=d.roomState;if(!e)return`offline`;let t=e.self,n=jr.map(t=>{let n=e.players[t],r=n.board.map(e=>e.map(e=>e?`${e.cardId}:${e.tag}:${e.icon}:${e.vp}`:`-`).join(`,`)).join(`|`);return[t,n.name,n.score,n.coin,n.stamina,n.usedSlots,n.isConnected?`1`:`0`,n.isReady?`1`:`0`,n.planningConfirmed?`1`:`0`,r].join(`~`)}).join(`||`);return[e.phase,e.phaseNumber??1,e.dayIndex,e.draftRound,e.timer,t.draftPool.map(e=>e.id).join(`,`),t.pickedDraftCards.map(e=>e.id).join(`,`),t.hand.map(e=>e.id).join(`,`),n].join(`##`)}function Cl(){let e=d.roomState,t=document.querySelector(`.score-breakdown__timer`),n=t?.querySelector(`strong`);if(!(!e||!t||!n)){if(e.phase===`draft`){n.textContent=Ja(),t.classList.toggle(`score-breakdown__timer--danger`,!qa()&&Wr<=3),Ya(),La();return}if(e.phase===`planning`){n.textContent=Ko(e.timer),t.classList.toggle(`score-breakdown__timer--danger`,e.timer<=10),Na();return}e.phase===`gameover`&&(n.textContent=`${e.timer}s`,t.classList.toggle(`score-breakdown__timer--danger`,e.timer<=3))}}function wl(){let e=Sl(),t=d.roomState?.phase??null;if(e!==Kc){if(console.log(`Signature changed:`,Kc,`=>`,e),Kc=e,Rc===`lobby`&&t===`cinematic`){Rc=t,Bc();return}Rc=t;let n=(_l()||ol)&&!dl&&!fl,r=(D||C||al)&&!fl&&!dl,i=ir()&&document.querySelector(`.draft-center-overlay--passing.pass-active`),a=k&&document.querySelector(`.draft-center-overlay--collapsing.pass-active, .draft-center-overlay--expanding.pass-active`);zc||(n||r?(xo(),ko(),Ao(),Cl(),Ma()):(i||a)&&!fl&&!dl?(Cl(),La()):q()),dl&&(dl=!1,bl(or())),fl&&(fl=!1,$?$o():Qo());return}Cl()}q(),Kc=Sl(),Rc=d.roomState?.phase??null;function Tl(){let e=0,t=0,n=null,r=null,i=!1,a=!1;function o(){U(),n=null,r=null,i=!1}document.addEventListener(`pointerdown`,o=>{let s=o.target;if(!s)return;let c=s.closest(`[data-draft-card-id]`),l=s.closest(`[data-hand-card-id]`),u=null,d=null;w&&c?(u=c.dataset.draftCardId??null,d=`draft`):!w&&!L&&l&&(u=l.dataset.handCardId??null,d=`hand`),!(!u||!d)&&(n=u,r=d,i=!1,e=o.clientX,t=o.clientY,U(),d===`draft`&&!D&&(a=!0,Mo(u)),ni=window.setTimeout(()=>{n&&(i=!0,N=n,P=null,F=null,I=!0,q())},500))},!0),document.addEventListener(`pointermove`,r=>{!n||ni===null||Math.hypot(r.clientX-e,r.clientY-t)>8&&o()},!0),document.addEventListener(`pointerup`,a=>{let s=n,c=r,l=i,u=Math.hypot(a.clientX-e,a.clientY-t);o(),c===`draft`&&s&&!l&&u<=8&&w&&(a.preventDefault(),a.stopPropagation())},!0),document.addEventListener(`pointercancel`,()=>{o()},!0),document.addEventListener(`click`,e=>{let t=e.target;if(!t)return;let n=t.closest(`[data-draft-card-id]`);if(n&&w){if(e.preventDefault(),e.stopPropagation(),a){a=!1;return}let t=n.dataset.draftCardId;t&&Mo(t);return}let r=t.closest(`[data-hand-card-id]`);if(r&&!w){e.preventDefault(),e.stopPropagation();let t=r.dataset.handCardId;t&&Wo(t)}},!0)}Tl(),Dl(),pn(),kc(),Ge(Gc),ee(()=>{Or(),wl()},()=>{Io(),Na()}),window.createOnlineRoom=(e=`An`)=>{g(e)},window.joinOnlineRoom=(e,t=`Player`)=>{_(e,t)},window.startOnlineGame=()=>{oe()},window.selectDraftCard=Mo,window.selectHandCard=Wo,window.clearSelectedHandCard=Go;function El(e,t=!1){let n=document.querySelector(`#hub-auth-status`)??document.querySelector(`#auth-status`);n&&(n.textContent=e,n.classList.toggle(`hub-auth__status--error`,t),n.classList.toggle(`hub-auth__status--success`,!!e&&!t),n.classList.toggle(`auth-card__status--error`,t),n.classList.toggle(`auth-card__status--success`,!!e&&!t))}function Dl(){document.addEventListener(`submit`,e=>{let t=e.target;if(t){if(t.id===`auth-login-form`||t.id===`hub-auth-login-form`){e.preventDefault(),e.stopPropagation(),window.loginFromAuthScreen();return}(t.id===`auth-register-form`||t.id===`hub-auth-register-form`)&&(e.preventDefault(),e.stopPropagation(),window.registerFromAuthScreen())}},!0)}window.loginFromAuthScreen=()=>jn(void 0,void 0,void 0,function*(){let e=document.querySelector(`#hub-auth-login-username`)??document.querySelector(`#auth-login-username`),t=document.querySelector(`#hub-auth-login-password`)??document.querySelector(`#auth-login-password`);El(`Đang đăng nhập...`);try{yield o({username:e?.value.trim()??``,password:t?.value??``}),El(`Đăng nhập thành công.`),q()}catch(e){let t=e instanceof Error?e.message:`Đăng nhập thất bại.`;El(t,!0),alert(t)}}),window.registerFromAuthScreen=()=>jn(void 0,void 0,void 0,function*(){let e=document.querySelector(`#hub-auth-register-display-name`)??document.querySelector(`#auth-register-display-name`),t=document.querySelector(`#hub-auth-register-username`)??document.querySelector(`#auth-register-username`),n=document.querySelector(`#hub-auth-register-password`)??document.querySelector(`#auth-register-password`);El(`Đang tạo tài khoản...`);try{yield s({displayName:e?.value.trim()||void 0,username:t?.value.trim()??``,password:n?.value??``}),El(`Tạo tài khoản thành công.`),q()}catch(e){let t=e instanceof Error?e.message:`Đăng ký thất bại.`;El(t,!0),alert(t)}}),window.logoutFromAuthScreen=()=>{c(),d.roomId=null,d.playerId=null,d.roomState=null,Mc=`dashboard`,q()},window.createRoomFromLobby=()=>{Cc(),g(document.querySelector(`#lobby-create-name`)?.value.trim()||n.user?.displayName||n.user?.username||`An`,ze())},window.joinRoomFromLobby=()=>{Cc();let e=document.querySelector(`#lobby-join-name`),t=document.querySelector(`#lobby-room-code`),n=e?.value.trim()||`Player`,r=t?.value.trim().toUpperCase();if(!r){alert(`Nhập room code trước.`);return}_(r,n)},window.reconnectSavedRoomFromLobby=()=>{Cc();let e=m();e&&te(e.roomId,e.playerId,e.playerName)},window.clearSavedRoomFromLobby=()=>{h(),q()},window.toggleReadyFromLobby=()=>{let e=gr();if(!e||!d.playerId||!d.roomState)return;let t=!e.isReady;d.roomState.players[d.playerId].isReady=t,q(),ne(t)},window.leaveRoomFromLobby=()=>{ae(),q()},window.copyRoomCodeFromLobby=()=>jn(void 0,void 0,void 0,function*(){let e=d.roomId;if(e)try{yield navigator.clipboard.writeText(e),alert(`Đã copy room code: ${e}`)}catch{prompt(`Copy room code:`,e)}}),window.openMidGameRanking=()=>{oi=!0,q()},window.closeMidGameRanking=()=>{oi=!1,q()},window.downloadTravelCertificateHtml=()=>{En()},window.downloadTravelTimelineTxt=()=>{kn(`txt`)},window.downloadTravelTimelineJson=()=>{kn(`json`)},window.copyTravelTimeline=()=>{An()},window.debugOnlineBoards=()=>{let e=d.roomState;if(!e)return console.log(`No online room state.`),null;let t={},n=[`p1`,`p2`,`p3`,`p4`];for(let r of n){let n=e.players[r],i=[];for(let e=0;e<n.board.length;e+=1){let t=n.board[e];for(let n=0;n<t.length;n+=1){let r=t[n];r&&i.push({rowIndex:e,colIndex:n,cardId:r.cardId,tag:r.tag,icon:r.icon,vp:r.vp})}}t[r]={name:n.name,connected:n.isConnected,usedSlots:n.usedSlots,filledCells:i}}return console.table(n.map(e=>({playerId:e,name:t[e].name,connected:t[e].connected,usedSlots:t[e].usedSlots,filled:t[e].filledCells.length}))),console.log(t),t},window.onlineClientState=d,window.debugOnlineScores=()=>{let e=d.roomState;if(!e)return console.log(`No online room state.`),null;let t=jr.map(t=>{let n=e.players[t];return{playerId:t,name:n.name,score:n.score,coin:n.coin,stamina:n.stamina,usedSlots:n.usedSlots,connected:n.isConnected,ready:n.isReady,joined:n.hasJoined}});return console.table(t),t},globalThis.createOnlineRoom=window.createOnlineRoom,globalThis.joinOnlineRoom=window.joinOnlineRoom,globalThis.startOnlineGame=window.startOnlineGame,globalThis.selectDraftCard=window.selectDraftCard,globalThis.selectHandCard=window.selectHandCard,globalThis.clearSelectedHandCard=window.clearSelectedHandCard,globalThis.loginFromAuthScreen=window.loginFromAuthScreen,globalThis.registerFromAuthScreen=window.registerFromAuthScreen,globalThis.logoutFromAuthScreen=window.logoutFromAuthScreen,globalThis.forceLogoutAuth=window.logoutFromAuthScreen,globalThis.createRoomFromLobby=window.createRoomFromLobby,globalThis.joinRoomFromLobby=window.joinRoomFromLobby,globalThis.reconnectSavedRoomFromLobby=window.reconnectSavedRoomFromLobby,globalThis.clearSavedRoomFromLobby=window.clearSavedRoomFromLobby,globalThis.toggleReadyFromLobby=window.toggleReadyFromLobby,globalThis.copyRoomCodeFromLobby=window.copyRoomCodeFromLobby,globalThis.leaveRoomFromLobby=window.leaveRoomFromLobby,globalThis.onlineClientState=d,globalThis.openMidGameRanking=window.openMidGameRanking,globalThis.closeMidGameRanking=window.closeMidGameRanking,globalThis.downloadTravelCertificateHtml=window.downloadTravelCertificateHtml,globalThis.toggleInGameBackgroundMusic=window.toggleInGameBackgroundMusic,globalThis.setInGameBackgroundMusicVolume=window.setInGameBackgroundMusicVolume,globalThis.downloadTravelTimelineTxt=window.downloadTravelTimelineTxt,globalThis.downloadTravelTimelineJson=window.downloadTravelTimelineJson,globalThis.copyTravelTimeline=window.copyTravelTimeline,globalThis.playGameSound=v,globalThis.debugOnlineBoards=window.debugOnlineBoards,globalThis.selectDraftCard=window.selectDraftCard,document.addEventListener(`visibilitychange`,rr),window.addEventListener(`focus`,rr),q();