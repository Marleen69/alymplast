import { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../data/translations'

const Map = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [MapComponent, setMapComponent] = useState(null)

  useEffect(() => {
    // Динамический импорт для избежания проблем с SSR
    import('react-leaflet').then((module) => {
      const { MapContainer, TileLayer, Marker, Popup } = module
      import('leaflet').then((leaflet) => {
        const L = leaflet.default
        // Fix for default marker icon
        delete L.Icon.Default.prototype._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        })
        setMapComponent({ MapContainer, TileLayer, Marker, Popup })
      })
    })
  }, [])

  // Координаты офиса (Бишкек, ул. Орозбекова, 291в)
  const officePosition = [42.91, 74.600293]

  if (!MapComponent) {
    return (
      <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
        <p className="text-gray-600">
          {language === 'ru' ? 'Загрузка карты...' : 'Loading map...'}
        </p>
      </div>
    )
  }

  const { MapContainer, TileLayer, Marker, Popup } = MapComponent

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={officePosition}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={officePosition}>
          <Popup>
            <div className="text-center">
              <strong>AlymPlast</strong>
              <br />
              {language === 'ru'
                ? 'г. Бишкек, Старый толчок, Улица Орозбекова, 291в'
                : 'Bishkek, Stary tolchok, Orozbekova St., 291v'}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default Map
