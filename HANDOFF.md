# ame-dev-site 引き継ぎメモ

> 次のセッションはこのファイルを最初に読む。文脈ゼロから再開できるよう維持する。

| 知りたいこと | 参照先 |
|---|---|
| コピー(文言)を変えたい | [docs/site-copy.md](docs/site-copy.md) |
| なぜこの実装なのか / 過去の経緯 | [docs/site-history.md](docs/site-history.md) |
| 製品本体 Drive DAM の最新 | `~/Documents/claude-private/drive-dam/HANDOFF.md` |

## 0. 次の Claude へ(2026-09-04 独自ドメイン移行セッション終了時)

### 独自ドメイン `ame-dev.com` へ移行(2026-09-04)

前回の施策が効き、`/drivedam/` は**インデックス登録され「Drive DAM 画像管理」で
Microsoft Store より上位に表示**されるようになった。ただし検索結果のサイト名が
「GitHub」、favicon も GitHub のものになる問題が判明。これは github.io の
サブドメインである以上避けられないため、独自ドメインへ移行した。

1. **サイト名の信号を追加**(`8d53575`)。`og:site_name` を全 10 ページに、
   トップに `WebSite` / `Organization` の JSON-LD を新設(Google のサイト名・ロゴ判定は
   トップページを見る)。`sameAs` は `apps.ts` の `author.links` から生成
2. **`ame-dev.com` を取得**(ムームードメイン)。**サブドメイン構成は採らずサブディレクトリのまま**。
   理由は Google がサブドメインを実質別サイトとして扱うため、評価が分散すること。
   また `.jp` などの ccTLD は地域ターゲティングが日本に固定され Search Console で
   変更できないため、日英中 3 言語のこのサイトには不利
3. **DNS**(ムームー DNS カスタム設定): apex に A 4 本 + AAAA 4 本、`www` に CNAME 1 本
4. **移行完了**。証明書は `ame-dev.com` / `www.ame-dev.com` の両方で `approved`。
   旧ドメインからパス保持の 301 を実測確認済み
5. **移行後の手続きは完了済み(2026-09-04)**
   - Search Console: 新プロパティ `https://ame-dev.com/` 追加・所有権確認・サイトマップ
     (`sitemap-index.xml`)送信・**アドレス変更ツールで旧プロパティから移行を申告**・
     主要 3 ページのインデックス登録リクエストまで実施済み。
     **旧プロパティは消さずに残すこと**(移行の追跡に要る)
   - Microsoft Store: 登録サイト URL を `https://ame-dev.com/drivedam/` に変更して
     **申請済み・認定待ち**。反映はカタログ API で確認できる:
     `.Product.LocalizedProperties[0].PublisherWebsiteUri` が新ドメインになっていれば完了
6. **移行直後は順位が一時的に下がる。これは正常**。301 とアドレス変更ツールに任せ、
   慌てて設定を変えないこと
7. **見直し日 2026-09-09**。次を確認する
   - 新プロパティで `https://ame-dev.com/drivedam/` が「登録されています」になったか
   - 「ページ」レポートの有効ページ数の推移
   - **「Drive DAM 画像管理」で検索し、サイト名が `ame_dev` に、favicon が自作のものに
     変わったか**(これが移行の本来の目的)。サイト名・favicon の反映はインデックス移行より
     遅れることがあり、1 か月見て変わらなければ改めて調べる
   - Store の `PublisherWebsiteUri` が新ドメインになったか

## 0-1. 前セッション(2026-09-02 SEO 調査・言語自動転送の廃止)

### SEO 調査・言語自動転送の廃止(2026-09-02)

きっかけは「『Drive DAM 画像管理』で検索すると Store は 1 位に出るのに LP が出てこない」。
調査した結果、**LP はそもそもインデックスされていなかった**(URL 検査で
「URL が Google に認識されていません」= Google がまだ URL の存在を知らない状態)。

