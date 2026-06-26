/*
  Màn "kết quả cuối" bịa cho tour — hiện khi người chơi bấm skip sau vài ngày.

  Lấy điểm THẬT hiện tại của 4 người chơi rồi CHIẾU (project) lên đủ 5 ngày để
  ra bảng xếp hạng cuối hợp lý, reveal lần lượt, rồi cho về trang chủ.
*/
/** Chiếu điểm hiện tại (sau daysPlayed ngày) lên đủ 5 ngày, thêm chút ngẫu nhiên nhẹ. */
function projectFinal(score, daysPlayed) {
    const played = Math.max(1, daysPlayed);
    const base = (score * 5) / played;
    const jitter = 0.92 + ((score % 7) / 7) * 0.16; // 0.92–1.08, tất định theo score
    return Math.round(base * jitter);
}
function medal(rank) {
    var _a;
    return (_a = ["🥇", "🥈", "🥉", "4️⃣"][rank]) !== null && _a !== void 0 ? _a : `${rank + 1}`;
}
function esc(v) {
    return v
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
/**
 * Hiện màn kết quả cuối (overlay tự chứa). onClose gọi khi bấm "Về trang chủ".
 */
export function showResultsReveal(players, daysPlayed, onClose) {
    var _a;
    const ranked = players
        .map((p) => (Object.assign(Object.assign({}, p), { final: projectFinal(p.score, daysPlayed) })))
        .sort((a, b) => b.final - a.final);
    const self = ranked.find((p) => p.isSelf);
    const selfRank = ranked.findIndex((p) => p.isSelf);
    const layer = document.createElement("div");
    layer.className = "tour-result-layer";
    layer.innerHTML = `
    <div class="tour-result">
      <p class="tour-result__eyebrow">Tổng kết hành trình (mô phỏng)</p>
      <h2 class="tour-result__title">Kết quả 5 ngày</h2>
      <ol class="tour-result__board">
        ${ranked
        .map((p, i) => `
          <li class="tour-result__row ${p.isSelf ? "is-self" : ""}" style="--i:${i}">
            <span class="tour-result__medal">${medal(i)}</span>
            <span class="tour-result__name">${esc(p.name)}${p.isBot ? " 🤖" : ""}${p.isSelf ? " (Bạn)" : ""}</span>
            <span class="tour-result__score">${p.final} <small>VP</small></span>
          </li>`)
        .join("")}
      </ol>
      <p class="tour-result__verdict">
        ${selfRank === 0
        ? "🎉 Bạn dẫn đầu hành trình! Tuyệt vời."
        : `Bạn xếp hạng ${selfRank + 1}/4 với ${(_a = self === null || self === void 0 ? void 0 : self.final) !== null && _a !== void 0 ? _a : 0} VP. Chơi thật để leo top nhé!`}
      </p>
      <button type="button" class="tour-result__home" data-result-home>Về trang chủ</button>
    </div>
  `;
    document.body.appendChild(layer);
    document.body.classList.add("tour-result-open");
    // reveal animation trigger
    requestAnimationFrame(() => layer.classList.add("is-in"));
    const close = () => {
        layer.remove();
        document.body.classList.remove("tour-result-open");
        onClose();
    };
    layer.addEventListener("click", (e) => {
        if (e.target.closest("[data-result-home]")) {
            e.preventDefault();
            close();
        }
    });
}
