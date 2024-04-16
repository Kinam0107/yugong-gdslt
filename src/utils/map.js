import { Feature, Overlay } from 'ol'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource, Cluster } from 'ol/source'
import { Point, Circle as GeoCircle, LineString, Polygon } from 'ol/geom'
import { Style, Icon, Circle, Fill, Stroke, Text } from 'ol/style'
import { Select, Draw } from 'ol/interaction'
import { singleClick } from 'ol/events/condition'
import { boundingExtent } from 'ol/extent'
import { createBox } from 'ol/interaction/Draw'
import { getLength, getArea } from 'ol/sphere'
import TileLayer from 'ol/layer/Tile'
import WebGLPointsLayer from 'ol/layer/WebGLPoints'
import { getImgWidthHeight } from '@/utils/util.js'

let oldAdmnFeature
const mapLayers = {}
const mapOverlays = {}

/**
 * @description 移除地图图层
 * @param {Map} map 地图对象
 * @param {String} layerName 指定移除图层的名称，不传时移除所有图层
 */
export function removeLayer(map, layerName) {
  const removeSingleLayer = (name) => {
    if (mapLayers[name]) {
      map.removeLayer(mapLayers[name])
      delete mapLayers[name]
    } else if (mapOverlays[name]) {
      map.removeOverlay(mapOverlays[name])
      delete mapOverlays[name]
    }
  }
  layerName ? removeSingleLayer(layerName) : Object.keys({ ...mapLayers, ...mapOverlays }).forEach((e) => removeSingleLayer(e))
}

/**
 * @description 点位加载：少量数据时，通过VectorLayer加载
 * @param {Map} map 地图对象
 * @param {String} layerName 图层名称
 * @param {Array} points 点位信息
 * @param {Object} clusterStyleConf 聚合样式配置信息，不传时点位不聚合
 */
