import { useTheme } from "../../hooks/useTheme"
import modeIcon from "../../img/mode.svg"

// styles
import './ThemeSelector.css'

const themeColors = ['#58249c', '#249c6b', '#b70233']

export default function ThemeSelector() {
  const { colorPick, changeMode, mode } = useTheme()

  function toggleMode(){
    changeMode((mode==='dark') ? 'light' : 'dark')
  }

  console.log(mode);
  

  return (
    <div className="theme-selector">
      <div className="theme-buttons">
        <div className="mode-toggle">
          <img 
            src={modeIcon}
            onClick = {toggleMode}
            style={{filter : mode==='dark'? 'invert(100%)' : 'invert(0)'}}
            alt="" />
        </div>
        {themeColors.map(color => (
          <div 
            key={color} 
            onClick={() => colorPick(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  )
}