# ame-dev-site 引き継ぎメモ

> 次のセッションはこのファイルを最初に読む。文脈ゼロから再開できるよう維持する。

| 知りたいこと | 参照先 |
|---|---|
| コピー(文言)を変えたい | [docs/site-copy.md](docs/site-copy.md) |
| なぜこの実装なのか / 過去の経緯 | [docs/site-history.md](docs/site-history.md) |
| 製品本体 Drive DAM の最新 | `~/Documents/claude-private/drive-dam/HANDOFF.md` |

## 0. 次の Claude へ(2026-08-02 セッション終了時)

**未 push なし。ローカル `main` と `origin/main` は一致している。デプロイ成功も確認済み。**

このセッションでやったこと:

1. **Drive DAM v1.2.0(2026-08-02 公開)を更新履歴に追加**。`src/data/releases.ts` に
   1 ブロック足しただけで、更新履歴ページ・ヒーロー下ノート・価格メタ・JSON-LD の
   日英すべてが追随することを本番で確認した
2. **RAW・PDF のサムネイル対応に合わせて「すべてのファイルを可視化」カードの注記を修正**。
   v1.2.0 で RAW と PDF がサムネイル表示に対応したため、
   「※画像以外のサムネイル表示には未対応です」が事実と食い違っていた。
   日本語 LP・英語 LP・`docs/site-copy.md` の 3 箇所を揃えて直した
3. **RAW / PDF の機能カード追加は見送った**(3 章の 1 番)。機能カードは実スクショで
   見せる方針なので、撮影待ち

**ドキュメントとの差分**: このセッションは worktree で作業した。1 章に
「worktree 運用外」と書いてあったが実際には問題なく回せたので、記述を実態に合わせた。

## 1. プロジェクト概要

- **何**: ame_dev ブランドの公式サイト。総合 TOP(`/`)+ Drive DAM LP(`/drivedam/`)
- **スタック**: Astro 7(minimal / TypeScript strict)。外部フォント・解析・Cookie なし
- **公開先**: GitHub Pages User Site `hello-amedev/hello-amedev.github.io`。
  User Site なのでルート配信 = `base` 調整不要
- **設置場所**: `~/Documents/claude-private/ame-dev-site/`。
  worktree 運用に載せて問題なく回る(2026-08-02 実績)。
  dev サーバーは `.claude/launch.json`(port 4321)から起動できる

## 2. 現在の状態(2026-08-02)

### ページ構成(7 ページ・すべて公開済み)

`/` `/drivedam/` `/drivedam/releases/` `/privacy/` +
`/en/drivedam/` `/en/drivedam/releases/` `/en/privacy/`

### 総合 TOP(`/`)

コンセプトは**「白の紙面に、パステルの光とガラスの道具」**。
一次ソースは `src/pages/index.astro` + `src/styles/hub.css`、
作品データは `src/data/apps.ts`。

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

1. **RAW / PDF の機能カードを LP に追加**(v1.2.0 の目玉だが未掲載)。
   必要なスクショは「RAW サムネイルが並んだ一覧」「PDF を内蔵ビューアで開いた画面」の
   日英 2 枚ずつ。撮影はあめさん待ち。現状は「すべてのファイルを可視化」カードの
   本文で 1 文触れているだけ
2. **TOP のコピー再点検**。一言紹介・リード文は実装しながら書いたもので、
   あめさんの目でまだ通していない
3. **スクリーンショットの追加**。Works のカードは全作品アイコンのみ。
   主力カード(Drive DAM)だけが実画面を使っている
4. **TOP の英語版**。現在 `/` は日本語のみ。Drive DAM と同じ
   「同一構造の別ファイル」方式で追加できる
5. `func-download.png` は現在未使用(継続保留)

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