1. **調査で確定した事実**
   - サーバー側は健全。`robots.txt` / `sitemap-index.xml` / `sitemap-0.xml` は
     Googlebot の UA でも 200、`noindex` なし、TOP から LP への内部リンクも
     生 HTML に 3 本(nofollow なし)
   - **`/sitemap.xml` は 404**(Astro が出すのは `sitemap-index.xml`)。GSC の
     「取得できませんでした」が 1 か月続いていた原因はこれ。**10 URL が 1 本も
     Google に渡っていなかった**。あめさんが `sitemap-index.xml` で再送信したが、
     **再送信後も GSC は「取得できませんでした」のまま**(2026-09-02 時点)。
     ファイル自体は本番で HTTP 200・`application/xml`・BOM なしの正常な XML を
     実測済み。TOP はインデックスされている以上ホスト自体はクロール済みなので、
     「サイトマップ取得の処理待ち」= クロール需要が乏しく後回しにされている状態と見ている。
     ③が通れば解消するはず。**Safari はスタイルシートの無い XML を白紙で描画する**ので
     「ファイルが無い」と誤認しやすい。確認は `curl` で行うこと
   - TOP(`/`)はインデックス済み = ドメインは遮断もペナルティも受けていない。
     2 階層目にクロール予算が回っていないだけ
   - Store の登録サイト URL は LP を指している(カタログ API の
     `PublisherWebsiteUri` で実測)が、JS 描画 + nofollow 相当で発見経路にならない
2. **言語自動転送(`LangRedirect.astro`)を廃止し、帯方式(`LangBanner.astro`)に置き換えた**。
   詳細は下記「4. 既知の落とし穴」の多言語の項。**これは③の前にやる必要があった** =
   手動インデックス登録で初めて Google を呼び込む前に直さないと、初回クロールで
   日本語 LP が「英語版へのリダイレクト」として記録されてしまうため
3. **③④の実施状況(2026-09-02 時点。以降は外部の反応待ち)**
   - 帯方式の修正は `7dbac0c` で **本番デプロイ完了・実測確認済み**
     (全ページ `location.replace` 0 件・帯あり)
   - ③ **インデックス登録リクエスト送信済み**: `/drivedam/`・`/drivedam/releases/`・
     `/en/drivedam/` の 3 本。`/` は既にインデックス済みのためスキップ(枠の温存)
   - ④ **窓の杜へ公開情報をメール送付済み**。国内ソフト紹介サイトからのリンクは
     `nofollow` が付きにくく評価が渡るため、SNS より優先度が高いと判断した。
     **記事化の際は Store URL だけでなく LP の URL を載せてもらうことが要点**
     (Store だけだと LP に何も渡らない)
   - **サイトマップの URL 検査は無意味**だった。XML はインデックス対象ではないので
     必ず「認識されていません」と出る。かつ**サイトマップ取得はインデックス登録とは
     別パイプライン**なので、この画面では取得可否を判定できない
4. **見直し日 2026-09-09**。この時点で次を確認する
   - URL 検査で `/drivedam/` が「登録されています」に変わったか
   - 「ページ」レポートの有効ページ数が 1(TOP のみ)から増えたか
   - **1 本もインデックスされていなければ、原因を仕切り直して調べる**
     (サーバー側は DNS・IPv6・TLS・HTTP/1.1・Googlebot UA・robots の 6 経路で
     実測済みなので、次に疑うのはサイト側ではない)
5. 独自ドメイン(例 `amedev.jp`)の取得は保留。github.io サブドメインより
   指名検索に効くが、移行でインデックスが一度リセットされるため、やるなら早い方がよい

### v1.3.3 / v1.3.4 反映セッション(2026-08-23、drive-dam 側セッションの終了処理として main 直で実施)

1. **Drive DAM v1.3.3 と v1.3.4 を更新履歴に追加**。`src/data/releases.ts` の先頭に 2 ブロック
   (v1.3.3 = 日英中 1 項目 / v1.3.4 = 日英中 2 項目)。文面は drive-dam 側 `docs/store-listing.md` の
   提出済み What's new を転記。`npm run build` で 10 ページ生成・3 言語の releases ページに反映を確認
2. 公開日は両方とも 2026-08-23(v1.3.4 は同日に認定通過・公開をあめさんが確認済み。v1.3.3 は
   提出→v1.3.4 に置き換えの間隔が短く、一般公開の実日付は Store API で裏取りしていない。
   ずれていたら `date` を直す)
