import fs from 'fs';
import path from 'path';

const basePath = path.join(new URL('./src', import.meta.url).pathname); // Diretório base onde os arquivos serão percorridos
const filesToProcess = [];

// Função para percorrer os arquivos recursivamente e adicioná-los à lista de arquivos a serem processados
function findFiles(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath);
    } else {
      filesToProcess.push(filePath);
    }
  });
}

// Substitui o caminho relativo pelo alias '@'
function replaceImport(file, regex) {
  const contents = fs.readFileSync(file, 'utf8');
  const newContents = contents.replace(regex, "@/$1");
  fs.writeFileSync(file, newContents, 'utf8');
}

// Percorre todos os arquivos e substitui os imports
findFiles(basePath);
filesToProcess.forEach(file => {
  replaceImport(file, /import.*from\s+['"]\.\.\/(\S+)['"]/g);
});
