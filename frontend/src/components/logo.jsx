import { logo as logoImage } from '../assets';

export const logo = () => {
  return (
    <img 
      src={logoImage}
      alt="Rivera All Services"
      style={{
        maxHeight: '50px',
        width: 'auto',
        display: 'block',
        border: '1px solid red' // Temporary to see the container
      }}
      onError={(e) => {
        console.error('logo failed to load:', e.target.src);
        console.log('attempted path:', e.target.src);
      }}
    />
  );
}; 