3. それ以外のページ・掲載文の変更なし

### v1.3.2 反映セッション(2026-08-22、drive-dam 側セッションの終了処理として main 直で実施)

1. **Drive DAM v1.3.2(2026-08-22 Store 提出、認定待ち)を更新履歴に追加**。`src/data/releases.ts` の
   先頭に 1 ブロック(日英中 2 項目ずつ)足しただけ。文面は drive-dam 側 `docs/store-listing.md` の
   確定済み What's new を転記。`npm run build` で 10 ページ生成・3 言語の releases ページに反映を確認
2. 公開日は Store 提出日(2026-08-22)で記載。v1.3.1 も提出日=公開日だった前例に合わせた。
   **認定が遅れて公開日がずれた場合は `date` を直す**(drive-dam 側 HANDOFF 2 章で認定状況を確認)
3. v1.3.1 反映(2026-08-15、`c59da92` / `910a1c5`: 更新履歴追加 + 書き出しカードに対応形式を明記)は
   main 直で行われ、当時この HANDOFF は未更新だった。本セッションで下記「バージョン表記」の最新も是正

### 繁体字版サイト公開セッション(2026-08-11)

worktree `claude/drive-dam-traditional-chinese-update-ba9708` で作業。

1. **日英LPを更新**: `func-files` のスクショを差し替え(RAW/PDF のサムネイルが実際に表示された画面に。旧 3 章 1 番の「RAW/PDF の機能カード追加」は、独立カードではなくこの差し替えで表現する方針に変更し解消)。新機能カード「記録の紐づけ直し」(EN: Relink records)を「チームでの運用」グループに追加。更新履歴に v1.3.0 を追加(文面は drive-dam 側の `docs/store-listing.md` で確定済みのものを転記)
2. **繁体字版 LP(`/zh/drivedam/` `/zh/drivedam/releases/` `/zh/privacy/`)を新規公開**。日英版と完全に同じ構成・内容で新設(新機能カード込み)。台湾ストアの実データ(価格 **679 TWD**)は Store API で実測確認済み。**og:image も日英版と同じ構図で新規作成**(`hero-main-zh.png` を使い、ブラウザの Canvas API で手組みして PNG 出力。日英版の生成元テンプレートはリポジトリ内に見当たらず、構図を目視で再現した)
3. **言語まわりを 2 言語 → 3 言語対応に拡張**: `DrivedamLayout` / `Base` / `SiteHeader` / `SiteFooter` / `LangRedirect` を改修。`altHref`(単一文字列)だった props を **`alt`(`{ja?, en?, zh?}` のマップ)に置き換え**(呼び出し元 9 ファイルすべて追随)。自動判定・切替リンク・hreflang もすべて 3 方向化
4. **繁体字フォント(Noto Sans TC)を追加**(`@fontsource/noto-sans-tc`)。`:lang(zh)` セレクタで palt(和文詰め組み)を切り、フォントを差し替え(`drivedam.css` ・ `global.css` の両方)
5. **翻訳体制**: Sonnet サブエージェント 3 体並列で翻訳(LP 本文 / 更新履歴 / プライバシーポリシー、それぞれ drive-dam 側の確定済み用語集・Store 掲載文を参照させて用語を統一)→ **Fable サブエージェントが検品役**(1 回目は用語統一・整合性、2 回目はあめさん指示で自然さ・魅力度の観点)。**前回の体制はSonnetが翻訳者・Fableが監督/検品だったとあめさんから訂正が入り、その体制で実施**(過去ログに「Fable監督+Sonnet実装」という逆の記述が残っていたため要注意)
6. `releases.ts` に **`zh: string[]` フィールドを新設**。全 8 バージョン分(v1.0.0〜v1.3.0)の繁体字訳を用意(v1.3.0 は Store 掲載文を転記、それ以前は新規翻訳)
7. 新機能カードの日本語原文は今回書き起こし。あめさんの一次レビューで「ほかのメンバーにリネーム・移動されると/元の名前に取り残される」→「**アプリ外で直接**リネーム・移動されると/**元のフォルダ**に取り残される」に訂正(トリガー条件と残留場所の誤りを修正、日英中 3 言語とも追随)

### 第 2 セッション(ブランドロゴ導入)

worktree `claude/ame-dev-brand-logo-ad3c5e` で作業(セッション終了時に main へ
ff-merge する運用)。

1. **ame_dev ブランドロゴを制定**。雲+雨粒 3 つを 1 枚の連続グラデーション
   (水色 `#94DEEC` → 青紫 `#96B0F5` → 菫 `#B298F0` → 桃 `#E9B2E0` =
   TOP のパステルパレット)で描いた SVG。あめさんと 5 案+微調整 6 案を
   比較して決定(雲は低いスリーク形状、雨粒はしずく形・山型配置)。
   **マスターは `public/assets/brand/ame-dev-logo.svg`**
2. **総合 TOP ヘッダー**の青ドットをロゴ(22px インライン SVG、
   `.hb-brand-logo`)に差し替え
3. **favicon.svg / favicon.ico を新ロゴに差し替え**(ico は 16/32/48 内包。
   Pillow で 512px 透過レンダリングからダウンスケール生成)
4. プロフィール用 PNG 3 種(紙色・ダーク・透過、512px)はあめさんへ納品済み
   (リポジトリには含めない)

### 第 1 セッション(Drive DAM マーケ強化の一環。全体方針・経緯は
`~/Documents/claude-private/drive-dam/HANDOFF.md` 2 章「マーケ強化セッション第1弾」を参照)

1. **SEO/AIO 強化一式**: FAQ を JS 組み立て → Astro 静的レンダリング + FAQPage
   JSON-LD に変更(日英、見た目・開閉挙動は不変。一次ソースは各 LP frontmatter の
   `faq` 配列に移動)/ `@astrojs/sitemap` 導入 + `public/robots.txt` /
   AI クローラー向け `public/llms.txt` 新設 / SoftwareApplication JSON-LD に
   screenshot・featureList・sameAs を追記
2. **LP の title にキーワード追加**(日英とも既存コピーに「| 共有フォルダで使える
   画像管理(DAM)アプリ」/「| DAM app for Windows」を後置。あめさん案 A 承認)

次回の残り(SEO/AIO 続き):

1. **Search Console / Bing Webmaster とも登録完了(2026-08-02)**。所有権確認
   ファイルは `public/google0edd9d5dd7f2424f.html` と `public/BingSiteAuth.xml`
   (**両方とも削除禁止** = 消すと所有権失効)。プロパティはどちらもサイトルート。
   **sitemap の送信パスは `sitemap-index.xml`**(`sitemap.xml` は 404。
   2026-09-02 に是正済み)
2. **言語自動転送は 2026-09-02 に廃止済み**(帯方式へ)。この項目は解消
3. 検索意図に応える記事セクション(英語の比較・How-to 記事、日本語記事)と
   TOP 英語版は未着手(従来からの「3. 次回着手するなら」も生きている)

### v1.2.0 反映セッション(本日最初。16:38 の `afe843b` / `d114dba`)

worktree `claude/drive-dam-1-2-0-site-update-9e23c2` で作業。

1. **Drive DAM v1.2.0(2026-08-02 公開)を更新履歴に追加**。`src/data/releases.ts` に
   1 ブロック足しただけで、更新履歴ページ・ヒーロー下ノート・価格メタ・JSON-LD の
   日英すべてが追随することを本番で確認した。公開日はストア API で裏取り
   (`PackageFullName` = `amedev.DriveDAM_1.2.0.0_x64`)
2. **RAW・PDF のサムネイル対応に合わせて「すべてのファイルを可視化」カードの注記を修正**。
   v1.2.0 で RAW と PDF がサムネイル表示に対応したため、
   「※画像以外のサムネイル表示には未対応です」が事実と食い違っていた。
   日本語 LP・英語 LP・`docs/site-copy.md` の 3 箇所を揃えて直した
3. **RAW / PDF の機能カード追加は見送った**(3 章の 1 番)。機能カードは実スクショで
   見せる方針で、撮影待ちのため

過去セッション(2026-07-27 以前)の内容は `docs/site-history.md` を参照。

## 1. プロジェクト概要

- **何**: ame_dev ブランドの公式サイト。総合 TOP(`/`)+ Drive DAM LP(`/drivedam/`)
- **スタック**: Astro 7(minimal / TypeScript strict)。外部フォント・解析・Cookie なし
- **公開先**: GitHub Pages User Site `hello-amedev/hello-amedev.github.io`。
  **独自ドメイン `ame-dev.com` で配信(2026-09-04 移行)**。旧 `hello-amedev.github.io` は
  GitHub が自動でパス保持の 301 転送を行う。User Site なのでルート配信 = `base` 調整不要
- **設置場所**: `~/Documents/claude-private/ame-dev-site/`
  (worktree 運用に移行済み。セッションは `claude/<name>` ブランチで作業し、
  終了時に main へ ff-merge)。dev サーバーはブラウザペインから起動する場合、
  `.claude/launch.json`(port 4321)を使う

## 2. 現在の状態(2026-08-11)

### ページ構成(10 ページ・すべて公開済み)

`/` `/drivedam/` `/drivedam/releases/` `/privacy/` +
`/en/drivedam/` `/en/drivedam/releases/` `/en/privacy/` +
`/zh/drivedam/` `/zh/drivedam/releases/` `/zh/privacy/`

繁体字版は日英版と同じ構成(総合 TOP `/` のみ繁体字化はスコープ外。TOP 自体まだ英語版もない)。
3 言語の切替は `alt` prop(`{ja?, en?, zh?}` のマップ)で配線。新しい多言語ページを足す時は
`LangRedirect` への `current`/`alt` の受け渡しと、hreflang の 3 方向出力を確認すること。

### 総合 TOP(`/`)

コンセプトは**「白の紙面に、パステルの光とガラスの道具」**。
一次ソースは `src/pages/index.astro` + `src/styles/hub.css`、
作品データは `src/data/apps.ts`。

- **ブランドロゴ**: ヘッダー左上にインライン SVG(gradient id
  `amedev-brand-g`)。マスターは `public/assets/brand/ame-dev-logo.svg`。
  favicon(svg / ico)も同ロゴ。プロフィール画像を再生成する時は
  マスター SVG を 512px でレンダリングする(viewBox を `4 4 40 40` に
  詰めると円形クロップにちょうど良い)

- **メッシュグラデーション**: 輪郭のある色面を `filter: blur()` でぼかす方式。
  珊瑚(左上)・淡黄(右上)・下辺のスペクトル帯・菫(右下)の非対称構図。
  周期を 19〜43 秒で揃えていないので同じ配色が戻らない
- **グレイン**: ノイズの明度をアルファに変換した「墨の粒」を**通常合成**でまぶす。
  白地では `overlay` / `soft-light` は数学的にほぼ無効なので使わない
- **浮遊アイコン**: アイコン画像そのものが極薄のガラス板。厚みは下端の接地影 1 本。
  傾きは ±5〜11°(深くすると潰れて見える)。**選択は固定式**で、
  ホバーを外しても戻らない(中央の紹介文のリンクを押せるようにするため)
- **Works**: 全作品をアイコンのタイルで統一。`featured: true` の Drive DAM だけ
  全幅の主力カードで実画面を大きく見せる
- **AI for ART**: 白の紙面のまま紹介を読み、作品ブロックに差しかかると
  **世界ごと闇へ反転**(背景 + 文字色)。出口では戻さない。
  背景は公開中の「生命の夜」を iframe で埋め込み(下記の落とし穴も参照)

### バージョン表記

**`src/data/releases.ts` が唯一の一次ソース。** 新バージョンを公開したら
配列の**先頭に 1 ブロック足すだけ**で、更新履歴ページ・ヒーロー下ノート・
価格メタ・JSON-LD の日英すべてが追随する。

現在の最新は **v1.3.4(2026-08-23、Store 公開済み)**。日英中の 3 言語すべて `releases.ts` に追随する。

### デプロイ

`main` への push で GitHub Actions(`.github/workflows/deploy.yml`)が自動実行。

## 3. 次回着手するなら

1. **TOP のコピー再点検**。一言紹介・リード文は実装しながら書いたもので、
   あめさんの目でまだ通していない
2. **スクリーンショットの追加**。Works のカードは全作品アイコンのみ。
   主力カード(Drive DAM)だけが実画面を使っている
3. **TOP の英語版・繁体字版**。現在 `/` は日本語のみ。Drive DAM と同じ
   「同一構造の別ファイル」方式で追加できる(繁体字は英語版より後でよい)
4. `func-download.png` は現在未使用(継続保留)
5. 保留中の SEO/AIO(Search Console の様子見・LangRedirect のバナー化検討・
   検索意図記事)は 2026-08-02 セッションから引き続き未着手

## 4. 既知の落とし穴

### バージョン・コピー

- **バージョンをページに直書きしない**。`src/data/releases.ts` に足すだけでよい。
  **日付は Store の一般公開日**を入れる(ビルド日でもサイト更新日でもない)。
  ストア API で裏取りできる:
  `https://displaycatalog.mp.microsoft.com/v7.0/products/9P4L43W1XP7P?market=JP&languages=ja-jp&fieldsTemplate=Details`
  の `PackageFullName` に実バージョンが出る
- **日本語版 LP を修正したら英語版も追随させる**。日英は同一構造の別ファイルで、
  共通化していない。コピー・構造・FAQ(inline script 内)は放置すると乖離する
- **禁則**: 「被せる」/ 明朝の見出し。詳細は [docs/site-copy.md](docs/site-copy.md)

### 総合 TOP(hub.css)

- **`background` の一括指定をホバーで使わない**。`background-image` の
  グラデーションごと消える。`background-color` だけを触ること
- **クラス名の衝突に注意**。主力カードのコンテナ(`.hb-feature`)と通常カードの
  本文(`.hb-card-lead`)は別物。過去に同名で事故った
- **グレイン層には `border-radius: inherit` が要る**。付け忘れると角で四角くはみ出す
- **AI for ART の背景は絶対配置のラッパー(`.hb-art-bgwrap`)で重ねる**。
  負のマージンで重ねると sticky の可動範囲計算が壊れ、背景がページ最下部まで貼り付く
- **実物(iframe)が乗ったら下地の静止画は消す**。残すと動かない光の筋が
  焼き付きのように見える
- **枠の高さが `aspect-ratio` 由来のとき、% 高さは解決されないことがある**。
  幅と margin の %(必ず幅基準)で組むこと

### Drive DAM LP(drivedam.css)

- **紙色パレットを変える時は「暗パネル用の対の変数」も追随させる**
  (`--paper` を変えて `--paper-night` を忘れ、ベージュが残った事故あり)
- **CTA の光だまり(`.btn-store::before`)は `.btn-store` の `z-index:0` とセット**。
  外すと疑似要素がセクション背景の裏に回って光が消える
- **ストア URL は各ページのフロントマター `storeUrl` 定数に集約**(JA/EN で別 URL)
- **価格は各ページの `storePrice` 定数が一次ソース**(JP 2500 / US 19.99 / TW 679)。
  価格セクションの本文と JSON-LD の両方がここを見るので、直書きしないこと。
  **Microsoft Store がセールを行うと LP の金額が実態とずれる**ため、
  値下げ・値上げの際はこの定数を直す。実売価格はカタログ API で裏取りできる:
  `https://displaycatalog.mp.microsoft.com/v7.0/products/9P4L43W1XP7P?market=JP&languages=ja-jp&fieldsTemplate=Details`
  の `DisplaySkuAvailabilities[].Availabilities[].OrderManagementData.Price`
  (`market` を US / TW に変えれば各国価格。0.0 の SKU は無料体験版)
- **更新履歴ページの本文は reveal で隠れている**。`<noscript>` で強制表示する
  `<style>` を入れてあるので、reveal のクラス名を変えたら noscript 側も直す

### 多言語

- **多言語ページを新設する時**は Layout(`DrivedamLayout`/`Base`)の `alt` prop に
  「自分以外の言語 → URL」のマップを渡す(例: ja ページなら
  `alt={{ en: "/en/...", zh: "/zh/..." }}`)。`<LangBanner current alt />` が
  帯と hreflang をこのマップから組み立てる。加えて、そのページ内の
  言語切替リンクには必ず `?lang=ja` / `?lang=en` / `?lang=zh` を付けること。
  付けないと「その言語を選んだ」ことが記録されず、帯が出続ける
- **言語による自動転送(`location.replace`)を復活させない**。Googlebot は
  en-US 環境で JS を実行するので、日本語・繁体字ページが「リダイレクトされた
  ページ」としてインデックス対象外になる。案内は必ず帯(`LangBanner.astro`)で行い、
  **9 ページすべてが実在するページとして残る**状態を保つこと
- **帯の高さは `--langbar-h`(CSS 既定 44px → JS が実測で上書き)で配られる**。
  `.site-head`(fixed)・`.progress`(fixed)・`.site-header`(sticky)の `top` と
  `body` の `padding-top` がこれを見ている。**固定・追従ヘッダーを新設したら
  `LangBanner.astro` の `is:global` ブロックにセレクタを足すこと**。
  なお実測は web フォント読み込み前だと桁違いの値(実測 390px)を拾うため、
  rAF・`document.fonts.ready`・`load`・ResizeObserver の 4 点で測り直し、
  200px 以上の異常値は捨てている
- **既存言語ページをコピーして新しい言語ディレクトリを作る時、相対 import パスの深さがズレる**。
  例: `src/pages/drivedam/index.astro`(`pages/<page>` = 2 階層)をコピーして
  `src/pages/zh/drivedam/index.astro`(`pages/zh/<page>` = 3 階層)を作ると、
  `../../layouts/...` のままでは 1 階層足りずビルドが `UNRESOLVED_IMPORT` で落ちる。
  コピー元と同じ深さの既存言語(この場合は `en/`)の import 行を基準にすること

### 環境

- **User Site なので `base` は付けない**
- **独自ドメインは Settings → Pages で設定する。`public/CNAME` だけでは効かない**。
  GitHub Actions でデプロイしている場合、成果物の `CNAME` ファイルは custom domain の
  設定にならない(ブランチ配信なら自動で入る)。2026-09-04 の移行時に実際にハマった。
  `CNAME` ファイル自体は将来ブランチ配信へ戻した時のために残してある
- **ドメインを変えたら書き換えるのは 4 ファイルだけ**: `astro.config.mjs` の `site`、
  `public/robots.txt`、`public/llms.txt`、`src/data/apps.ts`。
  canonical・hreflang・og:url・JSON-LD・サイトマップはすべて `Astro.site` から生成される
- **`/ART/` は別リポジトリの Project Pages**。User Site に独自ドメインを設定すると
  同じアカウントの Project Pages も新ドメイン配下に移る(`ame-dev.com/ART/` で 200 を実測)
- **dev はデーモン常駐**。停止: `npx astro dev stop`
- **Astro 7 + Node 24 で Vite 8 系を直接呼ぶと `#module-sync-enabled` エラー**に
  なることがある。Astro 経由で起動する分には問題ない
- **headless Chrome で撮影する時**: `--virtual-time-budget` を使う。
  フラグメント(`#works`)へのスクロール撮影は composite がずれて使えないので、
  全体像は撮影中だけ `100svh` を固定 px に置換する
- **ブラウザペインが非表示だと rAF・IntersectionObserver・トランジションが凍る**。
  スクロール連動やホバーの検証結果を読み違えやすい。
  詳細は [docs/site-history.md](docs/site-history.md) の「検証環境の落とし穴」
- **`design-poc/` `copy/` は .gitignore で非追跡**(内部 PoC 資材はローカルのみ)

## 5. ビルド / デプロイ

```
cd ~/Documents/claude-private/ame-dev-site
npm run dev        # 開発(Astro デーモン)/ 停止: npx astro dev stop
npm run build      # dist/ に静的生成
npm run preview    # build 後のローカル確認
git push origin main   # GitHub Actions が自動デプロイ
```

公開 URL: <https://ame-dev.com/>(旧 <https://hello-amedev.github.io/> は 301 転送)
