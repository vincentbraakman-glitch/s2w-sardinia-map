const fs = require('fs');
const xml = fs.readFileSync('C:/Users/vbraa/Downloads/Navionics_archive_export.gpx', 'utf8');
const pts = [];
const re = /<rtept\s+lat="([-\d.]+)"\s+lon="([-\d.]+)"\s*\/>/g;
let m;
while ((m = re.exec(xml)) !== null) {
  pts.push([Number(m[1]), Number(m[2])]);
}
console.log('Points:', pts.length);
// Format as JS array literal, 4 per line, 6dp precision
const lines = [];
for (let i = 0; i < pts.length; i += 4) {
  const chunk = pts.slice(i, i + 4)
    .map(([la, lo]) => `[${la.toFixed(6)}, ${lo.toFixed(6)}]`)
    .join(', ');
  lines.push('  ' + chunk + (i + 4 < pts.length ? ',' : ''));
}
fs.writeFileSync('C:/dev/s2w-sardinia-map/route-coords.txt', lines.join('\n'));
console.log('Written to route-coords.txt');
console.log('First:', pts[0]);
console.log('Last:', pts[pts.length - 1]);
