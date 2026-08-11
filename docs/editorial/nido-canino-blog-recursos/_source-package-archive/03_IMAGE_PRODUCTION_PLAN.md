# Nido Canino — Plan maestro de imágenes editoriales
## Blog + Recursos

## Objetivo visual

Las imágenes deben dar vida a las cards y a las páginas de lectura sin convertir el Blog en una colección de stock genérico.

### Lenguaje visual
- fotografía editorial realista;
- luz natural cálida;
- interiores tipo hogar;
- tonos crema, terracota, madera, carbón, verde natural;
- perros y gatos con anatomía real;
- sujetos no posando excesivamente;
- momentos de observación, descanso, rutina o preparación;
- sin texto dentro de la imagen;
- sin logotipos inventados;
- sin estetoscopios ni estética clínica salvo que el tema lo exija;
- sin caricatura.

## Relación de aspecto
Generar preferentemente master horizontal 3:2 o 4:3 que pueda recortarse a:
- card 4:3;
- hero 16:9;
- Open Graph ~1.91:1.

Dejar espacio negativo lateral cuando sea posible.

---

## Pack A — perros / convivencia

### `blog-grupos-pequenos.webp`
Escena editorial realista en una casa cálida: tres o cuatro perros de distintos tamaños compartiendo un espacio amplio sin estar amontonados; uno descansa, otro olfatea, otro observa; sensación de convivencia tranquila, supervisión implícita, luz natural, composición horizontal.

### `blog-estres-perro.webp`
Perro en entorno doméstico mostrando una señal sutil de incomodidad sin dramatismo: postura algo baja, mirada lateral y espacio para retirarse; ambiente tranquilo; la imagen debe comunicar observación, no miedo extremo.

### `blog-adaptacion.webp`
Perro entrando o explorando con calma un espacio nuevo tipo hogar; puerta abierta, cama, agua, textura de casa; el perro investiga sin posar.

### `blog-descanso-perro.webp`
Perro profundamente relajado en una cama o alfombra de una casa cálida, mientras al fondo hay vida cotidiana desenfocada; comunicar pausa y seguridad.

---

## Pack B — senior / caso / enriquecimiento

### `blog-perro-senior.webp`
Perro senior descansando cómodamente cerca de una persona fuera de cuadro o parcialmente visible; piso con buena tracción, cama accesible, ambiente sereno, luz suave.

### `blog-simba.webp`
**Preferencia:** usar fotografía real de Simba ya existente en Nido Canino.  
Si no existe asset aprobado, no generar una imagen que pretenda ser Simba. Usar un visual editorial neutro de accesibilidad/movilidad y marcarlo como ilustrativo.

### `blog-olfato.webp`
Perro realizando una actividad olfativa sencilla en interior, buscando premios o elementos seguros sobre una manta/tapete; concentración tranquila, nada de hiperactividad.

---

## Pack C — felino

### `blog-gato-casa.webp`
Gato cómodo en su propio hogar, con escondite, ventana o altura, comida/agua no dominantes; sensación de territorio familiar.

### `blog-ausencia-gato.webp`
Gato tranquilo en casa mientras una persona cuidadora organiza agua/comida o revisa una rutina; comunicar continuidad y previsibilidad.

---

## Pack D — seguridad / recursos

### `blog-sismo-mascotas.webp`
Composición editorial de preparación: correa, arnés, transportadora, botella de agua, pequeño bolso de emergencia y foto/identificación de mascota sobre una superficie doméstica; perro o gato al fondo tranquilo. No mostrar desastre ni pánico.

### `resources-checklist.webp`
Mesa cálida con libreta/checklist sin texto legible, teléfono, correa y objetos de cuidado; estética organizada.

### `resources-emergency-kit.webp`
Kit de emergencia doméstico para mascota: agua, alimento sellado, correa, transportadora, copia de documentos en carpeta, medicamentos cerrados/etiquetados sin marcas; composición ordenada.

---

## Micro-imágenes para Instagram editorial

Para `Del día a día de Nido`, preferir fotografías reales existentes antes que generar imágenes.

Categorías sugeridas:
- adaptación;
- descanso;
- olfato;
- senior;
- convivencia;
- gatos.

No fingir que una imagen generada es una publicación real de Instagram.

---

## Entrega a Codex

Cuando las imágenes estén listas, colocarlas en una ruta consistente, por ejemplo:

```text
public/assets/editorial/blog/
public/assets/editorial/resources/
```

Los nombres deben coincidir con los `image` del frontmatter o actualizarse en un solo lote.
