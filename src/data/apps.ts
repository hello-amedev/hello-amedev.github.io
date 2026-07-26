/**
 * ame_dev の作品一覧。総合 TOP(`/`)の一次ソース。
 *
 * ヒーローの浮遊アイコン・Works のカード・構造化データがすべてこの配列を参照する。
 * 新しいアプリを公開したら、ここに 1 ブロック足せば 3 箇所すべてに反映される。
 *
 * Works のカードは全作品ともアイコンのタイルで統一している。例外は
 * `featured: true` の主力製品だけで、そこだけ実画面(`shot`)を大きく使う。
 *
 * 「生命の夜」は AI for ART プロジェクトの作品なので、この配列には入れず
 * TOP の専用セクションで別扱いにしている。
 */

/** 配布のかたち。カードの種別バッジとフィルタ表示に使う */
export type AppKind = "windows" | "chrome" | "web" | "soon";

export interface AppEntry {
	/** アイコン・スクショのファイル名と DOM の id に使う識別子 */
	id: string;
	name: string;
	kind: AppKind;
	/** 種別バッジの文言 */
	kindLabel: string;
	/** 一言紹介。ヒーローで大きく出る 1 行 */
	tagline: string;
	/** 短いリード文。カードで tagline の下に出る 2〜3 行 */
	lead: string;
	/** 配布先。準備中(kind: "soon")は undefined */
	href?: string;
	/** リンクのラベル。「Microsoft Store で入手」など */
	hrefLabel?: string;
	/** 外部サイトなら true(新規タブ + rel を付ける) */
	external?: boolean;
	/** アイコンの背景が透過（角丸の下敷きが無い形）なら true。ガラス板の敷き方を変える */
	iconCutout?: boolean;
	/**
	 * 主力製品。Works で 1 枚だけ全幅の大きなカードになり、実画面を大きく見せる。
	 * ストアのメインビジュアル（大きなキャッチ + 画面が下端で切れる構図）に揃えてある。
	 */
	featured?: boolean;
	/** 主力カードだけで使う 2 行のキャッチ。ストアのメインビジュアルと同じ文言 */
	featuredCatch?: string[];
	/** ホバー時に背景を染める主色 */
	accent: string;
	/** 同・副色。2 色の組み合わせでアプリごとの空気を作る */
	accentSoft: string;
	/** 実スクリーンショット。`featured` の主力カードでのみ使う */
	shot?: string;
	shotW?: number;
	shotH?: number;
	/** スクショの内容を説明する alt 文 */
	shotAlt?: string;
}

