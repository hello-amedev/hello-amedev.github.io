# ame-dev-site 引き継ぎメモ

> 次のセッションはこのファイルを最初に読む。文脈ゼロから再開できるよう維持する。
> 設計の背景・確定事項の一次ソースは `~/Documents/claude-private/drive-dam/website-brief.md`
> の冒頭「確定事項（2026-06-27）」ブロック。販売・機能の最新は `drive-dam/HANDOFF.md`。

## 1. プロジェクト概要

- **何**: ame_dev ブランドの公式サイト。ハブ（`/`）＋ Drive DAM ランディング（`/drivedam/`）。
- **目的**: Drive DAM の製品ランディング兼、将来製品を並べる ame_dev ハブ。
- **スタック**: Astro 7（minimal / TypeScript strict）。外部フォント・解析・Cookie なし。
- **公開先（予定）**: GitHub Pages User Site `hello-amedev/hello-amedev.github.io`（public、未作成）。
  User Site なのでルート（`/`）配信＝`base` 調整不要。`astro.config.mjs` の `site` は
  `https://hello-amedev.github.io`。
- **設置場所**: `~/Documents/ame-dev-site/`（claude-private とは別ツリー。worktree 運用外）。

## 2. 現在の状態（2026-06-27）

- **3ページ実装済み・ビルド通過**（`npm run build` → `/`・`/drivedam/`・`/privacy/`）。
- **git 未init・GitHub リポジトリ未作成・未 push**。ローカルにファイルがあるのみ。
- **dev サーバー**: `npm run dev`（Astro デーモン。`npx astro dev status` / `... stop`）。停止済み。
- **テレメトリ**: 無効化済み（`astro telemetry disable`）。

### ページ構成

- `/`（ハブ）: ame_dev 紹介 + Drive DAM 製品カード + 将来製品プレースホルダ。
- `/drivedam/`（ランディング・7セクション）:
  ヒーロー → 3本柱（見つける/共有する/被せるだけ）→ 仕組み図解 → 主要機能5つ → 価格 → FAQ → フッター。
  課題提示セクションと競合比較表は**入れない**（あめさん決定）。
- `/privacy/`: プライバシーポリシー（サイト・アプリとも外部送信なしの実態に即した内容）。

### 確定済みコンテンツ（変更時は website-brief.md も同期）

- ヒーロー: 「**会社の画像を、チームの資産に。**」/ サブ「共有フォルダに被せるだけ。…画像ファイルは触りません。」
- 販売: **Microsoft Store・30日無料 → 買い切り**（目安2,000〜3,000円、価格はストア公開時確定）。
  CTA は「近日 Microsoft Store で公開予定」（押せない状態）。ストア公開後に URL 差し替え。
- ターゲット: 発信に力を入れたい中小企業の代表・採用/マーケ担当。

### デザイン

- 配色: 青 `#4a90e2` / `#2E74B5` ＋白・余白多め。`src/styles/global.css` にトークン集約。
- **Drive DAM の7色タグ**を設計トークン化（`--tag-*`）。差し色として抑制的に使用。
- **frontend-design スキルでブラッシュアップ済み**（2026-06-27）:
  - ヒーロー右を CSS 製の「アプリ風イラスト」に（サムネ格子＋7色タグドット＋選択中パネル）。
    これは**恒久アセット**でスクショ差し替え対象外。
  - 機能の 01〜05 番号を撤去 → 7色タグ色ドットのマーカーに（順序を偽らないため）。
  - 仕組み図解を「被せる（overlay）」表現に強化（半透明レイヤーが共有フォルダに重なる）。
- **スクリーンショットは未撮影**。`/drivedam/` 主要機能5つとヒーロー以外の枠は
  `.shot`（縞模様＋「準備中」）のプレースホルダ。撮影後 `<img>` に差し替える。

### ファイル地図

- `src/layouts/Base.astro` — 共通レイアウト（head/OGP/ヘッダー/フッター）
- `src/components/SiteHeader.astro` / `SiteFooter.astro`
- `src/styles/global.css` — トークン・共通スタイル・`.shot` プレースホルダ枠
- `src/pages/index.astro`（ハブ）/ `src/pages/drivedam/index.astro` / `src/pages/privacy/index.astro`
- `.github/workflows/deploy.yml` — Pages デプロイ（`withastro/action@v4` + `deploy-pages@v4`）
- `public/favicon.svg` — 青角丸＋白「a」のブランドマーク

## 3. 次回着手するなら

1. **git init + GitHub リポジトリ作成 + push**（あめさんの確認後に実行）。
   `setup-new-project.md` の手順に従う: ローカル `user.name`=`ame_dev` /
   `user.email`=`283126279+hello-amedev@users.noreply.github.com`、`.gitignore` に `.claude/`、
   初回コミット。**今回は User Site のため public**（`gh repo create "hello-amedev/hello-amedev.github.io" --public --source . --push`）。
   GitHub 側で Settings → Pages → Source を「GitHub Actions」に設定。
2. **スクリーンショット差し替え**（あめさん撮影後）。主要機能5つの `.shot` を実画像に。
3. 文言・デザインの微調整（プレビュー確認の指摘反映）。
4. 将来: 英語対応（i18n）、ハブへの製品追加（Tsumist / FrameFit / Facilita）。

## 4. 既知の落とし穴

- **User Site なので `base` は付けない**。Project site（リポ名サブパス）と混同しないこと。
- **CTA はストア未公開のため「公開予定」表示**。`drivedam/index.astro` と `index.astro`・
  ヘッダーのリンク文言を、ストア公開時に URL へ差し替える。
- **dev はデーモン常駐**。起動しっぱなしに注意（`npx astro dev stop`）。
- ヒーローのイラストは「スクショではなく恒久アセット」。準備中枠と混同して消さない。

## 5. ビルド / デプロイ

```
cd ~/Documents/ame-dev-site
npm run dev        # 開発（Astro デーモン）/ 停止: npx astro dev stop
npm run build      # dist/ に静的生成
npm run preview    # build 後のローカル確認
```

- デプロイは `main` push で GitHub Actions（`.github/workflows/deploy.yml`）が自動実行。
  リポジトリ作成後、GitHub の Pages 設定を「GitHub Actions」にするのが初回の前提。
