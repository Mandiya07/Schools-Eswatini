
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Institution } from '../../types';

// Fix for default marker icons in Leaflet + React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

interface RegionalSchoolMapProps {
  institutions: Institution[];
  height?: string;
}

// Center of Eswatini
const ESWATINI_CENTER: [number, number] = [-26.4833, 31.3667];

const RegionalSchoolMap: React.FC<RegionalSchoolMapProps> = ({ institutions, height = "400px" }) => {
  // Filter institutions that have coordinates
  const schoolsWithCoords = institutions.filter(inst => 
    inst.contact?.latitude && inst.contact?.longitude
  );

  return (
    <div className="w-full rounded-[40px] overflow-hidden border border-slate-100 shadow-sm" style={{ height }}>
      <MapContainer 
        center={ESWATINI_CENTER} 
        zoom={8} 
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {schoolsWithCoords.map(school => (
          <Marker 
            key={school.id} 
            position={[school.contact!.latitude!, school.contact!.longitude!]}
          >
            <Popup>
              <div className="p-2 min-w-[150px]">
                <p className="font-black text-slate-900 border-b pb-1 mb-2">{school.name}</p>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">{school.region}</span>
                  <p className="text-[11px] text-slate-500">{school.type.join(', ')}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-2">Registration: {school.moetRegistration || 'Pending'}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RegionalSchoolMap;
