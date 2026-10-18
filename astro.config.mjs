// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// ame-dev.com は User Site の独自ドメインでルート（/）配信。base 調整は不要。
// 旧 hello-amedev.github.io は GitHub が自動で 301 転送する（2026-09-04 移行）。

// 使い方のページへ移すだけのページ（Hanella の LP ができるまで）。サイトマップには載せない。
// LP を作ったらここから外す
const REDIRECT_ONLY = new Set(['https://ame-dev.com/hanella/', 'https://ame-dev.com/en/hanella/']);

export default defineConfig({
	site: 'https://ame-dev.com',
	integrations: [sitemap({ filter: (page) => !REDIRECT_ONLY.has(page) })],
});