export function renderPoint(map, layerName, points, clusterStyleConf) {
  removeLayer(map, layerName)
  const pointsInfo = Array.isArray(points) ? points : [points]
  const pointsFeature = pointsInfo.map((point) => {
    point.layerName = layerName
    const { longitude, latitude, dotStyleConf, circleStyleConf, titleStyleConf } = point
    if (dotStyleConf) {
      const { src, anchor, anchorXUnits, anchorYUnits, scale, radius, fillColor, strokeColor, strokeWidth } = dotStyleConf
      const iconFeature = new Feature({
        geometry: new Point([Number(longitude), Number(latitude)]),
        data: point
      })
      let styleConf = {}
      styleConf.image = src
        ? new Icon({
            src: src,
            anchor: anchor || [0.5, 0.5],
            anchorXUnits: anchorXUnits || 'fraction',
            anchorYUnits: anchorYUnits || 'fraction',
            scale: scale || 1
          })
        : new Circle({
            radius: radius || 5,
            fill: new Fill({ color: fillColor || strokeColor || 'red' }),
            stroke: new Stroke({ color: strokeColor || fillColor || 'red', width: strokeWidth || 1 })
          })
      if (titleStyleConf) {
        styleConf.text = new Text({
          text: titleStyleConf.titleText,
          font: titleStyleConf.titleFont || 'normal 12px 微软雅黑',
          textAlign: titleStyleConf.titleAlign || 'center',
          textBaseline: titleStyleConf.titleBaseline || 'middle',
          offsetX: titleStyleConf.titleOffsetX || 0,
          offsetY: titleStyleConf.titleOffsetY || 0,
          fill: new Fill({ color: titleStyleConf.titleColor || '#fff' }),
          stroke: new Stroke({ color: titleStyleConf.titleStrokeColor || '#000', width: titleStyleConf.titleStrokeWidth || 1 }),
          backgroundFill: new Fill({ color: titleStyleConf.titleBackgroundColor || 'transparent' }),
          backgroundStroke: new Stroke({ color: titleStyleConf.titleBorderColor || 'transparent', width: titleStyleConf.titleBorderWidth || 0 }),
          padding: titleStyleConf.titlePadding || [0, 0, 0, 0]
        })
      }
      const iconStyle = new Style(styleConf)
      iconFeature.setStyle(iconStyle)
      return iconFeature
    } else if (circleStyleConf) {
      const { radius, fillColor, strokeColor, strokeWidth } = circleStyleConf
      const radius_ = (radius || 5000) / map.getView().getProjection().getMetersPerUnit()
      const circleFeature = new Feature({
        geometry: new GeoCircle([Number(longitude), Number(latitude)], radius_),
        data: point
      })
      let styleConf = {}
      styleConf.fill = new Fill({ color: fillColor || strokeColor || 'red' })
      styleConf.stroke = new Stroke({ color: strokeColor || fillColor || 'red', width: strokeWidth || 1 })
      if (titleStyleConf) {
        styleConf.text = new Text({
          text: titleStyleConf.titleText,
          font: titleStyleConf.titleFont || 'normal 12px 微软雅黑',
          fill: new Fill({ color: titleStyleConf.titleColor || '#fff' }),
          stroke: new Stroke({ color: titleStyleConf.titleStrokeColor || '#000', width: titleStyleConf.titleStrokeWidth || 1 })
        })
      }
      const circleStyle = new Style(styleConf)
      circleFeature.setStyle(circleStyle)
      return circleFeature
    }
  })
  if (clusterStyleConf) {
    const { src, distance, fitPadding } = clusterStyleConf
    mapLayers[layerName] = new VectorLayer({
      clusterLayerName: layerName,
      source: new Cluster({
        distance: distance || 100,
        source: new VectorSource({
          features: pointsFeature
        })
      }),
      style: (feature) => {
        const size = feature.get('features').length
        if (size > 1) {
          return [
            new Style({
              image: new Icon({ src }),
              text: new Text({
                text: size.toString(),
                font: clusterStyleConf.titleFont || 'normal 12px 微软雅黑',
                textAlign: clusterStyleConf.titleAlign || 'center',
                textBaseline: clusterStyleConf.titleBaseline || 'middle',
                offsetX: clusterStyleConf.titleOffsetX || 0,
                offsetY: clusterStyleConf.titleOffsetY || 0,
                fill: new Fill({ color: clusterStyleConf.titleColor || '#fff' }),
                stroke: new Stroke({ color: clusterStyleConf.titleStrokeColor || '#000', width: clusterStyleConf.titleStrokeWidth || 1 }),
                backgroundFill: new Fill({ color: clusterStyleConf.titleBackgroundColor || 'transparent' }),
                backgroundStroke: new Stroke({ color: clusterStyleConf.titleBorderColor || 'transparent', width: clusterStyleConf.titleBorderWidth || 0 }),
                padding: clusterStyleConf.titlePadding || [0, 0, 0, 0]
              })
            })
          ]
        } else if (size == 1) {
          return feature.get('features')[0].getStyle()
        }
      }
    })
    map.addLayer(mapLayers[layerName])
    const selectClick = new Select({
      condition: singleClick,
      style: null,
      filter: (feat, layer) => layer === mapLayers[layerName]
    })
    selectClick.on('select', (e) => {
      const selectedFeatures = e.target.getFeatures().getArray()
      if (selectedFeatures.length > 0) {
        const clusterFeature = selectedFeatures[0]
        const clusterSize = clusterFeature.get('features').length
        if (clusterSize > 1) {
          const extent = boundingExtent(clusterFeature.get('features').map((r) => r.getGeometry().getCoordinates()))
          map.getView().fit(extent, { padding: fitPadding || [50, 50, 50, 50], duration: 1000 })
        }
      }
    })
    map.addInteraction(selectClick)
  } else {
    mapLayers[layerName] = new VectorLayer({
      layerName,
      source: new VectorSource({
        features: pointsFeature
      })
    })
    map.addLayer(mapLayers[layerName])
  }
}

/** !!注意，方法暂不可用，Fragment shader compilation failed: ERROR: 0:1: 'null' : syntax error
 * @description 海量数据点位加载
 * 如果使用VectorLayer加载，当叠加超过几千以上点位时就开始变慢，一万以上的要素点的时候，浏览器页面就开始卡顿或直接卡死
 * openlayers官方给出的优化意见是用webgl图层方式进行优化，使用webgl图层优点是渲染大量点很快
 * 但是图标的样式不能根据要素（Feature）的风格样式（style）自定义设置，只能用图层（layer）的风格样式（style）
 * @param {Map} map 地图对象
 * @param {String} layerName 图层名称
 * @param {Array} points 点位信息
 * @param {Object} style 点位样式
 */
export function renderMassivePoint(map, layerName, points, style) {
  removeLayer(map, layerName)
  const pointsFeature = points.map((point) => {
    point.layerName = layerName
    const { longitude, latitude } = point
    const pointFeature = new Feature({
      geometry: new Point([Number(longitude), Number(latitude)]),
      data: point
    })
    return pointFeature
  })
  mapLayers[layerName] = new WebGLPointsLayer({
    layerName,
    source: new VectorSource({
      features: pointsFeature
    }),
    style: style || {
      symbol: {
        symbolType: 'circle',
        size: 8,
        color: 'rgb(255, 0, 0)',
        opacity: 0.2
      }
    }
  })
  map.addLayer(mapLayers[layerName])
}

