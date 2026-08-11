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
	/** 繁体字(zh-TW)の変更点。ja と同じ順序・同じ粒度で対応させる */
	zh: string[];
}

export const releases: Release[] = [
	{
		version: "1.3.0",
		date: "2026-08-07",
		ja: [
			"フォルダを画面左のパネルへドラッグ&ドロップするだけでライブラリに登録できるようになりました。",
			"複数のファイルを選択して、1 つの zip にまとめてダウンロードフォルダへ保存できるようになりました。",
			"画像がアプリの外で移動・名前変更されたときに、残された「タグなどの記録」を検知してお知らせし、移動先のファイルへ紐づけ直せるようになりました。",
			"表示言語に繁體中文を追加しました。",
		],
		en: [
			"Register folders to your library by simply dragging and dropping them onto the left panel.",
			"Select multiple files and download them together as a single ZIP file.",
			"When images are moved or renamed outside Drive DAM, the app now detects the tags and records left behind, notifies you, and lets you relink them to the file's new location.",
			"Added Traditional Chinese (繁體中文) as a display language.",
		],
		zh: [
			"只要將資料夾拖放到視窗左側面板，即可加入圖庫。",
			"可選取多個檔案，一次壓縮成一個 ZIP 儲存到下載資料夾。",
			"當圖片在 Drive DAM 之外被移動或重新命名時，應用程式會偵測留下的「標籤等記錄」並顯示通知，讓您將記錄重新連結到檔案的新位置。",
			"介面新增繁體中文支援。",
		],
	},
	{
		version: "1.2.0",
		date: "2026-08-02",
		ja: [
			"カメラの RAW ファイル(NEF・CR2・ARW・DNG など)のサムネイル表示・拡大表示・撮影日に対応しました。",
			"PDF も 1 ページ目のサムネイルが表示され、アプリ内で全ページを閲覧できるようになりました(サムネイルは表示した分だけ作られます)。",
			"画像以外のファイルをダウンロードフォルダへコピーできるボタンと、サムネイルの種別マーク(NEF・PDF など)を追加しました。",
			"並び順の設定を「表示・並び替え」パネルにまとめ、昇順・降順を別々に選べるようにしました。",
			"検索で見つけたファイルの保存フォルダをアプリ内で開けるようになりました(右クリックの「ファイルの場所を開く」、または詳細パネルの保存場所をクリック)。",
		],
		en: [
			"Camera RAW files (NEF, CR2, ARW, DNG, and more) now show thumbnails, open in the full-screen preview, and carry their shoot dates.",
			"PDFs now show a first-page thumbnail and can be read page by page inside the app (thumbnails are generated only for the PDFs you actually view).",
			"Added a Download button for non-image files, and small file-type badges (NEF, PDF, etc.) on thumbnails.",
			"Sorting now lives in a new \"View & sort\" panel, with a separate ascending/descending switch.",
			"You can now jump to the folder a file lives in without leaving the app — right-click it and choose \"Open file location\", or click the location shown in the detail panel.",
		],
		zh: [
			"相機 RAW 檔(NEF、CR2、ARW、DNG 等)新增支援縮圖顯示、放大檢視與拍攝日期。",
			"PDF 也會顯示第 1 頁縮圖，並可在應用程式內閱讀全部頁面(縮圖僅會依實際檢視的部分產生)。",
			"新增可將非圖片檔案複製到下載資料夾的按鈕，以及縮圖上的檔案類型標記(NEF、PDF 等)。",
			"排序設定已整合至「顯示與排序」面板，並可分別選擇遞增／遞減。",
			"現在可以在應用程式內開啟搜尋到的檔案所在的資料夾(在檔案上按右鍵選擇「開啟檔案所在位置」，或點擊詳細面板中顯示的儲存位置)。",
		],
	},
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
		zh: [
			"大幅提升縮圖畫質。",
			"先前顯示的縮圖，只要在資料夾右鍵選單執行「重新產生共用縮圖」，即可套用新的畫質。",
			"大幅加快啟動時，以及從其他工作切換回視窗時的載入速度。",
			"為加快顯示速度，縮圖現在會自動儲存到您的電腦(可在設定畫面確認使用量)。",
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
		zh: [
			"更新了書籤與隱藏的記錄機制。",
			"即使團隊成員移動或重新命名檔案，這些記錄也不會再遺失(若為團隊共用，請等所有成員都更新到此版本以後再使用)。",
			"子資料夾現在可以用卡片方式瀏覽與開啟，並新增了畫面的「上一頁／下一頁」導覽功能(支援 Ctrl+←/→ 與滑鼠的上一頁按鈕)。",
			"同時整理了資料夾的右鍵選單。",
			"縮圖現在會剛好對齊畫面寬度排列。",
		],
	},
	{
		version: "1.0.3",
		date: "2026-07-28",
		ja: ["拡大プレビューが「読み込み中」のまま表示されなくなることがある問題を修正しました。"],
		en: ["Fixed an issue where the full-screen preview could stay stuck on the loading indicator."],
		zh: ["修正了放大預覽有時會停留在「載入中」畫面、無法正常顯示的問題。"],
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
		zh: [
			"廣泛修正了資料夾登錄、標籤操作、匯出相關的問題，提升整體穩定性。",
			"支援匯出中途中斷，以及重新產生共用縮圖時顯示進度。",
			"調整了畫面上的用詞與說明文字，使其更容易理解。",
		],
	},
	{
		version: "1.0.1",
		date: "2026-07-22",
		ja: ["二重起動を防ぐようにしました。"],
		en: ["The app no longer opens a second window when launched while already running."],
		zh: ["已防止應用程式重複啟動。"],
	},
	{
		version: "1.0.0",
		date: "2026-07-20",
		ja: ["Microsoft Store での配布を開始した、最初の公開版です。"],
		en: ["The first public release, launched on the Microsoft Store."],
		zh: ["這是在 Microsoft Store 開始發布的首個公開版本。"],
	},
];

/** 最新版。ヒーロー下ノート・価格メタ・JSON-LD が参照する */
export const latest = releases[0];