export const apps: AppEntry[] = [
	{
		id: "drivedam",
		name: "Drive DAM",
		kind: "windows",
		kindLabel: "Windows アプリ",
		tagline: "数万枚の画像から、目的の 1 枚へ。",
		lead: "共有フォルダに置いたままの画像に、タグ・色・メモを付けて管理できる画像特化のデジタルアセット管理ツール。数万枚の画像も開いてすぐ一覧でき、チーム全員が同じ情報を見られます。",
		href: "/drivedam/",
		hrefLabel: "製品ページを見る",
		accent: "#2E63EF",
		accentSoft: "#7FA8FF",
		featured: true,
		featuredCatch: ["数万枚の画像から、目的の 1 枚へ。", "ひとりでも、チームでも。"],
		shot: "/drivedam/assets/hero-main.png",
		shotW: 2558,
		shotH: 1597,
		shotAlt: "Drive DAM の画面。サムネイル一覧と、選択した画像のタグ・メモのパネル",
	},
	{
		id: "tsumist",
		name: "Tsumist",
		kind: "windows",
		kindLabel: "Windows アプリ",
		tagline: "タスクを積んで、今日の重さを見る。",
		lead: "タスクをブロックとして盤面に積んでいく個人向けのタスク管理。大きさが作業の重さ、色が種類を表すので、いま抱えている量がひと目でわかります。",
		href: "https://ame-dev.booth.pm/items/8283854",
		hrefLabel: "BOOTH で入手",
		external: true,
		iconCutout: true,
		accent: "#00B6D4",
		accentSoft: "#6BE3F2",
	},
	{
		id: "mitamama",
		name: "Mitamama",
		kind: "windows",
		kindLabel: "Windows アプリ",
		tagline: "AI がつくった資料を、見たまま直す。",
		lead: "AI が出力した HTML の資料やレポートを、ブラウザで開くのと同じ見た目のまま表示します。直したい文字をクリックしてその場で書き換えられるので、コードを開く必要がありません。",
		href: "https://note.com/ame_dev/n/nc413c3739667",
		hrefLabel: "note で入手",
		external: true,
		accent: "#1B347F",
		accentSoft: "#5C86F0",
	},
	{
		id: "framefit",
		name: "FrameFit",
		kind: "windows",
		kindLabel: "Windows アプリ",
		tagline: "ウィンドウを、狙ったサイズにぴたりと。",
		lead: "画面の録画やスクリーンショットのために、ウィンドウを正確な寸法へ一発で変形するユーティリティ。よく使うサイズはプリセットとして登録しておけます。",
		href: "https://ame-dev.booth.pm/items/8515828",
		hrefLabel: "BOOTH で入手",
		external: true,
		accent: "#6B4FF0",
		accentSoft: "#B3A4FF",
	},
	{
		id: "snapside",
		name: "SnapSide",
		kind: "chrome",
		kindLabel: "Chrome 拡張",
		tagline: "いま見ているタブを、画面の横に貼る。",
		lead: "作業中のタブをワンクリックで画面の横に切り出す拡張機能。メインの作業を続けながら、資料やチャットを並べて見られます。比率の調整や、2 枚目のモニターへの送り出しにも対応。",
		href: "https://chromewebstore.google.com/detail/emcpdnccfhceimjdnfffaedjnlffhcil",
		hrefLabel: "Chrome ウェブストアで入手",
		external: true,
		accent: "#7B8AF0",
		accentSoft: "#C2C9FA",
	},
	{
		id: "steep",
		name: "Steep",
		kind: "web",
		kindLabel: "スマートフォン用 WEB アプリ",
		tagline: "紅茶を淹れる時間を、目で味わう。",
		lead: "開くと同時に数えはじめる、紅茶のためのタイマー。紅茶色の光がゆっくり深まっていく様子で時間の経過を伝えます。音も振動もありません。スマートフォンのホーム画面に置いて使えます。",
		href: "https://steep-seven.vercel.app",
		hrefLabel: "ブラウザで開く",
		external: true,
		accent: "#A45C2C",
		accentSoft: "#E5BA8E",
	},
	{
		id: "stockboard",
		name: "StockBoard",
		kind: "web",
		kindLabel: "スマートフォン用 WEB アプリ",
		tagline: "買い置きを、マグネットで管理する。",
		lead: "買い置きの品をマグネットに見立てて、ボードの上下に貼り分けるだけの在庫管理。上が「ある」、下が「買う」。タップすると反対側へ移ります。データは端末の中だけに残ります。",
		href: "https://stockboard-red.vercel.app/",
		hrefLabel: "ブラウザで開く",
		external: true,
		accent: "#D2568C",
		accentSoft: "#F4A8C8",
	},
	{
		id: "facilita",
		name: "Facilita",
		kind: "soon",
		kindLabel: "準備中",
		tagline: "場づくりの進行を、設計する。",
		lead: "ワークショップ・研修・会議など、時間割のある場をつくるためのアプリ。プログラムを一覧で組み立てて、当日はそのまま進行画面として使えます。",
		iconCutout: true,
		accent: "#2FBFAC",
		accentSoft: "#8FE4D8",
	},
];

/** AI for ART プロジェクト。Works とは別扱いで TOP の専用セクションに出す */
export const artProject = {
	name: "AI for ART",
	/** プロジェクトの入口ページ */
	href: "https://hello-amedev.github.io/ART/",
	statement:
		"競争や効率化のためではなく、AI をパートナーとしてデジタルアートを共創する、個人的なプロジェクト。",
	work: {
		title: "生命の夜",
		titleEn: "A Night of Life",
		sub: "遺伝的アルゴリズムで変化し続ける光のアート",
		body: "生命とは、絶えることなく「夜」を渡っていくプロジェクトである。その軌跡を、デジタルアートとして表出させることを試みた。",
		href: "https://hello-amedev.github.io/ART/night-of-life/",
		shot: "/assets/art/night-of-life.jpg",
		shotW: 1400,
		shotH: 718,
		shotAlt: "生命の夜の画面。暗闇のなかを、緑と青の光の筋が渦を描いて流れている",
		partner: "Claude Fable 5, Opus 4.8",
		downloads: [
			{ label: "BOOTH", href: "https://ame-dev.booth.pm/items/8537182" },
			{ label: "Gumroad", href: "https://amedev.gumroad.com/l/anightoflife" },
		],
	},
};

/** つくり手。About セクションとフッターが参照する */
export const author = {
	name: "ame_dev",
	bio: "ame_dev は、ひとりでアプリを開発しているブランドです。「視覚的にわかりやすく」をテーマに、仕事や生活のなかで自分が欲しいと感じたものを AI と一緒に形にしています。",
	links: [
		{ label: "X", href: "https://x.com/hello_amedev" },
		{ label: "BOOTH", href: "https://ame-dev.booth.pm/" },
		{ label: "amemitai@gmail.com", href: "mailto:amemitai@gmail.com" },
	],
};
