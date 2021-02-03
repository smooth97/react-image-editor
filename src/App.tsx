import React from "react";
import EditName from "./components/EditName";
import { ColorBrowser } from "./components/ColorBrowser";
import { ColorPicker } from "./components/ColorPicker";
import { Color } from "./model/color";
import { SidebarComponent } from "./components/SidebarComponent";

const App = (): JSX.Element => {
  const [name, setName] = React.useState("defaultUserName");
  const [editingName, setEditingName] = React.useState("defaultUserName");
  const [color, setColor] = React.useState<Color>({
    red: 20,
    green: 40,
    blue: 180,
  });
  const [isVisible, setVisible] = React.useState(false);

  const setUsernameState = () => {
    setName(editingName);
  };

  const loadUserName = () => {
    setTimeout(() => {
      setName("name from async call");
      setEditingName("name from async call");
    }, 500);
  };

  React.useEffect(() => {
    loadUserName();
  }, []);

  return (
    <>
      <SidebarComponent isVisible={isVisible}>
        <h1>Cool Scfi movies</h1>
        <ul>
          <li>
            <a href="https://www.imdb.com/title/tt0816692/">Interstellar</a>
          </li>
          <li>
            <a href="https://www.imdb.com/title/tt0083658/">Blade Runner</a>
          </li>
          <li>
            <a href="https://www.imdb.com/title/tt0062622/">
              2001: a space odyssey
            </a>
          </li>
        </ul>
      </SidebarComponent>
      <ColorBrowser color={color} />
      <ColorPicker color={color} onColorUpdated={setColor} />
      <h1>{name}</h1>
      <EditName
        initialUserName={name}
        editingName={editingName}
        onNameUpdated={setUsernameState}
        onEditingNameUpdated={setEditingName}
        disabled={editingName === "" || editingName === name}
      />
      <div style={{ float: "right" }}>
        <button onClick={() => setVisible(!isVisible)}>Toggle Sidebar</button>
      </div>
    </>
  );
};

export default App;
