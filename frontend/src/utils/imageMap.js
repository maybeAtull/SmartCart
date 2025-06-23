// src/utils/imageMap.js
const imageModules = import.meta.glob('/src/assets/**/*.{jpg,jpeg,png}', { eager: true });

const imageMap = {};

for (const path in imageModules) {
  const fileName = path.split('/').pop().split('.')[0].toLowerCase();
  console.log('Mapping:', fileName, '→', imageModules[path].default); // 👈 Add this
  imageMap[fileName] = imageModules[path].default;
}

export default imageMap;
