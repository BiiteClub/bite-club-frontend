'use client';

export async function reverseGeocode(lat: number, lng: number) {
  const geocoder = new google.maps.Geocoder();

  const result = await geocoder.geocode({
    location: { lat, lng },
  });

  if (!result.results.length) throw new Error('No address found');

  const address = result.results[0];

  let area = address.formatted_address;

  for (const component of address.address_components) {
    if (
      component.types.includes('sublocality') ||
      component.types.includes('sublocality_level_1') ||
      component.types.includes('locality') ||
      component.types.includes('administrative_area_level_2')
    ) {
      area = component.long_name;
      break;
    }
  }

  return {
    area,
    address: address.formatted_address,
  };
}
