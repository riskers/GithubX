import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';

// See https://wxt.dev/api/config.html
export default defineConfig({
  imports: {
    eslintrc: {
      enabled: 8,
    },
  },
  modules: ['@wxt-dev/module-react', '@wxt-dev/i18n/module'],
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    action: {
      default_title: 'GithubX',
    },
    description: '__MSG_description__',
    default_locale: 'en',
    icons: {
      '48': 'logo48.png',
    },
    options_page: 'options.html',
    web_accessible_resources: [
      {
        resources: ['*.js', '*.css'],
        matches: ['<all_urls>'],
      },
    ],
    permissions: ['storage', 'unlimitedStorage', 'webRequest', 'tabs'],
    host_permissions: ['<all_urls>'],
  },
});
