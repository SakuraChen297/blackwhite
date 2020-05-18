import audioRecord from './audioRecord'

audioRecord.install = function(Vue, Options) {
  Vue.prototype.IATConfig = Options
  Vue.component(audioRecord.name, audioRecord)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(audioRecord)
}

export default audioRecord
