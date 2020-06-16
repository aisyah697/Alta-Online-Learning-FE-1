import { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import axios from 'axios'
import {
    setInitialColor,
    isEmpty,
    countTotalCase,
    sumDataPerCase
} from '../utils'
// import TwitterCard from '../components/TwitterCard'
const TwitterCard = dynamic(() => import('../components/TwitterCard'))
// import Info from '../components/Info'
const Info = dynamic(() => import('../components/Info'))
// import Slider from 'rc-slider'
const Slider = dynamic(() => import('rc-slider'))
const Maps = dynamic(() => import('../components/Map'), { ssr: false })

const highlightColor = {
    weight: 7,
    color: '#8e44ad',
    dashArray: '',
    fillOpacity: 0.7
}
const originalColor = [
    '#FFEDA0',
    '#FED976',
    '#FEB24C',
    '#FD8D3C',
    '#FC4E2A',
    '#E31A1C',
    '#BD0026',
    '#800026'
]

const App = ({ kecamatan, originalMark, news }) => {
    const [highlightedProperties, setProperties] = useState({})
    const [chosenIndex, setIndex] = useState(
        kecamatan.features[0].properties.cases.length - 1
    )
    const [chosenLayer, setLayer] = useState({})
    const [marks, setMarks] = useState(originalMark)
    const [rawData, setRawData] = useState(kecamatan.features[0].properties)

    const layerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    const mapRef = useRef(null)

    const zoomToFeature = feature => {
        highlightFeature(feature)
        fitZoom(feature)
    }

    const fitZoom = e => {
        const map = mapRef.current.leafletElement
        map.fitBounds(e.target.getBounds())
    }

    const highlightFeature = async e => {
        const layer = await e.target
        setLayer(layer)
        setProperties(layer.feature.properties)
        setRawData(layer.feature.properties)
        layer.setStyle(highlightColor)
    }

    const eventEachFeature = (feature, layer) => {
        layer.on({
            click: zoomToFeature
            // mouseover: hoverFeature,
            // mouseout: hoverOutFeature
        })
    }

    const featureStyle = data => {
        return {
            fillColor: setInitialColor(
                data.properties.cases,
                originalColor,
                chosenIndex
            ),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.5
        }
    }

    const setColor = layer => {
        if (!isEmpty(layer)) {
            layer.setStyle(highlightColor)
        }
    }

    const setTimeline = value => {
        setIndex(value)
        setMarks({
            ...changeLastMarkerEl(originalMark),
            [value]: { label: createCard(value) }
        })
    }

    const createCard = val => {
        return (
            <div className="highlited-date">
                <p style={{ marginBottom: '5px' }}>{getDate(val)}</p>
                <TwitterCard content={news.tweets[chosenIndex].content} />
                <style jsx>{`
          .highlited-date {
            color: #303952 !important;
            font-weight: bold;
          }
          p {
            font-size: 15px;
          }
        `}</style>
            </div>
        )
    }

    const getDate = val => {
        if (!isEmpty(highlightedProperties)) {
            return highlightedProperties.cases[val].date
        } else {
            return rawData.cases[rawData.cases.length - 1].date
        }
    }

    const changeLastMarkerEl = origin => {
        const lastIdx = Object.keys(origin).length - 1
        const lastVal = origin[Object.keys(origin).length - 1]
        return {
            ...origin,
            [lastIdx]: {
                label: (
                    <p style={{ color: 'red', fontWeight: 'bold', width: '100px' }}>
                        {lastVal}
                    </p>
                )
            }
        }
    }

    const AppHead = () => (
        <Head>
            <title>Covid App Kota Malang</title>
            <meta
                name="description"
                content="Covid tracker kota Malang per kecamatan"
            />
        </Head>
    )

    useEffect(() => {
        const defaultCasesLength = rawData.cases.length
        setTimeline(defaultCasesLength - 1)
    }, [])
    useEffect(() => {
        setColor(chosenLayer)
    })

    return (
        <div className="container-fluid pt-0 mt-1">
            <AppHead />
            <div className="row">
                <div className="col-lg-6 ">
                    <Maps
                        lat={-7.975}
                        lng={112.63333}
                        zoom={12}
                        data={kecamatan}
                        featureStyle={featureStyle}
                        onEachFeature={eventEachFeature}
                        mapRef={mapRef}
                        url={layerUrl}
                    />
                </div>
                <div className="col-lg-6">
                    <Info
                        properties={highlightedProperties}
                        index={chosenIndex}
                        rawData={rawData}
                    />
                </div>
                <div className="container mt-3 mb-5 pb-5">
                    <div className="slider d-flex justify-content-center">
                        <Slider
                            ariaLabelledByForHandle="slider-label"
                            ariaLabelForHandle="slider-handle"
                            value={chosenIndex}
                            disabled={isEmpty(highlightedProperties)}
                            min={0}
                            max={rawData.cases.length - 1}
                            style={{ width: 960 }}
                            marks={marks}
                            included={false}
                            onChange={e => {
                                setTimeline(e)
                            }}
                        />
                    </div>
                </div>
            </div>
            <style jsx>{`
        .info {
          padding: 6px 8px;
          font: 14px/16px Arial, Helvetica, sans-serif;
          background: white;
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
          border-radius: 5px;
        }
        .info h4 {
          margin: 0 0 5px;
          color: #777;
        }
        .container-fluid {
          padding-top: 40px;
        }
        .card {
          box-shadow: 0px 0px 5px #00000029 !important;
          border-bottom: 1px solid rgba(0, 0, 0, 0.075) !important;
          border-radius: 0.25rem !important;
        }
      `}</style>
        </div>
    )
}

export async function getServerSideProps() {
    const baseUrl =
        process.env.ENV.baseUrl || 'https://5e9921015eabe7001681c784.mockapi.io/'
    // Fetch and process data from external API (for Maps)
    const response = await axios(`${baseUrl}kota-malang`)
    const kecamatanData = response.data[0]
    // const kecamatanData = Kecamatan
    const totalCase = kecamatanData.features.map(el =>
        countTotalCase(el.properties.cases)
    )
    const newFeatures = kecamatanData.features.map(feature => {
        const cases = feature.properties.cases
        const totalCase = cases.map(cse => ({
            ...cse,
            totalCase: sumDataPerCase(cse)
        }))
        const featureProperties = feature.properties
        const newProperties = { ...featureProperties, ...{ cases: totalCase } }
        return { ...feature, properties: newProperties }
    })

    const kecamatan = {
        ...kecamatanData,
        maxCase: Math.max(...totalCase),
        minCase: Math.min(...totalCase),
        features: newFeatures
    }

    const firstCases = kecamatanData.features[0].properties.cases
    const originalMark = firstCases.reduce(
        (prevVal, curVal, curIndex) => ({
            ...prevVal,
            ...{ [curIndex]: curVal.date }
        }),
        {}
    )
    // Fetch and process data from external API (for News)
    const newsResponse = await axios(`${baseUrl}twitter-pemkot`)
    const news = newsResponse.data[0]

    // Pass data to the page
    return { props: { kecamatan, originalMark, news } }
}

export default App