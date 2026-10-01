import Home from '../[locale]/page'

export default async function DefaultHome() {
  return Home({ params: Promise.resolve({ locale: 'zh-TW' }) })
}
