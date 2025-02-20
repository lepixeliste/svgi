/**
 * SVG Icon Maker
 *
 * @version 1.0.0
 * @author Charlie LEDUC <contact@pixeliste.fr>
 */

export type IconValues = (string | number | number[])[];

export interface IconObj {
  x: number;
  y: number;
  width: number;
  height: number;
  paths: string[];
}

const _SVGI_FAMILIES_: Record<string, Record<string, IconValues>> = {};

export function addFamily(name: string, set: Record<string, IconValues>): void {
  if (!name.length) return;
  _SVGI_FAMILIES_[name] = set;
}

export function getFamilies(): Record<string, Record<string, IconValues>> {
  return _SVGI_FAMILIES_;
}

export function getFamily(
  name: string
): Record<string, IconValues> | undefined {
  return _SVGI_FAMILIES_[name];
}

export function getIcon(family: string, name: string): IconObj {
  const set = _SVGI_FAMILIES_[family];

  const values: IconValues = set[name] ?? [0, 0, ""];
  const startval = values.length ? values[0] : 0;
  const midval = values.length ? values[1] : 0;
  const endval = values.length > 2 ? values[2] : midval;
  const strval =
    typeof endval === "string"
      ? endval ?? ""
      : typeof midval === "string"
      ? midval ?? ""
      : "";

  const isStartArray = Array.isArray(startval);
  const xmin = isStartArray && startval.length ? startval[0] ?? 0 : 0;
  const ymin = isStartArray && startval.length > 1 ? startval[1] ?? 0 : 0;
  const width =
    isStartArray && startval.length > 2
      ? startval[2] ?? 0
      : typeof startval === "number"
      ? startval ?? 0
      : 0;
  const height =
    isStartArray && startval.length > 3
      ? startval[3] ?? 0
      : typeof midval === "number"
      ? midval ?? 0
      : 0;
  const paths = strval.split("|");

  return {
    x: xmin,
    y: ymin,
    width: width,
    height: height,
    paths: paths
  };
}

export function makeIcon(
  family: string,
  name: string,
  customClasses?: string[]
): string {
  const icon = getIcon(family, name);
  const classList = [family, `${family}-${name}`];
  if (customClasses?.length) {
    classList.push(...customClasses);
  }
  const classNames = classList.filter((e) => e.length).join(" ");
  const viewBox = [icon.x, icon.y, icon.width, icon.height].join(" ");

  const elements: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" class="${classNames}" data-name="${name}" role="img" aria-hidden="true" viewBox="${viewBox}">`,
    ...icon.paths.map((path, p) => {
      const pathClass = [`${family}-path`, `${family}-path-${p + 1}`].join(" ");
      return `<path fill="currentColor" class="${pathClass}" d="${path}" />`;
    }),
    "</svg>"
  ];

  return elements.join("");
}
