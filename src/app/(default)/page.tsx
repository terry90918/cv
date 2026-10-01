import Home from '../[locale]/page'

export default function DefaultHome() {
  return Home({ params: Promise.resolve({ locale: 'zh-TW' }) })
}
