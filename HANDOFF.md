# ame-dev-site 引き継ぎメモ

> 次のセッションはこのファイルを最初に読む。文脈ゼロから再開できるよう維持する。

| 知りたいこと | 参照先 |
|---|---|
| コピー(文言)を変えたい | [docs/site-copy.md](docs/site-copy.md) |
| なぜこの実装なのか / 過去の経緯 | [docs/site-history.md](docs/site-history.md) |
| 製品本体 Drive DAM の最新 | `~/Documents/claude-private/drive-dam/HANDOFF.md` |

## 0. 次の Claude へ(2026-08-02 第 2 セッション終了時)

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
   sitemap は両方に送信済みだが、**GSC 側は「取得できませんでした」表示のまま**
   (新規プロパティの既知の表示。初回クロール後に「成功」へ変わるのが典型)。
   数日後に確認し、変わらなければ調査する
2. **LangRedirect(言語自動転送)の扱いは保留**: Googlebot(英語環境で JS 実行)
   にも転送が効き、日本語 LP がリダイレクト扱いになるリスクを発見済み。
   Search Console で `/drivedam/` のインデックス実態を見てから、
   自動転送をやめて「View in English?」バナー方式に変えるかを判断する
3. 検索意図に応える記事セクション(英語の比較・How-to 記事、日本語記事)と
   TOP 英語版は未着手(従来からの「3. 次回着手するなら」も生きている)

過去セッション(2026-07-27 以前)の内容は `docs/site-history.md` を参照。

## 1. プロジェクト概要

- **何**: ame_dev ブランドの公式サイト。総合 TOP(`/`)+ Drive DAM LP(`/drivedam/`)
- **スタック**: Astro 7(minimal / TypeScript strict)。外部フォント・解析・Cookie なし
- **公開先**: GitHub Pages User Site `hello-amedev/hello-amedev.github.io`。
  User Site なのでルート配信 = `base` 調整不要
- **設置場所**: `~/Documents/claude-private/ame-dev-site/`
  (worktree 運用に移行済み。セッションは `claude/<name>` ブランチで作業し、
  終了時に main へ ff-merge)

## 2. 現在の状態(2026-07-27)

### ページ構成(7 ページ・すべて公開済み)

`/` `/drivedam/` `/drivedam/releases/` `/privacy/` +
`/en/drivedam/` `/en/drivedam/releases/` `/en/privacy/`

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

現在の最新は **v1.2.0(2026-08-02)**。

### デプロイ

`main` への push で GitHub Actions(`.github/workflows/deploy.yml`)が自動実行。

## 3. 次回着手するなら

1. **TOP のコピー再点検**。一言紹介・リード文は実装しながら書いたもので、
   あめさんの目でまだ通していない
2. **スクリーンショットの追加**。Works のカードは全作品アイコンのみ。
   主力カード(Drive DAM)だけが実画面を使っている
3. **TOP の英語版**。現在 `/` は日本語のみ。Drive DAM と同じ
   「同一構造の別ファイル」方式で追加できる
4. `func-download.png` は現在未使用(継続保留)

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
- **更新履歴ページの本文は reveal で隠れている**。`<noscript>` で強制表示する
  `<style>` を入れてあるので、reveal のクラス名を変えたら noscript 側も直す

### 多言語

- **多言語ページを新設する時**は Layout の `altHref` に対応言語 URL を渡す
  (`<LangRedirect />` が自動で判定・転送する)。加えて、そのページ内の
  言語切替リンクには必ず `?lang=ja` / `?lang=en` を付けること。
  付けないと自動判定に上書きされる

### 環境

- **User Site なので `base` は付けない**
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

公開 URL: <https://hello-amedev.github.io/>
