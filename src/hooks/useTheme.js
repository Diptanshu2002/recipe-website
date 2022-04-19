import { useContext } from 'react'
import { themeContext } from '../context/themeContext'

export function useTheme(){
    const themeColor = useContext(themeContext);
    return themeColor;
}