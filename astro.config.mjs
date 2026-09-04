// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// ame-dev.com は User Site の独自ドメインでルート（/）配信。base 調整は不要。
// 旧 hello-amedev.github.io は GitHub が自動で 301 転送する（2026-09-04 移行）。
export default defineConfig({
	site: 'https://ame-dev.com',
	integrations: [sitemap()],
});
