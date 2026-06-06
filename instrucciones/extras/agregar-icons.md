## Cómo usar una biblioteca de Iconos

**Paso 1**: Ejecuta el siguiente comando en tu terminal dentro de la carpeta de tu proyecto:
```bash
npm install lucide-react
```
**Paso 2**: Una vez instalado, puedes importar los iconos como componentes de React normales. Aquí tienes un ejemplo de cómo agregarlos:

```js
import { Shield, Sparkles, Sword } from 'lucide-react';

export default function MiComponente() {
  return (
    <div className="flex gap-4 p-6">
      {/* Puedes usarlos solos o darles estilos fácilmente */}
      <Sword className="w-6 height-6 text-amber-500" />
      <Shield className="w-6 height-6 text-blue-500" />
      <Sparkles className="w-6 height-6 text-purple-500" />
    </div>
  );
}
```
**Nota:** Tip de rendimiento: Asegúrate de importar los iconos entre llaves `{ Icon1, Icon2 }` desde `'lucide-react'` directamente. Evita importar todo el paquete para que Vite pueda optimizar el tamaño final del código del juego sin esfuerzo.