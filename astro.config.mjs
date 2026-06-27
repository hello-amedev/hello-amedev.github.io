// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// hello-amedev.github.io は User Site のためルート（/）配信。base 調整は不要。
export default defineConfig({
	site: 'https://hello-amedev.github.io',
});