/**
 * @description 线段加载
 * @param {Map} map 地图对象
 * @param {String} layerName 图层名称
 * @param {Array} lines 线段信息
 */
export function renderLine(map, layerName, lines) {
  removeLayer(map, layerName)
  const linesInfo = Array.isArray(lines) ? lines : [lines]
  const linesFeature = linesInfo.map((line) => {
    line.layerName = layerName
    const { coordinates, lineStyleConf, titleStyleConf } = line
    const lineFeature = new Feature({
      geometry: new LineString(coordinates),
      data: line
    })
    if (lineStyleConf) {
      const { color, width } = lineStyleConf
      let styleConf = {
        stroke: new Stroke({ color: color || 'red', width: width || 1 })
      }
      if (titleStyleConf) {
        styleConf.text = new Text({
          text: titleStyleConf.titleText,
          font: titleStyleConf.titleFont || 'normal 12px 微软雅黑',
          textAlign: titleStyleConf.titleAlign || 'center',
          textBaseline: titleStyleConf.titleBaseline || 'middle',
          offsetX: titleStyleConf.titleOffsetX || 0,
          offsetY: titleStyleConf.titleOffsetY || 0,
          fill: new Fill({ color: titleStyleConf.titleColor || '#fff' }),
          stroke: new Stroke({ color: titleStyleConf.titleStrokeColor || '#000', width: titleStyleConf.titleStrokeWidth || 1 }),
          backgroundFill: new Fill({ color: titleStyleConf.titleBackgroundColor || 'transparent' }),
          backgroundStroke: new Stroke({ color: titleStyleConf.titleBorderColor || 'transparent', width: titleStyleConf.titleBorderWidth || 0 }),
          padding: titleStyleConf.titlePadding || [0, 0, 0, 0]
        })
      }
      lineFeature.setStyle(new Style(styleConf))
    }
    return lineFeature
  })
  mapLayers[layerName] = new VectorLayer({
    layerName,
    source: new VectorSource({
      features: linesFeature
    })
  })
  map.addLayer(mapLayers[layerName])
}

/**
 * @description 多边形加载
 * @param {Map} map 地图对象
 * @param {String} layerName 图层名称
 * @param {Array} polygons 多边形信息
 */
export function renderPolygon(map, layerName, polygons) {
  removeLayer(map, layerName)
  const polygonsInfo = Array.isArray(polygons) ? polygons : [polygons]
  const polygonsFeature = polygonsInfo.map((polygon) => {
    polygon.layerName = layerName
    const { coordinates, polygonStyleConf, titleStyleConf } = polygon
    const polygonFeature = new Feature({
      geometry: new Polygon([coordinates]),
      data: polygon
    })
    if (polygonStyleConf) {
      const { fillColor, strokeColor, strokeWidth, strokeLineDash } = polygonStyleConf
      let styleConf = {
        fill: new Fill({ color: fillColor || [255, 255, 255, 0.33] }),
        stroke: new Stroke({ color: strokeColor || 'red', width: strokeWidth || 1, lineDash: strokeLineDash })
      }
      if (titleStyleConf) {
        styleConf.text = new Text({
          text: titleStyleConf.titleText,
          font: titleStyleConf.titleFont || 'normal 12px 微软雅黑',
          textAlign: titleStyleConf.titleAlign || 'center',
          textBaseline: titleStyleConf.titleBaseline || 'middle',
          offsetX: titleStyleConf.titleOffsetX || 0,
          offsetY: titleStyleConf.titleOffsetY || 0,
          fill: new Fill({ color: titleStyleConf.titleColor || '#fff' }),
          stroke: new Stroke({ color: titleStyleConf.titleStrokeColor || '#000', width: titleStyleConf.titleStrokeWidth || 1 }),
          backgroundFill: new Fill({ color: titleStyleConf.titleBackgroundColor || 'transparent' }),
          backgroundStroke: new Stroke({ color: titleStyleConf.titleBorderColor || 'transparent', width: titleStyleConf.titleBorderWidth || 0 }),
          padding: titleStyleConf.titlePadding || [0, 0, 0, 0]
        })
      }
      polygonFeature.setStyle(new Style(styleConf))
    }
    return polygonFeature
  })
  mapLayers[layerName] = new VectorLayer({
    layerName,
    source: new VectorSource({
      features: polygonsFeature
    })
  })
  map.addLayer(mapLayers[layerName])
}

