/**
 * Drive DAM の公開バージョン履歴。
 *
 * サイト内でバージョンに触れる箇所すべての一次ソース:
 *   - リリースノートページ(/drivedam/releases/ ・ /en/drivedam/releases/)
 *   - ヒーロー下のノート / 価格エリアのメタ(日英)
 *   - JSON-LD の softwareVersion(日英)
 *
 * 新しいバージョンを公開したら、この配列の **先頭** に 1 ブロック足すだけでよい。
 * 上記すべてが自動で追随する(以前は日英 3 箇所ずつを手で直していた)。
 *
 * items の文面は Microsoft Store の「このバージョンの最新情報」と揃える。
 * 原典は drive-dam 側の docs/store-listing.md。
 *
 * 収録範囲は **Store で一般に入手できたバージョンのみ**(v1.0.0 以降)。
 * それ以前の v0.9.x〜v0.13.x は社内試用配布のみなので載せない。
 */

export interface Release {
	/** 例: "1.0.2"(先頭の v は付けない。表示側で付ける) */
	version: string;
	/** 公開日。YYYY-MM-DD 固定(表示はロケール問わずこの形のまま使う) */
	date: string;
	/** 日本語の変更点。1 項目 1 文 */
	ja: string[];
	/** 英語の変更点。ja と同じ順序・同じ粒度で対応させる */
	en: string[];
}

export const releases: Release[] = [
	{
		version: "1.1.1",
		date: "2026-07-31",
		ja: [
			"サムネイルの画質を大幅に改善しました。",
			"以前から表示されているサムネイルは、フォルダの右クリックメニュー「共有サムネイルを作り直す」を実行すると新しい画質になります。",
			"起動時や、ほかの作業からウィンドウに戻ったときの読み込みを大幅に高速化しました。",
			"表示を速くするため、サムネイルをお使いの PC に自動保存するようにしました(使用量は設定画面で確認できます)。",
		],
		en: [
			"Thumbnail quality is greatly improved.",
			"Thumbnails created earlier pick up the new quality after running \"Regenerate shared thumbnails\" from a folder's right-click menu.",
			"Startup, and the refresh that runs when you come back to the window, are now much faster.",
			"Thumbnails are now stored on your PC automatically for faster display (you can check the space used in Settings).",
		],
	},
	{
		version: "1.1.0",
		date: "2026-07-30",
		ja: [
			"ブックマークと非表示の記録のしくみを新しくしました。",
			"チームのメンバーがファイルを移動・名前変更しても外れなくなります(チームでお使いの場合は、全員がこのバージョン以降へ更新してからお使いください)。",
			"サブフォルダをカードで一覧・移動できるようになり、表示の「戻る/進む」(Ctrl+←/→、マウスの戻るボタン対応)を追加しました。",
			"フォルダの右クリックメニューも整理しました。",
			"サムネイルが画面の幅にぴったり並ぶようになりました。",
		],
		en: [
			"Bookmarks and hidden flags are now recorded in a new way.",
			"They survive teammates moving or renaming files (if you use Drive DAM as a team, please have everyone update to this version or later).",
			"Subfolders now appear as cards you can browse and open, with back/forward navigation through folder views (Ctrl+←/→, mouse back button).",
			"The folder right-click menu has also been reorganized.",
			"Thumbnails now fit the window width exactly.",
		],
	},
	{
		version: "1.0.3",
		date: "2026-07-28",
		ja: ["拡大プレビューが「読み込み中」のまま表示されなくなることがある問題を修正しました。"],
		en: ["Fixed an issue where the full-screen preview could stay stuck on the loading indicator."],
	},
	{
		version: "1.0.2",
		date: "2026-07-27",
		ja: [
			"フォルダ登録・タグ操作・書き出しまわりの不具合を幅広く修正し、安定性を高めました。",
			"書き出しの途中中断と、共有サムネイル再生成中の進捗表示に対応しました。",
			"画面の用語や案内文を分かりやすく整えました。",
		],
		en: [
			"Fixed a wide range of issues around folder registration, tag editing, and exporting for better overall stability.",
			"You can now cancel an export in progress, and shared thumbnail regeneration shows its progress.",
			"Clarified wording and in-app guidance.",
		],
	},
	{
		version: "1.0.1",
		date: "2026-07-22",
		ja: ["二重起動を防ぐようにしました。"],
		en: ["The app no longer opens a second window when launched while already running."],
	},
	{
		version: "1.0.0",
		date: "2026-07-20",
		ja: ["Microsoft Store での配布を開始した、最初の公開版です。"],
		en: ["The first public release, launched on the Microsoft Store."],
	},
];

/** 最新版。ヒーロー下ノート・価格メタ・JSON-LD が参照する */
export const latest = releases[0];
