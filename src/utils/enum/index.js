import allDictObj from './dataDictionary.js'

/**
 * @description 数据回显
 * @param {String} dictKey 字典中对应的key值
 * @param {String|Number|Array} value 需要回显的值
 * @param {Object} options emptyEcho默认回显，delimiter分隔符
 * @returns
 */
export function dataEcho(dictKey, value, options) {
  if (typeof value === 'number') value = String(value)
  if (!value) return options?.emptyEcho || ''
  const dictionary = allDictObj[dictKey] || {}
  let valuesToEcho = Array.isArray(value) ? value : [value]
  if (options?.delimiter) valuesToEcho = String(value).split(options?.delimiter)
  let echoedValues = valuesToEcho.map((e) => dictionary[e] || dictionary['_' + e] || options?.emptyEcho || '')
  return Array.isArray(value) ? echoedValues : options?.delimiter ? echoedValues.join(options.delimiter) : echoedValues[0]
}

/**
 * @description 组装下拉框数据
 * @param {String} dictKey 字典中对应的key值
 * @param {Array} excludedOptions 剔除指定的项
 * @returns
 */
export function getOptions(dictKey, excludedOptions = []) {
  return Object.entries(allDictObj[dictKey] || {}).map((e) => {
    if (!excludedOptions.includes(e[0]) && !excludedOptions.includes(e[1])) {
      return { value: e[0].indexOf('_') === 0 ? e[0].substring(1) : e[0], label: e[1] }
    }
  })
}