/**
 * @description 要素悬浮窗加载
 * @param {Map} map 地图对象
 * @param {String} layerName 图层名称
 * @param {Object} featureData 要素中携带的数据
 * @param {HTMLElement} element DOM元素
 */
export async function renderOverlay(map, layerName, featureData, element) {
  removeLayer(map, layerName)
  const { longitude, latitude, dotStyleConf } = featureData
  if (dotStyleConf) {
    const { src, anchor, anchorYUnits = 'fraction', scale = 1, radius = 5 } = dotStyleConf
    let iconHeight = 0
    if (src) {
      const res = await getImgWidthHeight(src)
      iconHeight = res.height || 0
    } else if (radius) {
      iconHeight = radius * 2
    }
    const anchorYValue = anchor ? anchor[1] : 0.5
    const offsetY = anchorYUnits === 'fraction' ? -iconHeight * scale * anchorYValue : -iconHeight * scale
    mapOverlays[layerName] = new Overlay({
      element: element,
      offset: [0, offsetY],
      position: [Number(longitude), Number(latitude)],
      positioning: 'bottom-center',
      autoPan: false,
      autoPanAnimation: { duration: 250 }
    })
    map.addOverlay(mapOverlays[layerName])
  }
}

/**
 * @description 指定位置的悬浮窗加载
 * @param {Map} map 地图对象
 * @param {String} layerName 图层名称
 * @param {Object} positionConf 位置配置，其中coordinate为经纬度坐标，必传
 * @param {HTMLElement} element DOM元素
 */
export function renderPositionOverlay(map, layerName, positionConf, element) {
  if (mapOverlays[layerName]) {
    if (positionConf.offset) mapOverlays[layerName].setOffset(positionConf.offset)
    if (positionConf.coordinate) mapOverlays[layerName].setPosition(positionConf.coordinate)
    if (positionConf.positioning) mapOverlays[layerName].setPositioning(positionConf.positioning)
  } else {
    mapOverlays[layerName] = new Overlay({
      element: element,
      offset: positionConf.offset || [0, 0],
      position: positionConf.coordinate,
      positioning: positionConf.positioning || 'bottom-center',
      autoPan: false,
      autoPanAnimation: { duration: 250 }
    })
    map.addOverlay(mapOverlays[layerName])
  }
}

/**
 * @description 改变单个行政区域的样式
 * @param {Feature} admnFeature 行政区划要素
 * @param {Object} styleObj 指定样式
 */
export function changeAdmnStyle(admnFeature, style) {
  if (oldAdmnFeature) oldAdmnFeature.setStyle(getCityFeatureStyle(oldAdmnFeature))
  oldAdmnFeature = admnFeature
  if (admnFeature) admnFeature.setStyle(getCityFeatureStyle(admnFeature, style))
}

/**
 * @description 获取市级行政区划要素样式
 * @param {Feature} feature 行政区划要素
 * @param {Object} style 指定样式，不传时使用默认样式
 * @returns {Style}
 */
export function getCityFeatureStyle(feature, style = {}) {
  return new Style({
    fill: new Fill({ color: style.fillColor || 'transparent' }),
    stroke: new Stroke({ color: style.strokeColor || '#00BAFF', width: style.strokeWidth || 1 }),
    text: new Text({
      text: feature.get('地名'),
      font: 'normal 14px 微软雅黑',
      fill: new Fill({ color: style.textColor || '#94E8FF' }),
      padding: [1, 2, 1, 2]
    })
  })
}

/**
 * @description 绘制点线面、圆形、矩形
 * @param {Map} map 地图对象
 * @param {String} layerName 图层名称
 * @param {String} type 'Point'，'LineString'，'Polygon'，'Circle'，'Box'
 * @param {Boolean} showLengthOrArea 是否显示测距测面数据
 * @param {Function} handleFunction 绘制结束后对数据的处理
 */
