import * as components from './routes/components';
import { getBasePath } from './config';

const basePath = getBasePath();

export const menu1 = [
  { to: basePath + "/components/text-fields", text: "Text fields", component: components.TextFields },
  { to: basePath + "/components/buttons", text: "Buttons", component: components.Buttons },
  { to: basePath + "/components/selection-controls", text: "Selection controls", component: components.SelectionControls },
  { to: basePath + "/components/lists", text: "Lists", component: components.Lists },
  { to: basePath + "/components/selects", text: "Selects", component: components.Selects },
  { to: basePath + "/components/snackbars", text: "Snackbars", component: components.Snackbars },
  { to: basePath + "/components/dialogs", text: "Dialogs", component: components.Dialogs },
  { to: basePath + "/components/navigation-drawers", text: "Navigation drawers", component: components.NavigationDrawers },
  { to: basePath + "/components/progress-indicators", text: "Progress indicators", component: components.ProgressIndicators },
  { to: basePath + "/components/chips", text: "Chips", component: components.Chips },
  { to: basePath + "/components/tabs", text: "Tabs", component: components.Tabs },
  { to: basePath + "/components/cards", text: "Cards", component: components.Cards },
  { to: basePath + "/components/menus", text: "Menus", component: components.Menus },
  { to: basePath + "/components/images", text: "Images", component: components.Images },
  { to: basePath + "/components/sliders", text: "Sliders", component: components.Sliders },
  { to: basePath + "/components/data-tables", text: "DataTables", component: components.DataTables },
  { to: basePath + "/components/tooltips", text: "Tooltips", component: components.Tooltips },
];

export const menu2 = [
  { to: basePath + "/typography", text: "Typography" },
  { to: basePath + "/color", text: "Color" }
];

export const topMenu = [
  { to: basePath + "/components", text: "Components" },
  { to: basePath + "/typography", text: "Typography" },
  { to: basePath + "/color", text: "Color" }
];