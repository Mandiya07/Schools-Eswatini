import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Institution } from '../types';
import { Link } from 'react-router-dom';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  institutions: Institution[];
}

// Approximate coordinates for Eswatini regions
const regionCoordinates: Record<string, [number, number]> = {
  'Hhohho': [-26.1333, 31.4667],
  'Manzini': [-26.4833, 31.3833],
  'Lubombo': [-26.5833, 31.9333],
  'Shiselweni': [-27.1167, 31.2000],
};

const MapComponent: React.FC<MapComponentProps> = ({ institutions }) => {
  // Center of Eswatini
  const center: [number, number] = [-26.5225, 31.4659];

  return (
    <div className="h-[800px] w-full rounded-[40px] overflow-hidden border border-slate-200 shadow-xl relative z-0">
      <MapContainer center={center} zoom={9} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {institutions.map((inst) => {
          // Add a small random offset to prevent markers from overlapping exactly
          const baseCoord = regionCoordinates[inst.region] || center;
          const offsetLat = (Math.random() - 0.5) * 0.1;
          const offsetLng = (Math.random() - 0.5) * 0.1;
          const position: [number, number] = [baseCoord[0] + offsetLat, baseCoord[1] + offsetLng];

          return (
            <Marker key={inst.id} position={position}>
              <Popup className="rounded-3xl">
                <div className="p-2 min-w-[200px]">
                  <img src={inst.coverImage} alt={inst.name} className="w-full h-24 object-cover rounded-xl mb-3" />
                  <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest mb-1">{inst.region}</p>
                  <h4 className="font-black text-slate-900 leading-tight mb-2">{inst.name}</h4>
                  <div className="flex gap-2 mb-3">
                    {inst.type.slice(0, 2).map(t => (
                      <span key={t} className="px-2 py-0.5 bg-slate-100 rounded-md text-[8px] font-bold text-slate-500 uppercase">{t}</span>
                    ))}
                  </div>
                  <Link 
                    to={`/school/${inst.slug}`}
                    className="block w-full text-center bg-slate-900 text-white py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