export function draw(map, layerName, type, showLengthOrArea, handleFunction) {
  removeLayer(map, layerName)
  let drawControls
  const drawSource = new VectorSource({})
  mapLayers[layerName] = new VectorLayer({
    source: drawSource,
    style: new Style({
      fill: new Fill({ color: [255, 255, 255, 0.33] }),
      stroke: new Stroke({ color: 'red', width: 2 }),
      image: new Circle({ radius: 5, fill: new Fill({ color: 'red' }) })
    })
  })
  map.addLayer(mapLayers[layerName])
  if (drawControls) map.removeInteraction(drawControls)
  if (type === 'Box') {
    drawControls = new Draw({
      source: drawSource,
      type: 'Circle',
      geometryFunction: createBox()
    })
  } else {
    drawControls = new Draw({
      source: drawSource,
      type: type
    })
  }
  drawControls.on('drawend', (e) => {
    let radius = undefined
    let coordinate = []
    let length = 0
    let area = 0
    const geometry = e.feature.getGeometry()
    if (type === 'Circle') {
      radius = geometry.getRadius()
      coordinate = geometry.getCenter()
    } else {
      coordinate = geometry.getCoordinates()
    }
    if (type === 'LineString') {
      length = getLength(geometry, { projection: 'EPSG:4326' })
      length = length >= 1000 ? Math.round((length / 1000) * 100) / 100 + '公里' : Math.round(length) + '米'
    } else if (type === 'Polygon' || type === 'Box') {
      area = getArea(geometry, { projection: 'EPSG:4326' })
      area = area > 10000 ? Math.round((area / 1000000) * 100) / 100 + '平方公里' : Math.round(area * 100) / 100 + '平方米'
    }
    map.removeInteraction(drawControls)
    if (showLengthOrArea) {
      const newFeature = new Feature({
        geometry: geometry,
        name: type
      })
      const disstyle = new Style({
        text: new Text({
          text: length || area,
          font: '14px sans-serif',
          fill: new Fill({ color: 'red' })
        })
      })
      newFeature.setStyle(disstyle)
      mapLayers[layerName].getSource().addFeature(newFeature)
    }
    if (handleFunction) handleFunction({ coordinate, radius, length, area })
  })
  map.addInteraction(drawControls)
}

/**
 * @description 切换底图
 * @param {Map} map 地图对象
 * @param {String} mode 底图模式：['地形晕渲', '影像底图', '矢量底图', '影像注记']
 */
export function changeBaseMap(map, baseMapMode) {
  const mapBaseTileLayers = map.getAllLayers().filter((e) => e instanceof TileLayer)
  const lastShowTileLayers = mapBaseTileLayers.find((e) => e.get('visible'))
  const targetShowTileLayers = mapBaseTileLayers.find((e) => e.get('id') === baseMapMode)
  if (lastShowTileLayers !== targetShowTileLayers) {
    targetShowTileLayers.setVisible(true)
    lastShowTileLayers.setVisible(false)
  }
}

/**
 * @description 定位到某个点
 * @param {Map} map 地图对象
 * @param {Object} animateConf 定位配置对象，其中center为经纬度坐标，必传
 * @param {Function} handleFunction 定点后对数据的处理
 */
export function gotoPoint(map, animateConf, handleFunction) {
  const { center, zoom, duration = 100 } = animateConf || {}
  map.getView().animate({
    center: center,
    zoom: zoom,
    duration: duration
  })
  if (handleFunction) {
    const pixel = map.getPixelFromCoordinate(center)
    const feature = map.forEachFeatureAtPixel(pixel, (feat, layer) => {
      if (layer?.get('layerName')) {
        return feat
      } else if (layer?.get('clusterLayerName') && feat.get('features').length == 1) {
        return feat.get('features')[0]
      }
    })
    const cityFeature = map.forEachFeatureAtPixel(pixel, (feat, layer) => {
      if (layer?.get('id') === 'cityLevelBoundary') {
        return feat
      }
    })
    handleFunction({ featureData: feature?.get('data'), cityFeature: cityFeature })
  }
}

/**
 * @description 改变地图鼠标图标
 * @param {Map} map 地图对象
 * @param {String} icon cursor的属性值或引入的图标，为空时恢复默认图标
 */
export function changeCursor(map, icon) {
  const attributes = ['default', 'auto', 'crosshair', 'pointer', 'move', 'e-resize', 'ne-resize', 'nw-resize', 'n-resize', 'se-resize', 'sw-resize', 's-resize', 'w-resize', 'text', 'wait', 'help']
  map.on('pointermove', () => {
    if (icon) {
      map.getTargetElement().style.cursor = attributes.includes(icon) ? icon : 'url(' + icon + '), default'
    } else {
      // const pixel = map.getEventPixel(e.originalEvent)
      // if (map.hasFeatureAtPixel(pixel)) {
      //   map.getTargetElement().style.cursor = 'pointer'
      // } else {
      map.getTargetElement().style.cursor = 'auto'
      // }
    }
  })
}
